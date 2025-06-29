
import React from 'react';
import { Shield, Lock, Users } from 'lucide-react';

const TrustElements = () => {
  return (
    <div className="border-t bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span>256-bit SSL Encryption</span>
          </div>
          <div className="flex items-center">
            <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span>Secure Payment Processing</span>
          </div>
          <div className="flex items-center">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span>Trusted by 50+ Families</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustElements;
