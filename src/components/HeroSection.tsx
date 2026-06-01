'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-wrapper">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-icon">✦</span>
            <span className="hero-badge-text">
              CELEBRATING TECHNOLOGY LEADERSHIP - CIO POWERLIST 2026
            </span>
          </div>

          <h1 className="hero-title">Unlocking Growth Through Technology Leadership</h1>

          <div className="hero-bottom">
            <div className="hero-arrow">
              <img src="/assets/home/arrow.png" alt="Arrow" className="hero-arrow-img" />
            </div>

            <p className="hero-description">
              Recognizing the leaders who leverage technology to accelerate growth, enhance customer
              experiences, and build future-ready enterprises.
            </p>
          </div>

          <button onClick={handleScroll} className="hero-scroll" aria-label="Scroll down">
            <span className="font-semibold">Scroll Down</span>
            <div className="hero-scroll-icon">
              <ArrowDown size={18} />
            </div>
          </button>
        </div>

        <div className="hero-image-area">
          <Image
            src="/assets/hero.png"
            alt="Business Man"
            width={800}
            height={1500}
            priority
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
