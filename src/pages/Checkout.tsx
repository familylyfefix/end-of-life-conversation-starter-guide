
import React from 'react';
import { usePersonalizedTimer } from '@/hooks/usePersonalizedTimer';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutProgressIndicator from '@/components/checkout/CheckoutProgressIndicator';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import TrustElements from '@/components/checkout/TrustElements';

const Checkout = () => {
  const { timeLeft, hasExpired, isLoading, pricing } = usePersonalizedTimer();

  // Show loading state while timer initializes
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
      <CheckoutHeader />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <CheckoutProgressIndicator />

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Order Summary (Mobile: shows second) */}
            <div className="order-2 lg:order-1">
              <OrderSummary pricing={pricing} />
            </div>

            {/* Right Column - Checkout Form (Mobile: shows first) */}
            <div className="order-1 lg:order-2">
              <CheckoutForm 
                timeLeft={timeLeft}
                hasExpired={hasExpired}
                pricing={pricing}
              />
            </div>
          </div>
        </div>
      </div>

      <TrustElements />
    </div>
  );
};

export default Checkout;
