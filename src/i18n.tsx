import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from 'i18next-browser-languagedetector'
import translationSV from './locales/sv/translation.json'
import translationEN from './locales/en/translation.json'

const resources = {
  en: {
    translation: translationEN
  },
  sv: {
    translation: translationSV
  }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
        escapeValue: false // react already safes from xss
        }
    });

export default i18n;