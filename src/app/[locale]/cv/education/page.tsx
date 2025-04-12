"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGraduationCap } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import "@/styles/cv.css"; // Import the CSS file

export default function EducationPage() {
  const tEducation = useTranslations("education");
  const locale = useLocale();
  const { theme } = useTheme();
  
  // State to store the education IDs fetched from the API
  const [educationIds, setEducationIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch education IDs from our API endpoint
  useEffect(() => {
    const fetchEducationIds = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/education?locale=${locale}`);
        if (!response.ok) {
          throw new Error('Failed to fetch education IDs');
        }
        const data = await response.json();
        setEducationIds(data.educationIds);
      } catch (error) {
        console.error('Error fetching education IDs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEducationIds();
  }, [locale]);

  return (
    <div className="cv-container">
      <motion.h1
        className="cv-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {tEducation("title")}
      </motion.h1>

      <VerticalTimeline
        className="education-timeline"
        lineColor={theme === "dark" ? "white" : "black"}
      >
        {educationIds.map((eduId) => (
          <VerticalTimelineElement
            key={eduId}
            className="education-timeline-element"
            contentStyle={{ 
              background: 'var(--primary-color)',
              color: 'var(--text-color)',
              borderRadius: '12px'
            }}
            contentArrowStyle={{ borderRight: '7px solid var(--primary-color)' }}
            date={tEducation(`${eduId}.period`)}
            iconStyle={{ 
              background: 'var(--primary-color)',
              color: 'var(--icon-color)'
            }}
            icon={<FaGraduationCap />}
          >
            <h3 className="education-degree">
              {tEducation(`${eduId}.degree`)}
            </h3>
            <h4 className="education-institution">
              {tEducation(`${eduId}.institution`)}, {tEducation(`${eduId}.location`)}
            </h4>
            
            {tEducation.raw(`${eduId}.description`) && (
              <p className="education-description">{tEducation(`${eduId}.description`)}</p>
            )}
            
            {tEducation.raw(`${eduId}.gpa`) && (
              <p className="education-gpa">GPA: {tEducation(`${eduId}.gpa`)}</p>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}
