
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import enLang from 'Assets/i18n/en.json';
import hnLang from 'Assets/i18n/hn.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enLang
      },
      hn: {
         translation: hnLang
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
    // react: {
    //   wait: true,
    // }
  });

export default i18n;
