
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { CheckoutFormData } from '@/lib/validation';

interface ContactInformationFormProps {
  form: UseFormReturn<CheckoutFormData>;
}

const ContactInformationForm = ({ form }: ContactInformationFormProps) => {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">First Name *</FormLabel>
              <FormControl>
                <Input {...field} className="w-full h-11 sm:h-10 text-base sm:text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Last Name *</FormLabel>
              <FormControl>
                <Input {...field} className="w-full h-11 sm:h-10 text-base sm:text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-3 sm:mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email Address *</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full h-11 sm:h-10 text-base sm:text-sm"
                  {...field} 
                />
              </FormControl>
              <p className="text-xs text-gray-500 mt-1">Your download link will be sent here</p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ContactInformationForm;
