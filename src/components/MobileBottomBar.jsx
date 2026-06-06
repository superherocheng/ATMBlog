export default function MobileBottomBar({ articles }) {
  return (
    <div className="md:hidden border-t border-gray-200 dark:border-gray-700 px-4 py-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
      <span>{articles.length} articles</span>
      <span>atmblog@gaodeqingchuda.icu</span>
    </div>
  );
}