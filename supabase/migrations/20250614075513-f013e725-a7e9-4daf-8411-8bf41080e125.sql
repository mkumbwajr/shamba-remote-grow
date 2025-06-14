
-- Create a table for tracking hired workers
CREATE TABLE public.hired_workers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  worker_id TEXT NOT NULL, -- Reference to the worker from WorkerDirectory
  worker_name TEXT NOT NULL,
  worker_specialization TEXT NOT NULL,
  worker_phone TEXT NOT NULL,
  hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'terminated')),
  rate NUMERIC NOT NULL,
  rate_type TEXT NOT NULL DEFAULT 'per day',
  farm_location TEXT,
  job_description TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own hired workers
ALTER TABLE public.hired_workers ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own hired workers
CREATE POLICY "Users can view their own hired workers" 
  ON public.hired_workers 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own hired workers
CREATE POLICY "Users can create their own hired workers" 
  ON public.hired_workers 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own hired workers
CREATE POLICY "Users can update their own hired workers" 
  ON public.hired_workers 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own hired workers
CREATE POLICY "Users can delete their own hired workers" 
  ON public.hired_workers 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create an index for better query performance
CREATE INDEX idx_hired_workers_user_status ON public.hired_workers(user_id, status);
CREATE INDEX idx_hired_workers_hire_date ON public.hired_workers(hire_date DESC);
