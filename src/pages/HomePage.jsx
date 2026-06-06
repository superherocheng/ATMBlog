import { articles, timelineEvents } from '../data/articles.js';
import ArticleCard from '../components/ArticleCard.jsx';

function HomePage({ onNavigate, onSelectArticle }) {
  const latestArticles = articles.slice(0, 4);
  const previewEvents = timelineEvents.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            onClick={() => onNavigate('articles')}
            className="text-sm text-wiki-blue hover:underline ml-4 cursor-pointer"
          >
            View all &rarr;
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onSelect={onSelectArticle} />
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
            onClick={() => onNavigate('timeline')}
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
  );
}

export default HomePage;