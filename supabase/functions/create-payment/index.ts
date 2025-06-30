
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
    console.log("=== CREATE PAYMENT FUNCTION STARTED ===");
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const { customerEmail, customerName, amount } = await req.json();
    console.log("Payment request:", { customerEmail, customerName, amount });

    if (!customerEmail || !amount) {
      console.error("Missing required fields");
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get the origin for redirect URLs
    const origin = req.headers.get("origin") || "https://your-domain.lovable.app";
    console.log("Origin:", origin);

    // Create checkout session with proper configuration
    const session = await stripe.checkout.sessions.create({
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "End-of-Life Conversation Playbook",
              description: "Complete digital guide with templates and conversation starters",
            },
            unit_amount: amount, // Amount should already be in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        customer_name: customerName || "Unknown Customer",
      },
      // Add these settings to ensure proper checkout behavior
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: null,
      phone_number_collection: {
        enabled: false,
      },
      custom_text: {
        submit: {
          message: 'Complete your secure purchase to get instant access to your playbook.',
        },
      },
    });

    console.log("✅ Stripe session created:", session.id);

    return new Response(JSON.stringify({ 
      url: session.url,
      session_id: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("❌ Payment creation error:", error);
    return new Response(JSON.stringify({ 
      error: "Payment creation failed",
      details: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
