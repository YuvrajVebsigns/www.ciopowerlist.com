// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.service';

// type SpeakerDetailClientProps = {
//   slug: string;
// };

// type SpeakerCardProps = {
//   speaker: unknown;
//   sectionTitle: string;
//   index: number;
//   year: string;
// };

// const FALLBACK_SPEAKER_IMAGE = '/assets/logo/logo2.png';
// const ROLE_MAX_LENGTH = 90;

// /* =========================================================
//    GENERIC HELPERS
// ========================================================= */

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function getString(value: unknown): string {
//   return typeof value === 'string' ? value.trim() : '';
// }

// /* =========================================================
//    GET YEAR
// ========================================================= */

// function getSpeakerYear(slug: string): string {
//   const cleanSlug = slug.trim().toLowerCase();
//   const match = cleanSlug.match(/(20\d{2})$/);

//   return match?.[1] || '2026';
// }

// /* =========================================================
//    API SLUGS
// ========================================================= */

// function getSpeakerSlug(slug: string): string {
//   return `speaker-${getSpeakerYear(slug)}`;
// }

// function getPartnerSpeakerSlug(slug: string): string {
//   return `partner-speaker-${getSpeakerYear(slug)}`;
// }

// function getCioIndustrySpeakerSlug(slug: string): string {
//   return `cio-industry-speaker-${getSpeakerYear(slug)}`;
// }

// /* =========================================================
//    IMAGE HELPER
// ========================================================= */

// function getSpeakerImageUrl(value: unknown): string {
//   if (typeof value === 'string') {
//     return value.trim();
//   }

//   if (!isRecord(value)) {
//     return '';
//   }

//   const urlVariants = isRecord(value.urlVariants) ? value.urlVariants : null;

//   return (
//     getString(value.url) ||
//     getString(value.original) ||
//     getString(value.large) ||
//     getString(value.medium) ||
//     getString(value.small) ||
//     getString(value.thumbnail) ||
//     getString(urlVariants?.large) ||
//     getString(urlVariants?.medium) ||
//     getString(urlVariants?.small) ||
//     getString(urlVariants?.thumbnail)
//   );
// }

// /* =========================================================
//    SPEAKER CARD
// ========================================================= */

// function SpeakerCard({ speaker, sectionTitle, index, year }: SpeakerCardProps) {
//   const entry = isRecord(speaker) ? speaker : {};

//   const author =
//     getString(entry.author) ||
//     getString(entry.name) ||
//     getString(entry.fullName) ||
//     getString(entry.title) ||
//     getString(entry.heading) ||
//     getString(entry.label) ||
//     'Speaker Name';

//   const role =
//     getString(entry.role) ||
//     getString(entry.designation) ||
//     getString(entry.position) ||
//     getString(entry.company) ||
//     getString(entry.organization) ||
//     getString(entry.companyName) ||
//     getString(entry.affiliation);

//   const quote =
//     getString(entry.quote) ||
//     getString(entry.description) ||
//     getString(entry.message) ||
//     getString(entry.summary);

//   const apiImage =
//     getSpeakerImageUrl(entry.avatar) ||
//     getSpeakerImageUrl(entry.image) ||
//     getSpeakerImageUrl(entry.photo) ||
//     getSpeakerImageUrl(entry.profileImage) ||
//     getSpeakerImageUrl(entry.profilePhoto) ||
//     getSpeakerImageUrl(entry.profile) ||
//     getSpeakerImageUrl(entry.media) ||
//     getSpeakerImageUrl(entry.file) ||
//     getSpeakerImageUrl(entry.thumbnail) ||
//     FALLBACK_SPEAKER_IMAGE;

//   const [imageSrc, setImageSrc] = useState(apiImage);

//   useEffect(() => {
//     setImageSrc(apiImage);
//   }, [apiImage]);

//   function handleImageError() {
//     if (imageSrc !== FALLBACK_SPEAKER_IMAGE) {
//       setImageSrc(FALLBACK_SPEAKER_IMAGE);
//     }
//   }

//   const isLongRole = role.length > ROLE_MAX_LENGTH;

//   const displayedRole = isLongRole ? `${role.slice(0, ROLE_MAX_LENGTH).trimEnd()}...` : role;

//   const detailsUrl = {
//     pathname: '/speaker-details',
//     query: {
//       name: author,
//       role,
//       company: quote,
//       image: imageSrc,
//       year,
//       section: sectionTitle,
//     },
//   };

//   return (
//     <article
//       className="winner-profile-card winner-profile-card--red"
//       data-section={sectionTitle}
//       data-index={index}
//     >
//       <div className="winner-profile-media">
//         <img
//           src={imageSrc}
//           alt={author}
//           className="winner-profile-image"
//           loading="lazy"
//           onError={handleImageError}
//         />
//       </div>

//       <div className="winner-profile-body">
//         <h3>{author}</h3>

//         <p className="winner-profile-category">
//           {quote ? ` ${quote}` : 'Company info unavailable'}
//         </p>

//         {role ? (
//           <div className="winner-profile-role">
//             <p className="winner-profile-company">{displayedRole}</p>

//             {isLongRole ? (
//               <Link
//                 href={detailsUrl}
//                 className="speaker-role-read-more"
//                 aria-label={`Read full role and details for ${author}`}
//               >
//                 Read More
//               </Link>
//             ) : null}
//           </div>
//         ) : null}
//       </div>
//     </article>
//   );
// }

// /* =========================================================
//    GET SECTION ITEMS
// ========================================================= */

// function getSectionItems(section: unknown): unknown[] {
//   if (Array.isArray(section)) {
//     return section;
//   }

//   if (!isRecord(section)) {
//     return [];
//   }

//   const data = isRecord(section.data) ? section.data : null;
//   const candidates: unknown[] = [];

//   /* DATA OBJECT */
//   if (data) {
//     candidates.push(
//       data.testimonials,
//       data.items,
//       data.members,
//       data.speakers,
//       data.partnerSpeakers,
//       data.partner_speakers,
//       data.cioIndustrySpeakers,
//       data.cio_industry_speakers,
//       data.industrySpeakers,
//       data.industry_speakers,
//       data.winners,
//       data.rows,
//       data.blocks,
//       data.values,
//       data.cards,
//       data.entries,
//       data.records,
//       data.data,
//       data.results,
//     );
//   }

//   /* SECTION OBJECT */
//   candidates.push(
//     section.testimonials,
//     section.items,
//     section.members,
//     section.speakers,
//     section.partnerSpeakers,
//     section.partner_speakers,
//     section.cioIndustrySpeakers,
//     section.cio_industry_speakers,
//     section.industrySpeakers,
//     section.industry_speakers,
//     section.winners,
//     section.rows,
//     section.blocks,
//     section.values,
//     section.cards,
//     section.entries,
//     section.records,
//     section.data,
//     section.results,
//   );

//   /* RETURN FIRST ARRAY */
//   for (const candidate of candidates) {
//     if (Array.isArray(candidate)) {
//       return candidate;
//     }
//   }

//   return [];
// }

// /* =========================================================
//    EXTRACT SPEAKERS
// ========================================================= */

// function extractPageSpeakers(page: WebsitePage | null): unknown[] {
//   if (!page) {
//     return [];
//   }

//   const pageSections: unknown[] = Array.isArray(page.sections) ? page.sections : [];

//   const pageBlocks: unknown[] = Array.isArray(page.content?.blocks) ? page.content.blocks : [];

//   const sourceItems = pageSections.length > 0 ? pageSections : pageBlocks;

//   const speakers: unknown[] = [];

//   /* EXTRACT FROM SECTIONS/BLOCKS */
//   for (const section of sourceItems) {
//     const items = getSectionItems(section);

//     if (items.length > 0) {
//       speakers.push(...items);
//     }
//   }

//   /* DIRECT PAGE DATA */
//   if (speakers.length === 0) {
//     const directItems = getSectionItems(page);

//     if (directItems.length > 0) {
//       speakers.push(...directItems);
//     }
//   }

//   return speakers;
// }

// /* =========================================================
//    SPEAKER DETAIL PAGE
// ========================================================= */

// export default function SpeakerDetailClient({ slug }: SpeakerDetailClientProps) {
//   const [page, setPage] = useState<WebsitePage | null>(null);

//   const [speakerPage, setSpeakerPage] = useState<WebsitePage | null>(null);

//   const [partnerSpeakerPage, setPartnerSpeakerPage] = useState<WebsitePage | null>(null);

//   const [cioIndustrySpeakerPage, setCioIndustrySpeakerPage] = useState<WebsitePage | null>(null);

//   const [isLoading, setIsLoading] = useState(true);

//   const [error, setError] = useState<string | null>(null);

//   const year = getSpeakerYear(slug);

//   const speakerSlug = getSpeakerSlug(slug);

//   const partnerSpeakerSlug = getPartnerSpeakerSlug(slug);

//   const cioIndustrySpeakerSlug = getCioIndustrySpeakerSlug(slug);

//   /* =========================================================
//      LOAD YEAR-SPECIFIC PAGES
//   ========================================================= */

//   useEffect(() => {
//     let isMounted = true;

//     async function loadSpeakerPages() {
//       try {
//         setIsLoading(true);
//         setError(null);

//         /* SPEAKER API */
//         const speakerResponse = await fetchWebsitePageBySlug(speakerSlug).catch(() => null);

//         /* PARTNER SPEAKER API */
//         const partnerSpeakerResponse = await fetchWebsitePageBySlug(partnerSpeakerSlug).catch(
//           () => null,
//         );

//         /* CIO INDUSTRY SPEAKER API */
//         const cioIndustrySpeakerResponse = await fetchWebsitePageBySlug(
//           cioIndustrySpeakerSlug,
//         ).catch(() => null);

//         if (!isMounted) {
//           return;
//         }

//         const speakerData =
//           speakerResponse?.success && speakerResponse.data ? speakerResponse.data : null;

//         const partnerSpeakerData =
//           partnerSpeakerResponse?.success && partnerSpeakerResponse.data
//             ? partnerSpeakerResponse.data
//             : null;

//         const cioIndustrySpeakerData =
//           cioIndustrySpeakerResponse?.success && cioIndustrySpeakerResponse.data
//             ? cioIndustrySpeakerResponse.data
//             : null;

//         setSpeakerPage(speakerData);
//         setPartnerSpeakerPage(partnerSpeakerData);
//         setCioIndustrySpeakerPage(cioIndustrySpeakerData);

//         /* PRIMARY PAGE */
//         setPage(speakerData || partnerSpeakerData || cioIndustrySpeakerData || null);

//         if (!speakerData && !partnerSpeakerData && !cioIndustrySpeakerData) {
//           setError(
//             speakerResponse?.message ||
//               partnerSpeakerResponse?.message ||
//               cioIndustrySpeakerResponse?.message ||
//               `Unable to load speaker data for ${slug}.`,
//           );
//         }
//       } catch (err: unknown) {
//         if (!isMounted) {
//           return;
//         }

//         setPage(null);
//         setSpeakerPage(null);
//         setPartnerSpeakerPage(null);
//         setCioIndustrySpeakerPage(null);

//         setError(err instanceof Error ? err.message : 'Unable to load speaker pages.');
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     loadSpeakerPages();

//     return () => {
//       isMounted = false;
//     };
//   }, [slug, speakerSlug, partnerSpeakerSlug, cioIndustrySpeakerSlug]);

//   /* =========================================================
//      LOADING
//   ========================================================= */

//   if (isLoading) {
//     return (
//       <main className="winners-detail-page">
//         <section className="winners-detail-card">
//           <p className="winners-kicker">Loading speakers...</p>

//           <p>
//             Loading Speakers {year}, Partner Speakers {year}, and CIO Industry Speakers {year}.
//           </p>
//         </section>
//       </main>
//     );
//   }

//   /* =========================================================
//      COMPLETE FAILURE
// ========================================================= */

//   if (error && !speakerPage && !partnerSpeakerPage && !cioIndustrySpeakerPage) {
//     return (
//       <main className="winners-detail-page">
//         <section className="winners-detail-card">
//           <p className="winners-kicker">Unable to load speakers</p>

//           <p>{error}</p>
//         </section>
//       </main>
//     );
//   }

//   /* =========================================================
//      NO PAGE
// ========================================================= */

//   if (!page && !speakerPage && !partnerSpeakerPage && !cioIndustrySpeakerPage) {
//     return (
//       <main className="winners-detail-page">
//         <section className="winners-detail-card">
//           <p className="winners-kicker">Speakers not found</p>

//           <p>No speaker page was returned for the slug {slug}.</p>
//         </section>
//       </main>
//     );
//   }

//   /* =========================================================
//      PAGE INFORMATION
// ========================================================= */

//   const pageTitle = page?.title?.trim() || `Speaker Profiles ${year}`;

//   const pageShortDescription = page?.shortDescription?.trim() || '';

//   /* =========================================================
//      EXTRACT DATA
// ========================================================= */

//   const speakers = extractPageSpeakers(speakerPage);

//   const partnerSpeakers = extractPageSpeakers(partnerSpeakerPage);

//   const cioIndustrySpeakers = extractPageSpeakers(cioIndustrySpeakerPage);

//   const speakerCount = speakers.length;

//   const partnerSpeakerCount = partnerSpeakers.length;

//   const cioIndustrySpeakerCount = cioIndustrySpeakers.length;

//   const showSpeakers = speakerCount > 0;

//   const showPartnerSpeakers = partnerSpeakerCount > 0;

//   const showCioIndustrySpeakers = cioIndustrySpeakerCount > 0;

//   /* =========================================================
//      RENDER
// ========================================================= */

//   return (
//     <main className="winners-detail-page">
//       {/* PAGE HEADER */}
//       <section className="winners-detail-card">
//         <p className="winners-kicker">Speaker Profiles</p>

//         <h1>{pageTitle}</h1>

//         <p>
//           Meet the industry leaders, experts, and innovators sharing their insights and experience.
//         </p>

//         {pageShortDescription ? (
//           <p className="winners-detail-summary">{pageShortDescription}</p>
//         ) : null}
//       </section>

//       {/* SPEAKERS */}
//       {showSpeakers ? (
//         <section className="winner-section-block">
//           <div className="winner-section-header winner-section-header--centered">
//             <p className="winner-section-kicker">Speaker Profiles</p>

//             <h2>{year === '2017' ? 'Keynote Speakers' : `SPEAKERS ${year}`}</h2>

//             <span>{speakerCount} Members</span>
//           </div>

//           <div className="winner-section-grid">
//             {speakers.map((speaker, index) => (
//               <SpeakerCard
//                 key={`speaker-${year}-${index}`}
//                 speaker={speaker}
//                 sectionTitle={`SPEAKERS-${year}`}
//                 index={index}
//                 year={year}
//               />
//             ))}
//           </div>
//         </section>
//       ) : null}

//       {/* CIO INDUSTRY SPEAKERS */}
//       {showCioIndustrySpeakers ? (
//         <section className="winner-section-block">
//           <div className="winner-section-header winner-section-header--centered">
//             <p className="winner-section-kicker">CIO Industry Speaker Profiles</p>

//             <h2>CIO INDUSTRY SPEAKERS {year}</h2>

//             <span>{cioIndustrySpeakerCount} Members</span>
//           </div>

//           <div className="winner-section-grid">
//             {cioIndustrySpeakers.map((speaker, index) => (
//               <SpeakerCard
//                 key={`cio-industry-speaker-${year}-${index}`}
//                 speaker={speaker}
//                 sectionTitle={`CIO-INDUSTRY-SPEAKERS-${year}`}
//                 index={index}
//                 year={year}
//               />
//             ))}
//           </div>
//         </section>
//       ) : null}

//       {/* PARTNER SPEAKERS */}
//       {showPartnerSpeakers ? (
//         <section className="winner-section-block">
//           <div className="winner-section-header winner-section-header--centered">
//             <p className="winner-section-kicker">Partner Speaker Profiles</p>

//             <h2>PARTNER SPEAKERS {year}</h2>

//             <span>{partnerSpeakerCount} Members</span>
//           </div>

//           <div className="winner-section-grid">
//             {partnerSpeakers.map((speaker, index) => (
//               <SpeakerCard
//                 key={`partner-speaker-${year}-${index}`}
//                 speaker={speaker}
//                 sectionTitle={`PARTNER-SPEAKERS-${year}`}
//                 index={index}
//                 year={year}
//               />
//             ))}
//           </div>
//         </section>
//       ) : null}

//       {/* EMPTY STATE */}
//       {!showSpeakers && !showPartnerSpeakers && !showCioIndustrySpeakers ? (
//         <section className="winner-section-block">
//           <p>No speaker cards were found for {slug}.</p>
//         </section>
//       ) : null}
//     </main>
//   );
// }

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.service';

type SpeakerDetailClientProps = {
  slug: string;
};

type SpeakerCardProps = {
  speaker: unknown;
  sectionTitle: string;
  index: number;
  year: string;
};

const FALLBACK_SPEAKER_IMAGE = '/assets/logo/logo2.png';
const ROLE_MAX_LENGTH = 90;

/* =========================================================
   GENERIC HELPERS
========================================================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function applyPageSeo(page: WebsitePage): () => void {
  const seo = page.seo ?? {};
  const originalTitle = document.title;
  const originalMeta = new Map<HTMLMetaElement, string | null>();

  const canonicalUrl = getString(seo.canonicalUrl);
  const originalCanonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const canonicalHref = originalCanonical?.getAttribute('href') ?? null;
  const canonical = canonicalUrl
    ? (originalCanonical ?? document.head.appendChild(document.createElement('link')))
    : null;

  if (canonical) {
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
  }

  const schemaMarkup = getString(seo.schemaMarkup);
  const originalSchema = document.head.querySelector<HTMLScriptElement>(
    'script[data-page-seo-schema="true"]',
  );
  const schemaText = originalSchema?.textContent ?? null;
  const schema = schemaMarkup
    ? (originalSchema ?? document.head.appendChild(document.createElement('script')))
    : null;

  if (schema) {
    schema.type = 'application/ld+json';
    schema.dataset.pageSeoSchema = 'true';
    schema.textContent = schemaMarkup;
  }

  const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }

    if (!originalMeta.has(element)) {
      originalMeta.set(element, element.getAttribute('content'));
    }

    element.content = content;
  };

  const metaTitle = getString(seo.metaTitle) || page.title;
  const metaDescription = getString(seo.metaDescription) || page.shortDescription || '';
  const metaKeywords = Array.isArray(seo.metaKeywords)
    ? seo.metaKeywords
        .filter((keyword): keyword is string => typeof keyword === 'string')
        .join(', ')
    : getString(seo.metaKeywords);
  const robots =
    seo.noIndex === true || seo.noFollow === true
      ? `${seo.noIndex === true ? 'noindex' : 'index'}, ${
          seo.noFollow === true ? 'nofollow' : 'follow'
        }`
      : getString(seo.robots) || 'index, follow';

  document.title = metaTitle;
  setMeta('name', 'description', metaDescription);
  if (metaKeywords) setMeta('name', 'keywords', metaKeywords);
  setMeta('name', 'robots', robots);
  setMeta('property', 'og:title', getString(seo.ogTitle) || metaTitle);
  setMeta('property', 'og:description', getString(seo.ogDescription) || metaDescription);
  setMeta('property', 'og:type', 'website');
  setMeta('name', 'twitter:card', 'summary');
  setMeta('name', 'twitter:title', getString(seo.twitterTitle) || metaTitle);
  setMeta('name', 'twitter:description', getString(seo.twitterDescription) || metaDescription);

  return () => {
    document.title = originalTitle;

    for (const [element, content] of originalMeta) {
      if (content === null) {
        element.remove();
      } else {
        element.content = content;
      }
    }

    if (originalCanonical) {
      if (canonicalHref === null) originalCanonical.removeAttribute('href');
      else originalCanonical.setAttribute('href', canonicalHref);
    } else {
      canonical?.remove();
    }

    if (originalSchema) {
      originalSchema.textContent = schemaText;
    } else {
      schema?.remove();
    }
  };
}

/* =========================================================
   GET YEAR
========================================================= */

function getSpeakerYear(slug: string): string {
  const cleanSlug = slug.trim().toLowerCase();
  const match = cleanSlug.match(/(20\d{2})$/);

  return match?.[1] || '2026';
}

/* =========================================================
   API SLUGS
========================================================= */

function getSpeakerSlug(slug: string): string {
  const year = getSpeakerYear(slug);

  return year === '2017' ? 'keynote-speakers-2017' : `speakers-${year}`;
}

function getPartnerSpeakerSlug(slug: string): string {
  return `partner-speakers-${getSpeakerYear(slug)}`;
}

function getCioIndustrySpeakerSlug(slug: string): string {
  return `cio-industry-speakers-${getSpeakerYear(slug)}`;
}

/* =========================================================
   IMAGE HELPER
========================================================= */

function getSpeakerImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (!isRecord(value)) {
    return '';
  }

  const urlVariants = isRecord(value.urlVariants) ? value.urlVariants : null;

  return (
    getString(value.url) ||
    getString(value.original) ||
    getString(value.large) ||
    getString(value.medium) ||
    getString(value.small) ||
    getString(value.thumbnail) ||
    getString(urlVariants?.large) ||
    getString(urlVariants?.medium) ||
    getString(urlVariants?.small) ||
    getString(urlVariants?.thumbnail)
  );
}

/* =========================================================
   SPEAKER CARD
========================================================= */

function SpeakerCard({ speaker, sectionTitle, index, year }: SpeakerCardProps) {
  const entry = isRecord(speaker) ? speaker : {};

  const author =
    getString(entry.author) ||
    getString(entry.name) ||
    getString(entry.fullName) ||
    getString(entry.title) ||
    getString(entry.heading) ||
    getString(entry.label) ||
    'Speaker Name';

  const role =
    getString(entry.role) ||
    getString(entry.designation) ||
    getString(entry.position) ||
    getString(entry.company) ||
    getString(entry.organization) ||
    getString(entry.companyName) ||
    getString(entry.affiliation);

  const quote =
    getString(entry.quote) ||
    getString(entry.description) ||
    getString(entry.message) ||
    getString(entry.summary);

  const apiImage =
    getSpeakerImageUrl(entry.avatar) ||
    getSpeakerImageUrl(entry.image) ||
    getSpeakerImageUrl(entry.photo) ||
    getSpeakerImageUrl(entry.profileImage) ||
    getSpeakerImageUrl(entry.profilePhoto) ||
    getSpeakerImageUrl(entry.profile) ||
    getSpeakerImageUrl(entry.media) ||
    getSpeakerImageUrl(entry.file) ||
    getSpeakerImageUrl(entry.thumbnail) ||
    FALLBACK_SPEAKER_IMAGE;

  const [imageSrc, setImageSrc] = useState(apiImage);

  useEffect(() => {
    setImageSrc(apiImage);
  }, [apiImage]);

  function handleImageError() {
    if (imageSrc !== FALLBACK_SPEAKER_IMAGE) {
      setImageSrc(FALLBACK_SPEAKER_IMAGE);
    }
  }

  // Read More now depends on the quote/description.
  const isLongQuote = quote.length > ROLE_MAX_LENGTH;

  const displayedQuote = isLongQuote ? `${quote.slice(0, ROLE_MAX_LENGTH).trimEnd()}...` : quote;

  // Keep the original role and quote values in the details URL.
  const detailsUrl = {
    pathname: '/speaker-details',
    query: {
      name: author,
      role,
      company: quote,
      image: imageSrc,
      year,
      section: sectionTitle,
    },
  };

  return (
    <article
      className="winner-profile-card winner-profile-card--red"
      data-section={sectionTitle}
      data-index={index}
    >
      <div className="winner-profile-media">
        <img
          src={imageSrc}
          alt={author}
          className="winner-profile-image"
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      <div className="winner-profile-body">
        <h3>{author}</h3>

        {/* ROLE DISPLAYED IN THE CATEGORY AREA */}
        {/* <p className="winner-profile-category">
          {role || 'Company info unavailable'}
        </p> */}

        {role ? <p className="winner-profile-category">{role}</p> : null}

        {/* QUOTE/DESCRIPTION DISPLAYED BELOW THE ROLE */}
        {quote ? (
          <div className="winner-profile-role">
            <p className="winner-profile-company">{displayedQuote}</p>

            {isLongQuote ? (
              <Link
                href={detailsUrl}
                className="speaker-role-read-more"
                aria-label={`Read full quote and details for ${author}`}
              >
                Read More
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

/* =========================================================
   GET SECTION ITEMS
========================================================= */

function getSectionItems(section: unknown): unknown[] {
  if (Array.isArray(section)) {
    return section;
  }

  if (!isRecord(section)) {
    return [];
  }

  const data = isRecord(section.data) ? section.data : null;
  const candidates: unknown[] = [];

  // DATA OBJECT
  if (data) {
    candidates.push(
      data.testimonials,
      data.items,
      data.members,
      data.speakers,
      data.partnerSpeakers,
      data.partner_speakers,
      data.cioIndustrySpeakers,
      data.cio_industry_speakers,
      data.industrySpeakers,
      data.industry_speakers,
      data.winners,
      data.rows,
      data.blocks,
      data.values,
      data.cards,
      data.entries,
      data.records,
      data.data,
      data.results,
    );
  }

  // SECTION OBJECT
  candidates.push(
    section.testimonials,
    section.items,
    section.members,
    section.speakers,
    section.partnerSpeakers,
    section.partner_speakers,
    section.cioIndustrySpeakers,
    section.cio_industry_speakers,
    section.industrySpeakers,
    section.industry_speakers,
    section.winners,
    section.rows,
    section.blocks,
    section.values,
    section.cards,
    section.entries,
    section.records,
    section.data,
    section.results,
  );

  // RETURN FIRST ARRAY
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}

/* =========================================================
   EXTRACT SPEAKERS
========================================================= */

function extractPageSpeakers(page: WebsitePage | null): unknown[] {
  if (!page) {
    return [];
  }

  const pageSections: unknown[] = Array.isArray(page.sections) ? page.sections : [];

  const pageBlocks: unknown[] = Array.isArray(page.content?.blocks) ? page.content.blocks : [];

  const sourceItems = pageSections.length > 0 ? pageSections : pageBlocks;

  const speakers: unknown[] = [];

  // EXTRACT FROM SECTIONS/BLOCKS
  for (const section of sourceItems) {
    const items = getSectionItems(section);

    if (items.length > 0) {
      speakers.push(...items);
    }
  }

  // DIRECT PAGE DATA
  if (speakers.length === 0) {
    const directItems = getSectionItems(page);

    if (directItems.length > 0) {
      speakers.push(...directItems);
    }
  }

  return speakers;
}

/* =========================================================
   SPEAKER DETAIL PAGE
========================================================= */

export default function SpeakerDetailClient({ slug }: SpeakerDetailClientProps) {
  const [page, setPage] = useState<WebsitePage | null>(null);

  const [speakerPage, setSpeakerPage] = useState<WebsitePage | null>(null);

  const [partnerSpeakerPage, setPartnerSpeakerPage] = useState<WebsitePage | null>(null);

  const [cioIndustrySpeakerPage, setCioIndustrySpeakerPage] = useState<WebsitePage | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const year = getSpeakerYear(slug);

  const speakerSlug = getSpeakerSlug(slug);

  const partnerSpeakerSlug = getPartnerSpeakerSlug(slug);

  const cioIndustrySpeakerSlug = getCioIndustrySpeakerSlug(slug);

  /* =========================================================
     LOAD YEAR-SPECIFIC PAGES
  ========================================================= */

  useEffect(() => {
    let isMounted = true;
    let restoreSeo: (() => void) | undefined;

    async function loadSpeakerPages() {
      try {
        setIsLoading(true);
        setError(null);

        // SPEAKER API
        const speakerResponse = await fetchWebsitePageBySlug(speakerSlug).catch(() => null);

        // PARTNER SPEAKER API
        const partnerSpeakerResponse = await fetchWebsitePageBySlug(partnerSpeakerSlug).catch(
          () => null,
        );

        // CIO INDUSTRY SPEAKER API
        const cioIndustrySpeakerResponse = await fetchWebsitePageBySlug(
          cioIndustrySpeakerSlug,
        ).catch(() => null);

        if (!isMounted) {
          return;
        }

        const speakerData =
          speakerResponse?.success && speakerResponse.data ? speakerResponse.data : null;

        const partnerSpeakerData =
          partnerSpeakerResponse?.success && partnerSpeakerResponse.data
            ? partnerSpeakerResponse.data
            : null;

        const cioIndustrySpeakerData =
          cioIndustrySpeakerResponse?.success && cioIndustrySpeakerResponse.data
            ? cioIndustrySpeakerResponse.data
            : null;

        setSpeakerPage(speakerData);
        setPartnerSpeakerPage(partnerSpeakerData);
        setCioIndustrySpeakerPage(cioIndustrySpeakerData);

        // The primary available speaker page also supplies its SEO metadata.
        const primaryPage = speakerData || partnerSpeakerData || cioIndustrySpeakerData || null;
        setPage(primaryPage);
        if (primaryPage) {
          restoreSeo = applyPageSeo(primaryPage);
        }

        if (!speakerData && !partnerSpeakerData && !cioIndustrySpeakerData) {
          setError(
            speakerResponse?.message ||
              partnerSpeakerResponse?.message ||
              cioIndustrySpeakerResponse?.message ||
              `Unable to load speaker data for ${slug}.`,
          );
        }
      } catch (err: unknown) {
        if (!isMounted) {
          return;
        }

        setPage(null);
        setSpeakerPage(null);
        setPartnerSpeakerPage(null);
        setCioIndustrySpeakerPage(null);

        setError(err instanceof Error ? err.message : 'Unable to load speaker pages.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSpeakerPages();

    return () => {
      isMounted = false;
      restoreSeo?.();
    };
  }, [slug, speakerSlug, partnerSpeakerSlug, cioIndustrySpeakerSlug]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Loading speakers...</p>

          <p>
            Loading Speakers {year}, Partner Speakers {year}, and CIO Industry Speakers {year}.
          </p>
        </section>
      </main>
    );
  }

  /* =========================================================
     COMPLETE FAILURE
  ========================================================= */

  if (error && !speakerPage && !partnerSpeakerPage && !cioIndustrySpeakerPage) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Unable to load speakers</p>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     NO PAGE
  ========================================================= */

  if (!page && !speakerPage && !partnerSpeakerPage && !cioIndustrySpeakerPage) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Speakers not found</p>

          <p>No speaker page was returned for the slug {slug}.</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     PAGE INFORMATION
  ========================================================= */

  const pageTitle = page?.title?.trim() || `Speaker Profiles ${year}`;

  const pageShortDescription = page?.shortDescription?.trim() || '';

  /* =========================================================
     EXTRACT DATA
  ========================================================= */

  const speakers = extractPageSpeakers(speakerPage);

  const partnerSpeakers = extractPageSpeakers(partnerSpeakerPage);

  const cioIndustrySpeakers = extractPageSpeakers(cioIndustrySpeakerPage);

  const speakerCount = speakers.length;

  const partnerSpeakerCount = partnerSpeakers.length;

  const cioIndustrySpeakerCount = cioIndustrySpeakers.length;

  const showSpeakers = speakerCount > 0;

  const showPartnerSpeakers = partnerSpeakerCount > 0;

  const showCioIndustrySpeakers = cioIndustrySpeakerCount > 0;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="winners-detail-page">
      {/* PAGE HEADER */}
      <section className="winners-detail-card">
        <p className="winners-kicker">Speaker Profiles</p>

        <h1>{pageTitle}</h1>

        <p>
          Meet the industry leaders, experts, and innovators sharing their insights and experience.
        </p>

        {pageShortDescription ? (
          <p className="winners-detail-summary">{pageShortDescription}</p>
        ) : null}
      </section>

      {/* SPEAKERS */}
      {showSpeakers ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Speaker Profiles</p>

            <h2>{year === '2017' ? 'Keynote Speakers' : `SPEAKERS ${year}`}</h2>

            <span>{speakerCount} Members</span>
          </div>

          <div className="winner-section-grid">
            {speakers.map((speaker, index) => (
              <SpeakerCard
                key={`speaker-${year}-${index}`}
                speaker={speaker}
                sectionTitle={`SPEAKERS-${year}`}
                index={index}
                year={year}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* CIO INDUSTRY SPEAKERS */}
      {showCioIndustrySpeakers ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">CIO Industry Speaker Profiles</p>

            <h2>CIO INDUSTRY SPEAKERS {year}</h2>

            <span>{cioIndustrySpeakerCount} Members</span>
          </div>

          <div className="winner-section-grid">
            {cioIndustrySpeakers.map((speaker, index) => (
              <SpeakerCard
                key={`cio-industry-speaker-${year}-${index}`}
                speaker={speaker}
                sectionTitle={`CIO-INDUSTRY-SPEAKERS-${year}`}
                index={index}
                year={year}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* PARTNER SPEAKERS */}
      {showPartnerSpeakers ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Partner Speaker Profiles</p>

            <h2>PARTNER SPEAKERS {year}</h2>

            <span>{partnerSpeakerCount} Members</span>
          </div>

          <div className="winner-section-grid">
            {partnerSpeakers.map((speaker, index) => (
              <SpeakerCard
                key={`partner-speaker-${year}-${index}`}
                speaker={speaker}
                sectionTitle={`PARTNER-SPEAKERS-${year}`}
                index={index}
                year={year}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* EMPTY STATE */}
      {!showSpeakers && !showPartnerSpeakers && !showCioIndustrySpeakers ? (
        <section className="winner-section-block">
          <p>No speaker cards were found for {slug}.</p>
        </section>
      ) : null}
    </main>
  );
}
