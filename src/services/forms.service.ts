import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch } from './apiFetch';

async function requestWithWebsiteAuth<T>(
  endpoint: string,
  options: { method?: 'GET' | 'POST'; body?: string } = {},
): Promise<T> {
  const request = async () => {
    const auth = await ensureWebsiteAuth();
    return apiFetch<T>(endpoint, {
      ...options,
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });
  };

  try {
    return await request();
  } catch (error: unknown) {
    if (getApiErrorStatus(error) !== 401) {
      throw error;
    }

    clearWebsiteAuth();
    return request();
  }
}

export enum FormFieldType {
  SINGLE_INPUT = 'single_input',
  PARAGRAPH = 'paragraph',
  EMAIL = 'email',
  PHONE = 'phone',
  NUMBER = 'number',
  SINGLE_SELECT = 'single_select',
  RADIO = 'radio',
  MULTIPLE_CHOICE = 'multiple_choice',
  DATE = 'date',
}

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customErrorMessage?: string;
}

export interface FormQuestionPublic {
  key: string;
  label: string;
  description?: string;
  placeholder?: string;
  type: FormFieldType;
  options?: FormFieldOption[];
  validation?: FormValidationRules;
  order?: number;
  width?: 'full' | 'half';
}

export interface PublicCustomForm {
  id: string;
  name: string;
  slug: string;
  description?: string;
  settings: {
    submitButtonText?: string;
    successMessage?: string;
    redirectUrl?: string;
    captchaEnabled?: boolean;
  };
  questions: FormQuestionPublic[];
}

export interface FormSubmitPayload {
  answers: Record<string, unknown>;
  captchaToken?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFormFieldType(value: unknown): value is FormFieldType {
  return (
    typeof value === 'string' &&
    Object.values(FormFieldType).some((fieldType) => fieldType === value)
  );
}

function isFormFieldOption(value: unknown): value is FormFieldOption {
  return isRecord(value) && typeof value.label === 'string' && typeof value.value === 'string';
}

function parsePublicCustomForm(response: unknown): PublicCustomForm {
  const candidate = isRecord(response) && isRecord(response.data) ? response.data : response;

  if (
    !isRecord(candidate) ||
    typeof candidate.id !== 'string' ||
    typeof candidate.name !== 'string' ||
    typeof candidate.slug !== 'string' ||
    !Array.isArray(candidate.questions)
  ) {
    const message =
      isRecord(response) && typeof response.message === 'string'
        ? response.message
        : 'The forms API returned an invalid form response.';
    throw new Error(message);
  }

  const questions = candidate.questions.map((question, index): FormQuestionPublic => {
    if (
      !isRecord(question) ||
      typeof question.key !== 'string' ||
      typeof question.label !== 'string' ||
      !isFormFieldType(question.type)
    ) {
      throw new Error(`The forms API returned an invalid question at position ${index + 1}.`);
    }

    const options = question.options;
    if (options !== undefined && (!Array.isArray(options) || !options.every(isFormFieldOption))) {
      throw new Error(`The forms API returned invalid options for "${question.label}".`);
    }

    const validation = question.validation;
    if (validation !== undefined && !isRecord(validation)) {
      throw new Error(`The forms API returned invalid validation for "${question.label}".`);
    }

    const parsedValidation: FormValidationRules | undefined = isRecord(validation)
      ? {
          ...(typeof validation.required === 'boolean' && { required: validation.required }),
          ...(typeof validation.minLength === 'number' && {
            minLength: validation.minLength,
          }),
          ...(typeof validation.maxLength === 'number' && {
            maxLength: validation.maxLength,
          }),
          ...(typeof validation.min === 'number' && { min: validation.min }),
          ...(typeof validation.max === 'number' && { max: validation.max }),
          ...(typeof validation.pattern === 'string' && { pattern: validation.pattern }),
          ...(typeof validation.customErrorMessage === 'string' && {
            customErrorMessage: validation.customErrorMessage,
          }),
        }
      : undefined;

    if (
      (question.description !== undefined && typeof question.description !== 'string') ||
      (question.placeholder !== undefined && typeof question.placeholder !== 'string') ||
      (question.order !== undefined && typeof question.order !== 'number') ||
      (question.width !== undefined && question.width !== 'full' && question.width !== 'half')
    ) {
      throw new Error(`The forms API returned invalid details for "${question.label}".`);
    }

    return {
      key: question.key,
      label: question.label,
      type: question.type,
      ...(typeof question.description === 'string' && { description: question.description }),
      ...(typeof question.placeholder === 'string' && { placeholder: question.placeholder }),
      ...(options && { options }),
      ...(parsedValidation && { validation: parsedValidation }),
      ...(typeof question.order === 'number' && { order: question.order }),
      ...(question.width === 'full' || question.width === 'half' ? { width: question.width } : {}),
    };
  });

  const settings = isRecord(candidate.settings) ? candidate.settings : {};
  return {
    id: candidate.id,
    name: candidate.name,
    slug: candidate.slug,
    questions,
    settings: {
      ...(typeof settings.submitButtonText === 'string' && {
        submitButtonText: settings.submitButtonText,
      }),
      ...(typeof settings.successMessage === 'string' && {
        successMessage: settings.successMessage,
      }),
      ...(typeof settings.redirectUrl === 'string' && { redirectUrl: settings.redirectUrl }),
      ...(typeof settings.captchaEnabled === 'boolean' && {
        captchaEnabled: settings.captchaEnabled,
      }),
    },
    ...(typeof candidate.description === 'string' && { description: candidate.description }),
  };
}

export const websiteFormsService = {
  getFormBySlug: async (slug: string): Promise<PublicCustomForm> => {
    const response = await requestWithWebsiteAuth<unknown>(
      API_ENDPOINTS.WEBSITE.FORMS.BY_SLUG(slug),
    );
    return parsePublicCustomForm(response);
  },

  submitForm: async (
    slug: string,
    payload: FormSubmitPayload,
  ): Promise<{ success: boolean; message: string; submissionId?: string }> => {
    return requestWithWebsiteAuth<{ success: boolean; message: string; submissionId?: string }>(
      API_ENDPOINTS.WEBSITE.FORMS.SUBMIT(slug),
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );
  },
};
