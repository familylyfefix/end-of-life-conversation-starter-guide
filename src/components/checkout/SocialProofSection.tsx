
import React from 'react';
import { Users, Star } from 'lucide-react';

const SocialProofSection = () => {
  return (
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t text-center">
      <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-600 mb-2">
        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
        <span>Join 50+ families who have used this guide</span>
      </div>
      <div className="flex items-center justify-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
        ))}
        <span className="text-xs sm:text-sm text-gray-600 ml-2">4.9/5 average rating</span>
      </div>
    </div>
  );
};

export default SocialProofSection;
