import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

import ProfileHeaderBar from '@/components/profile/ProfileHeaderBar';
import ProfileCardHeaderDisplay from '@/components/profile/ProfileCardHeaderDisplay';
import ProfileInformationActions from '@/components/profile/ProfileInformationActions';
import ProfileViewMode from '@/components/profile/ProfileViewMode';
import ProfileEditMode from '@/components/profile/ProfileEditMode';

// Profile interface remains useful for type clarity if needed, or use Tables<'profiles'> directly
export interface Profile extends Tables<'profiles'> {} // Simplified, ensure it matches DB schema

const ProfileComponent = () => {
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null); // Added userEmail state
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Use Partial<Tables<'profiles'>> for editData state
  const [editData, setEditData] = useState<Partial<Tables<'profiles'>>>({
    full_name: null,
    country: null,
    phone: null,
    preferred_crop: null,
    farming_experience: null,
    farm_size: null,
  });

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/auth'); return; }
      setUserEmail(user.email || null); // Set user email

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single<Tables<'profiles'>>(); // Specify type for single select

      if (error) {
        // It's possible the profile doesn't exist yet, which can be normal for a new user
        if (error.code === 'PGRST116') { // PostgREST error for "JSON object requested, multiple (or no) rows returned"
          toast.info(t('noProfileFound') as string || 'Profile not yet created. You can create one by editing.');
          setProfile(null); // No profile exists yet
          // Initialize editData with empty/null values for a new profile creation
          setEditData({
            full_name: null, country: null, phone: null, preferred_crop: null, farming_experience: null, farm_size: null,
          });
        } else {
          toast.error(`${t('loadingProfile')}: ${error.message}`);
          setProfile(null);
        }
      } else if (data) {
        setProfile(data);
        setEditData({
          full_name: data.full_name || null,
          country: data.country || null,
          phone: data.phone || null,
          preferred_crop: data.preferred_crop || null,
          farming_experience: data.farming_experience || null,
          farm_size: data.farm_size || null,
        });
      } else {
        toast.info(t('noProfileFound') as string || 'Profile not yet created. You can create one by editing.');
        setProfile(null);
        setEditData({
            full_name: null, country: null, phone: null, preferred_crop: null, farming_experience: null, farm_size: null,
        });
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred while fetching profile.');
      console.error('Unexpected fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/auth'); setIsSaving(false); return; }

      const updates: Partial<Omit<Tables<'profiles'>, 'id' | 'created_at'>> = {
        full_name: editData.full_name || null,
        country: editData.country || null,
        phone: editData.phone || null,
        preferred_crop: editData.preferred_crop || null,
        farming_experience: editData.farming_experience || null,
        farm_size: editData.farm_size || null,
        updated_at: new Date().toISOString(),
      };
      
      // Upsert logic: if profile doesn't exist (profile state is null), insert, else update.
      // Supabase upsert can handle this if the 'id' is provided and is a primary key.
      // Or, check if profile exists to decide between insert and update.
      // For simplicity with Supabase, if 'id' is part of 'updates' and conflict target is 'id', it can upsert.
      // Here, we'll ensure 'id' is present for upsert to work correctly.
      
      const payload = { ...updates, id: user.id }; // Add id for upsert

      const { error } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'id' }) // Use upsert
        .select() // Optionally select to confirm
        .single();


      if (error) {
        toast.error(`${t('profileInformation')} save failed: ${error.message}`);
      } else {
        toast.success(`${t('profileInformation')} ${t('save')}d successfully!`);
        setIsEditing(false);
        await fetchProfile(); 
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred while saving profile.');
      console.error('Unexpected save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Update handleEditDataChange to match ProfileEditModeProps
  const handleEditDataChange = (
    field: keyof Omit<Tables<'profiles'>, 'id' | 'created_at' | 'updated_at'>,
    value: string | null // Allow null for select clearing
  ) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancelEdit = () => {
    if (profile) {
      setEditData({
        full_name: profile.full_name || null,
        country: profile.country || null,
        phone: profile.phone || null,
        preferred_crop: profile.preferred_crop || null,
        farming_experience: profile.farming_experience || null,
        farm_size: profile.farm_size || null,
      });
    } else { // If no profile, reset to empty/null
        setEditData({
            full_name: null, country: null, phone: null, preferred_crop: null, farming_experience: null, farm_size: null,
        });
    }
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-forest-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-forest-600">{t('loadingProfile') as string}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50">
      <ProfileHeaderBar onSignOut={handleSignOut} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white border-forest-200 shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <ProfileCardHeaderDisplay userProfile={profile} /> 
              <hr className="my-6 border-gray-200" />
              <ProfileInformationActions
                isEditing={isEditing}
                isSaving={isSaving}
                onStartEdit={() => setIsEditing(true)}
                onCancelEdit={handleCancelEdit}
                onSave={handleSave}
              />
              <div className="mt-6">
                {isEditing ? (
                  <ProfileEditMode
                    formData={editData}
                    onFormChange={handleEditDataChange}
                    userEmail={userEmail} // Pass userEmail
                  />
                ) : (
                  <ProfileViewMode 
                    userProfile={profile} 
                    userEmail={userEmail} // Pass userEmail
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
