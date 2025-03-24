export default function Footer() {
  return (
    <footer className="mt-10 py-6 text-center bg-gray-200 dark:bg-gray-800">
      <p className="text-gray-700 dark:text-gray-300">Find me on:</p>
      <ul className="flex justify-center space-x-4 mt-2">
        <li><a href="https://www.linkedin.com/in/YOUR_PROFILE" className="text-blue-600 hover:underline">LinkedIn</a></li>
        <li><a href="https://github.com/YOUR_GITHUB" className="text-gray-900 dark:text-gray-300 hover:underline">GitHub</a></li>
      </ul>
    </footer>
  );
}
