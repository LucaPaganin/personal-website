'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaFilePdf, FaQuoteLeft } from 'react-icons/fa';

// Define the Publication type
interface Publication {
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  doi?: string;
  url?: string;
  abstract?: string;
  tags?: string[];
}

// Hardcoded publications data
const publications: Publication[] = [
  {
    title: "Sentient Spaces: Intelligent Totem Use Case in the ECSEL FRACTAL Project",
    authors: ["Federica Caruso", "Tania Di Mascio", "Daniele Frigioni", "Luigi Pomante", "Giacomo Valente", "Stefano Delucchi", "Paolo Burgio", "Manuel Di Frangia", "Luca Paganin", "Chiara Garibotto", "Damiano Vallocchia"],
    year: 2022,
    url: "https://fractal-project.eu/",
    abstract: "This paper presents the implementation of intelligent totem systems as part of the ECSEL FRACTAL project, focusing on creating responsive environments through embedded AI and sensor networks.",
    tags: ["embedded systems", "AI", "IoT"]
  },
  {
    title: "Euclid preparation: 6x2pt analysis for Euclid main probes",
    authors: ["Luca Paganin", "Marco Bonici", "Carmelita Carbone", "Stefano Camera", "Isaac Tutusaus", "Davide Sciotti", "Julien Bel", "Stefano Davini", "Silvano Tosi", "Sergio Di Domizio", "Gemma Testera"],
    journal: "Astronomy & Astrophysics",
    year: 2024,
    url: "https://arxiv.org/abs/2409.18882",
    doi: "10.48550/arXiv.2409.18882", // arXiv DOI format
    abstract: "This work presents forecasts for cosmological constraints from a combined analysis of cosmic shear, galaxy clustering, and galaxy-galaxy lensing for the Euclid space mission, utilizing a 6×2pt correlation function approach.",
    tags: ["cosmology", "astrophysics", "dark energy"]
  },
  {
    title: "Euclid: Forecasts from the void-lensing cross-correlation",
    authors: ["Marco Bonici", "Carmelita Carbone", "Stefano Davini", "Pauline Vielzeuf", "Luca Paganin", "Vincenzo Fabrizio Cardone", "Nico Hamaus", "Alice Pisani", "Adam Hawken", "András Kovács", "Seshadri Nadathur", "Sofia Contarini", "Giovanni Verza", "Isaac Tutusaus", "Federico Marulli", "Lauro Moscardini", "Marie Aubert", "Carlo Giocoli", "Alkistis Pourtsidou", "Stefano Camera", "Stéphanie Escoffier", "Alessio Caminata", "Sebastien Clesse", "Sergio Di Domizio", "Matteo Martinelli", "Marco Pallavicini", "Valeria Pettorino", "Ziad Sakr", "Domenico Sapone", "Gemma Testera", "Silvano Tosi", "Victoria Yankelevich"],
    journal: "Astronomy & Astrophysics",
    year: 2021,
    url: "https://www.aanda.org/articles/aa/full_html/2023/02/aa44445-22/aa44445-22.html",
    doi: "10.1051/0004-6361/202244445", // A&A DOI extracted from URL pattern
    abstract: "This paper explores the potential of cosmic void-lensing cross-correlations as a cosmological probe for the Euclid mission, providing forecasts for constraining cosmological parameters including dark energy properties.",
    tags: ["cosmology", "voids", "weak lensing"]
  },
  {
    title: "A Proposal for Relative In-flight Flux Self-calibrations for Spectro-photometric Surveys",
    authors: ["S. Davini", "I. Risso", "M. Scodeggio", "L. Paganin", "S. Caprioli", "M. Bonici", "A. Caminata", "S. Di Domizio", "G. Testera", "S. Tosi", "B. Valerio", "M. Fumana", "P. Franzetti"],
    journal: "The Astronomical Journal",
    year: 2021,
    url: "https://iopscience.iop.org/article/10.1088/1538-3873/ac102e",
    doi: "10.1088/1538-3873/ac102e", // DOI extracted directly from the URL
    abstract: "This work presents a novel methodology for self-calibration of spectro-photometric instruments during survey operations, improving the accuracy of flux calibration without requiring additional calibration observations.",
    tags: ["instrumentation", "spectroscopy", "calibration"]
  }
];

export default function PublicationsPage() {
  const t = useTranslations('cv');
  
  // Sort publications by year (newest first)
  const sortedPublications = [...publications].sort((a, b) => b.year - a.year);
  
  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('publications')}
      </motion.h1>
      
      <motion.div
        className="space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sortedPublications.map((publication, index) => (          <motion.div 
            key={index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow group relative"
            variants={item}
          >
            <div className="card-body">
              <a 
                href={publication.url || (publication.doi ? `https://doi.org/${publication.doi}` : "#")} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative z-10"
              >
                <h2 className="card-title text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                  {publication.title}
                  {(publication.url || publication.doi) && <FaExternalLinkAlt className="text-sm ml-1 opacity-70" />}
                </h2>
              </a>
              
              <p className="font-medium mt-1">
                {publication.journal && `${publication.journal}, `}{publication.year}
              </p>
              
              {/* Hover dropdown that shows details */}
              <div className="mt-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[500px] transition-all duration-300 bg-base-200 rounded-lg p-0 group-hover:p-4 border-0 group-hover:border border-base-300">
                <div className="flex flex-col space-y-3">
                  <div>
                    <h3 className="font-semibold mb-1">Authors</h3>
                    <p className="text-base-content/80">
                      {publication.authors.join(', ')}
                    </p>
                  </div>
                
                  {publication.abstract && (
                    <div>
                      <h3 className="font-semibold mb-1">Abstract</h3>
                      <div className="flex items-start space-x-2">
                        <FaQuoteLeft className="text-base-content/50 mt-1 flex-shrink-0" />
                        <p className="text-base-content/80 italic">{publication.abstract}</p>
                      </div>
                    </div>
                  )}
                  
                  {publication.tags && publication.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-1">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {publication.tags.map((tag, idx) => (
                          <span key={idx} className="badge badge-outline">{tag}</span>
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
              
              <div className="card-actions justify-end mt-4">
                
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
