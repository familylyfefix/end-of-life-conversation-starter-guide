
import React from 'react';
import HeroSection from '@/components/HeroSection';
import GuidePreviewSection from '@/components/GuidePreviewSection';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import UrgencySection from '@/components/UrgencySection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
      <HeroSection />
      <GuidePreviewSection />
      <ProblemSolutionSection />
      <BenefitsSection />
      <TestimonialsSection />
      <UrgencySection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
