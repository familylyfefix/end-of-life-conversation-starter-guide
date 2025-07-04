
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CustomHTMLSection from '@/components/CustomHTMLSection';
import GuidePreviewSection from '@/components/GuidePreviewSection';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import MidPageCTA from '@/components/MidPageCTA';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import UrgencySection from '@/components/UrgencySection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const customHTML = `
    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 2rem; margin-top: 40px;">
      <!-- IMAGE SECTION -->
      <div style="flex: 1 1 50%; min-width: 300px; text-align: center;">
        <img src="https://lfwcsbchajyzgstsbson.supabase.co/storage/v1/object/public/marketing-images//Mockup%201%20(1).png" alt="The End-of-Lyfe Conversation Starter Guide" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" />
      </div>

      <!-- FORM SECTION -->
      <div style="flex: 1 1 40%; min-width: 280px;">
        <script src="https://widgets.kit.co/embed.js" data-kit-widget-id="69e163e7-b682-4b2e-8a36-fc8ea9ea47e2" data-kit-theme="light" data-kit-position="inline"></script>
      </div>
    </div>
  `;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
      <HeroSection />
      <CustomHTMLSection htmlContent={customHTML} />
      <GuidePreviewSection />
      <ProblemSolutionSection />
      <MidPageCTA />
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
