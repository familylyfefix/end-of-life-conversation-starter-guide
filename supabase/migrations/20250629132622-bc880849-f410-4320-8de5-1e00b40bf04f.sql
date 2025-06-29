
-- Create purchases table to store payment information for secure downloads
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  product_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  download_count INTEGER NOT NULL DEFAULT 0,
  max_downloads INTEGER NOT NULL DEFAULT 5,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Create policy to allow webhook to insert purchases (using service role key)
CREATE POLICY "Allow webhook to insert purchases" ON public.purchases
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow edge functions to update purchases (using service role key)
CREATE POLICY "Allow edge functions to update purchases" ON public.purchases
  FOR UPDATE
  USING (true);

-- Create policy to allow edge functions to select purchases (using service role key)
CREATE POLICY "Allow edge functions to select purchases" ON public.purchases
  FOR SELECT
  USING (true);

-- Create index for faster lookups by stripe_session_id
CREATE INDEX idx_purchases_stripe_session_id ON public.purchases(stripe_session_id);

-- Create index for faster lookups by customer_email
CREATE INDEX idx_purchases_customer_email ON public.purchases(customer_email);
