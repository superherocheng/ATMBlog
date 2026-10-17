import { useEffect, useState } from 'react';

export default function VisitCounter() {
  const [today, setToday] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/visit', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (!cancelled && Number.isFinite(data.today)) setToday(data.today);
      })
      .catch(() => {
        // Counter is decorative: if the endpoint is unavailable, render nothing.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (today === null) return null;

  return (
    <div className="visit-counter" aria-live="polite">
      今日访问次数：<span className="tabular-nums font-medium">{today}</span>
    </div>
  );
}
