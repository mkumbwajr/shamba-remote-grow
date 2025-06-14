
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
import PersonalInformationSection from './sections/PersonalInformationSection';
import BioSection from './sections/BioSection';
import FarmingInformationSection from './sections/FarmingInformationSection';
import GoalsAndInterestsSection from './sections/GoalsAndInterestsSection';
import ContactAndSocialSection from './sections/ContactAndSocialSection';

interface ProfileEditModeProps {
  formData: Partial<Tables<'profiles'>>;
  onFormChange: (field: string, value: string) => void;
  userEmail?: string | null;
}

const ProfileEditMode: React.FC<ProfileEditModeProps> = ({ formData, onFormChange, userEmail }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <PersonalInformationSection 
        formData={formData}
        onFormChange={onFormChange}
        userEmail={userEmail}
      />
      
      <BioSection 
        formData={formData}
        onFormChange={onFormChange}
      />
      
      <FarmingInformationSection 
        formData={formData}
        onFormChange={onFormChange}
      />
      
      <GoalsAndInterestsSection 
        formData={formData}
        onFormChange={onFormChange}
      />
      
      <ContactAndSocialSection 
        formData={formData}
        onFormChange={onFormChange}
      />
    </div>
  );
};

export default ProfileEditMode;
