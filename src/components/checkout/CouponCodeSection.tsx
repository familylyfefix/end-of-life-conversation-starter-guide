import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Check, X, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CouponCodeSectionProps {
  onCouponApplied: (coupon: any) => void;
  onCouponRemoved: () => void;
  appliedCoupon?: any;
  isProcessing?: boolean;
}

const CouponCodeSection = ({ 
  onCouponApplied, 
  onCouponRemoved, 
  appliedCoupon,
  isProcessing = false 
}: CouponCodeSectionProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const { data, error: validationError } = await supabase.functions.invoke('validate-coupon', {
        body: { couponCode: couponCode.trim().toUpperCase() }
      });

      if (validationError || !data?.isValid) {
        setError(data?.error || 'Invalid coupon code');
        return;
      }

      // Apply the coupon
      onCouponApplied(data.coupon);
      setCouponCode('');
      setError(null);
    } catch (err) {
      console.error('Coupon validation error:', err);
      setError('Failed to validate coupon. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const removeCoupon = () => {
    onCouponRemoved();
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateCoupon();
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-primary" />
          <Label className="text-sm font-medium">Coupon Code</Label>
        </div>

        {appliedCoupon ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Coupon "{appliedCoupon.id}" applied
                </span>
                {appliedCoupon.percentOff && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {appliedCoupon.percentOff}% off
                  </Badge>
                )}
                {appliedCoupon.amountOff && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ${(appliedCoupon.amountOff / 100).toFixed(2)} off
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeCoupon}
                disabled={isProcessing}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  if (error) setError(null);
                }}
                onKeyPress={handleKeyPress}
                disabled={isValidating || isProcessing}
                className="flex-1"
              />
              <Button 
                onClick={validateCoupon}
                disabled={!couponCode.trim() || isValidating || isProcessing}
                className="whitespace-nowrap"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  'Apply Coupon'
                )}
              </Button>
            </div>

            {error && (
              <div className="text-sm text-red-600 flex items-center gap-1">
                <X className="w-3 h-3" />
                {error}
              </div>
            )}

            <p className="text-xs text-gray-500">
              Enter your coupon code to apply a discount to your order.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CouponCodeSection;