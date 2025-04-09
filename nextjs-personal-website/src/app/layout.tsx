import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { locales } from '../i18n';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" data-theme="light" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-base-100 text-base-content`}>{children}</body>
    </html>
  );
}
