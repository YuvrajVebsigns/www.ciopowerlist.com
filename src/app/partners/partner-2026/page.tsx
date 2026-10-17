// export default function Partner2026Page() {
//   const partnerGroups = [
//     {
//       title: 'Premium Partners',
//       logos: [
//         '/assets/partner2026/partner_logo_1.png',
//         '/assets/partner2026/partner_logo_2.png',
//         '/assets/partner2026/partner_logo_3.png',
//         '/assets/partner2026/partner_logo_4.png',
//         '/assets/partner2026/partner_logo_5.png',
//         '/assets/partner2026/partner_logo_6.png',
//         '/assets/partner2026/partner_logo_7.png',
//         '/assets/partner2026/partner_logo_8.png',
//         '/assets/partner2026/partner_logo_9.png',
//       ],
//     },
//     {
//       title: 'Associate Partners',
//       logos: [
//         '/assets/partner2026/Associate_Partners_1.png',
//         '/assets/partner2026/Associate_Partners_2.png',
//         '/assets/partner2026/Associate_Partners_3.png',
//         '/assets/partner2026/Associate_Partners_4.png',
//         '/assets/partner2026/Associate_Partners_5.png',
//         '/assets/partner2026/Associate_Partners_6.png',
//         '/assets/partner2026/Associate_Partners_7.png',
//         '/assets/partner2026/Associate_Partners_8.png',
//       ],
//     },
//     {
//       title: 'Category Partner',
//       logos: ['/assets/partner2026/category_partner.png'],
//     },
//     {
//       title: 'Partners',
//       logos: [
//         '/assets/partner2026/partner_logo_1.png',
//         '/assets/partner2026/partner_logo_2.png',
//         '/assets/partner2026/partner_logo_3.png',
//       ],
//     },
//   ];

//   return (
//     <main>
//       <section className="partner2026-section">
//         <div className="partner2026-container">
//           <div className="partner2026-heading">
//             <span className="partner2026-label11">PARTNERS 2026</span>
//             <br />

//             <h1 className="partner2026-title">
//               Celebrating Our <span>Valued Partners</span>
//             </h1>

//             <p className="partner2026-description">
//               We proudly collaborate with leading brands and technology partners who support CIO
//               Power List 2026 and strengthen India&apos;s enterprise technology ecosystem.
//             </p>
//           </div>

//           {partnerGroups.map((group) => (
//             <div key={group.title} className="partner-group">
//               <h2 className="partner-group-title">{group.title}</h2>

//               <div className="partner-grid-static">
//                 {group.logos.map((logo, index) => (
//                   <div key={index} className="partner-card">
//                     <img src={logo} alt={`${group.title} ${index + 1}`} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.service';

type PartnerLogo = {
  id?: string | number;
  name?: string;
  title?: string;
  alt?: string;
  image: string;
};

type PartnerGroup = {
  title: string;
  slug: string;
  logos: PartnerLogo[];
};

const INITIAL_GROUPS: PartnerGroup[] = [
  {
    title: 'Premium Partners',
    slug: 'premium-partners',
    logos: [],
  },
  {
    title: 'Associate Partners',
    slug: 'associate-partners',
    logos: [],
  },
  {
    title: 'Category Partner',
    slug: 'category-partner',
    logos: [],
  },
  {
    title: 'Partners',
    slug: 'partners',
    logos: [],
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (!isRecord(value)) return '';

  for (const field of [
    'url',
    'src',
    'path',
    'href',
    'secure_url',
    'Location',
    'imageUrl',
    'logoUrl',
    'fileUrl',
    'downloadUrl',
  ]) {
    const url = getString(value[field]);

    if (url) return url;
  }

  for (const field of ['urlVariants', 'variants', 'formats', 'urls']) {
    const variants = value[field];

    if (!isRecord(variants)) continue;

    for (const variant of ['original', 'large', 'medium', 'thumbnail']) {
      const url = getImageUrl(variants[variant]);

      if (url) return url;
    }
  }

  return '';
}

function getLogo(value: Record<string, unknown>): string {
  for (const field of [
    'logo',
    'logoUrl',
    'image',
    'imageUrl',
    'picture',
    'photo',
    'avatar',
    'thumbnail',
    'file',
    'asset',
    'media',
    'src',
    'url',
  ]) {
    const image = getImageUrl(value[field]);

    if (image) return image;
  }

  return '';
}

function getName(value: Record<string, unknown>): string {
  for (const field of ['name', 'title', 'alt', 'label', 'companyName', 'author']) {
    const name = getString(value[field]);

    if (name) return name;
  }

  return '';
}

function extractPartnerLogos(page: WebsitePage): PartnerLogo[] {
  const logos: PartnerLogo[] = [];
  const seen = new Set<string>();
  const visited = new WeakSet<object>();

  function addLogo(image: string, item?: Record<string, unknown>) {
    const normalizedImage = image.trim();
    const name = item ? getName(item) : '';
    const key = normalizedImage || `name:${name.toLowerCase()}`;

    if ((!normalizedImage && !name) || seen.has(key)) return;

    seen.add(key);

    logos.push({
      id: typeof item?.id === 'string' || typeof item?.id === 'number' ? item.id : undefined,
      name: name || undefined,
      title: item ? getString(item.title) : undefined,
      alt: item ? getString(item.alt) : undefined,
      image: normalizedImage,
    });
  }

  function visit(value: unknown, depth = 0): void {
    // if (depth > 12 || value == null) return;
    if (depth > 12 || value === null || value === undefined) return;

    if (typeof value === 'string') {
      // Accept direct image paths or URLs.
      if (
        value.startsWith('/') ||
        /^https?:\/\//i.test(value) ||
        /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(value)
      ) {
        addLogo(value);
      }

      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        visit(item, depth + 1);
      }

      return;
    }

    if (!isRecord(value) || visited.has(value)) return;

    visited.add(value);

    const image = getLogo(value);
    const isNamedTestimonial =
      typeof value.author === 'string' &&
      ('avatar' in value || 'role' in value || 'quote' in value);

    if (image) {
      addLogo(image, value);
    } else if (isNamedTestimonial) {
      addLogo('', value);
    } else {
      // Support image fields with custom CMS names.
      for (const [field, fieldValue] of Object.entries(value)) {
        const key = field.toLowerCase();

        if (
          key.includes('image') ||
          key.includes('logo') ||
          key.includes('picture') ||
          key.includes('photo') ||
          key.includes('avatar')
        ) {
          const imageUrl = getImageUrl(fieldValue);

          if (imageUrl) addLogo(imageUrl, value);
        }
      }
    }

    // Explore nested content blocks, sections, and gallery arrays.
    for (const [field, fieldValue] of Object.entries(value)) {
      // if (fieldValue == null) continue;
      if (fieldValue === null || fieldValue === undefined) continue;

      if (
        typeof fieldValue === 'string' &&
        !/image|logo|picture|photo|thumbnail|asset|media|url|path|src|file/i.test(field)
      ) {
        continue;
      }

      visit(fieldValue, depth + 1);
    }
  }

  visit(page);

  return logos;
}

export default function Partner2026Page() {
  const [partnerGroups, setPartnerGroups] = useState<PartnerGroup[]>(INITIAL_GROUPS);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPartnerGroups() {
      try {
        const results = await Promise.all(
          INITIAL_GROUPS.map(async (group) => {
            try {
              const response = await fetchWebsitePageBySlug(group.slug);

              if (!response.success || !response.data) {
                // console.warn(`Unable to load partner page: ${group.slug}`, response.message);

                return {
                  ...group,
                  logos: [],
                };
              }

              const logos = extractPartnerLogos(response.data);

              // console.log(`Partner logos loaded for ${group.slug}:`, logos);

              return {
                ...group,
                logos,
              };
            } catch (error) {
              // console.error(`Error loading partner page ${group.slug}:`, error);

              return {
                ...group,
                logos: [],
              };
            }
          }),
        );

        if (active) {
          setPartnerGroups(results);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPartnerGroups();

    return () => {
      active = false;
    };
  }, []);

  const visibleGroups = partnerGroups.filter((group) => group.logos.length > 0);

  return (
    <main>
      <section className="partner2026-section">
        <div className="partner2026-container">
          <div className="partner2026-heading">
            <span className="partner2026-label11">PARTNERS 2026</span>

            <h1 className="partner2026-title">
              Celebrating Our <span>Valued Partners</span>
            </h1>

            <p className="partner2026-description">
              We proudly collaborate with leading brands and technology partners who support CIO
              Power List 2026 and strengthen India&apos;s enterprise technology ecosystem.
            </p>
          </div>

          {loading ? (
            <div className="partner2026-loading" role="status" aria-live="polite">
              Loading partners...
            </div>
          ) : visibleGroups.length > 0 ? (
            visibleGroups.map((group) => (
              <div key={group.slug} className="partner-group">
                <h2 className="partner-group-title">{group.title}</h2>

                <div className="partner-grid-static">
                  {group.logos.map((partner, index) => (
                    <div key={partner.id ?? `${partner.image}-${index}`} className="partner-card1">
                      {partner.image ? (
                        <img
                          src={partner.image}
                          alt={
                            partner.alt ||
                            partner.name ||
                            partner.title ||
                            `${group.title} ${index + 1}`
                          }
                          loading="lazy"
                        />
                      ) : (
                        <span className="partner-card-name">
                          {partner.name || partner.title || partner.alt}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="partner2026-empty" role="status">
              No partner information is currently available.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
