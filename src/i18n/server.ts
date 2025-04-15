import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions, ValidLocale } from "./config";
import fs from "fs";
import path from "path";

const initI18next = async (locale: ValidLocale, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        try {
          const filePath = path.join(
            process.cwd(),
            "src",
            "i18n",
            "locales",
            language,
            `${namespace}.json`
          );
          const content = fs.readFileSync(filePath, "utf8");
          return JSON.parse(content);
        } catch (error) {
          console.error(`Error loading locale file: ${error}`);
          return {};
        }
      })
    )
    .init({
      ...getOptions(locale),
      ns: Array.isArray(ns) ? ns : [ns],
    });

  return i18nInstance;
};

export async function getTranslation(
  locale: ValidLocale,
  ns: string | string[] = "common"
) {
  const i18nextInstance = await initI18next(locale, ns);
  return {
    t: i18nextInstance.getFixedT(locale, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  };
}
