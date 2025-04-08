import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import fs from 'fs';
import path from 'path';
import { FaExternalLinkAlt, FaCertificate, FaCalendarAlt } from 'react-icons/fa';

// Define the Certification type
interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
  image?: string;
}

// Function to get certifications data
async function getCertifications(): Promise<Certification[]> {
  try {
    // Get certifications from the Next.js data folder
    const filePath = path.join(process.cwd(), 'src', 'data', 'json', 'certifications.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading certifications:', error);
    // Return sample certifications if the data cannot be loaded
    return [
      {
        name: "Machine Learning Specialization",
        issuer: "Coursera",
        date: "2023-06-01",
        credentialUrl: "https://coursera.org/verify/specialization/XXXXXX",
        description: "A specialization covering machine learning algorithms and applications.",
        image: "/images/ml-cert.jpg"
      },
      {
        name: "Data Science Professional Certificate",
        issuer: "edX",
        date: "2022-10-15",
        credentialUrl: "https://credentials.edx.org/XXXXXX",
        description: "Professional certificate program covering data science fundamentals.",
        image: "/images/data-cert.jpg"
      }
    ];
  }
}

export default async function CertificationsPage() {
  const t = useTranslations('cv');
  const certifications = await getCertifications();
  
  // Sort certifications by date (newest first)
  const sortedCertifications = [...certifications].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Animation variants
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
        {t('certifications')}
      </motion.h1>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sortedCertifications.map((certification, index) => (
          <motion.div 
            key={index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            variants={item}
          >
            <div className="card-body">
              <div className="flex items-center mb-2">
                <FaCertificate className="text-accent text-2xl mr-3" />
                <h2 className="card-title text-lg">{certification.name}</h2>
              </div>
              
              <p className="font-medium">{certification.issuer}</p>
              
              <div className="flex items-center text-base-content/70 mt-1">
                <FaCalendarAlt className="mr-2" />
                <time dateTime={certification.date}>
                  {new Date(certification.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </time>
              </div>
              
              {certification.description && (
                <p className="mt-3 text-base-content/80">{certification.description}</p>
              )}
              
              {certification.image && (
                <div className="mt-4">
                  <img 
                    src={certification.image} 
                    alt={certification.name} 
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              )}
              
              {certification.credentialUrl && (
                <div className="card-actions justify-end mt-4">
                  <a 
                    href={certification.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Verify Credential
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
