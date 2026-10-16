// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react';
// import { useEffect, useState } from 'react';

// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import { fetchWebsiteEvents, type WebsiteEvent } from '@/services/events.service';

// const FALLBACK_EVENT_IMAGE = '/assets/blogs/blog-1.webp';

// const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.core-mediagroup.com').replace(
//   /\/+$/,
//   '',
// );

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null && !Array.isArray(value);
// }

// function getString(value: unknown): string {
//   return typeof value === 'string' ? value.trim() : '';
// }

// function normalizeImageUrl(value: string): string {
//   const raw = value.trim();

//   if (!raw) {
//     return '';
//   }

//   if (/^(https?:\/\/|data:image\/|blob:)/i.test(raw)) {
//     return raw;
//   }

//   if (raw.startsWith('//')) {
//     return `https:${raw}`;
//   }

//   if (raw.startsWith('/assets/')) {
//     return raw;
//   }

//   if (raw.startsWith('/')) {
//     return `${API_BASE_URL}${raw}`;
//   }

//   return `${API_BASE_URL}/${raw.replace(/^\.?\//, '')}`;
// }

// /**
//  * Extracts an image URL from strings and nested backend media objects.
//  */
// function getImageUrl(value: unknown, depth = 0): string {
//   // if (value == null || depth > 5) {
//   //   return '';
//   // }
//   if (value === null || value === undefined || depth > 5) {
//     return '';
//   }

//   if (typeof value === 'string') {
//     return normalizeImageUrl(value);
//   }

//   if (Array.isArray(value)) {
//     for (const item of value) {
//       const result = getImageUrl(item, depth + 1);

//       if (result) {
//         return result;
//       }
//     }

//     return '';
//   }

//   if (!isRecord(value)) {
//     return '';
//   }

//   const directKeys: string[] = [
//     'url',
//     'src',
//     'imageUrl',
//     'imageURL',
//     'fileUrl',
//     'secure_url',
//     'location',
//     'path',
//     'original',
//     'large',
//     'medium',
//     'small',
//     'thumbnail',
//   ];

//   for (const key of directKeys) {
//     const candidate: unknown = value[key];

//     if (typeof candidate === 'string' && candidate.trim()) {
//       return normalizeImageUrl(candidate);
//     }
//   }

//   const urlVariants: unknown = value['urlVariants'];

//   if (isRecord(urlVariants)) {
//     const variantKeys: string[] = ['large', 'medium', 'small', 'thumbnail', 'original', 'url'];

//     for (const key of variantKeys) {
//       const candidate: unknown = urlVariants[key];

//       if (typeof candidate === 'string' && candidate.trim()) {
//         return normalizeImageUrl(candidate);
//       }
//     }
//   }

//   const nestedKeys: string[] = [
//     'data',
//     'attributes',
//     'media',
//     'image',
//     'file',
//     'bannerImage',
//     'heroImage',
//   ];

//   for (const key of nestedKeys) {
//     // Safe indexed access: value has already been narrowed to a Record.
//     const nested: unknown = value[key];

//     if (nested !== null && nested !== undefined && nested !== value) {
//       const result = getImageUrl(nested, depth + 1);

//       if (result) {
//         return result;
//       }
//     }
//   }

//   return '';
// }

// function getEventTitle(event: WebsiteEvent): string {
//   return getString(event.title) || getString(event.name) || getString(event.eventName) || 'Event';
// }

// function getEventSlug(event: WebsiteEvent): string {
//   const apiSlug = getString(event.slug);

//   if (apiSlug) {
//     return apiSlug;
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
//   const candidates: unknown[] = [
//     event.bannerImage,
//     event.bannerImageId,
//     event.image,
//     event.heroImage,
//     event.banner,
//   ];

//   for (const candidate of candidates) {
//     const imageUrl = getImageUrl(candidate);

//     if (imageUrl) {
//       return imageUrl;
//     }
//   }

//   return FALLBACK_EVENT_IMAGE;
// }

// function getEventType(event: WebsiteEvent): string {
//   return getString(event.type) || getString(event.category) || 'Event';
// }

// type SafeEventImageProps = {
//   src: string;
//   alt: string;
// };

// function SafeEventImage({ src, alt }: SafeEventImageProps) {
//   const [imageSrc, setImageSrc] = useState(src || FALLBACK_EVENT_IMAGE);

//   const [fallbackAttempted, setFallbackAttempted] = useState(false);

//   useEffect(() => {
//     setImageSrc(src || FALLBACK_EVENT_IMAGE);
//     setFallbackAttempted(false);
//   }, [src]);

//   function handleImageError() {
//     if (!fallbackAttempted && imageSrc !== FALLBACK_EVENT_IMAGE) {
//       setFallbackAttempted(true);
//       setImageSrc(FALLBACK_EVENT_IMAGE);
//     }
//   }

//   return (
//     <img
//       src={imageSrc}
//       alt={alt}
//       className="project-image"
//       loading="lazy"
//       decoding="async"
//       onError={handleImageError}
//     />
//   );
// }

// type EventCardProps = {
//   event: WebsiteEvent;
//   index: number;
// };

// function EventCard({ event, index }: EventCardProps) {
//   const isEven = index % 2 === 0;

//   const cardRef = useScrollAnimation<HTMLElement>({
//     animationClass: isEven ? 'animate-fade-in-left' : 'animate-fade-in-right',
//     initialTransform: isEven ? 'translateX(-40px)' : 'translateX(40px)',
//     threshold: 0.05,
//     once: true,
//   });

//   const title = getEventTitle(event);
//   const slug = getEventSlug(event);
//   const imageSrc = getEventImage(event);
//   const category = getEventType(event);

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
//           <SafeEventImage src={imageSrc} alt={title} />
//         </div>

//         <div className="project-overlay">
//           <div className="project-meta">
//             <span className="project-category">{category}</span>
//           </div>

//           <div className="project-content">
//             <h3>{title}</h3>
//           </div>
//         </div>
//       </article>
//     </Link>
//   );
// }

// export default function ProjectsSection() {
//   const [events, setEvents] = useState<WebsiteEvent[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     let isMounted = true;

//     async function loadEvents() {
//       try {
//         setIsLoading(true);
//         setErrorMessage('');

//         const eventItems = await fetchWebsiteEvents({
//           page: 1,
//           limit: 2,
//         });

//         if (!isMounted) {
//           return;
//         }

//         setEvents(Array.isArray(eventItems) ? eventItems.slice(0, 2) : []);
//       } catch (error: unknown) {
//         if (!isMounted) {
//           return;
//         }

//         setEvents([]);

//         setErrorMessage(error instanceof Error ? error.message : 'Failed to load events.');
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     void loadEvents();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <section className="project-section">
//       <div className="project-container">
//         <div className="project-heading" />

//         <div className="project-top-bar">
//           <h6 className="project-subtitle">
//             <Image
//               src="/assets/icon.png"
//               alt=""
//               width={20}
//               height={20}
//               className="expertise-label-icon"
//             />

//             <span>OUR EVENTS</span>
//           </h6>

//           <Link href="/events" className="talk-btn">
//             <span>More Events</span>

//             <span className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </span>
//           </Link>
//         </div>

//         {isLoading ? (
//           <div className="events-loading">Loading events...</div>
//         ) : errorMessage ? (
//           <div className="events-error" role="alert">
//             <h3>Unable to load events</h3>
//             <p>{errorMessage}</p>
//           </div>
//         ) : events.length === 0 ? (
//           <div className="events-empty">No events available.</div>
//         ) : (
//           <div className="project-grid">
//             {events.map((event, index) => (
//               <EventCard
//                 key={event.id || event.slug || `${getEventTitle(event)}-${index}`}
//                 event={event}
//                 index={index}
//               />
//             ))}
//           </div>
//         )}
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

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.core-mediagroup.com').replace(
  /\/+$/,
  '',
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeImageUrl(value: string): string {
  const raw = value.trim();

  if (!raw) {
    return '';
  }

  if (/^(https?:\/\/|data:image\/|blob:)/i.test(raw)) {
    return raw;
  }

  if (raw.startsWith('//')) {
    return `https:${raw}`;
  }

  if (raw.startsWith('/assets/')) {
    return raw;
  }

  if (raw.startsWith('/')) {
    return `${API_BASE_URL}${raw}`;
  }

  return `${API_BASE_URL}/${raw.replace(/^\.?\//, '')}`;
}

/**
 * Extracts an image URL from strings and nested backend media objects.
 */
function getImageUrl(value: unknown, depth = 0): string {
  if (value === null || value === undefined || depth > 5) {
    return '';
  }

  if (typeof value === 'string') {
    return normalizeImageUrl(value);
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const result = getImageUrl(item, depth + 1);

      if (result) {
        return result;
      }
    }

    return '';
  }

  if (!isRecord(value)) {
    return '';
  }

  const directKeys: string[] = [
    'url',
    'src',
    'imageUrl',
    'imageURL',
    'fileUrl',
    'secure_url',
    'location',
    'path',
    'original',
    'large',
    'medium',
    'small',
    'thumbnail',
  ];

  for (const key of directKeys) {
    const candidate: unknown = value[key];

    if (typeof candidate === 'string' && candidate.trim()) {
      return normalizeImageUrl(candidate);
    }
  }

  const urlVariants: unknown = value['urlVariants'];

  if (isRecord(urlVariants)) {
    const variantKeys: string[] = ['large', 'medium', 'small', 'thumbnail', 'original', 'url'];

    for (const key of variantKeys) {
      const candidate: unknown = urlVariants[key];

      if (typeof candidate === 'string' && candidate.trim()) {
        return normalizeImageUrl(candidate);
      }
    }
  }

  const nestedKeys: string[] = [
    'data',
    'attributes',
    'media',
    'image',
    'file',
    'bannerImage',
    'heroImage',
  ];

  for (const key of nestedKeys) {
    const nested: unknown = value[key];

    if (nested !== null && nested !== undefined && nested !== value) {
      const result = getImageUrl(nested, depth + 1);

      if (result) {
        return result;
      }
    }
  }

  return '';
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
  const candidates: unknown[] = [
    event.bannerImage,
    event.bannerImageId,
    event.image,
    event.heroImage,
    event.banner,
  ];

  for (const candidate of candidates) {
    const imageUrl = getImageUrl(candidate);

    if (imageUrl) {
      return imageUrl;
    }
  }

  return FALLBACK_EVENT_IMAGE;
}

function getEventType(event: WebsiteEvent): string {
  return getString(event.type) || getString(event.category) || 'Event';
}

type SafeEventImageProps = {
  src: string;
  alt: string;
};

function SafeEventImage({ src, alt }: SafeEventImageProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_EVENT_IMAGE);

  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  useEffect(() => {
    setImageSrc(src || FALLBACK_EVENT_IMAGE);
    setFallbackAttempted(false);
  }, [src]);

  function handleImageError() {
    if (!fallbackAttempted && imageSrc !== FALLBACK_EVENT_IMAGE) {
      setFallbackAttempted(true);
      setImageSrc(FALLBACK_EVENT_IMAGE);
    }
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="project-image"
      loading="lazy"
      decoding="async"
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
          </div>

          <div className="project-content">
            <h3>{title}</h3>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProjectsSection() {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const eventItems = await fetchWebsiteEvents({
          page: 1,
          limit: 2,
        });

        if (!isMounted) {
          return;
        }

        setEvents(Array.isArray(eventItems) ? eventItems.slice(0, 2) : []);
      } catch (error: unknown) {
        if (!isMounted) {
          return;
        }

        // console.error('Failed to load events:', error);
        setEvents([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  // Hide the complete section while loading or when no events exist.
  if (isLoading || events.length === 0) {
    return null;
  }

  return (
    <section className="project-section">
      <div className="project-container">
        <div className="project-heading" />

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

        <div className="project-grid">
          {events.map((event, index) => (
            <EventCard
              key={event.id || event.slug || `${getEventTitle(event)}-${index}`}
              event={event}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
