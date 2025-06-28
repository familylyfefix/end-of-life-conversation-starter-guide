
import React from 'react';
import { Button } from '@/components/ui/button';

const PlaybookHeader = () => {
  return (
    <div className="bg-white shadow-sm border-b-2" style={{ borderColor: '#f8f3f0' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/e3788226-80d2-4a3c-9279-757104cd413f.png" 
              alt="Family Lyfe Fix Logo" 
              className="h-8"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-2"
            style={{ borderColor: '#8da3e8', color: '#8da3e8' }}
          >
            ← Back to Free Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaybookHeader;
