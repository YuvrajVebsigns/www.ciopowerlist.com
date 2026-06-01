'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ExpertiseSection() {
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

  const bottomCards = [
    {
      image: '/assets/aboutus/Award-logo1.png',
      title: 'Over 130+ CIOs will be recognised',
    },
    {
      image: '/assets/aboutus/builb-logo.png',
      title: 'Technology at Work No Jury - Algorithm based evaluation to pick final winners',
    },
    {
      image: '/assets/aboutus/dedicated-logo.png',
      title: 'Winners chosen basis Technology & Business Influence',
    },
    {
      image: '/assets/aboutus/Award-logo.png',
      title: 'Symposium and Recognition Program',
    },
    {
      image: '/assets/aboutus/Award-logo-dark1.png',
      title: 'Opportunity to - Learn | Engage | Celebrate',
    },
  ];
  const [b0, b1, b2, b3, b4] = bottomCards;

  return (
    <section ref={sectionRef} className="expertise-section">
      <div className="expertise-container">
        <div className="expertise-heading expertise-heading-about">
          <h2 className="expertise-title expertise-title-about">About</h2>
        </div>

        <div className="expertise-grid">
          <div className="about-content about-content-full">
            <div className="about-text about-text-full">
              <p>
                Technology in the modern economy is developing, mutating, and adapting at a
                staggering rate, and fundamentally changing the way any business operates. With
                wider access to new and emerging technologies, marketplaces—global, national,
                regional, or even local—are becoming increasingly competitive. In this ever-evolving
                scenario, thought leadership is emerging as an important strategy for growth,
                significantly impacting business models, the marketplace, consumers, and employees.
              </p>

              <p>
                Leading this change are a select few pioneering CIOs and ICT Leaders, blazing new
                paths, and shaping the outcome of disruptive technologies. These ICT leaders are
                reinventing industries and creating a new value system, driven by IT now sitting at
                the centre of innovation for business.
              </p>

              <p>
                With CIO Power List, CORE Media seeks to discover and recognise these industry
                legends creating ground-breaking strategies to drive growth.
              </p>

              <p>
                CIO Power List is the list of THE most INFLUENTIAL Technology Leaders in India. With
                corporate IT&apos;s power and influence over business growing, these CIOs are
                leading the disruption wave, changing the rules of engagement, and capitalising on
                opportunities to fuel business growth.
              </p>

              <p>
                Join us in celebrating and raising a toast to India&apos;s ICT titans—disruptive
                leaders transforming the ecosystem!
              </p>
            </div>

            <div className="about-cards">
              <div ref={cardRef1} className="about-card stagger-1">
                <div className="about-card-hex">
                  <img src={b0!.image} alt={b0!.title} className="about-card-icon" />
                </div>
                <p className="about-card-title">{b0!.title}</p>
              </div>

              <div ref={cardRef2} className="about-card stagger-2">
                <div className="about-card-hex">
                  <img src={b1!.image} alt={b1!.title} className="about-card-icon" />
                </div>
                <p className="about-card-title">{b1!.title}</p>
              </div>

              <div ref={cardRef3} className="about-card stagger-3">
                <div className="about-card-hex">
                  <img src={b2!.image} alt={b2!.title} className="about-card-icon" />
                </div>
                <p className="about-card-title">{b2!.title}</p>
              </div>

              <div ref={cardRef4} className="about-card stagger-4">
                <div className="about-card-hex">
                  <img src={b3!.image} alt={b3!.title} className="about-card-icon" />
                </div>
                <p className="about-card-title">{b3!.title}</p>
              </div>

              <div ref={cardRef5} className="about-card stagger-5">
                <div className="about-card-hex">
                  <img src={b4!.image} alt={b4!.title} className="about-card-icon" />
                </div>
                <p className="about-card-title">{b4!.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
