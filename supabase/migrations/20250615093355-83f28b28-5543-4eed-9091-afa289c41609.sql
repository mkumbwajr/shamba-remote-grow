
-- Create workers table for admin management
CREATE TABLE public.workers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    experience_years INTEGER,
    hourly_rate NUMERIC,
    daily_rate NUMERIC,
    description TEXT,
    skills TEXT[], -- Array of skills
    availability_status TEXT DEFAULT 'available',
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create marketplace_products table
CREATE TABLE public.marketplace_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    stock_quantity INTEGER DEFAULT 0,
    vendor_name TEXT,
    vendor_contact TEXT,
    specifications JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create marketplace_services table
CREATE TABLE public.marketplace_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    provider_name TEXT,
    provider_contact TEXT,
    duration_hours INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create land_plots table
CREATE TABLE public.land_plots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    size_acres NUMERIC NOT NULL,
    price_per_acre NUMERIC NOT NULL,
    total_price NUMERIC GENERATED ALWAYS AS (size_acres * price_per_acre) STORED,
    soil_type TEXT,
    water_access BOOLEAN DEFAULT false,
    electricity_access BOOLEAN DEFAULT false,
    road_access BOOLEAN DEFAULT false,
    latitude NUMERIC,
    longitude NUMERIC,
    images JSONB, -- Array of image URLs
    owner_name TEXT,
    owner_contact TEXT,
    availability_status TEXT DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service_charges table to track revenue
CREATE TABLE public.service_charges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    service_type TEXT NOT NULL, -- 'marketplace_purchase', 'worker_hire', 'land_rental', 'subscription', etc.
    service_id UUID, -- Reference to the specific service/product/worker
    amount NUMERIC NOT NULL,
    commission_rate NUMERIC DEFAULT 0.05, -- 5% default commission
    commission_amount NUMERIC GENERATED ALWAYS AS (amount * commission_rate) STORED,
    status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'refunded'
    payment_method TEXT,
    transaction_reference TEXT,
    description TEXT,
    metadata JSONB, -- Additional data about the transaction
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscriptions table for premium users
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    plan_type TEXT NOT NULL, -- 'basic', 'premium', 'enterprise'
    price NUMERIC NOT NULL,
    billing_cycle TEXT NOT NULL, -- 'monthly', 'yearly'
    status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'expired'
    start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    end_date TIMESTAMP WITH TIME ZONE,
    auto_renewal BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create support_tickets table
CREATE TABLE public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    priority TEXT DEFAULT 'medium',
    assigned_to UUID REFERENCES auth.users(id),
    response TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create platform_settings table for admin configuration
CREATE TABLE public.platform_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'general', -- 'general', 'payment', 'appearance', 'features'
    updated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.land_plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin access
CREATE POLICY "Admins can manage workers"
ON public.workers
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage products"
ON public.marketplace_products
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage services"
ON public.marketplace_services
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage land plots"
ON public.land_plots
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage service charges"
ON public.service_charges
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage subscriptions"
ON public.subscriptions
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage support tickets"
ON public.support_tickets
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can manage platform settings"
ON public.platform_settings
FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'));

-- Public read access for marketplace and workers
CREATE POLICY "Public can view active products"
ON public.marketplace_products
FOR SELECT
USING (is_active = true);

CREATE POLICY "Public can view active services"
ON public.marketplace_services
FOR SELECT
USING (is_active = true);

CREATE POLICY "Public can view available workers"
ON public.workers
FOR SELECT
USING (availability_status = 'available');

CREATE POLICY "Public can view available land plots"
ON public.land_plots
FOR SELECT
USING (availability_status = 'available');

-- Users can interact with their own data
CREATE POLICY "Users can view their own charges"
ON public.service_charges
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own subscriptions"
ON public.subscriptions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create support tickets"
ON public.support_tickets
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own tickets"
ON public.support_tickets
FOR SELECT
USING (auth.uid() = user_id);

-- Insert default platform settings
INSERT INTO public.platform_settings (setting_key, setting_value, description, category) VALUES
('commission_rates', '{"marketplace": 0.05, "worker_hire": 0.03, "land_rental": 0.04}', 'Platform commission rates by service type', 'payment'),
('featured_listings', '{"max_featured": 10, "featured_price": 50}', 'Featured listings configuration', 'general'),
('platform_branding', '{"primary_color": "#16a34a", "secondary_color": "#059669", "logo_url": ""}', 'Platform appearance settings', 'appearance'),
('notification_settings', '{"email_notifications": true, "sms_notifications": false, "push_notifications": true}', 'Platform notification preferences', 'features');

-- Create revenue analytics view
CREATE OR REPLACE VIEW public.revenue_analytics AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    service_type,
    COUNT(*) as transaction_count,
    SUM(amount) as total_revenue,
    SUM(commission_amount) as total_commission,
    AVG(amount) as avg_transaction_value
FROM public.service_charges
WHERE status = 'completed'
GROUP BY DATE_TRUNC('month', created_at), service_type
ORDER BY month DESC, service_type;

-- Create user activity view for admin dashboard
CREATE OR REPLACE VIEW public.user_activity_summary AS
SELECT 
    p.id,
    p.full_name,
    p.country,
    p.phone,
    p.created_at,
    COALESCE(ur.role, 'user') as role,
    COUNT(DISTINCT f.id) as farms_count,
    COUNT(DISTINCT hw.id) as hired_workers_count,
    COUNT(DISTINCT sc.id) as transactions_count,
    COALESCE(SUM(sc.amount), 0) as total_spent,
    MAX(sc.created_at) as last_transaction_date
FROM public.profiles p
LEFT JOIN public.user_roles ur ON p.id = ur.user_id
LEFT JOIN public.farms f ON p.id = f.user_id
LEFT JOIN public.hired_workers hw ON p.id = hw.user_id
LEFT JOIN public.service_charges sc ON p.id = sc.user_id
GROUP BY p.id, p.full_name, p.country, p.phone, p.created_at, ur.role;
