'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackCookieConsent } from '@/services/analytics.service';

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

export default function CookiePreferencesPage() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const stored = getStoredPreferences();

    setAnalyticsEnabled(stored ? Boolean(stored.analytics) : DEFAULT_PREFERENCES.analytics);
  }, []);

  const toggleAnalytics = () => {
    setAnalyticsEnabled((current) => !current);
  };

  const handleSave = () => {
    const preferences = {
      essential: true,
      analytics: analyticsEnabled,
    };

    setPreferencesCookie(preferences);
    setFeedbackMessage('Your cookie preferences have been saved.');
    void trackCookieConsent(preferences.analytics, 'preferences').catch(() => undefined);
  };

  return (
    <main className="cookie-page-shell">
      <div className="cookie-page-card">
        {/* HEADER */}
        <div className="cookie-card-header">
          <div className="cookie-card-badge">COOKIE PREFERENCES</div>

          <h1>Customize your cookie settings</h1>
        </div>

        {/* ESSENTIAL */}
        <section className="cookie-card-section">
          <div className="cookie-card-heading">
            <div className="cookie-card-info">
              <h2>Essential Cookies</h2>

              <p>Required for the website to function properly.</p>
            </div>

            <span className="cookie-chip">Always Active</span>
          </div>
        </section>

        {/* ANALYTICS */}
        <section className="cookie-card-section">
          <div className="cookie-card-heading">
            <div className="cookie-card-info">
              <h2>Analytics &amp; Performance Cookies</h2>

              <p>Help us understand visitor usage and optimize site performance.</p>
            </div>

            <button
              type="button"
              className={`cookie-toggle ${analyticsEnabled ? 'active' : 'inactive'}`}
              onClick={toggleAnalytics}
              aria-label={
                analyticsEnabled ? 'Disable analytics cookies' : 'Enable analytics cookies'
              }
            >
              {analyticsEnabled ? (
                <span className="cookie-toggle-check">✓</span>
              ) : (
                <span className="cookie-toggle-mark">✕</span>
              )}
            </button>
          </div>
        </section>

        {/* SUCCESS MESSAGE */}
        {feedbackMessage && <div className="cookie-feedback">{feedbackMessage}</div>}

        {/* ACTIONS */}
        <div className="cookie-card-actions">
          <Link href="/" className="cookie-preferences-cancel">
            Cancel
          </Link>

          <button type="button" className="cookie-save-button" onClick={handleSave}>
            Save Preferences
          </button>
        </div>
      </div>
    </main>
  );
}
