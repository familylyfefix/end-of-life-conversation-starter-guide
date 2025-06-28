
import React, { useState } from 'react';
import { Clock, Shield, Lock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePersonalizedTimer } from '@/hooks/usePersonalizedTimer';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutProgressIndicator from '@/components/checkout/CheckoutProgressIndicator';
import OrderSummary from '@/components/checkout/OrderSummary';

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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <CheckoutProgressIndicator />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Order Summary */}
            <div className="order-2 lg:order-1">
              <OrderSummary pricing={pricing} />
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
