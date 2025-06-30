
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface OrderSummaryCardProps {
  sessionId: string | null;
}

const OrderSummaryCard = ({ sessionId }: OrderSummaryCardProps) => {
  return (
    <Card className="mb-8 border-2" style={{ borderColor: '#8da3e8' }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
          <span className="text-sm text-gray-500">Session: {sessionId?.substring(0, 8)}...</span>
        </div>
        
        <div className="flex items-start space-x-4 p-4 rounded-lg" style={{ backgroundColor: '#f8f3f0' }}>
          <img 
            src="/lovable-uploads/e859eb8e-6409-4b8d-85f5-b40fbf68e148.png" 
            alt="Product"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1 text-left">
            <h4 className="font-semibold text-gray-900">End-of-Life Conversation Playbook</h4>
            <p className="text-sm text-gray-600">Complete digital guide + templates</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg" style={{ color: '#ff8a58' }}>$47.00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
