
import React from 'react';
import { Heart } from 'lucide-react';

const UrgencySection = () => {
  return (
    <div className="py-16" style={{ background: 'linear-gradient(45deg, #f8f3f0, #ffffff)' }}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Heart className="w-12 h-12 mx-auto mb-6" style={{ color: '#ff8a58' }} />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Don't Wait Until It's Too Late
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Every day that passes without these conversations is a missed opportunity for clarity and peace of mind. Start today—your future self and your family will thank you.
          </p>
          <div className="bg-white rounded-lg p-6 inline-block shadow-lg border-2" style={{ borderColor: '#8da3e8' }}>
            <p className="text-2xl font-bold mb-2" style={{ color: '#8da3e8' }}>
              This guide is completely FREE
            </p>
            <p className="text-gray-600">
              Download it now and keep it forever
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencySection;
