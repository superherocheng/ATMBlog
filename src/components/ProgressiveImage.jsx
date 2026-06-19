import { useState, useRef, useEffect } from 'react';

/**
 * Progressive image component with blur-up placeholder.
 * Shows a CSS blur placeholder immediately, then crossfades to the real image on load.
 */
export default function ProgressiveImage({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Reset state when src changes
    setLoaded(false);
    setError(false);

    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: 'auto' }}>
      {/* Placeholder: a subtle gradient that mimics the brand's color palette */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: loaded ? 0 : 1,
          background: error
            ? 'linear-gradient(135deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)'
            : 'linear-gradient(135deg, rgba(79,70,229,0.04) 0%, rgba(14,165,233,0.03) 50%, rgba(79,70,229,0.04) 100%)',
          backgroundSize: '400% 400%',
          animation: loaded ? 'none' : 'shimmer 2s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      {/* Real image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt || ''}
        loading="lazy"
        className={className}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
        }}
      />
    </div>
  );
}