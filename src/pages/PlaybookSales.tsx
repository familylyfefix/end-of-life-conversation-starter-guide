
import React from 'react';
import { usePersonalizedTimer } from '@/hooks/usePersonalizedTimer';
import PlaybookHeader from '@/components/playbook/PlaybookHeader';
import PlaybookHero from '@/components/playbook/PlaybookHero';
import VideoPreview from '@/components/playbook/VideoPreview';
import PricingCTA from '@/components/playbook/PricingCTA';
import ProblemSolutionSection from '@/components/playbook/ProblemSolutionSection';
import PlaybookFeatures from '@/components/playbook/PlaybookFeatures';
import TestimonialsSection from '@/components/TestimonialsSection';
import UrgencySection from '@/components/UrgencySection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

const PlaybookSales = () => {
  const { timeLeft, hasExpired, isLoading, pricing } = usePersonalizedTimer();

  const handleGetAccess = () => {
    window.location.href = '/checkout';
  };

  // Show loading state while timer initializes
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
      <PlaybookHeader />
      <PlaybookHero hasExpired={hasExpired} timeLeft={timeLeft} />
      <VideoPreview />
      <PricingCTA pricing={pricing} hasExpired={hasExpired} onGetAccess={handleGetAccess} />
      <ProblemSolutionSection />
      <PlaybookFeatures />
      <TestimonialsSection />
      <UrgencySection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default PlaybookSales;
