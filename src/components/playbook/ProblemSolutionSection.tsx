
import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const ProblemSolutionSection = () => {
  return (
    <div className="py-20" style={{ backgroundColor: '#f8f3f0' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Most Families Struggle With These Conversations Because...
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: '#d32f2f' }}>
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
            <div className="mt-8 p-6 rounded-lg border-2" style={{ backgroundColor: '#ffe6e6', borderColor: '#ff8a58' }}>
              <p className="font-semibold" style={{ color: '#d32f2f' }}>
                Result: Years pass, nothing gets discussed, and families face crisis situations without any guidance or clarity about their loved one's wishes.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: '#ff8a58' }}>
              <CheckCircle className="w-6 h-6 mr-2" />
              Your Solution:
            </h3>
            <div className="bg-white p-8 rounded-xl shadow-lg border-2" style={{ borderColor: '#8da3e8' }}>
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
  );
};

export default ProblemSolutionSection;
