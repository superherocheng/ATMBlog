import { useNavigate } from 'react-router-dom';

/**
 * Highlight all occurrences of `query` in `text` with an orange background.
 * Returns an array of React nodes (plain strings and <mark> elements).
 */
function highlightText(text, query) {
  if (!query || !text) return text;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const parts = [];
  let lastIndex = 0;

  let idx = lower.indexOf(q, lastIndex);
  while (idx !== -1) {
    if (idx > lastIndex) {
      parts.push(text.slice(lastIndex, idx));
    }
    parts.push(
      <mark key={idx} className="bg-orange-300 dark:bg-orange-500/60 text-inherit px-0.5">
        {text.slice(idx, idx + q.length)}
      </mark>
    );
    lastIndex = idx + q.length;
    idx = lower.indexOf(q, lastIndex);
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export default function ArticleCard({ article, searchQuery }) {
  const navigate = useNavigate();

  return (
    <div
      className="article-card border border-gray-200 dark:border-gray-700 p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      onClick={() => navigate(`/article/${article.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`Read ${article.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/article/${article.id}`);
        }
      }}
    >
      <div className="flex items-center gap-3 mb-2 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {article.tag && <span className="font-medium">{article.tag}</span>}
        {article.readTime && <span>{article.readTime}</span>}
      </div>
      <h2 className="font-display text-xl font-bold mb-2">
        {searchQuery ? highlightText(article.title, searchQuery) : article.title}
      </h2>
      {article.excerpt && (
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
          {searchQuery ? highlightText(article.excerpt, searchQuery) : article.excerpt}
        </p>
      )}
      {article.date && (
        <span className="text-xs text-gray-400 dark:text-gray-500">{article.date}</span>
      )}
    </div>
  );
}
