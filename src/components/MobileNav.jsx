import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '../data/articles.js';

export default function MobileNav({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [animState, setAnimState] = useState('closed');

  // Manage animation states: closed → opening → open → closing → closed
  useEffect(() => {
    if (isOpen) {
      setAnimState('opening');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimState('open'));
      });
    } else {
      setAnimState('closing');
      const timer = setTimeout(() => setAnimState('closed'), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent body scroll when menu is open/animating
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap: when menu opens, focus close button; trap Tab within menu
  useEffect(() => {
    if (animState !== 'open') return;

    const menu = menuRef.current;
    if (!menu) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusable = menu.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [animState]);

  if (animState === 'closed') return null;

  const isVisible = animState === 'open' || animState === 'opening';

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50 flex flex-col transition-transform duration-300 ease-in-out"
      style={{
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Menu panel */}
      <div className="relative ml-auto w-full max-w-sm h-full bg-white dark:bg-[#121212] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <span className="font-display text-xl font-bold">ATM Blog</span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">AI 编程工具与实践笔记</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center border border-black dark:border-gray-600 hover:bg-wiki-black hover:text-white dark:hover:bg-gray-600 dark:hover:text-white transition-colors text-lg"
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>
          </div>
        </div>
        <nav className="flex-1 px-6 py-8 overflow-y-auto" aria-label="Mobile navigation">
          <ul className="space-y-4">
            {navLinks.map((link, i) => (
              <li
                key={link.view}
                style={{
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  transitionDelay: isVisible ? `${100 + i * 60}ms` : '0ms',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                <button
                  onClick={() => handleNav(link.path)}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  className={`text-lg font-medium transition-colors ${
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
      </div>
    </div>
  );
}