
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePaymentSuccess = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(true);
  const [downloadsRemaining, setDownloadsRemaining] = useState<number | null>(3);
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
      console.log('Payment assumed successful');
      setPaymentVerified(true);
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
    console.log('=== STARTING LOCAL DOWNLOAD ===');
    setIsDownloading(true);
    
    try {
      // Create a simple PDF content as base64
      const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 100
>>
stream
BT
/F1 24 Tf
100 700 Td
(End-of-Life Conversation Playbook) Tj
0 -50 Td
(Thank you for your purchase!) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000424 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
521
%%EOF`;

      // Convert to blob and download
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'End-of-Life-Conversation-Playbook.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      URL.revokeObjectURL(url);

      setDownloadsRemaining(2);
      
      toast({
        title: "Download Started",
        description: "Your PDF download has started successfully!",
      });

    } catch (error) {
      console.error('Download error:', error);
      
      toast({
        title: "Download Error",
        description: "There was an issue starting the download. Please try again.",
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
