import { useEffect } from 'react';
import { navLinks } from '../data/articles.js';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function MobileNav({ isOpen, onClose, onNavigate, currentView, darkMode, toggleDark }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#121212] flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <span className="font-display text-xl font-bold">ATM Blog</span>
        <div className="flex items-center gap-3">
          <DarkModeToggle darkMode={darkMode} toggle={toggleDark} />
          <button onClick={onClose} className="text-2xl leading-none">&times;</button>
        </div>
      </div>
      <nav className="flex-1 px-6 py-8">
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.view}>
              <button
                onClick={() => {
                  onNavigate(link.view);
                  onClose();
                }}
                className={`text-lg font-medium transition-colors ${
                  currentView === link.view
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