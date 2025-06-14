
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
import SingleSelectDropdown from '../SingleSelectDropdown';
import { countries } from '@/utils/locationData';

interface PersonalInformationSectionProps {
  formData: Partial<Tables<'profiles'>>;
  onFormChange: (field: string, value: string) => void;
  userEmail?: string | null;
}

const PersonalInformationSection: React.FC<PersonalInformationSectionProps> = ({
  formData,
  onFormChange,
  userEmail
}) => {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
        {t('personalInformation') as string}
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName-profileEdit" className="text-sm">{t('fullName') as string}</Label>
            <Input
              id="fullName-profileEdit"
              value={formData.full_name || ''}
              onChange={(e) => onFormChange('full_name', e.target.value)}
              placeholder={t('yourFullName') as string}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email-profileEdit" className="text-sm">{t('email') as string}</Label>
            <Input 
              id="email-profileEdit" 
              type="email" 
              value={userEmail || ''} 
              disabled 
              className="bg-gray-100 mt-1" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone-profileEdit" className="text-sm">{t('phone') as string}</Label>
            <Input
              id="phone-profileEdit"
              value={formData.phone || ''}
              onChange={(e) => onFormChange('phone', e.target.value)}
              placeholder={t('yourPhoneNumber') as string}
              className="mt-1"
            />
          </div>
          <SingleSelectDropdown
            id="citizenship-profileEdit"
            label={t('citizenship') as string}
            value={formData.citizenship || null}
            onChange={(value) => onFormChange('citizenship', value)}
            options={countries}
            placeholder={t('selectCitizenship') as string}
            translationPrefix="countries"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nidaNumber-profileEdit" className="text-sm">{t('nidaNumber') as string}</Label>
            <Input
              id="nidaNumber-profileEdit"
              value={formData.nida_number || ''}
              onChange={(e) => onFormChange('nida_number', e.target.value)}
              placeholder={t('yourNidaNumber') as string}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="passportNumber-profileEdit" className="text-sm">{t('passportNumber') as string}</Label>
            <Input
              id="passportNumber-profileEdit"
              value={formData.passport_number || ''}
              onChange={(e) => onFormChange('passport_number', e.target.value)}
              placeholder={t('yourPassportNumber') as string}
              className="mt-1"
            />
          </div>
        </div>
        <SingleSelectDropdown
          id="country-profileEdit"
          label={t('country') as string}
          value={formData.country || null}
          onChange={(value) => onFormChange('country', value)}
          options={countries}
          placeholder={t('selectCountry') as string}
          translationPrefix="countries"
        />
      </div>
    </div>
  );
};

export default PersonalInformationSection;
