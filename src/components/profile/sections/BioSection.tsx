
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

interface BioSectionProps {
  formData: Partial<Tables<'profiles'>>;
  onFormChange: (field: string, value: string) => void;
}

const BioSection: React.FC<BioSectionProps> = ({ formData, onFormChange }) => {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
        {t('about') as string}
      </h3>
      <div>
        <Label htmlFor="bio-profileEdit" className="text-sm">{t('bio') as string}</Label>
        <Textarea
          id="bio-profileEdit"
          value={formData.bio || ''}
          onChange={(e) => onFormChange('bio', e.target.value)}
          placeholder={t('tellUsAboutYourself') as string}
          rows={4}
          className="mt-1 resize-none"
        />
      </div>
    </div>
  );
};

export default BioSection;
