
import React, { useState } from 'react';
import { Download, CheckCircle, Clock, Users, Heart, Shield, ArrowRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would integrate with your email service
      console.log('Email submitted:', email);
    }
  };

  const benefits = [
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

  const testimonials = [
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

  const faqs = [
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8f3f0, #ffffff)' }}>
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/e3788226-80d2-4a3c-9279-757104cd413f.png" 
              alt="Family Lyfe Fix Logo" 
              className="h-24 mx-auto mb-4"
            />
          </div>
          
          <Badge className="mb-6" style={{ backgroundColor: '#ff8a58', color: 'white' }}>
            <Heart className="w-4 h-4 mr-2" />
            100% FREE Forever
          </Badge>
          
          {/* Primary Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Finally Have <span style={{ color: '#8da3e8' }}>The Conversation</span> Your Family Needs
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Get the proven conversation starters that help families discuss end-of-life wishes with love, clarity, and confidence—without the awkwardness
          </p>

          {/* Download Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-12 border-2" style={{ borderColor: '#f8f3f0' }}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Download Your FREE Guide Now
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get instant access to our comprehensive conversation starter guide
                  </p>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  style={{ borderColor: '#f8f3f0' }}
                  required
                />
                <Button 
                  type="submit"
                  className="w-full text-white py-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#8da3e8' }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get Instant Access (100% Free)
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  No spam. Unsubscribe anytime. Your privacy is protected.
                </p>
              </form>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#ff8a58' }} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Check Your Email!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your free guide is on its way to your inbox.
                </p>
                <div className="border-t pt-4" style={{ borderColor: '#f8f3f0' }}>
                  <p className="text-sm text-gray-600 mb-3">
                    Ready to take it to the next level?
                  </p>
                  <Button 
                    onClick={() => window.open('/playbook', '_blank')}
                    className="w-full text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#ff8a58' }}
                  >
                    Get the Complete Playbook ($47)
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Always Free
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              100% Private & Secure
            </div>
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Instant Download
            </div>
          </div>
        </div>
      </div>

      {/* Guide Preview Section - Moved to appear right after hero */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                See What's Inside Your Free Guide
              </h2>
              <p className="text-xl text-gray-600">
                A comprehensive, easy-to-follow conversation starter guide designed with your family's comfort in mind
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* PDF Mockup */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img 
                      src="/lovable-uploads/ed366094-5287-4acd-94fa-5653acdcdee9.png" 
                      alt="End-of-Life Conversation Starter Guide Preview"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                {/* Additional pages mockup */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg transform -rotate-2 z-10">
                  <img 
                    src="/lovable-uploads/f0ca72cf-bdb9-43bb-854a-4e99ccfccfd4.png" 
                    alt="Guide Interior Page Preview"
                    className="w-48 h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Guide Features */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Everything You Need to Start the Conversation
                  </h3>
                  <p className="text-gray-600 mb-6">
                    This isn't just another generic guide. It's a carefully crafted resource that addresses the real challenges families face when discussing end-of-life wishes.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ff8a58' }}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Gentle Conversation Starters</h4>
                      <p className="text-gray-600">Pre-written openers that feel natural and caring, not clinical or scary</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8da3e8' }}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Family-Specific Scripts</h4>
                      <p className="text-gray-600">Different approaches for talking to parents, spouses, or adult children</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ff8a58' }}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Timing Strategies</h4>
                      <p className="text-gray-600">When and how to bring up the topic for maximum receptiveness</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8da3e8' }}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Follow-Up Framework</h4>
                      <p className="text-gray-600">How to deepen the conversation over time without overwhelming anyone</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    size="lg"
                    className="text-white px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#ff8a58' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Get Your Free Copy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="py-20" style={{ backgroundColor: '#f8f3f0' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Conversation No One Wants to Have... But Everyone Needs
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#d32f2f' }}>The Problem:</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    You know you need to discuss end-of-life wishes, but you don't know how to start
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Your family gets uncomfortable or changes the subject when you try to bring it up
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    You're worried about causing stress or seeming morbid
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Time keeps passing, and important wishes remain unspoken
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#ff8a58' }}>The Solution:</h3>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2" style={{ borderColor: '#8da3e8' }}>
                  <p className="text-gray-700 mb-4">
                    Our <strong>End-of-Life Conversation Starter Guide</strong> gives you:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      Gentle, proven conversation starters that feel natural
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      Scripts for different family personalities and relationships
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      Timing strategies that maximize receptiveness
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      Follow-up approaches to deepen the conversation over time
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
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

      {/* Social Proof Section */}
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

      {/* Urgency Section */}
      <div className="py-16" style={{ background: 'linear-gradient(45deg, #f8f3f0, #ffffff)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-12 h-12 mx-auto mb-6" style={{ color: '#ff8a58' }} />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Don't Wait Until It's Too Late
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Every day that passes without these conversations is a missed opportunity for clarity and peace of mind. Start today—your future self and your family will thank you.
            </p>
            <div className="bg-white rounded-lg p-6 inline-block shadow-lg border-2" style={{ borderColor: '#8da3e8' }}>
              <p className="text-2xl font-bold mb-2" style={{ color: '#8da3e8' }}>
                This guide is completely FREE
              </p>
              <p className="text-gray-600">
                Download it now and keep it forever
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
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

      {/* Final CTA Section */}
      <div className="py-20" style={{ backgroundColor: '#8da3e8' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Family's Most Important Conversation Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Download your free guide now and take the first step toward peace of mind for you and your loved ones.
            </p>
            
            <Button 
              size="lg"
              className="bg-white hover:bg-gray-100 text-lg px-8 py-4 mb-6"
              style={{ color: '#8da3e8' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Download className="w-5 h-5 mr-2" />
              Get Your Free Guide Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="mt-6 pt-6 border-t border-blue-500">
              <p className="text-blue-200 text-sm mb-4">
                Want the complete system?
              </p>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.open('/playbook', '_blank')}
              >
                View Complete Playbook Template
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <p className="text-blue-200 text-sm mt-6">
              Start meaningful conversations with your family today
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Family Lyfe Fix, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
