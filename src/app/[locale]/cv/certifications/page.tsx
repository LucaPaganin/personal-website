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
    name: "Microsoft Certified: Azure Fundamentals (AZ-900",
    issuer: "Microsoft",
    date: "2025-02-21",
    credentialUrl: "https://learn.microsoft.com/en-us/users/lucapaganin-4094/credentials/certification/azure-fundamentals?tab=credentials-tab",
    description: "Foundational understanding of cloud services and how those services are provided with Microsoft Azure. Covered cloud concepts, Azure services, Azure workloads, security, privacy, pricing, and support.",
    image: "/images/certifications/az-900.png"
  },
  {
    name: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    date: "2025-03-14",
    credentialUrl: "https://learn.microsoft.com/en-us/users/lucapaganin-4094/credentials/certification/azure-ai-fundamentals?tab=credentials-tab",
    description: "Fundamentals of machine learning (ML) and artificial intelligence (AI) concepts, demonstrating knowledge of common AI workloads and how to implement them on Azure.",
    image: "/images/certifications/ai-900.png"
  },
  {
    name: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
    issuer: "Microsoft",
    date: "2025-06-20",
    credentialUrl: "https://learn.microsoft.com/en-us/users/lucapaganin-4094/credentials/certification/azure-ai-engineer?source=docs&tab=credentials-tab",
    description: "Demonstrates the ability to build, manage, and deploy AI solutions that leverage Azure Cognitive Services, Azure AI Agents, and Azure Machine Learning.",
    image: "/images/certifications/ai-102.png"
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
        className="grid grid-cols-1 gap-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sortedCertifications.map((certification, index) => (
          <motion.div
            key={index}
            className="group card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-content/10 rounded-2xl p-0 overflow-hidden cursor-pointer"
            variants={item}
            tabIndex={0}
          >
            <div className="card-body p-4 flex items-center">
              {certification.image && (
                <Image
                  src={certification.image}
                  alt={certification.name}
                  width={40}
                  height={40}
                  className="rounded-md object-contain mr-3 shrink-0"
                  style={{ width: '2.5rem', height: '2.5rem', minWidth: '2.5rem', minHeight: '2.5rem' }}
                />
              )}
              <h2 className="card-title text-lg m-0 flex-1">{certification.name}</h2>
            </div>
            <div
              className="transition-all duration-300 ease-in-out max-h-0 opacity-0 group-hover:max-h-[600px] group-hover:opacity-100 group-focus:max-h-[600px] group-focus:opacity-100 px-6 pb-6"
              style={{ pointerEvents: 'none' }}
            >
              <div className="flex flex-col gap-2 mt-2" style={{ pointerEvents: 'auto' }}>
                <p className="font-medium">{certification.issuer}</p>
                <div className="flex items-center text-base-content/70">
                  <FaCalendarAlt className="mr-2" />
                  <time dateTime={certification.date}>
                    {new Date(certification.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </time>
                </div>
                {certification.description && (
                  <p className="text-base-content/80 mt-2">{certification.description}</p>
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
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
