import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaGraduationCap } from 'react-icons/fa';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define the Education type
interface Education {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  description?: string;
  markdown_file?: string;
  image?: string;
  gpa?: string;
}

// Function to get education data
async function getEducation(): Promise<Education[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'json', 'phd_details.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const phdData = JSON.parse(fileContents);
    
    // Format the data to match our Education interface
    const educationItems: Education[] = [
      {
        degree: "PhD in Physics",
        institution: phdData.university || "University of Milan",
        location: phdData.location || "Milan, Italy",
        startDate: phdData.start_date || "2019-11-01",
        endDate: phdData.end_date || "2022-10-31",
        markdown_file: "phd_main",
        image: "/images/phd.jpg"
      },
      {
        degree: "Master's Degree in Physics",
        institution: "University of Pisa",
        location: "Pisa, Italy",
        startDate: "2017-09-01",
        endDate: "2019-07-31",
        description: "Master's degree in Physics with a focus on theoretical physics.",
        image: "/images/master.jpg"
      },
      {
        degree: "Bachelor's Degree in Physics",
        institution: "University of Pisa",
        location: "Pisa, Italy",
        startDate: "2013-09-01",
        endDate: "2017-07-31",
        markdown_file: "edu_bsc",
        image: "/images/bachelor.jpg"
      },
      {
        degree: "High School Diploma - Scientific Lyceum",
        institution: "Liceo Scientifico",
        location: "Italy",
        startDate: "2008-09-01",
        endDate: "2013-07-31",
        description: "Scientific high school focusing on mathematics, physics, and natural sciences.",
        image: "/images/highschool.jpg"
      }
    ];
    
    return educationItems;
  } catch (error) {
    console.error('Error loading education data:', error);
    return []
  }
}

// Function to get markdown content based on locale and filename
async function getMarkdownContent(locale: string, filename: string) {
  if (!filename) return null;
  
  try {
    const filePath = path.join(process.cwd(), '..', 'flask', 'data', 'md', `${filename}.${locale}.md`);
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error loading markdown content:', error);
    return null;
  }
}

export default async function EducationPage() {
  const t = useTranslations('cv');
  const locale = useLocale();
  const education = await getEducation();
  
  // Sort education by date (most recent first)
  const sortedEducation = [...education].sort((a, b) => {
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });

  // Load markdown content for each education item
  const educationWithContent = await Promise.all(
    sortedEducation.map(async (edu) => {
      if (edu.markdown_file) {
        const markdownContent = await getMarkdownContent(locale, edu.markdown_file);
        return {
          ...edu,
          markdownContent
        };
      }
      return edu;
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
        {t('education')}
      </motion.h1>
      
      <VerticalTimeline>
        {educationWithContent.map((education, index) => {
          // Format dates
          const startDate = new Date(education.startDate);
          const endDate = new Date(education.endDate);
          
          const formattedStartDate = startDate.toLocaleDateString(locale, { 
            year: 'numeric', 
            month: 'long' 
          });
          
          const formattedEndDate = endDate.toLocaleDateString(locale, { 
            year: 'numeric', 
            month: 'long' 
          });
          
          return (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--education"
              contentStyle={{ background: 'var(--secondary-color)', color: '#fff', borderRadius: '12px' }}
              contentArrowStyle={{ borderRight: '7px solid var(--secondary-color)' }}
              date={`${formattedStartDate} - ${formattedEndDate}`}
              iconStyle={{ background: 'var(--secondary-color)', color: '#fff' }}
              icon={<FaGraduationCap />}
            >
              <h3 className="vertical-timeline-element-title text-xl font-bold">
                {education.degree}
              </h3>
              <h4 className="vertical-timeline-element-subtitle font-medium mt-1">
                {education.institution}{education.location ? `, ${education.location}` : ''}
              </h4>
              
              {education.gpa && (
                <p className="mt-2 font-medium">GPA: {education.gpa}</p>
              )}
              
              {education.markdownContent ? (
                <div className="mt-4 prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {education.markdownContent}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="mt-4">{education.description}</p>
              )}
              
              {education.image && (
                <div className="mt-4">
                  <img 
                    src={education.image} 
                    alt={education.institution} 
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
