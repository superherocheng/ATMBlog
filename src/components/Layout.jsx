import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MobileTopBar from './MobileTopBar.jsx';
import TabletNavBar from './TabletNavBar.jsx';
import MobileNav from './MobileNav.jsx';
import SidebarNav from './SidebarNav.jsx';
import RightSidebar from './RightSidebar.jsx';
import Footer from './Footer.jsx';
import MobileBottomBar from './MobileBottomBar.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import { articles, timelineEvents } from '../data/articles.js';
import { useState } from 'react';

/**
 * 平滑内容切换动画：
 * - 仅中间内容区域动画，导航栏不动
 * - 简单淡入 + 轻微上移，无缩放
 */
const contentVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12 },
  },
};

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Top Bar — fixed */}
      <MobileTopBar onMenuToggle={() => setMenuOpen((p) => !p)} />

      {/* Tablet Nav Bar — sticky */}
      <TabletNavBar />

      {/* Mobile Navigation Overlay */}
      <MobileNav
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Main Layout — sidebars + content */}
      <div className="flex min-h-screen pt-[53px] md:pt-0 md:min-h-[calc(100vh-53px)] lg:min-h-screen">
        {/* Left Sidebar (Desktop) — sticky, full height */}
        <SidebarNav />

        {/* Main Content */}
        <main
          className="flex-1 min-w-0 min-h-full flex flex-col"
          id="main-content"
          tabIndex={-1}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          <Footer />
          <MobileBottomBar articles={articles} />
        </main>

        {/* Right Sidebar (Desktop) — sticky, full height */}
        <RightSidebar
          articles={articles}
          timelineEvents={timelineEvents}
        />
      </div>

      {/* Scroll-to-top button */}
      <ScrollToTop />
    </>
  );
}
