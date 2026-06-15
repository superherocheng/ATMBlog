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
            <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.05),transparent_34%),linear-gradient(to_bottom,#fcfcff, #f7f8fc_46%,#f4f6fb)] text-wiki-black dark:bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.14),transparent_30%),linear-gradient(to_bottom,#111318,#0f1117_58%,#0d0f14)] dark:text-gray-200">
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
