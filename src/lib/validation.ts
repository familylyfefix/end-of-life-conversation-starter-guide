
import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  billingAddress: z.string()
    .min(1, 'Billing address is required')
    .min(5, 'Please enter a complete address')
    .max(200, 'Address must be less than 200 characters'),
  
  city: z.string()
    .min(1, 'City is required')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'City can only contain letters, spaces, hyphens, and apostrophes'),
  
  zipCode: z.string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code (12345 or 12345-6789)'),
  
  couponCode: z.string()
    .optional()
    .refine((val) => !val || (val.length >= 3 && val.length <= 20), {
      message: 'Coupon code must be between 3 and 20 characters'
    })
    .refine((val) => !val || /^[A-Za-z0-9]+$/.test(val), {
      message: 'Coupon code can only contain letters and numbers'
    }),
  
  termsAccepted: z.boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms and conditions to proceed'
    })
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
