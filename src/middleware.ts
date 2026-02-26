import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";

function getLocale(request: NextRequest): string | undefined {
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Exclude static files, API paths, and Payload admin (assuming /admin)
    // and /next, /favicon.ico, etc.
    if (
        pathname.startsWith("/api") || 
        pathname.startsWith("/admin") || 
        pathname.startsWith("/_next") || 
        pathname.includes(".") // files like logo.png
    ) {
        return;
    }

    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|admin).*)"],
};
