
-- Create a table for chat messages between users and hired workers
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  hired_worker_id UUID REFERENCES public.hired_workers(id) NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'worker')),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Add Row Level Security (RLS)
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view messages for their hired workers
CREATE POLICY "Users can view their chat messages" 
  ON public.chat_messages 
  FOR SELECT 
  USING (
    user_id = auth.uid() OR 
    hired_worker_id IN (
      SELECT id FROM public.hired_workers WHERE user_id = auth.uid()
    )
  );

-- Create policy that allows users to send messages to their hired workers
CREATE POLICY "Users can send messages to their hired workers" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (
    user_id = auth.uid() AND
    hired_worker_id IN (
      SELECT id FROM public.hired_workers WHERE user_id = auth.uid()
    )
  );

-- Create policy that allows users to update read status of their messages
CREATE POLICY "Users can update read status of their messages" 
  ON public.chat_messages 
  FOR UPDATE 
  USING (
    user_id = auth.uid() OR 
    hired_worker_id IN (
      SELECT id FROM public.hired_workers WHERE user_id = auth.uid()
    )
  );

-- Enable realtime for chat messages
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
