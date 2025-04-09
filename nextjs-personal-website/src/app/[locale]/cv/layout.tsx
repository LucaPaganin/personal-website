"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from '@/navigation';

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('cv');
  const pathname = usePathname();

  // CV section links
  const cvSections = [
    { name: 'experiences', path: 'experiences', icon: '💼' },
    { name: 'education', path: 'education', icon: '🎓' },
    { name: 'techStack', path: 'tech-stack', icon: '💻' },
    { name: 'publications', path: 'publications', icon: '📄' },
    { name: 'certifications', path: 'certifications', icon: '🏆' },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">
        {t('title')}
      </h1>
      
      {/* Main content */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
