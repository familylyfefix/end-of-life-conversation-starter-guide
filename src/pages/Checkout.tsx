import React, { useState } from 'react';
import { Check, Shield, Clock, CreditCard, Lock, Star, Users, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePersonalizedTimer } from '@/hooks/usePersonalizedTimer';

const Checkout = () => {
  const { timeLeft, hasExpired, isLoading, pricing } = usePersonalizedTimer();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    billingAddress: '',
    city: '',
    zipCode: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Call Stripe payment function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          amount: pricing.current * 100 // Convert to cents for Stripe
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

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
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2" style={{ borderColor: '#f8f3f0' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/e3788226-80d2-4a3c-9279-757104cd413f.png" 
                alt="Family Lyfe Fix Logo" 
                className="h-8"
              />
            </div>
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ backgroundColor: '#8da3e8' }}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Order Details</span>
              </div>
              <div className="w-12 h-0.5" style={{ backgroundColor: '#8da3e8' }}></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-semibold">
                  2
                </div>
                <span className="ml-2 text-sm text-gray-600">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Order Summary */}
            <div className="order-2 lg:order-1">
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
                      <span>${pricing.current}.00</span>
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
            </div>

            {/* Right Column - Checkout Form */}
            <div className="order-1 lg:order-2">
              <Card>
                <CardContent className="p-8">
                  {/* Urgency Banner */}
                  {!hasExpired && (
                    <div className="mb-6 p-4 rounded-lg text-center" style={{ backgroundColor: '#ffe6e6', border: '1px solid #ff8a58' }}>
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="w-5 h-5 mr-2" style={{ color: '#d32f2f' }} />
                        <span className="font-semibold" style={{ color: '#d32f2f' }}>Limited Time Offer</span>
                      </div>
                      <p className="text-sm" style={{ color: '#d32f2f' }}>
                        Special pricing expires in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m - Save ${pricing.savings} today!
                      </p>
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Order</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                          <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                          placeholder="your@email.com"
                        />
                        <p className="text-xs text-gray-500 mt-1">Your download link will be sent here</p>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                          <Input
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                            <Input
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                            <Input
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Guarantee */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Shield className="w-6 h-6 text-green-600 mr-3" />
                        <div>
                          <h4 className="font-semibold text-green-800">30-Day Money-Back Guarantee</h4>
                          <p className="text-sm text-green-700">Not satisfied? Get a full refund within 30 days, no questions asked.</p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#8da3e8' }}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Complete Secure Order - ${pricing.current}
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        By completing this order, you agree to our terms of service and privacy policy.
                        Your payment is processed securely and your information is protected.
                      </p>
                    </div>
                  </form>

                  {/* Social Proof */}
                  <div className="mt-8 pt-6 border-t text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
                      <Users className="w-4 h-4" />
                      <span>Join 500+ families who have used this guide</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">4.9/5 average rating</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Trust Elements */}
      <div className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              <span>Secure Payment Processing</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>Trusted by 500+ Families</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
