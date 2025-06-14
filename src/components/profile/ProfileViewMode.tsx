
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Personal Information Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          {t('personalInformation') as string}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <ProfileDetailItem label={t('fullName') as string} value={userProfile?.full_name} />
          <ProfileDetailItem label={t('email') as string} value={userEmail} />
          <ProfileDetailItem label={t('phone') as string} value={userProfile?.phone} />
          <ProfileDetailItem label={t('citizenship') as string} value={userProfile?.citizenship} />
          <ProfileDetailItem label={t('nidaNumber') as string} value={userProfile?.nida_number} />
          <ProfileDetailItem label={t('passportNumber') as string} value={userProfile?.passport_number} />
          <ProfileDetailItem label={t('country') as string} value={userProfile?.country ? t(`countries.${userProfile.country}`) as string : undefined} />
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          {t('about') as string}
        </h3>
        <ProfileDetailItem label={t('bio') as string} value={userProfile?.bio} />
      </div>

      {/* Farming Information Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          {t('farmingInformation') as string}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileDetailItem label={t('preferredCrop') as string} value={userProfile?.preferred_crop ? t(`cropsList.${userProfile.preferred_crop}`) as string : undefined} />
          <ProfileDetailItem label={t('farmSize') as string} value={userProfile?.farm_size ? t(`farmSizes.${userProfile.farm_size}`) as string : undefined} />
          <ProfileDetailItem label={t('farmingExperience') as string} value={userProfile?.farming_experience ? t(`experienceLevels.${userProfile.farming_experience}`) as string : undefined} />
          <ProfileDetailItem label={t('farmLocation') as string} value={userProfile?.farm_location} />
        </div>
      </div>

      {/* Goals and Interests Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          {t('goalsAndInterests') as string}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileDetailItem label={t('farmingGoals') as string} value={userProfile?.farming_goals} />
          <ProfileDetailItem label={t('interestedServices') as string} value={userProfile?.interested_services} />
          <ProfileDetailItem label={t('investmentBudget') as string} value={userProfile?.investment_budget} />
          <ProfileDetailItem label={t('languagesSpoken') as string} value={userProfile?.languages_spoken} />
        </div>
      </div>

      {/* Contact and Social Section - spans both columns */}
      <div className="bg-gray-50 rounded-lg p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          {t('contactAndSocial') as string}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProfileDetailItem label={t('website') as string} value={userProfile?.website} />
          <ProfileDetailItem label={t('socialMedia') as string} value={userProfile?.social_media} />
          <ProfileDetailItem label={t('preferredContact') as string} value={userProfile?.preferred_contact_method} />
        </div>
      </div>
    </div>
  );
};

export default ProfileViewMode;
