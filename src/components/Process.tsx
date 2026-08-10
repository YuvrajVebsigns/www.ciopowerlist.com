'use client';

import { Award, Briefcase, Newspaper, Trophy, Vote } from 'lucide-react';
import Image from 'next/image';

const dataSources = [
  {
    icon: Newspaper,
    title: 'Media Reputation',
    text: 'Reputation across mainline, online, print, business, and technology publications.',
  },
  {
    icon: Trophy,
    title: 'Awards & Recognition',
    text: 'Awards, honours, recognitions, and professional achievements.',
  },
  {
    icon: Vote,
    title: 'Peer CIO Sentiments',
    text: 'National peer survey where CIOs vote for fellow CIO leaders.',
  },
  {
    icon: Briefcase,
    title: 'Vendor Nominations',
    text: 'Nominations received from vendors and industry partners.',
  },
];

export default function CIOPowerListProcess() {
  return (
    <section id="cio-process-section" className="cio-process-section">
      <div className="cio-process-container">
        <div className="cio-process-section-heading">
          <div className="aboutus-label">
            <Image
              src="/assets/icon.png"
              alt="CIO Power List"
              width={20}
              height={20}
              className="aboutus-label-icon"
            />

            <span className="aboutus-label-text">SELECTION METHODOLOGY</span>
          </div>

          {/* <h2 className="aboutus-title">
            The <span>CIO Power List</span> Evaluation Process
          </h2> */}

          {/* <p>
            A transparent, data-driven framework that evaluates technology leaders through multiple
            verified channels, business impact indicators, peer recognition, and industry
            achievements.
          </p> */}
        </div>

        <div className="cio-process-main">
          <div className="cio-process-content">
            <span className="cio-process-label">Process</span>

            <h2>
              Technology at <span>Works.</span>
            </h2>

            <p>
              The CIO Power List is a prestigious platform recognising India’s most influential and
              forward-thinking Chief Information Officers.
              <br />
              It honours technology leaders for their vision, innovation, leadership, and impact in
              driving business transformation through technology.
            </p>

            <div className="cio-process-note">
              <Award size={30} />

              <div>
                <h3>360-Degree Selection Process</h3>

                <p>
                  An algorithm-driven evaluation uses CIO data collected from multiple channels,
                  assessing key business and technology parameters.
                </p>
              </div>
            </div>
          </div>

          <div className="cio-process-sources-card">
            <div className="cio-process-sources-header">
              <h3>Data Sources</h3>

              <p>Multiple verified channels contribute to the CIO Power List evaluation process.</p>
            </div>

            <div className="cio-process-sources-grid">
              {dataSources.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="cio-process-source-item" key={item.title}>
                    <div className="cio-process-source-icon">
                      <Icon size={20} />
                    </div>

                    <div className="cio-process-source-content">
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
