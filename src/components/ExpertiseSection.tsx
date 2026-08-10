'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

export default function AboutUsSection() {
  const sectionRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-up',
    initialTransform: 'translateY(40px)',
  });

  const cardRef1 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-28px)',
    threshold: 0.12,
  });

  const cardRef2 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-28px)',
    threshold: 0.12,
  });

  const cardRef3 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-28px)',
    threshold: 0.12,
  });

  const cardRef4 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-28px)',
    threshold: 0.12,
  });

  const cardRef5 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-28px)',
    threshold: 0.12,
  });

  const cards = [
    {
      image: '/assets/aboutus/recognized.png',
      hoverImage: '/assets/aboutus/recognized-dark.png',
      title: '130+ CIO Leaders',
      description:
        'Recognising influential CIOs and ICT leaders driving innovation and business transformation across industries.',
    },
    {
      image: '/assets/aboutus/technology2.png',
      hoverImage: '/assets/aboutus/technology-dark.png',
      title: 'Data-Driven Selection',
      description:
        'Winners are chosen through a transparent algorithm-based evaluation process with no jury involvement.',
    },
    {
      image: '/assets/aboutus/winner.png',
      hoverImage: '/assets/aboutus/winner-dark.png',
      title: 'Industry Impact',
      description:
        'Celebrating leaders creating measurable technology and business impact through strategic initiatives.',
    },
    {
      image: '/assets/aboutus/leadership.png',
      hoverImage: '/assets/aboutus/leadership-dark.png',
      title: 'Leadership Forum',
      description:
        'A prestigious platform for networking, knowledge sharing, recognition, and industry collaboration.',
    },
    {
      image: '/assets/aboutus/learn.png',
      hoverImage: '/assets/aboutus/learn-dark.png',
      title: 'Learn & Connect',
      description:
        'Engage with peers, gain valuable insights, and celebrate excellence in technology leadership.',
    },
  ];

  const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4, cardRef5];

  return (
    <section ref={sectionRef} className="aboutus-section">
      <div className="aboutus-container">
        <div className="aboutus-heading">
          <div className="aboutus-label">
            <Image
              src="/assets/icon.png"
              alt="CIO Power List"
              width={20}
              height={20}
              className="aboutus-label-icon"
            />

            <span className="aboutus-label-text">ABOUT THE INITIATIVE</span>
          </div>

          {/* <h2 className="aboutus-title">
            About Us &
            <br />
            <span>Driving the Future of Enterprise Technology</span>
          </h2> */}

          {/* <p className="aboutus-intro">
            CIO Power List celebrates visionary CIOs and ICT leaders driving innovation, transformation, business growth across India.
          </p> */}
        </div>

        <div className="aboutus-grid">
          {cards.map((card, index) => (
            <div
              key={card.title}
              ref={cardRefs[index]}
              className={`aboutus-card aboutus-stagger-${index + 1}`}
            >
              <div className="aboutus-image-wrapper">
                <img src={card.image} alt={card.title} className="aboutus-image" />
              </div>

              <h3 className="aboutus-card-title">{card.title}</h3>

              <p className="aboutus-card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
