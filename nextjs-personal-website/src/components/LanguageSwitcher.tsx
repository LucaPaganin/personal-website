"use client"

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { IoLanguage } from 'react-icons/io5';

interface LanguageSwitcherProps {
  locales: string[];
  currentLocale: string;
  getLocalizedPath: (locale: string) => string;
}

export default function LanguageSwitcher({ 
  locales, 
  currentLocale, 
  getLocalizedPath 
}: LanguageSwitcherProps) {
  const t = useTranslations('languageSelector');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown dropdown-end">
      <button 
        onClick={toggleDropdown}
        className="btn btn-ghost btn-circle"
        aria-label="Language selector"
      >
        <IoLanguage className="h-5 w-5" />
      </button>
      {isOpen && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
          {locales.map((locale) => (
            <li key={locale}>
              <Link 
                href={getLocalizedPath(locale)}
                className={currentLocale === locale ? 'active' : ''}
                onClick={() => setIsOpen(false)}
              >
                {t(locale)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
