
import React, { useState } from 'react';
import { Download, CheckCircle, Heart, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      console.log('Email submitted:', email);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-12 pb-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Brand Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/e3788226-80d2-4a3c-9279-757104cd413f.png" 
            alt="Family Lyfe Fix Logo" 
            className="h-24 mx-auto mb-4"
          />
        </div>
        
        {/* PDF Mockup at the top */}
        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/ed366094-5287-4acd-94fa-5653acdcdee9.png" 
                  alt="End-of-Life Conversation Starter Guide Preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        <Badge className="mb-6" style={{ backgroundColor: '#ff8a58', color: 'white' }}>
          <Heart className="w-4 h-4 mr-2" />
          100% FREE Forever
        </Badge>
        
        {/* Primary Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Finally Have <span style={{ color: '#8da3e8' }}>The Conversation</span> Your Family Needs
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Get the proven conversation starters that help families discuss end-of-life wishes with love, clarity, and confidence—without the awkwardness
        </p>

        {/* Download Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-12 border-2" style={{ borderColor: '#f8f3f0' }}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Download Your FREE Guide Now
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get instant access to our comprehensive conversation starter guide
                </p>
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                style={{ borderColor: '#f8f3f0' }}
                required
              />
              <Button 
                type="submit"
                className="w-full text-white py-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#8da3e8' }}
              >
                <Download className="w-5 h-5 mr-2" />
                Get Instant Access (100% Free)
              </Button>
              <p className="text-xs text-gray-500 text-center">
                No spam. Unsubscribe anytime. Your privacy is protected.
              </p>
            </form>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#ff8a58' }} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Check Your Email!
              </h3>
              <p className="text-gray-600 mb-4">
                Your free guide is on its way to your inbox.
              </p>
              <div className="border-t pt-4" style={{ borderColor: '#f8f3f0' }}>
                <p className="text-sm text-gray-600 mb-3">
                  Ready to take it to the next level?
                </p>
                <Button 
                  onClick={() => window.open('/playbook', '_blank')}
                  className="w-full text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#ff8a58' }}
                >
                  Get the Complete Playbook ($47)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            Always Free
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            100% Private & Secure
          </div>
          <div className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Instant Download
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
