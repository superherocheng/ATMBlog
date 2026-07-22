import { useLocation } from 'react-router-dom';

export default function MobileBottomBar({ articles }) {
  const location = useLocation();
  const isArticlePage = location.pathname.startsWith('/article/');

  return (
    <div
      className={`md:hidden border-t border-hair dark:border-[#2E2B23] px-4 py-2 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between transition-opacity bg-white/95 dark:bg-[#1C1A14]/95 backdrop-blur ${
        isArticlePage ? 'hidden' : ''
      }`}
    >
      <span>{articles.length} 篇文章</span>
      <span>ATM Blog</span>
    </div>
  );
}
