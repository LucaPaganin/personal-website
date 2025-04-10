"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FaPython,
  FaJs,
  FaReact,
  FaDocker,
  FaDatabase,
  FaCode,
  FaServer,
  FaTools,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiFlask,
  SiDjango,
  SiNumpy,
  SiPandas,
  SiScipy,
} from "react-icons/si";


import { useState } from "react";

// Define the Skill type
interface Skill {
  name: string;
  category: string;
  level: number; // 1-5
  icon?: string;
}

// Hardcoded skills data
const skills: Skill[] = [
  { name: "Python", category: "Languages", level: 5 },
  { name: "JavaScript", category: "Languages", level: 3 },
  { name: "TypeScript", category: "Languages", level: 2 },
  { name: "SQL", category: "Databases", level: 2 },
  { name: "Azure Cosmos DB", category: "Databases", level: 4 },
  { name: "Docker", category: "Tools", level: 4 },
  { name: "Azure DevOps Pipelines", category: "Tools", level: 5 },
  { name: "Flask", category: "Frameworks", level: 3 },
  { name: "React", category: "Frontend", level: 3 },
  { name: "Next.js", category: "Frontend", level: 2 },
  { name: "NumPy", category: "Libraries", level: 5 },
  { name: "Pandas", category: "Libraries", level: 5 },
  { name: "SciPy", category: "Libraries", level: 4 },
];

// Map skill names to icons
const skillIconMap: Record<string, React.ReactNode> = {
  Python: <FaPython />,
  JavaScript: <FaJs />,
  TypeScript: <SiTypescript />,
  SQL: <FaDatabase />,
  Docker: <FaDocker />,
  Flask: <SiFlask />,
  Django: <SiDjango />,
  React: <FaReact />,
  "Next.js": <SiNextdotjs />,
  NumPy: <SiNumpy />,
  Pandas: <SiPandas />,
  SciPy: <SiScipy />
};

// Map category names to icons
const categoryIconMap: Record<string, React.ReactNode> = {
  Languages: <FaCode />,
  Databases: <FaDatabase />,
  Tools: <FaTools />,
  Frameworks: <FaServer />,
  Frontend: <FaReact />,
  Libraries: <FaCode />,
};

export default function TechStackPage() {
  const t = useTranslations("cv");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Sort categories by name
  const sortedCategories = Object.keys(skillsByCategory).sort();

  // Animation variants
  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.1,
        height: { duration: 0.3 }
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  
  const arrowVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 180, transition: { duration: 0.3 } }
  };
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("techStack")}
      </motion.h1>      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sortedCategories.map((category) => (
          <motion.div
            key={category}
            className="card bg-base-100 shadow-xl cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="card-title flex items-center">
                  <span className="mr-2 text-2xl">
                    {categoryIconMap[category] || <FaCode />}
                  </span>
                  {category}
                </h2>                <motion.div
                  variants={arrowVariants}
                  initial="initial"
                  animate={hoveredCategory === category ? "hover" : "initial"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </motion.div>
              </div>

              <motion.ul
                className="mt-4 space-y-4 overflow-hidden"
                variants={container}
                initial="hidden"
                animate={hoveredCategory === category ? "show" : "hidden"}
              >
                {skillsByCategory[category]
                  .sort((a, b) => b.level - a.level) // Sort by level (highest first)
                  .map((skill) => (
                    <motion.li key={skill.name} variants={item}>
                      <div className="flex items-center mb-1">
                        <span className="text-xl mr-2 ml-4">
                          {skillIconMap[skill.name] || <FaCode />}
                        </span>
                        <span className="font-medium">{skill.name}</span>
                      </div>

                      {/* <div className="w-full bg-base-300 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div> */}
                    </motion.li>
                  ))}
              </motion.ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
