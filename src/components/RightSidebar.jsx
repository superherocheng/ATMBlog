import { useLocation } from 'react-router-dom';
import { websitesData } from '../data/articles.js';

export default function RightSidebar({ articles, timelineEvents }) {
  const location = useLocation();
  const currentView = location.pathname.slice(1) || 'home';

  const tags = new Set();
  articles.forEach((article) => {
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

  return (
    <aside className="w-56 hidden lg:block border-l border-gray-200 dark:border-gray-700 p-5 sticky top-0 h-screen">
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Articles</span>
              <span className="font-medium">{articles.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Tags</span>
              <span className="font-medium">{tags.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Websites</span>
              <span className="font-medium">{websitesData.length}</span>
            </div>
          </div>
        </div>

        {currentView === 'timeline' && sortedYears.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Jump to Year</h3>
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

        <div className="text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700">
          atmblog@gaodeqingchuda.icu
        </div>
      </div>
    </aside>
  );
}
