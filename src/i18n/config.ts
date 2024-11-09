import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import common from "./en_us/common.json";
import common_zh_tw from "./zh_tw/common.json";


i18next.use(initReactI18next).init({
  debug: false,
  fallbackLng: "en_us",
  ns: [
    "common",
  ],
  resources: {
    en_us: {
      common,
    },
    zh_tw: {
      common: common_zh_tw,
    },
  },
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
