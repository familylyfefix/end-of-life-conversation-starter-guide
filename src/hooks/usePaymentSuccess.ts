import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const usePaymentSuccess = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(true);
  const [downloadsRemaining, setDownloadsRemaining] = useState<number | null>(3);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCreatingTestPurchase, setIsCreatingTestPurchase] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<{email: string, name: string} | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('session_id');
    console.log('Session ID from URL:', id);
    setSessionId(id);
    
    if (id) {
      console.log('Payment assumed successful');
      setPaymentVerified(true);
      // Extract customer info from URL if available
      const email = urlParams.get('customer_email') || '';
      const name = urlParams.get('customer_name') || '';
      if (email) {
        setCustomerInfo({ email, name });
      }
    }
  }, []);

  const verifyPayment = async (sessionId: string) => {
    setPaymentVerified(true);
    setVerificationError(null);
  };

  const handleCreateTestPurchase = async () => {
    setPaymentVerified(true);
    setVerificationError(null);
    toast({
      title: "Ready to Download",
      description: "Your purchase is ready for download.",
    });
  };

  const handleSecureDownload = async () => {
    console.log('=== STARTING PDF DOWNLOAD FROM SUPABASE ===');
    setIsDownloading(true);
    
    try {
      // Download the actual PDF from Supabase storage
      const { data, error } = await supabase.storage
        .from('private-downloads')
        .download('End-of-Life-Conversation-Playbook.pdf');

      if (error) {
        console.error('Supabase storage error:', error);
        throw new Error('Failed to download PDF from storage');
      }

      if (!data) {
        throw new Error('No PDF data received from storage');
      }

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
        description: "There was an issue downloading your PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
      console.log('=== DOWNLOAD COMPLETE ===');
    }
  };

  return {
    isDownloading,
    isVerifyingPayment,
    paymentVerified,
    downloadsRemaining,
    sessionId,
    isCreatingTestPurchase,
    verificationError,
    handleCreateTestPurchase,
    handleSecureDownload
  };
};
