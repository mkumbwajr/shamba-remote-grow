
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, TranslationSet } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

interface ContactAndSocialSectionProps {
  formData: Partial<Tables<'profiles'>>;
  onFormChange: (field: string, value: string) => void;
}

const getObjectKeys = (translateFn: (key: string, options?: { returnObjects?: boolean }) => string | TranslationSet, path: string) => {
  const obj = translateFn(path, { returnObjects: true });
  return typeof obj === 'object' && obj !== null ? Object.keys(obj) : [];
};

const ContactAndSocialSection: React.FC<ContactAndSocialSectionProps> = ({
  formData,
  onFormChange
}) => {
  const { t } = useLanguage();

  const contactMethods = getObjectKeys(t, 'contactMethods');

  return (
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
  );
};

export default ContactAndSocialSection;
