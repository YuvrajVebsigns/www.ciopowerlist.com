'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function AboutUsPage() {
  useEffect(() => {
    // SEO META TITLE
    document.title = 'About CIO POWERLIST | CIO Awards India';

    // Helper function to add or update SEO meta tags
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

    // META DESCRIPTION
    setMeta(
      'name',
      'description',
      'Learn about CIO PowerList and how it recognises CIOs and digital leaders for their work in technology and business.',
    );

    // SEO KEYWORDS
    setMeta(
      'name',
      'keywords',
      [
        'CIO PowerList',
        'About CIO PowerList',
        'What is CIO PowerList',
        'Top CIOs in India',
        'CIO awards in India',
        'CIO PowerList selection process',
        'CIO leadership recognition',
        'About CIO PowerList awards',
        'CIO PowerList India 2026',
        'CIO PowerList mission',
      ].join(', '),
    );

    // OPEN GRAPH DETAILS
    setMeta('property', 'og:title', "About CIO POWERLIST | Recognising India's CIOs");

    setMeta(
      'property',
      'og:description',
      'Learn about CIO POWERLIST and how it recognises CIOs and digital leaders for their work in technology and business.',
    );

    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'CIO PowerList India');
    setMeta('property', 'og:url', 'https://ciopowerlist.com/aboutus');
    setMeta('property', 'og:image', 'https://ciopowerlist.com/assets/aboutus/about-core.png');

    // TWITTER DETAILS
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', "About CIO PowerList | Recognising India's CIOs");
    setMeta(
      'name',
      'twitter:description',
      'Learn about CIO PowerList and how it recognises CIOs and digital leaders for their work in technology and business.',
    );
    setMeta('name', 'twitter:image', 'https://ciopowerlist.com/assets/aboutus/about-core.png');

    // CANONICAL URL
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', 'https://ciopowerlist.com/aboutus');
  }, []);

  return (
    <>
      <section className="social-media-section">
        <div className="social-media-container">
          <div className="social-media-content">
            <div className="social-media-text">
              <h2>About CIO POWERLIST</h2>

              <p className="social-media-highlight">
                <strong>CIO PowerList 2026</strong> brings together India’s most influential CIOs
                and Digital Leaders to recognize their leadership, innovation, and impact on
                business and technology transformation.
              </p>

              <p>
                The 12th edition of <strong>CIO PowerList</strong> is scheduled for
                <strong> June 18 & 19, 2026</strong> in Mumbai, with the theme
                <strong>
                  {' '}
                  “CIOs: The Enterprise Navigators — Setting Direction. Managing Risk. Unlocking
                  Growth”
                </strong>
                .
              </p>

              <p>
                CIOs and Digital Leaders today play a critical role in navigating business growth,
                managing risk, driving innovation, and transforming technology into a strategic
                advantage. CIO PowerList provides a prestigious platform to recognize these leaders
                and celebrate their contribution to the technology and business ecosystem.
              </p>

              <p>
                The winners are selected through a unique
                <strong> 360-degree, algorithm-based evaluation</strong> that considers multiple
                parameters across technology and business influence. The evaluation includes media
                presence, awards and achievements, industry associations, social media engagement,
                peer CIO sentiment, vendor nominations, and key achievements shared by the CIOs.
              </p>

              <p>
                With <strong>130+ CIOs being recognised</strong>, CIO PowerList combines a symposium
                and recognition program, creating an engaging environment to{' '}
                <strong>Learn, Engage, and Celebrate</strong> with India’s leading technology
                decision-makers.
              </p>

              <p>
                The platform also brings together <strong>300+ CIOs and ICT decision-makers</strong>{' '}
                from diverse industry verticals, providing technology brands with opportunities to
                build visibility, connect with influential leaders, generate business opportunities,
                strengthen relationships, and discover emerging industry trends.
              </p>

              <p>
                CIO PowerList is a celebration of the technology leaders who are shaping the future
                of business through innovation, strategic thinking, and transformative leadership.
              </p>

              <div className="social-media-back">
                <Link href="/" className="social-media-back-btn">
                  ← Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-media-section">
        <div className="social-media-container">
          <div className="social-media-row">
            <div className="social-media-content">
              <img
                src="/assets/aboutus/about-core.png"
                alt="Explore CIO Choice"
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  marginBottom: '30px',
                  objectFit: 'cover',
                }}
              />

              <h2>Explore CORE Media</h2>

              <div className="social-media-back">
                <a
                  href="https://core-mediagroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-media-back-btn"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
