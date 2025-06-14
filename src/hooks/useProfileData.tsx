
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

export const useProfileData = () => {
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { 
        navigate('/auth'); 
        return; 
      }
      setUserEmail(user.email || null);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single<Tables<'profiles'>>();

      if (error) {
        if (error.code === 'PGRST116') {
          toast.info(t('noProfileFound') as string || 'Profile not yet created. You can create one by editing.');
          setProfile(null);
        } else {
          toast.error(`${t('loadingProfile')}: ${error.message}`);
          setProfile(null);
        }
      } else if (data) {
        setProfile(data);
      } else {
        toast.info(t('noProfileFound') as string || 'Profile not yet created. You can create one by editing.');
        setProfile(null);
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred while fetching profile.');
      console.error('Unexpected fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    userEmail,
    isLoading,
    refetchProfile: fetchProfile
  };
};
