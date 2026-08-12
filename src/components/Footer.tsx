// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState } from 'react';
// import { Phone, Mail, Send } from 'lucide-react';
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

// import { subscribeWebsiteEmail } from '@/services/subscribes.service';

// export default function Footer() {
//   const [subscribeEmail, setSubscribeEmail] = useState('');
//   const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const email = subscribeEmail.trim();

//     // Clear previous message
//     setSubscribeStatus(null);

//     // Required validation
//     if (!email) {
//       setSubscribeStatus('Please enter your email address.');
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       setSubscribeStatus('Please enter a valid email address.');
//       return;
//     }

//     setIsSubscribing(true);

//     try {
//       // Call subscribe API
//       const response = await subscribeWebsiteEmail(email);

//       setSubscribeStatus(response?.message || 'Successfully subscribed!');

//       // Clear input after successful subscription
//       setSubscribeEmail('');
//     } catch (error: unknown) {
//       setSubscribeStatus(
//         error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
//       );
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <footer className="footer-section">
//       {/* MAIN FOOTER */}
//       <div className="footer-container">
//         <div className="footer-grid">
//           {/* COLUMN 1 */}
//           <div className="footer-widget footer-brand">
//             <Link href="/" className="footer-logo1">
//               <Image
//                 src="/assets/logo/logo2.png"
//                 alt="Core Media"
//                 width={220}
//                 height={100}
//                 priority
//               />
//             </Link>

//             {/* <p className="footer-description">
//               Developing personalized customer journeys to increase customer satisfaction,
//               engagement, and long-term loyalty for business growth.
//             </p> */}
//           </div>

//           {/* COLUMN 2 */}
//           <div className="footer-widget">
//             <h4 className="footer-title">Services</h4>

//             <ul className="footer-links">
//               <li>
//                 <Link href="/register">Registration</Link>
//               </li>

//               <li>
//                 <Link href="/nominate">Nomination</Link>
//               </li>
//             </ul>
//           </div>

//           {/* COLUMN 3 */}
//           <div className="footer-widget">
//             <h4 className="footer-title">Resources</h4>

//             <ul className="footer-links">
//               <li>
//                 <Link href="/blog">Blogs</Link>
//               </li>

//               <li>
//                 <Link href="/events">Event</Link>
//               </li>
//             </ul>
//           </div>

//           {/* COLUMN 4 */}
//           <div className="footer-widget">
//             <h4 className="footer-title">Subscribe</h4>

//             <form className="footer-subscribe" onSubmit={handleSubscribe} noValidate>
//               <input
//                 type="email"
//                 value={subscribeEmail}
//                 onChange={(e) => {
//                   setSubscribeEmail(e.target.value);
//                   setSubscribeStatus(null);
//                 }}
//                 placeholder="Enter your email"
//                 className="footer-input"
//                 disabled={isSubscribing}
//                 aria-label="Email address"
//                 autoComplete="email"
//               />

//               <button
//                 type="submit"
//                 className="footer-submit"
//                 aria-label="Subscribe"
//                 disabled={isSubscribing}
//               >
//                 <Send size={18} />
//               </button>
//             </form>

//             {/* API Success / Error Message */}
//             {subscribeStatus && (
//               <p className="footer-subscribe-status" role="status" aria-live="polite">
//                 {subscribeStatus}
//               </p>
//             )}

//             <br />

//             <h4 className="footer-description1">Office Address</h4>

//             <p className="footer-description">
//               Units Nos. 3037 – A1 Wing, 3rd Floor, Oberoi Garden Estate, Near Chandivali Studio,
//               Andheri (East), Mumbai – 400072, INDIA
//             </p>

//             {/* <label className="footer-checkbox">
//               <input type="checkbox" />

//               <span>
//                 I agree to the{' '}
//                 <Link href="/" className="footer-terms">
//                   Terms & Conditions
//                 </Link>
//               </span>
//             </label> */}
//           </div>
//         </div>
//       </div>

//       {/* FOOTER BOTTOM */}
//       <div className="footer-bottom">
//         <div className="footer-container footer-bottom-wrapper">
//           {/* CONTACT */}
//           <div className="footer-contact">
//             <a href="tel:+917506035537" className="footer-contact-item">
//               <span className="footer-contact-icon">
//                 <Phone size={15} />
//               </span>

//               <span className="footer-contact-text">+91 7506035537</span>
//             </a>

//             <div className="footer-contact-item">
//               <a
//                 href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@core-mediagroup.com&su=Enquiry"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="footer-contact-item"
//               >
//                 <span className="footer-contact-icon">
//                   <Mail size={15} />
//                 </span>

//                 <span className="footer-contact-text">contact@core-mediagroup.com</span>
//               </a>
//             </div>
//           </div>

//           {/* SOCIAL */}
//           <div className="footer-socials">
//             <a
//               href="https://www.facebook.com/coremediaindia/"
//               aria-label="Facebook"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaFacebookF />
//             </a>

//             <a
//               href="https://www.instagram.com/core_media_/"
//               aria-label="Instagram"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaInstagram />
//             </a>

//             <a
//               href="https://x.com/CIOChoice"
//               aria-label="Twitter"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaXTwitter />
//             </a>

//             <a
//               href="https://www.linkedin.com/company/core-mediagroup/"
//               aria-label="LinkedIn"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaLinkedinIn />
//             </a>
//           </div>

//           {/* COPYRIGHT */}
//           <div className="footer-copy">Copyright © 2026 CORE Media. All Rights Reserved.</div>
//         </div>
//       </div>
//     </footer>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Phone, Mail, Send } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

import { subscribeWebsiteEmail } from '@/services/subscribes.service';

export default function Footer() {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Subscribe popup states
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const [subscribePopupMessage, setSubscribePopupMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = subscribeEmail.trim();

    // Required validation
    if (!email) {
      setSubscribePopupMessage('Please enter your email address.');
      setShowSubscribePopup(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setSubscribePopupMessage('Please enter a valid email address.');
      setShowSubscribePopup(true);
      return;
    }

    setIsSubscribing(true);

    try {
      // Call subscribe API
      const response = await subscribeWebsiteEmail(email);

      // Success popup
      setSubscribePopupMessage(response?.message || 'Successfully subscribed!');
      setShowSubscribePopup(true);

      // Clear input after successful subscription
      setSubscribeEmail('');
    } catch (error: unknown) {
      setSubscribePopupMessage(
        error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
      );

      setShowSubscribePopup(true);
    } finally {
      setIsSubscribing(false);
    }
  };

  const closeSubscribePopup = () => {
    setShowSubscribePopup(false);
    setSubscribePopupMessage('');
  };

  return (
    <footer className="footer-section">
      {/* MAIN FOOTER */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* COLUMN 1 */}
          <div className="footer-widget footer-brand">
            <Link href="/" className="footer-logo1">
              <Image
                src="/assets/logo/logo2.png"
                alt="Core Media"
                width={220}
                height={100}
                priority
              />
            </Link>
          </div>

          {/* COLUMN 2 */}
          <div className="footer-widget">
            <h4 className="footer-title">Services</h4>

            <ul className="footer-links">
              <li>
                <Link href="/register">Registration</Link>
              </li>

              <li>
                <Link href="/nominate">Nomination</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="footer-widget">
            <h4 className="footer-title">Resources</h4>

            <ul className="footer-links">
              <li>
                <Link href="/blog">Blogs</Link>
              </li>

              <li>
                <Link href="/events">Event</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div className="footer-widget">
            <h4 className="footer-title">Subscribe</h4>

            <form className="footer-subscribe" onSubmit={handleSubscribe} noValidate>
              <input
                type="email"
                value={subscribeEmail}
                onChange={(e) => {
                  setSubscribeEmail(e.target.value);
                }}
                placeholder="Enter your email"
                className="footer-input"
                disabled={isSubscribing}
                aria-label="Email address"
                autoComplete="email"
              />

              <button
                type="submit"
                className="footer-submit"
                aria-label="Subscribe"
                disabled={isSubscribing}
              >
                <Send size={18} />
              </button>
            </form>

            {/* SUBSCRIBE POPUP */}
            {showSubscribePopup && (
              <div className="subscribe-toast" role="alert" aria-live="polite">
                <span className="subscribe-toast-dot" />

                <p className="subscribe-toast-message">{subscribePopupMessage}</p>

                <button
                  type="button"
                  className="subscribe-toast-close"
                  onClick={closeSubscribePopup}
                  aria-label="Close notification"
                >
                  ×
                </button>
              </div>
            )}

            <br />

            <h4 className="footer-description1">Office Address</h4>

            <p className="footer-description">
              Units Nos. 3037 – A1 Wing, 3rd Floor, Oberoi Garden Estate, Near Chandivali Studio,
              Andheri (East), Mumbai – 400072, INDIA
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-wrapper">
          {/* CONTACT */}
          <div className="footer-contact">
            <a href="tel:+917506035537" className="footer-contact-item">
              <span className="footer-contact-icon">
                <Phone size={15} />
              </span>

              <span className="footer-contact-text">+91 7506035537</span>
            </a>

            <div className="footer-contact-item">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@core-mediagroup.com&su=Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <Mail size={15} />
                </span>

                <span className="footer-contact-text">contact@core-mediagroup.com</span>
              </a>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/coremediaindia/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/core_media_/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://x.com/CIOChoice"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.linkedin.com/company/core-mediagroup/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>

          {/* COPYRIGHT */}
          <div className="footer-copy">Copyright © 2026 CORE Media. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
