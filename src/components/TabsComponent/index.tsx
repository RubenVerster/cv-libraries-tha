"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { ValidLocale } from "@/i18n/config";
import styles from "./TabsComponent.module.scss";

interface TabsComponentProps {
  activeTab: "location" | "industry";
  onTabChange: (tab: "location" | "industry") => void;
  locale: ValidLocale;
  categoryList: string[];
}

export default function TabsComponent({
  activeTab,
  onTabChange,
  locale,
  categoryList,
}: TabsComponentProps) {
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n(locale);

  useEffect(() => {
    // Only run on client-side
    setMounted(true);
  }, []);

  // During SSR or before hydration, render a placeholder
  if (!mounted) {
    return <div className={styles.tabsPlaceholder} />;
  }

  return (
    <>
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${
            activeTab === "location" ? styles.active : styles.inactive
          }`}
          onClick={() => onTabChange("location")}
        >
          {t("jobs:tabs.location")}
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "industry" ? styles.active : styles.inactive
          }`}
          onClick={() => onTabChange("industry")}
        >
          {t("jobs:tabs.industry")}
        </button>
      </div>

      <div className={styles.categoriesSection}>
        <div className={styles.categoriesContainer}>
          {categoryList.map((category: string) => (
            <a
              key={category}
              target="_blank"
              href="https://rubenverster.github.io/flip-the-coin/"
              className={styles.categoryLink}
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
