
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CustomerInfo {
  email: string;
  name: string;
}

export const usePublicDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const initializeDownload = async () => {
    console.log('=== INITIALIZING PUBLIC DOWNLOAD ===');
    setIsDownloading(true);
    
    try {
      // Get the public URL from our setup function
      const { data: setupData, error: setupError } = await supabase.functions.invoke('setup-storage');
      console.log('Setup response:', setupData, setupError);

      if (setupError) {
        throw new Error(`Setup error: ${setupError.message}`);
      }

      if (!setupData?.success) {
        throw new Error(setupData?.error || 'Failed to setup download');
      }

      if (!setupData?.pdf_file_exists || !setupData?.public_url) {
        throw new Error('PDF file not found in storage. Please contact support.');
      }

      console.log('✅ Public download URL ready:', setupData.public_url);
      console.log('File details:', { 
        name: setupData.file_name, 
        size: setupData.file_size 
      });
      
      setDownloadUrl(setupData.public_url);
      
      toast({
        title: "Download Ready",
        description: "Your playbook download link is ready!",
      });

    } catch (error) {
      console.error('❌ Download initialization failed:', error);
      
      let errorMessage = 'Unable to prepare download.';
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
    }
  };

  const handleDirectDownload = (customerInfo?: CustomerInfo | null) => {
    if (!downloadUrl) {
      console.log('No download URL available, initializing...');
      initializeDownload();
      return;
    }

    console.log('=== STARTING DIRECT DOWNLOAD ===');
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'End-of-Life-Conversation-Playbook.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('✅ Download triggered successfully');
    
    toast({
      title: "Download Started",
      description: "Your playbook download has started!",
    });

    // Add to Kit if email provided
    if (customerInfo?.email) {
      console.log('Adding customer to Kit...');
      supabase.functions.invoke('add-to-kit', {
        body: {
          email: customerInfo.email,
          firstName: customerInfo.name.split(' ')[0] || '',
          lastName: customerInfo.name.split(' ')[1] || ''
        }
      }).then(() => {
        console.log('✅ Customer added to Kit successfully');
      }).catch((kitError) => {
        console.error('Kit integration failed (non-critical):', kitError);
      });
    }
  };

  return {
    isDownloading,
    downloadUrl,
    initializeDownload,
    handleDirectDownload
  };
};
