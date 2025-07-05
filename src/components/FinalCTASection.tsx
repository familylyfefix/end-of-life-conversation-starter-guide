
import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const FinalCTASection = () => {
  const location = useLocation();
  const isOnPlaybookPage = location.pathname === '/playbook' || location.pathname === '/end-of-life-playbook';

  return (
    <div className="py-20" style={{ backgroundColor: '#8da3e8' }}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Family's Most Important Conversation Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Download your free guide now and take the first step toward peace of mind for you and your loved ones.
          </p>
          
          <Button 
            size="lg"
            className="bg-white hover:bg-gray-100 text-lg px-8 py-4 mb-6"
            style={{ color: '#8da3e8' }}
            onClick={() => window.location.href = 'https://family-lyfe-fix-2.kit.com/099ebad777'}
          >
            <Download className="w-5 h-5 mr-2" />
            Get Your Free Guide Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          {!isOnPlaybookPage && (
            <div className="mt-6 pt-6 border-t border-blue-500">
              <p className="text-blue-200 text-sm mb-4">
                Want the complete system?
              </p>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.location.href = 'https://family-lyfe-fix-2.kit.com/099ebad777'}
              >
                View Complete Playbook Template
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
          
          <p className="text-blue-200 text-sm mt-6">
            Start meaningful conversations with your family today
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
