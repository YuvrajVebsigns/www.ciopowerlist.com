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
