import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'es',

  localePrefix: 'as-needed'
});

export const config = {
  // Match all pathnames except API routes, static files, and admin routes
  matcher: [
    '/((?!api|_next|_vercel|admin|.*\\..*).*)'
  ]
};
