import { useLocation, useNavigate } from 'react-router-dom';
import { websitesData, articles } from '../data/articles.js';

export default function RightSidebar({ articles: articleList, timelineEvents }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentView = location.pathname.slice(1) || 'home';
  const currentArticleId = currentView.startsWith('article/')
    ? Number(location.pathname.split('/')[2])
    : null;

  const tags = new Set();
  articleList.forEach((article) => {
    if (article.tag) tags.add(article.tag);
  });

  const years = new Set();
  timelineEvents.forEach((event) => {
    if (event.date && event.date.length >= 4) {
      const year = parseInt(event.date.slice(0, 4), 10);
      if (!isNaN(year)) years.add(year);
    }
  });

  const sortedYears = Array.from(years).sort((a, b) => b - a);
  const latestArticles = articleList
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 3);
  const currentArticle = currentArticleId
    ? articleList.find((article) => article.id === currentArticleId)
    : null;
  const relatedArticles = currentArticle
    ? articleList.filter((article) => article.id !== currentArticle.id && article.tag === currentArticle.tag).slice(0, 3)
    : [];

  return (
    <aside className="w-56 hidden lg:block border-l border-gray-200 dark:border-gray-700 p-5 fixed top-0 right-0 h-screen z-30 overflow-y-auto bg-white dark:bg-[#121212]">
      <div className="space-y-6">
        {currentView.startsWith('article/') && currentArticle ? (
          <>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">本文</h3>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => navigate(`/article/${currentArticle.id}`)}
                  className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors"
                >
                  当前文章
                </button>
                <button
                  onClick={() => navigate('/articles')}
                  className="block w-full text-left text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand-light transition-colors"
                >
                  返回文章列表
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">相关文章</h3>
              <div className="space-y-2">
                {relatedArticles.length > 0 ? relatedArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => navigate(`/article/${article.id}`)}
                    className="block w-full text-left text-xs text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand-light transition-colors leading-relaxed py-1 border-b border-gray-50 dark:border-gray-800 last:border-0"
                  >
                    {article.title}
                  </button>
                )) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    暂时没有同标签文章，去文章列表看看其他内容。
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
        {/* Stats */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">概览</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">文章</span>
              <span className="font-medium">{articleList.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">标签</span>
              <span className="font-medium">{tags.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">资源</span>
              <span className="font-medium">{websitesData.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">时间线</span>
              <span className="font-medium">{timelineEvents.length} events</span>
            </div>
          </div>
        </div>

        {/* Quick links to articles */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">最新</h3>
          <div className="space-y-2">
            {latestArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => navigate(`/article/${article.id}`)}
                className="block w-full text-left text-xs text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand-light transition-colors leading-relaxed py-1 border-b border-gray-50 dark:border-gray-800 last:border-0"
              >
                {article.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">标签</h3>
          <div className="flex flex-wrap gap-1.5">
            {Array.from(tags).map((tag) => (
              <button
                key={tag}
                onClick={() => navigate('/articles')}
                className="text-[11px] px-2 py-0.5 bg-brand-subtle dark:bg-brand/10 text-brand dark:text-brand-light border border-brand/10 dark:border-brand/20 hover:bg-brand-lighter dark:hover:bg-brand/20 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Jump to Year (Timeline only) */}
        {currentView === 'timeline' && sortedYears.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">跳转年份</h3>
            <div className="flex flex-wrap gap-2">
              {sortedYears.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    const el = document.getElementById(`year-${year}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </aside>
  );
}
