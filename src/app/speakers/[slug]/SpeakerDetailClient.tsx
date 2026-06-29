// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchWebsitePageBySlug, WebsitePage } from '@/services/pages.service';

// type SpeakerDetailClientProps = {
//   slug: string;
// };

// export default function SpeakerDetailClient({ slug }: SpeakerDetailClientProps) {
//   const [page, setPage] = useState<WebsitePage | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPage() {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetchWebsitePageBySlug(slug);
//         if (!isMounted) return;

//         if (response?.success && response.data) {
//           setPage(response.data);
//           return;
//         }

//         setError(response?.message ?? 'Unable to load speaker page.');
//       } catch (err: unknown) {
//         setError(
//           err instanceof Error ? err.message : 'Unable to load speaker page. Please try again.',
//         );
//       } finally {
//         if (isMounted) setIsLoading(false);
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

//   const getSectionItems = (section: unknown) => {
//     if (Array.isArray(section)) {
//       return section as unknown[];
//     }

//     const sectionRecord = section as Record<string, unknown>;
//     const data = sectionRecord.data as Record<string, unknown> | undefined;
//     const candidates: unknown[] = [];

//     if (data && typeof data === 'object') {
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
//       sectionRecord.testimonials,
//       sectionRecord.items,
//       sectionRecord.members,
//       sectionRecord.speakers,
//       sectionRecord.winners,
//       sectionRecord.rows,
//       sectionRecord.blocks,
//       sectionRecord.values,
//     );

//     for (const candidate of candidates) {
//       if (Array.isArray(candidate)) {
//         return candidate as unknown[];
//       }
//     }

//     return [];
//   };

//   const speakerSections = pageSections
//     .map((section) => {
//       const sectionRecord = section as Record<string, unknown>;
//       const sectionData = sectionRecord.data as Record<string, unknown> | undefined;
//       const speakers = getSectionItems(section);
//       return {
//         title:
//           typeof sectionData?.sectionTitle === 'string'
//             ? sectionData.sectionTitle
//             : typeof sectionData?.title === 'string'
//               ? sectionData.title
//               : typeof sectionRecord.title === 'string'
//                 ? sectionRecord.title
//                 : typeof sectionRecord.type === 'string'
//                   ? sectionRecord.type
//                   : (page.title ?? 'Speakers'),
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
//           <section key={sectionIndex} className="winner-section-block">
//             <div className="winner-section-header winner-section-header--centered">
//               <p className="winner-section-kicker">{section.title || 'Speaker Profiles'}</p>
//               <h2>{section.title || 'Speaker Profiles'}</h2>
//               <span>{section.speakers.length} members</span>
//               <h3>Speakers 2025</h3>
//             </div>

//             <div className="winner-section-grid">
//               {section.speakers.map((speakerItem, index) => {
//                 const entry = speakerItem as Record<string, unknown>;
//                 return (
//                   <article
//                     key={`${section.title}-${index}`}
//                     className="winner-profile-card winner-profile-card--red"
//                   >
//                     <div className="winner-profile-media">
//                       <img
//                         src={
//                           typeof entry.avatar === 'string' && entry.avatar
//                             ? entry.avatar
//                             : '/assets/default-winner.png'
//                         }
//                         alt={typeof entry.author === 'string' ? entry.author : 'Speaker'}
//                         className="winner-profile-image"
//                       />
//                     </div>

//                     <div className="winner-profile-body">
//                       <h3>{typeof entry.author === 'string' ? entry.author : 'Speaker Name'}</h3>
//                       <p className="winner-profile-category">
//                         {typeof entry.role === 'string' && entry.role
//                           ? `Company: ${entry.role.trim()}`
//                           : 'Company info unavailable'}
//                       </p>
//                       {typeof entry.quote === 'string' && entry.quote ? (
//                         <p className="winner-profile-company">&quot;{entry.quote}&quot;</p>
//                       ) : null}
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>

//             <div className="winner-section-header winner-section-header--centered">
//               <span>{section.speakers.length} members</span>
//               <h3>Partner Speakers</h3>
//             </div>

//             <div className="winner-section-grid">
//               {section.speakers.map((speakerItem, index) => {
//                 const entry = speakerItem as Record<string, unknown>;
//                 return (
//                   <article
//                     key={`${section.title}-${index}`}
//                     className="winner-profile-card winner-profile-card--red"
//                   >
//                     <div className="winner-profile-media">
//                       <img
//                         src={
//                           typeof entry.avatar === 'string' && entry.avatar
//                             ? entry.avatar
//                             : '/assets/default-winner.png'
//                         }
//                         alt={typeof entry.author === 'string' ? entry.author : 'Speaker'}
//                         className="winner-profile-image"
//                       />
//                     </div>

//                     <div className="winner-profile-body">
//                       <h3>{typeof entry.author === 'string' ? entry.author : 'Speaker Name'}</h3>
//                       <p className="winner-profile-category">
//                         {typeof entry.role === 'string' && entry.role
//                           ? `Company: ${entry.role.trim()}`
//                           : 'Company info unavailable'}
//                       </p>
//                       {typeof entry.quote === 'string' && entry.quote ? (
//                         <p className="winner-profile-company">&quot;{entry.quote}&quot;</p>
//                       ) : null}
//                     </div>
//                   </article>
//                 );
//               })}
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

type SpeakerSection = {
  title: string;
  speakers: unknown[];
};

type SpeakerCardProps = {
  speaker: unknown;
  sectionTitle: string;
  index: number;
};

const FALLBACK_SPEAKER_IMAGE = '/assets/team/1.jpg';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Normal image URL aur API media object dono handle karega.
 */
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

/**
 * Speaker card:
 * API image missing ya broken ho to static fallback image show hogi.
 */
function SpeakerCard({ speaker, sectionTitle, index }: SpeakerCardProps) {
  const entry = isRecord(speaker) ? speaker : {};

  const author =
    getString(entry.author) || getString(entry.name) || getString(entry.fullName) || 'Speaker Name';

  const role =
    getString(entry.role) ||
    getString(entry.designation) ||
    getString(entry.position) ||
    getString(entry.company);

  const quote = getString(entry.quote) || getString(entry.description) || getString(entry.message);

  const apiImage =
    getSpeakerImageUrl(entry.avatar) ||
    getSpeakerImageUrl(entry.image) ||
    getSpeakerImageUrl(entry.photo) ||
    getSpeakerImageUrl(entry.profileImage) ||
    getSpeakerImageUrl(entry.profilePhoto) ||
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

export default function SpeakerDetailClient({ slug }: SpeakerDetailClientProps) {
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

        setError(response?.message ?? 'Unable to load speaker page.');
      } catch (err: unknown) {
        if (!isMounted) {
          return;
        }

        setPage(null);

        setError(
          err instanceof Error ? err.message : 'Unable to load speaker page. Please try again.',
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
          <p className="winners-kicker">Loading speaker...</p>

          <p>Fetching page data for {slug}.</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Unable to load speaker</p>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  if (!page) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Speaker not found</p>

          <p>No speaker page was returned for the slug {slug}.</p>
        </section>
      </main>
    );
  }

  const pageSections: unknown[] = Array.isArray(page.sections)
    ? page.sections
    : Array.isArray(page.content?.blocks)
      ? page.content.blocks
      : [];

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
        data.speakers,
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
      section.speakers,
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

  const speakerSections: SpeakerSection[] = pageSections
    .map((section): SpeakerSection => {
      if (!isRecord(section)) {
        return {
          title: page.title ?? 'Speaker Profiles',
          speakers: [],
        };
      }

      const sectionData = isRecord(section.data) ? section.data : null;

      const speakers = getSectionItems(section);

      const title =
        getString(sectionData?.sectionTitle) ||
        getString(sectionData?.title) ||
        getString(section.title) ||
        getString(section.type) ||
        page.title ||
        'Speaker Profiles';

      return {
        title,
        speakers,
      };
    })
    .filter((section) => section.speakers.length > 0);

  return (
    <main className="winners-detail-page">
      <section className="winners-detail-card">
        <p className="winners-kicker">Speaker Profile</p>

        <h1>{page.title}</h1>

        {page.shortDescription ? (
          <p className="winners-detail-summary">{page.shortDescription}</p>
        ) : null}
      </section>

      {speakerSections.length > 0 ? (
        speakerSections.map((section, sectionIndex) => (
          <section key={`${section.title}-${sectionIndex}`} className="winner-section-block">
            <div className="winner-section-header winner-section-header--centered">
              <p className="winner-section-kicker">{section.title || 'Speaker Profiles'}</p>

              <h2>{section.title || 'Speaker Profiles'}</h2>

              <span>{section.speakers.length} members</span>

              <h3>Speakers 2025</h3>
            </div>

            <div className="winner-section-grid">
              {section.speakers.map((speaker, index) => (
                <SpeakerCard
                  key={`speaker-${section.title}-${index}`}
                  speaker={speaker}
                  sectionTitle={`${section.title}-Speakers-2025`}
                  index={index}
                />
              ))}
            </div>

            <div className="winner-section-header winner-section-header--centered">
              <span>{section.speakers.length} members</span>

              <h3>Partner Speakers</h3>
            </div>

            <div className="winner-section-grid">
              {section.speakers.map((speaker, index) => (
                <SpeakerCard
                  key={`partner-${section.title}-${index}`}
                  speaker={speaker}
                  sectionTitle={`${section.title}-Partner-Speakers`}
                  index={index}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="winner-section-block">
          <p>No speaker cards were found for this page.</p>
        </section>
      )}
    </main>
  );
}
