// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const COOKIE_NAME = 'cm_cookie_preferences';

// const DEFAULT_PREFERENCES = {
//   essential: true,
//   analytics: false,
// };

// type CookiePreferences = typeof DEFAULT_PREFERENCES;

// function parsePreferences(value: string | null): CookiePreferences | null {
//   if (!value) return null;

//   try {
//     return JSON.parse(decodeURIComponent(value));
//   } catch {
//     return null;
//   }
// }

// function getStoredPreferences(): CookiePreferences | null {
//   const cookieMatch = document.cookie.match(
//     new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
//   );

//   return cookieMatch ? parsePreferences(cookieMatch[1]) : null;
// }

// function setPreferencesCookie(preferences: CookiePreferences) {
//   const value = encodeURIComponent(JSON.stringify(preferences));

//   document.cookie = [
//     `${COOKIE_NAME}=${value}`,
//     'path=/',
//     `max-age=${60 * 60 * 24 * 365}`,
//     'SameSite=Lax',
//   ].join('; ');
// }

// export default function CookieConsent() {
//   const [visible, setVisible] = useState(false);
//   const [preferences, setPreferences] =
//     useState<CookiePreferences>(DEFAULT_PREFERENCES);

//   useEffect(() => {
//     const stored = getStoredPreferences();

//     if (stored) {
//       setPreferences({
//         essential: true,
//         analytics: Boolean(stored.analytics),
//       });

//       setVisible(false);
//       return;
//     }

//     setVisible(window.location.pathname !== '/cookie-preferences');
//   }, []);

//   const savePreferences = (nextPreferences: CookiePreferences) => {
//     setPreferences(nextPreferences);
//     setPreferencesCookie(nextPreferences);
//     setVisible(false);
//   };

//   const acceptAll = () => {
//     savePreferences({
//       essential: true,
//       analytics: true,
//     });
//   };

//   const essentialOnly = () => {
//     savePreferences({
//       essential: true,
//       analytics: false,
//     });
//   };

//   if (!visible) {
//     return null;
//   }

//   return (
//     <div className="cookie-banner">
//       <div className="cookie-banner__content">

//         {/* Text / Content */}
//         <div className="cookie-banner__text">
//           <p>
//             We use cookies to enhance your browsing experience, personalize
//             your content, and understand site performance.
//           </p>

//           <p className="cookie-banner__description">
//             Click <strong>Accept all</strong> to agree to cookies that help us
//             deliver better content and a smoother browsing experience.
//             <span className="cookie-banner__policy-cta">
//               View our Cookie Policy
//             </span>
//             to update or disable preferences anytime.
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="cookie-banner__actions">

//           <button
//             type="button"
//             className="cookie-button cookie-button--primary"
//             onClick={acceptAll}
//           >
//             Accept all
//           </button>

//           <button
//             type="button"
//             className="cookie-button cookie-button--outline"
//             onClick={essentialOnly}
//           >
//             Essential only
//           </button>

//           <Link
//             href="/cookie-preferences"
//             className="cookie-button cookie-button--ghost"
//           >
//             <span className="cookie-button__icon">⚙</span>
//             Customize
//           </Link>

//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { trackCookieConsent } from '@/services/analytics.service';
import Link from 'next/link';

const COOKIE_NAME = 'cm_cookie_preferences';

const DEFAULT_PREFERENCES = {
  essential: true,
  analytics: true,
};

type CookiePreferences = typeof DEFAULT_PREFERENCES;

function parsePreferences(value: string | null | undefined): CookiePreferences | null {
  if (!value) return null;

  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}

function getStoredPreferences(): CookiePreferences | null {
  const cookieMatch = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));

  return cookieMatch ? parsePreferences(cookieMatch[1]) : null;
}

function setPreferencesCookie(preferences: CookiePreferences) {
  const value = encodeURIComponent(JSON.stringify(preferences));

  document.cookie = [
    `${COOKIE_NAME}=${value}`,
    'path=/',
    `max-age=${60 * 60 * 24 * 365}`,
    'SameSite=Lax',
  ].join('; ');
}

export default function CookieConsent() {
  const router = useRouter();
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Never show cookie banner on preferences page
    if (pathname === '/cookie-preferences') {
      setVisible(false);
      return;
    }

    const stored = getStoredPreferences();

    if (stored) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [pathname]);

  const savePreferences = (preferences: CookiePreferences) => {
    setPreferencesCookie(preferences);
    setVisible(false);
  };

  const acceptAll = () => {
    const preferences = {
      essential: true,
      analytics: true,
    };
    savePreferences(preferences);
    void trackCookieConsent(preferences.analytics, 'banner').catch(() => undefined);
  };

  const essentialOnly = () => {
    const preferences = {
      essential: true,
      analytics: false,
    };
    savePreferences(preferences);
    void trackCookieConsent(preferences.analytics, 'banner').catch(() => undefined);
  };

  const openCustomize = () => {
    // Hide banner FIRST
    setVisible(false);

    // Then navigate to preferences
    router.push('/cookie-preferences');
  };

  // Do not render anything on cookie preferences page
  if (!visible || pathname === '/cookie-preferences') {
    return null;
  }

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        {/* LEFT CONTENT */}
        <div className="cookie-banner__text">
          <p className="cookie-banner__message">
            We use cookies to enhance your browsing experience, personalize your content, and
            understand site performance.
          </p>

          {/* <p className="cookie-banner__description">
            Click <strong>Accept all</strong> to agree to cookies that help us deliver better
            content and a smoother browsing experience.
            <span className="cookie-banner__policy-cta">View our Cookie Policy</span>
             to update or disable preferences anytime.
          </p> */}

          <p className="cookie-banner__description">
            Click <strong>Accept all</strong> to agree to cookies that help us deliver better
            content and a smoother browsing experience.
            <Link href="/cookie-policy" className="cookie-banner__policy-cta">
              View our Cookie Policy
            </Link>{' '}
            to update or disable preferences anytime.
          </p>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="cookie-banner__actions">
          <button
            type="button"
            className="cookie-button cookie-button--primary"
            onClick={acceptAll}
          >
            Accept all
          </button>

          <button
            type="button"
            className="cookie-button cookie-button--outline"
            onClick={essentialOnly}
          >
            Essential only
          </button>

          <button
            type="button"
            className="cookie-button cookie-button--ghost"
            onClick={openCustomize}
          >
            <span className="cookie-button__icon">⚙</span>
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}
