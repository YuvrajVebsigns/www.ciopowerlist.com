'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

export default function HeroSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    // SEO META TITLE
    document.title = 'CIO POWERLIST India | CIO & ICT Leaders';

    // Helper function to add or update meta tags
    const setMeta = (attribute: string, key: string, content: string) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`,
      ) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // SEO META DESCRIPTION
    setMeta(
      'name',
      'description',
      'Discover CIO PowerList India and the CIOs driving technology, innovation and business growth across industries.',
    );

    // SEO KEYWORDS
    setMeta(
      'name',
      'keywords',
      [
        'CIO PowerList India',
        'CIO PowerList',
        'CIO awards in India',
        'CIO PowerList 2026',
        'CIO events in India',
        'Best CIOs in India',
        'IT leaders in India',
        'Technology leaders in India',
        'CIO conference India',
        'Top technology leaders in India',
        'CIO networking events',
        'Technology leadership awards',
        'CIO PowerList winners',
        'CIO leadership event India',
      ].join(', '),
    );

    // OPEN GRAPH DETAILS
    setMeta('property', 'og:title', 'CIO POWERLIST India | Celebrating Technology Leaders');

    setMeta(
      'property',
      'og:description',
      'Discover CIO PowerList India and the CIOs driving technology, innovation and business growth across industries.',
    );

    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'CIO POWERLIST India');
    setMeta('property', 'og:url', 'https://ciopowerlist.com/');
    setMeta('property', 'og:image', 'https://ciopowerlist.com/assets/download.png');

    // TWITTER DETAILS
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', 'CIO PowerList India | Celebrating Technology Leaders');

    setMeta(
      'name',
      'twitter:description',
      'Discover CIO PowerList India and the CIOs driving technology, innovation and business growth across industries.',
    );

    setMeta('name', 'twitter:image', 'https://ciopowerlist.com/assets/download.png');

    // CANONICAL URL
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', 'https://ciopowerlist.com/');
  }, []);

  return (
    <section className="hero-section">
      {show && (
        <div className="hero-image-only animate__animated animate__jackInTheBox">
          <Image
            src="/assets/download.png"
            alt="Hero Banner"
            width={1920}
            height={800}
            priority
            className="hero-image"
          />
        </div>
      )}
    </section>
  );
}
