
import React from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
            Finally Have <span className="text-blue-400">The Conversation</span><br />
            Your Family Needs
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto">
            Get the proven conversation starters that help families discuss end-of-lyfe wishes with love, clarity, and confidence—without the awkwardness
          </p>

          {/* Multi-device mockup */}
          <div className="relative mb-16">
            <div className="flex justify-center items-center space-x-8">
              {/* Phone mockup */}
              <div className="transform rotate-12 z-10">
                <div className="w-48 h-96 bg-black rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                    <img 
                      src="/lovable-uploads/564f0238-80a9-4082-bee8-22d605bb9ef9.png" 
                      alt="Family gathering"
                      className="w-full h-2/3 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <img 
                        src="/lovable-uploads/144c3d9e-308c-432f-9dae-8952a74316a0.png" 
                        alt="End-of-Lyfe Conversation Starter Guide"
                        className="w-16 h-20 object-cover rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop mockup */}
              <div className="z-20">
                <div className="w-96 h-64 bg-black rounded-lg p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-lg overflow-hidden relative">
                    <img 
                      src="/lovable-uploads/564f0238-80a9-4082-bee8-22d605bb9ef9.png" 
                      alt="Family gathering"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <img 
                        src="/lovable-uploads/144c3d9e-308c-432f-9dae-8952a74316a0.png" 
                        alt="End-of-Lyfe Conversation Starter Guide"
                        className="w-20 h-24 object-cover rounded shadow-lg"
                      />
                    </div>
                  </div>
                </div>
                {/* Desktop stand */}
                <div className="w-16 h-4 bg-gray-300 mx-auto rounded-b-lg"></div>
                <div className="w-24 h-2 bg-gray-400 mx-auto rounded-full"></div>
              </div>

              {/* Tablet mockup */}
              <div className="transform -rotate-12 z-10">
                <div className="w-64 h-80 bg-black rounded-2xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-xl overflow-hidden relative">
                    <img 
                      src="/lovable-uploads/564f0238-80a9-4082-bee8-22d605bb9ef9.png" 
                      alt="Family gathering"
                      className="w-full h-3/4 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <img 
                        src="/lovable-uploads/144c3d9e-308c-432f-9dae-8952a74316a0.png" 
                        alt="End-of-Lyfe Conversation Starter Guide"
                        className="w-18 h-22 object-cover rounded shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ff8a58' }}>
              Download Your<br />
              FREE Guide Now
            </h2>

            {/* Clean ConvertKit Form */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/144c3d9e-308c-432f-9dae-8952a74316a0.png" 
                  alt="End-of-Lyfe Conversation Starter Guide"
                  className="w-32 h-40 object-cover rounded mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-2" style={{ color: '#ff8a58' }}>
                  Download Your FREE Guide Now
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Get instant access to your End-of-Lyfe Conversation Starter Guide
                </p>
              </div>

              <form 
                action="https://app.kit.com/forms/8243832/subscriptions" 
                method="post"
                className="space-y-4"
              >
                <input 
                  type="text" 
                  name="fields[first_name]" 
                  placeholder="First Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  type="email" 
                  name="email_address" 
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="w-full py-4 px-6 text-white font-bold rounded-full hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#8da3e8' }}
                >
                  Get Your Free Guide
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              ✅ No spam, ever. We respect your privacy and you can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
