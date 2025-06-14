
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileInformationActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
}

const ProfileInformationActions: React.FC<ProfileInformationActionsProps> = ({
  isEditing,
  onEdit,
  onCancel,
  onSave,
  isLoading,
}) => {
  const { t } = useLanguage();
  return (
    <div className="flex justify-end mt-4">
      {isEditing ? (
        <>
          <Button variant="ghost" onClick={onCancel} className="mr-2">
            {t('cancel') as string}
          </Button>
          <Button onClick={onSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
            {isLoading ? t('saving') as string : t('save') as string}
          </Button>
        </>
      ) : (
        <Button onClick={onEdit} className="bg-green-600 hover:bg-green-700">
          {t('edit') as string}
        </Button>
      )}
    </div>
  );
};
export default ProfileInformationActions;
