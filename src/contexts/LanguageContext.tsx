
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, getTranslation, TranslationSet } from '@/utils/translations'; // Import TranslationSet

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { returnObjects?: boolean }) => string | TranslationSet; // Updated signature
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('bwana-shamba-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('bwana-shamba-language', language);
  }, [language]);

  const t = (key: string, options?: { returnObjects?: boolean }): string | TranslationSet => { // Updated implementation
    return getTranslation(language, key, options);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Export TranslationSet if it's to be used by other components directly importing from here
// However, it's already exported from '@/utils/translations'
export type { TranslationSet };
