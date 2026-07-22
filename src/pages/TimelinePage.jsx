import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { timelineEvents } from '../data/articles.js';

function TimelinePage() {
  // Group by year extracted from 'YYYY-MM' date strings, oldest first
  const eventsByYear = {};
  [...timelineEvents]
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((event) => {
      const year = event.date.slice(0, 4);
      if (!eventsByYear[year]) eventsByYear[year] = [];
      eventsByYear[year].push(event);
    });
  const years = Object.keys(eventsByYear).sort((a, b) => a.localeCompare(b));

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
        <link rel="canonical" href="https://gaodeqingchuda.icu/timeline" />
        <meta property="og:title" content="ATM Blog — Timeline" />
        <meta property="og:description" content={`Chronological timeline of ${totalEvents} milestones in quantitative trading and AI development.`} />
        <meta property="og:url" content="https://gaodeqingchuda.icu/timeline" />
        <meta name="twitter:title" content="ATM Blog — Timeline" />
        <meta name="twitter:description" content={`Timeline of ${totalEvents} milestones from ATM Blog.`} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with count */}
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold mb-2 tracking-tight">时间线</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalEvents} 个里程碑，覆盖 {years.length} 个年份
          </p>
        </div>

        {/* Year sections */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-hair dark:bg-[#2E2B23] hidden sm:block" />

          {years.map((year) => (
            <section key={year} id={`year-${year}`} className="mb-12">
              {/* Year header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 bg-ink dark:bg-[#ECE9E1] text-white dark:text-[#14130F] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {year.slice(2)}
                </div>
                <h2 className="font-display text-xl font-bold text-gray-800 dark:text-gray-200">
                  {year}
                </h2>
                <div className="h-px flex-1 bg-hair dark:bg-[#2E2B23]" />
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
                      <div className="hidden sm:flex absolute -left-[37px] top-[5px]">
                        <div className="w-2.5 h-2.5 bg-ink dark:bg-[#ECE9E1] timeline-dot" />
                      </div>

                      {/* Date badge */}
                      <div className="hidden sm:flex flex-shrink-0 w-[5.5rem] pt-0.5 justify-end">
                        <span className="font-mono text-sm font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
                          {event.date}
                        </span>
                      </div>

                      {/* Event card */}
                      <div className="flex-1 min-w-0 bg-white dark:bg-[#1C1A14] border border-hair dark:border-[#2E2B23] p-4 sm:p-5 transition-all duration-200 hover:border-brand/30 dark:hover:border-brand/30 hover:shadow-card-hover">
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
