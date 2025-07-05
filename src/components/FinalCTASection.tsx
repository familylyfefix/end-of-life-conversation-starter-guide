
import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FinalCTASection = () => {
  return (
    <div className="py-20" style={{ backgroundColor: '#8da3e8' }}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get Your Complete End-of-Lyfe Conversation System Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            The step-by-step Notion template with conversation scripts, family coordination tools, and everything you need to have these important discussions with confidence.
          </p>
          
          <Button 
            size="lg"
            className="bg-white hover:bg-gray-100 text-lg px-8 py-4 mb-6"
            style={{ color: '#8da3e8' }}
            onClick={() => window.location.href = '/checkout'}
          >
            <Download className="w-5 h-5 mr-2" />
            Get Your Complete Playbook Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-blue-200 text-sm mt-6">
            Transform difficult conversations into meaningful family moments
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
