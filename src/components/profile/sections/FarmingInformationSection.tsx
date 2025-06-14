
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, TranslationSet } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
import SingleSelectDropdown from '../SingleSelectDropdown';
import { regionsByCountry } from '@/utils/locationData';

interface FarmingInformationSectionProps {
  formData: Partial<Tables<'profiles'>>;
  onFormChange: (field: string, value: string) => void;
}

const getObjectKeys = (translateFn: (key: string, options?: { returnObjects?: boolean }) => string | TranslationSet, path: string) => {
  const obj = translateFn(path, { returnObjects: true });
  return typeof obj === 'object' && obj !== null ? Object.keys(obj) : [];
};

const FarmingInformationSection: React.FC<FarmingInformationSectionProps> = ({
  formData,
  onFormChange
}) => {
  const { t } = useLanguage();

  const crops = getObjectKeys(t, 'cropsList');
  const experienceLevels = getObjectKeys(t, 'experienceLevels');
  const farmSizes = getObjectKeys(t, 'farmSizes');

  // Get regions based on selected country
  const selectedCountryRegions = formData.country ? regionsByCountry[formData.country] || [] : [];

  return (
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
          {selectedCountryRegions.length > 0 ? (
            <SingleSelectDropdown
              id="farmLocation-profileEdit"
              label={t('farmLocation') as string}
              value={formData.farm_location || null}
              onChange={(value) => onFormChange('farm_location', value)}
              options={selectedCountryRegions}
              placeholder={t('selectRegion') as string}
            />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmingInformationSection;
