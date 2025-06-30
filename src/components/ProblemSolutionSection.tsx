
import React from 'react';
import { CheckCircle } from 'lucide-react';

const ProblemSolutionSection = () => {
  return (
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
                  You know you need to discuss end-of-lyfe wishes, but you don't know how to start
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
                  Our <strong>End-of-Lyfe Conversation Starter Guide</strong> gives you:
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
  );
};

export default ProblemSolutionSection;
