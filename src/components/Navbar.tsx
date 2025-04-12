"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useState, useEffect } from "react";
import { locales } from "@/i18n";
import { FaBars, FaTimes } from "react-icons/fa";
import "@/styles/navbar.css";

export default function Navbar() {
  const t = useTranslations("navigation");
  const locale = useLocale();

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
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-layout">
            <div className="navbar-logo">
              <span>Luca Paganin</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-layout">
          {/* Logo/Home Link */}
          <div className="navbar-logo">
            <Link href={`/${locale}`}>
              Luca Paganin
            </Link>
          </div>{" "}
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {" "}
            <Link
              href={`/${locale}`}
              className={`nav-link ${
                pathname === `/${locale}` ? "nav-link-active" : "nav-link-inactive"
              }`}
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`nav-link ${
                pathname === `/${locale}/about` ? "nav-link-active" : "nav-link-inactive"
              }`}
            >
              {t("about")}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className={`nav-link ${
                pathname === `/${locale}/projects` ? "nav-link-active" : "nav-link-inactive"
              }`}
            >
              {" "}
              {t("projects")}
            </Link>{" "}
            {/* CV Dropdown */}
            <div className="relative group">
              {" "}
              <div
                className={`dropdown-trigger ${
                  pathname.includes(`/${locale}/cv`) ? "nav-link-active" : "nav-link-inactive"
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
              <ul className="dropdown-menu">
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
              className={`mobile-nav-link ${
                pathname === `/${locale}` ? "mobile-nav-link-active" : "mobile-nav-link-inactive"
              }`}
              onClick={closeMenu}
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`mobile-nav-link ${
                pathname === `/${locale}/about` ? "mobile-nav-link-active" : "mobile-nav-link-inactive"
              }`}
              onClick={closeMenu}
            >
              {t("about")}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className={`mobile-nav-link ${
                pathname === `/${locale}/projects` ? "mobile-nav-link-active" : "mobile-nav-link-inactive"
              }`}
              onClick={closeMenu}
            >
              {t("projects")}
            </Link>
            {/* CV Section Title */}{" "}
            <div className="mobile-section-title">
              {t("cv")}
            </div>{" "}
            {/* CV Subsections */}
            <Link
              href={`/${locale}/cv/experiences`}
              className="mobile-menu-link"
              onClick={closeMenu}
            >
              {t("experiences")}
            </Link>
            <Link
              href={`/${locale}/cv/education`}
              className="mobile-menu-link"
              onClick={closeMenu}
            >
              {t("education")}
            </Link>
            <Link
              href={`/${locale}/cv/tech-stack`}
              className="mobile-menu-link"
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
