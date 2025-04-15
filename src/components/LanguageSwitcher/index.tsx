"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, ValidLocale } from "@/i18n/config";
import styles from "./LanguageSwitcher.module.scss";

interface LanguageSwitcherProps {
  currentLocale: ValidLocale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";

    const segments = pathName.split("/");
    segments[1] = locale;

    return segments.join("/");
  };

  return (
    <div className={styles.languageSwitcher}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={redirectedPathName(locale)}
          className={`${styles.localeLink} ${
            currentLocale === locale ? styles.active : ""
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
