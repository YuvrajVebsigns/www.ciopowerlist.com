'use client';

import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.service';

type WinnerDetailClientProps = {
  slug: string;
  kicker?: string;
};

type TestimonialSection = {
  title: string;
  testimonials: unknown[];
};

type WinnerCardProps = {
  testimonial: unknown;
  sectionTitle: string;
  index: number;
};

const FALLBACK_WINNER_IMAGE = '/assets/logo/logo2.png';

/* =========================================================
   GENERIC HELPERS
========================================================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/* =========================================================
   IMAGE HELPER
========================================================= */

function getWinnerImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (!isRecord(value)) {
    return '';
  }

  const urlVariants = isRecord(value.urlVariants) ? value.urlVariants : null;

  return (
    getString(value.url) ||
    getString(value.original) ||
    getString(value.large) ||
    getString(value.medium) ||
    getString(value.small) ||
    getString(value.thumbnail) ||
    getString(urlVariants?.large) ||
    getString(urlVariants?.medium) ||
    getString(urlVariants?.small) ||
    getString(urlVariants?.thumbnail)
  );
}

/* =========================================================
   WINNER CARD
========================================================= */

function WinnerCard({ testimonial, sectionTitle, index }: WinnerCardProps) {
  const entry = isRecord(testimonial) ? testimonial : {};

  const author =
    getString(entry.author) ||
    getString(entry.name) ||
    getString(entry.fullName) ||
    getString(entry.title) ||
    getString(entry.heading) ||
    getString(entry.label);

  const role =
    getString(entry.role) ||
    getString(entry.designation) ||
    getString(entry.position) ||
    getString(entry.company) ||
    getString(entry.organization) ||
    getString(entry.companyName) ||
    getString(entry.affiliation);

  const quote =
    getString(entry.quote) ||
    getString(entry.description) ||
    getString(entry.message) ||
    getString(entry.summary);

  const apiImage =
    getWinnerImageUrl(entry.avatar) ||
    getWinnerImageUrl(entry.image) ||
    getWinnerImageUrl(entry.photo) ||
    getWinnerImageUrl(entry.profileImage) ||
    getWinnerImageUrl(entry.profilePhoto) ||
    getWinnerImageUrl(entry.profile) ||
    getWinnerImageUrl(entry.media) ||
    getWinnerImageUrl(entry.file) ||
    getWinnerImageUrl(entry.thumbnail) ||
    FALLBACK_WINNER_IMAGE;

  const [imageSrc, setImageSrc] = useState(apiImage);

  useEffect(() => {
    setImageSrc(apiImage);
  }, [apiImage]);

  function handleImageError() {
    if (imageSrc !== FALLBACK_WINNER_IMAGE) {
      setImageSrc(FALLBACK_WINNER_IMAGE);
    }
  }

  return (
    <article
      className="winner-profile-card winner-profile-card--red1"
      data-section={sectionTitle}
      data-index={index}
    >
      <div className="winner-profile-media">
        <img
          src={imageSrc}
          alt={author}
          className="winner-profile-image"
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      <div className="winner-profile-body">
        <h3>{author}</h3>

        {role ? <p className="winner-profile-category">Category: {role}</p> : null}

        {quote ? <p className="winner-profile-company">Company: {quote}</p> : null}
      </div>
    </article>
  );
}

/* =========================================================
   GET YEAR FROM ROUTE SLUG

   winner-2026        -> 2026
   winner-2025        -> 2025
   business-icon-2026 -> 2026
   covid-2026         -> 2026
========================================================= */

function getWinnerYear(slug: string): string {
  const cleanSlug = slug.trim().toLowerCase();
  const match = cleanSlug.match(/(20\d{2})$/);

  return match?.[1] || '2026';
}

/* =========================================================
   GET TECHNOLOGY SLUG
========================================================= */

function getTechnologySlug(slug: string): string {
  const year = getWinnerYear(slug);

  return `winner-${year}`;
}

/* =========================================================
   GET BUSINESS SLUG
========================================================= */

function getBusinessSlug(slug: string): string {
  const year = getWinnerYear(slug);

  return `business-icon-${year}`;
}

/* =========================================================
   GET COVID SLUG

   covid-2026
   covid-2025
   covid-2024
========================================================= */

function getCovidSlug(slug: string): string {
  const year = getWinnerYear(slug);

  return `covid-${year}`;
}

/* =========================================================
   GET SECTION ITEMS

   Supports all existing API structures.
   Nothing is removed from API data.
========================================================= */

function getSectionItems(section: unknown): unknown[] {
  if (Array.isArray(section)) {
    return section;
  }

  if (!isRecord(section)) {
    return [];
  }

  const data = isRecord(section.data) ? section.data : null;

  const candidates: unknown[] = [];

  /* DATA OBJECT */

  if (data) {
    candidates.push(
      data.testimonials,
      data.items,
      data.members,
      data.winners,
      data.rows,
      data.blocks,
      data.values,
      data.cards,
      data.entries,
      data.records,
      data.data,
      data.results,
    );
  }

  /* SECTION OBJECT */

  candidates.push(
    section.testimonials,
    section.items,
    section.members,
    section.winners,
    section.rows,
    section.blocks,
    section.values,
    section.cards,
    section.entries,
    section.records,
    section.data,
    section.results,
  );

  /* RETURN THE FIRST AVAILABLE ARRAY */

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}

/* =========================================================
   GET SECTION TITLE
========================================================= */

function getSectionTitle(section: Record<string, unknown>, fallbackTitle: string): string {
  const sectionData = isRecord(section.data) ? section.data : null;

  return (
    getString(sectionData?.sectionTitle) ||
    getString(sectionData?.title) ||
    getString(sectionData?.heading) ||
    getString(sectionData?.label) ||
    getString(sectionData?.groupTitle) ||
    getString(section.title) ||
    getString(section.heading) ||
    getString(section.label) ||
    getString(section.groupTitle) ||
    getString(section.type) ||
    fallbackTitle
  );
}

/* =========================================================
   BUILD SECTIONS
========================================================= */

function buildSections(items: unknown[], fallbackTitle: string): TestimonialSection[] {
  return items
    .map((section): TestimonialSection => {
      if (!isRecord(section)) {
        return {
          title: fallbackTitle,
          testimonials: [],
        };
      }

      const testimonials = getSectionItems(section);
      const title = getSectionTitle(section, fallbackTitle);

      return {
        title,
        testimonials,
      };
    })
    .filter((section) => section.testimonials.length > 0);
}

/* =========================================================
   EXTRACT ALL PAGE TESTIMONIALS
========================================================= */

function extractPageTestimonials(
  winnerPage: WebsitePage | null,
  fallbackTitle: string,
): TestimonialSection[] {
  if (!winnerPage) {
    return [];
  }

  const pageSections: unknown[] = Array.isArray(winnerPage.sections) ? winnerPage.sections : [];

  const pageBlocks: unknown[] = Array.isArray(winnerPage.content?.blocks)
    ? winnerPage.content.blocks
    : [];

  /* FIRST: SECTIONS */

  let sections = buildSections(pageSections, fallbackTitle);

  /* SECOND: CONTENT.BLOCKS */

  if (sections.length === 0 && pageBlocks.length > 0) {
    sections = buildSections(pageBlocks, fallbackTitle);
  }

  /* THIRD: DIRECT PAGE DATA */

  if (sections.length === 0) {
    const directItems = getSectionItems(winnerPage);

    if (directItems.length > 0) {
      sections = [
        {
          title: fallbackTitle,
          testimonials: directItems,
        },
      ];
    }
  }

  return sections;
}

/* =========================================================
   WINNER DETAIL PAGE
========================================================= */

export default function WinnerDetailClient({ slug, kicker }: WinnerDetailClientProps) {
  const [page, setPage] = useState<WebsitePage | null>(null);

  const [technologyPage, setTechnologyPage] = useState<WebsitePage | null>(null);

  const [businessPage, setBusinessPage] = useState<WebsitePage | null>(null);

  const [covidPage, setCovidPage] = useState<WebsitePage | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /* =========================================================
     LOAD ALL THREE API PAGES

     winner-2026:
       Technology -> winner-2026
       Business   -> business-icon-2026
       COVID      -> covid-2026

     winner-2025:
       Technology -> winner-2025
       Business   -> business-icon-2025
       COVID      -> covid-2025

     Each request is independent. Failure of one API does
     not prevent the other two sections from displaying.
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    async function loadWinnerPages() {
      setIsLoading(true);
      setError(null);

      setPage(null);
      setTechnologyPage(null);
      setBusinessPage(null);
      setCovidPage(null);

      const technologySlug = getTechnologySlug(slug);
      const businessSlug = getBusinessSlug(slug);
      const covidSlug = getCovidSlug(slug);

      /* FETCH ALL THREE PAGES INDEPENDENTLY */

      const [technologyResult, businessResult, covidResult] = await Promise.allSettled([
        fetchWebsitePageBySlug(technologySlug),
        fetchWebsitePageBySlug(businessSlug),
        fetchWebsitePageBySlug(covidSlug),
      ]);

      if (!isMounted) {
        return;
      }

      /* =====================================================
         TECHNOLOGY API RESULT
      ===================================================== */

      const technologyResponse =
        technologyResult.status === 'fulfilled' ? technologyResult.value : null;

      const technologyLoaded = Boolean(technologyResponse?.success && technologyResponse.data);

      if (technologyLoaded && technologyResponse?.data) {
        setTechnologyPage(technologyResponse.data);
      } else {
        setTechnologyPage(null);
      }

      /* =====================================================
         BUSINESS API RESULT
      ===================================================== */

      const businessResponse = businessResult.status === 'fulfilled' ? businessResult.value : null;

      const businessLoaded = Boolean(businessResponse?.success && businessResponse.data);

      if (businessLoaded && businessResponse?.data) {
        setBusinessPage(businessResponse.data);
      } else {
        setBusinessPage(null);
      }

      /* =====================================================
         COVID API RESULT
      ===================================================== */

      const covidResponse = covidResult.status === 'fulfilled' ? covidResult.value : null;

      const covidLoaded = Boolean(covidResponse?.success && covidResponse.data);

      if (covidLoaded && covidResponse?.data) {
        setCovidPage(covidResponse.data);
      } else {
        setCovidPage(null);
      }

      /* =====================================================
         PRIMARY PAGE

         Priority:
         1. Technology page
         2. Business page
         3. COVID page

         The first available page supplies the main heading
         and description.
      ===================================================== */

      if (technologyLoaded && technologyResponse?.data) {
        setPage(technologyResponse.data);
      } else if (businessLoaded && businessResponse?.data) {
        setPage(businessResponse.data);
      } else if (covidLoaded && covidResponse?.data) {
        setPage(covidResponse.data);
      } else {
        setPage(null);
      }

      /* =====================================================
         ERROR ONLY IF ALL THREE REQUESTS FAILED
      ===================================================== */

      if (!technologyLoaded && !businessLoaded && !covidLoaded) {
        const technologyError =
          technologyResult.status === 'rejected' ? technologyResult.reason : null;

        const businessError = businessResult.status === 'rejected' ? businessResult.reason : null;

        const covidError = covidResult.status === 'rejected' ? covidResult.reason : null;

        const rejectedErrors = [technologyError, businessError, covidError];

        const rejectedError = rejectedErrors.find((item): item is Error => item instanceof Error);

        const responseError =
          technologyResponse?.message || businessResponse?.message || covidResponse?.message;

        setError(
          rejectedError?.message || responseError || `Unable to load winner data for ${slug}.`,
        );
      }

      setIsLoading(false);
    }

    loadWinnerPages().catch((err: unknown) => {
      if (!isMounted) {
        return;
      }

      setPage(null);
      setTechnologyPage(null);
      setBusinessPage(null);
      setCovidPage(null);

      setError(
        err instanceof Error ? err.message : 'Unable to load winner pages. Please try again.',
      );

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Loading winner...</p>

          <p>Loading Technology Icons, Business Icons and COVID Icons data for {slug}.</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     COMPLETE API FAILURE

     Display the error only when all three API pages fail.
  ========================================================= */

  if (error && !technologyPage && !businessPage && !covidPage) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Unable to load winner</p>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     NO PAGE
  ========================================================= */

  if (!page && !technologyPage && !businessPage && !covidPage) {
    return (
      <main className="winners-detail-page">
        <section className="winners-detail-card">
          <p className="winners-kicker">Winner not found</p>

          <p>No winner page was returned for the slug {slug}.</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     PAGE INFORMATION
  ========================================================= */

  const pageTitle = page?.title?.trim() || `Winner Profiles ${getWinnerYear(slug)}`;

  const pageShortDescription = page?.shortDescription?.trim() || '';

  /* =========================================================
     TECHNOLOGY DATA
  ========================================================= */

  const technologySections = extractPageTestimonials(technologyPage, 'TECHNOLOGY ICONS');

  const technologyTestimonials = technologySections.flatMap((section) => section.testimonials);

  /* =========================================================
     BUSINESS DATA
  ========================================================= */

  const businessSections = extractPageTestimonials(businessPage, 'BUSINESS ICONS');

  const businessTestimonials = businessSections.flatMap((section) => section.testimonials);

  /* =========================================================
     COVID DATA
  ========================================================= */

  const covidSections = extractPageTestimonials(covidPage, 'COVID ICONS');

  const covidTestimonials = covidSections.flatMap((section) => section.testimonials);

  /* =========================================================
     SECTION COUNTS AND VISIBILITY
  ========================================================= */

  const technologyCount = technologyTestimonials.length;
  const businessCount = businessTestimonials.length;
  const covidCount = covidTestimonials.length;

  const showTechnology = technologyCount > 0;
  const showBusiness = businessCount > 0;
  const showCovid = covidCount > 0;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="winners-detail-page">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="winners-detail-card">
        <p className="winners-kicker">{kicker ?? 'Winners'}</p>

        <h1>{pageTitle}</h1>

        <p>
          Showcasing exceptional leaders who are driving digital transformation, business growth,
          and innovation across industries.
        </p>

        {pageShortDescription ? (
          <p className="winners-detail-summary">{pageShortDescription}</p>
        ) : null}
      </section>

      {/* =====================================================
          TECHNOLOGY ICONS

          Hidden only when Technology data is unavailable
          or contains no winner records.
      ===================================================== */}

      {showTechnology ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Winner Profiles</p>

            <h2>TECHNOLOGY ICONS</h2>

            <span>{technologyCount} Members</span>
          </div>

          <div className="winner-section-grid">
            {technologyTestimonials.map((testimonial, index) => (
              <WinnerCard
                key={`technology-${getWinnerYear(slug)}-${index}`}
                testimonial={testimonial}
                sectionTitle="TECHNOLOGY ICONS"
                index={index}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* =====================================================
          BUSINESS ICONS

          Hidden only when Business data is unavailable
          or contains no winner records.
      ===================================================== */}

      {showBusiness ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Winner Profiles</p>

            <h2>BUSINESS ICONS</h2>

            <span>{businessCount} Members</span>
          </div>

          <div className="winner-section-grid">
            {businessTestimonials.map((testimonial, index) => (
              <WinnerCard
                key={`business-${getWinnerYear(slug)}-${index}`}
                testimonial={testimonial}
                sectionTitle="BUSINESS ICONS"
                index={index}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* =====================================================
          COVID ICONS

          Hidden only when the COVID API fails or returns
          no winner records.

          Technology and Business sections remain independent.
      ===================================================== */}

      {showCovid ? (
        <section className="winner-section-block">
          <div className="winner-section-header winner-section-header--centered">
            <p className="winner-section-kicker">Winner Profiles</p>

            {/* <h2>COVID 19 ICONS</h2> */}
            <h2>{getWinnerYear(slug) === '2021' ? 'SPECIAL CATEGORY ICONS' : 'COVID 19 ICONS'}</h2>

            <span>{covidCount} Members</span>
          </div>

          <div className="winner-section-grid">
            {covidTestimonials.map((testimonial, index) => (
              <WinnerCard
                key={`covid-${getWinnerYear(slug)}-${index}`}
                testimonial={testimonial}
                sectionTitle="COVID ICONS"
                index={index}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* =====================================================
          FALLBACK

          Display only when none of the three API pages
          contains winner cards.
      ===================================================== */}

      {!showTechnology && !showBusiness && !showCovid ? (
        <section className="winner-section-block">
          <p>No winner cards were found for {slug}.</p>
        </section>
      ) : null}
    </main>
  );
}
