import { useState, useEffect, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { articles } from '../data/articles.js';
import { fuzzyMatch } from '../data/helper.js';
import ArticleCard from '../components/ArticleCard.jsx';

function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 150);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return articles;
    return articles.filter((a) =>
      fuzzyMatch(q, a.title + ' ' + (a.excerpt || '') + ' ' + (a.tag || ''))
    );
  }, [debouncedQuery]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      navigate(`/article/${filtered[0].id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>ATM Blog — Articles</title>
        <meta name="description" content={`Browse ${articles.length} articles about AI, finance, DevOps, and systems engineering.`} />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold mb-6">Articles</h1>
        <div className="mb-8">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border border-wiki-border px-4 py-2 pr-10 text-sm bg-transparent focus:outline-none focus:border-wiki-blue"
              aria-label="Search articles"
              role="searchbox"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); inputRef.current?.focus(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-gray-500 mt-2">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} searchQuery={debouncedQuery} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No articles found.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-sm text-wiki-blue hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ArticlesPage;
