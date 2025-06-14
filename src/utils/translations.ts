import { enTranslations } from './translations/en';
import { swTranslations } from './translations/sw';

export type Language = 'en' | 'sw';

export const translations = {
  en: enTranslations,
  sw: swTranslations,
};

// Type for the structure of individual translation files (e.g., enTranslations)
// This is a simplified representation; a more precise type could be generated.
export type TranslationSet = Record<string, any>; // Added export

export const getTranslation = (
  language: Language,
  key: string,
  options?: { returnObjects?: boolean } // Option to return an object (for Select items)
): string | TranslationSet => {
  const langTranslations = translations[language];
  const keys = key.split('.');
  let value: any = langTranslations;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Key not found or path broken
      if (options?.returnObjects && keys.length === 1 && langTranslations[key] && typeof langTranslations[key] === 'object') {
        // If top-level key is requested as object (e.g., "countries")
        return langTranslations[key];
      }
      // Fallback for simple string keys or nested keys not found
      return key; 
    }
  }

  if (options?.returnObjects && typeof value === 'object') {
    return value;
  }

  if (typeof value === 'string') {
    return value;
  }
  
  // If the resolved value is an object but not requested as such, or if it's not a string
  // (e.g. a number or boolean, though our translations are strings or objects of strings)
  // then fallback to the original key.
  return key;
};
