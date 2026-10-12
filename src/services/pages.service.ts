// import { API_ENDPOINTS } from '@/constants/api';
// import { apiFetch } from '@/services/apiFetch';
// import { buildWebsiteAuthHeaders, ensureWebsiteAuth, getWebsiteDomain } from '@/lib/website-auth';

// export interface WebsitePageContentBlock {
//   id?: string;
//   type?: string;
//   data?: Record<string, unknown>;
// }

// export interface WebsitePageContent {
//   time?: number;
//   blocks?: WebsitePageContentBlock[];
//   version?: string;
// }

// export interface WebsitePageSection {
//   type?: string;
//   order?: number;
//   data?: Record<string, unknown>;
// }

// export interface WebsitePage {
//   siteId: string;
//   title: string;
//   slug: string;
//   shortDescription?: string;
//   content?: WebsitePageContent;
//   pageType?: string;
//   status?: string;
//   sections?: WebsitePageSection[];
//   isHomepage?: boolean;
//   publishedAt?: string;
//   seo?: Record<string, unknown>;
//   createdBy?: string;
//   updatedBy?: string;
//   id?: string;
// }

// export interface WebsitePageResponse {
//   success: boolean;
//   message: string;
//   data: WebsitePage;
// }

// export async function fetchWebsitePageBySlug(slug: string) {
//   const domain = getWebsiteDomain();

//   const auth = await ensureWebsiteAuth(domain);
//   const headers = {
//     ...buildWebsiteAuthHeaders(auth),
//     'x-website-domain': domain,
//   };

//   return apiFetch<WebsitePageResponse>(API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(slug), {
//     requireAuth: false,
//     method: 'GET',
//     headers,
//   });
// }

import { API_ENDPOINTS } from '@/constants/api';
import { apiFetch } from '@/services/apiFetch';
import { buildWebsiteAuthHeaders, ensureWebsiteAuth, getWebsiteDomain } from '@/lib/website-auth';

export interface WebsitePageContentBlock {
  id?: string;
  type?: string;
  data?: Record<string, unknown>;
}

export interface WebsitePageContent {
  time?: number;
  blocks?: WebsitePageContentBlock[];
  version?: string;
}

export interface WebsitePageSection {
  type?: string;
  order?: number;
  data?: Record<string, unknown>;
}

export interface WebsitePage {
  siteId: string;
  title: string;
  slug: string;
  shortDescription?: string;
  content?: WebsitePageContent;
  pageType?: string;
  status?: string;
  sections?: WebsitePageSection[];
  isHomepage?: boolean;
  publishedAt?: string;
  seo?: Record<string, unknown>;
  createdBy?: string;
  updatedBy?: string;
  id?: string;
}

export interface WebsitePageResponse {
  success: boolean;
  message: string;
  data: WebsitePage;
}

export interface WebsitePageListingItem {
  slug: string;
  status?: string;
  isPublished?: boolean;
  publishedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizeWebsitePageListingItem(value: unknown): WebsitePageListingItem | null {
  if (!isRecord(value) || typeof value.slug !== 'string') {
    return null;
  }

  return {
    slug: value.slug,
    status: typeof value.status === 'string' ? value.status : undefined,
    isPublished: typeof value.isPublished === 'boolean' ? value.isPublished : undefined,
    publishedAt: typeof value.publishedAt === 'string' ? value.publishedAt : undefined,
    isDeleted: typeof value.isDeleted === 'boolean' ? value.isDeleted : undefined,
    deletedAt:
      typeof value.deletedAt === 'string' || value.deletedAt === null ? value.deletedAt : undefined,
  };
}

function findWebsitePages(value: unknown): WebsitePageListingItem[] | null {
  if (Array.isArray(value)) {
    return value
      .map(normalizeWebsitePageListingItem)
      .filter((page): page is WebsitePageListingItem => page !== null);
  }

  if (!isRecord(value)) {
    return null;
  }

  for (const key of ['data', 'pages', 'items', 'results', 'records', 'docs', 'rows']) {
    const pages = findWebsitePages(value[key]);

    if (pages) {
      return pages;
    }
  }

  return null;
}

export async function fetchWebsitePages(): Promise<WebsitePageListingItem[]> {
  const domain = getWebsiteDomain();
  const auth = await ensureWebsiteAuth(domain);
  const headers = {
    ...buildWebsiteAuthHeaders(auth),
    'x-website-domain': domain,
  };
  const params = new URLSearchParams({
    page: '1',
    limit: '100',
    websiteId: auth.websiteId,
  });

  const response = await apiFetch<unknown>(`${API_ENDPOINTS.WEBSITE.PAGES.BASE}?${params}`, {
    requireAuth: false,
    method: 'GET',
    cache: 'no-store',
    headers,
  });
  const pages = findWebsitePages(response);

  if (!pages) {
    throw new Error('The website pages API returned an unexpected response.');
  }

  return pages;
}

export async function fetchWebsitePageBySlug(slug: string) {
  const domain = getWebsiteDomain();
  const auth = await ensureWebsiteAuth(domain);
  const headers = {
    ...buildWebsiteAuthHeaders(auth),
    'x-website-domain': domain,
  };

  return apiFetch<WebsitePageResponse>(API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(slug), {
    requireAuth: false,
    method: 'GET',
    headers,
  });
}
