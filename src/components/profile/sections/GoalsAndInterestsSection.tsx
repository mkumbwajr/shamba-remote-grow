
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, TranslationSet } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
import MultiSelectDropdown from '../MultiSelectDropdown';
import { languages } from '@/utils/locationData';

interface GoalsAndInterestsSectionProps {
  formData: Partial<Tables<'profiles'>>;
  onFormChange: (field: string, value: string) => void;
}

const getObjectKeys = (translateFn: (key: string, options?: { returnObjects?: boolean }) => string | TranslationSet, path: string) => {
  const obj = translateFn(path, { returnObjects: true });
  return typeof obj === 'object' && obj !== null ? Object.keys(obj) : [];
};

const GoalsAndInterestsSection: React.FC<GoalsAndInterestsSectionProps> = ({
  formData,
  onFormChange
}) => {
  const { t } = useLanguage();

  const services = getObjectKeys(t, 'servicesList');
  const budgetRanges = getObjectKeys(t, 'budgetRanges');

  return (
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
        <MultiSelectDropdown
          id="languagesSpoken-profileEdit"
          label={t('languagesSpoken') as string}
          value={formData.languages_spoken || null}
          onChange={(value) => onFormChange('languages_spoken', value)}
          options={languages}
          placeholder={t('selectLanguages') as string}
        />
      </div>
    </div>
  );
};

export default GoalsAndInterestsSection;
