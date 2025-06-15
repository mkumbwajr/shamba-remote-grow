
-- Create a table for product ratings
CREATE TABLE public.product_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  product_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create a table for product comments
CREATE TABLE public.product_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  product_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) for product_ratings
ALTER TABLE public.product_ratings ENABLE ROW LEVEL SECURITY;

-- Create policies for product_ratings
CREATE POLICY "Anyone can view product ratings" 
  ON public.product_ratings 
  FOR SELECT 
  TO authenticated;

CREATE POLICY "Users can create their own product ratings" 
  ON public.product_ratings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own product ratings" 
  ON public.product_ratings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own product ratings" 
  ON public.product_ratings 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add Row Level Security (RLS) for product_comments
ALTER TABLE public.product_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for product_comments
CREATE POLICY "Anyone can view product comments" 
  ON public.product_comments 
  FOR SELECT 
  TO authenticated;

CREATE POLICY "Users can create their own product comments" 
  ON public.product_comments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own product comments" 
  ON public.product_comments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own product comments" 
  ON public.product_comments 
  FOR DELETE 
  USING (auth.uid() = user_id);
