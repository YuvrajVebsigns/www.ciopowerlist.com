'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const FALLBACK_IMAGE = '/assets/logo/logo2.png';

function SpeakerDetailsContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name') || 'Speaker';
  const role = searchParams.get('role') || '';
  const company = searchParams.get('company') || '';
  const image = searchParams.get('image') || FALLBACK_IMAGE;
  const year = searchParams.get('year') || '';
  const section = searchParams.get('section') || 'Speaker Profile';

  return (
    <main className="speaker-details-page">
      <section className="speaker-details-card">
        <Link href="/" className="speaker-details-back">
          ← Back to Speakers
        </Link>

        <div className="speaker-details-profile">
          <div className="speaker-details-image-wrapper">
            <img
              src={image}
              alt={name}
              className="speaker-details-image"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = FALLBACK_IMAGE;
              }}
            />
          </div>

          <div className="speaker-details-content">
            <p className="speaker-details-kicker">
              {section.replaceAll('-', ' ')}
              {year ? ` · ${year}` : ''}
            </p>

            <h1>{name}</h1>

            {company ? (
              <div className="speaker-details-company">
                <h2>Role</h2>
                <p>{company}</p>
              </div>
            ) : null}

            <div className="speaker-details-role-section">
              <h2>About</h2>
              <p className="speaker-details-role">{role || 'Role information unavailable.'}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SpeakerDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="speaker-details-page">
          <section className="speaker-details-card">Loading speaker details...</section>
        </main>
      }
    >
      <SpeakerDetailsContent />
    </Suspense>
  );
}
