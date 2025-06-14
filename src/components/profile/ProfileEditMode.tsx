
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, TranslationSet } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

interface ProfileEditModeProps {
  formData: Partial<Tables<'profiles'>>;
  onFormChange: (field: keyof Omit<Tables<'profiles'>, 'id' | 'created_at' | 'updated_at'>, value: string) => void;
  userEmail?: string | null;
}

const getObjectKeys = (translateFn: (key: string, options?: { returnObjects?: boolean }) => string | TranslationSet, path: string) => {
    const obj = translateFn(path, { returnObjects: true });
    return typeof obj === 'object' && obj !== null ? Object.keys(obj) : [];
};

const ProfileEditMode: React.FC<ProfileEditModeProps> = ({ formData, onFormChange, userEmail }) => {
  const { t } = useLanguage();

  const countries = getObjectKeys(t, 'countries');
  const crops = getObjectKeys(t, 'cropsList');
  const experienceLevels = getObjectKeys(t, 'experienceLevels');
  const farmSizes = getObjectKeys(t, 'farmSizes');
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName-profileEdit">{t('fullName') as string}</Label>
        <Input
          id="fullName-profileEdit"
          value={formData.full_name || ''}
          onChange={(e) => onFormChange('full_name', e.target.value)}
          placeholder={t('yourFullName') as string}
        />
      </div>
      <div>
        <Label htmlFor="email-profileEdit">{t('email') as string}</Label>
        <Input id="email-profileEdit" type="email" value={userEmail || ''} disabled className="bg-gray-100" />
      </div>
      <div>
        <Label htmlFor="country-profileEdit">{t('country') as string}</Label>
        <Select
          value={formData.country || undefined}
          onValueChange={(value) => onFormChange('country', value)}
        >
          <SelectTrigger id="country-profileEdit">
            <SelectValue placeholder={t('selectCountry') as string} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((cKey) => (
              <SelectItem key={cKey} value={cKey}>
                {t(`countries.${cKey}`) as string}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="phone-profileEdit">{t('phone') as string}</Label>
        <Input
          id="phone-profileEdit"
          value={formData.phone || ''}
          onChange={(e) => onFormChange('phone', e.target.value)}
          placeholder={t('yourPhoneNumber') as string}
        />
      </div>
      <div>
        <Label htmlFor="preferredCrop-profileEdit">{t('preferredCrop') as string}</Label>
        <Select
          value={formData.preferred_crop || undefined}
          onValueChange={(value) => onFormChange('preferred_crop', value)}
        >
          <SelectTrigger id="preferredCrop-profileEdit">
            <SelectValue placeholder={t('selectCrop') as string} />
          </SelectTrigger>
          <SelectContent>
            {crops.map((cropKey) => (
              <SelectItem key={cropKey} value={cropKey}>
                {t(`cropsList.${cropKey}`) as string}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="farmSize-profileEdit">{t('farmSize') as string}</Label>
        <Select
          value={formData.farm_size || undefined}
          onValueChange={(value) => onFormChange('farm_size', value)}
        >
          <SelectTrigger id="farmSize-profileEdit">
            <SelectValue placeholder={t('selectSize') as string} />
          </SelectTrigger>
          <SelectContent>
            {farmSizes.map((sizeKey) => (
              <SelectItem key={sizeKey} value={sizeKey}>
                {t(`farmSizes.${sizeKey}`) as string}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="farmingExperience-profileEdit">{t('farmingExperience') as string}</Label>
        <Select
          value={formData.farming_experience || undefined}
          onValueChange={(value) => onFormChange('farming_experience', value)}
        >
          <SelectTrigger id="farmingExperience-profileEdit">
            <SelectValue placeholder={t('selectExperience') as string} />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((levelKey) => (
              <SelectItem key={levelKey} value={levelKey}>
                {t(`experienceLevels.${levelKey}`) as string}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default ProfileEditMode;
