import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationSI from './locales/si/translation.json';
import translationTA from './locales/ta/translation.json';

// Define resources
const resources = {
  en: {
    translation: translationEN
  },
  si: {
    translation: translationSI
  },
  ta: {
    translation: translationTA
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
