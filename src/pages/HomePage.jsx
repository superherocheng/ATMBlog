import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { articles, timelineEvents } from '../data/articles.js';
import ArticleCard from '../components/ArticleCard.jsx';

function HomePage() {
  const navigate = useNavigate();
  const featuredArticle = articles[0];
  const latestArticles = articles.slice(0, 4);
  const previewEvents = timelineEvents.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>ATM Blog</title>
        <meta name="description" content="A personal wiki-style blog exploring artificial intelligence, open-source infrastructure, quantitative finance, and systems engineering." />
        <meta property="og:title" content="ATM Blog" />
        <meta property="og:description" content="A personal wiki-style blog exploring AI, infrastructure, finance, and systems engineering." />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Skip to content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:border focus:border-gray-300 focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>

        {/* Hero section with featured article */}
        <div className="mb-10">
          <div className="intro-box border border-wiki-border dark:border-gray-700 p-6 mb-8 bg-gradient-to-r from-brand-subtle/80 to-transparent dark:from-brand/5 dark:to-transparent">
            <h1 className="font-display text-3xl font-bold mb-3">ATM Blog</h1>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl">
              A personal wiki-style blog exploring artificial intelligence,
              open-source infrastructure, quantitative finance,
              and systems engineering.
            </p>
          </div>

          {/* Featured article spotlight */}
          {featuredArticle && (
            <div
              className="border border-brand/20 dark:border-brand/20 bg-gradient-to-br from-white to-brand-subtle/40 dark:from-[#1a1a2e] dark:to-brand/5 p-6 cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:border-brand/40 group"
              onClick={() => navigate(`/article/${featuredArticle.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/article/${featuredArticle.id}`);
                }
              }}
              aria-label={`Featured: ${featuredArticle.title}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-brand dark:text-brand-light">
                  Featured
                </span>
                <div className="h-px flex-1 bg-brand/20 dark:bg-brand/20" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2 group-hover:text-brand dark:group-hover:text-brand-light transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {featuredArticle.tag && (
                  <span className="font-medium px-2 py-0.5 bg-brand-subtle dark:bg-brand/10 text-brand dark:text-brand-light">
                    {featuredArticle.tag}
                  </span>
                )}
                <span>{featuredArticle.readTime}</span>
                <span className="ml-auto text-brand dark:text-brand-light font-medium text-xs group-hover:underline">
                  Read more &rarr;
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Latest Articles */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold border-b border-wiki-border dark:border-gray-700 pb-2 flex-1">
              Latest Articles
            </h2>
            <button
              onClick={() => navigate('/articles')}
              className="text-sm text-brand hover:text-brand-dark dark:hover:text-brand-light ml-4 cursor-pointer font-medium transition-colors"
            >
              View all &rarr;
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Timeline Preview */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold border-b border-wiki-border dark:border-gray-700 pb-2 flex-1">
              Timeline
            </h2>
            <button
              onClick={() => navigate('/timeline')}
              className="text-sm text-brand hover:text-brand-dark dark:hover:text-brand-light ml-4 cursor-pointer font-medium transition-colors"
            >
              View full timeline &rarr;
            </button>
          </div>
          <div className="space-y-3">
            {previewEvents.map((event, idx) => (
              <div
                key={event.date + idx}
                className="flex items-start gap-3 text-sm p-3 border-l-2 border-gray-200 dark:border-gray-700 hover:border-brand/40 dark:hover:border-brand/40 transition-colors"
              >
                <span className="font-mono text-xs text-brand dark:text-brand-light whitespace-nowrap mt-0.5 min-w-[4rem] font-medium">
                  {event.date}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{event.event}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
