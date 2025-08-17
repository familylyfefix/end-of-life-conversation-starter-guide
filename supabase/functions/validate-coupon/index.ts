import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== VALIDATE COUPON FUNCTION STARTED ===");
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const { couponCode } = await req.json();
    console.log("Validating coupon:", { couponCode });

    if (!couponCode) {
      return new Response(JSON.stringify({ error: "Coupon code is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    try {
      // Retrieve coupon from Stripe
      const coupon = await stripe.coupons.retrieve(couponCode);
      console.log("✅ Coupon found:", coupon.id);

      // Check if coupon is valid
      if (!coupon.valid) {
        return new Response(JSON.stringify({ 
          error: "This coupon is no longer valid",
          isValid: false 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      // Check if coupon has expired
      if (coupon.redeem_by && coupon.redeem_by < Math.floor(Date.now() / 1000)) {
        return new Response(JSON.stringify({ 
          error: "This coupon has expired",
          isValid: false 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      // Return coupon details
      return new Response(JSON.stringify({
        isValid: true,
        coupon: {
          id: coupon.id,
          name: coupon.name,
          percentOff: coupon.percent_off,
          amountOff: coupon.amount_off,
          currency: coupon.currency,
          duration: coupon.duration,
          valid: coupon.valid
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } catch (stripeError: any) {
      console.log("❌ Stripe coupon validation error:", stripeError.code);
      
      let errorMessage = "Invalid coupon code";
      if (stripeError.code === "resource_missing") {
        errorMessage = "Coupon code not found";
      } else if (stripeError.code === "coupon_expired") {
        errorMessage = "This coupon has expired";
      }

      return new Response(JSON.stringify({ 
        error: errorMessage,
        isValid: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

  } catch (error) {
    console.error("❌ Coupon validation error:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to validate coupon",
      isValid: false,
      details: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});