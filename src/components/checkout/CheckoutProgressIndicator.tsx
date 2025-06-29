
import React from 'react';

const CheckoutProgressIndicator = () => {
  return (
    <div className="flex items-center justify-center mb-6 sm:mb-8">
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="flex items-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold" style={{ backgroundColor: '#8da3e8' }}>
            1
          </div>
          <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm font-medium">Order Details</span>
        </div>
        <div className="w-8 sm:w-12 h-0.5" style={{ backgroundColor: '#8da3e8' }}></div>
        <div className="flex items-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs sm:text-sm font-semibold">
            2
          </div>
          <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-600">Confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgressIndicator;
