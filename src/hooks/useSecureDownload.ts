
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
    console.log('=== STARTING FRESH SUPABASE DOWNLOAD ===');
    console.log('Customer info:', customerInfo);
    
    setIsDownloading(true);
    
    try {
      // First, let's test our storage setup
      console.log('Testing storage setup...');
      const { data: setupData, error: setupError } = await supabase.functions.invoke('setup-storage');
      console.log('Setup response:', setupData, setupError);

      if (!setupData?.pdf_file_exists) {
        throw new Error('PDF file not found in storage. Please contact support.');
      }

      console.log('✅ PDF file confirmed in storage, proceeding with download...');
      
      // Download the PDF from Supabase storage
      const { data: pdfData, error: downloadError } = await supabase.storage
        .from('private-downloads')
        .download('end-of-life-conversation-playbook.pdf');

      console.log('Download response:', { data: !!pdfData, error: downloadError });

      if (downloadError) {
        console.error('Supabase download error:', downloadError);
        throw new Error(`Download failed: ${downloadError.message}`);
      }

      if (!pdfData) {
        throw new Error('No PDF data received from storage');
      }

      console.log('✅ PDF downloaded successfully, size:', pdfData.size, 'bytes');

      // Create and trigger download
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'End-of-Life-Conversation-Playbook.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      console.log('Triggering browser download...');
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✅ DOWNLOAD COMPLETED SUCCESSFULLY');

      setDownloadsRemaining(2);
      
      toast({
        title: "Download Complete",
        description: "Your playbook has been downloaded successfully!",
      });

    } catch (error) {
      console.error('❌ DOWNLOAD FAILED:', error);
      
      let errorMessage = 'Unable to download PDF.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Download Failed",
        description: `${errorMessage} Please contact support.`,
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
