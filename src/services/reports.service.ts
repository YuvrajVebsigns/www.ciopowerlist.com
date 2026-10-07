import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

export type ReportDownloadInput = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  companyName: string;
  designation: string;
  industry: string;
  reportId: string;
};

type ReportDownloadResponse = {
  success?: boolean;
  message?: string;
  data?: {
    downloadUrl?: string;
  };
};

async function postReportDownload(input: ReportDownloadInput) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<ReportDownloadResponse>(API_ENDPOINTS.WEBSITE.REPORTS.DOWNLOAD, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(input),
  });
}

export async function downloadWebsiteReport(input: ReportDownloadInput) {
  try {
    const response = await postReportDownload(input);
    const downloadUrl = response.data?.downloadUrl;

    if (!downloadUrl) {
      throw new Error(response.message || 'The report download link was not returned.');
    }

    return downloadUrl;
  } catch (error: unknown) {
    if (getApiErrorStatus(error) !== 401) {
      throw error;
    }

    clearWebsiteAuth();
    const response = await postReportDownload(input);
    const downloadUrl = response.data?.downloadUrl;

    if (!downloadUrl) {
      throw new Error(response.message || 'The report download link was not returned.');
    }

    return downloadUrl;
  }
}
