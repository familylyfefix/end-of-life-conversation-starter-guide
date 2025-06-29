
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutHeader = () => {
  return (
    <div className="bg-white shadow-sm border-b-2" style={{ borderColor: '#f8f3f0' }}>
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/e3788226-80d2-4a3c-9279-757104cd413f.png" 
              alt="Family Lyfe Fix Logo" 
              className="h-6 sm:h-8"
            />
          </div>
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 text-sm sm:text-base p-2 sm:p-3"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
