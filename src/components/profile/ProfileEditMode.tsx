
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  const services = getObjectKeys(t, 'servicesList');
  const budgetRanges = getObjectKeys(t, 'budgetRanges');
  const contactMethods = getObjectKeys(t, 'contactMethods');
  
  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          {t('personalInformation') as string}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="phone-profileEdit">{t('phone') as string}</Label>
            <Input
              id="phone-profileEdit"
              value={formData.phone || ''}
              onChange={(e) => onFormChange('phone', e.target.value)}
              placeholder={t('yourPhoneNumber') as string}
            />
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
        </div>
      </div>

      {/* Bio Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          {t('about') as string}
        </h3>
        <div>
          <Label htmlFor="bio-profileEdit">{t('bio') as string}</Label>
          <Textarea
            id="bio-profileEdit"
            value={formData.bio || ''}
            onChange={(e) => onFormChange('bio', e.target.value)}
            placeholder={t('tellUsAboutYourself') as string}
            rows={4}
          />
        </div>
      </div>

      {/* Farming Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          {t('farmingInformation') as string}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <Label htmlFor="farmLocation-profileEdit">{t('farmLocation') as string}</Label>
            <Input
              id="farmLocation-profileEdit"
              value={formData.farm_location || ''}
              onChange={(e) => onFormChange('farm_location', e.target.value)}
              placeholder={t('yourFarmLocation') as string}
            />
          </div>
        </div>
      </div>

      {/* Goals and Interests Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          {t('goalsAndInterests') as string}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="farmingGoals-profileEdit">{t('farmingGoals') as string}</Label>
            <Textarea
              id="farmingGoals-profileEdit"
              value={formData.farming_goals || ''}
              onChange={(e) => onFormChange('farming_goals', e.target.value)}
              placeholder={t('describeYourFarmingGoals') as string}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="interestedServices-profileEdit">{t('interestedServices') as string}</Label>
            <Select
              value={formData.interested_services || undefined}
              onValueChange={(value) => onFormChange('interested_services', value)}
            >
              <SelectTrigger id="interestedServices-profileEdit">
                <SelectValue placeholder={t('selectServices') as string} />
              </SelectTrigger>
              <SelectContent>
                {services.map((serviceKey) => (
                  <SelectItem key={serviceKey} value={serviceKey}>
                    {t(`servicesList.${serviceKey}`) as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="investmentBudget-profileEdit">{t('investmentBudget') as string}</Label>
            <Select
              value={formData.investment_budget || undefined}
              onValueChange={(value) => onFormChange('investment_budget', value)}
            >
              <SelectTrigger id="investmentBudget-profileEdit">
                <SelectValue placeholder={t('selectBudgetRange') as string} />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((budgetKey) => (
                  <SelectItem key={budgetKey} value={budgetKey}>
                    {t(`budgetRanges.${budgetKey}`) as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="languagesSpoken-profileEdit">{t('languagesSpoken') as string}</Label>
            <Input
              id="languagesSpoken-profileEdit"
              value={formData.languages_spoken || ''}
              onChange={(e) => onFormChange('languages_spoken', e.target.value)}
              placeholder={t('languagesYouSpeak') as string}
            />
          </div>
        </div>
      </div>

      {/* Contact and Social Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          {t('contactAndSocial') as string}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="website-profileEdit">{t('website') as string}</Label>
            <Input
              id="website-profileEdit"
              type="url"
              value={formData.website || ''}
              onChange={(e) => onFormChange('website', e.target.value)}
              placeholder={t('yourWebsite') as string}
            />
          </div>
          <div>
            <Label htmlFor="socialMedia-profileEdit">{t('socialMedia') as string}</Label>
            <Input
              id="socialMedia-profileEdit"
              value={formData.social_media || ''}
              onChange={(e) => onFormChange('social_media', e.target.value)}
              placeholder={t('socialMediaHandles') as string}
            />
          </div>
          <div>
            <Label htmlFor="preferredContact-profileEdit">{t('preferredContact') as string}</Label>
            <Select
              value={formData.preferred_contact_method || undefined}
              onValueChange={(value) => onFormChange('preferred_contact_method', value)}
            >
              <SelectTrigger id="preferredContact-profileEdit">
                <SelectValue placeholder={t('selectContactMethod') as string} />
              </SelectTrigger>
              <SelectContent>
                {contactMethods.map((methodKey) => (
                  <SelectItem key={methodKey} value={methodKey}>
                    {t(`contactMethods.${methodKey}`) as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditMode;
