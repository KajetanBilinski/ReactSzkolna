import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translationArabic from './locales/sl.json';
import translationPolish from './locales/pl.json';
import translationJoor from './locales/joor.json';

const resources =
    {
        ar:
            {
                translation:translationArabic
            },
        pl:
            {
                translation:translationPolish
            },
        joor:
            {
                translation:translationJoor
            }
    };

i18n.use(initReactI18next).init(
    {
        resources,
        lng:"pl",
        interpolation:
            {
                escapeValue:false
            }
    });

export default i18n;