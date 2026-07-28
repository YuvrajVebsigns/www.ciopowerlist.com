// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

// function getStoredWebsiteId(): string | undefined {
//   if (typeof window === 'undefined') return undefined;

//   try {
//     const raw = window.localStorage.getItem('websiteAuth');
//     if (!raw) return undefined;

//     const parsed: unknown = JSON.parse(raw);
//     if (typeof parsed === 'object' && parsed !== null && 'websiteId' in parsed) {
//       const websiteId = (parsed as { websiteId?: unknown }).websiteId;
//       return typeof websiteId === 'string' ? websiteId : undefined;
//     }
//   } catch {
//     return undefined;
//   }

//   return undefined;
// }

// export default function ProjectsSection() {

//   const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

//   useEffect(() => {
//     fetchWebsiteEvents(getStoredWebsiteId())
//       .then((data) => {
//         if (Array.isArray(data) && data.length) setEvents(data);
//         else setEvents([]);
//       })
//       .catch(() => setEvents([]));
//   }, []);

//   const customLeftRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//   });

//   const customRightRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//   });

//   return (
//     <section className="project-section">
//       <div className="project-container">
//         <div className="project-heading">
//           <h2 className="project-title">
//             Our Work <span>Highlights.</span>
//           </h2>
//         </div>

//         <div className="project-top-bar">
//           <h6 className="project-subtitle">
//             <Image
//               src="/assets/icon.png"
//               alt="Custom Events"
//               width={20}
//               height={20}
//               className="expertise-label-icon"
//             />
//             <span>CUSTOM EVENTS</span>
//           </h6>

//           <Link href="/events" className="talk-btn">
//             <span>More Events</span>
//             <div className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </div>
//           </Link>
//         </div>

//         <div className="project-grid">
//           {events === null ? (
//             <div className="events-loading">Loading events…</div>
//           ) : events.length === 0 ? (
//             <div className="events-empty">No events available.</div>
//           ) : (
//             // show only the first two events
//             events.slice(0, 2).map((item: WebsiteEvent, index: number) => {
//               const title = String(
//                 item.title ??
//                   (item['name'] as unknown) ??
//                   (item['eventName'] as unknown) ??
//                   'Event',
//               );
//               const slug =
//                 item.id && typeof item.id === 'string'
//                   ? String(item.id)
//                   : title
//                       .toLowerCase()
//                       .replace(/\s+/g, '-')
//                       .replace(/[^a-z0-9-]/g, '');

//               const imageSrc = String(
//                 item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp',
//               );
//               const category = String(item.category ?? 'Events');

//               return (
//                 <Link key={slug} href={`/events/${slug}`}>
//                   <div className="project-card" ref={index === 0 ? customLeftRef : customRightRef}>
//                     <div className="project-image-wrap">
//                       <Image src={imageSrc} alt={title} fill className="project-image" />
//                     </div>

//                     <div className="project-overlay">
//                       <span className="project-category">{category}</span>

//                       <div className="project-content">
//                         <h3>{title}</h3>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fetchWebsiteEvents, type WebsiteEvent } from '@/services/events.service';

const FALLBACK_EVENT_IMAGE = '/assets/blogs/blog-1.webp';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * String URL aur API media object dono handle karega.
 */
function getImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (!isRecord(value)) {
    return '';
  }

  const urlVariants = isRecord(value.urlVariants) ? value.urlVariants : null;

  return (
    getString(value.large) ||
    getString(value.medium) ||
    getString(value.small) ||
    getString(value.thumbnail) ||
    getString(value.original) ||
    getString(value.url) ||
    getString(urlVariants?.large) ||
    getString(urlVariants?.medium) ||
    getString(urlVariants?.small) ||
    getString(urlVariants?.thumbnail)
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

  const id = getString(event.id);

  if (id) {
    return id;
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

// function getEventExcerpt(event: WebsiteEvent): string {
//   return getString(event.excerpt) || getString(event.summary);
// }

// function formatEventDate(value: unknown): string {
//   const rawDate = getString(value);

//   if (!rawDate) {
//     return '';
//   }

//   const parsedDate = new Date(rawDate);

//   if (Number.isNaN(parsedDate.getTime())) {
//     return '';
//   }

//   return new Intl.DateTimeFormat('en-IN', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   }).format(parsedDate);
// }

type SafeEventImageProps = {
  src: string;
  alt: string;
};

function SafeEventImage({ src, alt }: SafeEventImageProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_EVENT_IMAGE);

  useEffect(() => {
    setImageSrc(src || FALLBACK_EVENT_IMAGE);
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

type EventCardProps = {
  event: WebsiteEvent;
  index: number;
};

function EventCard({ event, index }: EventCardProps) {
  const isEven = index % 2 === 0;

  /*
   * Har event card ka separate animation ref hoga.
   */
  const cardRef = useScrollAnimation<HTMLElement>({
    animationClass: isEven ? 'animate-fade-in-left' : 'animate-fade-in-right',

    initialTransform: isEven ? 'translateX(-40px)' : 'translateX(40px)',

    threshold: 0.05,
    once: true,
  });

  const title = getEventTitle(event);
  const slug = getEventSlug(event);
  const imageSrc = getEventImage(event);
  const category = getEventType(event);

  return (
    <Link href={`/events/${encodeURIComponent(slug)}`} className="project-card-link">
      <article
        ref={cardRef}
        className="project-card"
        style={{
          transitionDelay: `${index * 70}ms`,
        }}
      >
        <div className="project-image-wrap">
          <SafeEventImage src={imageSrc} alt={title} />
        </div>

        <div className="project-overlay">
          <div className="project-meta">
            <span className="project-category">{category}</span>

            {/* {date ? (
              <span className="project-date">
                {date}
              </span>
            ) : null} */}
          </div>

          <div className="project-content">
            <h3>{title}</h3>

            {/* {excerpt ? (
              <p>{excerpt}</p>
            ) : null} */}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProjectsSection() {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        /*
         * websiteId manually pass mat karo.
         * Updated service token aur websiteId khud handle karegi.
         */
        const eventItems = await fetchWebsiteEvents({
          page: 1,
          limit: 2,
        });

        if (!isMounted) {
          return;
        }

        setEvents(Array.isArray(eventItems) ? eventItems.slice(0, 2) : []);
      } catch (error) {
        // console.error('Failed to load homepage events:', error);

        if (!isMounted) {
          return;
        }

        setEvents([]);

        setErrorMessage(error instanceof Error ? error.message : 'Failed to load events.');
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
    <section className="project-section">
      <div className="project-container">
        <div className="project-heading">
          {/* <h2 className="project-title">
            Our Work <span>Highlights.</span>
          </h2> */}
        </div>

        <div className="project-top-bar">
          <h6 className="project-subtitle">
            <Image
              src="/assets/icon.png"
              alt=""
              width={20}
              height={20}
              className="expertise-label-icon"
            />

            <span>OUR EVENTS</span>
          </h6>

          <Link href="/events" className="talk-btn">
            <span>More Events</span>

            <span className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>

        {isLoading ? (
          <div className="events-loading">Loading events...</div>
        ) : errorMessage ? (
          <div className="events-error" role="alert">
            <h3>Unable to load events</h3>
            <p>{errorMessage}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="events-empty">No events available.</div>
        ) : (
          <div className="project-grid">
            {events.map((event, index) => (
              <EventCard
                key={event.id || event.slug || `${getEventTitle(event)}-${index}`}
                event={event}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
