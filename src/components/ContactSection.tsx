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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>('loading');
  const [isRefreshingCaptcha, setIsRefreshingCaptcha] = useState(false);

  const [hasAttemptedCaptcha, setHasAttemptedCaptcha] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const captchaAttemptRef = useRef(false);
  const captchaErrorShownRef = useRef(false);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_SITEKEY?.trim() || '';

  const isFormComplete =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    service.trim().length > 0 &&
    message.trim().length > 0;

  // Initialize Cloudflare Turnstile without displaying a failure
  // message merely because initialization has not completed.
  useEffect(() => {
    let cancelled = false;

    if (!turnstileSiteKey) {
      setCaptchaStatus('error');
      return;
    }

    const initializeTurnstile = () => {
      if (cancelled) return;

      if (!window.turnstile || !turnstileContainerRef.current) {
        setCaptchaStatus('error');
        return;
      }

      if (turnstileWidgetIdRef.current) return;

      try {
        const widgetId = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey,
          size: 'invisible',
          execution: 'execute',
          theme: 'light',

          callback: (token: string) => {
            if (cancelled) return;

            setCaptchaToken(token);
            setCaptchaStatus('verified');
            setIsRefreshingCaptcha(false);
            setHasAttemptedCaptcha(false);

            captchaAttemptRef.current = false;
            captchaErrorShownRef.current = false;

            setPopupMessage(null);
          },

          'expired-callback': () => {
            if (cancelled) return;

            setCaptchaToken('');
            setCaptchaStatus('ready');
            setIsRefreshingCaptcha(false);
            setHasAttemptedCaptcha(false);

            captchaAttemptRef.current = false;
          },

          'error-callback': (errorCode) => {
            if (cancelled) return;

            setCaptchaToken('');
            setCaptchaStatus('error');
            setIsRefreshingCaptcha(false);

            // Show a popup only after the user starts verification.
            if (captchaAttemptRef.current && !captchaErrorShownRef.current) {
              captchaErrorShownRef.current = true;

              setPopupMessage(
                errorCode === '110200'
                  ? 'CAPTCHA domain is not authorized in Cloudflare. Please check your Turnstile hostname settings.'
                  : 'CAPTCHA verification failed. Please try again.',
              );
            }

            captchaAttemptRef.current = false;
          },

          'timeout-callback': () => {
            if (cancelled) return;

            setCaptchaToken('');
            setCaptchaStatus('ready');
            setIsRefreshingCaptcha(false);

            if (captchaAttemptRef.current && !captchaErrorShownRef.current) {
              captchaErrorShownRef.current = true;
              setPopupMessage('CAPTCHA verification timed out. Please try again.');
            }

            captchaAttemptRef.current = false;
          },
        });

        if (cancelled) {
          try {
            window.turnstile.remove(widgetId);
          } catch {
            // Ignore cleanup errors.
          }
          return;
        }

        turnstileWidgetIdRef.current = widgetId;
        setCaptchaStatus('ready');
      } catch {
        setCaptchaStatus('error');
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-cloudflare-turnstile="true"]',
    );

    const handleScriptError = () => {
      if (!cancelled) {
        setCaptchaStatus('error');
      }
    };

    if (existingScript) {
      if (window.turnstile) {
        initializeTurnstile();
      } else {
        existingScript.addEventListener('load', initializeTurnstile);
        existingScript.addEventListener('error', handleScriptError);
      }

      return () => {
        cancelled = true;
        existingScript.removeEventListener('load', initializeTurnstile);
        existingScript.removeEventListener('error', handleScriptError);
      };
    }

    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-cloudflare-turnstile', 'true');

    script.addEventListener('load', initializeTurnstile);
    script.addEventListener('error', handleScriptError);

    document.head.appendChild(script);

    return () => {
      cancelled = true;
      script.removeEventListener('load', initializeTurnstile);
      script.removeEventListener('error', handleScriptError);
    };
  }, [turnstileSiteKey]);

  // Remove the widget when this component unmounts.
  useEffect(() => {
    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // Ignore cleanup errors.
        }
      }

      turnstileWidgetIdRef.current = null;
    };
  }, []);

  // Automatically close popup messages after 2.5 seconds.
  useEffect(() => {
    if (!popupMessage) return;

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [popupMessage]);

  function startCaptchaVerification() {
    if (isSubmitting || captchaStatus === 'verifying') return;

    if (!isFormComplete) {
      setPopupMessage('Please complete all required fields before CAPTCHA verification.');
      return;
    }

    // From this point, the user has explicitly attempted verification.
    setHasAttemptedCaptcha(true);

    if (!window.turnstile || !turnstileWidgetIdRef.current) {
      setCaptchaStatus('error');
      setPopupMessage('CAPTCHA is not ready. Please refresh the page and try again.');
      return;
    }

    if (captchaToken) return;

    try {
      captchaAttemptRef.current = true;
      captchaErrorShownRef.current = false;

      setCaptchaStatus('verifying');
      setIsRefreshingCaptcha(false);
      setPopupMessage(null);

      window.turnstile.execute(turnstileWidgetIdRef.current);
    } catch {
      setCaptchaStatus('error');
      setIsRefreshingCaptcha(false);

      if (!captchaErrorShownRef.current) {
        captchaErrorShownRef.current = true;
        setPopupMessage('Unable to start CAPTCHA verification. Please try again.');
      }

      captchaAttemptRef.current = false;
    }
  }

  function resetTurnstile() {
    setCaptchaToken('');
    setCaptchaStatus('loading');
    setIsRefreshingCaptcha(true);
    setHasAttemptedCaptcha(false);

    captchaAttemptRef.current = false;
    captchaErrorShownRef.current = false;

    if (window.turnstile && turnstileWidgetIdRef.current) {
      try {
        window.turnstile.reset(turnstileWidgetIdRef.current);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedService = service.trim();
    const trimmedMessage = message.trim();

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

    if (!captchaToken) {
      setPopupMessage('Please complete the CAPTCHA verification.');
      return;
    }

    setIsSubmitting(true);
    setPopupMessage(null);

    try {
      await submitWebsiteContact({
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        service: trimmedService,
        message: trimmedMessage,
        captchaToken,
      });

      setPopupMessage('Thank you! Your message has been received.');

      setFullName('');
      setEmail('');
      setPhone('');
      setService('');
      setMessage('');

      resetTurnstile();
    } catch (error) {
      setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');

      // Turnstile tokens are single-use. Request a fresh token.
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  const showCaptchaError = captchaStatus === 'error' && hasAttemptedCaptcha;

  return (
    <section className="contact-section" id="contact-section">
      <div className="contact-container">
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

            <span className="map-dot dot-1" aria-hidden="true" />
            <span className="map-label label-1">India</span>

            <span className="map-dot dot-2" aria-hidden="true" />
            <span className="map-label label-2">Dubai</span>

            <span className="map-dot dot-3" aria-hidden="true" />
            <span className="map-label label-3">Singapore</span>
          </div>
        </div>

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

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-grid">
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

            <textarea
              name="message"
              rows={6}
              placeholder="Your Message *"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            <div className="contact-captcha">
              <label className="captcha-title">CAPTCHA *</label>

              <div
                className={`custom-captcha ${
                  captchaStatus === 'verified' ? 'custom-captcha-verified' : ''
                } ${showCaptchaError ? 'custom-captcha-error' : ''}`}
              >
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

                <div className="captcha-content">
                  <strong>
                    {captchaStatus === 'verified'
                      ? 'Verification successful'
                      : captchaStatus === 'verifying'
                        ? 'Verifying...'
                        : showCaptchaError
                          ? 'Verification failed'
                          : 'Verify you are human'}
                  </strong>

                  <small>
                    {captchaStatus === 'verified'
                      ? 'You can now submit the form.'
                      : captchaStatus === 'verifying'
                        ? 'Checking your request.'
                        : showCaptchaError
                          ? 'Please try again.'
                          : !isFormComplete
                            ? 'Complete all fields above first.'
                            : 'Click to complete the security check.'}
                  </small>
                </div>

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

              <div ref={turnstileContainerRef} className="turnstile-invisible" aria-hidden="true" />
            </div>

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
