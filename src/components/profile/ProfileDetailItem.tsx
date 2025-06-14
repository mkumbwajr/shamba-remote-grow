
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
    <div>
      <Label className="text-sm font-medium text-gray-500">{label}</Label>
      <p className="mt-1 text-gray-800">{value || (t('notProvided') as string)}</p>
    </div>
  );
};
export default ProfileDetailItem;
