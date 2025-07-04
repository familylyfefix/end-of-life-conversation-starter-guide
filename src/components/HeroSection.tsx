
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 px-4" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
      <div className="container mx-auto text-center max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6" 
             style={{ backgroundColor: '#e8f5e8', color: '#2d5a2d' }}>
          <Heart className="w-4 h-4 mr-2" />
          Trusted by 50+ families
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-gray-900">Navigate End-of-</span>
          <span style={{ color: '#8da3e8' }}>Lyfe</span>
          <span className="text-gray-900"> Conversations</span>
          <br />
          <span className="text-gray-900">with Love & Clarity</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          A gentle, step-by-step guide to having meaningful conversations about end-of-life wishes 
          with your loved ones—before it's too late.
        </p>

        {/* Family photo under heading */}
        <div className="mb-12">
          <img 
            src="/lovable-uploads/1b432844-00fa-456b-aad6-2dd3db570e81.png" 
            alt="Family celebrating together at dinner table - Family Lyfe Fix"
            className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <Button 
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: '#8da3e8', borderColor: '#8da3e8' }}
            onClick={() => window.location.href = '/checkout'}
          >
            Get Your Free Conversation Starter Guide
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            No email required • Instant download • 100% Free
          </p>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" style={{ color: '#8da3e8' }} />
            <span>50+ families helped</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" style={{ color: '#8da3e8' }} />
            <span>5-minute read</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-2" style={{ color: '#8da3e8' }} />
            <span>Compassionate approach</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
