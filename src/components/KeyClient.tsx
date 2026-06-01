'use client';

import Image from 'next/image';

export default function KeyClient() {
  const logos = [
    '/assets/keyclients/client1.png',
    '/assets/keyclients/client2.png',
    '/assets/keyclients/client3.png',
    '/assets/keyclients/client4.png',
    '/assets/keyclients/client5.png',
    '/assets/keyclients/client6.png',
    '/assets/keyclients/client7.png',
    '/assets/keyclients/client8.png',
    '/assets/keyclients/client9.png',
  ];

  return (
    <section className="clients-section">
      <div className="clients-container">
        {/* Heading */}

        <div className="clients-heading">
          <div className="clients-label">
            <span className="clients-label-icon">⬢</span>

            <span className="clients-label-text">Our Partners</span>
          </div>

          {/* <h2 className="clients-title">
            Trusted By Industry
            <br />
            <span>Leading Brands</span>
          </h2> */}
        </div>

        {/* Slider */}

        <div className="">
          <div className="clients-track">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="client-card">
                <Image
                  src={logo}
                  alt="Client Logo"
                  width={180}
                  height={80}
                  className="client-logo"
                />
              </div>
            ))}
          </div>

          {/* Gradients */}

          <div className="clients-gradient-left" />

          <div className="clients-gradient-right" />
        </div>
      </div>
    </section>
  );
}
