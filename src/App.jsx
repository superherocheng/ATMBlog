import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Layout from './components/Layout.jsx';
import SkeletonLoading from './components/SkeletonLoading.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage.jsx'));
const TimelinePage = lazy(() => import('./pages/TimelinePage.jsx'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage.jsx'));
const WebsitesPage = lazy(() => import('./pages/WebsitesPage.jsx'));

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <HashRouter>
            <div className="min-h-screen bg-wiki-white text-wiki-black dark:bg-[#121212] dark:text-gray-200">
              <Suspense fallback={<SkeletonLoading />}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="articles" element={<ArticlesPage />} />
                    <Route path="article/:id" element={<ArticleDetailPage />} />
                    <Route path="timeline" element={<TimelinePage />} />
                    <Route path="websites" element={<WebsitesPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </div>
          </HashRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}
