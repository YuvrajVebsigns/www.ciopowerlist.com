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
//  * String image URL aur media object dono handle karta hai.
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

//   const pageSections = Array.isArray(page.sections) ? page.sections : [];

//   const pageBlocks = Array.isArray(page.content?.blocks) ? page.content.blocks : [];

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
//       .map((section) => {
//         if (!isRecord(section)) {
//           return {
//             title: page.title ?? 'Winner Profiles',
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
//           page.title ||
//           'Winner Profiles';

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

//         <h1>{page.title}</h1>

//         <p>
//           Showcasing exceptional leaders who are driving digital transformation, business growth,
//           and innovation across industries.
//         </p>

//         {page.shortDescription ? (
//           <p className="winners-detail-summary">{page.shortDescription}</p>
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

const FALLBACK_WINNER_IMAGE = '/assets/team/1.jpg';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Normal URL aur API media object dono handle karega.
 */
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

function WinnerCard({ testimonial, sectionTitle, index }: WinnerCardProps) {
  const entry = isRecord(testimonial) ? testimonial : {};

  const author =
    getString(entry.author) || getString(entry.name) || getString(entry.fullName) || 'Winner Name';

  const role =
    getString(entry.role) ||
    getString(entry.designation) ||
    getString(entry.position) ||
    getString(entry.company) ||
    'Winner';

  const quote = getString(entry.quote) || getString(entry.description) || getString(entry.message);

  const apiImage =
    getWinnerImageUrl(entry.avatar) ||
    getWinnerImageUrl(entry.image) ||
    getWinnerImageUrl(entry.photo) ||
    getWinnerImageUrl(entry.profileImage) ||
    getWinnerImageUrl(entry.profilePhoto) ||
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

export default function WinnerDetailClient({ slug, kicker }: WinnerDetailClientProps) {
  const [page, setPage] = useState<WebsitePage | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchWebsitePageBySlug(slug);

        if (!isMounted) {
          return;
        }

        if (response?.success && response.data) {
          setPage(response.data);
          return;
        }

        setPage(null);

        setError(response?.message ?? 'Unable to load winner page.');
      } catch (err: unknown) {
        if (!isMounted) {
          return;
        }

        setPage(null);

        setError(
          err instanceof Error ? err.message : 'Unable to load winner page. Please try again.',
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Loading winner...</p>

          <p>Fetching page data for {slug}.</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Unable to load winner</p>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  if (!page) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Winner not found</p>

          <p>No winner page was returned for the slug {slug}.</p>
        </section>
      </main>
    );
  }

  /*
   * page null check ke baad primitive/local values
   * banaye gaye hain. Nested functions mein ab
   * nullable page state access nahi hogi.
   */
  const pageTitle = page.title?.trim() || 'Winner Profiles';

  const pageShortDescription = page.shortDescription?.trim() || '';

  const pageSections: unknown[] = Array.isArray(page.sections) ? page.sections : [];

  const pageBlocks: unknown[] = Array.isArray(page.content?.blocks) ? page.content.blocks : [];

  function getSectionItems(section: unknown): unknown[] {
    if (Array.isArray(section)) {
      return section;
    }

    if (!isRecord(section)) {
      return [];
    }

    const data = isRecord(section.data) ? section.data : null;

    const candidates: unknown[] = [];

    if (data) {
      candidates.push(
        data.testimonials,
        data.items,
        data.members,
        data.winners,
        data.rows,
        data.blocks,
        data.values,
      );
    }

    candidates.push(
      section.testimonials,
      section.items,
      section.members,
      section.winners,
      section.rows,
      section.blocks,
      section.values,
    );

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate;
      }
    }

    return [];
  }

  function buildSections(items: unknown[]): TestimonialSection[] {
    return items
      .map((section): TestimonialSection => {
        if (!isRecord(section)) {
          return {
            title: pageTitle,
            testimonials: [],
          };
        }

        const sectionData = isRecord(section.data) ? section.data : null;

        const testimonials = getSectionItems(section);

        const title =
          getString(sectionData?.sectionTitle) ||
          getString(sectionData?.title) ||
          getString(section.title) ||
          getString(section.type) ||
          pageTitle;

        return {
          title,
          testimonials,
        };
      })
      .filter((section) => section.testimonials.length > 0);
  }

  let testimonialSections = buildSections(pageSections);

  if (testimonialSections.length === 0 && pageBlocks.length > 0) {
    testimonialSections = buildSections(pageBlocks);
  }

  const allTestimonials = testimonialSections.flatMap((section) => section.testimonials);

  const technologyIcons = allTestimonials.filter((item) => {
    if (!isRecord(item)) {
      return false;
    }

    const category = String(
      item.category ?? item.type ?? item.group ?? item.awardCategory ?? '',
    ).toLowerCase();

    return category.includes('technology');
  });

  const businessIcons = allTestimonials.filter((item) => {
    if (!isRecord(item)) {
      return false;
    }

    const category = String(
      item.category ?? item.type ?? item.group ?? item.awardCategory ?? '',
    ).toLowerCase();

    return category.includes('business');
  });

  const showIconSections = technologyIcons.length > 0 || businessIcons.length > 0;

  return (
    <main className="winners-detail-page">
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

      {showIconSections ? (
        <>
          {technologyIcons.length > 0 ? (
            <section className="winner-section-block">
              <div className="winner-section-header winner-section-header--centered">
                <p className="winner-section-kicker">Winner Profiles</p>

                <h2>TECHNOLOGY ICONS</h2>

                <span>{technologyIcons.length} Members</span>
              </div>

              <div className="winner-section-grid">
                {technologyIcons.map((testimonial, index) => (
                  <WinnerCard
                    key={`technology-${index}`}
                    testimonial={testimonial}
                    sectionTitle="TECHNOLOGY ICONS"
                    index={index}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {businessIcons.length > 0 ? (
            <section className="winner-section-block">
              <div className="winner-section-header winner-section-header--centered">
                <p className="winner-section-kicker">Winner Profiles</p>

                <h2>BUSINESS ICONS</h2>

                <span>{businessIcons.length} Members</span>
              </div>

              <div className="winner-section-grid">
                {businessIcons.map((testimonial, index) => (
                  <WinnerCard
                    key={`business-${index}`}
                    testimonial={testimonial}
                    sectionTitle="BUSINESS ICONS"
                    index={index}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : testimonialSections.length > 0 ? (
        testimonialSections.map((section, sectionIndex) => (
          <section key={`${section.title}-${sectionIndex}`} className="winner-section-block">
            <div className="winner-section-header winner-section-header--centered">
              <p className="winner-section-kicker">Winner Profiles</p>

              <h2>{section.title || 'Winner Profiles'}</h2>

              <span>{section.testimonials.length} Members</span>
            </div>

            <div className="winner-section-grid">
              {section.testimonials.map((testimonial, index) => (
                <WinnerCard
                  key={`${section.title}-${index}`}
                  testimonial={testimonial}
                  sectionTitle={section.title}
                  index={index}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="winner-section-block">
          <p>No winner cards were found for this page.</p>
        </section>
      )}
    </main>
  );
}
