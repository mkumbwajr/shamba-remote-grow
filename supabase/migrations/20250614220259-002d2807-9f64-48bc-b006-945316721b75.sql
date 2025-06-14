
-- Create a table for news articles
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  author_name TEXT NOT NULL DEFAULT 'Bwana Shamba Team',
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for news article comments
CREATE TABLE public.news_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES public.news_articles(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) for news articles (publicly readable)
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read news articles
CREATE POLICY "Anyone can view news articles" 
  ON public.news_articles 
  FOR SELECT 
  USING (true);

-- Add Row Level Security (RLS) for news comments
ALTER TABLE public.news_comments ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read news comments
CREATE POLICY "Anyone can view news comments" 
  ON public.news_comments 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to create news comments
CREATE POLICY "Authenticated users can create news comments" 
  ON public.news_comments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own news comments
CREATE POLICY "Users can update their own news comments" 
  ON public.news_comments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to delete their own news comments
CREATE POLICY "Users can delete their own news comments" 
  ON public.news_comments 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Insert some sample news articles
INSERT INTO public.news_articles (title, content, excerpt, category, author_name, image_url) VALUES
('Partnership with AgriTech Solutions', 'We are excited to announce our new partnership with AgriTech Solutions, bringing advanced farming technology to our platform. This collaboration will provide our farmers with access to cutting-edge tools and resources for precision agriculture.

Our partnership includes:
- Advanced soil analysis tools
- Drone monitoring services  
- AI-powered crop recommendations
- Real-time weather integration

This partnership represents our commitment to providing farmers with the most advanced tools available in the market.', 'Bwana Shamba partners with AgriTech Solutions to bring advanced farming technology to our platform.', 'partnership', 'Sarah Johnson', '/placeholder.svg'),

('User Success Story: Farmer John''s Journey', 'Meet John Mwangi, a small-scale farmer from Nakuru who transformed his 2-acre farm using Bwana Shamba platform. 

"Before joining Bwana Shamba, I was struggling with low yields and unpredictable income," says John. "The platform helped me connect with experienced workers, access quality seeds, and learn modern farming techniques."

Key achievements:
- 300% increase in crop yield
- Connected with reliable buyers
- Reduced farming costs by 40%
- Expanded farm to 5 acres

John''s story is one of many success stories on our platform, demonstrating the real impact of digital farming solutions.', 'Farmer John Mwangi shares how Bwana Shamba helped him increase his crop yield by 300%.', 'testimonial', 'Michael Ochieng', '/placeholder.svg'),

('Major Platform Update: New Dashboard Features', 'We''ve launched a major update to our platform with exciting new features designed to enhance your farming experience.

New Features Include:
- Enhanced weather forecasting with 14-day predictions
- Integrated marketplace with direct buyer connections
- Advanced analytics dashboard with profit tracking
- Mobile app improvements for offline functionality
- Real-time chat with agricultural experts

Performance Improvements:
- 50% faster page loading times
- Improved mobile responsiveness
- Enhanced security features
- Better data synchronization

These updates are part of our ongoing commitment to providing the best digital farming experience.', 'Major platform update brings new dashboard features, enhanced weather forecasting, and improved performance.', 'update', 'Technical Team', '/placeholder.svg'),

('New Investment Opportunities Available', 'Exciting news for our farming community! We''ve partnered with leading financial institutions to offer new investment opportunities for farmers looking to expand their operations.

Available Investment Options:
- Equipment financing with competitive rates
- Crop insurance packages
- Seasonal funding for planting
- Expansion loans for land acquisition

Benefits:
- Flexible repayment terms
- Low interest rates
- Quick approval process
- No collateral required for small loans

Apply directly through the platform and get approved within 48 hours.', 'New investment opportunities and financing options now available for farmers through our platform.', 'partnership', 'Finance Team', '/placeholder.svg');
