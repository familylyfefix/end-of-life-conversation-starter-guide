
import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Heart, Shield, ArrowRight, Star, Quote, Download, Calendar, FileText, MessageSquare, BookOpen, Target, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PlaybookSales = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 27
  });

  const features = [
    {
      icon: FileText,
      title: "Complete Preparation System",
      description: "Step-by-step checklists and personal reflection tools to get you ready for any conversation"
    },
    {
      icon: MessageSquare,
      title: "Conversation Scripts Library",
      description: "Word-for-word scripts for every topic - financial, healthcare, legal, and personal preferences"
    },
    {
      icon: Calendar,
      title: "Meeting Planning & Tracking",
      description: "Built-in calendar system and progress tracking to keep your family conversations organized"
    },
    {
      icon: BookOpen,
      title: "Topic-by-Topic Guidance",
      description: "Navigate sensitive subjects like wills, healthcare wishes, and funeral preferences with confidence"
    },
    {
      icon: Users,
      title: "Family Coordination Tools",
      description: "Templates and systems to keep everyone informed and involved in the process"
    },
    {
      icon: Target,
      title: "Follow-Up Framework",
      description: "Ensure nothing falls through the cracks with structured follow-up systems and reminders"
    }
  ];

  const testimonials = [
    {
      name: "Margaret K.",
      text: "This template gave me the structure I desperately needed. My family finally had the conversation we'd been avoiding for years, and it wasn't scary at all.",
      rating: 5,
      situation: "Used with aging parents"
    },
    {
      name: "David R.",
      text: "The scripts were perfect. I didn't have to guess what to say anymore. My spouse and I completed our entire end-of-life plan in just 3 conversations.",
      rating: 5,
      situation: "Used with spouse and adult children"
    },
    {
      name: "Lisa M.",
      text: "Worth every penny. The preparation checklist alone saved me hours of research. My family now has complete clarity on everyone's wishes.",
      rating: 5,
      situation: "Used for multi-generational planning"
    }
  ];

  const faqs = [
    {
      question: "Do I need to know how to use Notion to use this template?",
      answer: "Not at all! The template comes with simple instructions, and Notion is very user-friendly. You can start using it immediately, even if you've never used Notion before."
    },
    {
      question: "What if my family doesn't want to have these conversations?",
      answer: "The template includes specific scripts and strategies for approaching reluctant family members. You'll learn how to start small, build comfort gradually, and present these conversations as acts of love rather than discussions about death."
    },
    {
      question: "Is this really worth $47 when there's free information online?",
      answer: "While there's general information available online, this template provides a complete, organized system that saves you 20+ hours of research and planning. It's specifically designed for families who want to actually complete these conversations, not just think about them."
    },
    {
      question: "Can I customize this for my specific family situation?",
      answer: "Absolutely! The template is fully customizable. You can adapt the scripts, add your own topics, and modify the tracking systems to fit your family's unique needs and dynamics."
    },
    {
      question: "What if I need help using the template?",
      answer: "You'll get email support from our team, plus access to our private community where other families share their experiences and tips for success."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Family Lyfe Fix</span>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              ← Back to Free Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Urgency Banner */}
          <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-8 inline-block">
            <div className="flex items-center justify-center space-x-2 text-red-800">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Early Bird Special Ends Soon:</span>
              <span className="font-mono">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Get Your Family's Most Important Conversations <span className="text-blue-600">Done Right</span> – With Zero Awkwardness
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            The complete step-by-step Notion template that transforms scary end-of-life discussions into meaningful family moments – used by 500+ families to create lasting peace of mind
          </p>

          {/* Price and CTA */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-12 border">
            <div className="text-center">
              <div className="mb-4">
                <span className="text-3xl font-bold text-green-600">$47</span>
                <span className="text-lg text-gray-500 line-through ml-2">$67</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Save $20 with Early Bird Pricing<br />
                <span className="text-red-600 font-semibold">Price increases to $67 in 3 days</span>
              </p>
              <Button 
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold mb-4"
              >
                <Download className="w-5 h-5 mr-2" />
                Get Instant Access Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-xs text-gray-500">
                Instant download • 30-day money-back guarantee
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              30-Day Guarantee
            </div>
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Instant Access
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              500+ Happy Families
            </div>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Most Families Struggle With These Conversations Because...
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  The Problem:
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>They don't know how to start the conversation</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>The topics feel too overwhelming or morbid</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Family members are scattered and hard to coordinate</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Previous attempts led to arguments or shut-downs</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Nobody wants to be the one to bring it up</span>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-800 font-semibold">
                    Result: Years pass, nothing gets discussed, and families face crisis situations without any guidance or clarity about their loved one's wishes.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Your Solution:
                </h3>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <p className="text-gray-700 mb-6 font-semibold">
                    The End-of-Life Conversation Playbook gives you everything you need:
                  </p>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span><strong>Structured conversation framework</strong> - Know exactly what to say and when</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span><strong>Family coordination system</strong> - Keep everyone involved and informed</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span><strong>Progress tracking</strong> - See what's been discussed and what's next</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span><strong>Topic guidance</strong> - Navigate sensitive subjects with confidence</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span><strong>Meeting organization</strong> - Plan, conduct, and follow up on family discussions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need in One Complete System
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No more wondering what to say or how to organize these important conversations. Get the proven framework that works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Real Families, Real Results
            </h2>
            <p className="text-xl text-gray-600">
              See how other families have successfully used this system
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
                    <p className="text-sm text-gray-600">{testimonial.situation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Urgency Section */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Clock className="w-12 h-12 text-red-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Don't Wait Until It's Too Late
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Every day that passes without these conversations is a missed opportunity for clarity and peace of mind. The price increases to $67 in just 3 days.
            </p>
            <div className="bg-white rounded-lg p-6 inline-block shadow-lg">
              <p className="text-2xl font-bold text-red-600 mb-2">
                Save $20 Today Only
              </p>
              <p className="text-gray-600">
                Current Price: $47 (Regular Price: $67)
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
      <div className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Family's Most Important Conversation Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the complete Notion template that makes these conversations natural, organized, and successful.
            </p>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-8">
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-green-600">$47</span>
                  <span className="text-lg text-gray-500 line-through ml-2">$67</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Early Bird Special - Save $20<br />
                  <span className="text-red-600 font-semibold">Offer expires in 3 days</span>
                </p>
                <Button 
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold mb-4"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get Instant Access Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="space-y-2 text-xs text-gray-500">
                  <p>✓ Instant download after purchase</p>
                  <p>✓ 30-day money-back guarantee</p>
                  <p>✓ Email support included</p>
                </div>
              </div>
            </div>
            
            <p className="text-blue-200 text-sm">
              Join 500+ families who have successfully used this system
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

export default PlaybookSales;
