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

  // Compute tag counts for filter chips
  const tagCounts = useMemo(() => {
    const counts = {};
    articles.forEach((a) => {
      if (a.tag) {
        counts[a.tag] = (counts[a.tag] || 0) + 1;
      }
    });
    return counts;
  }, []);

  const [activeTag, setActiveTag] = useState(null);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim();
    let result = articles;
    if (q) {
      result = result.filter((a) =>
        fuzzyMatch(q, a.title + ' ' + (a.excerpt || '') + ' ' + (a.tag || ''))
      );
    }
    if (activeTag) {
      result = result.filter((a) => a.tag === activeTag);
    }
    return result;
  }, [debouncedQuery, activeTag]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      navigate(`/article/${filtered[0].id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>ATM Blog — Articles</title>
        <meta name="description" content={`Browse ${articles.length} articles about AI programming tools, Claude Code, TRAE IDE, and modern development workflows.`} />
        <link rel="canonical" href="https://gaodeqingchuda.icu/articles" />
        <meta property="og:title" content="ATM Blog — Articles" />
        <meta property="og:description" content={`Browse ${articles.length} articles about AI tools, Claude Code, TRAE IDE, and development insights.`} />
        <meta property="og:url" content="https://gaodeqingchuda.icu/articles" />
        <meta name="twitter:title" content="ATM Blog — Articles" />
        <meta name="twitter:description" content={`Browse ${articles.length} articles about AI tools and development.`} />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2 tracking-tight">文章</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {articles.length} 篇文章，可通过搜索和标签快速筛选
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-5 sticky top-[84px] md:top-[68px] z-20 py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0 bg-gradient-to-b from-[rgba(247,248,252,0.98)] to-[rgba(247,248,252,0.85)] dark:from-[rgba(17,19,23,0.98)] dark:to-[rgba(17,19,23,0.85)] backdrop-blur">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border border-wiki-border/80 dark:border-gray-600 pl-10 pr-10 py-3 text-sm bg-white/90 dark:bg-[#121622]/90 focus:outline-none focus:border-brand dark:focus:border-brand-light transition-colors shadow-sm"
              aria-label="Search articles"
              role="searchbox"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); inputRef.current?.focus(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg leading-none"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 text-xs font-medium border transition-colors ${!activeTag ? 'bg-brand text-white border-brand dark:bg-brand dark:border-brand' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-brand dark:hover:border-brand-light'}`}
            >
              全部
            </button>
            {Object.entries(tagCounts).map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1 text-xs font-medium border transition-colors ${activeTag === tag ? 'bg-brand text-white border-brand dark:bg-brand dark:border-brand' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-brand dark:hover:border-brand-light'}`}
              >
                {tag} ({count})
              </button>
            ))}
          </div>
          {searchQuery && (
            <p className="text-xs text-gray-500 mt-2" role="status" aria-live="polite" aria-atomic="true">
              找到 {filtered.length} 条结果
              {activeTag && `，当前标签：${activeTag}`}
            </p>
          )}
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="文章列表">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} searchQuery={debouncedQuery} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-gray-200 dark:border-gray-700" role="status" aria-live="polite">
            <p className="text-sm text-gray-500 mb-3">没有找到符合条件的文章。</p>
            {(searchQuery || activeTag) && (
              <button
                onClick={() => { setSearchQuery(''); setActiveTag(null); }}
                className="text-sm text-brand hover:text-brand-dark dark:hover:text-brand-light transition-colors font-medium"
              >
                清除筛选
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ArticlesPage;
