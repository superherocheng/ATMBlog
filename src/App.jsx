import { useState, useEffect } from 'react';
import MobileNav from './components/MobileNav.jsx';
import SidebarNav from './components/SidebarNav.jsx';
import RightSidebar from './components/RightSidebar.jsx';
import TabletNavBar from './components/TabletNavBar.jsx';
import MobileTopBar from './components/MobileTopBar.jsx';
import MobileBottomBar from './components/MobileBottomBar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ArticlesPage from './pages/ArticlesPage.jsx';
import TimelinePage from './pages/TimelinePage.jsx';
import ArticleDetailPage from './pages/ArticleDetailPage.jsx';
import WebsitesPage from './pages/WebsitesPage.jsx';
import { articles, timelineEvents } from './data/articles.js';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigate = (view) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentView(view);
      setSelectedArticleId(null);
      setMenuOpen(false);
      setIsFading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  };

  const handleSelectArticle = (id) => {
    setSelectedArticleId(id);
    setIsFading(true);
    setTimeout(() => {
      setCurrentView('article');
      setMenuOpen(false);
      setIsFading(false);
    }, 150);
  };

  const handleBack = () => {
    setSelectedArticleId(null);
    handleNavigate('home');
  };

  const toggleDark = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('darkMode', next);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-wiki-white text-wiki-black dark:bg-[#121212] dark:text-gray-200">
      {/* Mobile Top Bar */}
      <MobileTopBar
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        darkMode={darkMode}
        toggleDark={toggleDark}
      />

      {/* Tablet Nav Bar */}
      <TabletNavBar
        currentView={currentView}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        toggleDark={toggleDark}
      />

      {/* Mobile Navigation Overlay */}
      <MobileNav
        isOpen={menuOpen}
        onNavigate={handleNavigate}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        darkMode={darkMode}
        toggleDark={toggleDark}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar (Desktop) */}
        <SidebarNav
          currentView={currentView}
          onNavigate={handleNavigate}
          darkMode={darkMode}
          toggleDark={toggleDark}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className={isFading ? 'opacity-0 transition-opacity duration-150' : 'view-enter'}>
            {currentView === 'home' && (
              <HomePage onNavigate={handleNavigate} onSelectArticle={handleSelectArticle} />
            )}
            {currentView === 'articles' && (
              <ArticlesPage onSelectArticle={handleSelectArticle} />
            )}
            {currentView === 'timeline' && <TimelinePage />}
            {currentView === 'article' && (
              <ArticleDetailPage articleId={selectedArticleId} onBack={handleBack} />
            )}
            {currentView === 'websites' && <WebsitesPage />}
          </div>

          {/* Footer */}
          <Footer />

          {/* Mobile Bottom Bar */}
          <MobileBottomBar articles={articles} />
        </main>

        {/* Right Sidebar (Desktop) */}
        <RightSidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          articles={articles}
          timelineEvents={timelineEvents}
        />
      </div>
    </div>
  );
}

export default App;