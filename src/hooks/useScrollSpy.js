import { useEffect, useState } from 'react';

// Returns the id of the heading currently in view, for scroll-spy TOC highlighting.
// Active = the last heading whose top has scrolled past `offset` px from the viewport top.
// Uses a rAF-throttled scroll listener; fine for short TOCs (≤ ~10 headings).
// `refreshKey` re-runs the position pass when layout shifts without a scroll —
// e.g. expanding/collapsing an article section moves every heading below it.
export function useScrollSpy(ids, offset = 120, refreshKey) {
  const [active, setActive] = useState(ids[0] || null);

  useEffect(() => {
    if (!ids.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) cur = id;
      }
      setActive((prev) => (prev === cur ? prev : cur));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids.join('|'), offset, refreshKey]);

  return active;
}
