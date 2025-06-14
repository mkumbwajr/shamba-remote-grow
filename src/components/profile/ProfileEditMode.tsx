
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, TranslationSet } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

// Extended type to include missing fields
type ExtendedProfile = Tables<'profiles'> & {
  citizenship?: string | null;
  nida_number?: string | null;
  passport_number?: string | null;
};

interface ProfileEditModeProps {
  formData: Partial<ExtendedProfile>;
  onFormChange: (field: string, value: string) => void;
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
    <div className="space-y-4 sm:space-y-6">
      {/* Personal Information Section */}
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
            <div>
              <Label htmlFor="citizenship-profileEdit" className="text-sm">{t('citizenship') as string}</Label>
              <Input
                id="citizenship-profileEdit"
                value={formData.citizenship || ''}
                onChange={(e) => onFormChange('citizenship', e.target.value)}
                placeholder={t('yourCitizenship') as string}
                className="mt-1"
              />
            </div>
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
          <div>
            <Label htmlFor="country-profileEdit" className="text-sm">{t('country') as string}</Label>
            <Select
              value={formData.country || undefined}
              onValueChange={(value) => onFormChange('country', value)}
            >
              <SelectTrigger id="country-profileEdit" className="mt-1">
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

      {/* Farming Information Section */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          {t('farmingInformation') as string}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredCrop-profileEdit" className="text-sm">{t('preferredCrop') as string}</Label>
              <Select
                value={formData.preferred_crop || undefined}
                onValueChange={(value) => onFormChange('preferred_crop', value)}
              >
                <SelectTrigger id="preferredCrop-profileEdit" className="mt-1">
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
              <Label htmlFor="farmSize-profileEdit" className="text-sm">{t('farmSize') as string}</Label>
              <Select
                value={formData.farm_size || undefined}
                onValueChange={(value) => onFormChange('farm_size', value)}
              >
                <SelectTrigger id="farmSize-profileEdit" className="mt-1">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="farmingExperience-profileEdit" className="text-sm">{t('farmingExperience') as string}</Label>
              <Select
                value={formData.farming_experience || undefined}
                onValueChange={(value) => onFormChange('farming_experience', value)}
              >
                <SelectTrigger id="farmingExperience-profileEdit" className="mt-1">
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
              <Label htmlFor="farmLocation-profileEdit" className="text-sm">{t('farmLocation') as string}</Label>
              <Input
                id="farmLocation-profileEdit"
                value={formData.farm_location || ''}
                onChange={(e) => onFormChange('farm_location', e.target.value)}
                placeholder={t('yourFarmLocation') as string}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Goals and Interests Section */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          {t('goalsAndInterests') as string}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="farmingGoals-profileEdit" className="text-sm">{t('farmingGoals') as string}</Label>
            <Textarea
              id="farmingGoals-profileEdit"
              value={formData.farming_goals || ''}
              onChange={(e) => onFormChange('farming_goals', e.target.value)}
              placeholder={t('describeYourFarmingGoals') as string}
              rows={3}
              className="mt-1 resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="interestedServices-profileEdit" className="text-sm">{t('interestedServices') as string}</Label>
              <Select
                value={formData.interested_services || undefined}
                onValueChange={(value) => onFormChange('interested_services', value)}
              >
                <SelectTrigger id="interestedServices-profileEdit" className="mt-1">
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
              <Label htmlFor="investmentBudget-profileEdit" className="text-sm">{t('investmentBudget') as string}</Label>
              <Select
                value={formData.investment_budget || undefined}
                onValueChange={(value) => onFormChange('investment_budget', value)}
              >
                <SelectTrigger id="investmentBudget-profileEdit" className="mt-1">
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
          </div>
          <div>
            <Label htmlFor="languagesSpoken-profileEdit" className="text-sm">{t('languagesSpoken') as string}</Label>
            <Input
              id="languagesSpoken-profileEdit"
              value={formData.languages_spoken || ''}
              onChange={(e) => onFormChange('languages_spoken', e.target.value)}
              placeholder={t('languagesYouSpeak') as string}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Contact and Social Section */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          {t('contactAndSocial') as string}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website-profileEdit" className="text-sm">{t('website') as string}</Label>
              <Input
                id="website-profileEdit"
                type="url"
                value={formData.website || ''}
                onChange={(e) => onFormChange('website', e.target.value)}
                placeholder={t('yourWebsite') as string}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="socialMedia-profileEdit" className="text-sm">{t('socialMedia') as string}</Label>
              <Input
                id="socialMedia-profileEdit"
                value={formData.social_media || ''}
                onChange={(e) => onFormChange('social_media', e.target.value)}
                placeholder={t('socialMediaHandles') as string}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="preferredContact-profileEdit" className="text-sm">{t('preferredContact') as string}</Label>
            <Select
              value={formData.preferred_contact_method || undefined}
              onValueChange={(value) => onFormChange('preferred_contact_method', value)}
            >
              <SelectTrigger id="preferredContact-profileEdit" className="mt-1">
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
