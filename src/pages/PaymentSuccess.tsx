
import React from 'react';
import { CheckCircle, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialogSimple } from '@/components/ui/alert-dialog-simple';
import { usePaymentSuccess } from '@/hooks/usePaymentSuccess';
import PaymentVerification from '@/components/payment/PaymentVerification';
import OrderSummaryCard from '@/components/payment/OrderSummaryCard';
import SecureDownloadCard from '@/components/payment/SecureDownloadCard';
import WhatsNextCard from '@/components/payment/WhatsNextCard';

const PaymentSuccess = () => {
  const {
    isDownloading,
    isVerifyingPayment,
    paymentVerified,
    downloadsRemaining,
    sessionId,
    isCreatingTestPurchase,
    verificationError,
    downloadUrl,
    handleCreateTestPurchase,
    handleSecureDownload
  } = usePaymentSuccess();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2" style={{ borderColor: '#f8f3f0' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/e3788226-80d2-4a3c-9279-757104cd413f.png" 
                alt="Family Lyfe Fix Logo" 
                className="h-8"
              />
            </div>
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/'}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: '#e8f5e8' }}>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Payment Successful!
          </h1>
          
          <PaymentVerification
            isVerifying={isVerifyingPayment}
            paymentVerified={paymentVerified}
            verificationError={verificationError}
            sessionId={sessionId}
            onCreateTestPurchase={handleCreateTestPurchase}
            isCreatingTestPurchase={isCreatingTestPurchase}
          />

          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your End-of-Life Conversation Playbook is ready for secure download.
          </p>

          <OrderSummaryCard sessionId={sessionId} />

          <SecureDownloadCard
            isDownloading={isDownloading}
            isVerifying={isVerifyingPayment}
            downloadsRemaining={downloadsRemaining}
            downloadUrl={downloadUrl}
            onDownload={handleSecureDownload}
          />

          <WhatsNextCard />

          {/* Support */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Need help or have questions about your purchase?
            </p>
            <Button variant="outline" className="border-2" style={{ borderColor: '#8da3e8', color: '#8da3e8' }}>
              Contact Support
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
              <span className="text-sm text-gray-600 ml-2">4.9/5 average rating</span>
            </div>
            <p className="text-sm text-gray-500">
              Join 50+ families who have successfully used this guide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
