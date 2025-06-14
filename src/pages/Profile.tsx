
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useProfileData } from '@/hooks/useProfileData';
import { useProfileEdit } from '@/hooks/useProfileEdit';
import ProfileHeaderBar from '@/components/profile/ProfileHeaderBar';
import ProfileLoadingSpinner from '@/components/profile/ProfileLoadingSpinner';
import ProfileContainer from '@/components/profile/ProfileContainer';

const ProfileComponent = () => {
  const navigate = useNavigate();
  const { profile, userEmail, isLoading, refetchProfile } = useProfileData();
  const {
    isEditing,
    setIsEditing,
    isSaving,
    editData,
    handleSave,
    handleEditDataChange,
    handleCancelEdit
  } = useProfileEdit(profile, refetchProfile);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (isLoading) {
    return <ProfileLoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50">
      <ProfileHeaderBar onSignOut={handleSignOut} />
      <ProfileContainer
        profile={profile}
        userEmail={userEmail}
        isEditing={isEditing}
        isSaving={isSaving}
        editData={editData}
        onStartEdit={() => setIsEditing(true)}
        onCancelEdit={handleCancelEdit}
        onSave={handleSave}
        onFormChange={handleEditDataChange}
      />
    </div>
  );
};

export default ProfileComponent;
