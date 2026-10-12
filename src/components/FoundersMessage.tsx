'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FoundersMessage() {
  const sectionRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-up',
    initialTransform: 'translateY(40px)',
  });

  return (
    <section ref={sectionRef} className="founder-message-section">
      <div className="founder-message-container">
        {/* LEFT SIDE IMAGE */}
        <div className="founder-image-wrapper">
          <div className="founder-image-frame">
            <Image
              src="/assets/team/Anoop-Mathur.png"
              alt="Anoop Mathur - Founder"
              width={500}
              height={500}
              className="founder-image"
              priority
            />
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="founder-content">
          {/* LABEL */}
          <div className="founder-label">
            <span className="founder-label-icon">♟</span>
            <span className="founder-label-text">Founder’s Message</span>
          </div>

          {/* TITLE */}
          {/* <h2 className="founder-title">
            Building Connections in a<br />
            <span>Digital World.</span>
          </h2> */}

          {/* DESCRIPTION */}
          <p className="founder-description">
            Enterprises today are not short on technology. They are short on direction.
          </p>
          <p className="founder-description">
            AI is accelerating smart decisions, markets are shifting overnight, cyber risks are
            multiplying, and regulatory lines keep moving. In the middle of this velocity stands the
            CIO,no longer just enabling the business but navigating it.
          </p>

          {/* QUOTE */}
          {/* <blockquote className="founder-quote">
            <p>
              “We innovate to build relationships that deliver exceptional results, every single
              time.”
            </p>
          </blockquote> */}

          <div className="founder-readmore-wrap">
            <Link href="/foundermessage" className="founder-readmore-btn">
              Read more
            </Link>
          </div>

          {/* AUTHOR */}
          <div className="founder-author">
            <h3>Anoop Mathur</h3>
            <span>Founder, CORE MEDIA</span>
            <a
              href="https://www.linkedin.com/in/mathuranoop/"
              className="founder-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Anoop Mathur on LinkedIn"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>

          {/* BUTTON */}
          <Link href="/#contact-section" className="founder-btn">
            <span>Partner With Us</span>
            <div className="founder-btn-icon">
              <ArrowUpRight size={22} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
