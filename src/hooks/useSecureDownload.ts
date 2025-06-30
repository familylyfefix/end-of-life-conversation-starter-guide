
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
    console.log('=== STARTING PDF DOWNLOAD FROM SUPABASE ONLY ===');
    setIsDownloading(true);
    
    try {
      // Check if the bucket exists first
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      console.log('Available buckets:', buckets);
      
      if (bucketError) {
        console.error('Error listing buckets:', bucketError);
        throw new Error('Unable to access storage system');
      }

      const privateBucket = buckets?.find(b => b.name === 'private-downloads');
      if (!privateBucket) {
        // Try to create the bucket first
        console.log('Creating private-downloads bucket...');
        const { error: createError } = await supabase.storage.createBucket('private-downloads', {
          public: false,
          allowedMimeTypes: ['application/pdf'],
          fileSizeLimit: 50 * 1024 * 1024 // 50MB
        });
        
        if (createError && !createError.message.includes('already exists')) {
          console.error('Error creating bucket:', createError);
          throw new Error('Cannot create storage bucket. Please contact support.');
        }
      }

      // List files in the bucket
      const { data: files, error: listError } = await supabase.storage
        .from('private-downloads')
        .list('');
      
      console.log('Files in private-downloads bucket:', files);
      if (listError) {
        console.error('Error listing files:', listError);
        throw new Error('Unable to access files in storage bucket');
      }

      // Look for the PDF file (try both variations)
      let pdfFile = files?.find(f => f.name === 'end-of-life-conversation-playbook.pdf');
      let fileName = 'end-of-life-conversation-playbook.pdf';
      
      if (!pdfFile) {
        pdfFile = files?.find(f => f.name === 'End-of-Life-Conversation-Playbook.pdf');
        fileName = 'End-of-Life-Conversation-Playbook.pdf';
      }
      
      if (!pdfFile) {
        console.error('Available files:', files?.map(f => f.name));
        throw new Error('PDF file not found in storage. Available files: ' + (files?.map(f => f.name).join(', ') || 'none'));
      }

      console.log('Found PDF file:', fileName);

      // Download directly from Supabase storage - NO GOOGLE DRIVE
      const { data, error } = await supabase.storage
        .from('private-downloads')
        .download(fileName);

      if (error) {
        console.error('Supabase storage download error:', error);
        throw new Error(`Failed to download PDF from Supabase: ${error.message}`);
      }

      if (!data) {
        throw new Error('No PDF data received from Supabase storage');
      }

      console.log('PDF data received from SUPABASE, size:', data.size, 'bytes');

      // Create blob URL and download - COMPLETELY BYPASSING GOOGLE
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'End-of-Life-Conversation-Playbook.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Force download
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✅ PDF DOWNLOADED SUCCESSFULLY FROM SUPABASE - NO GOOGLE INVOLVED');

      setDownloadsRemaining(2);
      
      toast({
        title: "Download Started",
        description: "Your End-of-Life Conversation Playbook has been downloaded successfully from secure storage!",
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
        title: "Download Failed",
        description: error.message || "Unable to download PDF. Please contact support.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
      console.log('=== DOWNLOAD PROCESS COMPLETE ===');
    }
  };

  return {
    isDownloading,
    downloadsRemaining,
    handleSecureDownload
  };
};
