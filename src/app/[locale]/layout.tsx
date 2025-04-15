// Global CSS is imported in the root layout
import { ValidLocale, locales } from "@/i18n/config";
import TranslationProvider from "@/components/TranslationProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/LogoComponent/Logo";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: ValidLocale }>;
}) {
  // Extract locale to avoid direct property access
  const { locale } = await params;

  return (
    <TranslationProvider locale={locale}>
      <div className="locale-content">
        <header className="site-header">
          <div className="container">
            <div className="language-switcher-container">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <Logo />
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
