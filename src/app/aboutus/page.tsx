'use client';

import Link from 'next/link';

export default function AboutUsPage() {
  // heroContentRef removed (not used)

  return (
    <>
      <section className="social-media-section" style={{ padding: '40px 24px' }}>
        <div className="social-media-container">
          <div className="social-media-row">
            <div className="social-media-content">
              <h2>About CIO Choice</h2>

              <p className="social-media-highlight">
                <strong>“CIO CHOICE”</strong> is a B2B platform uniquely positioned to recognize and
                honor products, services and solutions on the back of stated preferences of CIOs and
                ICT decision makers.
              </p>

              <p>
                CIO Choice platform fosters collaboration between CIOs and ICT vendors, facilitating
                the exchange of best practices among the leaders of the worlds premiere technology
                driven enterprises. CIO Choice Honor Title from Centre of Recognition & Excellence
                is a thoughtful initiative where preferred vendors are recommended and recognized
                <strong> By the CIOs, For the CIOs.</strong>
              </p>

              <p>
                It is a proven industry approach and first-of-its-kind in the ICT industry—one based
                on trust and cooperation between high performance ICT Business Leaders, CIOs &
                Customer Centric Vendors so they can continue to adapt and drive innovation across
                the enterprise. Dedicated to providing actionable value to each of the functional
                disciplines across the executive suite, it is driven by relevant content and
                engagements created by and for the CIOs.
              </p>

              <p>
                Working to provide an accessible connect through regional, national, global, and
                virtual platforms, the CIO Choice B2B platform provides the first neutral space in
                which CIOs & Customer Centric Vendors can safely explore ways to support each other
                in driving role-based deliverables.
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
                  href="https://website.uatcoremedia.vebsigns.com/"
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
