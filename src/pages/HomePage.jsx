import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { articles, timelineEvents } from '../data/articles.js';
import ArticleCard from '../components/ArticleCard.jsx';

function HomePage() {
  const navigate = useNavigate();
  const latestArticles = articles.slice(0, 4);
  const previewEvents = timelineEvents.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>ATM Blog — Home</title>
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

        {/* Intro Box */}
        <div className="intro-box border border-wiki-border p-6 mb-8">
          <p className="text-sm leading-relaxed">
            Welcome to <strong>ATM Blog</strong> — a personal wiki-style blog exploring
            artificial intelligence, open-source infrastructure, quantitative finance,
            and systems engineering.
          </p>
        </div>

        {/* Latest Articles */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold border-b border-wiki-border pb-2 flex-1">
              Latest Articles
            </h2>
            <button
              onClick={() => navigate('/articles')}
              className="text-sm text-wiki-blue hover:underline ml-4 cursor-pointer"
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
            <h2 className="font-display text-2xl font-bold border-b border-wiki-border pb-2 flex-1">
              Timeline
            </h2>
            <button
              onClick={() => navigate('/timeline')}
              className="text-sm text-wiki-blue hover:underline ml-4 cursor-pointer"
            >
              View full timeline &rarr;
            </button>
          </div>
          <div className="space-y-3">
            {previewEvents.map((event, idx) => (
              <div key={event.date + idx} className="flex items-start gap-3 text-sm">
                <span className="font-mono text-xs text-gray-500 whitespace-nowrap mt-0.5 min-w-[4rem]">
                  {event.date}
                </span>
                <span className="font-medium">{event.event}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
