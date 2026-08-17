// import { API_ENDPOINTS } from '@/constants/api';
// import { getWebsiteDomain } from '@/lib/website-auth';
// import { apiFetch } from '@/services/apiFetch';

// type WebsiteAuth = {
//   token: string;
//   websiteId: string;
// };

// type WebsiteTokenResponse = {
//   token?: string;
//   websiteId?: string;
//   id?: string;
//   website?: {
//     id?: string;
//     token?: string;
//   };
//   data?: {
//     token?: string;
//     websiteId?: string;
//     id?: string;
//     website?: {
//       id?: string;
//       token?: string;
//     };
//     data?: {
//       token?: string;
//       websiteId?: string;
//       id?: string;
//       website?: {
//         id?: string;
//         token?: string;
//       };
//     };
//   };
// };

// export type ContactSubmission = {
//   fullName: string;
//   email: string;
//   phone: string;
//   service: string;
//   message: string;
// };

// type ContactResponse = {
//   message?: string;
//   data?: unknown;
// };

// function readStoredWebsiteAuth(): WebsiteAuth | null {
//   if (typeof window === 'undefined') return null;

//   const raw = window.localStorage.getItem('websiteAuth');
//   if (!raw) return null;

//   try {
//     const parsed: unknown = JSON.parse(raw);

//     if (
//       typeof parsed === 'object' &&
//       parsed !== null &&
//       'token' in parsed &&
//       'websiteId' in parsed &&
//       typeof (parsed as { token?: unknown }).token === 'string' &&
//       typeof (parsed as { websiteId?: unknown }).websiteId === 'string'
//     ) {
//       return {
//         token: (parsed as { token: string }).token,
//         websiteId: (parsed as { websiteId: string }).websiteId,
//       };
//     }
//   } catch {
//     return null;
//   }

//   return null;
// }

// function extractWebsiteToken(response: WebsiteTokenResponse) {
//   return (
//     response.token ??
//     response.data?.token ??
//     response.data?.data?.token ??
//     response.data?.website?.token ??
//     response.data?.data?.website?.token ??
//     response.website?.token ??
//     null
//   );
// }

// function extractWebsiteId(response: WebsiteTokenResponse) {
//   return (
//     response.websiteId ??
//     response.website?.id ??
//     response.data?.website?.id ??
//     response.data?.websiteId ??
//     response.data?.data?.websiteId ??
//     response.data?.data?.website?.id ??
//     response.data?.data?.id ??
//     response.data?.id ??
//     response.id ??
//     null
//   );
// }

// async function ensureWebsiteAuth(domain: string) {
//   if (typeof window === 'undefined') return null;

//   const stored = readStoredWebsiteAuth();
//   if (stored) return stored;

//   const tokenRes = await apiFetch<WebsiteTokenResponse>(
//     `/api/v1/website/token?domain=${encodeURIComponent(domain)}`,
//     {
//       method: 'POST',
//       requireAuth: false,
//       headers: {
//         'Content-Type': 'application/json',
//         'x-website-domain': domain,
//       },
//       body: JSON.stringify({ domain }),
//     },
//   );

//   const token = extractWebsiteToken(tokenRes);
//   const websiteId = extractWebsiteId(tokenRes);

//   if (token && websiteId) {
//     const value: WebsiteAuth = { token, websiteId };
//     window.localStorage.setItem('websiteAuth', JSON.stringify(value));
//     return value;
//   }

//   return null;
// }

// function getApiErrorStatus(error: unknown) {
//   if (typeof error === 'object' && error !== null && 'statusCode' in error) {
//     const statusCode = (error as { statusCode?: unknown }).statusCode;
//     return typeof statusCode === 'number' ? statusCode : Number(statusCode);
//   }

//   if (typeof error === 'object' && error !== null && 'status' in error) {
//     const status = (error as { status?: unknown }).status;
//     return typeof status === 'number' ? status : Number(status);
//   }

//   return undefined;
// }

// export async function submitWebsiteContact(payload: ContactSubmission) {
//   const domain = getWebsiteDomain();
//   const auth = await ensureWebsiteAuth(domain);

//   const headers: Record<string, string> = {};
//   if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
//   if (auth?.websiteId) headers['x-website-id'] = auth.websiteId;
//   headers['x-website-domain'] = domain;

//   try {
//     const response = await apiFetch<ContactResponse>(API_ENDPOINTS.WEBSITE.CONTACTS, {
//       method: 'POST',
//       requireAuth: false,
//       headers,
//       body: JSON.stringify(payload),
//     });

//     return response;
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     if (statusCode === 401 && typeof window !== 'undefined') {
//       window.localStorage.removeItem('websiteAuth');

//       const freshAuth = await ensureWebsiteAuth(domain);

//       if (freshAuth?.token) {
//         const retryHeaders: Record<string, string> = {
//           Authorization: `Bearer ${freshAuth.token}`,
//           'x-website-id': freshAuth.websiteId,
//           'x-website-domain': domain,
//         };

//         return apiFetch<ContactResponse>(API_ENDPOINTS.WEBSITE.CONTACTS, {
//           method: 'POST',
//           requireAuth: false,
//           headers: retryHeaders,
//           body: JSON.stringify(payload),
//         });
//       }
//     }

//     throw error;
//   }
// }

import { API_ENDPOINTS } from '@/constants/api';
import { getWebsiteDomain } from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

type WebsiteAuth = {
  token: string;
  websiteId: string;
};

type WebsiteTokenResponse = {
  token?: string;
  websiteId?: string;
  id?: string;

  website?: {
    id?: string;
    token?: string;
  };

  data?: {
    token?: string;
    websiteId?: string;
    id?: string;

    website?: {
      id?: string;
      token?: string;
    };

    data?: {
      token?: string;
      websiteId?: string;
      id?: string;

      website?: {
        id?: string;
        token?: string;
      };
    };
  };
};

/**
 * Payload sent to the backend contact API.
 *
 * captchaToken MUST be the unique token generated
 * by Cloudflare Turnstile.
 *
 * DO NOT hardcode a CAPTCHA token here.
 */
export type ContactSubmission = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  captchaToken: string;
};

/**
 * Backend contact API response.
 */
export type ContactResponse = {
  success?: boolean;
  message?: string;

  data?: {
    fullName?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;

    websiteId?: string;

    status?: string;

    captchaToken?: string;
    captchaVerified?: boolean;
    captchaVerifiedAt?: string;

    id?: string;
  };
};

/**
 * Read website authentication details from localStorage.
 */
function readStoredWebsiteAuth(): WebsiteAuth | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem('websiteAuth');

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'token' in parsed &&
      'websiteId' in parsed &&
      typeof (parsed as { token?: unknown }).token === 'string' &&
      typeof (parsed as { websiteId?: unknown }).websiteId === 'string'
    ) {
      return {
        token: (parsed as { token: string }).token,
        websiteId: (parsed as { websiteId: string }).websiteId,
      };
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Extract website token from different possible backend response structures.
 */
function extractWebsiteToken(response: WebsiteTokenResponse): string | null {
  return (
    response.token ??
    response.data?.token ??
    response.data?.data?.token ??
    response.data?.website?.token ??
    response.data?.data?.website?.token ??
    response.website?.token ??
    null
  );
}

/**
 * Extract website ID from different possible backend response structures.
 */
function extractWebsiteId(response: WebsiteTokenResponse): string | null {
  return (
    response.websiteId ??
    response.website?.id ??
    response.data?.website?.id ??
    response.data?.websiteId ??
    response.data?.data?.websiteId ??
    response.data?.data?.website?.id ??
    response.data?.data?.id ??
    response.data?.id ??
    response.id ??
    null
  );
}

/**
 * Get website authentication token and website ID.
 */
async function ensureWebsiteAuth(domain: string): Promise<WebsiteAuth | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = readStoredWebsiteAuth();

  if (stored) {
    return stored;
  }

  const tokenRes = await apiFetch<WebsiteTokenResponse>(
    `/api/v1/website/token?domain=${encodeURIComponent(domain)}`,
    {
      method: 'POST',
      requireAuth: false,

      headers: {
        'Content-Type': 'application/json',
        'x-website-domain': domain,
      },

      body: JSON.stringify({
        domain,
      }),
    },
  );

  const token = extractWebsiteToken(tokenRes);
  const websiteId = extractWebsiteId(tokenRes);

  if (!token || !websiteId) {
    return null;
  }

  const value: WebsiteAuth = {
    token,
    websiteId,
  };

  window.localStorage.setItem('websiteAuth', JSON.stringify(value));

  return value;
}

/**
 * Extract HTTP status from API error.
 */
function getApiErrorStatus(error: unknown): number | undefined {
  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    const statusCode = (
      error as {
        statusCode?: unknown;
      }
    ).statusCode;

    return typeof statusCode === 'number' ? statusCode : Number(statusCode);
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (
      error as {
        status?: unknown;
      }
    ).status;

    return typeof status === 'number' ? status : Number(status);
  }

  return undefined;
}

/**
 * Submit contact form.
 *
 * Backend endpoint:
 *
 * POST /api/v1/website/contacts
 *
 * Payload:
 *
 * {
 *   fullName,
 *   email,
 *   phone,
 *   service,
 *   message,
 *   captchaToken
 * }
 *
 * captchaToken is the unique token generated
 * by Cloudflare Turnstile on the frontend.
 */
export async function submitWebsiteContact(payload: ContactSubmission): Promise<ContactResponse> {
  const domain = getWebsiteDomain();

  const auth = await ensureWebsiteAuth(domain);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }

  if (auth?.websiteId) {
    headers['x-website-id'] = auth.websiteId;
  }

  /**
   * Build the exact payload expected by the backend.
   *
   * IMPORTANT:
   * captchaToken comes directly from the
   * Cloudflare Turnstile callback.
   */
  const contactPayload: ContactSubmission = {
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    service: payload.service.trim(),
    message: payload.message.trim(),
    captchaToken: payload.captchaToken.trim(),
  };

  try {
    const response = await apiFetch<ContactResponse>(API_ENDPOINTS.WEBSITE.CONTACTS, {
      method: 'POST',
      requireAuth: false,
      headers,
      body: JSON.stringify(contactPayload),
    });

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    /**
     * If website authentication expired,
     * remove old credentials and request fresh credentials.
     */
    if (statusCode === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('websiteAuth');

      const freshAuth = await ensureWebsiteAuth(domain);

      if (freshAuth?.token) {
        const retryHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${freshAuth.token}`,
          'x-website-id': freshAuth.websiteId,
        };

        return apiFetch<ContactResponse>(API_ENDPOINTS.WEBSITE.CONTACTS, {
          method: 'POST',
          requireAuth: false,
          headers: retryHeaders,
          body: JSON.stringify(contactPayload),
        });
      }
    }

    throw error;
  }
}
