import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
      resources: {
        en: {
          translation: {
            welcome: "KNOW IT ALL!",
            subtitle: "Test Your Knowledge and Become the Ultimate Know-It-All!",
            play_now: "PLAY NOW!",
            know_it_all: "Know It All",
            login : "Login",
            register: "Register",
            test: "test!!!!"
          }
        },
        ru: {
          translation: {
            welcome: "ЗНАЙ BCË!",
            subtitle: "Проверьте свои знания и станьте настоящим знатоком!",
            play_now: "ИГРАТЬ СЕЙЧАС!",
            know_it_all: "Знай Всё",
            login : "Войти",
            register: "Регистрация",
          }
        },
      }
    }

  );

export default i18n;