import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-top-btn w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e1e2e] text-gray-600 dark:text-gray-400 hover:bg-brand hover:text-white dark:hover:bg-brand dark:hover:text-white transition-colors shadow-elevated ${visible ? 'visible' : ''}`}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 10l5-5 5 5" />
      </svg>
    </button>
  );
}
