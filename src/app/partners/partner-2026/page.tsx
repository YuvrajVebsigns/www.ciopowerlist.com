export default function Partner2026Page() {
  const partnerGroups = [
    {
      title: 'Premium Partners',
      logos: [
        '/assets/partner2026/partner_logo_1.png',
        '/assets/partner2026/partner_logo_2.png',
        '/assets/partner2026/partner_logo_3.png',
        '/assets/partner2026/partner_logo_4.png',
        '/assets/partner2026/partner_logo_5.png',
        '/assets/partner2026/partner_logo_6.png',
        '/assets/partner2026/partner_logo_7.png',
        '/assets/partner2026/partner_logo_8.png',
        '/assets/partner2026/partner_logo_9.png',
      ],
    },
    {
      title: 'Associate Partners',
      logos: [
        '/assets/partner2026/Associate_Partners_1.png',
        '/assets/partner2026/Associate_Partners_2.png',
        '/assets/partner2026/Associate_Partners_3.png',
        '/assets/partner2026/Associate_Partners_4.png',
        '/assets/partner2026/Associate_Partners_5.png',
        '/assets/partner2026/Associate_Partners_6.png',
        '/assets/partner2026/Associate_Partners_7.png',
        '/assets/partner2026/Associate_Partners_8.png',
      ],
    },
    {
      title: 'Category Partner',
      logos: ['/assets/partner2026/category_partner.png'],
    },
    {
      title: 'Partners',
      logos: [
        '/assets/partner2026/partner_logo_1.png',
        '/assets/partner2026/partner_logo_2.png',
        '/assets/partner2026/partner_logo_3.png',
      ],
    },
  ];

  return (
    <main>
      <section className="partner2026-section">
        <div className="partner2026-container">
          <div className="partner2026-heading">
            <span className="partner2026-label11">PARTNERS 2026</span>
            <br />

            <h1 className="partner2026-title">
              Celebrating Our <span>Valued Partners</span>
            </h1>

            <p className="partner2026-description">
              We proudly collaborate with leading brands and technology partners who support CIO
              Power List 2026 and strengthen India&apos;s enterprise technology ecosystem.
            </p>
          </div>

          {partnerGroups.map((group) => (
            <div key={group.title} className="partner-group">
              <h2 className="partner-group-title">{group.title}</h2>

              <div className="partner-grid-static">
                {group.logos.map((logo, index) => (
                  <div key={index} className="partner-card">
                    <img src={logo} alt={`${group.title} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
