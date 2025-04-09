"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGraduationCap } from "react-icons/fa";

// Education IDs to determine which entries to display and their order
const educationIds = ["bsc", "msc"];

export default function EducationPage() {
  const tEducation = useTranslations("education");

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {tEducation("title")}
      </motion.h1>

      <VerticalTimeline>
        {educationIds.map((eduId) => (
          <VerticalTimelineElement
            key={eduId}
            className="vertical-timeline-element--education"
            contentStyle={{
              background: "var(--secondary-color)",
              color: "#fff",
              borderRadius: "12px",
            }}
            contentArrowStyle={{
              borderRight: "7px solid var(--secondary-color)",
            }}
            date={tEducation(`${eduId}.period`)}
            iconStyle={{ background: "var(--secondary-color)", color: "#fff" }}
            icon={<FaGraduationCap />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">
              {tEducation(`${eduId}.degree`)}
            </h3>
            <h4 className="vertical-timeline-element-subtitle font-medium mt-1">
              {tEducation(`${eduId}.institution`)},{" "}
              {tEducation(`${eduId}.location`)}
            </h4>

            {tEducation.raw(`${eduId}.description`) && (
              <p className="mt-4">{tEducation(`${eduId}.description`)}</p>
            )}

            {tEducation.raw(`${eduId}.gpa`) && (
              <p className="mt-2 font-medium">
                GPA: {tEducation(`${eduId}.gpa`)}
              </p>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}
