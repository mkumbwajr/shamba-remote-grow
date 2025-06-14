
-- Add missing columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS citizenship TEXT,
ADD COLUMN IF NOT EXISTS nida_number TEXT,
ADD COLUMN IF NOT EXISTS passport_number TEXT;

-- Update the handle_new_user function to include the new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    country, 
    phone, 
    preferred_crop, 
    farming_experience, 
    farm_size,
    bio,
    farm_location,
    farming_goals,
    interested_services,
    investment_budget,
    languages_spoken,
    website,
    social_media,
    preferred_contact_method,
    citizenship,
    nida_number,
    passport_number
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'country',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'preferred_crop',
    NEW.raw_user_meta_data->>'farming_experience',
    NEW.raw_user_meta_data->>'farm_size',
    NEW.raw_user_meta_data->>'bio',
    NEW.raw_user_meta_data->>'farm_location',
    NEW.raw_user_meta_data->>'farming_goals',
    NEW.raw_user_meta_data->>'interested_services',
    NEW.raw_user_meta_data->>'investment_budget',
    NEW.raw_user_meta_data->>'languages_spoken',
    NEW.raw_user_meta_data->>'website',
    NEW.raw_user_meta_data->>'social_media',
    NEW.raw_user_meta_data->>'preferred_contact_method',
    NEW.raw_user_meta_data->>'citizenship',
    NEW.raw_user_meta_data->>'nida_number',
    NEW.raw_user_meta_data->>'passport_number'
  );
  RETURN NEW;
END;
$function$;
