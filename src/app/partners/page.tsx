const partnerCategories = [
  {
    title: 'Technology Partners',
    description:
      'Organizations supporting digital transformation, platforms, and enterprise technology adoption.',
  },
  {
    title: 'Strategic Partners',
    description:
      'Brands that collaborate on leadership programs, summits, and high-impact industry initiatives.',
  },
  {
    title: 'Media Partners',
    description:
      'Publishing and communication partners helping extend the reach of flagship CIO Power List stories.',
  },
  {
    title: 'Research Partners',
    description:
      'Insight-driven collaborators who add data, benchmarking, and thought leadership to the program.',
  },
  {
    title: 'Event Partners',
    description:
      'Organizations enabling live experiences, experiences, and executive networking formats.',
  },
  {
    title: 'Innovation Partners',
    description:
      'Partners aligned with emerging technologies, startups, and future-facing business models.',
  },
  {
    title: 'Association Partners',
    description:
      'Industry associations and communities that strengthen executive engagement across sectors.',
  },
  {
    title: 'Knowledge Partners',
    description:
      'Experts and institutions contributing frameworks, case studies, and executive education value.',
  },
  {
    title: 'Experience Partners',
    description:
      'Creative and hospitality collaborators shaping memorable award and conference experiences.',
  },
  {
    title: 'Digital Partners',
    description:
      'Platforms and teams that support online visibility, campaign delivery, and digital amplification.',
  },
];

export default function PartnersPage() {
  return (
    <main className="partners-page">
      <section className="partners-hero">
        <p className="partners-kicker">Partner Category</p>
        <h1>Partners and Categories</h1>
        <p>
          The partners page lists the main collaboration categories used across CIO Power List
          programs and related initiatives.
        </p>
      </section>

      <section className="partners-grid">
        {partnerCategories.map((partner) => (
          <article key={partner.title} className="partner-card">
            <span className="partner-card-label">Category</span>
            <h2>{partner.title}</h2>
            <p>{partner.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
