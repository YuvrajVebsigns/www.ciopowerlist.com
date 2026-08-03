import { API_ENDPOINTS } from '@/constants/api';
import { apiFetch } from '@/services/apiFetch';
import { buildWebsiteAuthHeaders, ensureWebsiteAuth, getWebsiteDomain } from '@/lib/website-auth';

export interface CookieConsentPayload {
  eventType: string;
  pageUrl: string;
  pageTitle: string;
  referrer: string;
  userAgent: string;
  visitorId: string;
  sessionId: string;
  metadata: {
    analyticsEnabled: boolean;
    consentSource: 'banner' | 'preferences';
  };
}

function createId(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getVisitorId() {
  if (typeof window === 'undefined') return '';
  const storageKey = 'cm_visitor_id';
  let visitorId = window.localStorage.getItem(storageKey);

  if (!visitorId) {
    visitorId = createId(40);
    window.localStorage.setItem(storageKey, visitorId);
  }

  return visitorId;
}

function getSessionId() {
  if (typeof window === 'undefined') return '';
  const storageKey = 'cm_session_id';
  let sessionId = window.sessionStorage.getItem(storageKey);

  if (!sessionId) {
    sessionId = createId(40);
    window.sessionStorage.setItem(storageKey, sessionId);
  }

  return sessionId;
}

export async function trackCookieConsent(
  analyticsEnabled: boolean,
  source: 'banner' | 'preferences',
) {
  const domain = getWebsiteDomain();
  const auth = await ensureWebsiteAuth(domain);
  const headers = {
    ...buildWebsiteAuthHeaders(auth),
    'x-website-domain': domain,
  };

  const payload: CookieConsentPayload = {
    eventType: 'cookie_consent',
    pageUrl: window.location.href,
    pageTitle: document.title,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    metadata: {
      analyticsEnabled,
      consentSource: source,
    },
  };

  return apiFetch<{ success: boolean; message?: string }>(API_ENDPOINTS.WEBSITE.ANALYTICS_TRACK, {
    requireAuth: false,
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}
