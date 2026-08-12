// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.service';

// type SpeakerDetailClientProps = {
//   slug: string;
// };

// type SpeakerSection = {
//   title: string;
//   speakers: unknown[];
// };

// type SpeakerCardProps = {
//   speaker: unknown;
//   sectionTitle: string;
//   index: number;
// };

// const FALLBACK_SPEAKER_IMAGE = '/assets/logo/logo2.png';

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function getString(value: unknown): string {
//   return typeof value === 'string' ? value.trim() : '';
// }

// /**
//  * Normal image URL aur API media object dono handle karega.
//  */
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

// /**
//  * Speaker card:
//  * API image missing ya broken ho to static fallback image show hogi.
//  */
// function SpeakerCard({ speaker, sectionTitle, index }: SpeakerCardProps) {
//   const entry = isRecord(speaker) ? speaker : {};

//   const author =
//     getString(entry.author) || getString(entry.name) || getString(entry.fullName) || 'Speaker Name';

//   const role =
//     getString(entry.role) ||
//     getString(entry.designation) ||
//     getString(entry.position) ||
//     getString(entry.company);

//   const quote = getString(entry.quote) || getString(entry.description) || getString(entry.message);

//   const apiImage =
//     getSpeakerImageUrl(entry.avatar) ||
//     getSpeakerImageUrl(entry.image) ||
//     getSpeakerImageUrl(entry.photo) ||
//     getSpeakerImageUrl(entry.profileImage) ||
//     getSpeakerImageUrl(entry.profilePhoto) ||
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
//           {role ? `Company: ${role}` : 'Company info unavailable'}
//         </p>

//         {quote ? <p className="winner-profile-company">&quot;{quote}&quot;</p> : null}
//       </div>
//     </article>
//   );
// }

// export default function SpeakerDetailClient({ slug }: SpeakerDetailClientProps) {
//   const [page, setPage] = useState<WebsitePage | null>(null);

//   const [isLoading, setIsLoading] = useState(true);

//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPage() {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const response = await fetchWebsitePageBySlug(slug);

//         if (!isMounted) {
//           return;
//         }

//         if (response?.success && response.data) {
//           setPage(response.data);
//           return;
//         }

//         setPage(null);

//         setError(response?.message ?? 'Unable to load speaker page.');
//       } catch (err: unknown) {
//         if (!isMounted) {
//           return;
//         }

//         setPage(null);

//         setError(
//           err instanceof Error ? err.message : 'Unable to load speaker page. Please try again.',
//         );
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     loadPage();

//     return () => {
//       isMounted = false;
//     };
//   }, [slug]);

//   if (isLoading) {
//     return (
//       <main className="winners-detail-page">
//         <section className="winners-detail-card">
//           <p className="winners-kicker">Loading speaker...</p>

//           <p>Fetching page data for {slug}.</p>
//         </section>
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="winners-detail-page">
//         <section className="winners-detail-card">
//           <p className="winners-kicker">Unable to load speaker</p>

//           <p>{error}</p>
//         </section>
//       </main>
//     );
//   }

//   if (!page) {
//     return (
//       <main className="winners-detail-page">
//         <section className="winners-detail-card">
//           <p className="winners-kicker">Speaker not found</p>

//           <p>No speaker page was returned for the slug {slug}.</p>
//         </section>
//       </main>
//     );
//   }

//   const pageSections: unknown[] = Array.isArray(page.sections)
//     ? page.sections
//     : Array.isArray(page.content?.blocks)
//       ? page.content.blocks
//       : [];

//   function getSectionItems(section: unknown): unknown[] {
//     if (Array.isArray(section)) {
//       return section;
//     }

//     if (!isRecord(section)) {
//       return [];
//     }

//     const data = isRecord(section.data) ? section.data : null;

//     const candidates: unknown[] = [];

//     if (data) {
//       candidates.push(
//         data.testimonials,
//         data.items,
//         data.members,
//         data.speakers,
//         data.winners,
//         data.rows,
//         data.blocks,
//         data.values,
//       );
//     }

//     candidates.push(
//       section.testimonials,
//       section.items,
//       section.members,
//       section.speakers,
//       section.winners,
//       section.rows,
//       section.blocks,
//       section.values,
//     );

//     for (const candidate of candidates) {
//       if (Array.isArray(candidate)) {
//         return candidate;
//       }
//     }

//     return [];
//   }

//   const speakerSections: SpeakerSection[] = pageSections
//     .map((section): SpeakerSection => {
//       if (!isRecord(section)) {
//         return {
//           title: page.title ?? 'Speaker Profiles',
//           speakers: [],
//         };
//       }

//       const sectionData = isRecord(section.data) ? section.data : null;

//       const speakers = getSectionItems(section);

//       const title =
//         getString(sectionData?.sectionTitle) ||
//         getString(sectionData?.title) ||
//         getString(section.title) ||
//         getString(section.type) ||
//         page.title ||
//         'Speaker Profiles';

//       return {
//         title,
//         speakers,
//       };
//     })
//     .filter((section) => section.speakers.length > 0);

//   return (
//     <main className="winners-detail-page">
//       <section className="winners-detail-card">
//         <p className="winners-kicker">Speaker Profile</p>

//         <h1>{page.title}</h1>

//         {page.shortDescription ? (
//           <p className="winners-detail-summary">{page.shortDescription}</p>
//         ) : null}
//       </section>

//       {speakerSections.length > 0 ? (
//         speakerSections.map((section, sectionIndex) => (
//           <section key={`${section.title}-${sectionIndex}`} className="winner-section-block">
//             <div className="winner-section-header winner-section-header--centered">
//               <p className="winner-section-kicker">{section.title || 'Speaker Profiles'}</p>

//               <h2>{section.title || 'Speaker Profiles'}</h2>

//               <span>{section.speakers.length} members</span>

//               <h3>Speakers 2025</h3>
//             </div>

//             <div className="winner-section-grid">
//               {section.speakers.map((speaker, index) => (
//                 <SpeakerCard
//                   key={`speaker-${section.title}-${index}`}
//                   speaker={speaker}
//                   sectionTitle={`${section.title}-Speakers-2025`}
//                   index={index}
//                 />
//               ))}
//             </div>

//             <div className="winner-section-header winner-section-header--centered">
//               <span>{section.speakers.length} members</span>

//               <h3>Partner Speakers</h3>
//             </div>

//             <div className="winner-section-grid">
//               {section.speakers.map((speaker, index) => (
//                 <SpeakerCard
//                   key={`partner-${section.title}-${index}`}
//                   speaker={speaker}
//                   sectionTitle={`${section.title}-Partner-Speakers`}
//                   index={index}
//                 />
//               ))}
//             </div>
//           </section>
//         ))
//       ) : (
//         <section className="winner-section-block">
//           <p>No speaker cards were found for this page.</p>
//         </section>
//       )}
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.service';

type SpeakerDetailClientProps = {
  slug: string;
};

type SpeakerCardProps = {
  speaker: unknown;
  sectionTitle: string;
  index: number;
};

const FALLBACK_SPEAKER_IMAGE = '/assets/logo/logo2.png';

/* =========================================================
   GENERIC HELPERS
========================================================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
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
  return `speaker-${getSpeakerYear(slug)}`;
}

function getPartnerSpeakerSlug(slug: string): string {
  return `partner-speaker-${getSpeakerYear(slug)}`;
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

function SpeakerCard({ speaker, sectionTitle, index }: SpeakerCardProps) {
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

        <p className="winner-profile-category">
          {role ? `Company: ${role}` : 'Company info unavailable'}
        </p>

        {quote ? <p className="winner-profile-company">&quot;{quote}&quot;</p> : null}
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

  /*
   * DATA OBJECT
   */
  if (data) {
    candidates.push(
      data.testimonials,
      data.items,
      data.members,
      data.speakers,
      data.partnerSpeakers,
      data.partner_speakers,
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

  /*
   * SECTION OBJECT
   */
  candidates.push(
    section.testimonials,
    section.items,
    section.members,
    section.speakers,
    section.partnerSpeakers,
    section.partner_speakers,
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

  /*
   * RETURN FIRST ARRAY
   */
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

  /*
   * Extract from sections/blocks
   */
  for (const section of sourceItems) {
    const items = getSectionItems(section);

    if (items.length > 0) {
      speakers.push(...items);
    }
  }

  /*
   * Direct page data
   */
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

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const year = getSpeakerYear(slug);

  const speakerSlug = getSpeakerSlug(slug);

  const partnerSpeakerSlug = getPartnerSpeakerSlug(slug);

  /* =========================================================
     LOAD YEAR-SPECIFIC PAGES
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    async function loadSpeakerPages() {
      try {
        setIsLoading(true);
        setError(null);

        // console.log('====================================');

        // console.log('Speaker detail route:', slug);

        // console.log('Year:', year);

        // console.log('Speaker API:', speakerSlug);

        // console.log('Partner Speaker API:', partnerSpeakerSlug);

        // console.log('====================================');

        /*
         * SPEAKER API
         */
        const speakerResponse = await fetchWebsitePageBySlug(speakerSlug).catch(() => {
          return null;
        });

        /*
         * PARTNER SPEAKER API
         */
        const partnerSpeakerResponse = await fetchWebsitePageBySlug(partnerSpeakerSlug).catch(
          () => {
            return null;
          },
        );

        if (!isMounted) {
          return;
        }

        /* =====================================================
           SPEAKER PAGE
        ===================================================== */

        if (speakerResponse?.success && speakerResponse.data) {
          setSpeakerPage(speakerResponse.data);
        } else {
          setSpeakerPage(null);
        }

        /* =====================================================
           PARTNER SPEAKER PAGE
        ===================================================== */

        if (partnerSpeakerResponse?.success && partnerSpeakerResponse.data) {
          setPartnerSpeakerPage(partnerSpeakerResponse.data);
        } else {
          setPartnerSpeakerPage(null);
        }

        /* =====================================================
           PRIMARY PAGE
        ===================================================== */

        if (speakerResponse?.success && speakerResponse.data) {
          setPage(speakerResponse.data);
        } else if (partnerSpeakerResponse?.success && partnerSpeakerResponse.data) {
          setPage(partnerSpeakerResponse.data);
        } else {
          setPage(null);
        }

        /* =====================================================
           ERROR
        ===================================================== */

        const speakerLoaded = speakerResponse?.success && !!speakerResponse.data;

        const partnerSpeakerLoaded =
          partnerSpeakerResponse?.success && !!partnerSpeakerResponse.data;

        if (!speakerLoaded && !partnerSpeakerLoaded) {
          setError(
            speakerResponse?.message ||
              partnerSpeakerResponse?.message ||
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
    };
  }, [slug, year, speakerSlug, partnerSpeakerSlug]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Loading speaker...</p>

          <p>
            Fetching Speakers {year} and Partner Speakers {year}.
          </p>
        </section>
      </main>
    );
  }

  /* =========================================================
     COMPLETE FAILURE
  ========================================================= */

  if (error && !speakerPage && !partnerSpeakerPage) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Unable to load speaker</p>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     NO PAGE
  ========================================================= */

  if (!page && !speakerPage && !partnerSpeakerPage) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Speaker not found</p>

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

  // const speakers = extractPageSpeakers(speakerPage);

  // const partnerSpeakers = extractPageSpeakers(partnerSpeakerPage);

  // const speakerCount = speakers.length;

  // const partnerSpeakerCount = partnerSpeakers.length;

  // const showSpeakers = speakerCount > 0;

  // const showPartnerSpeakers = partnerSpeakerCount > 0;

  const speakers = extractPageSpeakers(speakerPage);

  const partnerSpeakers = extractPageSpeakers(partnerSpeakerPage);

  const speakerCount = speakers.length;

  const partnerSpeakerCount = partnerSpeakers.length;

  const showSpeakers = speakerCount > 0;

  const showPartnerSpeakers = partnerSpeakerCount > 0;

  /* =========================================================
     DEBUG
  ========================================================= */

  // console.log(`Speakers ${year}:`, speakers);

  // console.log(`Partner Speakers ${year}:`, partnerSpeakers);

  // console.log(`Speaker count ${year}:`, speakerCount);

  // console.log(`Partner Speaker count ${year}:`, partnerSpeakerCount);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="winners-detail-page">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="winners-detail-card">
        <p className="winners-kicker">Speaker Profile</p>

        <h1>{pageTitle}</h1>

        <p>
          Meet the industry leaders, experts, and innovators sharing their insights and experience.
        </p>

        {pageShortDescription ? (
          <p className="winners-detail-summary">{pageShortDescription}</p>
        ) : null}
      </section>

      {/* =====================================================
          SPEAKERS {YEAR}
      ===================================================== */}

      {showSpeakers ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Speaker Profiles</p>

            <h2>SPEAKERS {year}</h2>

            <span>{speakerCount} Members</span>
          </div>

          <div className="winner-section-grid">
            {speakers.map((speaker, index) => (
              <SpeakerCard
                key={`speaker-${year}-${index}`}
                speaker={speaker}
                sectionTitle={`SPEAKERS-${year}`}
                index={index}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* =====================================================
          PARTNER SPEAKERS {YEAR}
      ===================================================== */}

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
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* =====================================================
          PARTNER API EXISTS BUT NO SPEAKERS FOUND
      ===================================================== */}

      {partnerSpeakerPage && !showPartnerSpeakers ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Partner Speaker Profiles</p>

            <h2>PARTNER SPEAKERS {year}</h2>

            <span>0 Members</span>
          </div>

          <p>
            The Partner Speakers {year} page was loaded, but no speaker records were found in its
            API data.
          </p>
        </section>
      ) : null}

      {/* =====================================================
          NOTHING FOUND
      ===================================================== */}

      {!showSpeakers && !showPartnerSpeakers && !partnerSpeakerPage ? (
        <section className="winner-section-block">
          <p>No speaker cards were found for {slug}.</p>
        </section>
      ) : null}
    </main>
  );
}
