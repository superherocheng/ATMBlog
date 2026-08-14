import { useNavigate } from 'react-router-dom';

/**
 * Highlight the characters of `query` matched inside `text` with a
 * brand-colored background. Uses the same greedy subsequence algorithm as
 * fuzzyMatch (so every filtered-in card shows its highlight), and merges
 * consecutive hits into single runs — substring matches render exactly like
 * the old indexOf version.
 */
function highlightText(text, query) {
  if (!query || !text) return text;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  const idx = [];
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      idx.push(ti);
      qi += 1;
    }
  }
  if (qi < q.length) return text;

  const parts = [];
  let last = 0;
  let i = 0;
  while (i < idx.length) {
    let j = i;
    while (j + 1 < idx.length && idx[j + 1] === idx[j] + 1) j += 1;
    const start = idx[i];
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <mark key={start} className="bg-brand-lighter dark:bg-brand/30 text-inherit px-0.5">
        {text.slice(start, idx[j] + 1)}
      </mark>
    );
    last = idx[j] + 1;
    i = j + 1;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function ArticleCard({ article, searchQuery }) {
  const navigate = useNavigate();

  return (
    <div
      className="article-card border border-hair dark:border-[#2E2B23] p-5 cursor-pointer bg-white dark:bg-[#1C1A14] group"
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
