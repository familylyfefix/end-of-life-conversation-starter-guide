
import React from 'react';

const CheckoutProgressIndicator = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ backgroundColor: '#8da3e8' }}>
            1
          </div>
          <span className="ml-2 text-sm font-medium">Order Details</span>
        </div>
        <div className="w-12 h-0.5" style={{ backgroundColor: '#8da3e8' }}></div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-semibold">
            2
          </div>
          <span className="ml-2 text-sm text-gray-600">Confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgressIndicator;
