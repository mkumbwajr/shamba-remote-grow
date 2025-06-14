
import React from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserProfileData {
  full_name?: string | null;
}

export const useFarmsUserProfile = () => {
  const [userProfile, setUserProfile] = React.useState<UserProfileData | null>(null);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData, error } = await (supabase.from('profiles') as any)
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (profileData) {
          setUserProfile(profileData as UserProfileData);
        }
      }
    };
    fetchUserProfile();
  }, []);

  return userProfile;
};
