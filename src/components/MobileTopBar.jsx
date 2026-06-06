import { useTheme } from '../context/ThemeContext.jsx';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function MobileTopBar({ onMenuToggle }) {
  const { darkMode, toggleDark } = useTheme();

  return (
    <div className="md:hidden flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <h1 className="font-display text-lg font-bold">ATM Blog</h1>
      <div className="flex items-center gap-2">
        <DarkModeToggle />
        <button
          onClick={onMenuToggle}
          className="w-9 h-9 flex items-center justify-center border border-black dark:border-gray-600 hover:bg-wiki-black hover:text-white dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
          aria-label="Toggle menu"
          aria-expanded={false}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="2" y1="4" x2="14" y2="4" />
            <line x1="2" y1="8" x2="14" y2="8" />
            <line x1="2" y1="12" x2="14" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
