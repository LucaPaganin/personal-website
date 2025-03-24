import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Luca Paganin</h1>
        <ul className="flex space-x-6">
          <li><Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Home</Link></li>
          <li><Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}
