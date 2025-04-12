"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';

export default function ExperiencesPage() {
  // Use client-side hooks
  const tCv = useTranslations('cv');
  const tExperiences = useTranslations('experiences');
  const locale = useLocale();
  const { theme } = useTheme();
  
  // State to store the experience IDs fetched from the API
  const [experienceIds, setExperienceIds] = useState<string[]>([]);
  const [, setLoading] = useState(true);
  
  // Fetch experience IDs from our API endpoint
  useEffect(() => {
    const fetchExperienceIds = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/experiences?locale=${locale}`);
        if (!response.ok) {
          throw new Error('Failed to fetch experience IDs');
        }
        const data = await response.json();
        setExperienceIds(data.experienceIds);
      } catch (error) {
        console.error('Error fetching experience IDs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperienceIds();
  }, [locale]);
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {tCv('experiences')}
      </motion.h1>
      
      <VerticalTimeline
        lineColor={theme === "dark" ? "white" : "black"}
      >
        {experienceIds.map((expId) => {
          return (
            <VerticalTimelineElement
              key={expId}
              className="vertical-timeline-element--work"
              contentStyle={{ 
                background: 'var(--primary-color)', 
                color: 'var(--text-color)', 
                borderRadius: '12px' 
              }}
              contentArrowStyle={{ borderRight: '7px solid var(--primary-color)' }}
              date={tExperiences(`${expId}.period`)}
              iconStyle={{ 
                background: 'var(--primary-color)', 
                color: 'var(--icon-color)' 
              }}
              icon={<FaBriefcase />}
            >
              <h3 className="vertical-timeline-element-title text-xl font-bold">
                {tExperiences(`${expId}.title`)}
              </h3>
              <h4 className="vertical-timeline-element-subtitle font-medium mt-1">
                {tExperiences(`${expId}.company`)}, {tExperiences(`${expId}.location`)}
              </h4>
              
              <div className="mt-4 prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {tExperiences(`${expId}.description`)}
                </ReactMarkdown>
              </div>
              
              {/* Company website link */}
              {tExperiences.raw(`${expId}.companyUrl`) && (
                <div className="mt-4">
                  <a 
                    href={tExperiences(`${expId}.companyUrl`)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {tCv('visitCompanyWebsite')}
                  </a>
                </div>
              )}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}
