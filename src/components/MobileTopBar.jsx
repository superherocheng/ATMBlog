import { useTheme } from '../context/ThemeContext.jsx';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function MobileTopBar({ onMenuToggle, menuOpen }) {
  useTheme();

  return (
    <div className="md:hidden flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3 fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur">
      <div>
        <h1 className="font-display text-lg font-bold tracking-tight">ATM Blog</h1>
        <p className="text-[11px] text-gray-500 dark:text-gray-400">AI 编程工具与实践笔记</p>
      </div>
      <div className="flex items-center gap-2">
        <DarkModeToggle />
        <button
          onClick={onMenuToggle}
          className="w-11 h-11 flex items-center justify-center border border-black dark:border-gray-600 hover:bg-wiki-black hover:text-white dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
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
