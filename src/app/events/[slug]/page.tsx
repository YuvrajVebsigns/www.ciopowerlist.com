'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowUpLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

import ClientErrorBoundary from '@/components/ClientErrorBoundary';
import EventDetailsAnimated from '@/components/EventDetailsAnimated';
// import EventSponsorsSection from '@/components/EventSponsorsSection';

import {
  fetchWebsiteEventByIdOrSlug,
  fetchWebsiteEvents,
  type WebsiteEvent,
} from '@/services/events.service';

type EventSection = {
  heading: string;
  body: string;
};

type EventSponsor = {
  id: string;
  personName: string;
  companyName: string;
  designation: string;
  description: string;
  website: string;
  tier: string;
  type: string;
  logo: string;
  sortOrder: number;
};

type SponsorLogoProps = {
  src: string;
  alt: string;
};

const FALLBACK_EVENT_IMAGE = '/assets/blogs/blog-1.webp';
const FALLBACK_SPONSOR_IMAGE = '/assets/logo/Heading.png';

/* =========================================================
   HELPERS
========================================================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

function getNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function getEventField(event: WebsiteEvent, key: string): unknown {
  return (event as unknown as Record<string, unknown>)[key];
}

/**
 * External + local image URLs are supported.
 *
 * IMPORTANT:
 * Dynamic external URLs are rendered with native <img>
 * instead of next/image, so next.config.js is not required.
 */
function isUsableImageSource(value: string): boolean {
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('/') ||
    value.startsWith('data:') ||
    value.startsWith('blob:')
  );
}

/**
 * Handles:
 * - normal string URLs
 * - populated media objects
 * - urlVariants
 * - original / large / medium / small / thumbnail
 */
function getImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    const source = value.trim();

    return isUsableImageSource(source) ? source : '';
  }

  if (!isRecord(value)) {
    return '';
  }

  const urlVariants = isRecord(value.urlVariants) ? value.urlVariants : null;

  const possibleSources = [
    getString(value.url),
    getString(value.original),
    getString(value.large),
    getString(value.medium),
    getString(value.small),
    getString(value.thumbnail),
    getString(urlVariants?.large),
    getString(urlVariants?.medium),
    getString(urlVariants?.small),
    getString(urlVariants?.thumbnail),
  ];

  return possibleSources.find((source) => source && isUsableImageSource(source)) ?? '';
}

function normalizeExternalUrl(value: unknown): string {
  const url = getString(value);

  if (!url) {
    return '';
  }

  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url;
  }

  return `https://${url}`;
}

/* =========================================================
   CONTENT HELPERS
========================================================= */

function extractTextFromContent(content: unknown): string {
  if (!content) {
    return '';
  }

  if (typeof content === 'string') {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') {
          return item.trim();
        }

        if (!isRecord(item)) {
          return '';
        }

        return getString(item.body) || getString(item.text) || getString(item.description);
      })
      .filter(Boolean)
      .join('\n\n');
  }

  if (!isRecord(content)) {
    return '';
  }

  if (Array.isArray(content.blocks)) {
    return content.blocks
      .map((block) => {
        if (!isRecord(block)) {
          return '';
        }

        const blockData = isRecord(block.data) ? block.data : null;

        return getString(blockData?.text) || getString(block.text);
      })
      .filter(Boolean)
      .join('\n\n');
  }

  return getString(content.summary) || getString(content.description) || getString(content.text);
}

/* =========================================================
   SPONSORS
========================================================= */

function extractEventSponsors(event: WebsiteEvent): EventSponsor[] {
  const rawSponsors = getEventField(event, 'sponsors');

  if (!Array.isArray(rawSponsors)) {
    return [];
  }

  const sponsors: EventSponsor[] = [];
  const seen = new Set<string>();

  rawSponsors.forEach((item, index) => {
    if (!isRecord(item)) {
      return;
    }

    if (item.isActive === false) {
      return;
    }

    const personName = getString(item.name) || getString(item.contactName);

    const companyName =
      getString(item.companyName) ||
      getString(item.company) ||
      getString(item.brandName) ||
      personName ||
      `Sponsor ${index + 1}`;

    const designation =
      getString(item.designation) || getString(item.position) || getString(item.role);

    const description =
      getString(item.description) || getString(item.excerpt) || getString(item.summary);

    const website = normalizeExternalUrl(
      item.website ?? item.companyDomain ?? item.websiteUrl ?? item.link,
    );

    const tier = getString(item.tier) || getString(item.sponsorTier);

    const type = getString(item.type) || getString(item.sponsorType);

    /*
     * logoId can be only a database ID.
     * Therefore it is used only when it is a populated object.
     */
    const logo =
      getImageUrl(item.logo) ||
      getImageUrl(item.companyLogo) ||
      getImageUrl(item.logoImage) ||
      getImageUrl(item.brandLogo) ||
      getImageUrl(item.image) ||
      (isRecord(item.logoId) ? getImageUrl(item.logoId) : '');

    const id = getString(item.id) || getString(item._id) || `${companyName}-${index}`;

    const sortOrder = getNumber(item.sortOrder, index);

    const duplicateKey = `${companyName}-${personName}`.toLowerCase().trim();

    if (seen.has(duplicateKey)) {
      return;
    }

    seen.add(duplicateKey);

    sponsors.push({
      id,
      personName,
      companyName,
      designation,
      description,
      website,
      tier,
      type,
      logo,
      sortOrder,
    });
  });

  return sponsors.sort((first, second) => first.sortOrder - second.sortOrder);
}

/* =========================================================
   SPONSOR LOGO
========================================================= */

function SponsorLogo({ src, alt }: SponsorLogoProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_SPONSOR_IMAGE);

  useEffect(() => {
    setImageSrc(src || FALLBACK_SPONSOR_IMAGE);
  }, [src]);

  function handleImageError() {
    if (imageSrc !== FALLBACK_SPONSOR_IMAGE) {
      setImageSrc(FALLBACK_SPONSOR_IMAGE);
    }
  }

  /*
   * Native <img> is intentionally used here.
   *
   * This allows dynamic DigitalOcean Spaces URLs
   * without configuring next.config.js.
   */
  return (
    <img
      src={imageSrc}
      alt={alt}
      width={220}
      height={110}
      className="dynamic-sponsor-logo"
      onError={handleImageError}
    />
  );
}

/* =========================================================
   DYNAMIC SPONSORS SECTION
========================================================= */

function DynamicEventSponsorsSection({ sponsors }: { sponsors: EventSponsor[] }) {
  return (
    <section className="dynamic-sponsors-section">
      <div className="dynamic-sponsors-heading">
        <span className="dynamic-sponsors-kicker">Our Partners</span>

        <h2>Event Sponsors</h2>

        <p>Meet the organizations and industry leaders supporting this event.</p>
      </div>

      <div className="dynamic-sponsors-grid">
        {sponsors.map((sponsor) => {
          const sponsorContent = (
            <>
              <div className="dynamic-sponsor-badges">
                {sponsor.tier ? <span className="dynamic-sponsor-tier">{sponsor.tier}</span> : null}

                {sponsor.type ? <span className="dynamic-sponsor-type">{sponsor.type}</span> : null}
              </div>

              <div className="dynamic-sponsor-logo-wrap">
                <SponsorLogo src={sponsor.logo} alt={`${sponsor.companyName} logo`} />
              </div>

              <h3>{sponsor.companyName}</h3>

              {sponsor.personName && sponsor.personName !== sponsor.companyName ? (
                <p className="dynamic-sponsor-person">{sponsor.personName}</p>
              ) : null}

              {sponsor.designation ? (
                <p className="dynamic-sponsor-designation">{sponsor.designation}</p>
              ) : null}

              {sponsor.description ? (
                <p className="dynamic-sponsor-description">{sponsor.description}</p>
              ) : null}

              {sponsor.website ? (
                <span className="dynamic-sponsor-link">
                  Visit Website
                  <ExternalLink size={15} />
                </span>
              ) : null}
            </>
          );

          if (sponsor.website) {
            return (
              <a
                key={sponsor.id}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="dynamic-sponsor-card"
              >
                {sponsorContent}
              </a>
            );
          }

          return (
            <article key={sponsor.id} className="dynamic-sponsor-card">
              {sponsorContent}
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   EXTERNAL WINDOW
========================================================= */

function openExternal(url: string) {
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch {
    // Browser popup blocked.
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function EventDetailsPage() {
  const params = useParams<{
    slug?: string | string[];
  }>();

  const slug = Array.isArray(params?.slug) ? (params.slug[0] ?? '') : (params?.slug ?? '');

  const [event, setEvent] = useState<WebsiteEvent | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [showShareOptions, setShowShareOptions] = useState(false);

  /* =========================================================
     LOAD EVENT
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    async function loadEvent() {
      if (!slug) {
        if (isMounted) {
          setError('Event slug is missing.');
          setIsLoading(false);
        }

        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        let loadedEvent = await fetchWebsiteEventByIdOrSlug(slug);

        /*
         * Direct details request fail ho to list se
         * matching event ID/slug find karega.
         */
        if (!loadedEvent) {
          const eventList = await fetchWebsiteEvents();

          const matchedEvent = eventList.find((item) => {
            const itemId = getString(getEventField(item, 'id'));

            const itemSlug = getString(getEventField(item, 'slug'));

            return itemId === slug || itemSlug === slug;
          });

          if (matchedEvent) {
            const matchedId = getString(getEventField(matchedEvent, 'id'));

            const matchedSlug = getString(getEventField(matchedEvent, 'slug'));

            loadedEvent = await fetchWebsiteEventByIdOrSlug(matchedId || matchedSlug);
          }
        }

        if (!isMounted) {
          return;
        }

        setEvent(loadedEvent);

        setError(loadedEvent ? null : 'Event not found.');
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setEvent(null);

        setError(loadError instanceof Error ? loadError.message : 'Failed to load event.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEvent();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* =========================================================
     SHARE
  ========================================================= */

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/events/${slug}` : '';

  const displayTitle = event?.title || 'Check this event';

  function handleShareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(`${displayTitle} ${shareUrl}`)}`;

    openExternal(url);
    setShowShareOptions(false);
  }

  function handleShareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    openExternal(url);
    setShowShareOptions(false);
  }

  function handleShareTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      displayTitle,
    )}&url=${encodeURIComponent(shareUrl)}`;

    openExternal(url);
    setShowShareOptions(false);
  }

  function handleShareInstagram() {
    openExternal('https://www.instagram.com/');

    setShowShareOptions(false);
  }

  async function copyLinkToClipboard() {
    try {
      await navigator.clipboard.writeText(shareUrl);

      setShowShareOptions(false);
    } catch {
      // Clipboard access denied.
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="event-details-page">
        <p
          style={{
            padding: '80px 20px',
            textAlign: 'center',
          }}
        >
          Loading event...
        </p>
      </main>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (error || !event) {
    return (
      <main className="not-found-page">
        <Image src="/assets/404.png" alt="Event not found" width={700} height={500} />

        <h1>Event Not Found</h1>

        <p>
          The event you&apos;re looking for is unavailable or may have been removed. Browse our
          latest events to discover what&apos;s coming next.
        </p>

        <Link href="/events" className="backbutton">
          <span className="backbutton-icon">
            <ArrowUpLeft size={18} />
          </span>

          <span>Back to Events</span>
        </Link>
      </main>
    );
  }

  /* =========================================================
     EVENT DATA
  ========================================================= */

  const readableSlug = slug.replace(/-/g, ' ');

  const normalizedSections: EventSection[] = [];

  const eventSections = getEventField(event, 'sections');

  if (Array.isArray(eventSections)) {
    eventSections.forEach((section) => {
      if (!isRecord(section)) {
        return;
      }

      const heading = getString(section.heading) || getString(section.title) || 'Details';

      const body =
        typeof section.body === 'string'
          ? section.body
          : extractTextFromContent(section.body ?? section.content ?? '');

      if (body) {
        normalizedSections.push({
          heading,
          body,
        });
      }
    });
  }

  /*
   * API response mein description
   * Editor.js object ho sakta hai.
   */
  const eventDescription =
    getEventField(event, 'description') ??
    getEventField(event, 'content') ??
    getEventField(event, 'summary') ??
    '';

  /*
   * Dynamic event image.
   *
   * This URL may be a DigitalOcean Spaces URL.
   * It is passed to EventDetailsAnimated.
   *
   * EventDetailsAnimated MUST render this URL
   * with native <img>, not next/image.
   */
  const bannerImage =
    getImageUrl(getEventField(event, 'bannerImage')) ||
    getImageUrl(getEventField(event, 'bannerImageId')) ||
    getImageUrl(getEventField(event, 'image')) ||
    getImageUrl(getEventField(event, 'heroImage')) ||
    getImageUrl(getEventField(event, 'banner')) ||
    FALLBACK_EVENT_IMAGE;

  const featuredEvent = {
    title:
      getString(getEventField(event, 'title')) ||
      getString(getEventField(event, 'name')) ||
      getString(getEventField(event, 'eventName')) ||
      'Event',

    author:
      getString(getEventField(event, 'organizer')) ||
      getString(getEventField(event, 'author')) ||
      'CORE Media',

    date:
      getString(getEventField(event, 'startDate')) ||
      getString(getEventField(event, 'startsAt')) ||
      getString(getEventField(event, 'date')),

    heroImage: bannerImage,

    badge:
      getString(getEventField(event, 'type')) ||
      getString(getEventField(event, 'category')) ||
      'Event',

    summary: extractTextFromContent(eventDescription) || getString(getEventField(event, 'excerpt')),

    sections: normalizedSections,
  };

  /* =========================================================
     CONTENT BLOCKS
  ========================================================= */

  // const contentBlocks =
  //   isRecord(eventDescription) && Array.isArray(eventDescription.blocks)
  //     ? eventDescription.blocks
  //     : [];

  const sponsors = extractEventSponsors(event);

  /* =========================================================
     RENDER CONTENT BLOCK
  ========================================================= */

  // function renderBlock(block: unknown, index: number) {
  //   if (!isRecord(block)) {
  //     return null;
  //   }

  //   const key = getString(block.id) || `${String(block.type ?? 'block')}-${index}`;

  //   const type = getString(block.type).toLowerCase();

  //   const data = isRecord(block.data) ? block.data : null;

  //   /* HEADER */
  //   if (type === 'header') {
  //     const level = typeof data?.level === 'number' ? data.level : 2;

  //     const text = getString(data?.text);

  //     if (!text) {
  //       return null;
  //     }

  //     return level <= 2 ? <h2 key={key}>{text}</h2> : <h3 key={key}>{text}</h3>;
  //   }

  //   /* PARAGRAPH */
  //   if (type === 'paragraph') {
  //     const text = getString(data?.text);

  //     if (!text) {
  //       return null;
  //     }

  //     return (
  //       <p
  //         key={key}
  //         style={{
  //           marginBottom: 18,
  //           lineHeight: 1.8,
  //         }}
  //         dangerouslySetInnerHTML={{
  //           __html: text,
  //         }}
  //       />
  //     );
  //   }

  //   /* LIST */
  //   if (type === 'list') {
  //     const items = Array.isArray(data?.items)
  //       ? data.items.filter((item): item is string => typeof item === 'string')
  //       : [];

  //     if (!items.length) {
  //       return null;
  //     }

  //     return (
  //       <ul key={key} className="overview-list">
  //         {items.map((item, itemIndex) => (
  //           <li key={`${item}-${itemIndex}`}>{item}</li>
  //         ))}
  //       </ul>
  //     );
  //   }

  //   /* IMAGE */
  //   if (type === 'image') {
  //     const file = isRecord(data?.file) ? data.file : null;

  //     const url = getImageUrl(file) || getImageUrl(data?.image);

  //     if (!url) {
  //       return null;
  //     }

  //     /*
  //      * IMPORTANT:
  //      * Native <img> intentionally used.
  //      * This supports external DigitalOcean
  //      * Spaces URLs without next.config.js.
  //      */
  //     return (
  //       <div
  //         key={key}
  //         style={{
  //           margin: '24px 0',
  //         }}
  //       >
  //         <img
  //           src={url}
  //           alt={getString(data?.caption) || 'Event image'}
  //           width={1200}
  //           height={675}
  //           className="event-content-image"
  //         />
  //       </div>
  //     );
  //   }

  //   /* QUOTE */
  //   if (type === 'quote') {
  //     const text = getString(data?.text);

  //     if (!text) {
  //       return null;
  //     }

  //     return (
  //       <blockquote
  //         key={key}
  //         style={{
  //           margin: '24px 0',
  //           paddingLeft: 18,
  //           borderLeft: '3px solid #d11f26',
  //         }}
  //       >
  //         {text}
  //       </blockquote>
  //     );
  //   }

  //   /* DELIMITER */
  //   if (type === 'delimiter') {
  //     return (
  //       <hr
  //         key={key}
  //         style={{
  //           margin: '24px 0',
  //         }}
  //       />
  //     );
  //   }

  //   return null;
  // }

  /* =========================================================
     PAGE RENDER
  ========================================================= */

  return (
    <main className="event-details-page">
      <div className="event-details-shell">
        <ClientErrorBoundary>
          <EventDetailsAnimated featuredEvent={featuredEvent} readableSlug={readableSlug} />

          {/* =================================================
              SPONSORS
          ================================================= */}

          {/* {sponsors.length > 0 ? (
            <DynamicEventSponsorsSection sponsors={sponsors} />
          ) : (
            <EventSponsorsSection />
          )} */}

          {sponsors.length > 0 ? <DynamicEventSponsorsSection sponsors={sponsors} /> : null}

          {/* =================================================
              DESCRIPTION CONTENT
          ================================================= */}

          {/* {contentBlocks.length > 0 ? (
            <section className="event-description-content">
              {contentBlocks.map((block, index) => renderBlock(block, index))}
            </section>
          ) : null} */}

          {/* =================================================
              EXTRA SECTIONS
          ================================================= */}

          {featuredEvent.sections.length > 0 ? (
            <div className="event-extra-sections">
              {featuredEvent.sections.map((section, index) => (
                <section key={`${section.heading}-${index}`} className="event-extra-section">
                  <h3>{section.heading}</h3>

                  {section.body
                    .split('\n\n')
                    .filter(Boolean)
                    .map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        dangerouslySetInnerHTML={{
                          __html: paragraph,
                        }}
                      />
                    ))}
                </section>
              ))}
            </div>
          ) : null}

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="event-actions">
            <Link
              href={`/register?event=${encodeURIComponent(
                getString(getEventField(event, 'id')) || slug,
              )}`}
              className="talk-btn"
            >
              <span>Registration</span>

              <span className="talk-btn-icon">
                <ArrowUpRight size={18} />
              </span>
            </Link>

            <div className="share-container">
              <button
                type="button"
                className="talk-btn"
                onClick={() => setShowShareOptions((current) => !current)}
                aria-expanded={showShareOptions}
                aria-haspopup="menu"
                id="share-button"
              >
                <span>Share Event</span>

                <span className="talk-btn-icon">
                  <ArrowUpRight size={18} />
                </span>
              </button>

              {showShareOptions ? (
                <div className="share-popup" role="menu" aria-labelledby="share-button">
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="share-option whatsapp"
                  >
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={handleShareFacebook}
                    className="share-option facebook"
                  >
                    Facebook
                  </button>

                  <button
                    type="button"
                    onClick={handleShareTwitter}
                    className="share-option twitter"
                  >
                    Twitter
                  </button>

                  <button
                    type="button"
                    onClick={handleShareInstagram}
                    className="share-option instagram"
                  >
                    Instagram
                  </button>

                  <button type="button" onClick={copyLinkToClipboard} className="share-option copy">
                    Copy Link
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </ClientErrorBoundary>
      </div>
    </main>
  );
}
