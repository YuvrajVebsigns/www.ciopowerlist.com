'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { downloadWebsiteReport } from '@/services/reports.service';

const YEAR_BOOK_PAGES = Array.from({ length: 152 }, (_, index) => {
  const pageNumber = String(index + 1).padStart(2, '0');

  return {
    src: `/assets/2026/page-0${pageNumber}.jpg`,
    alt: `CIO Choice 2026 Year Book page ${index + 1}`,
  };
});

const REPORT_ID = '6ac649b2928598a9ac2a9028';

const COUNTRY_CODES = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA / Canada' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  { code: '+82', country: 'South Korea' },
  { code: '+86', country: 'China' },
  { code: '+65', country: 'Singapore' },
  { code: '+60', country: 'Malaysia' },
  { code: '+971', country: 'UAE' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+974', country: 'Qatar' },
  { code: '+92', country: 'Pakistan' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+977', country: 'Nepal' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+31', country: 'Netherlands' },
  { code: '+41', country: 'Switzerland' },
  { code: '+43', country: 'Austria' },
  { code: '+7', country: 'Russia / Kazakhstan' },
  { code: '+55', country: 'Brazil' },
  { code: '+52', country: 'Mexico' },
  { code: '+27', country: 'South Africa' },
  { code: '+20', country: 'Egypt' },
  { code: '+234', country: 'Nigeria' },
  { code: '+254', country: 'Kenya' },
  { code: '+63', country: 'Philippines' },
  { code: '+66', country: 'Thailand' },
  { code: '+84', country: 'Vietnam' },
  { code: '+64', country: 'New Zealand' },
];

const INDUSTRIES = [
  'SOFTWARE',
  'CLOUD SERVICES',
  'HARDWARE, NETWORK & STORAGE',
  'DATA CENTER & IT INFRASTRUCTURE',
  'SECURITY',
  'TELECOM SERVICES',
  'RISK MANAGEMENT',
  'SYSTEM INTEGRATION',
  'DATA RECOVERY',
  'VIRTUALIZATION',
  'IT SERVICES',
  'SAAS AND CLOUD SOLUTIONS',
  'ADVISORY & RESEARCH',
  'EMERGING TECHNOLOGIES',
  'ENTERPRISE MOBILITY',
  'COLLABORATION AND WORK FROM HOME',
];

export default function YearBook2026Page() {
  const [spreadStart, setSpreadStart] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [isTurning, setIsTurning] = useState(false);

  // Download form
  const [showDownloadForm, setShowDownloadForm] = useState(false);

  const [downloadFirstName, setDownloadFirstName] = useState('');
  const [downloadLastName, setDownloadLastName] = useState('');
  const [downloadCompany, setDownloadCompany] = useState('');
  const [downloadDesignation, setDownloadDesignation] = useState('');
  const [downloadCountryCode, setDownloadCountryCode] = useState('+91');
  const [downloadPhone, setDownloadPhone] = useState('');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadIndustry, setDownloadIndustry] = useState('');

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const turnPage = useCallback(
    (nextSpreadStart: number, turnDirection: 'next' | 'previous') => {
      if (isTurning || nextSpreadStart < 0 || nextSpreadStart >= YEAR_BOOK_PAGES.length) {
        return;
      }

      setDirection(turnDirection);
      setIsTurning(true);

      window.setTimeout(() => {
        setSpreadStart(nextSpreadStart);
        setIsTurning(false);
      }, 720);
    },
    [isTurning],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showDownloadForm) {
        if (event.key === 'Escape' && !isDownloading) {
          setShowDownloadForm(false);
        }

        return;
      }

      if (event.key === 'ArrowRight') {
        const next = spreadStart === 0 ? 1 : spreadStart + 2;
        turnPage(next, 'next');
      }

      if (event.key === 'ArrowLeft') {
        const previous = spreadStart <= 1 ? 0 : spreadStart - 2;

        turnPage(previous, 'previous');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTurning, spreadStart, turnPage, showDownloadForm, isDownloading]);

  const isCover = spreadStart === 0;

  const nextSpreadStart = isCover ? 1 : spreadStart + 2;

  const previousSpreadStart = isCover || spreadStart === 1 ? 0 : spreadStart - 2;

  const leftPage = YEAR_BOOK_PAGES[spreadStart] ?? YEAR_BOOK_PAGES[0]!;

  const rightPage = isCover ? null : (YEAR_BOOK_PAGES[spreadStart + 1] ?? null);

  const pageLabel = isCover
    ? 'Cover Page'
    : `Pages ${spreadStart + 1} - ${Math.min(spreadStart + 2, YEAR_BOOK_PAGES.length)}`;

  const turningSpreadStart = direction === 'next' ? nextSpreadStart : previousSpreadStart;

  const turningLeftPage = YEAR_BOOK_PAGES[turningSpreadStart];

  const turningRightPage = YEAR_BOOK_PAGES[turningSpreadStart + 1];

  const openNextSpread = () => {
    if (nextSpreadStart < YEAR_BOOK_PAGES.length) {
      turnPage(nextSpreadStart, 'next');
    }
  };

  const openPreviousSpread = () => {
    if (previousSpreadStart >= 0) {
      turnPage(previousSpreadStart, 'previous');
    }
  };

  /*
   * OPEN DOWNLOAD FORM
   */
  const openDownloadForm = () => {
    setDownloadError('');
    setShowDownloadForm(true);
  };

  /*
   * CLOSE DOWNLOAD FORM
   */
  const closeDownloadForm = () => {
    if (isDownloading) {
      return;
    }

    setShowDownloadForm(false);
    setDownloadError('');
  };

  /*
   * RESET FORM
   */
  const resetDownloadForm = () => {
    setDownloadFirstName('');
    setDownloadLastName('');
    setDownloadCompany('');
    setDownloadDesignation('');
    setDownloadCountryCode('+91');
    setDownloadPhone('');
    setDownloadEmail('');
    setDownloadIndustry('');
  };

  /*
   * SUBMIT DOWNLOAD FORM
   */
  const handleDownloadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDownloadError('');

    if (!downloadFirstName.trim()) {
      setDownloadError('Please enter your first name.');
      return;
    }

    if (!downloadLastName.trim()) {
      setDownloadError('Please enter your last name.');
      return;
    }

    if (!downloadCompany.trim()) {
      setDownloadError('Please enter your company name.');
      return;
    }

    if (!downloadDesignation.trim()) {
      setDownloadError('Please enter your designation.');
      return;
    }

    if (!downloadPhone.trim()) {
      setDownloadError('Please enter your mobile number.');
      return;
    }

    const cleanedPhone = downloadPhone.replace(/[\s\-()]/g, '');

    if (!/^\d{7,15}$/.test(cleanedPhone)) {
      setDownloadError('Please enter a valid mobile number.');
      return;
    }

    if (!downloadEmail.trim()) {
      setDownloadError('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(downloadEmail.trim())) {
      setDownloadError('Please enter a valid email address.');
      return;
    }

    if (!downloadIndustry) {
      setDownloadError('Please select your industry.');
      return;
    }

    setIsDownloading(true);

    try {
      /*
       * STEP 1
       * Submit the user's information to the
       * report download API.
       *
       * The backend records the download and
       * returns the actual PDF URL.
       */
      const downloadUrl = await downloadWebsiteReport({
        email: downloadEmail.trim(),
        firstName: downloadFirstName.trim(),
        lastName: downloadLastName.trim(),
        phoneNumber: cleanedPhone,
        countryCode: downloadCountryCode,
        companyName: downloadCompany.trim(),
        designation: downloadDesignation.trim(),
        industry: downloadIndustry,
        reportId: REPORT_ID,
      });

      if (!downloadUrl) {
        throw new Error('The report download link was not returned.');
      }

      //   console.log('Winner Book download URL:', downloadUrl);

      /*
       * STEP 2
       *
       * Do NOT fetch the external PDF using
       * fetch() + blob().
       *
       * The returned PDF can be hosted on an
       * external storage/CDN domain and may not
       * allow browser CORS requests.
       *
       * Instead, directly tell the browser to
       * open/download the returned URL.
       */
      const link = document.createElement('a');

      link.href = downloadUrl;
      link.download = 'CIO-Choice-2026-Winner-Book.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      document.body.appendChild(link);

      link.click();

      link.remove();

      /*
       * The API has already successfully recorded
       * the download at this point.
       */
      setShowDownloadForm(false);
      resetDownloadForm();
    } catch (error) {
      //   console.error('Year book report download error:', error);

      setDownloadError(
        error instanceof Error
          ? error.message
          : 'Unable to download the year book. Please try again.',
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="year-book-page">
      <section className="year-book-reader" aria-labelledby="year-book-title">
        <h1 id="year-book-title" className="year-book-heading">
          Winner Book 2026
        </h1>

        <div className="year-book-stage">
          {/* Previous Arrow */}
          <button
            type="button"
            className="year-book-arrow year-book-arrow-previous"
            onClick={openPreviousSpread}
            disabled={isCover || isTurning}
            aria-label="Open previous pages"
          >
            <ChevronLeft size={27} aria-hidden="true" />
          </button>

          {/* BOOK */}
          <div
            className={[
              'year-book-book',
              isTurning ? `is-turning ${direction}` : '',
              isCover ? 'is-cover' : 'is-spread',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {/* NEXT / PREVIOUS SPREAD */}
            {isTurning && (
              <div
                className={[
                  'year-book-next-spread',
                  turningRightPage ? 'is-spread' : 'is-cover',
                ].join(' ')}
                aria-hidden="true"
              >
                {turningLeftPage && (
                  <div className="year-book-page-sheet">
                    <Image src={turningLeftPage.src} alt="" fill sizes="380px" />
                  </div>
                )}

                {turningRightPage && (
                  <div className="year-book-page-sheet year-book-page-right">
                    <Image src={turningRightPage.src} alt="" fill sizes="380px" />
                  </div>
                )}
              </div>
            )}

            {/* CURRENT LEFT PAGE / COVER */}
            <div
              className={[
                'year-book-page-sheet',
                'year-book-page-left',
                isTurning && direction === 'previous' ? 'is-turning-left' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={isCover ? openNextSpread : openPreviousSpread}
            >
              <Image
                src={leftPage.src}
                alt={leftPage.alt}
                fill
                priority={spreadStart === 0}
                sizes="(max-width: 700px) 88vw, 380px"
              />
            </div>

            {/* CURRENT RIGHT PAGE */}
            {rightPage && (
              <div
                className={[
                  'year-book-page-sheet',
                  'year-book-page-right',
                  isTurning && direction === 'next' ? 'is-turning-right' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={openNextSpread}
              >
                <Image
                  src={rightPage.src}
                  alt={rightPage.alt}
                  fill
                  sizes="(max-width: 700px) 44vw, 380px"
                />
              </div>
            )}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            className="year-book-arrow year-book-arrow-next"
            onClick={openNextSpread}
            disabled={nextSpreadStart >= YEAR_BOOK_PAGES.length || isTurning}
            aria-label="Open next pages"
          >
            <ChevronRight size={27} aria-hidden="true" />
          </button>
        </div>

        {/* PAGE INDICATOR + DOWNLOAD */}
        <div className="year-book-controls" aria-label="Year book navigation">
          <p className="year-book-page-count" aria-live="polite">
            {pageLabel}
          </p>

          <button type="button" className="year-book-download" onClick={openDownloadForm}>
            Download PDF
          </button>
        </div>
      </section>

      {/* =====================================================
          DOWNLOAD FORM MODAL
      ====================================================== */}
      {showDownloadForm && (
        <div
          className="year-book-download-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-yearbook-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDownloadForm();
            }
          }}
        >
          <div className="year-book-download-modal">
            {/* Close */}
            <button
              type="button"
              className="year-book-download-close"
              onClick={closeDownloadForm}
              disabled={isDownloading}
              aria-label="Close download form"
            >
              <X size={22} />
            </button>

            <div className="year-book-download-header">
              <h2 id="download-yearbook-title">Download Winner Book 2026</h2>

              <p>Please fill in your details to download the CIO Choice 2026 Winner Book.</p>
            </div>

            <form className="year-book-download-form" onSubmit={handleDownloadSubmit}>
              {/* FIRST NAME */}
              <div className="year-book-form-group">
                <label htmlFor="yearbook-first-name">
                  First Name <span>*</span>
                </label>
                <input
                  id="yearbook-first-name"
                  type="text"
                  value={downloadFirstName}
                  onChange={(event) =>
                    setDownloadFirstName(event.target.value.replace(/[^A-Za-zÀ-ÿ\s.'-]/g, ''))
                  }
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  disabled={isDownloading}
                  maxLength={50}
                  required
                />
              </div>

              {/* LAST NAME */}
              <div className="year-book-form-group">
                <label htmlFor="yearbook-last-name">
                  Last Name <span>*</span>
                </label>
                <input
                  id="yearbook-last-name"
                  type="text"
                  value={downloadLastName}
                  onChange={(event) =>
                    setDownloadLastName(event.target.value.replace(/[^A-Za-zÀ-ÿ\s.'-]/g, ''))
                  }
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  disabled={isDownloading}
                  maxLength={50}
                  required
                />
              </div>

              {/* COMPANY */}
              <div className="year-book-form-group">
                <label htmlFor="yearbook-company">
                  Company Name <span>*</span>
                </label>
                <input
                  id="yearbook-company"
                  type="text"
                  value={downloadCompany}
                  onChange={(event) =>
                    setDownloadCompany(event.target.value.replace(/[^A-Za-zÀ-ÿ0-9\s&.,'()/-]/g, ''))
                  }
                  placeholder="Enter your company name"
                  autoComplete="organization"
                  disabled={isDownloading}
                  maxLength={100}
                  required
                />
              </div>

              {/* DESIGNATION */}
              <div className="year-book-form-group">
                <label htmlFor="yearbook-designation">
                  Designation <span>*</span>
                </label>
                <input
                  id="yearbook-designation"
                  type="text"
                  value={downloadDesignation}
                  onChange={(event) =>
                    setDownloadDesignation(
                      event.target.value.replace(/[^A-Za-zÀ-ÿ0-9\s&.,'()/-]/g, ''),
                    )
                  }
                  placeholder="Enter your designation"
                  autoComplete="organization-title"
                  disabled={isDownloading}
                  maxLength={100}
                  required
                />
              </div>

              {/* MOBILE */}
              <div className="year-book-form-group">
                <label htmlFor="yearbook-phone">
                  Mobile No. <span>*</span>
                </label>

                <div className="year-book-phone-row">
                  <select
                    id="yearbook-country-code"
                    value={downloadCountryCode}
                    onChange={(event) => setDownloadCountryCode(event.target.value)}
                    disabled={isDownloading}
                    aria-label="Country code"
                    required
                  >
                    {COUNTRY_CODES.map(({ code, country }) => (
                      <option key={`${code}-${country}`} value={code}>
                        {code} ({country})
                      </option>
                    ))}
                  </select>

                  <input
                    id="yearbook-phone"
                    type="tel"
                    value={downloadPhone}
                    onChange={(event) =>
                      setDownloadPhone(event.target.value.replace(/\D/g, '').slice(0, 15))
                    }
                    placeholder="Enter mobile number"
                    autoComplete="tel-national"
                    disabled={isDownloading}
                    inputMode="numeric"
                    pattern="[0-9]{7,15}"
                    title="Enter 7 to 15 digits without letters or special characters."
                    maxLength={15}
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="year-book-form-group">
                <label htmlFor="yearbook-email">
                  Email <span>*</span>
                </label>
                <input
                  id="yearbook-email"
                  type="email"
                  value={downloadEmail}
                  onChange={(event) => setDownloadEmail(event.target.value.trimStart())}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  disabled={isDownloading}
                  maxLength={254}
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  title="Enter a valid email address, for example name@example.com."
                  required
                />
              </div>

              {/* INDUSTRY */}
              <div className="year-book-form-group">
                <label htmlFor="yearbook-industry">
                  Industry <span>*</span>
                </label>
                <select
                  id="yearbook-industry"
                  value={downloadIndustry}
                  onChange={(event) => setDownloadIndustry(event.target.value)}
                  disabled={isDownloading}
                  required
                >
                  <option value="">Select Industry</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* ERROR */}
              {downloadError && (
                <p className="year-book-download-error" role="alert">
                  {downloadError}
                </p>
              )}

              {/* SUBMIT */}
              <button type="submit" className="year-book-submit" disabled={isDownloading}>
                {isDownloading ? (
                  <span className="year-book-submit-loader">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  'Submit & Download'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
