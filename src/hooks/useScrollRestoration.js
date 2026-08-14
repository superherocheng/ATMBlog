import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Push navigations (clicking into a page) start at the top; POP navigations
// (browser Back/Forward) are left to the browser's native scroll restoration,
// so returning to the articles list keeps your scroll position.
export function useScrollRestoration() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP') return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, navigationType]);
}
