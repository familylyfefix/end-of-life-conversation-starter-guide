
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const triggerZapierWebhook = async (purchaseData: any) => {
  const zapierWebhookUrl = Deno.env.get("ZAPIER_WEBHOOK_URL");
  
  if (!zapierWebhookUrl) {
    console.log("No Zapier webhook URL configured, skipping notification");
    return;
  }

  try {
    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: "purchase_completed",
        customer_email: purchaseData.customer_email,
        customer_name: purchaseData.customer_name,
        product_name: purchaseData.product_name,
        amount: purchaseData.amount,
        currency: purchaseData.currency,
        purchase_date: new Date().toISOString(),
        stripe_session_id: purchaseData.stripe_session_id,
      }),
    });

    if (response.ok) {
      console.log("Zapier webhook triggered successfully");
    } else {
      console.error("Failed to trigger Zapier webhook:", response.status);
    }
  } catch (error) {
    console.error("Error triggering Zapier webhook:", error);
  }
};

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  
  console.log("=== WEBHOOK RECEIVED ===");
  console.log("Has signature:", !!signature);
  console.log("Method:", req.method);
  
  if (!signature) {
    console.error("No Stripe signature found");
    return new Response("No signature", { status: 400 });
  }

  try {
    const body = await req.text();
    console.log("Body length:", body.length);
    
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    console.log("=== EVENT DETAILS ===");
    console.log("Event type:", event.type);
    console.log("Event ID:", event.id);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log("=== CHECKOUT SESSION COMPLETED ===");
      console.log("Session ID:", session.id);
      console.log("Customer email:", session.customer_email);
      console.log("Amount total:", session.amount_total);
      console.log("Currency:", session.currency);
      console.log("Payment status:", session.payment_status);
      console.log("Full session object keys:", Object.keys(session));

      // Check if purchase already exists
      console.log("Checking for existing purchase...");
      const { data: existingPurchase, error: checkError } = await supabase
        .from("purchases")
        .select("id, stripe_session_id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();

      console.log("Existing purchase check result:", { existingPurchase, checkError });

      if (existingPurchase) {
        console.log("Purchase already exists for session:", session.id);
        return new Response(JSON.stringify({ 
          received: true, 
          message: "Purchase already exists",
          existing_purchase_id: existingPurchase.id
        }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      }

      // Create purchase data
      const purchaseData = {
        stripe_session_id: session.id,
        customer_email: session.customer_email!,
        customer_name: session.metadata?.customer_name || null,
        product_name: "End-of-Life Conversation Playbook",
        amount: session.amount_total!,
        currency: session.currency!,
      };

      console.log("=== INSERTING PURCHASE ===");
      console.log("Purchase data:", JSON.stringify(purchaseData, null, 2));

      // Insert purchase record
      const { data: insertedPurchase, error: insertError } = await supabase
        .from("purchases")
        .insert(purchaseData)
        .select()
        .single();

      console.log("Insert result:", { insertedPurchase, insertError });

      if (insertError) {
        console.error("=== PURCHASE INSERT ERROR ===");
        console.error("Error details:", JSON.stringify(insertError, null, 2));
        throw insertError;
      }

      console.log("=== PURCHASE CREATED SUCCESSFULLY ===");
      console.log("Created purchase ID:", insertedPurchase.id);
      console.log("Created purchase session ID:", insertedPurchase.stripe_session_id);

      // Verify the purchase was actually created
      const { data: verifyPurchase, error: verifyError } = await supabase
        .from("purchases")
        .select("*")
        .eq("stripe_session_id", session.id)
        .single();

      console.log("=== VERIFICATION ===");
      console.log("Verification result:", { verifyPurchase, verifyError });

      // Trigger Zapier webhook
      await triggerZapierWebhook(purchaseData);
    }

    console.log("=== WEBHOOK PROCESSING COMPLETE ===");
    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("=== WEBHOOK ERROR ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
});
