import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define the list of supported locales
export const locales = ['en', 'it'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  console.log('locale', locale);
  console.log('locales', locales);
  
  // If locale is undefined, use the default locale instead of immediately showing a 404
  if (!locale) {
    console.log('Using default locale because locale is undefined');
    locale = defaultLocale;
  } else if (!locales.includes(locale as string)) {
    console.log('Locale not supported:', locale);
    notFound();
  }

  return {
    locale: locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
