
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
import ProfileDetailItem from './ProfileDetailItem';

interface ProfileViewModeProps {
  userProfile: Tables<'profiles'> | null;
  userEmail?: string | null;
}

// Extended type to include missing fields
type ExtendedProfile = Tables<'profiles'> & {
  citizenship?: string | null;
  nida_number?: string | null;
  passport_number?: string | null;
};

const ProfileViewMode: React.FC<ProfileViewModeProps> = ({ userProfile, userEmail }) => {
  const { t } = useLanguage();
  
  // Cast to extended type to access additional fields
  const extendedProfile = userProfile as ExtendedProfile;
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      {/* Personal Information Section */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 order-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
          {t('personalInformation') as string}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <ProfileDetailItem label={t('fullName') as string} value={extendedProfile?.full_name} />
          <ProfileDetailItem label={t('email') as string} value={userEmail} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('phone') as string} value={extendedProfile?.phone} />
            <ProfileDetailItem label={t('citizenship') as string} value={extendedProfile?.citizenship} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('nidaNumber') as string} value={extendedProfile?.nida_number} />
            <ProfileDetailItem label={t('passportNumber') as string} value={extendedProfile?.passport_number} />
          </div>
          <ProfileDetailItem label={t('country') as string} value={extendedProfile?.country ? t(`countries.${extendedProfile.country}`) as string : undefined} />
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 order-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
          {t('about') as string}
        </h3>
        <ProfileDetailItem label={t('bio') as string} value={extendedProfile?.bio} />
      </div>

      {/* Farming Information Section */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 order-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
          {t('farmingInformation') as string}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('preferredCrop') as string} value={extendedProfile?.preferred_crop ? t(`cropsList.${extendedProfile.preferred_crop}`) as string : undefined} />
            <ProfileDetailItem label={t('farmSize') as string} value={extendedProfile?.farm_size ? t(`farmSizes.${extendedProfile.farm_size}`) as string : undefined} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('farmingExperience') as string} value={extendedProfile?.farming_experience ? t(`experienceLevels.${extendedProfile.farming_experience}`) as string : undefined} />
            <ProfileDetailItem label={t('farmLocation') as string} value={extendedProfile?.farm_location} />
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
            <ProfileDetailItem label={t('farmingGoals') as string} value={extendedProfile?.farming_goals} />
            <ProfileDetailItem label={t('interestedServices') as string} value={extendedProfile?.interested_services} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <ProfileDetailItem label={t('investmentBudget') as string} value={extendedProfile?.investment_budget} />
            <ProfileDetailItem label={t('languagesSpoken') as string} value={extendedProfile?.languages_spoken} />
          </div>
        </div>
      </div>

      {/* Contact and Social Section - spans both columns on larger screens */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 xl:col-span-2 order-5">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
          {t('contactAndSocial') as string}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <ProfileDetailItem label={t('website') as string} value={extendedProfile?.website} />
          <ProfileDetailItem label={t('socialMedia') as string} value={extendedProfile?.social_media} />
          <ProfileDetailItem label={t('preferredContact') as string} value={extendedProfile?.preferred_contact_method} />
        </div>
      </div>
    </div>
  );
};

export default ProfileViewMode;
