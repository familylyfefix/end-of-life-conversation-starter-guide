
import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Benefit } from '@/types';

const BenefitsSection = () => {
  const benefits: Benefit[] = [
    {
      icon: Heart,
      title: "Start Difficult Conversations with Confidence",
      description: "Get proven conversation starters and scripts that make discussing end-of-life wishes feel natural and caring, not awkward or overwhelming."
    },
    {
      icon: Shield,
      title: "Protect Your Family from Future Stress",
      description: "Ensure your loved ones know your wishes clearly, preventing family conflicts and difficult decisions during already emotional times."
    },
    {
      icon: Users,
      title: "Strengthen Family Bonds Through Understanding",
      description: "Transform what could be a scary topic into meaningful conversations that bring your family closer together and create lasting peace of mind."
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Transform Fear Into Peace of Mind
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how this simple guide can create lasting positive change for you and your family
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-2" style={{ borderColor: '#f8f3f0' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#8da3e8' }}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
