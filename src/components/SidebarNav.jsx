import { navLinks } from '../data/articles.js';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function SidebarNav({ currentView, onNavigate, darkMode, toggleDark }) {
  return (
    <aside className="w-56 hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-700 p-5 sticky top-0 h-screen">
      <h1 className="font-display text-2xl font-bold mb-8">ATM Blog</h1>

      <nav className="flex-1">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.view}>
              <button
                onClick={() => onNavigate(link.view)}
                className={`w-full text-left px-3 py-2 rounded transition-colors text-sm font-medium ${
                  currentView === link.view
                    ? 'bg-wiki-black text-white dark:bg-gray-600 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto space-y-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">About</p>
          <p>A personal blog about technology, life, and everything in between.</p>
        </div>

        <DarkModeToggle darkMode={darkMode} toggle={toggleDark} />
      </div>
    </aside>
  );
}