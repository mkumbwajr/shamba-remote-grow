
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

// Extended type to include missing fields
type ExtendedProfile = Tables<'profiles'> & {
  citizenship?: string | null;
  nida_number?: string | null;
  passport_number?: string | null;
};

export const useProfileEdit = (profile: Tables<'profiles'> | null, onSuccess: () => void) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const extendedProfile = profile as ExtendedProfile;

  const [editData, setEditData] = useState<Partial<ExtendedProfile>>({
    full_name: extendedProfile?.full_name || null,
    country: extendedProfile?.country || null,
    phone: extendedProfile?.phone || null,
    citizenship: extendedProfile?.citizenship || null,
    nida_number: extendedProfile?.nida_number || null,
    passport_number: extendedProfile?.passport_number || null,
    preferred_crop: extendedProfile?.preferred_crop || null,
    farming_experience: extendedProfile?.farming_experience || null,
    farm_size: extendedProfile?.farm_size || null,
    bio: extendedProfile?.bio || null,
    farm_location: extendedProfile?.farm_location || null,
    farming_goals: extendedProfile?.farming_goals || null,
    interested_services: extendedProfile?.interested_services || null,
    investment_budget: extendedProfile?.investment_budget || null,
    languages_spoken: extendedProfile?.languages_spoken || null,
    website: extendedProfile?.website || null,
    social_media: extendedProfile?.social_media || null,
    preferred_contact_method: extendedProfile?.preferred_contact_method || null,
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

      const updates: Record<string, any> = {
        full_name: editData.full_name || null,
        country: editData.country || null,
        phone: editData.phone || null,
        citizenship: editData.citizenship || null,
        nida_number: editData.nida_number || null,
        passport_number: editData.passport_number || null,
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
    field: string,
    value: string | null
  ) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancelEdit = () => {
    if (extendedProfile) {
      setEditData({
        full_name: extendedProfile.full_name || null,
        country: extendedProfile.country || null,
        phone: extendedProfile.phone || null,
        citizenship: extendedProfile.citizenship || null,
        nida_number: extendedProfile.nida_number || null,
        passport_number: extendedProfile.passport_number || null,
        preferred_crop: extendedProfile.preferred_crop || null,
        farming_experience: extendedProfile.farming_experience || null,
        farm_size: extendedProfile.farm_size || null,
        bio: extendedProfile.bio || null,
        farm_location: extendedProfile.farm_location || null,
        farming_goals: extendedProfile.farming_goals || null,
        interested_services: extendedProfile.interested_services || null,
        investment_budget: extendedProfile.investment_budget || null,
        languages_spoken: extendedProfile.languages_spoken || null,
        website: extendedProfile.website || null,
        social_media: extendedProfile.social_media || null,
        preferred_contact_method: extendedProfile.preferred_contact_method || null,
      });
    } else {
      setEditData({
        full_name: null, country: null, phone: null, citizenship: null,
        nida_number: null, passport_number: null, preferred_crop: null, 
        farming_experience: null, farm_size: null, bio: null, farm_location: null,
        farming_goals: null, interested_services: null, investment_budget: null,
        languages_spoken: null, website: null, social_media: null, preferred_contact_method: null,
      });
    }
    setIsEditing(false);
  };

  // Update editData when profile changes
  React.useEffect(() => {
    if (extendedProfile) {
      setEditData({
        full_name: extendedProfile.full_name || null,
        country: extendedProfile.country || null,
        phone: extendedProfile.phone || null,
        citizenship: extendedProfile.citizenship || null,
        nida_number: extendedProfile.nida_number || null,
        passport_number: extendedProfile.passport_number || null,
        preferred_crop: extendedProfile.preferred_crop || null,
        farming_experience: extendedProfile.farming_experience || null,
        farm_size: extendedProfile.farm_size || null,
        bio: extendedProfile.bio || null,
        farm_location: extendedProfile.farm_location || null,
        farming_goals: extendedProfile.farming_goals || null,
        interested_services: extendedProfile.interested_services || null,
        investment_budget: extendedProfile.investment_budget || null,
        languages_spoken: extendedProfile.languages_spoken || null,
        website: extendedProfile.website || null,
        social_media: extendedProfile.social_media || null,
        preferred_contact_method: extendedProfile.preferred_contact_method || null,
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
