
import { usePublicDownload } from './usePublicDownload';
import { usePaymentVerification } from './usePaymentVerification';
import { usePaymentSession } from './usePaymentSession';
import { useEffect } from 'react';

export const usePaymentSuccess = () => {
  const { sessionId, customerInfo } = usePaymentSession();
  const { 
    isVerifyingPayment,
    paymentVerified,
    isCreatingTestPurchase,
    verificationError,
    handleCreateTestPurchase
  } = usePaymentVerification();
  const { 
    isDownloading,
    downloadUrl,
    initializeDownload,
    handleDirectDownload
  } = usePublicDownload();

  // Initialize download URL when payment is verified
  useEffect(() => {
    if (paymentVerified && !downloadUrl && !isDownloading) {
      console.log('Payment verified, initializing download...');
      initializeDownload();
    }
  }, [paymentVerified, downloadUrl, isDownloading, initializeDownload]);

  const handleSecureDownload = () => {
    handleDirectDownload(customerInfo);
  };

  return {
    isDownloading,
    isVerifyingPayment,
    paymentVerified,
    downloadsRemaining: 3, // Static since we're using public links
    sessionId,
    isCreatingTestPurchase,
    verificationError,
    downloadUrl,
    handleCreateTestPurchase,
    handleSecureDownload
  };
};
