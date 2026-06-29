// import { API_ENDPOINTS } from '@/constants/api';
// import {
//   buildWebsiteAuthHeaders,
//   ensureWebsiteAuth as obtainWebsiteAuth,
//   getWebsiteDomain,
// } from '@/lib/website-auth';
// import type { WebsiteAuth } from '@/lib/website-auth';
// import { apiFetch } from '@/services/apiFetch';

// export type WebsiteEvent = {
//   id: string;
//   title?: string;
//   description?: string;
//   startsAt?: string;
//   [key: string]: unknown;
// };

// type RawEvent = Record<string, unknown>;

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function getRecordValue(source: unknown, key: string): unknown {
//   return isRecord(source) ? source[key] : undefined;
// }

// function getStringValue(value: unknown): string | undefined {
//   return typeof value === 'string' ? value : undefined;
// }

// export function readStoredWebsiteAuth(): WebsiteAuth | null {
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
//       'domain' in parsed &&
//       typeof (parsed as { token?: unknown }).token === 'string' &&
//       typeof (parsed as { websiteId?: unknown }).websiteId === 'string' &&
//       typeof (parsed as { domain?: unknown }).domain === 'string'
//     ) {
//       return {
//         token: (parsed as { token: string }).token,
//         websiteId: (parsed as { websiteId: string }).websiteId,
//         domain: (parsed as { domain: string }).domain,
//       };
//     }
//   } catch {
//     return null;
//   }

//   return null;
// }

// async function ensureWebsiteAuth(domain: string) {
//   if (typeof window === 'undefined') return null;

//   const stored = readStoredWebsiteAuth();
//   if (stored) return stored;

//   const tokenRes = await apiFetch<unknown>(
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

//   const token =
//     getStringValue(getRecordValue(tokenRes, 'token')) ??
//     getStringValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'token')) ??
//     getStringValue(
//       getRecordValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'data'), 'token'),
//     ) ??
//     getStringValue(getRecordValue(getRecordValue(tokenRes, 'website'), 'token')) ??
//     null;

//   const websiteId =
//     getStringValue(getRecordValue(tokenRes, 'websiteId')) ??
//     getStringValue(getRecordValue(getRecordValue(tokenRes, 'website'), 'id')) ??
//     getStringValue(
//       getRecordValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'website'), 'id'),
//     ) ??
//     getStringValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'websiteId')) ??
//     getStringValue(getRecordValue(tokenRes, 'id')) ??
//     null;

//   if (token && websiteId) {
//     const value: WebsiteAuth = { token, websiteId, domain };
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

// export async function fetchWebsiteEvents(websiteId?: string): Promise<WebsiteEvent[]> {
//   const domain = getWebsiteDomain();
//   let auth: WebsiteAuth | null = null;

//   if (!websiteId) {
//     auth = await ensureWebsiteAuth(domain);
//     websiteId = auth?.websiteId ?? undefined;
//   } else {
//     // try to read token for headers if available
//     auth = readStoredWebsiteAuth();
//   }

//   const headers: Record<string, string> = {};
//   if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
//   if (websiteId) headers['x-website-id'] = websiteId;

//   try {
//     const url = websiteId
//       ? `${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?websiteId=${encodeURIComponent(websiteId)}`
//       : API_ENDPOINTS.WEBSITE.EVENTS.BASE;

//     const res = await apiFetch<unknown>(url, {
//       method: 'GET',
//       requireAuth: false,
//       headers,
//     });

//     // Normalize response shapes
//     const items = isRecord(res) ? (res.data ?? res.items ?? res.results ?? []) : (res ?? []);

//     if (!Array.isArray(items)) return [];

//     return (items as RawEvent[]).map((it) => ({
//       id: String(it['id'] ?? it['_id'] ?? it['eventId'] ?? it['uid'] ?? ''),
//       title:
//         (it['title'] as string) ??
//         (it['name'] as string) ??
//         (it['eventName'] as string) ??
//         undefined,
//       description: (it['description'] as string) ?? undefined,
//       startsAt: (it['startsAt'] as string) ?? (it['startDate'] as string) ?? undefined,
//       ...it,
//     }));
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     if (statusCode === 401 && typeof window !== 'undefined') {
//       window.localStorage.removeItem('websiteAuth');

//       const freshAuth = await ensureWebsiteAuth(domain);

//       if (freshAuth?.token) {
//         const retryHeaders: Record<string, string> = {
//           Authorization: `Bearer ${freshAuth.token}`,
//           'x-website-id': freshAuth.websiteId,
//         };

//         const res = await apiFetch<unknown>(
//           `${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?websiteId=${encodeURIComponent(freshAuth.websiteId)}`,
//           {
//             method: 'GET',
//             requireAuth: false,
//             headers: retryHeaders,
//           },
//         );

//         const items = isRecord(res) ? (res.data ?? res.items ?? res.results ?? []) : (res ?? []);
//         if (!Array.isArray(items)) return [];

//         return (items as RawEvent[]).map((it) => ({
//           id: String(it['id'] ?? it['_id'] ?? it['eventId'] ?? it['uid'] ?? ''),
//           title:
//             (it['title'] as string) ??
//             (it['name'] as string) ??
//             (it['eventName'] as string) ??
//             undefined,
//           description: (it['description'] as string) ?? undefined,
//           startsAt: (it['startsAt'] as string) ?? (it['startDate'] as string) ?? undefined,
//           ...it,
//         }));
//       }
//     }

//     throw error;
//   }
// }

// export async function fetchWebsiteEventByIdOrSlug(idOrSlug: string): Promise<WebsiteEvent | null> {
//   const domain = getWebsiteDomain();
//   let auth: WebsiteAuth | null = readStoredWebsiteAuth();

//   if (!auth?.token) {
//     try {
//       auth = await obtainWebsiteAuth(domain);
//     } catch {
//       auth = null;
//     }
//   }

//   const headers: Record<string, string> = auth ? buildWebsiteAuthHeaders(auth) : {};

//   try {
//     const url = API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(encodeURIComponent(idOrSlug));

//     const res = await apiFetch<unknown>(url, {
//       method: 'GET',
//       requireAuth: false,
//       headers,
//     });

//     const data = isRecord(res) ? (res.data ?? res) : null;
//     if (!data) return null;

//     return {
//       id: String(
//         getRecordValue(data, 'id') ??
//           getRecordValue(data, '_id') ??
//           getRecordValue(data, 'slug') ??
//           idOrSlug,
//       ),
//       title:
//         getStringValue(getRecordValue(data, 'title')) ??
//         getStringValue(getRecordValue(data, 'name')) ??
//         getStringValue(getRecordValue(data, 'eventName')) ??
//         undefined,
//       description:
//         getStringValue(getRecordValue(data, 'description')) ??
//         getStringValue(getRecordValue(data, 'summary')) ??
//         undefined,
//       startsAt:
//         getStringValue(getRecordValue(data, 'startsAt')) ??
//         getStringValue(getRecordValue(data, 'startDate')) ??
//         undefined,
//       ...(data as RawEvent),
//     };
//   } catch (error: unknown) {
//     const status = getRecordValue(error, 'status');
//     if ((status === 401 || status === '401') && typeof window !== 'undefined') {
//       window.localStorage.removeItem('websiteAuth');

//       const freshAuth = await ensureWebsiteAuth(domain);
//       if (freshAuth?.token) {
//         const retryHeaders: Record<string, string> = {
//           Authorization: `Bearer ${freshAuth.token}`,
//           'x-website-id': freshAuth.websiteId,
//         };

//         const url = API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(encodeURIComponent(idOrSlug));
//         const res = await apiFetch<unknown>(url, {
//           method: 'GET',
//           requireAuth: false,
//           headers: retryHeaders,
//         });

//         const data = isRecord(res) ? (res.data ?? res) : null;
//         if (!data) return null;
//         return {
//           id: String(
//             getRecordValue(data, 'id') ??
//               getRecordValue(data, '_id') ??
//               getRecordValue(data, 'slug') ??
//               idOrSlug,
//           ),
//           title:
//             getStringValue(getRecordValue(data, 'title')) ??
//             getStringValue(getRecordValue(data, 'name')) ??
//             getStringValue(getRecordValue(data, 'eventName')) ??
//             undefined,
//           description:
//             getStringValue(getRecordValue(data, 'description')) ??
//             getStringValue(getRecordValue(data, 'summary')) ??
//             undefined,
//           startsAt:
//             getStringValue(getRecordValue(data, 'startsAt')) ??
//             getStringValue(getRecordValue(data, 'startDate')) ??
//             undefined,
//           ...(data as RawEvent),
//         };
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

export type WebsiteEventImage = {
  original?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  url?: string;
  urlVariants?: {
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
};

export type WebsiteEvent = {
  id: string;
  slug?: string;
  title?: string;
  name?: string;
  eventName?: string;
  excerpt?: string;
  description?: unknown;
  type?: string;
  category?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  startsAt?: string;
  meetingLink?: string;

  image?: string | WebsiteEventImage;
  heroImage?: string | WebsiteEventImage;
  banner?: string | WebsiteEventImage;
  bannerImage?: string | WebsiteEventImage;
  bannerImageId?: WebsiteEventImage;

  totalRegistrations?: number;
  sponsors?: unknown[];
  agenda?: unknown[];
  websites?: unknown[];

  [key: string]: unknown;
};

export type WebsiteEventsMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type WebsiteEventsApiResponse = {
  success?: boolean;
  message?: string;
  data?: {
    data?: WebsiteEvent[];
    items?: WebsiteEvent[];
    events?: WebsiteEvent[];
    results?: WebsiteEvent[];
    meta?: WebsiteEventsMeta;
  };
};

export type WebsiteEventDetailResponse = {
  success?: boolean;
  message?: string;
  data?: WebsiteEvent;
};

export type FetchWebsiteEventsOptions = {
  page?: number;
  limit?: number;
  search?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getStringValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getNumberValue(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function getApiErrorStatus(error: unknown): number | undefined {
  if (!isRecord(error)) {
    return undefined;
  }

  const statusCode = error.statusCode ?? error.status;

  return getNumberValue(statusCode);
}

/**
 * Blog service ki tarah localStorage se token aur websiteId read karta hai.
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

    if (!isRecord(parsed)) {
      return null;
    }

    const token = getStringValue(parsed.token);
    const websiteId = getStringValue(parsed.websiteId);

    if (!token || !websiteId) {
      return null;
    }

    return {
      token,
      websiteId,
    };
  } catch {
    return null;
  }
}

function extractWebsiteToken(response: unknown): string {
  if (!isRecord(response)) {
    return '';
  }

  const directToken = getStringValue(response.token);

  if (directToken) {
    return directToken;
  }

  const data = isRecord(response.data) ? response.data : null;

  const nestedData = data && isRecord(data.data) ? data.data : null;

  const website = isRecord(response.website) ? response.website : null;

  const dataWebsite = data && isRecord(data.website) ? data.website : null;

  const nestedWebsite = nestedData && isRecord(nestedData.website) ? nestedData.website : null;

  return (
    getStringValue(data?.token) ||
    getStringValue(nestedData?.token) ||
    getStringValue(website?.token) ||
    getStringValue(dataWebsite?.token) ||
    getStringValue(nestedWebsite?.token)
  );
}

function extractWebsiteId(response: unknown): string {
  if (!isRecord(response)) {
    return '';
  }

  const data = isRecord(response.data) ? response.data : null;

  const nestedData = data && isRecord(data.data) ? data.data : null;

  const website = isRecord(response.website) ? response.website : null;

  const dataWebsite = data && isRecord(data.website) ? data.website : null;

  const nestedWebsite = nestedData && isRecord(nestedData.website) ? nestedData.website : null;

  return (
    getStringValue(response.websiteId) ||
    getStringValue(website?.id) ||
    getStringValue(data?.websiteId) ||
    getStringValue(dataWebsite?.id) ||
    getStringValue(nestedData?.websiteId) ||
    getStringValue(nestedWebsite?.id) ||
    getStringValue(data?.id) ||
    getStringValue(nestedData?.id) ||
    getStringValue(response.id)
  );
}

/**
 * Website token obtain karta hai aur websiteAuth mein save karta hai.
 */
async function ensureWebsiteAuth(domain: string): Promise<WebsiteAuth | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = readStoredWebsiteAuth();

  if (stored) {
    return stored;
  }

  const response = await apiFetch<unknown>(
    `/api/v1/website/token?domain=${encodeURIComponent(domain)}`,
    {
      method: 'POST',
      requireAuth: false,
      headers: {
        'Content-Type': 'application/json',
        'x-website-domain': domain,
      },
      body: JSON.stringify({}),
    },
  );

  const token = extractWebsiteToken(response);
  const websiteId = extractWebsiteId(response);

  if (!token || !websiteId) {
    return null;
  }

  const auth: WebsiteAuth = {
    token,
    websiteId,
  };

  window.localStorage.setItem('websiteAuth', JSON.stringify(auth));

  return auth;
}

function clearStoredWebsiteAuth() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('websiteAuth');
  }
}

function buildEventHeaders(auth: WebsiteAuth, domain: string): Record<string, string> {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${auth.token}`,
    'x-website-id': auth.websiteId,
    'x-website-domain': domain,
  };
}

function normalizeEvent(rawEvent: unknown): WebsiteEvent | null {
  if (!isRecord(rawEvent)) {
    return null;
  }

  const id =
    getStringValue(rawEvent.id) ||
    getStringValue(rawEvent._id) ||
    getStringValue(rawEvent.eventId) ||
    getStringValue(rawEvent.uid) ||
    getStringValue(rawEvent.slug);

  if (!id) {
    return null;
  }

  return {
    ...rawEvent,

    id,

    slug: getStringValue(rawEvent.slug) || undefined,

    title:
      getStringValue(rawEvent.title) ||
      getStringValue(rawEvent.name) ||
      getStringValue(rawEvent.eventName) ||
      undefined,

    name: getStringValue(rawEvent.name) || undefined,

    eventName: getStringValue(rawEvent.eventName) || undefined,

    excerpt: getStringValue(rawEvent.excerpt) || undefined,

    description: rawEvent.description ?? rawEvent.summary ?? undefined,

    type: getStringValue(rawEvent.type) || undefined,

    category: getStringValue(rawEvent.category) || undefined,

    status: getStringValue(rawEvent.status) || undefined,

    startDate: getStringValue(rawEvent.startDate) || getStringValue(rawEvent.startsAt) || undefined,

    startsAt: getStringValue(rawEvent.startsAt) || getStringValue(rawEvent.startDate) || undefined,

    endDate: getStringValue(rawEvent.endDate) || undefined,

    meetingLink: getStringValue(rawEvent.meetingLink) || undefined,

    totalRegistrations: getNumberValue(rawEvent.totalRegistrations),

    image: rawEvent.image as string | WebsiteEventImage | undefined,

    heroImage: rawEvent.heroImage as string | WebsiteEventImage | undefined,

    banner: rawEvent.banner as string | WebsiteEventImage | undefined,

    bannerImage: rawEvent.bannerImage as string | WebsiteEventImage | undefined,

    bannerImageId: rawEvent.bannerImageId as WebsiteEventImage | undefined,

    sponsors: Array.isArray(rawEvent.sponsors) ? rawEvent.sponsors : [],

    agenda: Array.isArray(rawEvent.agenda) ? rawEvent.agenda : [],

    websites: Array.isArray(rawEvent.websites) ? rawEvent.websites : [],
  };
}

/**
 * Ye function aapke sample response:
 * response.data.data
 * ko correctly extract karta hai.
 */
function extractEventItems(response: unknown): WebsiteEvent[] {
  if (Array.isArray(response)) {
    return response.map(normalizeEvent).filter((event): event is WebsiteEvent => event !== null);
  }

  if (!isRecord(response)) {
    return [];
  }

  const directCandidates = [response.items, response.events, response.results];

  for (const candidate of directCandidates) {
    if (Array.isArray(candidate)) {
      return candidate.map(normalizeEvent).filter((event): event is WebsiteEvent => event !== null);
    }
  }

  if (!isRecord(response.data)) {
    return Array.isArray(response.data)
      ? response.data.map(normalizeEvent).filter((event): event is WebsiteEvent => event !== null)
      : [];
  }

  const nestedData = response.data;

  const nestedCandidates = [
    nestedData.data,
    nestedData.items,
    nestedData.events,
    nestedData.results,
  ];

  for (const candidate of nestedCandidates) {
    if (Array.isArray(candidate)) {
      return candidate.map(normalizeEvent).filter((event): event is WebsiteEvent => event !== null);
    }
  }

  return [];
}

function extractEventDetail(response: unknown): WebsiteEvent | null {
  if (!response) {
    return null;
  }

  if (!isRecord(response)) {
    return normalizeEvent(response);
  }

  /*
   * Detail response:
   * {
   *   success: true,
   *   data: { ...event }
   * }
   */
  if (isRecord(response.data)) {
    /*
     * Extra nested response:
     * data.data
     */
    if (isRecord(response.data.data)) {
      return normalizeEvent(response.data.data);
    }

    return normalizeEvent(response.data);
  }

  return normalizeEvent(response);
}

async function getFreshWebsiteAuth(domain: string): Promise<WebsiteAuth> {
  const auth = await ensureWebsiteAuth(domain);

  if (!auth?.token || !auth.websiteId) {
    throw new Error('Website token is required. Unable to obtain website authentication.');
  }

  return auth;
}

export async function fetchWebsiteEvents(
  options: FetchWebsiteEventsOptions = {},
): Promise<WebsiteEvent[]> {
  const { page = 1, limit = 100, search = '' } = options;

  const domain = getWebsiteDomain();
  let auth = await getFreshWebsiteAuth(domain);

  const executeRequest = async (currentAuth: WebsiteAuth) => {
    const searchParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      websiteId: currentAuth.websiteId,
    });

    if (search.trim()) {
      searchParams.set('search', search.trim());
    }

    const endpoint = `${API_ENDPOINTS.WEBSITE.EVENTS.BASE}` + `?${searchParams.toString()}`;

    return apiFetch<unknown>(endpoint, {
      method: 'GET',
      requireAuth: false,
      headers: buildEventHeaders(currentAuth, domain),
    });
  };

  try {
    const response = await executeRequest(auth);

    return extractEventItems(response);
  } catch (error: unknown) {
    if (getApiErrorStatus(error) !== 401) {
      throw error;
    }

    clearStoredWebsiteAuth();

    auth = await getFreshWebsiteAuth(domain);

    const retryResponse = await executeRequest(auth);

    return extractEventItems(retryResponse);
  }
}

export async function fetchWebsiteEventByIdOrSlug(idOrSlug: string): Promise<WebsiteEvent | null> {
  const value = idOrSlug.trim();

  if (!value) {
    return null;
  }

  const domain = getWebsiteDomain();
  let auth = await getFreshWebsiteAuth(domain);

  const executeRequest = async (currentAuth: WebsiteAuth) => {
    const endpoint = API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(encodeURIComponent(value));

    return apiFetch<unknown>(endpoint, {
      method: 'GET',
      requireAuth: false,
      headers: buildEventHeaders(currentAuth, domain),
    });
  };

  try {
    const response = await executeRequest(auth);

    return extractEventDetail(response);
  } catch (error: unknown) {
    if (getApiErrorStatus(error) !== 401) {
      throw error;
    }

    clearStoredWebsiteAuth();

    auth = await getFreshWebsiteAuth(domain);

    const retryResponse = await executeRequest(auth);

    return extractEventDetail(retryResponse);
  }
}
