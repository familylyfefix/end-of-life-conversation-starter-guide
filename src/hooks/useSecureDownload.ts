
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CustomerInfo {
  email: string;
  name: string;
}

export const useSecureDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadsRemaining, setDownloadsRemaining] = useState<number | null>(3);
  const { toast } = useToast();

  const handleSecureDownload = async (customerInfo?: CustomerInfo | null) => {
    console.log('=== STARTING SUPABASE-ONLY PDF DOWNLOAD ===');
    setIsDownloading(true);
    
    try {
      // Download the PDF directly from Supabase storage
      const { data, error } = await supabase.storage
        .from('private-downloads')
        .download('end-of-life-conversation-playbook.pdf');

      if (error) {
        console.error('Supabase download error:', error);
        throw new Error(`Failed to download PDF: ${error.message}`);
      }

      if (!data) {
        throw new Error('No PDF data received from storage');
      }

      console.log('✅ PDF downloaded from Supabase, size:', data.size, 'bytes');

      // Create download link
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'End-of-Life-Conversation-Playbook.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✅ PDF DOWNLOAD COMPLETE');

      setDownloadsRemaining(2);
      
      toast({
        title: "Download Complete",
        description: "Your playbook has been downloaded successfully!",
      });

      // Add to Kit if email provided
      if (customerInfo?.email) {
        try {
          const [firstName, lastName] = customerInfo.name.split(' ');
          await supabase.functions.invoke('add-to-kit', {
            body: {
              email: customerInfo.email,
              firstName: firstName || '',
              lastName: lastName || ''
            }
          });
          console.log('✅ Customer added to Kit');
        } catch (kitError) {
          console.error('Kit integration failed:', kitError);
        }
      }

    } catch (error) {
      console.error('❌ Download failed:', error);
      
      toast({
        title: "Download Failed",
        description: error.message || "Unable to download PDF. Please contact support.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    downloadsRemaining,
    handleSecureDownload
  };
};
