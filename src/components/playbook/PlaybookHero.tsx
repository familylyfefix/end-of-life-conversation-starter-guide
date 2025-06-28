
import React from 'react';
import { Download, CheckCircle, FileText, Users, Target } from 'lucide-react';
import UrgencyBanner from './UrgencyBanner';

interface PlaybookHeroProps {
  hasExpired: boolean;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const PlaybookHero = ({ hasExpired, timeLeft }: PlaybookHeroProps) => {
  return (
    <div className="container mx-auto px-4 pt-12 pb-12">
      <div className="text-center max-w-4xl mx-auto">
        <UrgencyBanner hasExpired={hasExpired} timeLeft={timeLeft} />

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Get Your Family's Most Important Conversations <span style={{ color: '#8da3e8' }}>Done Right</span> – With Zero Awkwardness
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          The complete step-by-step Notion template that transforms scary end-of-life discussions into meaningful family moments
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Instant Access
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete System
          </div>
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Word-for-Word Scripts
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Family Coordination Tools
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Step-by-Step Framework
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookHero;
