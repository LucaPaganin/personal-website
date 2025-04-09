"use client";

import { useTranslations } from 'next-intl';

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('cv');

  return (
    <div>      
      {/* Main content */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
