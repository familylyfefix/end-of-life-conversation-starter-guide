
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName } = await req.json();
    
    console.log("Adding subscriber to Kit:", { email, firstName, lastName });

    const kitResponse = await fetch("https://api.convertkit.com/v3/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: Deno.env.get("CONVERTKIT_API_KEY"),
        email: email,
        first_name: firstName || "",
        last_name: lastName || "",
        tags: ["playbook-customer"]
      }),
    });

    if (!kitResponse.ok) {
      throw new Error(`Kit API error: ${kitResponse.status}`);
    }

    const kitData = await kitResponse.json();
    console.log("Successfully added to Kit:", kitData);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Successfully added to Kit"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Kit integration error:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to add to Kit",
      details: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
