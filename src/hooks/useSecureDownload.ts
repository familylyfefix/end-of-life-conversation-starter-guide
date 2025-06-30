
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
      // First, ensure storage bucket exists
      console.log('Setting up storage bucket...');
      const { data: setupData, error: setupError } = await supabase.functions.invoke('setup-storage');
      
      if (setupError) {
        console.error('Storage setup error:', setupError);
      } else {
        console.log('Storage setup result:', setupData);
      }

      // Check if the bucket exists
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      console.log('Available buckets:', buckets);
      
      if (bucketError) {
        console.error('Error listing buckets:', bucketError);
        throw new Error('Unable to access storage system');
      }

      const privateBucket = buckets?.find(b => b.name === 'private-downloads');
      if (!privateBucket) {
        throw new Error('Storage bucket "private-downloads" does not exist. Please create it in your Supabase dashboard and upload your PDF file.');
      }

      // Try to list files in the private-downloads bucket
      const { data: files, error: listError } = await supabase.storage
        .from('private-downloads')
        .list('');
      
      console.log('Files in private-downloads bucket:', files);
      if (listError) {
        console.error('Error listing files:', listError);
        throw new Error('Unable to access files in storage bucket');
      }

      // Look for the PDF file with the correct filename (lowercase)
      const pdfFile = files?.find(f => f.name === 'end-of-life-conversation-playbook.pdf');
      if (!pdfFile) {
        throw new Error('PDF file "end-of-life-conversation-playbook.pdf" not found in storage. Please upload the file to the private-downloads bucket.');
      }

      // Download the actual PDF from Supabase storage using the correct filename
      const { data, error } = await supabase.storage
        .from('private-downloads')
        .download('end-of-life-conversation-playbook.pdf');

      if (error) {
        console.error('Supabase storage error:', error);
        throw new Error(`Failed to download PDF: ${error.message}`);
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
        title: "Setup Required",
        description: error.message || "Please upload your PDF to the Supabase storage bucket first.",
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
