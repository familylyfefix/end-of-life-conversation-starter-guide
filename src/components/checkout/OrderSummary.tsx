
import React from 'react';
import { Check, Shield, Lock, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OrderSummaryProps {
  pricing: {
    current: number;
    regular: number;
    savings: number;
  };
}

const OrderSummary = ({ pricing }: OrderSummaryProps) => {
  const features = [
    "Complete conversation starter guide",
    "Word-for-word scripts for difficult topics",
    "Family meeting planning templates",
    "Legal document checklist",
    "Healthcare directive guidance",
    "Funeral planning worksheets"
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "This guide made the impossible conversation possible. My family is so grateful.",
      rating: 5
    },
    {
      name: "Robert K.",
      text: "Worth every penny. Saved us from potential family conflicts later.",
      rating: 5
    }
  ];

  return (
    <Card className="sticky top-8">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
        
        {/* Product */}
        <div className="flex items-start space-x-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: '#f8f3f0' }}>
          <img 
            src="/lovable-uploads/e859eb8e-6409-4b8d-85f5-b40fbf68e148.png" 
            alt="Product"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">End-of-Life Conversation Playbook</h3>
            <p className="text-sm text-gray-600">Complete digital guide + templates</p>
            <Badge className="mt-2" style={{ backgroundColor: '#ff8a58', color: 'white' }}>
              Digital Download
            </Badge>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl" style={{ color: '#ff8a58' }}>${pricing.current}</div>
            {pricing.savings > 0 && (
              <div className="text-sm text-gray-500 line-through">${pricing.regular}</div>
            )}
          </div>
        </div>

        {/* What's Included */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>${pricing.regular}.00</span>
          </div>
          {pricing.savings > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Discount:</span>
              <span className="text-green-600">-${pricing.savings}.00</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2">
            <span>Total:</span>
            <span style={{ color: '#ff8a58' }}>${pricing.current}.00</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-1" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold text-gray-900 mb-4 text-center">What Others Say</h4>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic">"{testimonial.text}"</p>
                <p className="text-sm font-medium text-gray-900 mt-1">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
