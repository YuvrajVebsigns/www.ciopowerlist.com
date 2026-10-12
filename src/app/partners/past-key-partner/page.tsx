// src/app/partners/past-key-partner/page.tsx

// export default function PastKeyPartnerPage() {
//   return (
//     <main>
//       <section className="past-key-partner-section">
//         <div className="past-key-partner-container">
//           <h1>Past Key Partners</h1>
//           <p>Our valued partners who have supported us over the years.</p>
//         </div>
//       </section>
//     </main>
//   );
// }

export default function PastKeyPartnerPage() {
  const partners = [
    '/assets/pastkeyPartner/Past_Key_Partners_1.png',
    '/assets/pastkeyPartner/Past_Key_Partners_2.png',
    '/assets/pastkeyPartner/Past_Key_Partners_3.png',
    '/assets/pastkeyPartner/Past_Key_Partners_4.png',
    '/assets/pastkeyPartner/Past_Key_Partners_5.png',
    '/assets/pastkeyPartner/Past_Key_Partners_6.png',
    '/assets/pastkeyPartner/Past_Key_Partners_7.png',
    '/assets/pastkeyPartner/Past_Key_Partners_8.png',
    '/assets/pastkeyPartner/Past_Key_Partners_9.png',
    '/assets/pastkeyPartner/Past_Key_Partners_10.png',
    '/assets/pastkeyPartner/Past_Key_Partners_11.png',
    '/assets/pastkeyPartner/Past_Key_Partners_12.png',
    '/assets/pastkeyPartner/Past_Key_Partners_13.png',
    '/assets/pastkeyPartner/Past_Key_Partners_14.png',
    '/assets/pastkeyPartner/Past_Key_Partners_15.png',
    '/assets/pastkeyPartner/Past_Key_Partners_16.png',
    '/assets/pastkeyPartner/Past_Key_Partners_17.png',
    '/assets/pastkeyPartner/Past_Key_Partners_18.png',
    '/assets/pastkeyPartner/Past_Key_Partners_19.png',
    '/assets/pastkeyPartner/Past_Key_Partners_20.png',
    '/assets/pastkeyPartner/Past_Key_Partners_21.png',
    '/assets/pastkeyPartner/Past_Key_Partners_22.png',
    '/assets/pastkeyPartner/Past_Key_Partners_23.png',
    '/assets/pastkeyPartner/Past_Key_Partners_24.png',
    '/assets/pastkeyPartner/Past_Key_Partners_25.png',
    '/assets/pastkeyPartner/Past_Key_Partners_26.png',
    '/assets/pastkeyPartner/Past_Key_Partners_27.png',
    '/assets/pastkeyPartner/Past_Key_Partners_28.png',
    '/assets/pastkeyPartner/Past_Key_Partners_29.png',
    '/assets/pastkeyPartner/Past_Key_Partners_30.png',
    '/assets/pastkeyPartner/Past_Key_Partners_31.png',
    '/assets/pastkeyPartner/Past_Key_Partners_32.png',
    '/assets/pastkeyPartner/Past_Key_Partners_33.png',
    '/assets/pastkeyPartner/Past_Key_Partners_34.png',
    '/assets/pastkeyPartner/Past_Key_Partners_35.png',
    '/assets/pastkeyPartner/Past_Key_Partners_36.png',
    '/assets/pastkeyPartner/Past_Key_Partners_37.png',
    '/assets/pastkeyPartner/Past_Key_Partners_38.png',
    '/assets/pastkeyPartner/Past_Key_Partners_39.png',
    '/assets/pastkeyPartner/Past_Key_Partners_40.png',
    '/assets/pastkeyPartner/Past_Key_Partners_41.png',
    '/assets/pastkeyPartner/Past_Key_Partners_42.png',
    '/assets/pastkeyPartner/Past_Key_Partners_43.png',
    '/assets/pastkeyPartner/Past_Key_Partners_44.png',
    '/assets/pastkeyPartner/Past_Key_Partners_45.png',
    '/assets/pastkeyPartner/Past_Key_Partners_46.png',
    '/assets/pastkeyPartner/Past_Key_Partners_47.png',
    '/assets/pastkeyPartner/Past_Key_Partners_48.png',
    '/assets/pastkeyPartner/Past_Key_Partners_49.png',
    '/assets/pastkeyPartner/Past_Key_Partners_50.png',
    '/assets/pastkeyPartner/Past_Key_Partners_61.png',
    '/assets/pastkeyPartner/Past_Key_Partners_62.png',
    '/assets/pastkeyPartner/Past_Key_Partners_63.png',
    '/assets/pastkeyPartner/Past_Key_Partners_64.png',
    '/assets/pastkeyPartner/Past_Key_Partners_65.png',
    '/assets/pastkeyPartner/Past_Key_Partners_66.png',
    '/assets/pastkeyPartner/Past_Key_Partners_67.png',
    '/assets/pastkeyPartner/Past_Key_Partners_68.png',
    '/assets/pastkeyPartner/Past_Key_Partners_69.png',
    '/assets/pastkeyPartner/Past_Key_Partners_70.png',
    '/assets/pastkeyPartner/Past_Key_Partners_71.png',
    '/assets/pastkeyPartner/Past_Key_Partners_72.png',
    '/assets/pastkeyPartner/Past_Key_Partners_73.png',
    '/assets/pastkeyPartner/Past_Key_Partners_74.png',
    '/assets/pastkeyPartner/Past_Key_Partners_75.png',
  ];

  return (
    <main>
      <section className="past-partners-section">
        <div className="past-partners-container">
          <div className="past-partners-heading">
            <span className="partner2026-label11">PAST KEY PARTNERS</span>

            <h1 className="past-partners-title">
              Our Trusted <span>Past Key Partners</span>
            </h1>

            <p className="past-partners-description">
              We are proud to have collaborated with leading organizations and technology innovators
              who have contributed to the success of our platforms and initiatives over the years.
            </p>
          </div>

          <div className="past-partners-grid">
            {partners.map((logo, index) => (
              <div key={index} className="past-partner-card">
                <img src={logo} alt={`Partner ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
