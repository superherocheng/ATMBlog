import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>ATM Blog — 404</title>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-500 mb-8 text-sm">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="border border-wiki-black dark:border-gray-500 px-5 py-2.5 text-sm hover:bg-wiki-black hover:text-white dark:hover:bg-gray-600 transition-colors"
        >
          Go Home
        </button>
      </div>
    </>
  );
}
