
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileInformationActionsProps {
  isEditing: boolean;
  onStartEdit: () => void; // Renamed from onEdit
  onCancelEdit: () => void; // Renamed from onCancel
  onSave: () => void;
  isSaving: boolean; // Renamed from isLoading and explicitly added
}

const ProfileInformationActions: React.FC<ProfileInformationActionsProps> = ({
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSave,
  isSaving, // Changed from isLoading
}) => {
  const { t } = useLanguage();
  return (
    <div className="flex justify-end mt-4">
      {isEditing ? (
        <>
          <Button variant="ghost" onClick={onCancelEdit} className="mr-2">
            {t('cancel') as string}
          </Button>
          <Button onClick={onSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
            {isSaving ? t('saving') as string : t('save') as string}
          </Button>
        </>
      ) : (
        <Button onClick={onStartEdit} className="bg-green-600 hover:bg-green-700">
          {t('edit') as string}
        </Button>
      )}
    </div>
  );
};
export default ProfileInformationActions;
