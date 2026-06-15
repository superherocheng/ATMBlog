import { Helmet } from 'react-helmet-async';
import { websitesData } from '../data/articles.js';

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  archived: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  beta: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const techColors = {
  'AI': 'bg-brand-subtle text-brand dark:bg-brand/10 dark:text-brand-light',
  'Python': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
};

function WebsitesPage() {
  const techs = [...new Set(websitesData.map(s => s.tech).filter(Boolean))];

  return (
    <>
      <Helmet>
        <title>ATM Blog — Websites</title>
        <meta name="description" content={`Curated collection of ${websitesData.length} websites and resources for AI development and quantitative trading.`} />
        <link rel="canonical" href="https://gaodeqingchuda.icu/websites" />
        <meta property="og:title" content="ATM Blog — Websites" />
        <meta property="og:description" content={`Curated collection of ${websitesData.length} resources for AI tools and development.`} />
        <meta property="og:url" content="https://gaodeqingchuda.icu/websites" />
        <meta name="twitter:title" content="ATM Blog — Websites" />
        <meta name="twitter:description" content={`${websitesData.length} curated resources.`} />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2 tracking-tight">资源导航</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {websitesData.length} 个精选资源 —
            <span className="inline-flex flex-wrap gap-1.5 ml-1">
              {techs.map(tech => (
                <span key={tech} className={`text-[11px] px-1.5 py-0.5 font-medium ${techColors[tech] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                  {tech}
                </span>
              ))}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {websitesData.map((site) => (
            <div
              key={site.id || site.name}
              className="article-card border border-wiki-border dark:border-gray-700 p-5 bg-white dark:bg-[#121212] group"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100 card-title transition-colors">
                  {site.name}
                </h2>
                {site.status && (
                  <span className={`text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wider flex-shrink-0 ml-2 ${statusColors[site.status.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>
                    {site.status}
                  </span>
                )}
              </div>
              {site.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {site.description}
                </p>
              )}
              <div className="flex items-center justify-between text-xs mt-auto pt-2 border-t border-gray-50 dark:border-gray-800">
                {site.tech && (
                  <span className={`px-1.5 py-0.5 font-medium ${techColors[site.tech] || 'text-gray-400 dark:text-gray-500'}`}>
                    {site.tech}
                  </span>
                )}
                {site.url && (
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand-dark dark:hover:text-brand-light font-medium transition-colors inline-flex items-center gap-1 group/link"
                  >
                    访问
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover/link:translate-x-0.5 transition-transform">
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WebsitesPage;
