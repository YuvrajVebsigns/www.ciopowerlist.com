import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch, ApiError } from '@/services/apiFetch';

export type SubscribeResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

/**
 * Format API errors into a user-friendly message.
 */
function formatSubscribeErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const data = error.data;

    if (typeof data === 'object' && data !== null && 'message' in data) {
      const message = (data as { message?: unknown }).message;

      if (Array.isArray(message)) {
        return message.map(String).join(', ');
      }

      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Failed to subscribe. Please try again.';
}

/**
 * POST subscription email.
 */
async function postSubscribe(email: string) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<SubscribeResponse>(API_ENDPOINTS.WEBSITE.SUBSCRIBES, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify({
      email: email.trim(),
    }),
  });
}

/**
 * Submit website subscription.
 */
export async function subscribeWebsiteEmail(email: string) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    throw new Error('Email address is required.');
  }

  try {
    const response = await postSubscribe(trimmedEmail);

    if (response.success === false) {
      throw new Error(response.message || 'Failed to subscribe.');
    }

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    /**
     * Website token/auth may have expired.
     * Clear it and retry once.
     */
    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await postSubscribe(trimmedEmail);

      if (response.success === false) {
        throw new Error(response.message || 'Failed to subscribe.');
      }

      return response;
    }

    throw new Error(formatSubscribeErrorMessage(error));
  }
}
