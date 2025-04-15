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

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  // Use the locale from params or default to 'en'
  const locale = params?.locale || defaultLocale;

  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
