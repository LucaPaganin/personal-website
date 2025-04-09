import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  // Toggle theme
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Use resolvedTheme to ensure correct icon is shown during initial render and when using system preference
  const isDark = resolvedTheme === 'dark';
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <FaSun className="h-5 w-5" />
      ) : (
        <FaMoon className="h-5 w-5" />
      )}
    </button>
  );
}
