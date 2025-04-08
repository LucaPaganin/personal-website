import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('cv');
  const pathname = usePathname();

  // CV section links
  const cvSections = [
    { name: 'experiences', path: 'experiences', icon: '💼' },
    { name: 'education', path: 'education', icon: '🎓' },
    { name: 'techStack', path: 'tech-stack', icon: '💻' },
    { name: 'publications', path: 'publications', icon: '📄' },
    { name: 'certifications', path: 'certifications', icon: '🏆' },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">
        {t('title')}
      </h1>
      
      {/* CV Navigation Tabs (desktop and mobile) */}
      <div className="tabs tabs-boxed flex mb-6 overflow-x-auto">
        {cvSections.map((section) => {
          const sectionPath = pathname.split('/').slice(0, -1).join('/') + '/' + section.path;
          const isActive = pathname === sectionPath;
          
          return (
            <Link 
              key={section.path} 
              href={sectionPath}
              className={`tab tab-lg ${isActive ? 'tab-active' : ''} whitespace-nowrap`}
            >
              <span className="mr-2">{section.icon}</span>
              {t(section.name)}
            </Link>
          );
        })}
      </div>
      
      {/* Main content */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
