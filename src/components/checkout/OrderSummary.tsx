import React from 'react';
import { Check, Shield, Lock, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OrderSummaryProps {
  pricing: {
    current: number;
    regular: number;
    savings: number;
  };
  appliedCoupon?: {
    id: string;
    name?: string;
    percentOff?: number;
    amountOff?: number;
  };
  finalPricing?: {
    originalAmount: number;
    discountAmount: number;
    finalAmount: number;
    couponApplied: boolean;
  };
}

const OrderSummary = ({ pricing, appliedCoupon, finalPricing }: OrderSummaryProps) => {
  const features = [
    "Complete Preparation System",
    "Conversation Scripts Library", 
    "Meeting Planning & Tracking",
    "Topic-by-Topic Guidance",
    "Family Coordination Tools",
    "Follow-Up Framework"
  ];

  const testimonials = [
    {
      name: "Brooklyn M.",
      text: "This guide gave me the courage to finally talk to my parents about their wishes. The conversation starters were perfect - not too heavy, but thorough.",
      rating: 5
    },
    {
      name: "James K.",
      text: "I needed help discussing this with my adult children. The guide made it so much easier than I expected.",
      rating: 5
    }
  ];

  return (
    <Card className="lg:sticky lg:top-8">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>
        
        {/* Product - Mobile Optimized */}
        <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg" style={{ backgroundColor: '#f8f3f0' }}>
          <img 
            src="/lovable-uploads/e859eb8e-6409-4b8d-85f5-b40fbf68e148.png" 
            alt="Product"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">End-of-Lyfe Conversation Playbook</h3>
            <p className="text-xs sm:text-sm text-gray-600">Complete digital guide + templates</p>
            <Badge className="mt-1 sm:mt-2 text-xs" style={{ backgroundColor: '#ff8a58', color: 'white' }}>
              Digital Download
            </Badge>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-bold text-lg sm:text-xl" style={{ color: '#ff8a58' }}>${pricing.current}</div>
            {pricing.savings > 0 && (
              <div className="text-xs sm:text-sm text-gray-500 line-through">${pricing.regular}</div>
            )}
          </div>
        </div>

        {/* What's Included - Mobile Optimized */}
        <div className="mb-4 sm:mb-6">
          <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">What's Included:</h4>
          <div className="space-y-1.5 sm:space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start text-xs sm:text-sm text-gray-700">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Breakdown - Mobile Optimized */}
        <div className="border-t pt-3 sm:pt-4 space-y-1.5 sm:space-y-2">
          <div className="flex justify-between text-sm sm:text-base text-gray-700">
            <span>Subtotal:</span>
            <span>${pricing.regular}.00</span>
          </div>
          {pricing.savings > 0 && (
            <div className="flex justify-between text-sm sm:text-base text-gray-700">
              <span>Discount:</span>
              <span className="text-green-600">-${pricing.savings}.00</span>
            </div>
          )}
          
          {/* Coupon Discount */}
          {appliedCoupon && finalPricing && finalPricing.discountAmount > 0 && (
            <div className="flex justify-between text-sm sm:text-base bg-green-50 p-2 rounded">
              <span className="text-green-700 font-medium">
                Coupon: {appliedCoupon.id}
                {appliedCoupon.percentOff && ` (${appliedCoupon.percentOff}% off)`}
              </span>
              <span className="font-semibold text-green-600">
                -${(finalPricing.discountAmount).toFixed(2)}
              </span>
            </div>
          )}
          
          <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 border-t pt-2">
            <span>Total:</span>
            <span style={{ color: '#ff8a58' }}>
              ${(finalPricing?.finalAmount || pricing.current).toFixed(2)}
            </span>
          </div>
          
          {appliedCoupon && finalPricing && finalPricing.discountAmount > 0 && (
            <div className="text-sm text-green-600 text-right">
              Total savings: ${(pricing.savings + finalPricing.discountAmount).toFixed(2)}
            </div>
          )}
        </div>

        {/* Trust Badges - Mobile Optimized */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>

        {/* Testimonials - Mobile Optimized */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
          <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-center text-sm sm:text-base">What Others Say</h4>
          <div className="space-y-3 sm:space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-1.5 sm:mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                <p className="text-xs sm:text-sm font-medium text-gray-900 mt-1">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
