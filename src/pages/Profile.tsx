
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useProfileData } from '@/hooks/useProfileData';
import { useProfileEdit } from '@/hooks/useProfileEdit';
import ProfileHeaderBar from '@/components/profile/ProfileHeaderBar';
import ProfileLoadingSpinner from '@/components/profile/ProfileLoadingSpinner';
import ProfileContainer from '@/components/profile/ProfileContainer';
import EmailVerificationSection from '@/components/profile/EmailVerificationSection';

const ProfileComponent = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { profile, userEmail: profileUserEmail, isLoading, refetchProfile } = useProfileData();
  const {
    isEditing,
    setIsEditing,
    isSaving,
    editData,
    handleSave,
    handleEditDataChange,
    handleCancelEdit
  } = useProfileEdit(profile, refetchProfile);

  useEffect(() => {
    const fetchUserEmailStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || null);
        setIsEmailVerified(user.email_confirmed_at !== null);
      }
    };
    fetchUserEmailStatus();
  }, []);

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
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <EmailVerificationSection 
          userEmail={userEmail} 
          isEmailVerified={isEmailVerified} 
        />
        <ProfileContainer
          profile={profile}
          userEmail={profileUserEmail}
          isEditing={isEditing}
          isSaving={isSaving}
          editData={editData}
          onStartEdit={() => setIsEditing(true)}
          onCancelEdit={handleCancelEdit}
          onSave={handleSave}
          onFormChange={handleEditDataChange}
        />
      </div>
    </div>
  );
};

export default ProfileComponent;
