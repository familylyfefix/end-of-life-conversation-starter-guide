
import React from 'react';
import { CheckCircle, Download, Mail, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PaymentSuccess = () => {
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
              onClick={() => window.location.href = '/'}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: '#e8f5e8' }}>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your End-of-Life Conversation Playbook is ready for download.
          </p>

          {/* Order Summary Card */}
          <Card className="mb-8 border-2" style={{ borderColor: '#8da3e8' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                <span className="text-sm text-gray-500">Order #12345</span>
              </div>
              
              <div className="flex items-start space-x-4 p-4 rounded-lg" style={{ backgroundColor: '#f8f3f0' }}>
                <img 
                  src="/lovable-uploads/e859eb8e-6409-4b8d-85f5-b40fbf68e148.png" 
                  alt="Product"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900">End-of-Life Conversation Playbook</h4>
                  <p className="text-sm text-gray-600">Complete digital guide + templates</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg" style={{ color: '#ff8a58' }}>$47.00</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Download className="w-8 h-8 mr-3" style={{ color: '#8da3e8' }} />
                <h3 className="text-xl font-semibold text-gray-900">Download Your Guide</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Your complete End-of-Life Conversation Playbook is ready for immediate download.
              </p>
              
              <Button 
                size="lg"
                className="w-full text-white py-3 text-lg font-semibold mb-4 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#8da3e8' }}
                onClick={() => {
                  // In a real implementation, this would trigger the actual download
                  alert('Download would start here. This is test mode.');
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Your Playbook Now
              </Button>
              
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Mail className="w-4 h-4 mr-2" />
                <span>A download link has also been sent to your email</span>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1" style={{ backgroundColor: '#8da3e8' }}>
                    1
                  </div>
                  <p className="text-gray-700">Download and review your complete playbook</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1" style={{ backgroundColor: '#8da3e8' }}>
                    2
                  </div>
                  <p className="text-gray-700">Use the preparation checklist to get ready</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1" style={{ backgroundColor: '#8da3e8' }}>
                    3
                  </div>
                  <p className="text-gray-700">Schedule your first family conversation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Need help or have questions about your purchase?
            </p>
            <Button variant="outline" className="border-2" style={{ borderColor: '#8da3e8', color: '#8da3e8' }}>
              Contact Support
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
              <span className="text-sm text-gray-600 ml-2">4.9/5 average rating</span>
            </div>
            <p className="text-sm text-gray-500">
              Join 500+ families who have successfully used this guide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
