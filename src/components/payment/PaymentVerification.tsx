
import React from 'react';
import { CheckCircle, AlertCircle, Loader2, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentVerificationProps {
  isVerifying: boolean;
  paymentVerified: boolean;
  verificationError: string | null;
  sessionId: string | null;
  onCreateTestPurchase: () => void;
  isCreatingTestPurchase: boolean;
}

const PaymentVerification = ({
  isVerifying,
  paymentVerified,
  verificationError,
  sessionId,
  onCreateTestPurchase,
  isCreatingTestPurchase
}: PaymentVerificationProps) => {
  return (
    <>
      {isVerifying && (
        <div className="flex items-center justify-center mb-8 p-4 bg-blue-50 rounded-lg">
          <Loader2 className="w-5 h-5 mr-2 animate-spin text-blue-600" />
          <span className="text-blue-700">Verifying your payment...</span>
        </div>
      )}

      {paymentVerified && (
        <div className="flex items-center justify-center mb-8 p-4 bg-green-50 rounded-lg">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          <span className="text-green-700">Payment verified successfully!</span>
        </div>
      )}

      {verificationError && (
        <>
          <div className="mb-8 p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              <span className="text-red-700 font-medium">Verification Failed</span>
            </div>
            <p className="text-red-600 text-sm">{verificationError}</p>
          </div>

          <Card className="mb-8 border border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Bug className="w-6 h-6 mr-2 text-orange-600" />
                <h3 className="text-lg font-semibold text-orange-800">Debug Mode</h3>
              </div>
              
              <p className="text-sm text-orange-700 mb-4">
                Payment verification failed. Try creating a test purchase record:
              </p>
              
              <Button 
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-100"
                onClick={onCreateTestPurchase}
                disabled={isCreatingTestPurchase || !sessionId}
              >
                {isCreatingTestPurchase ? "Creating..." : "Create Test Purchase"}
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default PaymentVerification;
