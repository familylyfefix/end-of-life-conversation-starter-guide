
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const WhatsNextCard = () => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1" style={{ backgroundColor: '#8da3e8' }}>
              1
            </div>
            <p className="text-gray-700">Download and review your complete playbook</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1" style={{ backgroundColor: '#8da3e8' }}>
              2
            </div>
            <p className="text-gray-700">Use the preparation checklist to get ready</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1" style={{ backgroundColor: '#8da3e8' }}>
              3
            </div>
            <p className="text-gray-700">Schedule your first family conversation</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsNextCard;
