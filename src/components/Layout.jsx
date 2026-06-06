import { Outlet, useLocation } from 'react-router-dom';
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

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isArticleDetail = location.pathname.startsWith('/article/');

  return (
    <>
      {/* Mobile Top Bar */}
      <MobileTopBar onMenuToggle={() => setMenuOpen((p) => !p)} />

      {/* Tablet Nav Bar */}
      <TabletNavBar />

      {/* Mobile Navigation Overlay */}
      <MobileNav
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar (Desktop) */}
        <SidebarNav />

        {/* Main Content */}
        <main className="flex-1 min-h-screen" id="main-content" tabIndex={-1}>
          <div className="view-enter">
            <Outlet />
          </div>
          <Footer />
          <MobileBottomBar articles={articles} />
        </main>

        {/* Right Sidebar (Desktop) — hide on article detail for reading focus */}
        {!isArticleDetail && (
          <RightSidebar
            articles={articles}
            timelineEvents={timelineEvents}
          />
        )}
      </div>

      {/* Scroll-to-top button */}
      <ScrollToTop />
    </>
  );
}
