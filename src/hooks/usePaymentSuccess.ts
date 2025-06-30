
import { useSecureDownload } from './useSecureDownload';
import { usePaymentVerification } from './usePaymentVerification';
import { usePaymentSession } from './usePaymentSession';

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
    downloadsRemaining,
    handleSecureDownload: originalHandleSecureDownload
  } = useSecureDownload();

  const handleSecureDownload = () => {
    originalHandleSecureDownload(customerInfo);
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
