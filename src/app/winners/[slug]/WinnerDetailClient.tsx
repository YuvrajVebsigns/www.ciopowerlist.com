// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.service';

// type WinnerDetailClientProps = {
//   slug: string;
//   kicker?: string;
// };

// type TestimonialSection = {
//   title: string;
//   testimonials: unknown[];
// };

// type WinnerCardProps = {
//   testimonial: unknown;
//   sectionTitle: string;
//   index: number;
// };

// const FALLBACK_WINNER_IMAGE = '/assets/team/1.jpg';

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function getString(value: unknown): string {
//   return typeof value === 'string' ? value.trim() : '';
// }

// /**
//  * Normal URL aur API media object dono handle karega.
//  */
// function getWinnerImageUrl(value: unknown): string {
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

// function WinnerCard({ testimonial, sectionTitle, index }: WinnerCardProps) {
//   const entry = isRecord(testimonial) ? testimonial : {};

//   const author =
//     getString(entry.author) || getString(entry.name) || getString(entry.fullName) || 'Winner Name';

//   const role =
//     getString(entry.role) ||
//     getString(entry.designation) ||
//     getString(entry.position) ||
//     getString(entry.company) ||
//     'Winner';

//   const quote = getString(entry.quote) || getString(entry.description) || getString(entry.message);

//   const apiImage =
//     getWinnerImageUrl(entry.avatar) ||
//     getWinnerImageUrl(entry.image) ||
//     getWinnerImageUrl(entry.photo) ||
//     getWinnerImageUrl(entry.profileImage) ||
//     getWinnerImageUrl(entry.profilePhoto) ||
//     FALLBACK_WINNER_IMAGE;

//   const [imageSrc, setImageSrc] = useState(apiImage);

//   useEffect(() => {
//     setImageSrc(apiImage);
//   }, [apiImage]);

//   function handleImageError() {
//     if (imageSrc !== FALLBACK_WINNER_IMAGE) {
//       setImageSrc(FALLBACK_WINNER_IMAGE);
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

//         <p className="winner-profile-category">{role}</p>

//         {quote ? <p className="winner-profile-company">&quot;{quote}&quot;</p> : null}
//       </div>
//     </article>
//   );
// }

// export default function WinnerDetailClient({ slug, kicker }: WinnerDetailClientProps) {
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

//         setError(response?.message ?? 'Unable to load winner page.');
//       } catch (err: unknown) {
//         if (!isMounted) {
//           return;
//         }

//         setPage(null);

//         setError(
//           err instanceof Error ? err.message : 'Unable to load winner page. Please try again.',
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
//           <p className="winners-kicker">Loading winner...</p>

//           <p>Fetching page data for {slug}.</p>
//         </section>
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="winners-detail-page">
//         <section className="winners-detail-card">
//           <p className="winners-kicker">Unable to load winner</p>

//           <p>{error}</p>
//         </section>
//       </main>
//     );
//   }

//   if (!page) {
//     return (
//       <main className="winners-detail-page">
//         <section className="winners-detail-card">
//           <p className="winners-kicker">Winner not found</p>

//           <p>No winner page was returned for the slug {slug}.</p>
//         </section>
//       </main>
//     );
//   }

//   /*
//    * page null check ke baad primitive/local values
//    * banaye gaye hain. Nested functions mein ab
//    * nullable page state access nahi hogi.
//    */
//   const pageTitle = page.title?.trim() || 'Winner Profiles';

//   const pageShortDescription = page.shortDescription?.trim() || '';

//   const pageSections: unknown[] = Array.isArray(page.sections) ? page.sections : [];

//   const pageBlocks: unknown[] = Array.isArray(page.content?.blocks) ? page.content.blocks : [];

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

//   function buildSections(items: unknown[]): TestimonialSection[] {
//     return items
//       .map((section): TestimonialSection => {
//         if (!isRecord(section)) {
//           return {
//             title: pageTitle,
//             testimonials: [],
//           };
//         }

//         const sectionData = isRecord(section.data) ? section.data : null;

//         const testimonials = getSectionItems(section);

//         const title =
//           getString(sectionData?.sectionTitle) ||
//           getString(sectionData?.title) ||
//           getString(section.title) ||
//           getString(section.type) ||
//           pageTitle;

//         return {
//           title,
//           testimonials,
//         };
//       })
//       .filter((section) => section.testimonials.length > 0);
//   }

//   let testimonialSections = buildSections(pageSections);

//   if (testimonialSections.length === 0 && pageBlocks.length > 0) {
//     testimonialSections = buildSections(pageBlocks);
//   }

//   const allTestimonials = testimonialSections.flatMap((section) => section.testimonials);

//   const technologyIcons = allTestimonials.filter((item) => {
//     if (!isRecord(item)) {
//       return false;
//     }

//     const category = String(
//       item.category ?? item.type ?? item.group ?? item.awardCategory ?? '',
//     ).toLowerCase();

//     return category.includes('technology');
//   });

//   const businessIcons = allTestimonials.filter((item) => {
//     if (!isRecord(item)) {
//       return false;
//     }

//     const category = String(
//       item.category ?? item.type ?? item.group ?? item.awardCategory ?? '',
//     ).toLowerCase();

//     return category.includes('business');
//   });

//   const showIconSections = technologyIcons.length > 0 || businessIcons.length > 0;

//   return (
//     <main className="winners-detail-page">
//       <section className="winners-detail-card">
//         <p className="winners-kicker">{kicker ?? 'Winners'}</p>

//         <h1>{pageTitle}</h1>

//         <p>
//           Showcasing exceptional leaders who are driving digital transformation, business growth,
//           and innovation across industries.
//         </p>

//         {pageShortDescription ? (
//           <p className="winners-detail-summary">{pageShortDescription}</p>
//         ) : null}
//       </section>

//       {showIconSections ? (
//         <>
//           {technologyIcons.length > 0 ? (
//             <section className="winner-section-block">
//               <div className="winner-section-header winner-section-header--centered">
//                 <p className="winner-section-kicker">Winner Profiles</p>

//                 <h2>TECHNOLOGY ICONS</h2>

//                 <span>{technologyIcons.length} Members</span>
//               </div>

//               <div className="winner-section-grid">
//                 {technologyIcons.map((testimonial, index) => (
//                   <WinnerCard
//                     key={`technology-${index}`}
//                     testimonial={testimonial}
//                     sectionTitle="TECHNOLOGY ICONS"
//                     index={index}
//                   />
//                 ))}
//               </div>
//             </section>
//           ) : null}

//           {businessIcons.length > 0 ? (
//             <section className="winner-section-block">
//               <div className="winner-section-header winner-section-header--centered">
//                 <p className="winner-section-kicker">Winner Profiles</p>

//                 <h2>BUSINESS ICONS</h2>

//                 <span>{businessIcons.length} Members</span>
//               </div>

//               <div className="winner-section-grid">
//                 {businessIcons.map((testimonial, index) => (
//                   <WinnerCard
//                     key={`business-${index}`}
//                     testimonial={testimonial}
//                     sectionTitle="BUSINESS ICONS"
//                     index={index}
//                   />
//                 ))}
//               </div>
//             </section>
//           ) : null}
//         </>
//       ) : testimonialSections.length > 0 ? (
//         testimonialSections.map((section, sectionIndex) => (
//           <section key={`${section.title}-${sectionIndex}`} className="winner-section-block">
//             <div className="winner-section-header winner-section-header--centered">
//               <p className="winner-section-kicker">Winner Profiles</p>

//               <h2>{section.title || 'Winner Profiles'}</h2>

//               <span>{section.testimonials.length} Members</span>
//             </div>

//             <div className="winner-section-grid">
//               {section.testimonials.map((testimonial, index) => (
//                 <WinnerCard
//                   key={`${section.title}-${index}`}
//                   testimonial={testimonial}
//                   sectionTitle={section.title}
//                   index={index}
//                 />
//               ))}
//             </div>
//           </section>
//         ))
//       ) : (
//         <section className="winner-section-block">
//           <p>No winner cards were found for this page.</p>
//         </section>
//       )}
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.service';

type WinnerDetailClientProps = {
  slug: string;
  kicker?: string;
};

type TestimonialSection = {
  title: string;
  testimonials: unknown[];
};

type WinnerCardProps = {
  testimonial: unknown;
  sectionTitle: string;
  index: number;
};

const FALLBACK_WINNER_IMAGE = '/assets/logo/logo2.png';

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
   IMAGE HELPER
========================================================= */

function getWinnerImageUrl(value: unknown): string {
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
   WINNER CARD
========================================================= */

function WinnerCard({ testimonial, sectionTitle, index }: WinnerCardProps) {
  const entry = isRecord(testimonial) ? testimonial : {};

  const author =
    getString(entry.author) ||
    getString(entry.name) ||
    getString(entry.fullName) ||
    getString(entry.title) ||
    getString(entry.heading) ||
    getString(entry.label) ||
    'Winner Name';

  const role =
    getString(entry.role) ||
    getString(entry.designation) ||
    getString(entry.position) ||
    getString(entry.company) ||
    getString(entry.organization) ||
    getString(entry.companyName) ||
    getString(entry.affiliation) ||
    'Winner';

  const quote =
    getString(entry.quote) ||
    getString(entry.description) ||
    getString(entry.message) ||
    getString(entry.summary);

  const apiImage =
    getWinnerImageUrl(entry.avatar) ||
    getWinnerImageUrl(entry.image) ||
    getWinnerImageUrl(entry.photo) ||
    getWinnerImageUrl(entry.profileImage) ||
    getWinnerImageUrl(entry.profilePhoto) ||
    getWinnerImageUrl(entry.profile) ||
    getWinnerImageUrl(entry.media) ||
    getWinnerImageUrl(entry.file) ||
    getWinnerImageUrl(entry.thumbnail) ||
    FALLBACK_WINNER_IMAGE;

  const [imageSrc, setImageSrc] = useState(apiImage);

  useEffect(() => {
    setImageSrc(apiImage);
  }, [apiImage]);

  function handleImageError() {
    if (imageSrc !== FALLBACK_WINNER_IMAGE) {
      setImageSrc(FALLBACK_WINNER_IMAGE);
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

        <p className="winner-profile-category">{role}</p>

        {quote ? <p className="winner-profile-company">&quot;{quote}&quot;</p> : null}
      </div>
    </article>
  );
}

/* =========================================================
   GET YEAR FROM ROUTE SLUG
=========================================================

Examples:

winner-2026       -> 2026
winner-2025       -> 2025
winner-2024       -> 2024
business-icon-2026 -> 2026

========================================================= */

function getWinnerYear(slug: string): string {
  const cleanSlug = slug.trim().toLowerCase();

  const match = cleanSlug.match(/(20\d{2})$/);

  return match?.[1] || '2026';
}

/* =========================================================
   GET TECHNOLOGY SLUG
========================================================= */

function getTechnologySlug(slug: string): string {
  const year = getWinnerYear(slug);

  return `winner-${year}`;
}

/* =========================================================
   GET BUSINESS SLUG
========================================================= */

function getBusinessSlug(slug: string): string {
  const year = getWinnerYear(slug);

  return `business-icon-${year}`;
}

/* =========================================================
   GET SECTION ITEMS

   Supports all existing API structures.

   Nothing is removed from API data.
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
   * Return the first available array.
   */
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}

/* =========================================================
   GET SECTION TITLE

   Safe Record access.
========================================================= */

function getSectionTitle(section: Record<string, unknown>, fallbackTitle: string): string {
  const sectionData = isRecord(section.data) ? section.data : null;

  return (
    getString(sectionData?.sectionTitle) ||
    getString(sectionData?.title) ||
    getString(sectionData?.heading) ||
    getString(sectionData?.label) ||
    getString(sectionData?.groupTitle) ||
    getString(section.title) ||
    getString(section.heading) ||
    getString(section.label) ||
    getString(section.groupTitle) ||
    getString(section.type) ||
    fallbackTitle
  );
}

/* =========================================================
   BUILD SECTIONS
========================================================= */

function buildSections(items: unknown[], fallbackTitle: string): TestimonialSection[] {
  return items
    .map((section): TestimonialSection => {
      if (!isRecord(section)) {
        return {
          title: fallbackTitle,
          testimonials: [],
        };
      }

      const testimonials = getSectionItems(section);

      const title = getSectionTitle(section, fallbackTitle);

      return {
        title,
        testimonials,
      };
    })
    .filter((section) => section.testimonials.length > 0);
}

/* =========================================================
   EXTRACT ALL PAGE TESTIMONIALS
========================================================= */

function extractPageTestimonials(
  winnerPage: WebsitePage | null,
  fallbackTitle: string,
): TestimonialSection[] {
  if (!winnerPage) {
    return [];
  }

  const pageSections: unknown[] = Array.isArray(winnerPage.sections) ? winnerPage.sections : [];

  const pageBlocks: unknown[] = Array.isArray(winnerPage.content?.blocks)
    ? winnerPage.content.blocks
    : [];

  /*
   * FIRST: sections
   */
  let sections = buildSections(pageSections, fallbackTitle);

  /*
   * SECOND: content.blocks
   */
  if (sections.length === 0 && pageBlocks.length > 0) {
    sections = buildSections(pageBlocks, fallbackTitle);
  }

  /*
   * THIRD: direct page data
   */
  if (sections.length === 0) {
    const directItems = getSectionItems(winnerPage);

    if (directItems.length > 0) {
      sections = [
        {
          title: fallbackTitle,
          testimonials: directItems,
        },
      ];
    }
  }

  return sections;
}

/* =========================================================
   WINNER DETAIL PAGE
========================================================= */

export default function WinnerDetailClient({ slug, kicker }: WinnerDetailClientProps) {
  const [page, setPage] = useState<WebsitePage | null>(null);

  const [technologyPage, setTechnologyPage] = useState<WebsitePage | null>(null);

  const [businessPage, setBusinessPage] = useState<WebsitePage | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /* =========================================================
     LOAD DATA ACCORDING TO CURRENT ROUTE SLUG
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    async function loadWinnerPages() {
      try {
        setIsLoading(true);
        setError(null);

        /*
         * IMPORTANT:
         *
         * If current URL is:
         *
         * winner-2026
         *
         * API calls become:
         *
         * winner-2026
         * business-icon-2026
         *
         *
         * If current URL is:
         *
         * winner-2025
         *
         * API calls become:
         *
         * winner-2025
         * business-icon-2025
         *
         *
         * This continues automatically until 2015.
         */

        const technologySlug = getTechnologySlug(slug);

        const businessSlug = getBusinessSlug(slug);

        // console.log('Winner detail slug:', slug);
        // console.log('Technology API slug:', technologySlug);
        // console.log('Business API slug:', businessSlug);

        const responses = await Promise.all([
          fetchWebsitePageBySlug(technologySlug),
          fetchWebsitePageBySlug(businessSlug),
        ]);

        if (!isMounted) {
          return;
        }

        const technologyResponse = responses[0];

        const businessResponse = responses[1];

        /* =====================================================
           SAVE TECHNOLOGY PAGE
        ===================================================== */

        if (technologyResponse?.success && technologyResponse.data) {
          setTechnologyPage(technologyResponse.data);
        } else {
          setTechnologyPage(null);
        }

        /* =====================================================
           SAVE BUSINESS PAGE
        ===================================================== */

        if (businessResponse?.success && businessResponse.data) {
          setBusinessPage(businessResponse.data);
        } else {
          setBusinessPage(null);
        }

        /* =====================================================
           PRIMARY PAGE
        =====================================================

           The winner page is used as the main page.

           For:

           winner-2026 -> winner-2026
           winner-2025 -> winner-2025
           winner-2024 -> winner-2024

           etc.
        */

        if (technologyResponse?.success && technologyResponse.data) {
          setPage(technologyResponse.data);
        } else if (businessResponse?.success && businessResponse.data) {
          setPage(businessResponse.data);
        } else {
          setPage(null);
        }

        /* =====================================================
           ERROR ONLY IF BOTH APIs FAILED
        ===================================================== */

        const technologyLoaded = technologyResponse?.success && !!technologyResponse.data;

        const businessLoaded = businessResponse?.success && !!businessResponse.data;

        if (!technologyLoaded && !businessLoaded) {
          setError(
            technologyResponse?.message ||
              businessResponse?.message ||
              `Unable to load winner data for ${slug}.`,
          );
        }
      } catch (err: unknown) {
        if (!isMounted) {
          return;
        }

        setPage(null);
        setTechnologyPage(null);
        setBusinessPage(null);

        setError(
          err instanceof Error ? err.message : 'Unable to load winner pages. Please try again.',
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadWinnerPages();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Loading winner...</p>

          <p>Fetching Technology Icons and Business Icons data for {slug}.</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     COMPLETE API FAILURE
  ========================================================= */

  if (error && !technologyPage && !businessPage) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Unable to load winner</p>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     NO PAGE
  ========================================================= */

  if (!page && !technologyPage && !businessPage) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Winner not found</p>

          <p>No winner page was returned for the slug {slug}.</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     PAGE INFORMATION
  ========================================================= */

  const pageTitle = page?.title?.trim() || `Winner Profiles ${getWinnerYear(slug)}`;

  const pageShortDescription = page?.shortDescription?.trim() || '';

  /* =========================================================
     TECHNOLOGY DATA
  ========================================================= */

  const technologySections = extractPageTestimonials(technologyPage, 'TECHNOLOGY ICONS');

  const technologyTestimonials = technologySections.flatMap((section) => section.testimonials);

  /* =========================================================
     BUSINESS DATA
  ========================================================= */

  const businessSections = extractPageTestimonials(businessPage, 'BUSINESS ICONS');

  const businessTestimonials = businessSections.flatMap((section) => section.testimonials);

  const technologyCount = technologyTestimonials.length;

  const businessCount = businessTestimonials.length;

  const showTechnology = technologyCount > 0;

  const showBusiness = businessCount > 0;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="winners-detail-page">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="winners-detail-card">
        <p className="winners-kicker">{kicker ?? 'Winners'}</p>

        <h1>{pageTitle}</h1>

        <p>
          Showcasing exceptional leaders who are driving digital transformation, business growth,
          and innovation across industries.
        </p>

        {pageShortDescription ? (
          <p className="winners-detail-summary">{pageShortDescription}</p>
        ) : null}
      </section>

      {/* =====================================================
          TECHNOLOGY ICONS

          winner-2026
          winner-2025
          winner-2024
          ...
          winner-2015
      ===================================================== */}

      {showTechnology ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Winner Profiles</p>

            <h2>TECHNOLOGY ICONS</h2>

            <span>{technologyCount} Members</span>
          </div>

          <div className="winner-section-grid">
            {technologyTestimonials.map((testimonial, index) => (
              <WinnerCard
                key={`technology-${getWinnerYear(slug)}-${index}`}
                testimonial={testimonial}
                sectionTitle="TECHNOLOGY ICONS"
                index={index}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* =====================================================
          BUSINESS ICONS

          business-icon-2026
          business-icon-2025
          business-icon-2024
          ...
          business-icon-2015
      ===================================================== */}

      {showBusiness ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Winner Profiles</p>

            <h2>BUSINESS ICONS</h2>

            <span>{businessCount} Members</span>
          </div>

          <div className="winner-section-grid">
            {businessTestimonials.map((testimonial, index) => (
              <WinnerCard
                key={`business-${getWinnerYear(slug)}-${index}`}
                testimonial={testimonial}
                sectionTitle="BUSINESS ICONS"
                index={index}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* =====================================================
          FALLBACK

          Only shown when both APIs returned no cards.
      ===================================================== */}

      {!showTechnology && !showBusiness ? (
        <section className="winner-section-block">
          <p>No winner cards were found for {slug}.</p>
        </section>
      ) : null}
    </main>
  );
}
