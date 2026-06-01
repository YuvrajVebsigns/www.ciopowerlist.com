import Link from 'next/link';
import { speakerEntries } from './speakerData';

export default function SpeakersPage() {
  return (
    <main className="speakers-page">
      <section className="speakers-hero">
        <p className="speakers-kicker">Speakers</p>
        <h1>Speakers by Year</h1>
        <p>
          Browse the speaker archive from 2016 through 2025 using the navbar dropdown or these
          direct route cards.
        </p>
      </section>

      <section className="speakers-grid">
        {speakerEntries.map((speaker) => (
          <Link key={speaker.slug} href={speaker.route} className="speaker-card">
            <span className="speaker-card-label">{speaker.label}</span>
            <strong>{speaker.label}</strong>
            <p>{speaker.summary}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
