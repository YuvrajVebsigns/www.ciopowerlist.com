'use client';

import { BarChart3, Binoculars, Handshake, KeyRound, Network } from 'lucide-react';
import Image from 'next/image';

const partnerBenefits = [
  {
    icon: BarChart3,
    title: 'Gain Exposure',
    text: 'Position your brand, technology, and services to influential business and technology leaders.',
  },
  {
    icon: KeyRound,
    title: 'Access ICT Leaders',
    text: 'Direct access to the industry’s top ICT decision-makers.',
  },
  {
    icon: Network,
    title: 'Lead Generation',
    text: 'Connect with potential new clients and explore business opportunities.',
  },
  {
    icon: Handshake,
    title: 'Strengthen Relationships',
    text: 'Meet existing and prospective customers in a relaxed networking setting.',
  },
  {
    icon: Binoculars,
    title: 'Discover Opportunities',
    text: 'Gain insight into latest trends, challenges, priorities, and new opportunities.',
  },
];

export default function CIOPowerListWhyPartner() {
  return (
    <section id="cio-whypartner-section" className="cio-whypartner-section">
      <div className="cio-whypartner-container">
        <div className="cio-whypartner-heading">
          <div className="aboutus-label">
            <Image
              src="/assets/icon.png"
              alt="CIO Power List"
              width={20}
              height={20}
              className="aboutus-label-icon"
            />

            <span className="aboutus-label-text">PARTNERSHIP OPPORTUNITY</span>
          </div>

          <h2>
            Why <span>Partner?</span>
          </h2>

          <p>
            CIO Power List brings together the top IT leaders in the country under one roof for an
            engaging program.
          </p>
        </div>

        <div className="cio-whypartner-content">
          <div className="cio-whypartner-left">
            <h3>Build visibility. Create connections. Grow your reputation.</h3>

            <p>
              Scheduled for June 18 &amp; 19, 2026, it is the Davos for the ICT Industry where you
              can build positive perceptions for your brand and offerings, maximise exposure and
              grow your reputation among the country&apos;s top CIOs.
            </p>

            <p>
              CIO Power List is one of the most sought after events in the industry and is a unique
              opportunity that will help you make the right connections with key industry
              stakeholders in an immersive environment.
            </p>

            <p>
              We will bring together India&apos;s top 300+ CIOs and ICT decision makers from
              different industry verticals. The dialogue will take place in an elegant and
              interesting environment that encourages engagement.
            </p>

            <p>
              CIO Power List features thoughtfully curated sessions designed to drive deep
              engagement, open doors to strong business leads, create a positive brand impact, boost
              lead conversion, and make connections for life.
            </p>
          </div>

          <div className="cio-whypartner-right">
            {partnerBenefits.map((item) => {
              const Icon = item.icon;

              return (
                <div className="cio-whypartner-card" key={item.title}>
                  <div className="cio-whypartner-icon">
                    <Icon size={28} />
                  </div>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
