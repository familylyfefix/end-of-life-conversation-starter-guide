
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePaymentSuccess = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [downloadsRemaining, setDownloadsRemaining] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCreatingTestPurchase, setIsCreatingTestPurchase] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('session_id');
    console.log('Session ID from URL:', id);
    setSessionId(id);
    
    if (id) {
      verifyPayment(id);
    } else {
      setIsVerifyingPayment(false);
      setVerificationError('No session ID found in URL');
    }
  }, []);

  const verifyPayment = async (sessionId: string) => {
    try {
      console.log('Starting payment verification for session:', sessionId);
      
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { session_id: sessionId }
      });

      console.log('Verification response:', { data, error });

      if (error) {
        console.error('Verification error:', error);
        throw new Error(`Verification failed: ${error.message}`);
      }

      if (data?.success) {
        console.log('Payment verified successfully');
        setPaymentVerified(true);
        setVerificationError(null);
        toast({
          title: "Payment Verified",
          description: "Your purchase has been confirmed and is ready for download.",
        });
      } else {
        throw new Error(data?.error || 'Unknown verification error');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setVerificationError(errorMsg);
      toast({
        title: "Payment Verification Failed",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  const handleCreateTestPurchase = async () => {
    if (!sessionId) {
      toast({
        title: "Error",
        description: "No session ID found",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingTestPurchase(true);
    
    try {
      console.log('Creating test purchase for session:', sessionId);
      const { data, error } = await supabase.functions.invoke('create-test-purchase', {
        body: { session_id: sessionId }
      });

      console.log('Test purchase response:', { data, error });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success) {
        setPaymentVerified(true);
        setVerificationError(null);
        toast({
          title: "Test Purchase Created",
          description: "A test purchase record has been created. Try downloading now.",
        });
      }
    } catch (error) {
      console.error('Test purchase creation error:', error);
      toast({
        title: "Error",
        description: "Failed to create test purchase record",
        variant: "destructive"
      });
    } finally {
      setIsCreatingTestPurchase(false);
    }
  };

  const handleSecureDownload = async () => {
    if (!sessionId) {
      toast({
        title: "Download Error",
        description: "No session ID found. Please contact support with your order details.",
        variant: "destructive"
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      console.log('Starting download for session:', sessionId);
      const { data, error } = await supabase.functions.invoke('generate-download-link', {
        body: { session_id: sessionId }
      });

      console.log('Download response:', { data, error });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.download_url) {
        const link = document.createElement('a');
        link.href = data.download_url;
        link.download = 'End-of-Life-Conversation-Playbook.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadsRemaining(data.downloads_remaining);
        
        toast({
          title: "Download Started",
          description: `Download started successfully. ${data.downloads_remaining} downloads remaining.`,
        });
      }
    } catch (error) {
      console.error('Download error:', error);
      
      let errorMsg = 'Failed to generate download link. Please try again.';
      
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        if (message.includes('expired')) {
          errorMsg = 'Your download link has expired. Please contact support for assistance.';
        } else if (message.includes('limit exceeded')) {
          errorMsg = 'You have reached the maximum number of downloads for this purchase.';
        } else if (message.includes('not found')) {
          errorMsg = 'Purchase not found. Please contact support with your order details.';
        } else {
          errorMsg = error.message;
        }
      }
      
      toast({
        title: "Download Error",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
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
