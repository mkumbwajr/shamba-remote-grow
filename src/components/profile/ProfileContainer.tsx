
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tables } from '@/integrations/supabase/types';
import ProfileCardHeaderDisplay from './ProfileCardHeaderDisplay';
import ProfileInformationActions from './ProfileInformationActions';
import ProfileViewMode from './ProfileViewMode';
import ProfileEditMode from './ProfileEditMode';

interface ProfileContainerProps {
  profile: Tables<'profiles'> | null;
  userEmail: string | null;
  isEditing: boolean;
  isSaving: boolean;
  editData: Partial<Tables<'profiles'>>;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
  onFormChange: (field: keyof Omit<Tables<'profiles'>, 'id' | 'created_at' | 'updated_at'>, value: string | null) => void;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  profile,
  userEmail,
  isEditing,
  isSaving,
  editData,
  onStartEdit,
  onCancelEdit,
  onSave,
  onFormChange
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white border-forest-200 shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <ProfileCardHeaderDisplay userProfile={profile} />
            <hr className="my-6 border-gray-200" />
            <ProfileInformationActions
              isEditing={isEditing}
              isSaving={isSaving}
              onStartEdit={onStartEdit}
              onCancelEdit={onCancelEdit}
              onSave={onSave}
            />
            <div className="mt-6">
              {isEditing ? (
                <ProfileEditMode
                  formData={editData}
                  onFormChange={onFormChange}
                  userEmail={userEmail}
                />
              ) : (
                <ProfileViewMode 
                  userProfile={profile} 
                  userEmail={userEmail}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileContainer;
