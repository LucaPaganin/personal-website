import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import fs from 'fs';
import path from 'path';
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

// Function to get publications data
async function getPublications(): Promise<Publication[]> {
  try {
    // Get publications from the Next.js data folder
    const filePath = path.join(process.cwd(), 'src', 'data', 'json', 'publications.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading publications:', error);
    // Return sample publications if the data cannot be loaded
    return [
      {
        title: "Sample Physics Publication",
        authors: ["Luca Paganin", "Other Author"],
        journal: "Journal of Physics",
        year: 2022,
        doi: "10.1000/example",
        url: "https://example.com/publication1",
        abstract: "This is a sample abstract for a physics publication.",
        tags: ["physics", "cosmology"]
      },
      {
        title: "Another Scientific Paper",
        authors: ["Other Author", "Luca Paganin"],
        journal: "Science Journal",
        year: 2021,
        doi: "10.1000/example2",
        url: "https://example.com/publication2",
        abstract: "This is another sample abstract.",
        tags: ["physics", "data analysis"]
      }
    ];
  }
}

export default async function PublicationsPage() {
  const t = useTranslations('cv');
  const publications = await getPublications();
  
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
        {sortedPublications.map((publication, index) => (
          <motion.div 
            key={index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            variants={item}
          >
            <div className="card-body">
              <h2 className="card-title text-lg sm:text-xl font-bold">
                {publication.title}
              </h2>
              
              <p className="text-base-content/80 mt-1">
                {publication.authors.join(', ')}
              </p>
              
              <p className="font-medium mt-1">
                {publication.journal && `${publication.journal}, `}{publication.year}
              </p>
              
              {publication.abstract && (
                <div className="mt-4">
                  <div className="flex items-start space-x-2">
                    <FaQuoteLeft className="text-base-content/50 mt-1 flex-shrink-0" />
                    <p className="text-base-content/80 italic">{publication.abstract}</p>
                  </div>
                </div>
              )}
              
              {publication.tags && publication.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {publication.tags.map((tag, idx) => (
                    <span key={idx} className="badge badge-outline">{tag}</span>
                  ))}
                </div>
              )}
              
              <div className="card-actions justify-end mt-4">
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
                
                {publication.url && (
                  <a 
                    href={publication.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    <FaExternalLinkAlt className="mr-2" /> View Publication
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
