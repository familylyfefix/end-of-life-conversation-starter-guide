
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface OrderSummaryCardProps {
  sessionId: string | null;
  sessionDetails?: {
    amount_total: number;
    currency: string;
  } | null;
  isLoading?: boolean;
}

const OrderSummaryCard = ({ sessionId, sessionDetails, isLoading }: OrderSummaryCardProps) => {
  // Format the price from cents to dollars
  const formatPrice = (amountInCents: number) => {
    const dollars = amountInCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(dollars);
  };

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
            <h4 className="font-semibold text-gray-900">End-of-Lyfe Conversation Playbook</h4>
            <p className="text-sm text-gray-600">Complete digital guide + templates</p>
          </div>
          <div className="text-right">
            {isLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <div className="font-bold text-lg" style={{ color: '#ff8a58' }}>
                {sessionDetails?.amount_total ? formatPrice(sessionDetails.amount_total) : '$0.00'}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
