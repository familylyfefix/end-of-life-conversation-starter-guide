
import React from 'react';
import { FileText, MessageSquare, Calendar, BookOpen, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PlaybookFeatures = () => {
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

  return (
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
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-2" style={{ borderColor: '#f8f3f0' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#8da3e8' }}>
                  <feature.icon className="w-8 h-8 text-white" />
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
  );
};

export default PlaybookFeatures;
