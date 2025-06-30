
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
    console.log("=== SETTING UP STORAGE BUCKET FOR PDF DOWNLOADS ===");
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Create the private-downloads bucket
    console.log("Creating private-downloads bucket...");
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

    console.log('✅ Storage bucket ready');

    // Create a simple RLS policy to allow downloads
    const { error: policyError } = await supabase.rpc('create_policy', {
      table_name: 'objects',
      policy_name: 'Allow PDF downloads',
      definition: `bucket_id = 'private-downloads'::text`,
      check: `bucket_id = 'private-downloads'::text`,
      command: 'SELECT'
    });

    if (policyError) {
      console.log('Policy creation info:', policyError);
    }

    // Check if the PDF file exists
    console.log("Checking for PDF file...");
    const { data: files, error: listError } = await supabase.storage
      .from('private-downloads')
      .list();

    console.log('Files in bucket:', files);

    if (listError) {
      console.error('Error listing files:', listError);
    }

    const pdfExists = files?.some(file => file.name === 'end-of-life-conversation-playbook.pdf');

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Storage setup complete",
      bucket_created: !bucketError,
      pdf_file_exists: pdfExists,
      instructions: pdfExists 
        ? "PDF file found - downloads should work!" 
        : "Please upload 'end-of-life-conversation-playbook.pdf' to the private-downloads bucket",
      files_in_bucket: files?.map(f => f.name) || []
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
