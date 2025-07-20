
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { checkoutFormSchema, type CheckoutFormData } from '@/lib/validation';
import UrgencyBanner from './UrgencyBanner';
import ContactInformationForm from './ContactInformationForm';
import BillingAddressForm from './BillingAddressForm';
import SocialProofSection from './SocialProofSection';
import TermsModal from './TermsModal';

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
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      billingAddress: '',
      city: '',
      zipCode: '',
      termsAccepted: false
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    try {
      console.log('Submitting form with data:', data);
      
      // Call Stripe payment function with better error handling
      const { data: paymentData, error } = await supabase.functions.invoke('create-payment', {
        body: {
          customerEmail: data.email,
          customerName: `${data.firstName} ${data.lastName}`,
          amount: pricing.current * 100 // Convert to cents for Stripe
        }
      });

      console.log('Payment response:', { paymentData, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Payment processing failed');
      }

      if (paymentData?.url) {
        console.log('Redirecting to Stripe checkout:', paymentData.url);
        // Use window.location.href for better compatibility
        window.location.href = paymentData.url;
      } else {
        throw new Error('No checkout URL received from payment processor');
      }
    } catch (error) {
      console.error('Payment error:', error);
      
      let errorMessage = 'There was an issue processing your payment. Please try again.';
      
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        
        if (message.includes('stripe')) {
          errorMessage = 'Payment system error. Please try again or contact support.';
        } else if (message.includes('network') || message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (message.includes('invalid')) {
          errorMessage = 'Please check your information and try again.';
        } else if (error.message && error.message.length > 0) {
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

            {/* Terms and Conditions Checkbox */}
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <p className="text-sm text-gray-700">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setIsTermsModalOpen(true)}
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        terms of service and privacy policy
                      </button>
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

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
          </form>
        </Form>

        <SocialProofSection />

        {/* Terms Modal */}
        <TermsModal 
          open={isTermsModalOpen} 
          onOpenChange={setIsTermsModalOpen} 
        />
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
