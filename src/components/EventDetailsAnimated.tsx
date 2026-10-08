// 'use client';

// // import React from 'react';
// import Link from 'next/link';
// import useScrollAnimation from '../hooks/useScrollAnimation';
// import Image from 'next/image';

// type Section = {
//   heading: string;
//   body: string;
// };

// type FeaturedEvent = {
//   title: string;
//   author: string;
//   date: string;
//   comments?: string;
//   heroImage: string;
//   badge?: string;
//   summary?: string;
//   sections: Section[];
//   quote?: string;
//   quoteAuthor?: string;
// };

// function AnimatedEventSection({ section }: { section: Section }) {
//   const sectionRef = useScrollAnimation<HTMLDivElement>();

//   return (
//     <section key={section.heading} className="event-details-section" ref={sectionRef}>
//       <h2>{section.heading}</h2>
//       <p>{section.body}</p>
//     </section>
//   );
// }

// export default function EventDetailsAnimated({
//   featuredEvent,
//   readableSlug,
// }: {
//   featuredEvent: FeaturedEvent;
//   readableSlug: string;
// }) {
//   const heroRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(-24px)',
//   });
//   const metaRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(24px)',
//   });
//   const quoteRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in',
//     initialTransform: 'translateY(24px)',
//   });

//   return (
//     <>
//       <div className="event-details-hero" ref={heroRef}>
//         <div className="event-details-image-wrap">
//           <Image
//             src={featuredEvent.heroImage}
//             alt={featuredEvent.title}
//             fill
//             priority
//             className="event-details-image"
//           />
//         </div>

//         <div className="event-details-headline">
//           <span className="event-details-badge">{featuredEvent.badge}</span>
//           <h1>{featuredEvent.title}</h1>
//           <div className="event-details-breadcrumb">
//             <Link href="/">Home</Link>
//             <span>&gt;</span>
//             <Link href="/events">Events</Link>
//             <span>&gt;</span>
//             <p>{readableSlug}</p>
//           </div>
//         </div>
//       </div>

//       <div className="event-details-meta-grid" ref={metaRef}>
//         <div className="event-details-meta-card">
//           <span className="event-details-meta-label">Authored by</span>
//           <strong>{featuredEvent.author}</strong>
//         </div>
//         <div className="event-details-meta-card">
//           <span className="event-details-meta-label">Date Released</span>
//           <strong>{featuredEvent.date}</strong>
//         </div>
//       </div>

//       <article className="event-details-article">
//         {featuredEvent.summary && <p className="event-details-intro">{featuredEvent.summary}</p>}

//         {featuredEvent.quote && (
//           <div className="event-details-quote" ref={quoteRef}>
//             <div className="event-details-quote-mark">“</div>
//             <p>{featuredEvent.quote}</p>
//             <span>— {featuredEvent.quoteAuthor}</span>
//           </div>
//         )}

//         {featuredEvent.sections.map((section) => (
//           <AnimatedEventSection key={section.heading} section={section} />
//         ))}
//       </article>
//     </>
//   );
// }

'use client';

import Link from 'next/link';
import useScrollAnimation from '../hooks/useScrollAnimation';

type Section = {
  heading: string;
  body: string;
};

type FeaturedEvent = {
  title: string;
  author: string;
  date: string;
  comments?: string;
  heroImage: string;
  badge?: string;
  summary?: string;
  sections: Section[];
  quote?: string;
  quoteAuthor?: string;
};

function AnimatedEventSection({ section }: { section: Section }) {
  const sectionRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section key={section.heading} className="event-details-section" ref={sectionRef}>
      <h2>{section.heading}</h2>
      <p>{section.body}</p>
    </section>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function EventDetailsAnimated({
  featuredEvent,
  readableSlug,
}: {
  featuredEvent: FeaturedEvent;
  readableSlug: string;
}) {
  const heroRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(-24px)',
  });

  const metaRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(24px)',
  });

  const quoteRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in',
    initialTransform: 'translateY(24px)',
  });

  return (
    <>
      <div className="event-details-hero" ref={heroRef}>
        <div className="event-details-image-wrap">
          <img
            src={featuredEvent.heroImage}
            alt={featuredEvent.title}
            className="event-details-image"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="event-details-headline">
          <span className="event-details-badge">{featuredEvent.badge}</span>

          <h1>{featuredEvent.title}</h1>

          <div className="event-details-breadcrumb">
            <Link href="/">Home</Link>

            <span>&gt;</span>

            <Link href="/events">Events</Link>

            <span>&gt;</span>

            <p>{readableSlug}</p>
          </div>
        </div>
      </div>

      <div className="event-details-meta-grid" ref={metaRef}>
        <div className="event-details-meta-card">
          <span className="event-details-meta-label">Authored by</span>
          <strong>{featuredEvent.author}</strong>
        </div>

        <div className="event-details-meta-card">
          <span className="event-details-meta-label">Date Released</span>
          {/* <strong>{featuredEvent.date}</strong> */}

          <strong>{formatDate(featuredEvent.date)}</strong>
        </div>
      </div>

      <article className="event-details-article">
        {featuredEvent.summary && <p className="event-details-intro">{featuredEvent.summary}</p>}

        {featuredEvent.quote && (
          <div className="event-details-quote" ref={quoteRef}>
            <div className="event-details-quote-mark">“</div>

            <p>{featuredEvent.quote}</p>

            <span>— {featuredEvent.quoteAuthor}</span>
          </div>
        )}

        {featuredEvent.sections.map((section) => (
          <AnimatedEventSection key={section.heading} section={section} />
        ))}
      </article>
    </>
  );
}
