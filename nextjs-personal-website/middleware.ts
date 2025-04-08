import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // Always prefix the locale in URLs
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for:
  // - api routes
  // - _next (Next.js internals)
  // - all files in the public folder
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)']
};
