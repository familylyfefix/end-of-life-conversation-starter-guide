
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

    if (!session_id) {
      return new Response(JSON.stringify({ error: "Session ID required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Verify the purchase exists and is valid
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .select("*")
      .eq("stripe_session_id", session_id)
      .single();

    if (purchaseError || !purchase) {
      console.error("Purchase not found:", purchaseError);
      return new Response(JSON.stringify({ error: "Purchase not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Check if purchase has expired
    if (new Date(purchase.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "Download link has expired" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 410,
      });
    }

    // Check download limit
    if (purchase.download_count >= purchase.max_downloads) {
      return new Response(JSON.stringify({ error: "Download limit exceeded" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429,
      });
    }

    // Generate signed URL for the PDF (valid for 1 hour) - updated filename
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from("private-downloads")
      .createSignedUrl("end-of-life-conversation-playbook-instructions.pdf", 3600);

    if (urlError) {
      console.error("Error generating signed URL:", urlError);
      return new Response(JSON.stringify({ error: "Failed to generate download link" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Increment download count
    await supabase
      .from("purchases")
      .update({ download_count: purchase.download_count + 1 })
      .eq("id", purchase.id);

    console.log("Generated secure download link for purchase:", purchase.id);

    return new Response(JSON.stringify({ 
      download_url: signedUrl.signedUrl,
      downloads_remaining: purchase.max_downloads - purchase.download_count - 1
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Download link generation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
