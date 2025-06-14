
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, TranslationSet } from '@/contexts/LanguageContext';

const getObjectKeysHelper = (translateFn: (key: string, options?: { returnObjects?: boolean }) => string | TranslationSet, path: string) => {
    const obj = translateFn(path, { returnObjects: true });
    return typeof obj === 'object' && obj !== null ? Object.keys(obj) : [];
};

export interface SignupFieldsData {
  fullName: string;
  country?: string;
  phone: string;
  preferredCrop?: string;
  farmSize?: string;
  farmingExperience?: string;
}

interface SignupFormFieldsProps {
  formData: SignupFieldsData;
  onFieldChange: (field: keyof SignupFieldsData, value: string) => void;
}

const SignupFormFields: React.FC<SignupFormFieldsProps> = ({ formData, onFieldChange }) => {
  const { t } = useLanguage();

  const countries = getObjectKeysHelper(t, 'countries');
  const crops = getObjectKeysHelper(t, 'cropsList');
  const experienceLevels = getObjectKeysHelper(t, 'experienceLevels');
  const farmSizes = getObjectKeysHelper(t, 'farmSizes');

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="fullName-signup">{t('fullName') as string}</Label>
        <Input id="fullName-signup" placeholder={t('yourFullName') as string} value={formData.fullName} onChange={(e) => onFieldChange('fullName', e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country-signup">{t('country') as string}</Label>
        <Select value={formData.country} onValueChange={(value) => onFieldChange('country', value)}>
          <SelectTrigger id="country-signup">
            <SelectValue placeholder={t('selectCountry') as string} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((cKey) => (
              <SelectItem key={cKey} value={cKey}>{t(`countries.${cKey}`) as string}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone-signup">{t('phone') as string}</Label>
        <Input id="phone-signup" placeholder={t('yourPhoneNumber') as string} value={formData.phone} onChange={(e) => onFieldChange('phone', e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredCrop-signup">{t('preferredCrop') as string}</Label>
        <Select value={formData.preferredCrop} onValueChange={(value) => onFieldChange('preferredCrop', value)}>
          <SelectTrigger id="preferredCrop-signup">
            <SelectValue placeholder={t('selectCrop') as string} />
          </SelectTrigger>
          <SelectContent>
            {crops.map((cropKey) => (
              <SelectItem key={cropKey} value={cropKey}>{t(`cropsList.${cropKey}`) as string}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="farmSize-signup">{t('farmSize') as string}</Label>
        <Select value={formData.farmSize} onValueChange={(value) => onFieldChange('farmSize', value)}>
          <SelectTrigger id="farmSize-signup">
            <SelectValue placeholder={t('selectSize') as string} />
          </SelectTrigger>
          <SelectContent>
            {farmSizes.map((sizeKey) => (
              <SelectItem key={sizeKey} value={sizeKey}>{t(`farmSizes.${sizeKey}`) as string}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="farmingExperience-signup">{t('farmingExperience') as string}</Label>
        <Select value={formData.farmingExperience} onValueChange={(value) => onFieldChange('farmingExperience', value)}>
          <SelectTrigger id="farmingExperience-signup">
            <SelectValue placeholder={t('selectExperience') as string} />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((levelKey) => (
              <SelectItem key={levelKey} value={levelKey}>{t(`experienceLevels.${levelKey}`) as string}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SignupFormFields;
