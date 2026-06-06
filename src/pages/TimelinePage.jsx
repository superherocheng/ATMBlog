import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { timelineEvents } from '../data/articles.js';

function TimelinePage() {
  // Group by year extracted from 'YYYY-MM' date strings
  const eventsByYear = {};
  timelineEvents.forEach((event) => {
    const year = event.date.slice(0, 4);
    if (!eventsByYear[year]) eventsByYear[year] = [];
    eventsByYear[year].push(event);
  });
  const years = Object.keys(eventsByYear).sort((a, b) => b.localeCompare(a));

  const observerRef = useRef(null);
  const itemRefs = useRef(new Map());

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) observerRef.current.disconnect();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Show all items immediately for motion-sensitive users
      itemRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-item-enter');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const setRef = (key) => (el) => {
    if (el) {
      itemRefs.current.set(key, el);
    } else {
      itemRefs.current.delete(key);
    }
  };

  return (
    <>
      <Helmet>
        <title>ATM Blog — Timeline</title>
        <meta name="description" content="Chronological timeline of events and milestones from ATM Blog." />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Timeline</h1>
        <div className="space-y-12">
          {years.map((year) => (
            <section key={year} id={`year-${year}`}>
              <h2 className="font-display text-2xl font-bold mb-6 border-b border-wiki-border pb-2">
                {year}
              </h2>
              <div className="space-y-6">
                {eventsByYear[year].map((event, idx) => {
                  const key = `${year}-${idx}`;
                  return (
                    <div
                      key={key}
                      ref={setRef(key)}
                      className="flex items-start gap-4 opacity-0"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="w-3 h-3 rounded-full bg-wiki-black dark:bg-gray-400 mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm leading-relaxed">{event.event}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default TimelinePage;
