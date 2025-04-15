import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/config";

function getLocale(request: NextRequest): string {
  // Check if the Accept-Language header exists
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    // Parse the Accept-Language header
    const userLocales = acceptLanguage
      .split(",")
      .map((locale) => locale.split(";")[0].trim());

    // Find the first locale that matches our supported locales
    const matchedLocale = userLocales.find((locale) =>
      locales.includes(locale.substring(0, 2) as any)
    );

    if (matchedLocale) {
      return matchedLocale.substring(0, 2);
    }
  }

  // Default to the default locale if no match is found
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
