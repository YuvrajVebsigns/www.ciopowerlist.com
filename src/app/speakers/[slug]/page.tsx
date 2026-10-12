import { notFound } from 'next/navigation';
import SpeakerDetailClient from './SpeakerDetailClient';

type SpeakerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SpeakerDetailPage({ params }: SpeakerPageProps) {
  const { slug } = await params;

  if (!/^speaker-20\d{2}$/.test(slug)) {
    notFound();
  }

  return <SpeakerDetailClient slug={slug} />;
}
