import { InitOptions } from 'i18next';

export const defaultLocale = 'en';
export const locales = ['en', 'de'] as const;
export type ValidLocale = (typeof locales)[number];

export const getOptions = (locale: ValidLocale = defaultLocale): InitOptions => ({
  supportedLngs: locales,
  fallbackLng: defaultLocale,
  lng: locale,
  ns: ['common', 'jobs'],
  defaultNS: 'common',
});
