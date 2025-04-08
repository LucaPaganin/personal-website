import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content">
      <div>
        <div className="grid grid-flow-col gap-4">
          <a 
            href="https://github.com/LucaPaganin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
            aria-label="GitHub profile"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/luca-paganin-phd-1a0b1a160/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
      </div> 
      <div>
        <p>© {new Date().getFullYear()} Luca Paganin - All rights reserved</p>
      </div>
    </footer>
  );
}
