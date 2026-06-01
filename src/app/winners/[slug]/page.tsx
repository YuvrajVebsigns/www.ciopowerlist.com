import { notFound } from 'next/navigation';
import { getWinnerBySlug, winnerEntries } from '../winnerData';

type WinnerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WinnerDetailPage({ params }: WinnerPageProps) {
  const { slug } = await params;
  const winner = getWinnerBySlug(slug);

  if (!winner) {
    notFound();
  }

  const details = [
    { label: 'Winner Name', value: winner.label },
    { label: 'Route', value: winner.route },
    { label: 'Slug', value: winner.slug },
    {
      label: 'Display Order',
      value: String(winnerEntries.findIndex((entry) => entry.slug === slug) + 1),
    },
    { label: 'Category', value: 'Winner' },
    { label: 'Section', value: 'Navbar dropdown' },
    { label: 'Status', value: 'Published route' },
    { label: 'Summary', value: winner.summary },
    { label: 'Page Type', value: 'Dynamic winner profile' },
    { label: 'Navigation', value: 'Available from the Winners menu' },
  ];

  return (
    <main className="winners-detail-page">
      <section className="winners-detail-card">
        <p className="winners-kicker">Winner Profile</p>
        <h1>{winner.label}</h1>
        <p className="winners-detail-summary">{winner.summary}</p>

        <dl className="winners-detail-list">
          {details.map((detail) => (
            <div key={detail.label} className="winners-detail-item">
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
