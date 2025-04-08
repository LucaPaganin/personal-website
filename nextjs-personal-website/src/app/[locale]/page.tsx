import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUser, FaCode, FaFileAlt } from 'react-icons/fa';

export default function HomePage() {
  const t = useTranslations('home');
  const pathPrefix = useTranslations('navigation'); // Used for paths

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
          {t('greeting')} <span className="text-primary">Luca Paganin</span>
        </h1>
        <p className="text-xl mb-8">{t('title')}</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="about" className="btn btn-primary">
            {t('about')}
          </Link>
          <Link href="projects" className="btn btn-secondary">
            {t('projects')}
          </Link>
          <Link href="cv/experiences" className="btn btn-accent">
            {t('cv')}
          </Link>
        </div>
      </motion.section>

      {/* Cards Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* About Card */}
          <motion.div 
            className="card bg-base-100 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-body items-center text-center">
              <FaUser className="text-5xl mb-4 text-primary" />
              <h2 className="card-title">{t('about')}</h2>
              <p>Learn more about who I am, my background, and what drives me.</p>
              <div className="card-actions">
                <Link href="about" className="btn btn-primary">
                  {pathPrefix('about')}
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Projects Card */}
          <motion.div 
            className="card bg-base-100 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card-body items-center text-center">
              <FaCode className="text-5xl mb-4 text-secondary" />
              <h2 className="card-title">{t('projects')}</h2>
              <p>Explore the software projects I've built and contributed to.</p>
              <div className="card-actions">
                <Link href="projects" className="btn btn-secondary">
                  {pathPrefix('projects')}
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* CV Card */}
          <motion.div 
            className="card bg-base-100 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card-body items-center text-center">
              <FaFileAlt className="text-5xl mb-4 text-accent" />
              <h2 className="card-title">{t('cv')}</h2>
              <p>View my professional experience, education, and technical skills.</p>
              <div className="card-actions">
                <Link href="cv/experiences" className="btn btn-accent">
                  {pathPrefix('cv')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
