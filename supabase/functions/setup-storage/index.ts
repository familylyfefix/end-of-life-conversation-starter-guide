
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

    // Make sure the private-downloads bucket is PUBLIC
    console.log("Updating private-downloads bucket to be public...");
    const { data: updateResult, error: updateError } = await supabase.storage
      .updateBucket('private-downloads', {
        public: true,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 50 * 1024 * 1024 // 50MB
      });

    if (updateError) {
      console.log('Bucket update result:', updateError);
    } else {
      console.log('✅ Bucket is now public');
    }

    // List all files in the bucket to find the PDF
    console.log("Listing files in private-downloads bucket...");
    const { data: files, error: listError } = await supabase.storage
      .from('private-downloads')
      .list();

    console.log('Files found:', files);
    console.log('List error:', listError);

    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ 
        success: false,
        error: "No files found in bucket",
        instructions: "Please upload the PDF file to the private-downloads bucket"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Find the PDF file (look for any PDF file)
    const pdfFile = files.find(file => 
      file.name.toLowerCase().includes('playbook') || 
      file.name.toLowerCase().includes('conversation') ||
      file.name.toLowerCase().endsWith('.pdf')
    );

    if (!pdfFile) {
      return new Response(JSON.stringify({ 
        success: false,
        error: "PDF file not found",
        available_files: files.map(f => f.name),
        instructions: "Please upload a PDF file with 'playbook' or 'conversation' in the name"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get public URL for the PDF
    const { data: urlData } = supabase.storage
      .from('private-downloads')
      .getPublicUrl(pdfFile.name);
    
    const publicUrl = urlData.publicUrl;
    console.log('Public URL:', publicUrl);

    return new Response(JSON.stringify({ 
      success: true,
      pdf_file_exists: true,
      public_url: publicUrl,
      download_url: publicUrl,
      file_name: pdfFile.name,
      file_size: pdfFile.metadata?.size,
      message: "✅ PDF file found and public download URL ready"
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
