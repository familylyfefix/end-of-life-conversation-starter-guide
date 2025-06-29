
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { session_id } = await req.json();
    
    console.log("Creating test purchase for session:", session_id);

    if (!session_id) {
      return new Response(JSON.stringify({ error: "Session ID required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Create a test purchase record
    const testPurchase = {
      stripe_session_id: session_id,
      customer_email: "test@example.com",
      customer_name: "Test Customer",
      product_name: "End-of-Life Conversation Playbook",
      amount: 4700, // $47.00
      currency: "usd",
    };

    const { data: insertedPurchase, error: insertError } = await supabase
      .from("purchases")
      .insert(testPurchase)
      .select()
      .single();

    if (insertError) {
      console.error("Error creating test purchase:", insertError);
      throw insertError;
    }

    console.log("Test purchase created:", insertedPurchase);

    return new Response(JSON.stringify({ 
      success: true,
      purchase: insertedPurchase
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Test purchase creation error:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to create test purchase",
      details: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
