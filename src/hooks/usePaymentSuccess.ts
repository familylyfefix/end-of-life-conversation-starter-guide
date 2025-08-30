
import { useStandardizedDownload } from './useStandardizedDownload';
import { usePaymentVerification } from './usePaymentVerification';
import { usePaymentSession } from './usePaymentSession';
import { usePaymentSessionDetails } from './usePaymentSessionDetails';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePaymentSuccess = () => {
  const { sessionId, customerInfo } = usePaymentSession();
  const { sessionDetails, isLoading: isLoadingSession } = usePaymentSessionDetails(sessionId);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const { 
    isDownloading,
    downloadsRemaining,
    handleSecureDownload: standardizedDownload
  } = useStandardizedDownload();

  // Verify payment when session ID is available
  useEffect(() => {
    if (!sessionId || paymentVerified) return;

    const verifyPayment = async () => {
      setIsVerifyingPayment(true);
      setVerificationError(null);
      
      try {
        console.log('Verifying payment for session:', sessionId);
        
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { session_id: sessionId }
        });

        if (error) {
          throw new Error(error.message || 'Payment verification failed');
        }

        if (data?.success) {
          console.log('Payment verified successfully');
          setPaymentVerified(true);
        } else {
          throw new Error(data?.error || 'Payment verification failed');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setVerificationError(err instanceof Error ? err.message : 'Verification failed');
      } finally {
        setIsVerifyingPayment(false);
      }
    };

    verifyPayment();
  }, [sessionId, paymentVerified]);

  const handleSecureDownload = () => {
    if (sessionId) {
      standardizedDownload(sessionId, customerInfo);
    }
  };

  const handleCreateTestPurchase = async () => {
    // This is now handled through the verify-payment function
    setPaymentVerified(true);
    setVerificationError(null);
  };

  return {
    isDownloading,
    isVerifyingPayment: isVerifyingPayment || isLoadingSession,
    paymentVerified,
    downloadsRemaining,
    sessionId,
    sessionDetails,
    isCreatingTestPurchase: false,
    verificationError,
    downloadUrl: null, // No longer using public URLs
    handleCreateTestPurchase,
    handleSecureDownload
  };
};
