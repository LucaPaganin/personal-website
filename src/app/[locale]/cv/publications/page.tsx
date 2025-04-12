"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { publications } from "./publicationsData";
import "@/styles/cv.css"; // Import the CSS file

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
    <div className="cv-container">
      <motion.h1
        className="cv-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("publications")}
      </motion.h1>

      <motion.div
        className="publication-list"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sortedPublications.map((publication, index) => (
          <motion.div
            key={index}
            className="publication-card"
            variants={item}
          >
            <div className="publication-card-body">
              <a
                href={
                  publication.url ||
                  (publication.doi ? `https://doi.org/${publication.doi}` : "#")
                }
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10"
              >
                <h2 className="publication-title">
                  <span className="publication-title-marker">•</span>
                  {publication.title}
                </h2>
              </a>

              <p className="publication-meta">
                {publication.journal && `${publication.journal}, `}
                {publication.year}
              </p>
              
              <div className="publication-expandable">
                <div className="flex flex-col space-y-4">
                  <div className="publication-section">
                    <h3 className="publication-section-title">Authors</h3>
                    <p className="text-base-content/80 px-2">
                      {publication.authors.join(", ")}
                    </p>
                  </div>

                  {publication.abstract && (
                    <div className="publication-section">
                      <h3 className="publication-section-title">Abstract</h3>
                      <div className="publication-abstract">
                        <FaQuoteLeft className="publication-abstract-icon" />
                        <p>{publication.abstract}</p>
                      </div>
                    </div>
                  )}

                  {publication.tags && publication.tags.length > 0 && (
                    <div className="publication-section">
                      <h3 className="publication-section-title">Keywords</h3>
                      <div className="publication-tags">
                        {publication.tags.map((tag, idx) => (
                          <span key={idx} className="publication-tag">
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
                      className="publication-link"
                    >
                      DOI: {publication.doi}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
