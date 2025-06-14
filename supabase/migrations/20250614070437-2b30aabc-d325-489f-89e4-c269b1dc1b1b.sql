
-- Add new columns to the profiles table for comprehensive user profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS farm_location TEXT,
ADD COLUMN IF NOT EXISTS farming_goals TEXT,
ADD COLUMN IF NOT EXISTS interested_services TEXT,
ADD COLUMN IF NOT EXISTS investment_budget TEXT,
ADD COLUMN IF NOT EXISTS languages_spoken TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS social_media TEXT,
ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT;

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
    preferred_contact_method
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
    NEW.raw_user_meta_data->>'preferred_contact_method'
  );
  RETURN NEW;
END;
$function$;
