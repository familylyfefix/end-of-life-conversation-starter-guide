
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
    console.log("=== GENERATE DOWNLOAD LINK FUNCTION STARTED ===");
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { session_id } = await req.json();
    console.log("Download request for session ID:", session_id);

    if (!session_id) {
      console.error("No session ID provided");
      return new Response(JSON.stringify({ error: "Session ID required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // First, let's check if any purchases exist at all for debugging
    const { data: allPurchases, error: allPurchasesError } = await supabase
      .from("purchases")
      .select("stripe_session_id, customer_email, created_at")
      .limit(5);

    console.log("Recent purchases in database:", allPurchases);

    // Verify the purchase exists and is valid
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .select("*")
      .eq("stripe_session_id", session_id)
      .single();

    console.log("Purchase lookup result:", { purchase, error: purchaseError });

    if (purchaseError) {
      console.error("Purchase lookup error:", purchaseError);
      
      if (purchaseError.code === "PGRST116") {
        return new Response(JSON.stringify({ 
          error: "Purchase not found. Please contact support with your order details.",
          debug_info: {
            session_id: session_id,
            error_code: purchaseError.code,
            recent_purchases: allPurchases?.map(p => p.stripe_session_id) || []
          }
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        });
      }
      
      throw purchaseError;
    }

    if (!purchase) {
      console.error("No purchase found for session:", session_id);
      return new Response(JSON.stringify({ 
        error: "Purchase not found. Please contact support with your order details.",
        debug_info: {
          session_id: session_id,
          recent_purchases: allPurchases?.map(p => p.stripe_session_id) || []
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    console.log("Found purchase:", {
      id: purchase.id,
      expires_at: purchase.expires_at,
      download_count: purchase.download_count,
      max_downloads: purchase.max_downloads
    });

    // Check if purchase has expired
    if (new Date(purchase.expires_at) < new Date()) {
      console.error("Purchase expired:", purchase.expires_at);
      return new Response(JSON.stringify({ error: "Download link has expired" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 410,
      });
    }

    // Check download limit
    if (purchase.download_count >= purchase.max_downloads) {
      console.error("Download limit exceeded:", purchase.download_count, ">=", purchase.max_downloads);
      return new Response(JSON.stringify({ error: "Download limit exceeded" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429,
      });
    }

    console.log("Generating signed URL for file: end-of-life-conversation-playbook-instructions.pdf");

    // Generate signed URL for the PDF (valid for 1 hour) - updated filename
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from("private-downloads")
      .createSignedUrl("end-of-life-conversation-playbook-instructions.pdf", 3600);

    if (urlError) {
      console.error("Error generating signed URL:", urlError);
      return new Response(JSON.stringify({ 
        error: "Failed to generate download link",
        debug_info: {
          storage_error: urlError.message,
          bucket: "private-downloads",
          filename: "end-of-life-conversation-playbook-instructions.pdf"
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("Signed URL generated successfully");

    // Increment download count
    const { error: updateError } = await supabase
      .from("purchases")
      .update({ download_count: purchase.download_count + 1 })
      .eq("id", purchase.id);

    if (updateError) {
      console.error("Error updating download count:", updateError);
      // Don't fail the request, just log the error
    }

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
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      debug_info: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
