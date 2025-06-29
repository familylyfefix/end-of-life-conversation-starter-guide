
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { CheckoutFormData } from '@/lib/validation';

interface BillingAddressFormProps {
  form: UseFormReturn<CheckoutFormData>;
}

const BillingAddressForm = ({ form }: BillingAddressFormProps) => {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Billing Address</h3>
      <div className="space-y-3 sm:space-y-4">
        <FormField
          control={form.control}
          name="billingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Address *</FormLabel>
              <FormControl>
                <Input {...field} className="w-full h-11 sm:h-10 text-base sm:text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">City *</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full h-11 sm:h-10 text-base sm:text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">ZIP Code *</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full h-11 sm:h-10 text-base sm:text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingAddressForm;
