
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
    console.log('=== STARTING SUPABASE DOWNLOAD ===');
    console.log('Customer info:', customerInfo);
    setIsDownloading(true);
    
    try {
      console.log('Attempting to download from Supabase storage...');
      
      // Download the PDF directly from Supabase storage
      const { data, error } = await supabase.storage
        .from('private-downloads')
        .download('end-of-life-conversation-playbook.pdf');

      console.log('Supabase download response:', { data, error });

      if (error) {
        console.error('Supabase download error:', error);
        throw new Error(`Failed to download PDF from Supabase: ${error.message}`);
      }

      if (!data) {
        throw new Error('No PDF data received from Supabase storage');
      }

      console.log('✅ PDF downloaded from Supabase successfully, size:', data.size, 'bytes');

      // Create download link and trigger download
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'End-of-Life-Conversation-Playbook.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      console.log('Triggering download...');
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✅ DOWNLOAD COMPLETE - FILE DELIVERED TO USER');

      setDownloadsRemaining(2);
      
      toast({
        title: "Download Complete",
        description: "Your playbook has been downloaded successfully from secure storage!",
      });

      // Add to Kit if email provided
      if (customerInfo?.email) {
        console.log('Adding customer to Kit...');
        try {
          const [firstName, lastName] = customerInfo.name.split(' ');
          await supabase.functions.invoke('add-to-kit', {
            body: {
              email: customerInfo.email,
              firstName: firstName || '',
              lastName: lastName || ''
            }
          });
          console.log('✅ Customer added to Kit successfully');
        } catch (kitError) {
          console.error('Kit integration failed (non-critical):', kitError);
        }
      }

    } catch (error) {
      console.error('❌ DOWNLOAD FAILED:', error);
      
      let errorMessage = 'Unable to download PDF from secure storage.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Download Failed",
        description: `${errorMessage} Please contact support if this continues.`,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
      console.log('=== DOWNLOAD PROCESS COMPLETED ===');
    }
  };

  return {
    isDownloading,
    downloadsRemaining,
    handleSecureDownload
  };
};
