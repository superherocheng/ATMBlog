import { navLinks } from '../data/articles.js';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function TabletNavBar({ currentView, onNavigate, darkMode, toggleDark }) {
  return (
    <div className="hidden md:flex lg:hidden items-center border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <h1 className="font-display text-xl font-bold mr-8">ATM Blog</h1>
      <nav className="flex-1">
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.view}>
              <button
                onClick={() => onNavigate(link.view)}
                className={`text-sm font-medium transition-colors ${
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
      <DarkModeToggle darkMode={darkMode} toggle={toggleDark} />
    </div>
  );
}