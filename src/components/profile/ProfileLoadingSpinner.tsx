
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProfileLoadingSpinner: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50 flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 border-4 border-forest-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-forest-600">{t('loadingProfile') as string}</p>
      </div>
    </div>
  );
};

export default ProfileLoadingSpinner;
