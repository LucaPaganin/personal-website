"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaFilePdf, FaQuoteLeft } from "react-icons/fa";
import { publications } from "./publicationsData";


export default function PublicationsPage() {
  const t = useTranslations("cv");

  // Sort publications by year (newest first)
  const sortedPublications = [...publications].sort((a, b) => b.year - a.year);

  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("publications")}
      </motion.h1>

      <motion.div
        className="space-y-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {" "}
        {sortedPublications.map((publication, index) => (
          <motion.div
            key={index}
            className="card bg-base-100 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow group relative"
            variants={item}
          >
            <div className="card-body p-10 space-y-2">
              <a
                href={
                  publication.url ||
                  (publication.doi ? `https://doi.org/${publication.doi}` : "#")
                }
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10"
              >
                <h2 className="card-title text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                  <span className="mr-2 text-primary">•</span>
                  {publication.title}
                  {/* {(publication.url || publication.doi) && (
                    <FaExternalLinkAlt className="text-sm ml-4 opacity-70" />
                  )} */}
                </h2>
              </a>

              <p className="font-medium mt-1 ml-4">
                {publication.journal && `${publication.journal}, `}
                {publication.year}
              </p>
              {/* Hover dropdown that shows details */}
              <div className="mt-3 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[500px] transition-all duration-300 bg-base-200 rounded-2xl p-0 group-hover:p-6 border-0 group-hover:border border-base-300">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Authors</h3>
                    <p className="text-base-content/80 px-2">
                      {publication.authors.join(", ")}
                    </p>
                  </div>

                  {publication.abstract && (
                    <div>
                      <h3 className="font-semibold mb-1">Abstract</h3>
                      <div className="flex items-start space-x-2">
                        <FaQuoteLeft className="text-base-content/50 mt-1 flex-shrink-0" />
                        <p className="text-base-content/80 italic">
                          {publication.abstract}
                        </p>
                      </div>
                    </div>
                  )}

                  {publication.tags && publication.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-1">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {publication.tags.map((tag, idx) => (
                          <span key={idx} className="badge badge-outline">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {publication.doi && (
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                    >
                      DOI: {publication.doi}
                    </a>
                  )}
                </div>
              </div>

              <div className="card-actions justify-end mt-4"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
