import { useNavigate } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  const navigate = useNavigate();

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            {idx > 0 && (
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 dark:text-gray-600">
                <path d="M6 3l5 5-5 5" />
              </svg>
            )}
            {item.path ? (
              <button
                onClick={() => navigate(item.path)}
                className="hover:text-brand dark:hover:text-brand-light transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-gray-700 dark:text-gray-300 font-medium" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
