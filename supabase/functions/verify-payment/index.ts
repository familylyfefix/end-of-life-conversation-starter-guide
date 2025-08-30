
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
    console.log("=== VERIFY PAYMENT FUNCTION STARTED ===");
    
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
      console.error("No session ID provided");
      return new Response(JSON.stringify({ error: "Session ID required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check if purchase already exists
    console.log("Checking if purchase already exists...");
    const { data: existingPurchase, error: existingError } = await supabase
      .from("purchases")
      .select("id")
      .eq("stripe_session_id", session_id)
      .maybeSingle();

    console.log("Existing purchase check:", { existingPurchase, existingError });

    if (existingPurchase) {
      console.log("Purchase already exists with ID:", existingPurchase.id);
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
    console.log("Retrieving session from Stripe...");
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("Stripe session retrieved:", {
      id: session.id,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      amount_total: session.amount_total
    });

    if (session.payment_status !== "paid") {
      console.error("Payment not completed. Status:", session.payment_status);
      return new Response(JSON.stringify({ 
        error: "Payment not completed",
        payment_status: session.payment_status
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Determine product details based on metadata
    const productType = session.metadata?.product_type || "playbook";
    const isToolkit = productType === "toolkit";
    
    // Create purchase record with all required fields
    const purchaseData = {
      stripe_session_id: session.id,
      customer_email: session.customer_email || "unknown@example.com",
      customer_name: session.metadata?.customer_name || "Unknown Customer",
      product_name: isToolkit ? "End-of-Life Toolkit" : "End-of-Life Conversation Playbook",
      amount: session.amount_total || 4700,
      currency: session.currency || "usd",
      max_downloads: 3, // Both products have 3 downloads
      download_count: 0,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };

    console.log("Creating purchase record with data:", purchaseData);

    const { data: newPurchase, error: insertError } = await supabase
      .from("purchases")
      .insert(purchaseData)
      .select()
      .single();

    if (insertError) {
      console.error("Error creating purchase:", insertError);
      throw new Error(`Failed to create purchase record: ${insertError.message}`);
    }

    console.log("✅ Purchase record created successfully:", newPurchase);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Payment verified and purchase created",
      purchase: newPurchase
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return new Response(JSON.stringify({ 
      error: "Payment verification failed",
      details: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
