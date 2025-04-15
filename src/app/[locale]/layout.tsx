// Global CSS is imported in the root layout
import { ValidLocale, locales } from "@/i18n/config";
import TranslationProvider from "@/components/TranslationProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: ValidLocale };
}) {
  // Extract children and locale to avoid direct property access
  const { children } = props;
  const locale = props.params.locale;

  return (
    <TranslationProvider locale={locale}>
      <div className="locale-content">
        <header className="site-header">
          <div className="container">
            <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <div className="logo-container">
              <Image
                src="/logo.svg"
                alt="CV-Library"
                className="logo"
                width={250}
                height={100}
              />
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} CV-Library</p>
          </div>
        </footer>
      </div>
    </TranslationProvider>
  );
}
