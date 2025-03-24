import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-10 py-6 text-center bg-gray-200 dark:bg-gray-800">
      <p className="text-gray-700 dark:text-gray-300">Find me on:</p>
      <ul className="flex justify-center space-x-4 mt-2">
        <li>
          <a href="https://www.linkedin.com/in/luca-paganin-phd-1a0b1a160" className="text-blue-600 hover:underline">
            <FaLinkedin size={24} />
          </a>
        </li>
        <li>
          <a href="https://github.com/LucaPaganin" className="text-gray-900 dark:text-gray-300 hover:underline">
            <FaGithub size={24} />
          </a>
        </li>
      </ul>
    </footer>
  );
}
