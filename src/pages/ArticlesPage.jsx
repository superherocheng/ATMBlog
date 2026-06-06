import { useState } from 'react';
import { articles } from '../data/articles.js';
import { fuzzyMatch } from '../data/helper.js';
import ArticleCard from '../components/ArticleCard.jsx';

function ArticlesPage({ onSelectArticle }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = searchQuery.trim()
    ? articles.filter((a) => fuzzyMatch(searchQuery, a.title + ' ' + (a.excerpt || '') + ' ' + (a.tag || '')))
    : articles;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      onSelectArticle(filtered[0].id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-bold mb-6">Articles</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border border-wiki-border px-4 py-2 text-sm bg-transparent focus:outline-none focus:border-wiki-blue"
        />
      </div>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} onSelect={onSelectArticle} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No articles found.</p>
      )}
    </div>
  );
}

export default ArticlesPage;