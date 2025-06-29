
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
  
  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    console.log("Webhook event received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log("Processing completed checkout session:", session.id);
      console.log("Session details:", {
        id: session.id,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status
      });

      // Check if purchase already exists to avoid duplicates
      const { data: existingPurchase } = await supabase
        .from("purchases")
        .select("id")
        .eq("stripe_session_id", session.id)
        .single();

      if (existingPurchase) {
        console.log("Purchase already exists for session:", session.id);
        return new Response(JSON.stringify({ received: true, message: "Purchase already exists" }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      }

      const purchaseData = {
        stripe_session_id: session.id,
        customer_email: session.customer_email!,
        customer_name: session.metadata?.customer_name || null,
        product_name: "End-of-Life Conversation Playbook",
        amount: session.amount_total!,
        currency: session.currency!,
      };

      console.log("Inserting purchase data:", purchaseData);

      // Record the purchase in our database
      const { data: insertedPurchase, error } = await supabase
        .from("purchases")
        .insert(purchaseData)
        .select()
        .single();

      if (error) {
        console.error("Error recording purchase:", error);
        throw error;
      }

      console.log("Purchase recorded successfully:", insertedPurchase);

      // Trigger Zapier webhook for welcome email
      await triggerZapierWebhook(purchaseData);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
});
