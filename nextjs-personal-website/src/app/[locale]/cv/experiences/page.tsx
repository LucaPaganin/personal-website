import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from 'react-icons/fa';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define the Experience type
interface Experience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  markdown_file?: string;
  image?: string;
}

// Function to get experiences data
async function getExperiences(): Promise<Experience[]> {
  try {
    // Get experiences from the Next.js data folder
    const filePath = path.join(process.cwd(), 'src', 'data', 'json', 'experience.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading experiences:', error);
    // Return sample experiences if the data cannot be loaded
    return [
      {
        title: "PhD Researcher",
        company: "University of Milan",
        location: "Milan, Italy",
        startDate: "2019-11-01",
        endDate: "2022-10-31",
        description: "Conducting research in physics.",
        image: "/images/university.jpg"
      },
      {
        title: "Software Developer",
        company: "Tech Company",
        location: "Remote",
        startDate: "2023-01-01",
        current: true,
        description: "Developing software solutions.",
        image: "/images/tech.jpg"
      }
    ];
  }
}

// Function to get markdown content based on locale and filename
async function getMarkdownContent(locale: string, filename: string) {
  if (!filename) return null;
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'md', `${filename}.${locale}.md`);
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error loading markdown content:', error);
    return null;
  }
}

export default async function ExperiencesPage() {
  const t = useTranslations('cv');
  const locale = useLocale();
  const experiences = await getExperiences();
  
  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.endDate || (a.current ? new Date().toISOString() : a.startDate);
    const dateB = b.endDate || (b.current ? new Date().toISOString() : b.startDate);
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // Load markdown content for each experience
  const experiencesWithContent = await Promise.all(
    sortedExperiences.map(async (exp) => {
      if (exp.markdown_file) {
        const markdownContent = await getMarkdownContent(locale, exp.markdown_file);
        return {
          ...exp,
          markdownContent
        };
      }
      return exp;
    })
  );

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('experiences')}
      </motion.h1>
      
      <VerticalTimeline>
        {experiencesWithContent.map((experience, index) => {
          // Format dates
          const startDate = new Date(experience.startDate);
          const endDate = experience.endDate ? new Date(experience.endDate) : null;
          
          const formattedStartDate = startDate.toLocaleDateString(locale, { 
            year: 'numeric', 
            month: 'long' 
          });
          
          const formattedEndDate = experience.current 
            ? (locale === 'en' ? 'Present' : 'Attuale') 
            : endDate?.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
          
          return (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'var(--primary-color)', color: '#fff', borderRadius: '12px' }}
              contentArrowStyle={{ borderRight: '7px solid var(--primary-color)' }}
              date={`${formattedStartDate} - ${formattedEndDate}`}
              iconStyle={{ background: 'var(--primary-color)', color: '#fff' }}
              icon={<FaBriefcase />}
            >
              <h3 className="vertical-timeline-element-title text-xl font-bold">
                {experience.title}
              </h3>
              <h4 className="vertical-timeline-element-subtitle font-medium mt-1">
                {experience.company}{experience.location ? `, ${experience.location}` : ''}
              </h4>
              
              {experience.markdownContent ? (
                <div className="mt-4 prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {experience.markdownContent}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="mt-4">{experience.description}</p>
              )}
              
              {experience.image && (
                <div className="mt-4">
                  <img 
                    src={experience.image} 
                    alt={experience.company} 
                    className="rounded-lg w-full h-auto max-h-48 object-cover"
                  />
                </div>
              )}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}
