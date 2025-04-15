import { useState, useEffect } from "react";
import { initI18next } from "@/i18n/client";
import { ValidLocale } from "@/i18n/config";
import type { i18n, TFunction } from "i18next";

interface TranslationState {
  t: TFunction | ((key: string) => string);
  i18n: i18n | null;
  isLoading: boolean;
  error: Error | null;
}

export function useI18n(
  locale: ValidLocale,
  namespaces: string[] = ["common"]
) {
  const [state, setState] = useState<TranslationState>({
    t: (key: string) => key,
    i18n: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const loadTranslations = async () => {
      try {
        const i18nInstance = await initI18next(locale);
        if (mounted) {
          setState({
            t: i18nInstance.getFixedT(locale, namespaces),
            i18n: i18nInstance,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (mounted) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: error as Error,
          }));
        }
      }
    };

    setState((prev) => ({ ...prev, isLoading: true }));
    loadTranslations();

    return () => {
      mounted = false;
    };
  }, [locale, ...namespaces]);

  return state;
}
