'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const winnerLinks = [
  { label: 'Winner 2025', href: '/winners/winner-2025' },
  { label: 'Winner 2024', href: '/winners/winner-2024' },
  { label: 'Winner 2023', href: '/winners/winner-2023' },
  { label: 'Winner 2022', href: '/winners/winner-2022' },
  { label: 'Winner 2021', href: '/winners/winner-5' },
  { label: 'Winner 2020', href: '/winners/winner-6' },
  { label: 'Winner 2019', href: '/winners/winner-7' },
  { label: 'Winner 2018', href: '/winners/winner-2018' },
  { label: 'Winner 2017', href: '/winners/winner-2017' },
  { label: 'Winner 2016', href: '/winners/winner-2016' },
];

const speakerLinks = [
  { label: 'Speaker 2025', href: '/speakers/speaker-2025' },
  { label: 'Speaker 2024', href: '/speakers/speaker-2024' },
  { label: 'Speaker 2023', href: '/speakers/speaker-2023' },
  { label: 'Speaker 2022', href: '/speakers/speaker-2019' },
  { label: 'Speaker 2021', href: '/speakers/speaker-2020' },
  { label: 'Speaker 2020', href: '/speakers/speaker-2021' },
  { label: 'Speaker 2019', href: '/speakers/speaker-2022' },
  { label: 'Speaker 2018', href: '/speakers/speaker-2023' },
  { label: 'Speaker 2017', href: '/speakers/speaker-2024' },
  { label: 'Speaker 2016', href: '/speakers/speaker-2025' },
];

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [winnersOpen, setWinnersOpen] = useState(false);
  const [speakersOpen, setSpeakersOpen] = useState(false);
  const winnersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speakersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openWinners = () => {
    if (winnersCloseTimer.current) {
      clearTimeout(winnersCloseTimer.current);
      winnersCloseTimer.current = null;
    }

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
      speakersCloseTimer.current = null;
    }

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

  const closeAllMenus = () => {
    setMobileOpen(false);
    setWinnersOpen(false);
    setSpeakersOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (winnersCloseTimer.current) {
        clearTimeout(winnersCloseTimer.current);
      }

      if (speakersCloseTimer.current) {
        clearTimeout(speakersCloseTimer.current);
      }
    };
  }, [lastScrollY]);

  return (
    <header
      className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image src="/assets/logo/logo.png" alt="CORE Media" width={150} height={100} priority />
        </Link>

        {/* Nav Links */}
        <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
          <Link href="/" className="nav-link active">
            Home
          </Link>

          {/* <div className="nav-dropdown"> */}
          {/* <button className="nav-link">
              Pages
              <ChevronDown size={16} />
            </button> */}
          {/* Mega panel */}
          {/* <div className="mega-panel">
              <div className="mega-inner"> */}
          {/* COLUMN 1 */}
          {/* <div className="mega-column">
                  <h4>Main Pages</h4>

                  <ul>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Our history</a>
                    </li>
                    <li>
                      <a href="#">Feedbacks</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div> */}

          {/* COLUMN 2 */}
          {/* <div className="mega-column">
                  <h4>Other Pages</h4>

                  <ul>
                    <li>
                      <a href="#">Services</a>
                    </li>

                    <li>
                      <a href="#">Blog details</a>
                    </li>
                    <li>
                      <a href="#">Term & conditions</a>
                    </li>
                  </ul>
                </div> */}

          {/* RIGHT RED CARD */}
          {/* <div className="mega-right-card">
                  <div className="mega-card-inner">
                    <div>
                      <div className="mega-blog-tag">Latest Blog</div>

                      <h2 className="mega-blog-title">
                        Modern <br />
                        Home Makeover
                      </h2>

                      <p className="mega-blog-text">
                        Discover premium interior inspiration, architecture ideas, and elegant
                        modern living concepts for your next project.
                      </p>
                    </div>

                    <a href="#" className="mega-blog-btn">
                      Get in touch
                    </a>
                  </div>
                </div> */}
          {/* </div>
            </div> */}
          {/* </div> */}

          <Link href="/register" className="nav-link" onClick={closeAllMenus}>
            Registration
          </Link>
          <Link href="/nominate" className="nav-link" onClick={closeAllMenus}>
            Nominate
          </Link>
          {/* <Link href="/partners" className="nav-link" onClick={closeAllMenus}>
            Partners
          </Link> */}
          <Link href="/blog" className="nav-link" onClick={closeAllMenus}>
            Blog
          </Link>
          <div
            className={`nav-dropdown ${winnersOpen ? 'open' : ''}`}
            onMouseEnter={openWinners}
            onMouseLeave={closeWinners}
          >
            <button
              type="button"
              className="nav-link"
              aria-expanded={winnersOpen}
              onClick={openWinners}
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
                          <Link href={winner.href} className="mega-item" onClick={closeAllMenus}>
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
                          <Link href={winner.href} className="mega-item" onClick={closeAllMenus}>
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

          <div
            className={`nav-dropdown ${speakersOpen ? 'open' : ''}`}
            onMouseEnter={openSpeakers}
            onMouseLeave={closeSpeakers}
          >
            <button
              type="button"
              className="nav-link"
              aria-expanded={speakersOpen}
              onClick={openSpeakers}
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
                          <Link href={speaker.href} className="mega-item" onClick={closeAllMenus}>
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
                          <Link href={speaker.href} className="mega-item" onClick={closeAllMenus}>
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

          <Link href="/#contact-section" className="nav-link" onClick={closeAllMenus}>
            Contact
          </Link>
        </nav>

        {/* Right Side */}
        <div className="navbar-actions">
          {/* Search */}
          {/* <button className="search-btn">
            <Search size={20} strokeWidth={2} />
          </button> */}

          {/* CTA */}
          <Link href="/#contact-section" className="talk-btn">
            <span>Let’s Talk</span>

            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>

          {/* Mobile Menu */}
          <button
            className={`menu-btn ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
          >
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </header>
  );
}
