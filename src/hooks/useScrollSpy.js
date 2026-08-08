import { useEffect, useState } from 'react';

// Returns the id of the heading currently in view, for scroll-spy TOC highlighting.
// Active = the last heading whose top has scrolled past `offset` px from the viewport top.
// Uses a rAF-throttled scroll listener; fine for short TOCs (≤ ~10 headings).
export function useScrollSpy(ids, offset = 120) {
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
  }, [ids.join('|'), offset]);

  return active;
}
