import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "@/i18n/config";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV-Library",
  description: "Find jobs by location or industry",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}) {
  // Use the locale from params or default to 'en'
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || defaultLocale;

  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
