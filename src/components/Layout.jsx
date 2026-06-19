import { Outlet, useLocation } from 'react-router-dom';
import MobileTopBar from './MobileTopBar.jsx';
import TabletNavBar from './TabletNavBar.jsx';
import MobileNav from './MobileNav.jsx';
import SidebarNav from './SidebarNav.jsx';
import RightSidebar from './RightSidebar.jsx';
import Footer from './Footer.jsx';
import MobileBottomBar from './MobileBottomBar.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import { useScrollRestoration } from '../hooks/useScrollRestoration.js';
import { articles, timelineEvents } from '../data/articles.js';
import { useState } from 'react';
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isArticlePage = location.pathname.startsWith('/article/');
  useScrollRestoration();

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:border focus:border-gray-300 focus:px-4 focus:py-2 focus:text-sm dark:focus:bg-[#111827] dark:focus:text-white"
      >
        Skip to content
      </a>

      {/* Mobile Top Bar — fixed */}
      <MobileTopBar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((p) => !p)} />

      {/* Tablet Nav Bar — sticky */}
      <TabletNavBar />

      {/* Mobile Navigation Overlay */}
      <MobileNav
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Fixed sidebars (desktop only) + main content */}
      <SidebarNav />

      {!isArticlePage && (
        <RightSidebar
          articles={articles}
          timelineEvents={timelineEvents}
        />
      )}

      {/* Main Content */}
      <main
        className={`min-h-screen pt-[68px] md:pt-0 lg:pl-56 flex flex-col ${isArticlePage ? 'lg:pr-0' : 'lg:pr-56'}`}
        id="main-content"
        tabIndex={-1}
      >
        <div className="flex-1">
          <LayoutGroup>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                className="page-enter"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>
        </div>
        <Footer />
        <MobileBottomBar articles={articles} />
      </main>

      {/* Scroll-to-top button */}
      <ScrollToTop />
    </>
  );
}
