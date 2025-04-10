"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useState, useEffect } from "react";
import { locales } from "@/i18n";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  // Safe access to translations with fallback
  const safeT = (key: string, defaultValue: string = "") => {
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
    t = useTranslations("navigation");
    locale = useLocale();
  } catch (error) {
    // Default fallback if hooks fail
    t = (key: string): string => key;
    locale = "en";
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
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments.length > 1
      ? `/${pathSegments.slice(1).join("/")}`
      : "/";
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
    return (
      <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50 rounded-b-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">Luca Paganin</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50 rounded-b-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="text-xl font-bold">
              Luca Paganin
            </Link>
          </div>{" "}
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {" "}
            <Link
              href={`/${locale}`}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === `/${locale}`
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-500"
              }`}
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === `/${locale}/about`
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-500"
              }`}
            >
              {t("about")}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === `/${locale}/projects`
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-500"
              }`}
            >
              {" "}
              {t("projects")}
            </Link>{" "}
            {/* CV Dropdown */}
            <div className="relative group">
              {" "}
              <div
                className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center space-x-1 ${
                  pathname.includes(`/${locale}/cv`)
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-500"
                }`}
              >
                {" "}
                <span>{t("cv")}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 inline-block transform transition-transform duration-300 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>{" "}
              <ul className="absolute hidden group-hover:block hover:block z-[1] mt-0 p-2 shadow bg-sky-100 dark:bg-gray-900 text-blue-800 dark:text-gray-200 rounded-lg w-52 transition-colors">
                {" "}
                <li>
                  <Link
                    href={`/${locale}/cv/experiences`}
                    onClick={closeMenu}
                    className="dropdown-menu-link"
                  >
                    {t("experiences")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/cv/education`}
                    onClick={closeMenu}
                    className="dropdown-menu-link"
                  >
                    {t("education")}
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    href={`/${locale}/cv/tech-stack`}
                    onClick={closeMenu}
                    className="dropdown-menu-link"
                  >
                    {t("techStack")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/cv/publications`}
                    onClick={closeMenu}
                    className="dropdown-menu-link"
                  >
                    {t("publications")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/cv/certifications`}
                    onClick={closeMenu}
                    className="dropdown-menu-link"
                  >
                    {t("certifications")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>{" "}
          {/* Right side - Language Switcher and Theme Switcher */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <LanguageSwitcher
              locales={locales}
              currentLocale={locale}
              getLocalizedPath={getLocalizedPath}
            />

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden ml-4 inline-flex items-center justify-center p-2 rounded-md hover:bg-base-300 focus:outline-none"
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
            {" "}
            <Link
              href={`/${locale}`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${locale}`
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-100 dark:hover:bg-blue-800"
              }`}
              onClick={closeMenu}
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${locale}/about`
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-100 dark:hover:bg-blue-800"
              }`}
              onClick={closeMenu}
            >
              {t("about")}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${locale}/projects`
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-100 dark:hover:bg-blue-800"
              }`}
              onClick={closeMenu}
            >
              {t("projects")}
            </Link>
            {/* CV Section Title */}{" "}
            <div className="px-3 py-2 text-base font-medium border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              {t("cv")}
            </div>{" "}
            {/* CV Subsections */}
            <Link
              href={`/${locale}/cv/experiences`}
              className="block px-3 py-2 pl-6 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={closeMenu}
            >
              {t("experiences")}
            </Link>
            <Link
              href={`/${locale}/cv/education`}
              className="block px-3 py-2 pl-6 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={closeMenu}
            >
              {t("education")}
            </Link>
            <Link
              href={`/${locale}/cv/tech-stack`}
              className="block px-3 py-2 pl-6 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={closeMenu}
            >
              {t("techStack")}
            </Link>
            <Link
              href={`/${locale}/cv/publications`}
              className="mobile-menu-link"
              onClick={closeMenu}
            >
              {t("publications")}
            </Link>
            <Link
              href={`/${locale}/cv/certifications`}
              className="mobile-menu-link"
              onClick={closeMenu}
            >
              {t("certifications")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
