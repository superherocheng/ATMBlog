import { websitesData } from '../data/articles.js';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-600',
  beta: 'bg-yellow-100 text-yellow-800',
};

function WebsitesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Websites</h1>
      <div className="grid gap-6">
        {websitesData.map((site) => (
          <div key={site.id || site.name} className="border border-wiki-border p-5">
            <div className="flex items-start justify-between mb-2">
              <h2 className="font-display text-xl font-bold">{site.name}</h2>
              {site.status && (
                <span className={`text-xs px-2 py-0.5 font-medium ${statusColors[site.status.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>
                  {site.status}
                </span>
              )}
            </div>
            {site.description && <p className="text-sm text-gray-600 mb-3">{site.description}</p>}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {site.tech && <span className="text-gray-500">Tech: {site.tech}</span>}
              {site.url && (
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-wiki-blue hover:underline ml-auto">
                  Visit &rarr;
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WebsitesPage;