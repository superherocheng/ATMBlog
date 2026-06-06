import { articles, articleBodies } from '../data/articles.js';

function ArticleDetailPage({ articleId, onBack }) {
  const article = articles.find((a) => a.id === articleId);
  const bodyHtml = articleBodies && articleId ? articleBodies[articleId] : null;

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={onBack} className="text-sm text-wiki-blue hover:underline mb-6 cursor-pointer">
          &larr; Back
        </button>
        <p className="text-gray-500">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="text-sm text-wiki-blue hover:underline mb-6 inline-flex items-center gap-1 cursor-pointer">
        &larr; Back
      </button>
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold mb-3">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          {article.tag && <span className="border border-gray-300 px-2 py-0.5 text-xs">{article.tag}</span>}
          {article.readTime && <span>{article.readTime}</span>}
          {article.date && <span>{article.date}</span>}
        </div>
        {article.excerpt && (
          <p className="mt-4 text-gray-600 italic leading-relaxed">{article.excerpt}</p>
        )}
      </header>
      {bodyHtml ? (
        <div className="article-body prose-sm max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      ) : (
        <p className="text-gray-500 text-sm">Article body not available.</p>
      )}
    </div>
  );
}

export default ArticleDetailPage;