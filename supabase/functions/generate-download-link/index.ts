
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
    console.log("=== SIMPLE DOWNLOAD APPROACH ===");
    
    const { session_id } = await req.json();
    console.log("Session ID:", session_id);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Find PDF in storage
    const { data: files, error: listError } = await supabase.storage
      .from('private-downloads')
      .list();

    if (listError || !files || files.length === 0) {
      console.error("No files found in storage:", listError);
      return new Response(JSON.stringify({ 
        error: "PDF file not found in storage. Please contact support."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Find the PDF file
    const pdfFile = files.find(file => 
      file.name.toLowerCase().includes('playbook') || 
      file.name.toLowerCase().includes('conversation') ||
      file.name.toLowerCase().includes('end-of-life') ||
      file.name.toLowerCase().endsWith('.pdf')
    );

    if (!pdfFile) {
      console.error("PDF file not found");
      return new Response(JSON.stringify({ 
        error: "PDF file not found. Available files: " + files.map(f => f.name).join(', ')
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('private-downloads')
      .getPublicUrl(pdfFile.name);

    console.log("✅ Providing direct download access");
    
    return new Response(JSON.stringify({ 
      download_url: urlData.publicUrl,
      file_name: pdfFile.name,
      expires_in: 3600,
      success: true
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("❌ Download generation error:", error);
    return new Response(JSON.stringify({ 
      error: "Download generation failed",
      details: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
