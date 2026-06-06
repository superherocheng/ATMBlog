import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '../data/articles.js';
import { useTheme } from '../context/ThemeContext.jsx';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function MobileNav({ isOpen, onClose }) {
  const { darkMode, toggleDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#121212] flex flex-col" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <span className="font-display text-xl font-bold">ATM Blog</span>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <button onClick={onClose} className="text-2xl leading-none" aria-label="Close menu">&times;</button>
        </div>
      </div>
      <nav className="flex-1 px-6 py-8" aria-label="Mobile navigation">
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.view}>
              <button
                onClick={() => handleNav(link.path)}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                className={`text-lg font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-black dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
