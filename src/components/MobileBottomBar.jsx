import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function MobileBottomBar({ articles }) {
  const location = useLocation();
  const isArticlePage = location.pathname.startsWith('/article/');

  return (
    <div
      className={`md:hidden border-t border-gray-200 dark:border-gray-700 px-4 py-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between transition-opacity ${
        isArticlePage ? 'hidden' : ''
      }`}
    >
      <span>{articles.length} articles</span>
      <span>atmblog@gaodeqingchuda.icu</span>
    </div>
  );
}
