"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FaPython,
  FaJs,
  FaDocker,
  FaDatabase,
  FaCode,
  FaServer,
  FaTools,
  FaReact,
  FaCloud,
  FaBook,
  FaBrain
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiFlask,
  SiNumpy,
  SiPandas,
  SiScipy,
  SiJinja,
  SiCplusplus,
  SiFastapi,
  SiStreamlit,
  SiOpenai,
  SiFramework,
  SiLangchain
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
  { name: "C++", category: "Languages", level: 3 },
  { name: "C#", category: "Languages", level: 2 },
  { name: "PowerShell", category: "Languages", level: 3 },
  { name: "Docker", category: "Tools", level: 4 },
  { name: "Azure DevOps Pipelines", category: "Tools", level: 5 },
  { name: "Flask", category: "Frameworks", level: 3 },
  { name: "Tornado", category: "Frameworks", level: 3 },
  { name: "FastAPI", category: "Frameworks", level: 3 },
  { name: "Next.js", category: "Frontend", level: 2 },
  { name: "Streamlit", category: "Frontend", level: 4 },
  { name: "React", category: "Frontend", level: 2 },
  { name: "Jinja", category: "Frontend", level: 2 },
  { name: "NumPy", category: "Libraries", level: 4 },
  { name: "Pandas", category: "Libraries", level: 4 },
  { name: "LangChain", category: "Libraries", level: 2 },
  { name: "SciPy", category: "Libraries", level: 2 },
  { name: "Azure Cosmos DB", category: "Cloud", level: 4 },
  { name: "Azure Functions", category: "Cloud", level: 4 },
  { name: "Azure App Services", category: "Cloud", level: 3 },
  { name: "Azure Cognitive Services", category: "Cloud", level: 4 },
  { name: "Azure OpenAI", category: "Cloud", level: 4 },
];

// Map skill names to icons
const skillIconMap: Record<string, React.ReactNode> = {
  Python: <FaPython />,
  JavaScript: <FaJs />,
  "C++": <SiCplusplus />,
  "C#": <FaCode />,
  PowerShell: <FaCode />,
  Docker: <FaDocker />,
  "Azure DevOps Pipelines": <FaTools />,
  Flask: <SiFlask />,
  Tornado: <FaServer />,
  FastAPI: <SiFastapi />,
  "Next.js": <SiNextdotjs />,
  Streamlit: <SiStreamlit />,
  React: <FaReact />,
  Jinja: <SiJinja />,
  NumPy: <SiNumpy />,
  Pandas: <SiPandas />,
  SciPy: <SiScipy />,
  LangChain: <SiLangchain />, // Assuming LangChain is represented by OpenAI icon
  "Azure Cosmos DB": <FaDatabase />,
  "Azure Functions": <FaServer />,
  "Azure App Services": <FaServer />,
  "Azure Cognitive Services": <FaBrain />,
  "Azure OpenAI": <SiOpenai />,
};

// Map category names to icons
const categoryIconMap: Record<string, React.ReactNode> = {
  Languages: <FaCode />,
  Databases: <FaDatabase />,
  Tools: <FaTools />,
  Frontend: <FaReact />,
  Libraries: <FaBook />,
  Cloud: <FaCloud />,
  Frameworks: <SiFramework />,
};

export default function TechStackPage() {
  const t = useTranslations("cv");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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
  // const container = {
  //   hidden: { opacity: 0, height: 0 },
  //   show: {
  //     opacity: 1,
  //     height: "auto",
  //     transition: {
  //       staggerChildren: 0.1,
  //       height: { duration: 0.3 }
  //     },
  //   },
  // };

  // const item = {
  //   hidden: { opacity: 0, y: 20 },
  //   show: { opacity: 1, y: 0 },
  // };
  
  // const arrowVariants = {
  //   initial: { rotate: 0 },
  //   hover: { rotate: 180, transition: { duration: 0.3 } }
  // };
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("techStack")}
      </motion.h1>
      <div className="flex flex-col gap-8">
        {sortedCategories.map((category) => (
          <motion.div
            key={category}
            className={`bg-base-100 shadow-xl rounded-lg p-6 transition-all duration-300 cursor-pointer ${expandedCategory === category ? 'scale-105 z-10' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setExpandedCategory(category)}
            onMouseLeave={() => setExpandedCategory(null)}
            style={{ boxShadow: expandedCategory === category ? '0 8px 32px rgba(0,0,0,0.15)' : undefined }}
          >
            <div className="flex items-center mb-4 border-b pb-2">
              <span className="mr-2 text-2xl">
                {categoryIconMap[category] || <FaCode />}
              </span>
              <h2 className="text-2xl font-semibold">{category}</h2>
            </div>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={expandedCategory === category ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              {skillsByCategory[category]
                .sort((a, b) => b.level - a.level)
                .map((skill) => (
                  <li key={skill.name} className="flex items-center">
                    <span className="text-xl mr-3 ml-2">
                      {skillIconMap[skill.name] || <FaCode />}
                    </span>
                    <span className="font-medium mr-2">{skill.name}</span>
                    <div className="flex-1 flex justify-end ml-2">
                      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden w-32">
                        <motion.div
                          className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(skill.level / 5) * 100}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
