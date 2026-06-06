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
    if (observerRef.current) observerRef.current.disconnect();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      itemRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-item-enter', 'opacity-100');
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

  const totalEvents = timelineEvents.length;

  return (
    <>
      <Helmet>
        <title>ATM Blog — Timeline</title>
        <meta name="description" content={`Chronological timeline of ${totalEvents} milestones from ATM Blog.`} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with count */}
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold mb-2">Timeline</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalEvents} milestone{totalEvents !== 1 ? 's' : ''} across {years.length} year{years.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Year sections */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

          {years.map((year) => (
            <section key={year} id={`year-${year}`} className="mb-12">
              {/* Year header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                  {year.slice(2)}
                </div>
                <h2 className="font-display text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {year}
                </h2>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Events for this year */}
              <div className="space-y-5 pl-0 sm:pl-14">
                {eventsByYear[year].map((event, idx) => {
                  const key = `${year}-${idx}`;
                  return (
                    <div
                      key={key}
                      ref={setRef(key)}
                      className="relative flex items-start gap-4 opacity-0 group"
                      style={{ animationDelay: `${idx * 120}ms` }}
                    >
                      {/* Dot on the timeline line */}
                      <div className="hidden sm:flex absolute -left-[38px] top-1.5">
                        <div className="w-3 h-3 rounded-full border-2 border-brand bg-white dark:bg-[#121212] timeline-dot group-hover:bg-brand group-hover:border-brand transition-colors" />
                      </div>

                      {/* Date badge */}
                      <div className="hidden sm:flex flex-shrink-0 w-20 pt-0.5">
                        <span className="font-mono text-xs font-medium text-brand dark:text-brand-light">
                          {event.date}
                        </span>
                      </div>

                      {/* Event card */}
                      <div className="flex-1 min-w-0 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-700 p-4 sm:p-5 transition-all duration-200 hover:border-brand/30 dark:hover:border-brand/30 hover:shadow-card-hover">
                        <div className="sm:hidden mb-1.5">
                          <span className="font-mono text-xs font-medium text-brand dark:text-brand-light">
                            {event.date}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                          {event.event}
                        </p>
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
