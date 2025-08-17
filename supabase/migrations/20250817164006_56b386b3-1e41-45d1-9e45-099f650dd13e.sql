-- Drop existing overly permissive RLS policies
DROP POLICY IF EXISTS "Allow edge functions to select purchases" ON public.purchases;
DROP POLICY IF EXISTS "Allow edge functions to update purchases" ON public.purchases;
DROP POLICY IF EXISTS "Allow webhook to insert purchases" ON public.purchases;

-- Create secure RLS policies that only allow service role access
-- This ensures only authenticated edge functions can access purchase data

CREATE POLICY "Service role can select purchases" 
ON public.purchases 
FOR SELECT 
USING (
  -- Only allow access with service role key (used by edge functions)
  current_setting('role') = 'service_role'
);

CREATE POLICY "Service role can insert purchases" 
ON public.purchases 
FOR INSERT 
WITH CHECK (
  -- Only allow inserts with service role key (webhooks, edge functions)
  current_setting('role') = 'service_role'
);

CREATE POLICY "Service role can update purchases" 
ON public.purchases 
FOR UPDATE 
USING (
  -- Only allow updates with service role key (edge functions)
  current_setting('role') = 'service_role'
);

-- Ensure RLS is enabled
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;