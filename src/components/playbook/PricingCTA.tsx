
import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingCTAProps {
  pricing: {
    current: number;
    regular: number;
    savings: number;
  };
  hasExpired: boolean;
  onGetAccess: () => void;
}

const PricingCTA = ({ pricing, hasExpired, onGetAccess }: PricingCTAProps) => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto mb-12 border-2" style={{ borderColor: '#8da3e8' }}>
            <div className="text-center">
              <div className="mb-6">
                <span className="text-4xl font-bold" style={{ color: '#ff8a58' }}>${pricing.current}</span>
                {pricing.savings > 0 && (
                  <span className="text-xl text-gray-500 line-through ml-3">${pricing.regular}</span>
                )}
              </div>
              <p className="text-base text-gray-600 mb-8">
                {hasExpired ? (
                  <>Regular Price<br />
                  <span className="font-semibold" style={{ color: '#666' }}>Early Bird Special Has Ended</span></>
                ) : (
                  <>Save ${pricing.savings} with Early Bird Pricing<br />
                  <span className="font-semibold" style={{ color: '#d32f2f' }}>Price increases to ${pricing.regular} when timer expires</span></>
                )}
              </p>
              <Button 
                size="lg"
                className="w-full text-white py-6 text-xl font-semibold mb-6 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#8da3e8' }}
                onClick={onGetAccess}
              >
                <Download className="w-6 h-6 mr-3" />
                Get Instant Access Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <p className="text-sm text-gray-500">
                Instant download • Digital product
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCTA;
