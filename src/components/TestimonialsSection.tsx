
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Testimonial } from '@/types';

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah M.",
      text: "This guide gave me the courage to finally talk to my parents about their wishes. The conversation starters were perfect - not too heavy, but thorough.",
      rating: 5
    },
    {
      name: "Robert K.",
      text: "I needed help discussing this with my adult children. The guide made it so much easier than I expected.",
      rating: 5
    },
    {
      name: "Jennifer L.",
      text: "I was dreading this conversation with my spouse, but the guide's approach made it feel like we were planning for our future together, not dwelling on endings.",
      rating: 5
    }
  ];

  return (
    <div className="py-20" style={{ backgroundColor: '#f8f3f0' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Real Families, Real Results
          </h2>
          <p className="text-xl text-gray-600">
            See how others have successfully navigated these important conversations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
