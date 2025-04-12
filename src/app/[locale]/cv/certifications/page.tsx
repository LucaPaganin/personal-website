"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaCertificate, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';

// Define the Certification type
interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
  image?: string;
}

// Hardcoded certifications data
const certifications: Certification[] = [
  {
    name: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    date: "2025-02-21", // You may need to adjust the actual date
    credentialUrl: "https://learn.microsoft.com/en-us/users/lucapaganin-4094/credentials/certification/azure-fundamentals?tab=credentials-tab",
    description: "Foundational understanding of cloud services and how those services are provided with Microsoft Azure. Covered cloud concepts, Azure services, Azure workloads, security, privacy, pricing, and support.",
    image: "/images/az-900.png"
  },
  {
    name: "Microsoft Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "2025-03-14", // You may need to adjust the actual date
    credentialUrl: "https://learn.microsoft.com/en-us/users/lucapaganin-4094/credentials/certification/azure-ai-fundamentals?tab=credentials-tab",
    description: "Fundamentals of machine learning (ML) and artificial intelligence (AI) concepts, demonstrating knowledge of common AI workloads and how to implement them on Azure.",
    image: "/images/ai-900.png"
  }
];

export default function CertificationsPage() {
  const t = useTranslations('cv');
  
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
                <div className="mt-4 flex justify-center">
                  <Image 
                    src={certification.image}
                    alt={certification.name}
                    width={200}
                    height={160}
                    className="rounded-lg object-contain"
                    style={{ height: '10rem', maxWidth: '80%' }}
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
