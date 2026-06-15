import { useNavigate } from 'react-router-dom';

/**
 * Highlight all occurrences of `query` in `text` with a brand-colored background.
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
      <mark key={idx} className="bg-brand-lighter dark:bg-brand/30 text-inherit px-0.5">
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
      className="article-card border border-gray-200/90 dark:border-gray-700/60 p-5 cursor-pointer bg-white/90 dark:bg-[#121622] group shadow-card"
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
      {/* Tag + read time row */}
      <div className="flex items-center gap-2.5 mb-3 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {article.tag && (
          <span className="font-medium px-2 py-0.5 bg-brand-subtle dark:bg-brand/10 text-brand dark:text-brand-light uppercase tracking-wider text-[10px] border border-brand/10 dark:border-brand/20">
            {article.tag}
          </span>
        )}
        {article.readTime && (
          <span className="text-gray-400 dark:text-gray-500 font-normal normal-case inline-flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="6" />
              <path d="M8 4v4l3 2" />
            </svg>
            {article.readTime}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-display text-xl font-bold mb-2.5 leading-snug card-title text-gray-900 dark:text-gray-100 tracking-tight">
        {searchQuery ? highlightText(article.title, searchQuery) : article.title}
      </h2>

      {/* Excerpt */}
      {article.excerpt && (
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3 card-excerpt leading-relaxed">
          {searchQuery ? highlightText(article.excerpt, searchQuery) : article.excerpt}
        </p>
      )}

      {/* Bottom row: date + arrow indicator */}
      <div className="flex items-center justify-between mt-auto">
        {article.date && (
          <span className="text-xs text-gray-400 dark:text-gray-500 card-date inline-flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="12" height="11" rx="1" />
              <path d="M2 7h12" />
            </svg>
            {article.date}
          </span>
        )}
        <span className="text-gray-300 dark:text-gray-600 group-hover:text-brand dark:group-hover:text-brand-light transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </div>
  );
}
