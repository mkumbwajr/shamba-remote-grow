
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
  editData: any;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
  onFormChange: (field: string, value: string | null) => void;
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
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50 px-4 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white border-forest-200 shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="space-y-6 lg:space-y-8">
              {/* Header section */}
              <div>
                <ProfileCardHeaderDisplay userProfile={profile} />
                <hr className="my-4 sm:my-6 border-gray-200" />
                <ProfileInformationActions
                  isEditing={isEditing}
                  isSaving={isSaving}
                  onStartEdit={onStartEdit}
                  onCancelEdit={onCancelEdit}
                  onSave={onSave}
                />
              </div>
              
              {/* Profile content */}
              <div>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileContainer;
