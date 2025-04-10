import { getTranslations } from 'next-intl/server';
import { motion } from 'framer-motion';
import fs from 'fs';
import path from 'path';
import { 
  FaPython, FaJs, FaReact, FaDocker, 
  FaDatabase, FaCode, FaServer, FaTools 
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiFlask, SiDjango, SiNumpy, SiTensorflow } from 'react-icons/si';

// Define the Skill type
interface Skill {
  name: string;
  category: string;
  level: number; // 1-5
  icon?: string;
}

// Function to get skills data
async function getSkills(): Promise<Skill[]> {
  try {
    // Get skills from the Next.js data folder
    const filePath = path.join(process.cwd(), 'src', 'data', 'json', 'skills.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading skills:', error);
    // Return sample skills if the data cannot be loaded
    return [
      { name: "Python", category: "Languages", level: 5 },
      { name: "JavaScript", category: "Languages", level: 4 },
      { name: "TypeScript", category: "Languages", level: 4 },
      { name: "SQL", category: "Databases", level: 4 },
      { name: "Docker", category: "Tools", level: 3 },
      { name: "Flask", category: "Frameworks", level: 4 },
      { name: "Django", category: "Frameworks", level: 3 },
      { name: "React", category: "Frontend", level: 3 },
      { name: "Next.js", category: "Frontend", level: 3 },
      { name: "NumPy", category: "Libraries", level: 5 },
      { name: "TensorFlow", category: "Libraries", level: 4 }
    ];
  }
}

// Map skill names to icons
const skillIconMap: Record<string, React.ReactNode> = {
  "Python": <FaPython />,
  "JavaScript": <FaJs />,
  "TypeScript": <SiTypescript />,
  "SQL": <FaDatabase />,
  "Docker": <FaDocker />,
  "Flask": <SiFlask />,
  "Django": <SiDjango />,
  "React": <FaReact />,
  "Next.js": <SiNextdotjs />,
  "NumPy": <SiNumpy />,
  "TensorFlow": <SiTensorflow />
};

// Map category names to icons
const categoryIconMap: Record<string, React.ReactNode> = {
  "Languages": <FaCode />,
  "Databases": <FaDatabase />,
  "Tools": <FaTools />,
  "Frameworks": <FaServer />,
  "Frontend": <FaReact />,
  "Libraries": <FaCode />
};

export default async function TechStackPage() {
  const t = await getTranslations('cv');
  const skills = await getSkills();
  
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
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('techStack')}
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedCategories.map((category) => (
          <motion.div 
            key={category} 
            className="card bg-base-100 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-body">
              <h2 className="card-title flex items-center">
                <span className="mr-2 text-2xl">
                  {categoryIconMap[category] || <FaCode />}
                </span>
                {category}
              </h2>
              
              <motion.ul 
                className="mt-4 space-y-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {skillsByCategory[category]
                  .sort((a, b) => b.level - a.level) // Sort by level (highest first)
                  .map((skill) => (
                    <motion.li key={skill.name} variants={item}>
                      <div className="flex items-center mb-1">
                        <span className="text-xl mr-2">
                          {skillIconMap[skill.name] || <FaCode />}
                        </span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      
                      <div className="w-full bg-base-300 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
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
