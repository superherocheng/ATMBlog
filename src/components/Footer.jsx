import { useNavigate } from 'react-router-dom';
import { navLinks } from '../data/articles.js';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="text-center sm:text-left">
            <h3
              className="font-display text-lg font-bold cursor-pointer hover:opacity-70 transition-opacity tracking-tight"
              onClick={() => navigate('/')}
            >
              ATM Blog
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              AI 编程工具、工作流和实践经验的个人笔记站
            </p>
          </div>
          <nav className="flex items-center gap-5" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => navigate(link.path)}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand-light transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          &copy; 2026 ATM Blog. Built with curiosity and a lot of iteration.
        </div>
      </div>
    </footer>
  );
}
