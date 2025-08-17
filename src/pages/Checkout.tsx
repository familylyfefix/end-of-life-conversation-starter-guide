
import React, { useState } from 'react';
import { usePersonalizedTimer } from '@/hooks/usePersonalizedTimer';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutProgressIndicator from '@/components/checkout/CheckoutProgressIndicator';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import TrustElements from '@/components/checkout/TrustElements';
import CheckoutSkeleton from '@/components/checkout/CheckoutSkeleton';
import OrderSummarySkeleton from '@/components/checkout/OrderSummarySkeleton';

const Checkout = () => {
  const { timeLeft, hasExpired, isLoading, pricing } = usePersonalizedTimer();
  const [sharedCouponData, setSharedCouponData] = useState<{
    appliedCoupon?: any;
    finalPricing?: any;
  }>({});

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
      <CheckoutHeader />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <CheckoutProgressIndicator />

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Order Summary (Mobile: shows second) */}
            <div className="order-2 lg:order-1">
              {isLoading ? (
                <OrderSummarySkeleton />
              ) : (
                <OrderSummary 
                  pricing={pricing}
                  appliedCoupon={sharedCouponData.appliedCoupon}
                  finalPricing={sharedCouponData.finalPricing}
                />
              )}
            </div>

            {/* Right Column - Checkout Form (Mobile: shows first) */}
            <div className="order-1 lg:order-2">
              {isLoading ? (
                <CheckoutSkeleton />
              ) : (
                <CheckoutForm 
                  timeLeft={timeLeft}
                  hasExpired={hasExpired}
                  pricing={pricing}
                  onCouponDataChange={setSharedCouponData}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TrustElements />
    </div>
  );
};

export default Checkout;
