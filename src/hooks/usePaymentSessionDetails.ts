import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SessionDetails {
  id: string;
  payment_status: string;
  customer_email: string;
  customer_name: string;
  amount_total: number;
  currency: string;
  metadata?: any;
}

export const usePaymentSessionDetails = (sessionId: string | null) => {
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSessionDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Fetching payment session details for:', sessionId);
        
        const { data, error } = await supabase.functions.invoke('get-payment-session', {
          body: { sessionId }
        });

        if (error) {
          throw new Error(error.message || 'Failed to retrieve session details');
        }

        if (data?.success && data?.session) {
          console.log('Session details retrieved:', data.session);
          setSessionDetails(data.session);
        } else {
          throw new Error(data?.error || 'Invalid session data');
        }
      } catch (err) {
        console.error('Error fetching session details:', err);
        setError(err instanceof Error ? err.message : 'Failed to load session details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  return {
    sessionDetails,
    isLoading,
    error
  };
};