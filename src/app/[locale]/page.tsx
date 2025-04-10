"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "../../navigation";
import { motion } from "framer-motion";
import { FaUser, FaCode, FaFileAlt } from "react-icons/fa";

export default function HomePage() {
  const t = useTranslations("home");
  const pathPrefix = useTranslations("navigation"); // Used for paths
  const params = useParams();

  return (
    <div className="py-12">
      {/* Hero Section */}
      <motion.section
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold mb-4">
          {t("greeting")} <span className="text-primary">Luca Paganin</span>
        </h1>
        <p className="text-xl mb-8">{t("title")}</p>
      </motion.section>

      {/* Cards Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* About Card */}{" "}
          <motion.div
            className="rounded-lg bg-white dark:bg-gray-800 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6 flex flex-col items-center text-center">
              <FaUser className="text-5xl mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">{t("about")}</h2>{" "}
              <p className="mb-6">{t("aboutDescription")}</p>{" "}
              <div className="mt-auto">
                <Link
                  href="/about"
                  className="inline-block px-5 py-2.5 rounded-md bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
                >
                  {pathPrefix("about")}
                </Link>
              </div>
            </div>
          </motion.div>
          {/* Projects Card */}
          <motion.div
            className="rounded-lg bg-white dark:bg-gray-800 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="p-6 flex flex-col items-center text-center">
              <FaCode className="text-5xl mb-4 text-secondary" />
              <h2 className="text-2xl font-bold mb-2">{t("projects")}</h2>{" "}
              <p className="mb-6">{t("projectsDescription")}</p>{" "}
              <div className="mt-auto">
                <Link
                  href="/projects"
                  className="inline-block px-5 py-2.5 rounded-md bg-secondary hover:bg-secondary/90 text-white font-medium transition-colors"
                >
                  {pathPrefix("projects")}
                </Link>
              </div>
            </div>
          </motion.div>
          {/* CV Card */}
          <motion.div
            className="rounded-lg bg-white dark:bg-gray-800 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="p-6 flex flex-col items-center text-center">
              <FaFileAlt className="text-5xl mb-4 text-accent" />
              <h2 className="text-2xl font-bold mb-2">{t("cv")}</h2>{" "}
              <p className="mb-6">{t("cvDescription")}</p>{" "}
              <div className="mt-auto">
                <Link
                  href="/cv/experiences"
                  className="inline-block px-5 py-2.5 rounded-md bg-accent hover:bg-accent/90 text-white font-medium transition-colors"
                >
                  {pathPrefix("cv")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
