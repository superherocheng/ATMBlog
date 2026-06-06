import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Layout from './components/Layout.jsx';
import SkeletonLoading from './components/SkeletonLoading.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage.jsx'));
const TimelinePage = lazy(() => import('./pages/TimelinePage.jsx'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage.jsx'));
const WebsitesPage = lazy(() => import('./pages/WebsitesPage.jsx'));

/**
 * 深入浅出的页面切换动画：
 * - 进入：从下方淡入并上升，带有轻微缩放
 * - 退出：淡出并轻微缩放缩小
 * - 首页进入有更丰富的效果
 */
const pageVariants = {
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -10,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const articleVariants = {
  initial: { opacity: 0, y: 30, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};

function AnimatedOutlet() {
  const location = useLocation();
  const isArticle = location.pathname.startsWith('/article/');

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={isArticle ? articleVariants : pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative"
      >
        <Suspense fallback={<SkeletonLoading />}>
          <Routes location={location}>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="articles" element={<ArticlesPage />} />
              <Route path="article/:id" element={<ArticleDetailPage />} />
              <Route path="timeline" element={<TimelinePage />} />
              <Route path="websites" element={<WebsitesPage />} />
            </Route>
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <HashRouter>
            <div className="min-h-screen bg-wiki-white text-wiki-black dark:bg-[#121212] dark:text-gray-200 overflow-x-hidden">
              <AnimatedOutlet />
            </div>
          </HashRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}
