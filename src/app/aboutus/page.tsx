'use client';

import Link from 'next/link';

export default function AboutUsPage() {
  // heroContentRef removed (not used)

  return (
    <>
      <section className="social-media-section">
        <div className="social-media-container">
          <div className="social-media-content">
            <div className="social-media-text">
              <h2>About CIO POWERLIST</h2>

              <p className="social-media-highlight">
                <strong>CIO Power List 2026</strong> brings together India’s most influential CIOs
                and Digital Leaders to recognize their leadership, innovation, and impact on
                business and technology transformation.
              </p>

              <p>
                The 12th edition of <strong>CIO Power List</strong> is scheduled for
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
                advantage. CIO Power List provides a prestigious platform to recognize these leaders
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
                With <strong>130+ CIOs being recognised</strong>, CIO Power List combines a
                symposium and recognition program, creating an engaging environment to{' '}
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
                CIO Power List is a celebration of the technology leaders who are shaping the future
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
                  href="https://coremedia.uatcoremedia.vebsigns.com/"
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
