// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import { usePathname } from 'next/navigation';

// const currentYear = new Date().getFullYear();

// const winnerLinks = Array.from({ length: currentYear - 2014 }, (_, index) => {
//   const year = currentYear - index;

//   return {
//     label: `Winner ${year}`,
//     href: `/winners/winner-${year}`,
//   };
// });

// const speakerLinks = Array.from({ length: currentYear - 2015 }, (_, index) => {
//   const year = currentYear - index;

//   return {
//     label: `Speaker ${year}`,
//     href: `/speakers/speaker-${year}`,
//   };
// });

// const partnerLinks = [
//   { label: 'Partner 2026', href: '/partners/partner-2026' },
//   { label: 'Past Key Partner', href: '/partners/past-key-partner' },
// ];

// export default function Navbar() {
//   const pathname = usePathname();

//   const [isHidden, setIsHidden] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [winnersOpen, setWinnersOpen] = useState(false);
//   const [speakersOpen, setSpeakersOpen] = useState(false);
//   const [partnersOpen, setPartnersOpen] = useState(false);
//   const [activeHash, setActiveHash] = useState('');

//   const winnersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const speakersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const partnersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const isWinnerPage = pathname.startsWith('/winners');
//   const isSpeakerPage = pathname.startsWith('/speakers');
//   const isPartnerPage = pathname.startsWith('/partners');

//   const openWinners = () => {
//     if (winnersCloseTimer.current) clearTimeout(winnersCloseTimer.current);
//     winnersCloseTimer.current = null;
//     setWinnersOpen(true);
//   };

//   const closeWinners = () => {
//     if (winnersCloseTimer.current) clearTimeout(winnersCloseTimer.current);
//     winnersCloseTimer.current = setTimeout(() => {
//       setWinnersOpen(false);
//       winnersCloseTimer.current = null;
//     }, 140);
//   };

//   const openSpeakers = () => {
//     if (speakersCloseTimer.current) clearTimeout(speakersCloseTimer.current);
//     speakersCloseTimer.current = null;
//     setSpeakersOpen(true);
//   };

//   const closeSpeakers = () => {
//     if (speakersCloseTimer.current) clearTimeout(speakersCloseTimer.current);
//     speakersCloseTimer.current = setTimeout(() => {
//       setSpeakersOpen(false);
//       speakersCloseTimer.current = null;
//     }, 140);
//   };

//   const openPartners = () => {
//     if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
//     partnersCloseTimer.current = null;
//     setPartnersOpen(true);
//   };

//   const closePartners = () => {
//     if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
//     partnersCloseTimer.current = setTimeout(() => {
//       setPartnersOpen(false);
//       partnersCloseTimer.current = null;
//     }, 140);
//   };

//   const closeAllMenus = () => {
//     setMobileOpen(false);
//     setWinnersOpen(false);
//     setSpeakersOpen(false);
//     setPartnersOpen(false);
//     setIsHidden(false);
//   };

//   useEffect(() => {
//     const updateHash = () => {
//       setActiveHash(window.location.hash);
//     };

//     updateHash();
//     window.addEventListener('hashchange', updateHash);

//     return () => window.removeEventListener('hashchange', updateHash);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);

//       if (winnersCloseTimer.current) clearTimeout(winnersCloseTimer.current);
//       if (speakersCloseTimer.current) clearTimeout(speakersCloseTimer.current);
//       if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
//     };
//   }, [lastScrollY]);

//   return (
//     <header
//       className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
//     >
//       <div className="navbar-container">
//         <Link href="/" className="navbar-logo" onClick={closeAllMenus}>
//           <Image src="/assets/logo/logo2.png" alt="CORE Media" width={150} height={100} priority />
//         </Link>

//         <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
//           <Link
//             href="/"
//             className={`nav-link ${pathname === '/' && activeHash === '' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Home
//           </Link>

//           <Link
//             href="/aboutus"
//             className={`nav-link ${pathname?.startsWith('/aboutus') ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             About Us
//           </Link>

//           <div
//             className={`nav-dropdown ${partnersOpen ? 'open' : ''}`}
//             onMouseEnter={openPartners}
//             onMouseLeave={closePartners}
//           >
//             <button
//               type="button"
//               className={`nav-link ${isPartnerPage ? 'active' : ''}`}
//               aria-expanded={partnersOpen}
//               onClick={() => setPartnersOpen((open) => !open)}
//             >
//               Partners
//               <ChevronDown size={16} />
//             </button>

//             {partnersOpen && (
//               <div className="mega-panel" onMouseEnter={openPartners} onMouseLeave={closePartners}>
//                 <div className="mega-inner">
//                   <div className="mega-column">
//                     <ul>
//                       {partnerLinks.map((partner) => (
//                         <li key={partner.href}>
//                           <Link
//                             href={partner.href}
//                             className={`mega-item ${pathname === partner.href ? 'active' : ''}`}
//                             onClick={closeAllMenus}
//                           >
//                             <span className="mega-icon" aria-hidden />
//                             <span>{partner.label}</span>
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* <Link
//             href="/yearbook/2026"
//             className={`nav-link ${pathname === '/yearbook' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Winner Book
//           </Link> */}

//           <Link
//             href="/yearbook/2026"
//             className={`nav-link ${pathname.startsWith('/yearbook') ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Winner Book
//           </Link>

//           <div
//             className={`nav-dropdown ${winnersOpen ? 'open' : ''}`}
//             onMouseEnter={openWinners}
//             onMouseLeave={closeWinners}
//           >
//             <button
//               type="button"
//               className={`nav-link ${isWinnerPage ? 'active' : ''}`}
//               aria-expanded={winnersOpen}
//               onClick={() => setWinnersOpen((open) => !open)}
//             >
//               Winners
//               <ChevronDown size={16} />
//             </button>

//             {winnersOpen && (
//               <div className="mega-panel" onMouseEnter={openWinners} onMouseLeave={closeWinners}>
//                 <div className="mega-inner">
//                   <div className="mega-column">
//                     <ul>
//                       {winnerLinks.slice(0, 5).map((winner) => (
//                         <li key={winner.href}>
//                           <Link
//                             href={winner.href}
//                             className={`mega-item ${pathname === winner.href ? 'active' : ''}`}
//                             onClick={closeAllMenus}
//                           >
//                             <span className="mega-icon" aria-hidden />
//                             <span>{winner.label}</span>
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="mega-column">
//                     <ul>
//                       {winnerLinks.slice(5).map((winner) => (
//                         <li key={winner.href}>
//                           <Link
//                             href={winner.href}
//                             className={`mega-item ${pathname === winner.href ? 'active' : ''}`}
//                             onClick={closeAllMenus}
//                           >
//                             <span className="mega-icon" aria-hidden />
//                             <span>{winner.label}</span>
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <Link
//             href="/register"
//             className={`nav-link ${pathname === '/register' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Registration
//           </Link>

//           <Link
//             href="/nominate"
//             className={`nav-link ${pathname === '/nominate' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Nomination
//           </Link>

//           {/* <button
//             type="button"
//             className={`nav-link ${
//               pathname === '/' && activeHash === '#cio-process-section' ? 'active' : ''
//             }`}
//             onClick={() => {
//               closeAllMenus();

//               if (pathname !== '/') {
//                 window.location.href = '/#cio-process-section';
//                 return;
//               }

//               setTimeout(() => {
//                 document
//                   .getElementById('cio-process-section')
//                   ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//               }, 100);
//             }}
//           >
//             Process
//           </button> */}

//           <Link
//             href="/process"
//             className={`nav-link ${pathname === '/process' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Process
//           </Link>

//           <div
//             className={`nav-dropdown ${speakersOpen ? 'open' : ''}`}
//             onMouseEnter={openSpeakers}
//             onMouseLeave={closeSpeakers}
//           >
//             <button
//               type="button"
//               className={`nav-link ${isSpeakerPage ? 'active' : ''}`}
//               aria-expanded={speakersOpen}
//               onClick={() => setSpeakersOpen((open) => !open)}
//             >
//               Speakers
//               <ChevronDown size={16} />
//             </button>

//             {speakersOpen && (
//               <div className="mega-panel" onMouseEnter={openSpeakers} onMouseLeave={closeSpeakers}>
//                 <div className="mega-inner">
//                   <div className="mega-column">
//                     <ul>
//                       {speakerLinks.slice(0, 5).map((speaker) => (
//                         <li key={speaker.href}>
//                           <Link
//                             href={speaker.href}
//                             className={`mega-item ${pathname === speaker.href ? 'active' : ''}`}
//                             onClick={closeAllMenus}
//                           >
//                             <span className="mega-icon" aria-hidden />
//                             <span>{speaker.label}</span>
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="mega-column">
//                     <ul>
//                       {speakerLinks.slice(5).map((speaker) => (
//                         <li key={speaker.href}>
//                           <Link
//                             href={speaker.href}
//                             className={`mega-item ${pathname === speaker.href ? 'active' : ''}`}
//                             onClick={closeAllMenus}
//                           >
//                             <span className="mega-icon" aria-hidden />
//                             <span>{speaker.label}</span>
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* <Link
//             href="/#contact-section"
//             scroll={true}
//             className={`nav-link ${
//               pathname === '/' && activeHash === '#contact-section' ? 'active' : ''
//             }`}
//             onClick={closeAllMenus}
//           >
//             Contact
//           </Link> */}
//         </nav>

//         <div className="navbar-actions">
//           <Link href="/#contact-section" className="talk-btn" onClick={closeAllMenus}>
//             <span>Let’s Talk</span>

//             <div className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </div>
//           </Link>

//           <button
//             className={`menu-btn ${mobileOpen ? 'open' : ''}`}
//             aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
//             aria-expanded={mobileOpen}
//             onClick={() => {
//               setMobileOpen((s) => !s);
//               setIsHidden(false);
//             }}
//           >
//             {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { fetchWebsitePages } from '@/services/pages.service';

const partnerLinks = [
  { label: 'Partner 2026', href: '/partners/partner-2026' },
  { label: 'Past Key Partner', href: '/partners/past-key-partner' },
];

type ArchiveLink = {
  label: string;
  href: string;
  year: number;
};

type SpeakerLink = ArchiveLink;
type WinnerLink = ArchiveLink;

export default function Navbar() {
  const pathname = usePathname();

  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [winnersOpen, setWinnersOpen] = useState(false);
  const [speakersOpen, setSpeakersOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const [winnerLinks, setWinnerLinks] = useState<WinnerLink[]>([]);
  const [winnersLoading, setWinnersLoading] = useState(true);
  const [winnersLoadError, setWinnersLoadError] = useState(false);
  const [speakerLinks, setSpeakerLinks] = useState<SpeakerLink[]>([]);
  const [speakersLoading, setSpeakersLoading] = useState(true);
  const [speakersLoadError, setSpeakersLoadError] = useState(false);
  const [archiveRefreshKey, setArchiveRefreshKey] = useState(0);

  const winnersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speakersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const partnersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isWinnerPage = pathname.startsWith('/winners');
  const isSpeakerPage = pathname.startsWith('/speakers');
  const isPartnerPage = pathname.startsWith('/partners');

  useEffect(() => {
    let cancelled = false;

    async function loadArchivePages() {
      setWinnersLoading(true);
      setWinnersLoadError(false);
      setSpeakersLoadError(false);

      try {
        const pages = await fetchWebsitePages();
        const winnersByYear = new Map<number, WinnerLink>();
        const speakers: SpeakerLink[] = [];

        for (const page of pages) {
          const slug = page.slug.trim().toLowerCase();
          const status = page.status?.trim().toLowerCase();

          if (
            (status && status !== 'published') ||
            page.isPublished === false ||
            page.isDeleted === true ||
            page.deletedAt
          ) {
            continue;
          }

          const winnerMatch = slug.match(/^winner-(20\d{2})$/);
          if (winnerMatch) {
            const year = Number(winnerMatch[1]);
            winnersByYear.set(year, {
              label: `Winner ${year}`,
              href: `/winners/winner-${year}`,
              year,
            });
          }

          const speakerMatch = slug.match(/^speakers?-(20\d{2})$/);
          if (speakerMatch) {
            const year = Number(speakerMatch[1]);
            speakers.push({
              label: `Speaker ${year}`,
              href: `/speakers/${slug}`,
              year,
            });
          }
        }

        if (!cancelled) {
          setWinnerLinks(Array.from(winnersByYear.values()).sort((a, b) => b.year - a.year));
          setSpeakerLinks(speakers.sort((a, b) => b.year - a.year));
        }
      } catch {
        if (!cancelled) {
          setWinnerLinks([]);
          setWinnersLoadError(true);
          setSpeakerLinks([]);
          setSpeakersLoadError(true);
        }
      } finally {
        if (!cancelled) {
          setWinnersLoading(false);
          setSpeakersLoading(false);
        }
      }
    }

    loadArchivePages();

    return () => {
      cancelled = true;
    };
  }, [archiveRefreshKey]);

  const openWinners = () => {
    if (winnersCloseTimer.current) {
      clearTimeout(winnersCloseTimer.current);
    }

    winnersCloseTimer.current = null;
    setArchiveRefreshKey((current) => current + 1);
    setWinnersOpen(true);
  };

  const closeWinners = () => {
    if (winnersCloseTimer.current) {
      clearTimeout(winnersCloseTimer.current);
    }

    winnersCloseTimer.current = setTimeout(() => {
      setWinnersOpen(false);
      winnersCloseTimer.current = null;
    }, 140);
  };

  const openSpeakers = () => {
    if (speakersCloseTimer.current) {
      clearTimeout(speakersCloseTimer.current);
    }

    speakersCloseTimer.current = null;
    setArchiveRefreshKey((current) => current + 1);
    setSpeakersOpen(true);
  };

  const closeSpeakers = () => {
    if (speakersCloseTimer.current) {
      clearTimeout(speakersCloseTimer.current);
    }

    speakersCloseTimer.current = setTimeout(() => {
      setSpeakersOpen(false);
      speakersCloseTimer.current = null;
    }, 140);
  };

  const openPartners = () => {
    if (partnersCloseTimer.current) {
      clearTimeout(partnersCloseTimer.current);
    }

    partnersCloseTimer.current = null;
    setPartnersOpen(true);
  };

  const closePartners = () => {
    if (partnersCloseTimer.current) {
      clearTimeout(partnersCloseTimer.current);
    }

    partnersCloseTimer.current = setTimeout(() => {
      setPartnersOpen(false);
      partnersCloseTimer.current = null;
    }, 140);
  };

  const closeAllMenus = () => {
    setMobileOpen(false);
    setWinnersOpen(false);
    setSpeakersOpen(false);
    setPartnersOpen(false);
    setIsHidden(false);
  };

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();
    window.addEventListener('hashchange', updateHash);

    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (winnersCloseTimer.current) {
        clearTimeout(winnersCloseTimer.current);
      }

      if (speakersCloseTimer.current) {
        clearTimeout(speakersCloseTimer.current);
      }

      if (partnersCloseTimer.current) {
        clearTimeout(partnersCloseTimer.current);
      }
    };
  }, [lastScrollY]);

  const renderArchiveLinks = (items: ArchiveLink[]) => (
    <ul>
      {items.map((speaker) => (
        <li key={speaker.href}>
          <Link
            href={speaker.href}
            className={`mega-item ${pathname === speaker.href ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            <span className="mega-icon" aria-hidden />
            <span>{speaker.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" onClick={closeAllMenus}>
          <Image src="/assets/logo/logo2.png" alt="CORE Media" width={150} height={100} priority />
        </Link>

        <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
          <Link
            href="/"
            className={`nav-link ${pathname === '/' && activeHash === '' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Home
          </Link>

          <Link
            href="/aboutus"
            className={`nav-link ${pathname.startsWith('/aboutus') ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            About Us
          </Link>

          {/* <Link
            href="/cio-nomination"
            className={`nav-link ${pathname.startsWith('/cio-nomination') ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            CIO Google form
          </Link> */}
          {/* <Link
            href="/forms/nomination-google-form"
            className={`nav-link ${
              pathname.startsWith('/forms/nomination-google-form') ||
              pathname.startsWith('/forms/cio-nomination')
                ? 'active'
                : ''
            }`}
            onClick={closeAllMenus}
          >
            CIO Google form
          </Link> */}

          {/* PARTNERS */}
          <div
            className={`nav-dropdown ${partnersOpen ? 'open' : ''}`}
            onMouseEnter={openPartners}
            onMouseLeave={closePartners}
          >
            <button
              type="button"
              className={`nav-link ${isPartnerPage ? 'active' : ''}`}
              aria-expanded={partnersOpen}
              onClick={() => setPartnersOpen((open) => !open)}
            >
              Partners
              <ChevronDown size={16} />
            </button>

            {partnersOpen && (
              <div className="mega-panel" onMouseEnter={openPartners} onMouseLeave={closePartners}>
                <div className="mega-inner">
                  <div className="mega-column">
                    <ul>
                      {partnerLinks.map((partner) => (
                        <li key={partner.href}>
                          <Link
                            href={partner.href}
                            className={`mega-item ${pathname === partner.href ? 'active' : ''}`}
                            onClick={closeAllMenus}
                          >
                            <span className="mega-icon" aria-hidden />
                            <span>{partner.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* WINNER BOOK */}
          <Link
            href="/yearbook/2026"
            className={`nav-link ${pathname.startsWith('/yearbook') ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Winner Book
          </Link>

          {/* WINNERS */}
          <div
            className={`nav-dropdown ${winnersOpen ? 'open' : ''}`}
            onMouseEnter={openWinners}
            onMouseLeave={closeWinners}
          >
            <button
              type="button"
              className={`nav-link ${isWinnerPage ? 'active' : ''}`}
              aria-expanded={winnersOpen}
              onClick={() => {
                if (winnersOpen) {
                  setWinnersOpen(false);
                } else {
                  openWinners();
                }
              }}
            >
              Winners
              <ChevronDown size={16} />
            </button>

            {winnersOpen && (
              <div className="mega-panel" onMouseEnter={openWinners} onMouseLeave={closeWinners}>
                <div className="mega-inner">
                  {winnerLinks.length > 0 ? (
                    <>
                      <div className="mega-column">
                        {renderArchiveLinks(winnerLinks.slice(0, 5))}
                      </div>

                      <div className="mega-column">{renderArchiveLinks(winnerLinks.slice(5))}</div>
                    </>
                  ) : winnersLoading ? null : (
                    <div className="mega-column">
                      <ul>
                        <li>
                          <span className="mega-item">
                            {winnersLoadError
                              ? 'Winner pages could not be loaded'
                              : 'No published winner pages found'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/register"
            className={`nav-link ${pathname === '/register' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Registration
          </Link>

          <Link
            href="/nominate"
            className={`nav-link ${pathname === '/nominate' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Nomination
          </Link>

          <Link
            href="/process"
            className={`nav-link ${pathname === '/process' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Process
          </Link>

          {/* SPEAKERS: DYNAMICALLY LOADED FROM THE DATABASE */}
          <div
            className={`nav-dropdown ${speakersOpen ? 'open' : ''}`}
            onMouseEnter={openSpeakers}
            onMouseLeave={closeSpeakers}
          >
            <button
              type="button"
              className={`nav-link ${isSpeakerPage ? 'active' : ''}`}
              aria-expanded={speakersOpen}
              onClick={() => {
                if (speakersOpen) {
                  setSpeakersOpen(false);
                } else {
                  openSpeakers();
                }
              }}
            >
              Speakers
              <ChevronDown size={16} />
            </button>

            {speakersOpen && (
              <div className="mega-panel" onMouseEnter={openSpeakers} onMouseLeave={closeSpeakers}>
                <div className="mega-inner">
                  {speakersLoading ? null : speakerLinks.length > 0 ? (
                    <>
                      <div className="mega-column">
                        {renderArchiveLinks(speakerLinks.slice(0, 5))}
                      </div>

                      <div className="mega-column">{renderArchiveLinks(speakerLinks.slice(5))}</div>
                    </>
                  ) : (
                    <div className="mega-column">
                      <ul>
                        <li>
                          <span className="mega-item">
                            {speakersLoadError
                              ? 'Speaker pages could not be loaded'
                              : 'No published speaker pages found'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="navbar-actions">
          <Link href="/#contact-section" className="talk-btn" onClick={closeAllMenus}>
            <span>Let’s Talk</span>

            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>

          <button
            type="button"
            className={`menu-btn ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((open) => !open);
              setIsHidden(false);
            }}
          >
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </header>
  );
}
