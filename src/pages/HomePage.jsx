import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { articles, timelineEvents } from '../data/articles.js';
import ArticleCard from '../components/ArticleCard.jsx';

function HomePage() {
  const navigate = useNavigate();
  const featuredArticle = articles[0];
  const latestArticles = articles.slice(0, 4);
  const previewEvents = timelineEvents.slice(-4);
  const totalArticles = articles.length;
  const tags = [...new Set(articles.map(a => a.tag).filter(Boolean))];

  return (
    <>
      <Helmet>
        <title>ATM Blog — AI Tools & Development</title>
        <meta name="description" content="ATM Blog explores AI programming tools, Claude Code, TRAE IDE, and practical development insights. Personal blog about VibeCoding and modern dev workflows." />
        <link rel="canonical" href="https://gaodeqingchuda.icu/" />
        <meta property="og:title" content="ATM Blog — AI Tools & Development" />
        <meta property="og:description" content="Exploring AI programming tools, Claude Code, TRAE IDE, and modern development workflows." />
        <meta property="og:url" content="https://gaodeqingchuda.icu/" />
        <meta name="twitter:title" content="ATM Blog — AI Tools & Development" />
        <meta name="twitter:description" content="Exploring AI programming tools, Claude Code, TRAE IDE, and modern development workflows." />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="mb-10">
          <div className="intro-box border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8 mb-8 bg-white/75 dark:bg-white/5 backdrop-blur-sm shadow-card">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand dark:text-brand-light mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-brand" />
              ATM Blog
              <span className="h-px w-8 bg-brand/30" />
              AI 编程工具实践笔记
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-[1.05] tracking-tight">
                  AI 编程工具探索与实践
                </h1>
                <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl">
                  这里记录 Claude Code、TRAE、Cursor 这类工具的安装配置、工作流设计和真实使用体验。
                  重点不是炫技，而是把每一步变成可以复用的方法。
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <button
                  onClick={() => navigate('/articles')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm"
                >
                  阅读最新文章
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </button>
                <div className="text-xs text-gray-500 dark:text-gray-400 lg:text-right leading-relaxed">
                  <span className="block">{totalArticles} 篇文章</span>
                  <span className="block">{tags.length} 个主题标签</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured article spotlight */}
          {featuredArticle && (
            <div
              className="featured-card border border-brand/20 dark:border-brand/20 bg-white/85 dark:bg-[#121622] p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:border-brand/50 group shadow-card"
              onClick={() => navigate(`/article/${featuredArticle.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/article/${featuredArticle.id}`);
                }
              }}
              aria-label={`Featured: ${featuredArticle.title}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-brand dark:text-brand-light bg-brand-subtle dark:bg-brand/10 px-2.5 py-1">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1l2 4 4 .5-3 3 1 4.5-4-2-4 2 1-4.5-3-3L6 5z" />
                  </svg>
                  精选文章
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-brand/30 to-transparent" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 group-hover:text-brand dark:group-hover:text-brand-light transition-colors leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {featuredArticle.tag && (
                  <span className="font-medium px-2.5 py-1 bg-brand-subtle dark:bg-brand/10 text-brand dark:text-brand-light border border-brand/10 dark:border-brand/20">
                    {featuredArticle.tag}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 4v4l3 2" />
                  </svg>
                  {featuredArticle.readTime}
                </span>
                {featuredArticle.date && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="3" width="12" height="11" rx="1" />
                      <path d="M2 7h12" />
                    </svg>
                    {featuredArticle.date}
                  </span>
                )}
                <span className="ml-auto text-brand dark:text-brand-light font-medium text-xs group-hover:underline inline-flex items-center gap-1">
                  阅读全文
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Latest Articles */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold border-b border-wiki-border dark:border-gray-700 pb-2 flex-1">
              最新文章
            </h2>
            <button
              onClick={() => navigate('/articles')}
              className="text-sm text-brand hover:text-brand-dark dark:hover:text-brand-light ml-4 cursor-pointer font-medium transition-colors inline-flex items-center gap-1"
            >
              查看全部
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </div>

          {/* Tag pill indicators */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[11px] font-medium bg-brand-subtle dark:bg-brand/10 text-brand dark:text-brand-light border border-brand/10 dark:border-brand/20">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Timeline Preview */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold border-b border-wiki-border dark:border-gray-700 pb-2 flex-1">
              近期动态
            </h2>
            <button
              onClick={() => navigate('/timeline')}
              className="text-sm text-brand hover:text-brand-dark dark:hover:text-brand-light ml-4 cursor-pointer font-medium transition-colors inline-flex items-center gap-1"
            >
              查看时间线
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            {previewEvents.map((event, idx) => (
              <div
                key={event.date + idx}
                className="flex items-start gap-3 text-sm p-3 border-l-2 border-gray-200 dark:border-gray-700 hover:border-brand/40 dark:hover:border-brand/40 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/30 rounded-r cursor-default"
              >
                <span className="font-mono text-xs text-brand dark:text-brand-light whitespace-nowrap mt-0.5 min-w-[4rem] font-medium">
                  {event.date}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{event.event}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
