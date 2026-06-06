import { useEffect, useRef } from 'react';
import { timelineEvents } from '../data/articles.js';

function TimelinePage() {
  const eventsByYear = {};
  timelineEvents.forEach((event) => {
    if (!eventsByYear[event.date]) eventsByYear[event.date] = [];
    eventsByYear[event.date].push(event);
  });
  const years = Object.keys(eventsByYear).sort((a, b) => b.localeCompare(a));

  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-item-enter');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Timeline</h1>
      <div className="space-y-12">
        {years.map((year) => (
          <section key={year} id={`year-${year}`}>
            <h2 className="font-display text-2xl font-bold mb-6 border-b border-wiki-border pb-2">
              {year}
            </h2>
            <div className="space-y-6">
              {eventsByYear[year].map((event, idx) => (
                <div
                  key={idx}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  className="flex items-start gap-4 opacity-0"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-3 h-3 rounded-full bg-wiki-black dark:bg-gray-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm leading-relaxed">{event.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default TimelinePage;