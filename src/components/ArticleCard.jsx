export default function ArticleCard({ article, onSelect }) {
  return (
    <div
      className="article-card border border-gray-200 dark:border-gray-700 p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      onClick={() => onSelect(article.id)}
    >
      <div className="flex items-center gap-3 mb-2 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {article.tag && <span className="font-medium">{article.tag}</span>}
        {article.readTime && <span>{article.readTime}</span>}
      </div>
      <h2 className="font-display text-xl font-bold mb-2">{article.title}</h2>
      {article.excerpt && (
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">{article.excerpt}</p>
      )}
      {article.date && (
        <span className="text-xs text-gray-400 dark:text-gray-500">{article.date}</span>
      )}
    </div>
  );
}