
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
import ProfileDetailItem from './ProfileDetailItem';

interface ProfileViewModeProps {
  userProfile: Tables<'profiles'> | null;
  userEmail?: string | null;
}

const ProfileViewMode: React.FC<ProfileViewModeProps> = ({ userProfile, userEmail }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-4">
      <ProfileDetailItem label={t('fullName') as string} value={userProfile?.full_name} />
      <ProfileDetailItem label={t('email') as string} value={userEmail} />
      <ProfileDetailItem label={t('country') as string} value={userProfile?.country ? t(`countries.${userProfile.country}`) as string : undefined} />
      <ProfileDetailItem label={t('phone') as string} value={userProfile?.phone} />
      <ProfileDetailItem label={t('preferredCrop') as string} value={userProfile?.preferred_crop ? t(`cropsList.${userProfile.preferred_crop}`) as string : undefined} />
      <ProfileDetailItem label={t('farmSize') as string} value={userProfile?.farm_size ? t(`farmSizes.${userProfile.farm_size}`) as string : undefined} />
      <ProfileDetailItem label={t('farmingExperience') as string} value={userProfile?.farming_experience ? t(`experienceLevels.${userProfile.farming_experience}`) as string : undefined} />
    </div>
  );
};
export default ProfileViewMode;
