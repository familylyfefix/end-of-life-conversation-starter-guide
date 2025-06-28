
import React from 'react';
import { CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GuidePreviewSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              See What's Inside Your Free Guide
            </h2>
            <p className="text-xl text-gray-600">
              A comprehensive, easy-to-follow conversation starter guide designed with your family's comfort in mind
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Loom Video */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-2xl shadow-2xl">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe 
                      src="https://www.loom.com/embed/344660889dc44f8b95bbc23b454eae42?sid=ac091c65-5e88-412d-8a25-3722eda33569"
                      frameBorder="0"
                      allowFullScreen
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%',
                        borderRadius: '8px'
                      }}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* Guide Features */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Everything You Need to Start the Conversation
                </h3>
                <p className="text-gray-600 mb-6">
                  This isn't just another generic guide. It's a carefully crafted resource that addresses the real challenges families face when discussing end-of-life wishes.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ff8a58' }}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Gentle Conversation Starters</h4>
                    <p className="text-gray-600">Pre-written openers that feel natural and caring, not clinical or scary</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8da3e8' }}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Family-Specific Scripts</h4>
                    <p className="text-gray-600">Different approaches for talking to parents, spouses, or adult children</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ff8a58' }}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Timing Strategies</h4>
                    <p className="text-gray-600">When and how to bring up the topic for maximum receptiveness</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8da3e8' }}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Follow-Up Framework</h4>
                    <p className="text-gray-600">How to deepen the conversation over time without overwhelming anyone</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg"
                  className="text-white px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#ff8a58' }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get Your Free Copy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePreviewSection;
