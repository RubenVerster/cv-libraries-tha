import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions, ValidLocale } from "./config";

export const initI18next = async (locale: ValidLocale) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../i18n/locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(locale));

  return i18nInstance;
};

export async function useTranslation(
  locale: ValidLocale,
  ns: string | string[] = "common"
) {
  const i18nextInstance = await initI18next(locale);
  return {
    t: i18nextInstance.getFixedT(locale, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  };
}
