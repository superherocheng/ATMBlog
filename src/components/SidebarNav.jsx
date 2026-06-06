import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '../data/articles.js';

export default function SidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-56 hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-700 p-5 sticky top-0 h-screen z-30 overflow-y-auto">
      <h1
        className="font-display text-2xl font-bold mb-8 cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => navigate('/')}
      >
        ATM Blog
      </h1>

      <nav className="flex-1" aria-label="Main navigation">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.view}>
              <button
                onClick={() => navigate(link.path)}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                className={`w-full text-left px-3 py-2 rounded transition-colors text-sm font-medium ${
                  location.pathname === link.path
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

      <div className="mt-auto">
        <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">About</p>
          <p>A personal blog about quantitative trading, multi-factor strategies, and AI-assisted programming.</p>
        </div>
      </div>
    </aside>
  );
}
