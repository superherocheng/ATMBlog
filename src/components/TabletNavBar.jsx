import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { navLinks } from '../data/articles.js';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function TabletNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="hidden md:flex lg:hidden items-center border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <h1
        className="font-display text-xl font-bold mr-8 cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => navigate('/')}
      >
        ATM Blog
      </h1>
      <nav className="flex-1" aria-label="Tablet navigation">
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.view}>
              <button
                onClick={() => navigate(link.path)}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                className={`text-sm font-medium transition-colors ${
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
      <DarkModeToggle />
    </div>
  );
}
