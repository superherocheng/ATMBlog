import { Helmet } from 'react-helmet-async';
import { websitesData } from '../data/articles.js';

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  archived: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  beta: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
};

function WebsitesPage() {
  return (
    <>
      <Helmet>
        <title>ATM Blog — Websites</title>
        <meta name="description" content={`Curated collection of ${websitesData.length} external websites and resources.`} />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Websites</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {websitesData.length} curated resources
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {websitesData.map((site) => (
            <div
              key={site.id || site.name}
              className="border border-wiki-border dark:border-gray-700 p-5 bg-white dark:bg-transparent transition-all duration-200 hover:shadow-card-hover hover:border-brand/30 dark:hover:border-brand/30 group"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand dark:group-hover:text-brand-light transition-colors">
                  {site.name}
                </h2>
                {site.status && (
                  <span className={`text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wider flex-shrink-0 ${statusColors[site.status.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>
                    {site.status}
                  </span>
                )}
              </div>
              {site.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {site.description}
                </p>
              )}
              <div className="flex items-center justify-between text-xs">
                {site.tech && (
                  <span className="text-gray-400 dark:text-gray-500 font-mono">{site.tech}</span>
                )}
                {site.url && (
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand-dark dark:hover:text-brand-light font-medium transition-colors inline-flex items-center gap-1 group/link"
                  >
                    Visit
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
