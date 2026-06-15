import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks, articles } from '../data/articles.js';

export default function SidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-56 hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-700 p-5 fixed top-0 left-0 h-screen z-30 overflow-y-auto bg-white dark:bg-[#121212]">
      <h1
        className="font-display text-2xl font-bold mb-1 cursor-pointer hover:opacity-70 transition-opacity tracking-tight"
        onClick={() => navigate('/')}
      >
        ATM Blog
      </h1>
      <p className="text-xs text-gray-500 dark:text-gray-500 mb-8 leading-relaxed">
        AI 编程工具、工作流和实践笔记
      </p>

      <nav className="flex-1" aria-label="Main navigation">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.view}>
              <button
                onClick={() => navigate(link.path)}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-all text-sm font-medium ${
                  location.pathname === link.path
                  ? 'bg-brand text-white dark:bg-brand dark:text-white shadow-sm shadow-brand/15'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">关于</p>
          <p>记录 AI 编程工具、VibeCoding 工作流，以及量化与开发实践中的真实心得。</p>
        </div>

        {/* Mini stats */}
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400 dark:text-gray-500">
          <span className="inline-flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4h12M2 8h12M2 12h8" />
            </svg>
            {articles.length} 篇文章
          </span>
        </div>
      </div>
    </aside>
  );
}
