'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { marked } from 'marked';

// Markdown content directly embedded as strings
const markdownContent = {
  en: `BSc in Physics (110/110 cum laude). MSc in Physics (110/110 cum laude).
PhD in Physics, with a thesis related to the European Space Agency's Euclid space mission.

After my PhD, I was hired as a Junior Full Stack Developer at Rulex Innovation Labs, a
Genoa-based company developing a software platform for data analysis using artificial intelligence.

I am passionate about cosmology, software development, and data analysis.`,
  it: `Sono una persona curiosa, con una forte passione per l'apprendimento continuo e la scoperta di nuove tecnologie. 
Il mio percorso è iniziato con studi in Fisica, culminati in un Dottorato di Ricerca svolto nell'ambito della [missione Euclid dell'ESA](https://www.esa.int/Science_Exploration/Space_Science/Euclid).

Forte delle solide competenze di programmazione acquisite durante il dottorato, ho scelto di orientare la mia carriera verso il settore tecnologico. 
Ho iniziato come sviluppatore Python presso Rulex Innovation Labs, dove ho contribuito allo sviluppo della REST API e della Command Line Interface (CLI) della piattaforma [Rulex Platform](https://rulex.ai), curando anche le attività DevOps legate allo sviluppo e alla manutenzione delle pipeline CI/CD.

Attualmente, ricopro il ruolo di **Cloud Backend Developer** in [RINA](https://rina.org), lavorando principalmente su piattaforma **Microsoft Azure** per la progettazione e lo sviluppo di soluzioni backend.

**Python** è il mio linguaggio d'elezione, che applico quotidianamente per creare sistemi efficienti, scalabili e robusti.`
};

// Helper function to get markdown content based on locale
function getMarkdownContent(locale: string) {
  return markdownContent[locale as keyof typeof markdownContent] || markdownContent.en;
}

// Sample images for the carousel - replace with your actual images
const carouselImages = [
  {
    src: '/images/photo1.jpg',
    alt: 'Photo 1',
    caption: 'Working on a project'
  },
  {
    src: '/images/photo2.jpg',
    alt: 'Photo 2',
    caption: 'At a conference'
  },
  {
    src: '/images/photo3.jpg',
    alt: 'Photo 3',
    caption: 'Hiking in the mountains'
  }
];

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const [html, setHtml] = useState('');
  
  // Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Use useEffect to parse markdown on the client side
  useEffect(() => {
    const content = getMarkdownContent(locale);
    const parsedHtml = marked(content);
    setHtml(parsedHtml);
  }, [locale]);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('title')}
      </motion.h1>
      
      {/* Introduction Section */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">{t('aboutMe') || 'About Me'}</h2>            <div className="prose lg:prose-xl">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Photo Carousel */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">{t('photoGallery')}</h2>
            <div className="max-w-3xl mx-auto">
              <Slider {...sliderSettings}>
                {carouselImages.map((image, index) => (
                  <div key={index} className="relative px-2">
                    <div className="aspect-w-16 aspect-h-9 relative h-[400px]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="absolute bottom-0 left-2 right-2 bg-black bg-opacity-60 text-white p-4 rounded-b-lg">
                      <p className="text-center">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Interests Section */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">{t('interests') || 'Interests'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-base-200 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{t('research') || 'Research'}</h3>
                <p>{t('researchDescription') || 'My research interests include machine learning, data science and software engineering.'}</p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{t('hobbies') || 'Hobbies'}</h3>
                <p>{t('hobbiesDescription') || 'In my free time, I enjoy traveling, photography, and playing musical instruments.'}</p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{t('languages') || 'Languages'}</h3>
                <p>{t('languagesDescription') || 'I speak Italian (native), English (fluent), and I\'m learning other languages.'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
