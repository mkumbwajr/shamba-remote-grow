
import React from 'react';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileDetailItemProps {
  label: string;
  value?: string | null;
}

const ProfileDetailItem: React.FC<ProfileDetailItemProps> = ({ label, value }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-1">
      <Label className="text-xs sm:text-sm font-medium text-gray-500">{label}</Label>
      <p className="text-sm sm:text-base text-gray-800 break-words">
        {value || (t('notProvided') as string)}
      </p>
    </div>
  );
};

export default ProfileDetailItem;
