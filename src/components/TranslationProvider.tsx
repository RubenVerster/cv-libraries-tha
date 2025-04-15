"use client";

import { ReactNode, useEffect, useState } from "react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions, ValidLocale } from "@/i18n/config";

interface TranslationProviderProps {
  children: ReactNode;
  locale: ValidLocale;
}

// Create a client-side only instance of i18next
const i18nInstance = i18next.createInstance();

export default function TranslationProvider({
  children,
  locale,
}: TranslationProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize i18next only on the client side
    if (!mounted) {
      i18nInstance
        .use(initReactI18next)
        .use(
          resourcesToBackend(
            (language: string, namespace: string) =>
              import(`../../public/locales/${language}/${namespace}.json`)
          )
        )
        .init({
          ...getOptions(locale),
          lng: locale,
        })
        .then(() => {
          setMounted(true);
        });
    }
  }, [locale, mounted]);

  // During SSR or before hydration, render children without i18n provider
  if (!mounted) {
    return <>{children}</>;
  }

  // After hydration, render with i18n provider
  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
