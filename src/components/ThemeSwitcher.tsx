import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [selectedMode, setSelectedMode] = useState(theme === 'dark' ? 'dark' : 'light');;

  // Toggle theme
  const toggleTheme = () => {
    const html = document.getElementsByTagName("html");
    const currentMode = html[0].className;

    if (currentMode === "dark") {
      html[0].className = "light";
      setTheme("light");
      setSelectedMode("light");
    } else {
      html[0].className = "dark";
      setTheme("dark");
      setSelectedMode("dark");
    }
  };

  // Use resolvedTheme to ensure correct icon is shown during initial render and when using system preference
  const isDark = selectedMode === 'dark';  return (
    <button 
      onClick={toggleTheme}
      className={`p-2 rounded-full focus:outline-none text-white hover:bg-blue-500`}
      id='btn-mode'
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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
