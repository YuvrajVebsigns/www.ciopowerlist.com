import { notFound } from 'next/navigation';
import { getSpeakerBySlug, speakerEntries } from '../speakerData';

type SpeakerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SpeakerDetailPage({ params }: SpeakerPageProps) {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);

  if (!speaker) {
    notFound();
  }

  const details = [
    { label: 'Speaker Name', value: speaker.label },
    { label: 'Route', value: speaker.route },
    { label: 'Slug', value: speaker.slug },
    {
      label: 'Display Order',
      value: String(speakerEntries.findIndex((entry) => entry.slug === slug) + 1),
    },
    { label: 'Category', value: 'Speaker' },
    { label: 'Section', value: 'Navbar dropdown' },
    { label: 'Status', value: 'Published route' },
    { label: 'Summary', value: speaker.summary },
    { label: 'Page Type', value: 'Dynamic speaker profile' },
    { label: 'Navigation', value: 'Available from the Speakers menu' },
  ];

  return (
    <main className="speakers-detail-page">
      <section className="speakers-detail-card">
        <p className="speakers-kicker">Speaker Profile</p>
        <h1>{speaker.label}</h1>
        <p className="speakers-detail-summary">{speaker.summary}</p>

        <dl className="speakers-detail-list">
          {details.map((detail) => (
            <div key={detail.label} className="speakers-detail-item">
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
