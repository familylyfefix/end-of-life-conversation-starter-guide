
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const CheckoutSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {/* Urgency Banner Skeleton */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-gray-50">
          <Skeleton className="h-4 w-32 mx-auto mb-2" />
          <Skeleton className="h-3 w-64 mx-auto" />
        </div>

        {/* Title Skeleton */}
        <Skeleton className="h-7 w-48 mb-4 sm:mb-6" />

        {/* Contact Information Section */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <Skeleton className="h-5 w-36 mb-3 sm:mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-11 sm:h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-11 sm:h-10 w-full" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-11 sm:h-10 w-full" />
              <Skeleton className="h-3 w-40 mt-1" />
            </div>
          </div>

          {/* Billing Address Section */}
          <div>
            <Skeleton className="h-5 w-28 mb-3 sm:mb-4" />
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-11 sm:h-10 w-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Skeleton className="h-4 w-8 mb-2" />
                  <Skeleton className="h-11 sm:h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-11 sm:h-10 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button Skeleton */}
          <Skeleton className="h-12 sm:h-11 w-full" />

          {/* Terms Text Skeleton */}
          <div className="text-center">
            <Skeleton className="h-3 w-80 mx-auto mb-1" />
            <Skeleton className="h-3 w-64 mx-auto" />
          </div>
        </div>

        {/* Social Proof Section Skeleton */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t text-center">
          <Skeleton className="h-4 w-48 mx-auto mb-2" />
          <div className="flex items-center justify-center space-x-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24 ml-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutSkeleton;
