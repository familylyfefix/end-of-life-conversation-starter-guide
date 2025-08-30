import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, customerEmail } = await req.json();
    
    if (!sessionId) {
      throw new Error('Session ID is required');
    }

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    console.log('Checking purchase for session:', sessionId);

    // Check if purchase exists and is valid
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single();

    if (purchaseError || !purchase) {
      console.error('Purchase not found:', purchaseError);
      throw new Error('Purchase not found or invalid');
    }

    // Check if download limit has been reached
    if (purchase.download_count >= purchase.max_downloads) {
      throw new Error(`Download limit reached (${purchase.max_downloads} downloads)`);
    }

    // Check if purchase has expired
    const now = new Date();
    const expiresAt = new Date(purchase.expires_at);
    if (now > expiresAt) {
      throw new Error('Download link has expired');
    }

    // Increment download count
    const { error: updateError } = await supabaseAdmin
      .from('purchases')
      .update({ 
        download_count: purchase.download_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', purchase.id);

    if (updateError) {
      console.error('Error updating download count:', updateError);
    }

    console.log(`Download initiated. Count: ${purchase.download_count + 1}/${purchase.max_downloads}`);

    // Download the PDF from storage
    const { data: pdfData, error: downloadError } = await supabaseAdmin.storage
      .from('private-downloads')
      .download('end-of-life-conversation-playbook.pdf');

    if (downloadError || !pdfData) {
      console.error('Error downloading PDF:', downloadError);
      throw new Error('Failed to retrieve PDF file');
    }

    // Convert blob to base64 for frontend
    const buffer = await pdfData.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

    // Add to Kit if email provided (non-blocking)
    if (customerEmail) {
      try {
        const [firstName, lastName] = (purchase.customer_name || '').split(' ');
        await supabaseAdmin.functions.invoke('add-to-kit', {
          body: {
            email: customerEmail,
            firstName: firstName || '',
            lastName: lastName || ''
          }
        });
        console.log('Customer added to Kit successfully');
      } catch (kitError) {
        console.error('Kit integration failed (non-critical):', kitError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        pdfData: base64,
        fileName: 'End-of-Life-Conversation-Playbook.pdf',
        downloadsRemaining: purchase.max_downloads - purchase.download_count - 1,
        expiresAt: purchase.expires_at
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in secure-download:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});