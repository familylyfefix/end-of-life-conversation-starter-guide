
import { useState, useEffect } from 'react';

interface CustomerInfo {
  email: string;
  name: string;
}

export const usePaymentSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('session_id');
    console.log('Session ID from URL:', id);
    setSessionId(id);
    
    if (id) {
      console.log('Payment assumed successful');
      // Extract customer info from URL if available
      const email = urlParams.get('customer_email') || '';
      const name = urlParams.get('customer_name') || '';
      if (email) {
        setCustomerInfo({ email, name });
      }
    }
  }, []);

  return {
    sessionId,
    customerInfo
  };
};
