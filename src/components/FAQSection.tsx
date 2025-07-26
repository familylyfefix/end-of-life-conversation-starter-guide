
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FAQ } from '@/types';

const FAQSection = () => {
  const faqs: FAQ[] = [
    {
      question: "Is this really appropriate for my family situation?",
      answer: "Yes! The guide includes approaches for different family dynamics - whether you're talking to parents, spouses, or adult children. It's designed to be respectful and adaptable to your unique relationships."
    },
    {
      question: "What if my family doesn't want to talk about this?",
      answer: "The guide includes gentle strategies for approaching reluctant family members and timing recommendations. You'll learn how to start small and build comfort gradually, without forcing difficult conversations."
    },
    {
      question: "I'm not ready to think about this myself - is it too early?",
      answer: "It's never too early to have these conversations. The guide helps you approach the topic as planning for peace of mind, not dwelling on mortality. Many find it actually reduces anxiety once addressed."
    }
  ];

  return (
    <div className="py-20" style={{ backgroundColor: '#f8f3f0' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
