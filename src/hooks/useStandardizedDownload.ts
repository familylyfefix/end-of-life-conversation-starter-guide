import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CustomerInfo {
  email: string;
  name: string;
}

export const useStandardizedDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadsRemaining, setDownloadsRemaining] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSecureDownload = useCallback(async (sessionId: string, customerInfo?: CustomerInfo | null) => {
    console.log('=== STARTING SECURE DOWNLOAD ===');
    console.log('Session ID:', sessionId);
    console.log('Customer info:', customerInfo);
    
    setIsDownloading(true);
    
    try {
      // Call the secure-download edge function
      const { data, error } = await supabase.functions.invoke('secure-download', {
        body: {
          sessionId,
          customerEmail: customerInfo?.email
        }
      });

      console.log('Secure download response:', { data, error });

      if (error) {
        throw new Error(error.message || 'Download failed');
      }

      if (!data?.success || !data?.pdfData) {
        throw new Error(data?.error || 'Failed to retrieve download');
      }

      // Convert base64 to blob and trigger download
      const binaryString = atob(data.pdfData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = data.fileName || 'End-of-Life-Conversation-Playbook.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      console.log('Triggering browser download...');
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✅ DOWNLOAD COMPLETED SUCCESSFULLY');
      
      // Update remaining downloads
      if (data.downloadsRemaining !== undefined) {
        setDownloadsRemaining(data.downloadsRemaining);
      }
      
      toast({
        title: "Download Complete",
        description: `Your playbook has been downloaded successfully! ${data.downloadsRemaining} downloads remaining.`,
      });

    } catch (error) {
      console.error('❌ DOWNLOAD FAILED:', error);
      
      let errorMessage = 'Unable to download PDF.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Download Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
      console.log('=== DOWNLOAD PROCESS COMPLETED ===');
    }
  }, [toast]);

  return {
    isDownloading,
    downloadsRemaining,
    handleSecureDownload
  };
};