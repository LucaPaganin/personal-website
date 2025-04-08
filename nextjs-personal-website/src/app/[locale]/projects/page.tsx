import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import fs from 'fs';
import path from 'path';

// Define the Project type
interface Project {
  name: string;
  description?: string;
  github_link: string;
  demo_link?: string;
  technologies?: string[];
}

// Function to get projects data
async function getProjects(): Promise<Project[]> {
  try {
    // Get projects from the Next.js data folder
    const filePath = path.join(process.cwd(), 'src', 'data', 'json', 'projects.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const projects = JSON.parse(fileContents);
    
    // Add additional info for display purposes if needed
    return projects.map(project => ({
      ...project,
      description: project.description || "A software development project.",
      technologies: project.technologies || ["Software Development"]
    }));
  } catch (error) {
    console.error('Error loading projects:', error);
    // Return sample projects if the data cannot be loaded
    return [
      {
        name: "SEYFERT: the SurvEY FishEr foRecast Tool",
        description: "A Python tool for Fisher matrix forecasting of cosmological surveys.",
        github_link: "https://github.com/LucaPaganin/SEYFERT",
        technologies: ["Python", "NumPy", "SciPy"]
      },
      {
        name: "Solar System Simulator",
        description: "A simulator for the dynamics of the solar system.",
        github_link: "https://github.com/LucaPaganin/SolarSystem/",
        technologies: ["C++", "OpenGL"]
      }
    ];
  }
}

export default async function ProjectsPage() {
  const t = useTranslations('projects');
  const projects = await getProjects();
  
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
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            variants={item}
          >
            <div className="card-body">
              <h2 className="card-title">{project.name}</h2>
              {project.description && (
                <p className="text-base-content/80">{project.description}</p>
              )}
              
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="badge badge-primary">{tech}</span>
                  ))}
                </div>
              )}
              
              <div className="card-actions justify-end mt-4">
                <a 
                  href={project.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <FaGithub className="mr-2" /> {t('github')}
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
