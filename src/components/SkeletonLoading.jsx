export default function SkeletonLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse skeleton-wrapper">
      {/* Title skeleton */}
      <div className="skeleton h-8 w-48 mb-8" />

      {/* Search bar skeleton */}
      <div className="skeleton h-10 w-full mb-8" />

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 p-5">
            <div className="skeleton h-3 w-20 mb-3" />
            <div className="skeleton h-5 w-full mb-2" />
            <div className="skeleton h-5 w-3/4 mb-3" />
            <div className="skeleton h-3 w-2/3 mb-1" />
            <div className="skeleton h-3 w-1/3 mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
}
