import WinnerDetailClient from './WinnerDetailClient';

type WinnerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WinnerDetailPage({ params }: WinnerPageProps) {
  const { slug } = await params;
  return <WinnerDetailClient slug={slug} />;
}
