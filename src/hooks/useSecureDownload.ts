
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
    console.log('=== STARTING PDF DOWNLOAD FROM SUPABASE ===');
    setIsDownloading(true);
    
    try {
      // First, let's check if the bucket exists
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      console.log('Available buckets:', buckets);
      
      if (bucketError) {
        console.error('Error listing buckets:', bucketError);
      }

      // Try to list files in the private-downloads bucket
      const { data: files, error: listError } = await supabase.storage
        .from('private-downloads')
        .list('');
      
      console.log('Files in private-downloads bucket:', files);
      if (listError) {
        console.error('Error listing files:', listError);
      }

      // Download the actual PDF from Supabase storage
      const { data, error } = await supabase.storage
        .from('private-downloads')
        .download('End-of-Life-Conversation-Playbook.pdf');

      if (error) {
        console.error('Supabase storage error:', error);
        
        // If the file doesn't exist, create a fallback download
        throw new Error(`Failed to download PDF from storage: ${error.message}`);
      }

      if (!data) {
        throw new Error('No PDF data received from storage');
      }

      console.log('PDF data received, size:', data.size);

      // Create download link from the blob
      const url = URL.createObjectURL(data);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'End-of-Life-Conversation-Playbook.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      URL.revokeObjectURL(url);

      setDownloadsRemaining(2);
      
      toast({
        title: "Download Started",
        description: "Your End-of-Life Conversation Playbook has been downloaded successfully!",
      });

      // Add customer to Kit after successful download
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
          console.log('Customer added to Kit successfully');
        } catch (kitError) {
          console.error('Kit integration failed:', kitError);
          // Don't show error to user - download already worked
        }
      }

    } catch (error) {
      console.error('Download error:', error);
      
      toast({
        title: "Download Error",
        description: `There was an issue downloading your PDF: ${error.message}. Please contact support.`,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
      console.log('=== DOWNLOAD COMPLETE ===');
    }
  };

  return {
    isDownloading,
    downloadsRemaining,
    handleSecureDownload
  };
};
