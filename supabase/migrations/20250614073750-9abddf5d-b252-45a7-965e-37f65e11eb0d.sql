
-- Create a table for farms
CREATE TABLE public.farms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  location TEXT,
  size DECIMAL(10,2),
  size_unit TEXT DEFAULT 'acres',
  crop_type TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed', 'planned')),
  start_date DATE,
  end_date DATE,
  investment_amount DECIMAL(12,2),
  expected_yield DECIMAL(10,2),
  actual_yield DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own farms
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own farms
CREATE POLICY "Users can view their own farms" 
  ON public.farms 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own farms
CREATE POLICY "Users can create their own farms" 
  ON public.farms 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own farms
CREATE POLICY "Users can update their own farms" 
  ON public.farms 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own farms
CREATE POLICY "Users can delete their own farms" 
  ON public.farms 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create an index for better query performance
CREATE INDEX idx_farms_user_id_status ON public.farms(user_id, status);
CREATE INDEX idx_farms_user_id_created_at ON public.farms(user_id, created_at);
