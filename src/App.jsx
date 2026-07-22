import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Layout from './components/Layout.jsx';
import SkeletonLoading from './components/SkeletonLoading.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage.jsx'));
const TimelinePage = lazy(() => import('./pages/TimelinePage.jsx'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage.jsx'));
const WebsitesPage = lazy(() => import('./pages/WebsitesPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <Helmet>
              <link rel="canonical" href="https://gaodeqingchuda.icu/" />
              <meta property="og:site_name" content="ATM Blog" />
              <meta name="twitter:card" content="summary_large_image" />
              <script type="application/ld+json">{JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "ATM Blog",
                "url": "https://gaodeqingchuda.icu/",
                "description": "A personal wiki-style blog exploring quantitative finance, AI-assisted trading, and systems engineering.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://gaodeqingchuda.icu/articles?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })}</script>
            </Helmet>
            <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(180,83,9,0.04),transparent_34%),linear-gradient(to_bottom,#FAF9F6,#F6F4EE_46%,#F2EFE8)] text-wiki-black dark:bg-[radial-gradient(circle_at_top,rgba(217,119,6,0.07),transparent_30%),linear-gradient(to_bottom,#14130F,#12110D_58%,#100F0B)] dark:text-gray-200">
              <Suspense fallback={<SkeletonLoading />}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="articles" element={<ArticlesPage />} />
                    <Route path="article/:id" element={<ArticleDetailPage />} />
                    <Route path="timeline" element={<TimelinePage />} />
                    <Route path="websites" element={<WebsitesPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </div>
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}
