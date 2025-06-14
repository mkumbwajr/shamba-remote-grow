import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

import ProfileHeaderBar from '@/components/profile/ProfileHeaderBar';
import ProfileCardHeaderDisplay from '@/components/profile/ProfileCardHeaderDisplay';
import ProfileInformationActions from '@/components/profile/ProfileInformationActions';
import ProfileViewMode from '@/components/profile/ProfileViewMode';
import ProfileEditMode, { EditData } from '@/components/profile/ProfileEditMode';

export interface Profile {
  id: string;
  full_name: string | null;
  country: string | null;
  phone: string | null;
  preferred_crop: string | null;
  farming_experience: string | null;
  farm_size: string | null;
  created_at: string; 
  updated_at?: string | null; // Added updated_at as it's in the DB schema
}

const ProfileComponent = () => { // Renamed to avoid conflict with interface name
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [editData, setEditData] = useState<EditData>({
    full_name: '', country: '', phone: '', preferred_crop: '', farming_experience: '', farm_size: ''
  });

  const getObjectKeys = (path: string) => Object.keys(t(path, { returnObjects: true } as any) || {});
  const countries = getObjectKeys('countries');
  const crops = getObjectKeys('cropsList');
  const experienceLevels = getObjectKeys('experienceLevels');
  const farmSizes = getObjectKeys('farmSizes');

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/auth'); return; }

      // Using `as any` for from() and casting result
      const { data, error } = await (supabase.from('profiles') as any)
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        toast.error(`${t('loadingProfile')}: ${error.message}`);
        setProfile(null);
      } else if (data) {
        const fetchedProfile = data as Profile; // Cast to Profile
        setProfile(fetchedProfile);
        setEditData({
          full_name: fetchedProfile.full_name || '',
          country: fetchedProfile.country || '',
          phone: fetchedProfile.phone || '',
          preferred_crop: fetchedProfile.preferred_crop || '',
          farming_experience: fetchedProfile.farming_experience || '',
          farm_size: fetchedProfile.farm_size || ''
        });
      } else {
        // Data is null but no error, e.g. profile not found
        toast.error(t('loadingProfile') + ': Profile data not found.');
        setProfile(null);
      }
    } catch (err) {
      toast.error('An unexpected error occurred while fetching profile.');
      console.error('Unexpected fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 
          // fetchProfile itself doesn't change, but it's called on mount.

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/auth'); setIsSaving(false); return; }

      const updates: Partial<Omit<Profile, 'id' | 'created_at'>> = {
        full_name: editData.full_name || null,
        country: editData.country || null,
        phone: editData.phone || null,
        preferred_crop: editData.preferred_crop || null,
        farming_experience: editData.farming_experience || null,
        farm_size: editData.farm_size || null,
        updated_at: new Date().toISOString()
      };
      
      // Using `as any` for from()
      const { error } = await (supabase.from('profiles') as any)
        .update(updates)
        .eq('id', user.id);

      if (error) {
        toast.error(`${t('profileInformation')} save failed: ${error.message}`);
      } else {
        toast.success(`${t('profileInformation')} ${t('save')}d successfully!`);
        setIsEditing(false);
        await fetchProfile(); 
      }
    } catch (err) {
      toast.error('An unexpected error occurred while saving profile.');
      console.error('Unexpected save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditDataChange = (field: keyof EditData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancelEdit = () => {
    if (profile) {
      setEditData({
        full_name: profile.full_name || '',
        country: profile.country || '',
        phone: profile.phone || '',
        preferred_crop: profile.preferred_crop || '',
        farming_experience: profile.farming_experience || '',
        farm_size: profile.farm_size || ''
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
          <p className="text-forest-600">{t('loadingProfile')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50">
      <ProfileHeaderBar onSignOut={handleSignOut} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white border-forest-200 shadow-lg">
            <ProfileCardHeaderDisplay profile={profile} />
            <CardContent className="space-y-6">
              <ProfileInformationActions
                isEditing={isEditing}
                isSaving={isSaving}
                onStartEdit={() => setIsEditing(true)}
                onCancelEdit={handleCancelEdit}
                onSave={handleSave}
              />
              {isEditing ? (
                <ProfileEditMode
                  editData={editData}
                  onEditDataChange={handleEditDataChange}
                  countries={countries}
                  crops={crops}
                  experienceLevels={experienceLevels}
                  farmSizes={farmSizes}
                />
              ) : (
                <ProfileViewMode profile={profile} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent; // Exporting renamed component
