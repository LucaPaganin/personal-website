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

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown dropdown-end">      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-blue-500"
        aria-label="Language selector"
      >
        <IoLanguage className="h-5 w-5" />{" "}
      </button>{" "}      {isOpen && (
        <ul className="dropdown-content absolute right-0 z-[1] menu p-2 shadow rounded-box w-52 mt-6 dark:bg-gray-800 bg-sky-100 dark:text-gray-200 text-blue-800">
          {locales.map((locale) => (
            <li key={locale}>
              <Link
                href={getLocalizedPath(locale)}
                className={`${
                  currentLocale === locale ? "active" : ""
                } hover:bg-sky-200 dark:hover:bg-gray-700`}
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={flags[locale]}
                  alt={t(locale)}
                  width={20}
                  height={20}
                />{" "}
                {t(locale)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
