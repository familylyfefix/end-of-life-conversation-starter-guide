
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PlaybookDownloadSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Download Your Playbook?
          </h2>
          
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e8f5e8' }}>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Your Complete End-of-Lyfe Conversation Playbook
              </h3>
              
              <p className="text-gray-600 mb-6">
                Everything you need to have meaningful, stress-free conversations with your family about end-of-lyfe planning.
              </p>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                <span>Free starter guide available above</span>
              </div>
            </CardContent>
          </Card>

          <p className="text-sm text-gray-500">
            Having trouble downloading? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaybookDownloadSection;
