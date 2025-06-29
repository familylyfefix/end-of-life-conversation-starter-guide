
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { checkoutFormSchema, type CheckoutFormData } from '@/lib/validation';
import UrgencyBanner from './UrgencyBanner';
import ContactInformationForm from './ContactInformationForm';
import BillingAddressForm from './BillingAddressForm';
import SocialProofSection from './SocialProofSection';

interface CheckoutFormProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
  };
  hasExpired: boolean;
  pricing: {
    current: number;
    regular: number;
    savings: number;
  };
}

const CheckoutForm = ({ timeLeft, hasExpired, pricing }: CheckoutFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      billingAddress: '',
      city: '',
      zipCode: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    try {
      console.log('Submitting form with data:', data);
      
      // Call Stripe payment function
      const { data: paymentData, error } = await supabase.functions.invoke('create-payment', {
        body: {
          customerEmail: data.email,
          customerName: `${data.firstName} ${data.lastName}`,
          amount: pricing.current * 100 // Convert to cents for Stripe
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Payment processing failed');
      }

      if (paymentData?.url) {
        console.log('Redirecting to Stripe checkout:', paymentData.url);
        // Redirect to Stripe Checkout
        window.location.href = paymentData.url;
      } else {
        throw new Error('No checkout URL received from payment processor');
      }
    } catch (error) {
      console.error('Payment error:', error);
      
      let errorMessage = 'There was an issue processing your payment. Please try again.';
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('invalid') || error.message.includes('validation')) {
          errorMessage = 'Invalid payment information. Please check your details and try again.';
        } else if (error.message) {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <UrgencyBanner 
          hasExpired={hasExpired}
          timeLeft={timeLeft}
          savings={pricing.savings}
        />

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Complete Your Order</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <ContactInformationForm form={form} />
            <BillingAddressForm form={form} />

            {/* Submit Button - Mobile Optimized */}
            <Button
              type="submit"
              size="lg"
              className="w-full text-white py-4 sm:py-4 text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity h-12 sm:h-auto touch-manipulation"
              style={{ backgroundColor: '#8da3e8' }}
              disabled={isProcessing || !form.formState.isValid}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Complete Secure Order - ${pricing.current}
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                By completing this order, you agree to our terms of service and privacy policy.
                Your payment is processed securely and your information is protected.
              </p>
            </div>
          </form>
        </Form>

        <SocialProofSection />
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
