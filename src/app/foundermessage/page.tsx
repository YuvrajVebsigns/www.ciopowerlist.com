'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
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
            At CORE Media, our purpose has always been to create meaningful platforms that bring
            together technology leaders, enterprises, innovators, and solution providers to exchange
            ideas, build trusted relationships, and unlock new business opportunities. As the B2B
            technology landscape continues to evolve, we remain committed to creating experiences
            that inspire collaboration, encourage innovation, and deliver measurable value for every
            stakeholder.
          </p>
          <p className="founder-description">
            {' '}
            Our flagship platform, CIO CHOICE, reflects this commitment. As one of India&apos;s most
            respected technology recognition platforms, it empowers the country&apos;s CIO community
            to recognize the ICT brands they trust the most. Alongside our portfolio of executive
            forums, leadership summits, awards, and digital engagement platforms, we continue to
            build communities that foster knowledge sharing, celebrate excellence, and strengthen
            the technology ecosystem.
          </p>
          <p className="founder-description">
            Everything we do is driven by a customer-first mindset. From bespoke events and
            Account-Based Marketing (ABM) programs to executive roundtables and digital content
            solutions, our focus is on helping brands reach the right decision-makers with
            relevance, authenticity, and impact. We believe that every engagement should create
            lasting relationships, meaningful conversations, and measurable business outcomes.
          </p>
          <p className="founder-description">
            As we look ahead, our vision remains clear—to continue building trusted platforms that
            connect people, ideas, and opportunities. We don&apos;t simply organize events or create
            campaigns; we create environments where partnerships flourish, innovation is recognized,
            and businesses are empowered to grow.
          </p>
          <p className="founder-description">
            Thank you for being part of our journey. We look forward to shaping the future of
            technology engagement together.
          </p>

          {/* QUOTE */}
          {/* <blockquote className="founder-quote">
            <p>
              “We innovate to build relationships that deliver exceptional results, every single
              time.”
            </p>
          </blockquote> */}

          {/* <div className="founder-readmore-wrap">
            <Link href="/aboutus" className="founder-readmore-btn">
              Read more
            </Link>
          </div> */}

          {/* AUTHOR */}
          {/* <div className="founder-author">
            <h3>Anoop Mathur</h3>
            <span>Founder, CORE MEDIA</span>
          </div> */}

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
