
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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      {/* Personal Information Section */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 order-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
          {t('personalInformation') as string}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <ProfileDetailItem label={t('fullName') as string} value={userProfile?.full_name} />
          <ProfileDetailItem label={t('email') as string} value={userEmail} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('phone') as string} value={userProfile?.phone} />
            <ProfileDetailItem label={t('citizenship') as string} value={userProfile?.citizenship} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('nidaNumber') as string} value={userProfile?.nida_number} />
            <ProfileDetailItem label={t('passportNumber') as string} value={userProfile?.passport_number} />
          </div>
          <ProfileDetailItem label={t('country') as string} value={userProfile?.country ? t(`countries.${userProfile.country}`) as string : undefined} />
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 order-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
          {t('about') as string}
        </h3>
        <ProfileDetailItem label={t('bio') as string} value={userProfile?.bio} />
      </div>

      {/* Farming Information Section */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 order-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
          {t('farmingInformation') as string}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('preferredCrop') as string} value={userProfile?.preferred_crop ? t(`cropsList.${userProfile.preferred_crop}`) as string : undefined} />
            <ProfileDetailItem label={t('farmSize') as string} value={userProfile?.farm_size ? t(`farmSizes.${userProfile.farm_size}`) as string : undefined} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('farmingExperience') as string} value={userProfile?.farming_experience ? t(`experienceLevels.${userProfile.farming_experience}`) as string : undefined} />
            <ProfileDetailItem label={t('farmLocation') as string} value={userProfile?.farm_location} />
          </div>
        </div>
      </div>

      {/* Goals and Interests Section */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 order-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
          {t('goalsAndInterests') as string}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('farmingGoals') as string} value={userProfile?.farming_goals} />
            <ProfileDetailItem label={t('interestedServices') as string} value={userProfile?.interested_services} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('investmentBudget') as string} value={userProfile?.investment_budget} />
            <ProfileDetailItem label={t('languagesSpoken') as string} value={userProfile?.languages_spoken} />
          </div>
        </div>
      </div>

      {/* Contact and Social Section - spans both columns on larger screens */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 xl:col-span-2 order-5">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
          {t('contactAndSocial') as string}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <ProfileDetailItem label={t('website') as string} value={userProfile?.website} />
          <ProfileDetailItem label={t('socialMedia') as string} value={userProfile?.social_media} />
          <ProfileDetailItem label={t('preferredContact') as string} value={userProfile?.preferred_contact_method} />
        </div>
      </div>
    </div>
  );
};

export default ProfileViewMode;
