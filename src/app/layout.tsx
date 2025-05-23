import type { Metadata } from 'next';
import './globals.css';
import { locales } from '../i18n';
import { Providers } from './providers';
import localFont from 'next/font/local';

const athelas = localFont({
  src: [
    {
      path: '../../public/fonts/athelas/athelas-regular.ttf',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../public/fonts/athelas/athelas-bold.ttf',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../../public/fonts/athelas/athelas-italic.ttf',
      style: 'italic',
      weight: '500',
    },
    {
      path: '../../public/fonts/athelas/athelas-bold-italic.ttf',
      style: 'italic',
      weight: '700',
    },
  ],
  variable: '--font-athelas',
  adjustFontFallback: 'Times New Roman',
  // Note: If you want to adjust font size, use CSS instead of this removed property
});


export const metadata: Metadata = {
  title: 'Luca Paganin - Personal Website',
  description: 'Personal website of Luca Paganin, showcasing projects, experiences, and more',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${athelas.variable} min-h-screen flex flex-col bg-base-100 text-base-content text-lg`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
