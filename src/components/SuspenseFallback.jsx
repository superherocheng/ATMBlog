import { useState, useEffect, useRef } from 'react';

/**
 * Suspense fallback wrapper that ensures a minimum display time
 * to prevent visual flash when loading is very fast (< 300ms).
 */
export default function SuspenseFallback({ children, minDisplayMs = 300 }) {
  const [show, setShow] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShow(false);
    }, minDisplayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [minDisplayMs]);

  // Always show children for at least minDisplayMs, then hide
  // When the actual content loads, React removes the fallback entirely
  return show ? children : null;
}