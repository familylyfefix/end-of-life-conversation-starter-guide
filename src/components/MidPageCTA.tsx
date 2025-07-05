
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MidPageCTA = () => {
  return (
    <div className="py-16" style={{ backgroundColor: '#8da3e8' }}>
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto border-2 border-white shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-500 fill-current" />
              <Star className="w-8 h-8 text-yellow-500 fill-current mx-1" />
              <Star className="w-8 h-8 text-yellow-500 fill-current" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready for the Complete System?
            </h3>
            
            <p className="text-lg text-gray-600 mb-6">
              This free guide is just the beginning. Get the complete step-by-step Notion template 
              with conversation scripts, family coordination tools, and everything you need to 
              organize these important discussions.
            </p>
            
            <Button 
              size="lg"
              className="text-white py-4 px-8 text-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#8da3e8' }}
              onClick={() => window.location.href = 'https://family-lyfe-fix-2.kit.com/099ebad777'}
            >
              View Complete Playbook Template
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Complete Notion template • Step-by-step system • Word-for-word scripts
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MidPageCTA;
