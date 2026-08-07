'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const winnerLinks = [
  { label: 'Winner 2026', href: '/winners/winner-2026' },
  { label: 'Winner 2025', href: '/winners/winner-2025' },
  { label: 'Winner 2024', href: '/winners/winner-2024' },
  { label: 'Winner 2023', href: '/winners/winner-2023' },
  { label: 'Winner 2022', href: '/winners/winner-2022' },
  { label: 'Winner 2021', href: '/winners/winner-2021' },
  { label: 'Winner 2020', href: '/winners/winner-2020' },
  { label: 'Winner 2019', href: '/winners/winner-2019' },
  { label: 'Winner 2018', href: '/winners/winner-2018' },
  { label: 'Winner 2017', href: '/winners/winner-2017' },
  { label: 'Winner 2016', href: '/winners/winner-2016' },
  { label: 'Winner 2015', href: '/winners/winner-2015' },
];

const speakerLinks = [
  { label: 'Speaker 2026', href: '/speakers/speaker-2026' },
  { label: 'Speaker 2025', href: '/speakers/speaker-2025' },
  { label: 'Speaker 2024', href: '/speakers/speaker-2024' },
  { label: 'Speaker 2023', href: '/speakers/speaker-2023' },
  { label: 'Speaker 2022', href: '/speakers/speaker-2022' },
  { label: 'Speaker 2021', href: '/speakers/speaker-2021' },
  { label: 'Speaker 2020', href: '/speakers/speaker-2020' },
  { label: 'Speaker 2019', href: '/speakers/speaker-2019' },
  { label: 'Speaker 2018', href: '/speakers/speaker-2018' },
  { label: 'Speaker 2017', href: '/speakers/speaker-2017' },
  { label: 'Speaker 2016', href: '/speakers/speaker-2016' },
];

const partnerLinks = [
  { label: 'Partner 2026', href: '/partners/partner-2026' },
  { label: 'Past Key Partner', href: '/partners/past-key-partner' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [winnersOpen, setWinnersOpen] = useState(false);
  const [speakersOpen, setSpeakersOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const winnersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speakersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const partnersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isWinnerPage = pathname.startsWith('/winners');
  const isSpeakerPage = pathname.startsWith('/speakers');
  const isPartnerPage = pathname.startsWith('/partners');

  const openWinners = () => {
    if (winnersCloseTimer.current) clearTimeout(winnersCloseTimer.current);
    winnersCloseTimer.current = null;
    setWinnersOpen(true);
  };

  const closeWinners = () => {
    if (winnersCloseTimer.current) clearTimeout(winnersCloseTimer.current);
    winnersCloseTimer.current = setTimeout(() => {
      setWinnersOpen(false);
      winnersCloseTimer.current = null;
    }, 140);
  };

  const openSpeakers = () => {
    if (speakersCloseTimer.current) clearTimeout(speakersCloseTimer.current);
    speakersCloseTimer.current = null;
    setSpeakersOpen(true);
  };

  const closeSpeakers = () => {
    if (speakersCloseTimer.current) clearTimeout(speakersCloseTimer.current);
    speakersCloseTimer.current = setTimeout(() => {
      setSpeakersOpen(false);
      speakersCloseTimer.current = null;
    }, 140);
  };

  const openPartners = () => {
    if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
    partnersCloseTimer.current = null;
    setPartnersOpen(true);
  };

  const closePartners = () => {
    if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
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

    return () => window.removeEventListener('hashchange', updateHash);
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

      if (winnersCloseTimer.current) clearTimeout(winnersCloseTimer.current);
      if (speakersCloseTimer.current) clearTimeout(speakersCloseTimer.current);
      if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
    };
  }, [lastScrollY]);

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
            className={`nav-link ${pathname?.startsWith('/aboutus') ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            About Us
          </Link>

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

          <Link
            href="/blog"
            className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Blog
          </Link>

          <div
            className={`nav-dropdown ${winnersOpen ? 'open' : ''}`}
            onMouseEnter={openWinners}
            onMouseLeave={closeWinners}
          >
            <button
              type="button"
              className={`nav-link ${isWinnerPage ? 'active' : ''}`}
              aria-expanded={winnersOpen}
              onClick={() => setWinnersOpen((open) => !open)}
            >
              Winners
              <ChevronDown size={16} />
            </button>

            {winnersOpen && (
              <div className="mega-panel" onMouseEnter={openWinners} onMouseLeave={closeWinners}>
                <div className="mega-inner">
                  <div className="mega-column">
                    <ul>
                      {winnerLinks.slice(0, 5).map((winner) => (
                        <li key={winner.href}>
                          <Link
                            href={winner.href}
                            className={`mega-item ${pathname === winner.href ? 'active' : ''}`}
                            onClick={closeAllMenus}
                          >
                            <span className="mega-icon" aria-hidden />
                            <span>{winner.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mega-column">
                    <ul>
                      {winnerLinks.slice(5).map((winner) => (
                        <li key={winner.href}>
                          <Link
                            href={winner.href}
                            className={`mega-item ${pathname === winner.href ? 'active' : ''}`}
                            onClick={closeAllMenus}
                          >
                            <span className="mega-icon" aria-hidden />
                            <span>{winner.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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

          <button
            type="button"
            className={`nav-link ${
              pathname === '/' && activeHash === '#cio-process-section' ? 'active' : ''
            }`}
            onClick={() => {
              closeAllMenus();

              if (pathname !== '/') {
                window.location.href = '/#cio-process-section';
                return;
              }

              setTimeout(() => {
                document
                  .getElementById('cio-process-section')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }}
          >
            Process
          </button>

          <div
            className={`nav-dropdown ${speakersOpen ? 'open' : ''}`}
            onMouseEnter={openSpeakers}
            onMouseLeave={closeSpeakers}
          >
            <button
              type="button"
              className={`nav-link ${isSpeakerPage ? 'active' : ''}`}
              aria-expanded={speakersOpen}
              onClick={() => setSpeakersOpen((open) => !open)}
            >
              Speakers
              <ChevronDown size={16} />
            </button>

            {speakersOpen && (
              <div className="mega-panel" onMouseEnter={openSpeakers} onMouseLeave={closeSpeakers}>
                <div className="mega-inner">
                  <div className="mega-column">
                    <ul>
                      {speakerLinks.slice(0, 5).map((speaker) => (
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
                  </div>

                  <div className="mega-column">
                    <ul>
                      {speakerLinks.slice(5).map((speaker) => (
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
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <Link
            href="/#contact-section"
            scroll={true}
            className={`nav-link ${
              pathname === '/' && activeHash === '#contact-section' ? 'active' : ''
            }`}
            onClick={closeAllMenus}
          >
            Contact
          </Link> */}
        </nav>

        <div className="navbar-actions">
          <Link href="/#contact-section" className="talk-btn" onClick={closeAllMenus}>
            <span>Let’s Talk</span>

            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>

          <button
            className={`menu-btn ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((s) => !s);
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
