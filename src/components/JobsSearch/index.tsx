"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ValidLocale } from "@/i18n/config";
import { useI18n } from "@/hooks/useI18n";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import TabsComponent from "@/components/TabsComponent";
import styles from "./JobsSearch.module.scss";

interface JobsSearchProps {
  locale: ValidLocale;
  initialView: "location" | "industry";
}

export default function JobsSearch({ locale, initialView }: JobsSearchProps) {
  const [activeTab, setActiveTab] = useState<"location" | "industry">(
    initialView
  );
  const [location, setLocation] = useState("");
  const router = useRouter();
  const { t, isLoading, error, i18n } = useI18n(locale, ["common", "jobs"]);

  const handleTabChange = (tab: "location" | "industry") => {
    setActiveTab(tab);
    router.push(`/${locale}/jobs?view=${tab}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log("Searching with:", { activeTab, location });
  };

  // Show loading state while translations are being loaded
  if (isLoading || !i18n) {
    return (
      <div className={styles.loading}>
        <div className={styles.searchContainer}>
          <div className="container">
            <form className={styles.searchForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Loading...</label>
                  <div className={styles.placeholder} />
                </div>
                <div className={styles.formGroup}>
                  <label>Loading...</label>
                  <div className={styles.placeholder} />
                </div>
                <div className={styles.distanceGroup}>
                  <label>Loading...</label>
                  <div className={styles.placeholder} />
                </div>
                <button type="button" className={styles.searchButton} disabled>
                  Loading...
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Failed to load translations. Please try refreshing the page.</p>
      </div>
    );
  }

  // Get categories object safely
  const categoriesObj = (i18n.getFixedT(locale, "jobs")("categories", {
    returnObjects: true,
  }) as { industry: string[]; location: string[] }) || {
    industry: [],
    location: [],
  };

  const categoryList = Array.isArray(categoriesObj[activeTab])
    ? categoriesObj[activeTab]
    : [];

  return (
    <div>
      <div className={styles.searchContainer}>
        <div className="container">
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>{t("jobs:keywords.label")}</label>
                <input
                  type="text"
                  placeholder={t("jobs:keywords.placeholder")}
                />
              </div>
              <div className={styles.formGroup}>
                <label>{t("jobs:location.label")}</label>
                <LocationAutocomplete
                  value={location}
                  onChange={setLocation}
                  onSelect={(selectedLocation) =>
                    setLocation(selectedLocation.label)
                  }
                  placeholder={t("jobs:location.placeholder")}
                />
              </div>
              <div className={styles.distanceGroup}>
                <label>{t("jobs:distance.label")}</label>
                <select>
                  <option>{t("jobs:distance.options.5")}</option>
                  <option>{t("jobs:distance.options.10")}</option>
                  <option>{t("jobs:distance.options.15")}</option>
                  <option>{t("jobs:distance.options.20")}</option>
                  <option>{t("jobs:distance.options.30")}</option>
                </select>
              </div>
              <button type="submit" className={styles.searchButton}>
                {t("jobs:search.button")}
              </button>
            </div>
          </form>
        </div>
      </div>

      <TabsComponent
        activeTab={activeTab}
        onTabChange={handleTabChange}
        locale={locale}
        categoryList={categoryList}
      />
    </div>
  );
}
