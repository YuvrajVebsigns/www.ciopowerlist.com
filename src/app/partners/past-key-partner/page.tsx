// export default function PastKeyPartnerPage() {
//   const partners = [
//     '/assets/pastkeyPartner/Past_Key_Partners_1.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_2.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_3.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_4.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_5.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_6.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_7.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_8.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_9.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_10.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_11.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_12.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_13.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_14.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_15.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_16.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_17.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_18.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_19.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_20.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_21.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_22.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_23.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_24.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_25.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_26.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_27.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_28.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_29.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_30.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_31.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_32.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_33.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_34.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_35.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_36.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_37.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_38.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_39.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_40.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_41.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_42.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_43.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_44.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_45.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_46.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_47.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_48.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_49.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_50.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_61.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_62.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_63.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_64.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_65.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_66.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_67.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_68.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_69.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_70.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_71.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_72.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_73.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_74.png',
//     '/assets/pastkeyPartner/Past_Key_Partners_75.png',
//   ];

//   return (
//     <main>
//       <section className="past-partners-section">
//         <div className="past-partners-container">
//           <div className="past-partners-heading">
//             <span className="partner2026-label11">PAST KEY PARTNERS</span>

//             <h1 className="past-partners-title">
//               Our Trusted <span>Past Key Partners</span>
//             </h1>

//             <p className="past-partners-description">
//               We are proud to have collaborated with leading organizations and technology innovators
//               who have contributed to the success of our platforms and initiatives over the years.
//             </p>
//           </div>

//           <div className="past-partners-grid">
//             {partners.map((logo, index) => (
//               <div key={index} className="past-partner-card">
//                 <img src={logo} alt={`Partner ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.service';
import Image from 'next/image';

type Partner = {
  id?: string | number;
  name?: string;
  title?: string;
  alt?: string;
  image: string;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
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
    : originalCanonical;
  if (canonical && canonicalUrl) {
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
  }

  const originalSchema = document.head.querySelector<HTMLScriptElement>(
    'script[data-page-seo-schema="true"]',
  );
  const schemaText = originalSchema?.textContent ?? null;
  const schemaMarkup = getString(seo.schemaMarkup);
  const schema = schemaMarkup
    ? (originalSchema ?? document.head.appendChild(document.createElement('script')))
    : originalSchema;
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
  const ogTitle = getString(seo.ogTitle) || metaTitle;
  const ogDescription = getString(seo.ogDescription) || metaDescription;
  const twitterTitle = getString(seo.twitterTitle) || metaTitle;
  const twitterDescription = getString(seo.twitterDescription) || metaDescription;
  const robots =
    seo.noIndex === true || seo.noFollow === true
      ? `${seo.noIndex === true ? 'noindex' : 'index'}, ${seo.noFollow === true ? 'nofollow' : 'follow'}`
      : getString(seo.robots) || 'index, follow';

  document.title = metaTitle;
  setMeta('name', 'description', metaDescription);
  if (metaKeywords) setMeta('name', 'keywords', metaKeywords);
  setMeta('name', 'robots', robots);
  setMeta('property', 'og:title', ogTitle);
  setMeta('property', 'og:description', ogDescription);
  setMeta('property', 'og:type', 'website');
  setMeta('name', 'twitter:card', 'summary');
  setMeta('name', 'twitter:title', twitterTitle);
  setMeta('name', 'twitter:description', twitterDescription);

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
    } else if (canonical) {
      canonical.remove();
    }

    if (originalSchema) {
      originalSchema.textContent = schemaText;
    } else if (schema) {
      schema.remove();
    }
  };
}

function getImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (!isRecord(value)) return '';

  for (const key of [
    'url',
    'src',
    'path',
    'href',
    'secure_url',
    'Location',
    'imageUrl',
    'logoUrl',
    'originalUrl',
    'fileUrl',
    'downloadUrl',
  ]) {
    const url = getString(value[key]);

    if (url) return url;
  }

  for (const key of ['urlVariants', 'variants', 'formats', 'urls']) {
    const variants = value[key];

    if (!isRecord(variants)) continue;

    for (const variant of ['original', 'large', 'medium', 'thumbnail', 'full']) {
      const url = getImageUrl(variants[variant]);

      if (url) return url;
    }
  }

  return '';
}

function getPartnerImage(value: UnknownRecord): string {
  for (const key of [
    'logo',
    'logoUrl',
    'image',
    'imageUrl',
    'src',
    'url',
    'picture',
    'photo',
    'avatar',
    'thumbnail',
    'file',
    'asset',
    'media',
    'desktopImage',
    'webImage',
  ]) {
    const url = getImageUrl(value[key]);

    if (url) return url;
  }

  return '';
}

function getPartnerName(value: UnknownRecord): string {
  for (const key of ['name', 'title', 'alt', 'label', 'companyName', 'author']) {
    const name = getString(value[key]);

    if (name) return name;
  }

  return '';
}

function isImagePath(value: string): boolean {
  return (
    /^https?:\/\//i.test(value) ||
    value.startsWith('/') ||
    /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(value)
  );
}

function extractPartners(page: WebsitePage): Partner[] {
  const results: Partner[] = [];
  const seen = new Set<string>();
  const visited = new WeakSet<object>();

  const imageFields = [
    'logo',
    'logoUrl',
    'image',
    'imageUrl',
    'src',
    'url',
    'picture',
    'photo',
    'avatar',
    'thumbnail',
    'file',
    'asset',
    'media',
    'desktopImage',
    'webImage',
  ];

  const nameFields = ['name', 'title', 'alt', 'label', 'companyName', 'author'];

  function addPartner(image: string, record?: UnknownRecord) {
    const normalizedImage = image.trim();

    if (!normalizedImage || seen.has(normalizedImage)) return;

    seen.add(normalizedImage);

    results.push({
      id: typeof record?.id === 'string' || typeof record?.id === 'number' ? record.id : undefined,
      name: record ? getPartnerName(record) : undefined,
      title: record ? getString(record.title) : undefined,
      alt: record ? getString(record.alt) : undefined,
      image: normalizedImage,
    });
  }

  function visit(value: unknown, depth = 0): void {
    // if (depth > 15 || value == null) return;
    if (depth > 15 || value === null) return;
    if (typeof value === 'string') {
      if (isImagePath(value)) addPartner(value);
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

    // Look for an image URL directly on this object.
    const image = getPartnerImage(value);

    if (image) {
      addPartner(image, value);
    } else {
      // Some CMS entries store the URL in a custom field.
      for (const [key, item] of Object.entries(value)) {
        const normalizedKey = key.toLowerCase();

        const isImageField =
          imageFields.some((field) => normalizedKey.includes(field.toLowerCase())) ||
          normalizedKey.includes('image') ||
          normalizedKey.includes('logo') ||
          normalizedKey.includes('picture');

        if (isImageField) {
          const candidate = getImageUrl(item);

          if (candidate) {
            addPartner(candidate, value);
          }
        }
      }
    }

    // Recursively inspect nested sections, blocks, and galleries.
    for (const [key, item] of Object.entries(value)) {
      // if (item == null) continue;
      if (item === null || item === undefined) continue;

      const normalizedKey = key.toLowerCase();

      // Avoid treating unrelated IDs and metadata as image URLs.
      if (
        typeof item === 'string' &&
        !imageFields.includes(normalizedKey) &&
        !nameFields.includes(normalizedKey) &&
        !normalizedKey.includes('image') &&
        !normalizedKey.includes('logo') &&
        !normalizedKey.includes('picture') &&
        !normalizedKey.includes('photo') &&
        !normalizedKey.includes('avatar') &&
        !normalizedKey.includes('thumbnail') &&
        !normalizedKey.includes('asset') &&
        !normalizedKey.includes('media') &&
        !normalizedKey.includes('url') &&
        !normalizedKey.includes('path') &&
        !normalizedKey.includes('src') &&
        !normalizedKey.includes('file')
      ) {
        continue;
      }

      visit(item, depth + 1);
    }
  }

  visit(page);

  // console.log('Past Key Partners: extracted logos:', results);

  return results;
}

export default function PastKeyPartnerPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    let restoreSeo: (() => void) | undefined;

    async function loadPartners() {
      try {
        setLoading(true);
        setError('');

        const response = await fetchWebsitePageBySlug('past-key-partners');

        // console.log('Past Key Partners: complete API response:', response);

        if (!response.success || !response.data) {
          throw new Error(response.message || 'Unable to load past key partners.');
        }

        const dynamicPartners = extractPartners(response.data);

        if (active) {
          restoreSeo = applyPageSeo(response.data);
          setPartners(dynamicPartners);

          if (dynamicPartners.length === 0) {
            setError(
              'No partner logos found in the API response. Check the browser console for the complete response.',
            );
          }
        }
      } catch (err) {
        // console.error('Failed to load past key partners:', err);

        if (active) {
          setPartners([]);
          setError('Unable to load past key partners. Please try again later.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPartners();

    return () => {
      active = false;
      restoreSeo?.();
    };
  }, []);

  return (
    <main>
      <section className="past-partners-section">
        <div className="past-partners-container">
          <div className="past-partners-heading">
            <span className="partner2026-label11">PAST KEY PARTNERS</span>

            <h1 className="past-partners-title">
              Our Trusted <span>Past Key Partners</span>
            </h1>

            <p className="past-partners-description">
              We are proud to have collaborated with leading organizations and technology innovators
              who have contributed to the success of our platforms and initiatives over the years.
            </p>
          </div>

          {loading ? (
            <div className="past-partners-loading" role="status" aria-live="polite">
              Loading partners...
            </div>
          ) : partners.length > 0 ? (
            <div className="past-partners-grid">
              {partners.map((partner, index) => (
                <div key={partner.id ?? `${partner.image}-${index}`} className="past-partner-card">
                  <Image
                    src={partner.image}
                    alt={partner.alt || partner.name || partner.title || `Partner ${index + 1}`}
                    width={420}
                    height={300}
                    loading="lazy"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="past-partners-empty" role="status">
              {error || 'No past key partners available.'}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
