
import React from 'react';
import { CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GuidePreviewSection = () => {
  return (
    <div className="py-20" style={{ backgroundColor: '#f8f3f0' }}>
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
            {/* PDF Mockup */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://lfwcsbchajyzgstsbson.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-07-04%20at%2011.09.39%20AM.png" 
                    alt="End-of-Life Conversation Starter Guide Preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              {/* Additional pages mockup */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg transform -rotate-2 z-10">
                <img 
                  src="/lovable-uploads/f0ca72cf-bdb9-43bb-854a-4e99ccfccfd4.png" 
                  alt="Guide Interior Page Preview"
                  className="w-48 h-auto rounded-lg shadow-md"
                />
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
                  onClick={() => window.location.href = 'https://family-lyfe-fix-2.kit.com/099ebad777'}
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
