import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles.js';
import { getArticleBody } from '../data/content.js';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const articleId = Number(id);
  const article = articles.find((a) => a.id === articleId);
  const bodyMarkdown = getArticleBody(articleId);

  if (!article) {
    return (
      <>
        <Helmet>
          <title>ATM Blog — Not Found</title>
        </Helmet>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => navigate(-1)} className="text-sm text-wiki-blue hover:underline mb-6 cursor-pointer">
            &larr; Back
          </button>
          <div className="text-center py-16">
            <h1 className="font-display text-3xl font-bold mb-4">Article not found</h1>
            <p className="text-gray-500 mb-6 text-sm">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/articles')}
              className="border border-wiki-black dark:border-gray-500 px-4 py-2 text-sm hover:bg-wiki-black hover:text-white dark:hover:bg-gray-600 transition-colors"
            >
              Browse articles
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} — ATM Blog</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="text-sm text-wiki-blue hover:underline mb-6 inline-flex items-center gap-1 cursor-pointer">
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
        {bodyMarkdown ? (
          <div className="article-body prose-sm max-w-none leading-relaxed">
            <Markdown remarkPlugins={[remarkGfm]}>
              {bodyMarkdown}
            </Markdown>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Article body not available.</p>
        )}
      </div>
    </>
  );
}

export default ArticleDetailPage;
