"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { IoLanguage } from "react-icons/io5";
import Image from "next/image";

interface LanguageSwitcherProps {
  locales: string[];
  currentLocale: string;
  getLocalizedPath: (locale: string) => string;
}

export default function LanguageSwitcher({
  locales,
  currentLocale,
  getLocalizedPath,
}: LanguageSwitcherProps) {
  const t = useTranslations("languageSelector");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const flags: Record<string, string> = {
    en: "https://www.svgrepo.com/show/405643/flag-for-flag-united-kingdom.svg",
    it: "https://www.svgrepo.com/show/405517/flag-for-flag-italy.svg",
  };
  return (
    <div className="relative group">      <div 
        className="p-2 rounded-full hover:bg-blue-500 flex items-center space-x-1 cursor-pointer"
        aria-label="Language selector"
      >
        <IoLanguage className="h-5 w-5" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:rotate-180"
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
      </div>
      <ul className="absolute hidden group-hover:block hover:block z-[1] right-0 mt-[2px] p-2 shadow bg-sky-100 dark:bg-gray-900 text-blue-800 dark:text-gray-200 rounded-lg min-w-fit transition-colors">
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={getLocalizedPath(locale)}
              className={`${
                currentLocale === locale ? "active" : ""
              } hover:bg-sky-200 dark:hover:bg-gray-700 flex items-center gap-2 px-4 py-2 text-sm rounded-md`}
            >
                <Image
                  src={flags[locale]}
                  alt={t(locale)}
                  width={20}
                  height={20}
                />
                {t(locale)}
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
}
