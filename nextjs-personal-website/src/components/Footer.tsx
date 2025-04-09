"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="p-6 bg-base-200 text-base-content">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mx-auto gap-4">
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://github.com/LucaPaganin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
            aria-label="GitHub profile"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/luca-paganin-phd-1a0b1a160/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>

        <div>
          <p>© {new Date().getFullYear()} Luca Paganin - All rights reserved</p>
        </div>

        <div className="flex items-center gap-2">
          <span>Created with</span>
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NextJS website"
            className="inline-flex items-center"
          >
            {mounted && (
              <Image
                src={theme === "dark" ? "/next-dark.svg" : "/next.svg"}
                alt="NextJS Logo"
                width={80}
                height={20}
              />
            )}
          </a>
        </div>
      </div>
    </footer>
  );
}
