// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import { fetchWebsiteEvents, type WebsiteEvent } from '@/services/events.service';

// const FALLBACK_EVENT_IMAGE = '/assets/blogs/blog-1.webp';

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function getString(value: unknown): string {
//   return typeof value === 'string' ? value.trim() : '';
// }

// // function getEventField(event: WebsiteEvent, key: string): unknown {
// //   return event[key];
// // }

// function getImageUrl(value: unknown): string {
//   if (typeof value === 'string') {
//     return value.trim();
//   }

//   if (!isRecord(value)) {
//     return '';
//   }

//   const variants = isRecord(value.urlVariants) ? value.urlVariants : null;

//   return (
//     getString(value.large) ||
//     getString(value.medium) ||
//     getString(value.small) ||
//     getString(value.thumbnail) ||
//     getString(value.original) ||
//     getString(value.url) ||
//     getString(variants?.large) ||
//     getString(variants?.medium) ||
//     getString(variants?.small) ||
//     getString(variants?.thumbnail)
//   );
// }

// function getEventTitle(event: WebsiteEvent): string {
//   return getString(event.title) || getString(event.name) || getString(event.eventName) || 'Event';
// }

// function getEventSlug(event: WebsiteEvent): string {
//   const slug = getString(event.slug);

//   if (slug) {
//     return slug;
//   }

//   const id = getString(event.id);

//   if (id) {
//     return id;
//   }

//   return getEventTitle(event)
//     .toLowerCase()
//     .replace(/\s+/g, '-')
//     .replace(/[^a-z0-9-]/g, '');
// }

// function getEventImage(event: WebsiteEvent): string {
//   return (
//     getImageUrl(event.bannerImage) ||
//     getImageUrl(event.bannerImageId) ||
//     getImageUrl(event.image) ||
//     getImageUrl(event.heroImage) ||
//     getImageUrl(event.banner) ||
//     FALLBACK_EVENT_IMAGE
//   );
// }

// function getEventType(event: WebsiteEvent): string {
//   return getString(event.type) || getString(event.category) || 'Event';
// }

// function EventImage({ src, alt }: EventImageProps) {
//   const [imageSrc, setImageSrc] = useState(src || FALLBACK_EVENT_IMAGE);

//   useEffect(() => {
//     setImageSrc(src || FALLBACK_EVENT_IMAGE);
//   }, [src]);

//   function handleImageError() {
//     if (imageSrc !== FALLBACK_EVENT_IMAGE) {
//       setImageSrc(FALLBACK_EVENT_IMAGE);
//     }
//   }

//   return (
//     <Image
//       src={imageSrc}
//       alt={alt}
//       fill
//       sizes="(max-width: 768px) 100vw, 50vw"
//       className="project-image"
//       unoptimized
//       onError={handleImageError}
//     />
//   );
// }

// type AnimatedEventCardProps = {
//   event: WebsiteEvent;
//   index: number;
// };

// function AnimatedEventCard({ event, index }: AnimatedEventCardProps) {
//   const isEven = index % 2 === 0;

//   const cardRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: isEven ? 'animate-fade-in-left' : 'animate-fade-in-right',

//     initialTransform: isEven ? 'translateX(-40px)' : 'translateX(40px)',

//     threshold: 0.12,
//     once: false,
//   });

//   const title = getEventTitle(event);
//   const slug = getEventSlug(event);
//   const image = getEventImage(event);
//   const type = getEventType(event);
//   // const excerpt = getEventExcerpt(event);

//   // const date = formatEventDate(event.startDate ?? event.startsAt ?? getEventField(event, 'date'));

//   return (
//     <Link href={`/events/${encodeURIComponent(slug)}`} className="project-card-link">
//       <article
//         ref={cardRef}
//         className="project-card"
//         style={{
//           transitionDelay: `${index * 70}ms`,
//         }}
//       >
//         <div className="project-image-wrap">
//           <EventImage src={image} alt={title} />
//         </div>

//         <div className="project-overlay">
//           <div className="project-meta">
//             <span className="project-category">{type}</span>

//             {/* {date ? (
//               <span className="project-date">
//                 {date}
//               </span>
//             ) : null} */}
//           </div>

//           <div className="project-content">
//             <h3>{title}</h3>

//             {/* {excerpt ? (
//               <p>{excerpt}</p>
//             ) : null} */}
//           </div>
//         </div>
//       </article>
//     </Link>
//   );
// }

// export default function EventsPage() {
//   const [events, setEvents] = useState<WebsiteEvent[]>([]);

//   const [isLoading, setIsLoading] = useState(true);

//   const [error, setError] = useState<string | null>(null);

//   const heroMediaRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const heroContentRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   useEffect(() => {
//     let isMounted = true;

//     async function loadEvents() {
//       try {
//         setIsLoading(true);
//         setError(null);

//         /*
//          * Service khud website token aur
//          * websiteId handle karegi.
//          */
//         const eventItems = await fetchWebsiteEvents({
//           page: 1,
//           limit: 100,
//         });

//         if (!isMounted) {
//           return;
//         }

//         setEvents(eventItems);
//       } catch (fetchError) {
//         if (!isMounted) {
//           return;
//         }

//         // console.error('Failed to load website events:', fetchError);

//         setEvents([]);

//         setError(fetchError instanceof Error ? fetchError.message : 'Failed to load events.');
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     loadEvents();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <>
//       <section className="blog-hero">
//         <div className="blog-hero-media" ref={heroMediaRef}>
//           <Image
//             src="/assets/blogs/blog-1.webp"
//             alt="Events"
//             fill
//             priority
//             sizes="100vw"
//             className="blog-hero-image"
//           />
//         </div>

//         <div className="blog-hero-overlay" />

//         <div className="blog-hero-content" ref={heroContentRef}>
//           <h1>Event Calendar</h1>

//           <div className="blog-breadcrumb">
//             <Link href="/" className="blog-breadcrumb-home">
//               🏦 Home
//             </Link>

//             <span>&gt;</span>

//             <p>Events</p>
//           </div>
//         </div>
//       </section>

//       <section className="project-section">
//         <div className="project-container">
//           {isLoading ? (
//             <div
//               className="events-loading"
//               style={{
//                 padding: '60px 20px',
//                 textAlign: 'center',
//               }}
//             >
//               Loading events...
//             </div>
//           ) : error ? (
//             <div
//               className="events-error"
//               role="alert"
//               style={{
//                 padding: '60px 20px',
//                 textAlign: 'center',
//               }}
//             >
//               <h3>Unable to load events</h3>
//               <p>{error}</p>
//             </div>
//           ) : events.length === 0 ? (
//             <div
//               className="events-empty"
//               style={{
//                 padding: '60px 20px',
//                 textAlign: 'center',
//               }}
//             >
//               No events available at the moment.
//             </div>
//           ) : (
//             <div className="project-grid">
//               {events.map((event, index) => (
//                 <AnimatedEventCard
//                   key={event.id || getEventSlug(event)}
//                   event={event}
//                   index={index}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fetchWebsiteEvents, type WebsiteEvent } from '@/services/events.service';

const FALLBACK_EVENT_IMAGE = '/assets/blogs/blog-1.webp';

type EventImageProps = {
  src: string;
  alt: string;
};

type AnimatedEventCardProps = {
  event: WebsiteEvent;
  index: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * API image string aur image object dono handle karta hai.
 */
function getImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (!isRecord(value)) {
    return '';
  }

  const variants = isRecord(value.urlVariants) ? value.urlVariants : null;

  return (
    getString(value.large) ||
    getString(value.medium) ||
    getString(value.small) ||
    getString(value.thumbnail) ||
    getString(value.original) ||
    getString(value.url) ||
    getString(variants?.large) ||
    getString(variants?.medium) ||
    getString(variants?.small) ||
    getString(variants?.thumbnail)
  );
}

function getEventTitle(event: WebsiteEvent): string {
  return getString(event.title) || getString(event.name) || getString(event.eventName) || 'Event';
}

function getEventSlug(event: WebsiteEvent): string {
  const apiSlug = getString(event.slug);

  if (apiSlug) {
    return apiSlug;
  }

  const eventId = getString(event.id);

  if (eventId) {
    return eventId;
  }

  return getEventTitle(event)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function getEventImage(event: WebsiteEvent): string {
  return (
    getImageUrl(event.bannerImage) ||
    getImageUrl(event.bannerImageId) ||
    getImageUrl(event.image) ||
    getImageUrl(event.heroImage) ||
    getImageUrl(event.banner) ||
    FALLBACK_EVENT_IMAGE
  );
}

function getEventType(event: WebsiteEvent): string {
  return getString(event.type) || getString(event.category) || 'Event';
}

function getEventExcerpt(event: WebsiteEvent): string {
  return getString(event.excerpt) || getString(event.summary);
}

function formatEventDate(value: unknown): string {
  const rawDate = getString(value);

  if (!rawDate) {
    return '';
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * API image missing ya broken hone par fallback image show karta hai.
 */
function EventImage({ src, alt }: EventImageProps) {
  const [imageSrc, setImageSrc] = useState(src?.trim() || FALLBACK_EVENT_IMAGE);

  useEffect(() => {
    setImageSrc(src?.trim() || FALLBACK_EVENT_IMAGE);
  }, [src]);

  function handleImageError() {
    if (imageSrc !== FALLBACK_EVENT_IMAGE) {
      setImageSrc(FALLBACK_EVENT_IMAGE);
    }
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="project-image"
      unoptimized
      onError={handleImageError}
    />
  );
}

function AnimatedEventCard({ event, index }: AnimatedEventCardProps) {
  const isEven = index % 2 === 0;

  const cardRef = useScrollAnimation<HTMLDivElement>({
    animationClass: isEven ? 'animate-fade-in-left' : 'animate-fade-in-right',

    initialTransform: isEven ? 'translateX(-40px)' : 'translateX(40px)',

    threshold: 0.05,
    once: true,
  });

  const title = getEventTitle(event);
  const slug = getEventSlug(event);
  const image = getEventImage(event);
  const eventType = getEventType(event);
  const excerpt = getEventExcerpt(event);

  const eventDate = formatEventDate(event.startDate ?? event.startsAt ?? event.date);

  return (
    <Link href={`/events/${encodeURIComponent(slug)}`} className="project-card-link">
      <div
        ref={cardRef}
        className="project-card"
        style={{
          transitionDelay: `${index * 70}ms`,
        }}
      >
        <div className="project-image-wrap">
          <EventImage src={image} alt={title} />
        </div>

        <div className="project-overlay">
          <div className="project-meta">
            <span className="project-category">{eventType}</span>

            {eventDate ? <span className="project-date">{eventDate}</span> : null}
          </div>

          <div className="project-content">
            <h3>{title}</h3>

            {excerpt ? <p>{excerpt}</p> : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroMediaRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: true,
  });

  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        setIsLoading(true);
        setError(null);

        const eventItems = await fetchWebsiteEvents({
          page: 1,
          limit: 100,
        });

        if (!isMounted) {
          return;
        }

        setEvents(Array.isArray(eventItems) ? eventItems : []);
      } catch (fetchError: unknown) {
        if (!isMounted) {
          return;
        }

        // console.error('Failed to load website events:', fetchError);

        setEvents([]);

        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load events.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Events"
            fill
            priority
            sizes="100vw"
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay" />

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Event Calendar</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Events</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="project-container">
          {isLoading ? (
            <div className="events-loading">Loading events...</div>
          ) : error ? (
            <div className="events-error" role="alert">
              <h3>Unable to load events</h3>
              <p>{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="events-empty">No events available at the moment.</div>
          ) : (
            <div className="project-grid">
              {events.map((event, index) => (
                <AnimatedEventCard
                  key={event.id || event.slug || `${getEventTitle(event)}-${index}`}
                  event={event}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
