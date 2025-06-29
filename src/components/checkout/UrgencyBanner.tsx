
import React from 'react';
import { Clock } from 'lucide-react';

interface UrgencyBannerProps {
  hasExpired: boolean;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
  };
  savings: number;
}

const UrgencyBanner = ({ hasExpired, timeLeft, savings }: UrgencyBannerProps) => {
  if (hasExpired) return null;

  return (
    <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg text-center" style={{ backgroundColor: '#ffe6e6', border: '1px solid #ff8a58' }}>
      <div className="flex items-center justify-center mb-2">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" style={{ color: '#d32f2f' }} />
        <span className="font-semibold text-sm sm:text-base" style={{ color: '#d32f2f' }}>Limited Time Offer</span>
      </div>
      <p className="text-xs sm:text-sm" style={{ color: '#d32f2f' }}>
        Special pricing expires in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m - Save ${savings} today!
      </p>
    </div>
  );
};

export default UrgencyBanner;
