// 'use client';

// import Image from 'next/image';
// import { ArrowUpRight } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { submitWebsiteContact } from '@/services/contacts.service';

// const SERVICE_OPTIONS = [
//   'Business Strategy',
//   'Customer Experience',
//   'CIO Events & Conferences',
//   'Brand Recognition',
//   'Video Content',
// ];

// export default function ContactSection() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [service, setService] = useState('');
//   const [message, setMessage] = useState('');
//   const [popupMessage, setPopupMessage] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (!popupMessage) return;

//     const timer = window.setTimeout(() => {
//       setPopupMessage(null);
//     }, 3200);

//     return () => window.clearTimeout(timer);
//   }, [popupMessage]);

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const trimmedName = fullName.trim();
//     const trimmedEmail = email.trim();
//     const trimmedPhone = phone.trim();
//     const trimmedService = service.trim();
//     const trimmedMessage = message.trim();

//     if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedService || !trimmedMessage) {
//       setPopupMessage('Please fill in all required fields.');
//       return;
//     }

//     setIsSubmitting(true);
//     setPopupMessage(null);

//     try {
//       await submitWebsiteContact({
//         fullName: trimmedName,
//         email: trimmedEmail,
//         phone: trimmedPhone,
//         service: trimmedService,
//         message: trimmedMessage,
//       });

//       setPopupMessage('Thank you! Your message has been received.');
//       setFullName('');
//       setEmail('');
//       setPhone('');
//       setService('');
//       setMessage('');
//     } catch (error) {
//       setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   }
//   return (
//     <section className="contact-section" id="contact-section">
//       <div className="contact-container">
//         {/* LEFT SIDE */}
//         <div className="contact-map-area">
//           <div className="contact-map">
//             <Image
//               src="/assets/map3.png"
//               alt="Global Map"
//               width={700}
//               height={500}
//               className="contact-map-img"
//               priority
//             />

//             {/* Dots */}
//             <span className="map-dot dot-1"></span>
//             <span className="map-label label-1">India</span>

//             <span className="map-dot dot-2"></span>
//             <span className="map-label label-2">Dubai</span>

//             <span className="map-dot dot-3"></span>
//             <span className="map-label label-3">Singapur</span>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="contact-form-area">
//           {popupMessage ? (
//             <div className="contact-popup" role="status" aria-live="polite">
//               <span className="contact-popup-dot" aria-hidden="true" />
//               <p>{popupMessage}</p>
//               <button
//                 type="button"
//                 onClick={() => setPopupMessage(null)}
//                 aria-label="Close message"
//               >
//                 ×
//               </button>
//             </div>
//           ) : null}

//           {/* Badge */}
//           <div className="contact-badge">⬢ GET IN TOUCH</div>

//           {/* Title */}
//           {/* <h2 className="contact-title">Let’s Start a Conversation</h2> */}

//           {/* Form */}
//           <form className="contact-form" onSubmit={handleSubmit}>
//             <div className="contact-grid">
//               {/* FULL NAME */}
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name *"
//                 value={fullName}
//                 required
//                 pattern="^[A-Za-z\s]+$"
//                 title="Only alphabets are allowed"
//                 onInput={(e) => {
//                   e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
//                 }}
//                 onChange={(e) => setFullName(e.target.value)}
//               />

//               {/* EMAIL */}
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address *"
//                 value={email}
//                 required
//                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//                 title="Enter a valid email address"
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               {/* PHONE NUMBER */}
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone Number *"
//                 value={phone}
//                 required
//                 maxLength={10}
//                 pattern="[0-9]{10}"
//                 title="Enter a valid 10-digit phone number"
//                 onInput={(e) => {
//                   e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
//                 }}
//                 onChange={(e) => setPhone(e.target.value)}
//               />

//               {/* SELECT */}
//               <select required value={service} onChange={(e) => setService(e.target.value)}>
//                 <option value="" disabled>
//                   Select a Service *
//                 </option>

//                 {SERVICE_OPTIONS.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* MESSAGE */}
//             <textarea
//               rows={6}
//               placeholder="Your Message *"
//               required
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />

//             {/* BUTTON */}
//             <button type="submit" className="contact-btn" disabled={isSubmitting}>
//               <span>{isSubmitting ? 'Sending...' : 'Submit '}</span>

//               <span className="contact-btn-icon">
//                 <ArrowUpRight size={18} />
//               </span>
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import { ArrowUpRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { submitWebsiteContact } from '@/services/contacts.service';

const SERVICE_OPTIONS = [
  'Business Strategy',
  'Customer Experience',
  'CIO Events & Conferences',
  'Brand Recognition',
  'Video Content',
];

const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible' | 'invisible';
          execution?: 'render' | 'execute';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: (errorCode?: string) => void;
          'timeout-callback'?: () => void;
        },
      ) => string;

      execute: (widgetId?: string) => void;

      reset: (widgetId?: string) => void;

      remove: (widgetId?: string) => void;
    };
  }
}

type CaptchaStatus = 'loading' | 'ready' | 'verifying' | 'verified' | 'error';

export default function ContactSection() {
  /* =========================================================
     FORM STATE
  ========================================================= */

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  /* =========================================================
     CLOUDFLARE TURNSTILE STATE
  ========================================================= */

  const [captchaToken, setCaptchaToken] = useState('');

  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>('loading');

  const [isRefreshingCaptcha, setIsRefreshingCaptcha] = useState(false);

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);

  const turnstileWidgetIdRef = useRef<string | null>(null);

  /* =========================================================
     UI STATE
  ========================================================= */

  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
     CLOUDFLARE SITE KEY
  ========================================================= */

  const turnstileSiteKey = process.env.NEXT_PUBLIC_SITEKEY?.trim() || '';

  /* =========================================================
     FORM COMPLETION CHECK
     
     CAPTCHA "I'm human" button will only become enabled
     after all required fields contain a value.
  ========================================================= */

  const isFormComplete =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    service.trim().length > 0 &&
    message.trim().length > 0;

  /* =========================================================
     LOAD CLOUDFLARE TURNSTILE
  ========================================================= */

  useEffect(() => {
    if (!turnstileSiteKey) {
      setCaptchaStatus('error');

      setPopupMessage('CAPTCHA configuration is missing. Please try again later.');

      return;
    }

    let cancelled = false;

    const initializeTurnstile = () => {
      if (cancelled) {
        return;
      }

      if (!window.turnstile) {
        setCaptchaStatus('error');

        setPopupMessage('Unable to load CAPTCHA verification. Please try again later.');

        return;
      }

      if (!turnstileContainerRef.current) {
        setCaptchaStatus('error');

        return;
      }

      /*
       * Prevent duplicate Turnstile widgets.
       */
      if (turnstileWidgetIdRef.current) {
        return;
      }

      try {
        const widgetId = window.turnstile.render(turnstileContainerRef.current, {
          /*
           * PUBLIC CLOUDFLARE SITE KEY
           */
          sitekey: turnstileSiteKey,

          /*
           * Invisible Turnstile.
           */
          size: 'invisible',

          /*
           * Verification starts only when execute()
           * is called.
           */
          execution: 'execute',

          theme: 'light',

          /*
           * Cloudflare verification successful.
           */
          callback: (token: string) => {
            if (cancelled) {
              return;
            }

            setCaptchaToken(token);

            setCaptchaStatus('verified');

            setIsRefreshingCaptcha(false);

            /*
             * Clear old CAPTCHA-related messages.
             */
            setPopupMessage(null);
          },

          /*
           * Token expired.
           */
          'expired-callback': () => {
            if (cancelled) {
              return;
            }

            setCaptchaToken('');

            setCaptchaStatus('ready');

            setIsRefreshingCaptcha(false);

            setPopupMessage('CAPTCHA verification expired. Please verify again.');
          },

          /*
           * Turnstile error.
           */
          'error-callback': (errorCode) => {
            if (cancelled) {
              return;
            }

            setCaptchaToken('');

            setCaptchaStatus('error');

            setIsRefreshingCaptcha(false);

            if (errorCode === '110200') {
              setPopupMessage(
                'CAPTCHA domain is not authorized in Cloudflare. Please add this website hostname to Turnstile Hostname Management.',
              );
            } else {
              setPopupMessage('CAPTCHA verification failed. Please try again.');
            }
          },

          /*
           * Verification timeout.
           */
          'timeout-callback': () => {
            if (cancelled) {
              return;
            }

            setCaptchaToken('');

            setCaptchaStatus('ready');

            setIsRefreshingCaptcha(false);

            setPopupMessage('CAPTCHA verification timed out. Please try again.');
          },
        });

        if (cancelled) {
          try {
            window.turnstile.remove(widgetId);
          } catch {
            // Ignore cleanup error.
          }

          return;
        }

        turnstileWidgetIdRef.current = widgetId;

        setCaptchaStatus('ready');
      } catch {
        setCaptchaStatus('error');

        setPopupMessage('Unable to load CAPTCHA. Please try again later.');
      }
    };

    /*
     * Check whether Turnstile script already exists.
     */
    const existingScript = document.querySelector('script[data-cloudflare-turnstile="true"]');

    if (existingScript) {
      if (window.turnstile) {
        initializeTurnstile();
      } else {
        existingScript.addEventListener('load', initializeTurnstile);
      }

      return () => {
        cancelled = true;

        existingScript.removeEventListener('load', initializeTurnstile);
      };
    }

    /*
     * Create Cloudflare Turnstile script.
     */
    const script = document.createElement('script');

    script.src = TURNSTILE_SCRIPT_SRC;

    script.async = true;

    script.defer = true;

    script.setAttribute('data-cloudflare-turnstile', 'true');

    script.addEventListener('load', initializeTurnstile);

    script.addEventListener('error', () => {
      if (cancelled) {
        return;
      }

      setCaptchaStatus('error');

      setPopupMessage('Unable to connect to CAPTCHA service. Please try again later.');
    });

    document.head.appendChild(script);

    return () => {
      cancelled = true;

      script.removeEventListener('load', initializeTurnstile);
    };
  }, [turnstileSiteKey]);

  /* =========================================================
     CLEANUP TURNSTILE
  ========================================================= */

  useEffect(() => {
    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // Ignore cleanup error.
        }
      }

      turnstileWidgetIdRef.current = null;
    };
  }, []);

  /* =========================================================
     POPUP AUTO CLOSE
  ========================================================= */

  useEffect(() => {
    if (!popupMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [popupMessage]);

  /* =========================================================
     START CLOUDFLARE VERIFICATION

     CAPTCHA can ONLY start after the entire form
     has been completed.
  ========================================================= */

  function startCaptchaVerification() {
    /*
     * Prevent verification while submitting.
     */
    if (isSubmitting) {
      return;
    }

    /*
     * Do not allow CAPTCHA before all form fields
     * have been completed.
     */
    if (!isFormComplete) {
      setPopupMessage('Please complete all required fields before CAPTCHA verification.');

      return;
    }

    /*
     * Make sure Turnstile is loaded.
     */
    if (!window.turnstile) {
      setCaptchaStatus('error');

      setPopupMessage('CAPTCHA is still loading. Please try again.');

      return;
    }

    /*
     * Make sure the widget exists.
     */
    if (!turnstileWidgetIdRef.current) {
      setCaptchaStatus('error');

      setPopupMessage('CAPTCHA is not ready. Please refresh the page and try again.');

      return;
    }

    /*
     * Do not execute again if already verified.
     */
    if (captchaToken) {
      return;
    }

    try {
      setCaptchaStatus('verifying');

      setIsRefreshingCaptcha(false);

      setPopupMessage(null);

      window.turnstile.execute(turnstileWidgetIdRef.current);
    } catch {
      setCaptchaStatus('error');

      setPopupMessage('Unable to start CAPTCHA verification. Please try again.');
    }
  }

  /* =========================================================
     REFRESH / RESET TURNSTILE

     IMPORTANT:
     This function intentionally does NOT clear popupMessage.

     This means:

     setPopupMessage('Thank you!');
     resetTurnstile();

     will keep the success message visible.
  ========================================================= */

  function resetTurnstile() {
    /*
     * Remove current token.
     */
    setCaptchaToken('');

    /*
     * Reset status.
     */
    setCaptchaStatus('loading');

    /*
     * Show refresh state.
     */
    setIsRefreshingCaptcha(true);

    /*
     * IMPORTANT:
     * Do NOT call setPopupMessage(null) here.
     */

    if (window.turnstile && turnstileWidgetIdRef.current) {
      try {
        window.turnstile.reset(turnstileWidgetIdRef.current);

        /*
         * Give Turnstile a moment to reset.
         */
        window.setTimeout(() => {
          setCaptchaStatus('ready');

          setIsRefreshingCaptcha(false);
        }, 250);
      } catch {
        setCaptchaStatus('error');

        setIsRefreshingCaptcha(false);

        setPopupMessage('Unable to refresh CAPTCHA. Please try again.');
      }
    } else {
      setCaptchaStatus('error');

      setIsRefreshingCaptcha(false);

      setPopupMessage('CAPTCHA is not available. Please refresh the page.');
    }
  }

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = fullName.trim();

    const trimmedEmail = email.trim();

    const trimmedPhone = phone.trim();

    const trimmedService = service.trim();

    const trimmedMessage = message.trim();

    /* =======================================================
       FORM VALIDATION
    ======================================================= */

    if (!trimmedName) {
      setPopupMessage('Please enter your full name.');

      return;
    }

    if (!trimmedEmail) {
      setPopupMessage('Please enter your email address.');

      return;
    }

    if (!trimmedPhone) {
      setPopupMessage('Please enter your phone number.');

      return;
    }

    if (!trimmedService) {
      setPopupMessage('Please select a service.');

      return;
    }

    if (!trimmedMessage) {
      setPopupMessage('Please enter your message.');

      return;
    }

    /* =======================================================
       CLOUDFLARE TURNSTILE VALIDATION
    ======================================================= */

    if (!captchaToken) {
      setPopupMessage('Please complete the CAPTCHA verification.');

      return;
    }

    /* =======================================================
       SUBMIT
    ======================================================= */

    setIsSubmitting(true);

    setPopupMessage(null);

    try {
      /*
       * Send contact form data together with
       * the real Cloudflare Turnstile token.
       */
      await submitWebsiteContact({
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        service: trimmedService,
        message: trimmedMessage,
        captchaToken,
      });

      /* =====================================================
         SUCCESS
      ===================================================== */

      setPopupMessage('Thank you! Your message has been received.');

      /* =====================================================
         CLEAR FORM
      ===================================================== */

      setFullName('');

      setEmail('');

      setPhone('');

      setService('');

      setMessage('');

      /* =====================================================
         RESET CAPTCHA

         resetTurnstile() intentionally does not clear
         popupMessage, so the success message remains.
      ===================================================== */

      resetTurnstile();
    } catch (error) {
      /*
       * Show API/backend error.
       */
      setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');

      /*
       * Turnstile tokens are single-use.
       *
       * Always create a fresh token after a failed
       * submission.
       *
       * resetTurnstile() does not clear the error message.
       */
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="contact-section" id="contact-section">
      <div className="contact-container">
        {/* ===================================================
            LEFT SIDE - MAP
        ==================================================== */}

        <div className="contact-map-area">
          <div className="contact-map">
            <Image
              src="/assets/map3.png"
              alt="Global Map"
              width={700}
              height={500}
              className="contact-map-img"
              priority
            />

            {/* INDIA */}

            <span className="map-dot dot-1" aria-hidden="true" />

            <span className="map-label label-1">India</span>

            {/* DUBAI */}

            <span className="map-dot dot-2" aria-hidden="true" />

            <span className="map-label label-2">Dubai</span>

            {/* SINGAPORE */}

            <span className="map-dot dot-3" aria-hidden="true" />

            <span className="map-label label-3">Singapore</span>
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE - CONTACT FORM
        ==================================================== */}

        <div className="contact-form-area">
          <div className="contact-header-row">
            <div className="contact-badge">⬢ GET IN TOUCH</div>

            {popupMessage && (
              <div className="contact-popup" role="status" aria-live="polite">
                <span className="contact-popup-dot" aria-hidden="true" />

                <p>{popupMessage}</p>

                <button
                  type="button"
                  onClick={() => setPopupMessage(null)}
                  aria-label="Close message"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* =================================================
                INPUT GRID
            ================================================== */}

            <div className="contact-grid">
              {/* FULL NAME */}

              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={fullName}
                required
                pattern="^[A-Za-z\s]+$"
                title="Only alphabets are allowed"
                autoComplete="name"
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(event) => setFullName(event.target.value)}
              />

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={email}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />

              {/* PHONE */}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={phone}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                autoComplete="tel"
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(/[^0-9]/g, '');
                }}
                onChange={(event) => setPhone(event.target.value)}
              />

              {/* SERVICE */}

              <select
                name="service"
                required
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="" disabled>
                  Select a Service *
                </option>

                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* =================================================
                MESSAGE
            ================================================== */}

            <textarea
              name="message"
              rows={6}
              placeholder="Your Message *"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            {/* =================================================
                CUSTOM CLOUDFLARE CAPTCHA
            ================================================== */}

            <div className="contact-captcha">
              <label className="captcha-title">CAPTCHA *</label>

              <div
                className={`custom-captcha ${
                  captchaStatus === 'verified' ? 'custom-captcha-verified' : ''
                } ${captchaStatus === 'error' ? 'custom-captcha-error' : ''}`}
              >
                {/* CHECK / SHIELD ICON */}

                <div
                  className={`captcha-check ${
                    captchaStatus === 'verified' ? 'captcha-check-success' : ''
                  } ${captchaStatus === 'verifying' ? 'captcha-check-loading' : ''}`}
                >
                  {captchaStatus === 'verified' ? (
                    <ShieldCheck size={22} />
                  ) : captchaStatus === 'verifying' ? (
                    <RefreshCw size={20} className="captcha-spin" />
                  ) : (
                    <span />
                  )}
                </div>

                {/* TEXT */}

                <div className="captcha-content">
                  <strong>
                    {captchaStatus === 'verified'
                      ? 'Verification successful'
                      : captchaStatus === 'verifying'
                        ? 'Verifying...'
                        : captchaStatus === 'error'
                          ? 'Verification failed'
                          : 'Verify you are human'}
                  </strong>

                  <small>
                    {captchaStatus === 'verified'
                      ? 'You can now submit the form.'
                      : captchaStatus === 'verifying'
                        ? 'Cloudflare is checking your request.'
                        : captchaStatus === 'error'
                          ? 'Please try again.'
                          : !isFormComplete
                            ? 'Complete all fields above first.'
                            : 'Click to complete the security check.'}
                  </small>
                </div>

                {/* =================================================
                    I'M HUMAN BUTTON
                ================================================== */}

                {captchaStatus !== 'verified' && (
                  <button
                    type="button"
                    className="captcha-verify-button"
                    onClick={startCaptchaVerification}
                    disabled={
                      !isFormComplete ||
                      captchaStatus === 'loading' ||
                      captchaStatus === 'verifying' ||
                      isRefreshingCaptcha ||
                      isSubmitting
                    }
                    title={
                      !isFormComplete
                        ? 'Complete all required fields first'
                        : 'Verify you are human'
                    }
                  >
                    {captchaStatus === 'loading'
                      ? 'Loading...'
                      : captchaStatus === 'verifying'
                        ? 'Checking...'
                        : 'I’m human'}
                  </button>
                )}

                {/* =================================================
                    REFRESH BUTTON
                ================================================== */}

                {captchaStatus === 'verified' && (
                  <button
                    type="button"
                    className="captcha-refresh-icon-button"
                    onClick={resetTurnstile}
                    disabled={isRefreshingCaptcha || isSubmitting}
                    aria-label="Refresh CAPTCHA"
                  >
                    <RefreshCw size={18} className={isRefreshingCaptcha ? 'captcha-spin' : ''} />
                  </button>
                )}
              </div>

              {/* =================================================
                  INVISIBLE TURNSTILE
              ================================================== */}

              <div ref={turnstileContainerRef} className="turnstile-invisible" aria-hidden="true" />
            </div>

            {/* =================================================
                SUBMIT BUTTON
            ================================================== */}

            <button
              type="submit"
              className="contact-btn"
              disabled={isSubmitting || !isFormComplete || !captchaToken}
            >
              <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>

              <span className="contact-btn-icon">
                <ArrowUpRight size={18} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
