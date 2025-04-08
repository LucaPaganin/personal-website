import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Helper function to get markdown content based on locale
async function getMarkdownContent(locale: string) {
  try {
    // Use file system to read markdown files
    const fs = require('fs');
    const path = require('path');
    
    const filePath = path.join(process.cwd(), '..', 'flask', 'data', 'md', `about_me.${locale}.md`);
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error loading markdown content:', error);
    return '# About Me\n\nContent is currently unavailable.';
  }
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

export default async function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  
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

  // Get markdown content based on locale
  const markdownContent = await getMarkdownContent(locale);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('title')}
      </motion.h1>
      
      {/* Introduction Section */}
      <motion.section 
        className="mb-12 prose lg:prose-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
      </motion.section>
      
      {/* Photo Carousel */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">{t('photoGallery')}</h2>
        <div className="max-w-2xl mx-auto">
          <Slider {...sliderSettings}>
            {carouselImages.map((image, index) => (
              <div key={index} className="relative">
                <div className="aspect-w-16 aspect-h-9 relative h-[400px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 rounded-b-lg">
                  <p className="text-center">{image.caption}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.section>
    </div>
  );
}
