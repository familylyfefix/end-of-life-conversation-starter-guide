
import React from 'react';
import { Clock } from 'lucide-react';

interface UrgencyBannerProps {
  hasExpired: boolean;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const UrgencyBanner = ({ hasExpired, timeLeft }: UrgencyBannerProps) => {
  return (
    <div className="border-2 rounded-lg p-4 mb-8 inline-block" style={{ 
      backgroundColor: hasExpired ? '#ffebee' : '#ffe6e6', 
      borderColor: hasExpired ? '#f44336' : '#ff8a58' 
    }}>
      <div className="flex items-center justify-center space-x-2" style={{ color: hasExpired ? '#c62828' : '#d32f2f' }}>
        <Clock className="w-5 h-5" />
        <span className="font-semibold">
          {hasExpired ? 'Special Offer Has Ended' : 'Early Bird Special Ends Soon:'}
        </span>
        {!hasExpired && (
          <span className="font-mono">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        )}
      </div>
    </div>
  );
};

export default UrgencyBanner;
