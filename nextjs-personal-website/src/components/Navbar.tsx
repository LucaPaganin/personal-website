"use client"

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useState, useEffect } from 'react';
import { locales } from '@/i18n';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  // Safe access to translations with fallback
  const safeT = (key: string, defaultValue: string = '') => {
    try {
      return t(key);
    } catch (error) {
      return defaultValue;
    }
  };
    // Wrap hooks in try-catch for safer client-side rendering
  let t: (key: string) => string;
  let locale: string;
  try {
    t = useTranslations('navigation');
    locale = useLocale();
  } catch (error) {
    // Default fallback if hooks fail
    t = (key: string): string => key;
    locale = 'en';
  }

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Client-side only code
  useEffect(() => {
    setMounted(true);
  }, []);

  // Gets the path without the locale prefix
  const getPathWithoutLocale = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    return pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '/';
  };

  // Gets the current path with a different locale
  const getLocalizedPath = (newLocale: string) => {
    const currentPath = getPathWithoutLocale();
    return `/${newLocale}${currentPath}`;
  };
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Only render UI elements after client-side hydration is complete
  if (!mounted) {
    return <nav className="bg-base-200 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">Luca Paganin</span>
          </div>
        </div>
      </div>
    </nav>;
  }

  return (
    <nav className="bg-base-200 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="text-xl font-bold">
              Luca Paganin
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={`/${locale}`}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === `/${locale}` ? 'bg-primary text-white' : 'hover:bg-base-300'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === `/${locale}/about` ? 'bg-primary text-white' : 'hover:bg-base-300'
              }`}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === `/${locale}/projects` ? 'bg-primary text-white' : 'hover:bg-base-300'
              }`}
            >
              {t('projects')}
            </Link>
            
            {/* CV Dropdown */}
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                pathname.includes(`/${locale}/cv`) ? 'bg-primary text-white' : 'hover:bg-base-300'
              }`}>
                {t('cv')}
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link href={`/${locale}/cv/experiences`} onClick={closeMenu}>
                    {t('experiences')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/cv/education`} onClick={closeMenu}>
                    {t('education')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/cv/tech-stack`} onClick={closeMenu}>
                    {t('techStack')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/cv/publications`} onClick={closeMenu}>
                    {t('publications')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/cv/certifications`} onClick={closeMenu}>
                    {t('certifications')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>          {/* Right side - Language Switcher and Theme Switcher */}
          <div className="flex items-center space-x-2">
            <ThemeSwitcher />
            <LanguageSwitcher 
              locales={locales} 
              currentLocale={locale} 
              getLocalizedPath={getLocalizedPath} 
            />
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md hover:bg-base-300 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href={`/${locale}`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${locale}` ? 'bg-primary text-white' : 'hover:bg-base-300'
              }`}
              onClick={closeMenu}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${locale}/about` ? 'bg-primary text-white' : 'hover:bg-base-300'
              }`}
              onClick={closeMenu}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${locale}/projects` ? 'bg-primary text-white' : 'hover:bg-base-300'
              }`}
              onClick={closeMenu}
            >
              {t('projects')}
            </Link>
            
            {/* CV Section Title */}
            <div className="px-3 py-2 text-base font-medium border-t border-base-300 mt-2 pt-2">
              {t('cv')}
            </div>
            
            {/* CV Subsections */}
            <Link
              href={`/${locale}/cv/experiences`}
              className="block px-3 py-2 pl-6 rounded-md text-sm font-medium hover:bg-base-300"
              onClick={closeMenu}
            >
              {t('experiences')}
            </Link>
            <Link
              href={`/${locale}/cv/education`}
              className="block px-3 py-2 pl-6 rounded-md text-sm font-medium hover:bg-base-300"
              onClick={closeMenu}
            >
              {t('education')}
            </Link>
            <Link
              href={`/${locale}/cv/tech-stack`}
              className="block px-3 py-2 pl-6 rounded-md text-sm font-medium hover:bg-base-300"
              onClick={closeMenu}
            >
              {t('techStack')}
            </Link>
            <Link
              href={`/${locale}/cv/publications`}
              className="block px-3 py-2 pl-6 rounded-md text-sm font-medium hover:bg-base-300"
              onClick={closeMenu}
            >
              {t('publications')}
            </Link>
            <Link
              href={`/${locale}/cv/certifications`}
              className="block px-3 py-2 pl-6 rounded-md text-sm font-medium hover:bg-base-300"
              onClick={closeMenu}
            >
              {t('certifications')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
