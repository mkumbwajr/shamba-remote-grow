
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

export const useProfileEdit = (profile: Tables<'profiles'> | null, onSuccess: () => void) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [editData, setEditData] = useState<Partial<Tables<'profiles'>>>({
    full_name: profile?.full_name || null,
    country: profile?.country || null,
    phone: profile?.phone || null,
    preferred_crop: profile?.preferred_crop || null,
    farming_experience: profile?.farming_experience || null,
    farm_size: profile?.farm_size || null,
    bio: profile?.bio || null,
    farm_location: profile?.farm_location || null,
    farming_goals: profile?.farming_goals || null,
    interested_services: profile?.interested_services || null,
    investment_budget: profile?.investment_budget || null,
    languages_spoken: profile?.languages_spoken || null,
    website: profile?.website || null,
    social_media: profile?.social_media || null,
    preferred_contact_method: profile?.preferred_contact_method || null,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { 
        navigate('/auth'); 
        setIsSaving(false); 
        return; 
      }

      const updates: Partial<Omit<Tables<'profiles'>, 'id' | 'created_at'>> = {
        full_name: editData.full_name || null,
        country: editData.country || null,
        phone: editData.phone || null,
        preferred_crop: editData.preferred_crop || null,
        farming_experience: editData.farming_experience || null,
        farm_size: editData.farm_size || null,
        bio: editData.bio || null,
        farm_location: editData.farm_location || null,
        farming_goals: editData.farming_goals || null,
        interested_services: editData.interested_services || null,
        investment_budget: editData.investment_budget || null,
        languages_spoken: editData.languages_spoken || null,
        website: editData.website || null,
        social_media: editData.social_media || null,
        preferred_contact_method: editData.preferred_contact_method || null,
        updated_at: new Date().toISOString(),
      };
      
      const payload = { ...updates, id: user.id };

      const { error } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        toast.error(`${t('profileInformation')} save failed: ${error.message}`);
      } else {
        toast.success(`${t('profileInformation')} ${t('save')}d successfully!`);
        setIsEditing(false);
        onSuccess();
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred while saving profile.');
      console.error('Unexpected save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditDataChange = (
    field: keyof Omit<Tables<'profiles'>, 'id' | 'created_at' | 'updated_at'>,
    value: string | null
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
        bio: profile.bio || null,
        farm_location: profile.farm_location || null,
        farming_goals: profile.farming_goals || null,
        interested_services: profile.interested_services || null,
        investment_budget: profile.investment_budget || null,
        languages_spoken: profile.languages_spoken || null,
        website: profile.website || null,
        social_media: profile.social_media || null,
        preferred_contact_method: profile.preferred_contact_method || null,
      });
    } else {
      setEditData({
        full_name: null, country: null, phone: null, preferred_crop: null, 
        farming_experience: null, farm_size: null, bio: null, farm_location: null,
        farming_goals: null, interested_services: null, investment_budget: null,
        languages_spoken: null, website: null, social_media: null, preferred_contact_method: null,
      });
    }
    setIsEditing(false);
  };

  // Update editData when profile changes
  React.useEffect(() => {
    if (profile) {
      setEditData({
        full_name: profile.full_name || null,
        country: profile.country || null,
        phone: profile.phone || null,
        preferred_crop: profile.preferred_crop || null,
        farming_experience: profile.farming_experience || null,
        farm_size: profile.farm_size || null,
        bio: profile.bio || null,
        farm_location: profile.farm_location || null,
        farming_goals: profile.farming_goals || null,
        interested_services: profile.interested_services || null,
        investment_budget: profile.investment_budget || null,
        languages_spoken: profile.languages_spoken || null,
        website: profile.website || null,
        social_media: profile.social_media || null,
        preferred_contact_method: profile.preferred_contact_method || null,
      });
    }
  }, [profile]);

  return {
    isEditing,
    setIsEditing,
    isSaving,
    editData,
    handleSave,
    handleEditDataChange,
    handleCancelEdit
  };
};
