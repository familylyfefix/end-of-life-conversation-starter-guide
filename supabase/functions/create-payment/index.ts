
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

    const { customerEmail, customerName, amount, couponCode } = await req.json();
    console.log("Payment request:", { customerEmail, customerName, amount, couponCode });

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

    // Prepare session configuration
    const sessionConfig: any = {
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
      phone_number_collection: {
        enabled: false,
      },
      custom_text: {
        submit: {
          message: 'Complete your secure purchase to get instant access to your playbook.',
        },
      },
    };

    // Apply coupon if provided
    if (couponCode) {
      console.log("Applying coupon to session:", couponCode);
      try {
        // Validate coupon exists
        const coupon = await stripe.coupons.retrieve(couponCode);
        if (coupon.valid) {
          sessionConfig.discounts = [{
            coupon: couponCode
          }];
          sessionConfig.metadata.coupon_code = couponCode;
          console.log("✅ Coupon applied to session");
        } else {
          console.log("❌ Coupon is not valid");
          return new Response(JSON.stringify({ error: "Invalid coupon code" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          });
        }
      } catch (couponError: any) {
        console.error("❌ Coupon validation error:", couponError.code);
        return new Response(JSON.stringify({ error: "Invalid coupon code" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
    }

    // Create checkout session with proper configuration
    const session = await stripe.checkout.sessions.create(sessionConfig);

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
