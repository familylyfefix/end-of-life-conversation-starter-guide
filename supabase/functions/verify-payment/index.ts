
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { session_id } = await req.json();

    console.log("Verifying payment for session:", session_id);

    if (!session_id) {
      return new Response(JSON.stringify({ error: "Session ID required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check if purchase already exists
    const { data: existingPurchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("stripe_session_id", session_id)
      .maybeSingle();

    if (existingPurchase) {
      console.log("Purchase already exists");
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Purchase already verified",
        purchase_id: existingPurchase.id
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    console.log("Stripe session status:", session.payment_status);
    console.log("Session details:", {
      id: session.id,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      amount_total: session.amount_total
    });

    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        error: "Payment not completed",
        payment_status: session.payment_status
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Create purchase record
    const purchaseData = {
      stripe_session_id: session.id,
      customer_email: session.customer_email!,
      customer_name: session.metadata?.customer_name || null,
      product_name: "End-of-Life Conversation Playbook",
      amount: session.amount_total!,
      currency: session.currency!,
    };

    console.log("Creating purchase record:", purchaseData);

    const { data: newPurchase, error: insertError } = await supabase
      .from("purchases")
      .insert(purchaseData)
      .select()
      .single();

    if (insertError) {
      console.error("Error creating purchase:", insertError);
      throw insertError;
    }

    console.log("Purchase record created successfully:", newPurchase.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Payment verified and purchase created",
      purchase: newPurchase
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(JSON.stringify({ 
      error: "Payment verification failed",
      details: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
