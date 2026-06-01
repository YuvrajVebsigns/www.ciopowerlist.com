import { winner2017Image, winner2017Sections } from './winner2017Data';

export default function Winner2017Page() {
  return (
    <main className="winners-page winners-2017-page">
      <section className="winners-hero">
        <p className="winners-kicker">Winners 2017</p>
        <h1>CIO Power List 2017</h1>
        <p>
          All 2017 winner members are grouped below as cards with a shared default image for a
          consistent presentation.
        </p>
      </section>

      {winner2017Sections.map((section) => (
        <section key={section.title} className="winner-section-block">
          <div className="winner-section-header">
            <div>
              <p className="winner-section-kicker">Section</p>
              <h2>{section.title}</h2>
            </div>
            <span>{section.entries.length} members</span>
          </div>

          <div className="winner-section-grid">
            {section.entries.map((winner) => (
              <article key={`${section.title}-${winner.name}`} className="winner-profile-card">
                <div className="winner-profile-media">
                  <img src={winner2017Image} alt={winner.name} className="winner-profile-image" />
                </div>

                <div className="winner-profile-body">
                  <h3>{winner.name}</h3>
                  <p className="winner-profile-category">Category : {winner.category}</p>
                  <p className="winner-profile-company">Company : {winner.company}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
