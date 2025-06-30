
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
    console.log("=== SETTING UP STORAGE BUCKET ===");
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Create the private-downloads bucket
    const { data: bucket, error: bucketError } = await supabase.storage
      .createBucket('private-downloads', {
        public: false,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 50 * 1024 * 1024 // 50MB
      });

    if (bucketError && !bucketError.message.includes('already exists')) {
      console.error('Error creating bucket:', bucketError);
      throw bucketError;
    }

    console.log('✅ Storage bucket created or already exists');

    // Create storage policies to allow access to the PDF
    const { error: policyError } = await supabase.rpc('create_storage_policy', {
      bucket_name: 'private-downloads',
      policy_name: 'Allow public access to PDFs',
      definition: 'true'
    });

    if (policyError) {
      console.log('Policy creation failed (may already exist):', policyError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Storage bucket created successfully. Now upload your PDF file to the 'private-downloads' bucket with filename 'End-of-Life-Conversation-Playbook.pdf'",
      bucket: bucket
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("❌ Storage setup error:", error);
    return new Response(JSON.stringify({ 
      error: "Storage setup failed",
      details: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
