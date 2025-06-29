
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

    console.log("Creating storage bucket for private downloads...");

    // Create the private-downloads bucket
    const { data: bucketData, error: bucketError } = await supabase.storage
      .createBucket("private-downloads", {
        public: false,
        allowedMimeTypes: ["application/pdf"],
        fileSizeLimit: 50 * 1024 * 1024, // 50MB limit
      });

    if (bucketError && !bucketError.message.includes("already exists")) {
      console.error("Error creating bucket:", bucketError);
      throw bucketError;
    }

    console.log("Storage bucket created or already exists");

    return new Response(JSON.stringify({ 
      success: true,
      message: "Storage bucket created successfully",
      bucket: bucketData
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Storage bucket creation error:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to create storage bucket",
      details: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
