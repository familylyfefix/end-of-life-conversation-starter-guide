
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
    console.log("=== STORAGE SETUP AND DIAGNOSIS ===");
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Create the private-downloads bucket
    console.log("Creating private-downloads bucket...");
    const { data: bucket, error: bucketError } = await supabase.storage
      .createBucket('private-downloads', {
        public: true, // Make it public for now to test
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 50 * 1024 * 1024 // 50MB
      });

    if (bucketError && !bucketError.message.includes('already exists')) {
      console.error('Error creating bucket:', bucketError);
    } else {
      console.log('✅ Bucket created or already exists');
    }

    // List all files in the bucket
    console.log("Listing files in private-downloads bucket...");
    const { data: files, error: listError } = await supabase.storage
      .from('private-downloads')
      .list();

    console.log('Files found:', files);
    console.log('List error:', listError);

    // Try to get the specific PDF file info
    const targetFile = 'end-of-life-conversation-playbook.pdf';
    const pdfExists = files?.some(file => file.name === targetFile);

    let downloadTestResult = null;
    if (pdfExists) {
      console.log("PDF file found, testing download...");
      const { data: downloadData, error: downloadError } = await supabase.storage
        .from('private-downloads')
        .download(targetFile);
      
      downloadTestResult = {
        success: !downloadError,
        error: downloadError?.message,
        fileSize: downloadData ? downloadData.size : 0
      };
      console.log('Download test result:', downloadTestResult);
    }

    // Get public URL for testing
    let publicUrl = null;
    if (pdfExists) {
      const { data: urlData } = supabase.storage
        .from('private-downloads')
        .getPublicUrl(targetFile);
      publicUrl = urlData.publicUrl;
      console.log('Public URL:', publicUrl);
    }

    return new Response(JSON.stringify({ 
      success: true,
      bucket_status: bucketError ? 'error' : 'ok',
      bucket_error: bucketError?.message,
      files_in_bucket: files?.map(f => ({ name: f.name, size: f.metadata?.size })) || [],
      pdf_file_exists: pdfExists,
      download_test: downloadTestResult,
      public_url: publicUrl,
      instructions: pdfExists 
        ? "PDF file found - testing download capability" 
        : "❌ PDF file NOT FOUND - please upload 'end-of-life-conversation-playbook.pdf' to the private-downloads bucket"
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
