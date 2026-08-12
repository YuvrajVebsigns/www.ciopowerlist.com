// import { API_ENDPOINTS } from '@/constants/api';

// import {
//   buildWebsiteAuthHeaders,
//   clearWebsiteAuth,
//   ensureWebsiteAuth,
//   getApiErrorStatus,
// } from '@/lib/website-auth';

// import { apiFetch, ApiError } from '@/services/apiFetch';

// import type {
//   NominationResponse,
//   NominationSubmissionInput,
//   SubmitNominationApiBody,
//   WebsiteNominationCategory,
// } from '@/types/nominations.types';

// /* =========================================================
//    SUBCATEGORY TYPE
//    ========================================================= */

// export type WebsiteNominationSubCategory = {
//   id: string;
//   name?: string;
//   label?: string;
//   categoryId?: string;
//   parentCategoryId?: string;
//   nominationCategoryId?: string;
//   _id?: string;
//   title?: string;
// };

// /* =========================================================
//    BUILD NOMINATION BODY
//    ========================================================= */

// function buildSubmitNominationBody(
//   input: NominationSubmissionInput,
// ): SubmitNominationApiBody {
//   const body: SubmitNominationApiBody = {
//     nominatorName: input.nominatorName.trim(),

//     nominatorCompany: input.nominatorCompany.trim(),

//     nominatorCity: input.nominatorCity.trim(),

//     nominatorEmail: input.nominatorEmail.trim(),

//     nominees: input.nominees.map((nominee) => ({
//       categoryId: nominee.categoryId.trim(),

//       /*
//        * Subcategory ID is required and sent to the backend.
//        */
//       // subCategoryId: nominee.subCategoryId.trim(),

//       contactName: nominee.contactName.trim(),

//       companyName: nominee.companyName.trim(),

//       contactEmail: nominee.contactEmail.trim(),

//       ...(nominee.mobileNo?.trim()
//         ? {
//             mobileNo: nominee.mobileNo.trim(),
//           }
//         : {}),
//     })),
//   };

//   /* ---------------------------------------------------------
//      OPTIONAL NOMINATOR PHONE
//      --------------------------------------------------------- */

//   const phone = input.nominatorContact?.trim();

//   if (phone) {
//     body.nominatorPhone = phone;
//   }

//   return body;
// }

// /* =========================================================
//    ASSERT NOMINATION SAVED
//    ========================================================= */

// function assertNominationSaved(response: NominationResponse) {
//   if (response.success === false) {
//     throw new Error(
//       response.message || 'Nomination was not saved.',
//     );
//   }
// }

// /* =========================================================
//    FORMAT API ERROR
//    ========================================================= */

// export function formatNominationErrorMessage(
//   error: unknown,
// ): string {
//   if (error instanceof ApiError) {
//     const data = error.data;

//     if (
//       typeof data === 'object' &&
//       data !== null &&
//       'message' in data
//     ) {
//       const message = (
//         data as {
//           message?: unknown;
//         }
//       ).message;

//       /*
//        * NestJS validation errors can return an array.
//        */
//       if (Array.isArray(message)) {
//         return message.map(String).join(', ');
//       }

//       if (
//         typeof message === 'string' &&
//         message.trim()
//       ) {
//         return message;
//       }
//     }

//     if (error.message) {
//       return error.message;
//     }
//   }

//   if (error instanceof Error) {
//     return error.message;
//   }

//   return 'Failed to submit nomination. Please try again.';
// }

// /* =========================================================
//    POST NOMINATION
//    ========================================================= */

// async function postNomination(
//   body: SubmitNominationApiBody,
// ) {
//   const auth = await ensureWebsiteAuth();

//   return apiFetch<NominationResponse>(
//     API_ENDPOINTS.WEBSITE.NOMINATIONS,
//     {
//       method: 'POST',

//       /*
//        * Public website nomination API.
//        * Website authentication headers are still sent.
//        */
//       requireAuth: false,

//       headers: buildWebsiteAuthHeaders(auth),

//       body: JSON.stringify(body),
//     },
//   );
// }

// /* =========================================================
//    GET NOMINATION CATEGORIES
//    ========================================================= */

// export async function fetchWebsiteNominationCategories() {
//   async function getCategories() {
//     const auth = await ensureWebsiteAuth();

//     return apiFetch<{
//       success?: boolean;
//       message?: string;
//       data?: WebsiteNominationCategory[];
//     }>(
//       API_ENDPOINTS.WEBSITE.NOMINATION_CATEGORIES,
//       {
//         method: 'GET',

//         requireAuth: false,

//         headers: buildWebsiteAuthHeaders(auth),
//       },
//     );
//   }

//   try {
//     const response = await getCategories();

//     if (response.success === false) {
//       throw new Error(
//         response.message ||
//           'Failed to load nomination categories.',
//       );
//     }

//     return response.data ?? [];
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     /*
//      * If website token expired,
//      * clear it and retry once.
//      */
//     if (statusCode === 401) {
//       clearWebsiteAuth();

//       const response = await getCategories();

//       if (response.success === false) {
//         throw new Error(
//           response.message ||
//             'Failed to load nomination categories.',
//         );
//       }

//       return response.data ?? [];
//     }

//     throw error;
//   }
// }

// /* =========================================================
//    GET NOMINATION SUB-CATEGORIES
//    ========================================================= */

// export async function fetchWebsiteNominationSubCategories() {
//   async function getSubCategories() {
//     const auth = await ensureWebsiteAuth();

//     return apiFetch<{
//       success?: boolean;
//       message?: string;
//       data?: WebsiteNominationSubCategory[];
//     }>(
//       API_ENDPOINTS.WEBSITE.NOMINATION_SUB_CATEGORIES,
//       {
//         method: 'GET',

//         requireAuth: false,

//         headers: buildWebsiteAuthHeaders(auth),
//       },
//     );
//   }

//   try {
//     const response = await getSubCategories();

//     if (response.success === false) {
//       throw new Error(
//         response.message ||
//           'Failed to load nomination subcategories.',
//       );
//     }

//     return response.data ?? [];
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     /*
//      * If website token expired,
//      * clear it and retry once.
//      */
//     if (statusCode === 401) {
//       clearWebsiteAuth();

//       const response = await getSubCategories();

//       if (response.success === false) {
//         throw new Error(
//           response.message ||
//             'Failed to load nomination subcategories.',
//         );
//       }

//       return response.data ?? [];
//     }

//     throw error;
//   }
// }

// /* =========================================================
//    SUBMIT WEBSITE NOMINATION
//    ========================================================= */

// export async function submitWebsiteNomination(
//   input: NominationSubmissionInput,
// ) {
//   const body = buildSubmitNominationBody(input);

//   try {
//     const response = await postNomination(body);

//     assertNominationSaved(response);

//     return response;
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     /*
//      * If website token expired,
//      * clear it and retry once.
//      */
//     if (statusCode === 401) {
//       clearWebsiteAuth();

//       const response = await postNomination(body);

//       assertNominationSaved(response);

//       return response;
//     }

//     throw new Error(
//       formatNominationErrorMessage(error),
//     );
//   }
// }

import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch, ApiError } from '@/services/apiFetch';
import type {
  NominationResponse,
  NominationSubmissionInput,
  SubmitNominationApiBody,
  WebsiteNominationCategory,
} from '@/types/nominations.types';

/* =========================================================
   SUBCATEGORY TYPE
   ========================================================= */

export type WebsiteNominationSubCategory = {
  id: string;
  name?: string;
  label?: string;
  categoryId?: string;
};

/* =========================================================
   NOMINATION STATUS TYPE
   ========================================================= */

export type WebsiteNominationStatusResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

/* =========================================================
   BUILD NOMINATION BODY
   ========================================================= */

function buildSubmitNominationBody(input: NominationSubmissionInput): SubmitNominationApiBody {
  const body: SubmitNominationApiBody = {
    nominatorName: input.nominatorName.trim(),
    nominatorCompany: input.nominatorCompany.trim(),
    nominatorCity: input.nominatorCity.trim(),
    nominatorEmail: input.nominatorEmail.trim(),

    nominees: input.nominees.map((nominee) => ({
      categoryId: nominee.categoryId.trim(),
      contactName: nominee.contactName.trim(),
      companyName: nominee.companyName.trim(),
      contactEmail: nominee.contactEmail.trim(),

      ...(nominee.mobileNo?.trim()
        ? {
            mobileNo: nominee.mobileNo.trim(),
          }
        : {}),
    })),
  };

  const phone = input.nominatorContact?.trim();

  if (phone) {
    body.nominatorPhone = phone;
  }

  return body;
}

/* =========================================================
   ASSERT NOMINATION SAVED
   ========================================================= */

function assertNominationSaved(response: NominationResponse) {
  if (response.success === false) {
    throw new Error(response.message || 'Nomination was not saved.');
  }
}

/* =========================================================
   FORMAT API ERROR
   ========================================================= */

export function formatNominationErrorMessage(error: unknown): string {
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

  return 'Failed to submit nomination. Please try again.';
}

/* =========================================================
   GET NOMINATION STATUS
   ========================================================= */

export async function fetchWebsiteNominationStatus() {
  async function getStatus() {
    const auth = await ensureWebsiteAuth();

    return apiFetch<WebsiteNominationStatusResponse>(API_ENDPOINTS.WEBSITE.NOMINATION_STATUS, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });
  }

  try {
    const response = await getStatus();

    if (response.success === false) {
      throw new Error(response.message || 'Failed to load nomination status.');
    }

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await getStatus();

      if (response.success === false) {
        throw new Error(response.message || 'Failed to load nomination status.');
      }

      return response;
    }

    throw error;
  }
}

/* =========================================================
   POST NOMINATION
   ========================================================= */

async function postNomination(body: SubmitNominationApiBody) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<NominationResponse>(API_ENDPOINTS.WEBSITE.NOMINATIONS, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(body),
  });
}

/* =========================================================
   GET NOMINATION CATEGORIES
   ========================================================= */

export async function fetchWebsiteNominationCategories() {
  async function getCategories() {
    const auth = await ensureWebsiteAuth();

    return apiFetch<{
      success?: boolean;
      message?: string;
      data?: WebsiteNominationCategory[];
    }>(API_ENDPOINTS.WEBSITE.NOMINATION_CATEGORIES, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });
  }

  try {
    const response = await getCategories();

    if (response.success === false) {
      throw new Error(response.message || 'Failed to load nomination categories.');
    }

    return response.data ?? [];
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await getCategories();

      if (response.success === false) {
        throw new Error(response.message || 'Failed to load nomination categories.');
      }

      return response.data ?? [];
    }

    throw error;
  }
}

/* =========================================================
   GET NOMINATION SUB-CATEGORIES
   ========================================================= */

export async function fetchWebsiteNominationSubCategories() {
  async function getSubCategories() {
    const auth = await ensureWebsiteAuth();

    return apiFetch<{
      success?: boolean;
      message?: string;
      data?: WebsiteNominationSubCategory[];
    }>(API_ENDPOINTS.WEBSITE.NOMINATION_SUB_CATEGORIES, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });
  }

  try {
    const response = await getSubCategories();

    if (response.success === false) {
      throw new Error(response.message || 'Failed to load nomination subcategories.');
    }

    return response.data ?? [];
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await getSubCategories();

      if (response.success === false) {
        throw new Error(response.message || 'Failed to load nomination subcategories.');
      }

      return response.data ?? [];
    }

    throw error;
  }
}

/* =========================================================
   SUBMIT WEBSITE NOMINATION
   ========================================================= */

export async function submitWebsiteNomination(input: NominationSubmissionInput) {
  const body = buildSubmitNominationBody(input);

  try {
    const response = await postNomination(body);

    assertNominationSaved(response);

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await postNomination(body);

      assertNominationSaved(response);

      return response;
    }

    throw new Error(formatNominationErrorMessage(error));
  }
}
