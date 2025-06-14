
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

interface ProfileCardHeaderDisplayProps {
  userProfile: Tables<'profiles'> | null;
}

const ProfileCardHeaderDisplay: React.FC<ProfileCardHeaderDisplayProps> = ({ userProfile }) => {
  const { t } = useLanguage();
  return (
    <>
      <CardTitle className="text-3xl font-bold text-green-700">{t('yourProfile') as string}</CardTitle>
      <CardDescription>
        {t('memberSince') as string}{' '}
        {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : (t('notProvided') as string)}
      </CardDescription>
    </>
  );
};
export default ProfileCardHeaderDisplay;
