"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Define the Project type
interface Project {
  name: string;
  description?: string;
  github_link: string;
  demo_link?: string;
  technologies?: string[];
}

export default function ProjectsPage() {
  const t = useTranslations('projects');
  
  // Directly embed the projects data here
  const projects: Project[] = [
    {
      name: "SEYFERT: the SurvEY FishEr foRecast Tool",
      description: "A Python tool for Fisher matrix forecasting of cosmological surveys.",
      github_link: "https://github.com/LucaPaganin/SEYFERT",
      technologies: ["Python", "NumPy", "SciPy", "Pandas", "Matplotlib"]
    },
    {
      name: "Solar System Simulator",
      description: "A simulator for the dynamics of the solar system, including a three dimensional animation of the planetary orbits.",
      github_link: "https://github.com/LucaPaganin/SolarSystem/",
      technologies: ["C++", "Python", "Dash"]
    },
    // Add more projects as needed
  ];
  
  // Animation variants for staggered list items
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
        {t('title')}
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow rounded-lg dark:bg-gray-800 px-6 py-4"
            variants={item}
          >
            <div className="card-body">
              <h2 className="card-title text-gray-900 dark:text-gray-100">{project.name}</h2>
              {project.description && (
                <p className="text-base-content/80 dark:text-gray-300">{project.description}</p>
              )}
              
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="badge badge-primary bg-blue-500 text-white rounded-full px-3 py-1">{tech}</span>
                  ))}
                </div>
              )}
              
              <div className="card-actions justify-end mt-4">
                <a 
                  href={project.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm flex items-center"
                >
                  <FaGithub className="mr-2" /> Github repository
                </a>
                
                {project.demo_link && (
                  <a 
                    href={project.demo_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <FaExternalLinkAlt className="mr-2" /> {t('demo')}
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
