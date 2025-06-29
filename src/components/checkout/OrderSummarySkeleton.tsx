
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const OrderSummarySkeleton = () => {
  return (
    <Card className="lg:sticky lg:top-8">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {/* Title Skeleton */}
        <Skeleton className="h-7 w-32 mb-4 sm:mb-6" />
        
        {/* Product Section Skeleton */}
        <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-gray-50">
          <Skeleton className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-48 mb-1" />
            <Skeleton className="h-3 w-36 mb-2" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="text-right flex-shrink-0">
            <Skeleton className="h-6 w-12 mb-1" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>

        {/* What's Included Section Skeleton */}
        <div className="mb-4 sm:mb-6">
          <Skeleton className="h-4 w-28 mb-2 sm:mb-3" />
          <div className="space-y-1.5 sm:space-y-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-start">
                <Skeleton className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0 mt-0.5" />
                <Skeleton className="h-3 w-40" />
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Breakdown Skeleton */}
        <div className="border-t pt-3 sm:pt-4 space-y-1.5 sm:space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex justify-between border-t pt-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>

        {/* Trust Badges Skeleton */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Testimonials Skeleton */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
          <Skeleton className="h-4 w-28 mx-auto mb-3 sm:mb-4" />
          <div className="space-y-3 sm:space-y-4">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-1.5 sm:mb-2 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-3 h-3 sm:w-4 sm:h-4" />
                  ))}
                </div>
                <Skeleton className="h-3 w-64 mx-auto mb-1" />
                <Skeleton className="h-3 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummarySkeleton;
