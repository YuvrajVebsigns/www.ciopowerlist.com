'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  websiteFormsService,
  PublicCustomForm,
  FormFieldType,
  FormQuestionPublic,
} from '@/services/forms.service';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import DatePicker from './DatePicker';

interface DynamicFormProps {
  slug: string;
}

// Field positions are zero-based; section ranges use an exclusive end index.
const SECTION_GROUPS = [
  {
    start: 0,
    end: 1,
    number: '01',
    title: 'EMAIL',
    // description: 'Complete the questions in this section.',
  },
  {
    start: 1,
    end: 21,
    number: '02',
    title: 'CIO INFORMATION',
    description: 'Complete the questions in this section.',
  },
  {
    start: 21,
    end: 30,
    number: '03',
    title: 'COMPANY INFORMATION',
    description: 'Complete the questions in this section.',
  },
  {
    start: 30,
    end: 44,
    number: '04',
    title: 'CIOs TEAMS DETAILS',
    description: 'Complete the questions in this section.',
  },
  {
    start: 44,
    end: 48,
    number: '05',
    title: 'ONLINE LINKS',
    description: 'Please mention up to a maximum of 3 URL links for each',
  },
  {
    start: 48,
    end: 49,
    number: '06',
    title: ' INDUSTRY & COMPANY INTERNAL RECOGNITIONS, HONOURS & AWARDS',
    description: 'Complete the questions in this section.',
  },
  {
    start: 49,
    end: 50,
    number: '07',
    title: 'WORK PROFILE',
    description: 'Complete the questions in this section.',
  },
  {
    start: 50,
    end: 51,
    number: '08',
    title: 'KEY MOMENTS OF 2025',
    description: 'Complete the questions in this section.',
  },
  {
    start: 51,
    end: 53,
    number: '09',
    title: 'KEY BUSINESS OUTCOMES ACHIEVED',
    description: 'Complete the questions in this section.',
  },
];

const REQUIRED_QUESTION_NUMBERS = new Set([
  ...Array.from({ length: 13 }, (_, index) => index + 1),
  16,
  18,
  19,
  ...Array.from({ length: 23 }, (_, index) => index + 22),
  ...Array.from({ length: 5 }, (_, index) => index + 49),
]);

const DIGITS_ONLY_QUESTION_NUMBERS = new Set([7, 8, 9, 11, 12, 13, 31]);

const isQuestionRequired = (question: FormQuestionPublic, index: number): boolean =>
  question.validation?.required === true || REQUIRED_QUESTION_NUMBERS.has(index + 1);

const isDigitsOnlyQuestion = (question: FormQuestionPublic, index: number): boolean =>
  DIGITS_ONLY_QUESTION_NUMBERS.has(index + 1) || question.type === FormFieldType.PHONE;

const MAX_SECTION_WORDS = 200;

const isWordLimitedQuestion = (question: FormQuestionPublic, index: number): boolean =>
  index >= 48 &&
  index <= 52 &&
  (question.type === FormFieldType.SINGLE_INPUT || question.type === FormFieldType.PARAGRAPH);

const countWords = (value: string): number => (value.trim() ? value.trim().split(/\s+/).length : 0);

const limitWords = (value: string, maxWords: number): string => {
  const words = value.trim().split(/\s+/);
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') : value;
};

const isNameQuestion = (question: FormQuestionPublic): boolean => {
  const fieldName = `${question.key}${question.label}`.toLowerCase().replace(/[^a-z]/g, '');
  return (
    question.type === FormFieldType.SINGLE_INPUT &&
    (fieldName.includes('firstname') ||
      fieldName.includes('lastname') ||
      fieldName.includes('surname'))
  );
};

export const DynamicForm: React.FC<DynamicFormProps> = ({ slug }) => {
  const router = useRouter();

  const [form, setForm] = useState<PublicCustomForm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form input answers state: key -> value
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Turnstile state
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaStatus, setCaptchaStatus] = useState<
    'loading' | 'ready' | 'verifying' | 'verified' | 'error'
  >('loading');

  const turnstileSiteKey = process.env.NEXT_PUBLIC_SITEKEY?.trim() || '';

  // 1. Fetch Form Schema
  useEffect(() => {
    let isMounted = true;
    async function loadForm() {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await websiteFormsService.getFormBySlug(slug);
        if (isMounted) {
          setForm(data);
          // Initialize empty answers map
          const initAnswers: Record<string, unknown> = {};
          (data.questions || []).forEach((q) => {
            initAnswers[q.key] = q.type === FormFieldType.MULTIPLE_CHOICE ? [] : '';
          });
          setAnswers(initAnswers);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg =
            err instanceof Error
              ? err.message
              : 'This form is currently unavailable or has closed.';
          setFetchError(msg);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (slug) {
      loadForm();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // 2. Setup Turnstile CAPTCHA if enabled
  useEffect(() => {
    if (!form?.settings?.captchaEnabled) {
      return;
    }

    if (!turnstileSiteKey) {
      setCaptchaStatus('error');
      return;
    }

    let isMounted = true;
    const initTurnstile = () => {
      if (!isMounted || !window.turnstile || !turnstileContainerRef.current) return;
      if (turnstileWidgetIdRef.current) return;

      try {
        const widgetId = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey,
          theme: 'light',
          size: 'invisible',
          execution: 'execute',
          callback: (token: string) => {
            if (!isMounted) return;
            setCaptchaToken(token);
            setCaptchaStatus('verified');
            setSubmitError(null);
          },
          'expired-callback': () => {
            if (!isMounted) return;
            setCaptchaToken(null);
            setCaptchaStatus('ready');
          },
          'error-callback': () => {
            if (!isMounted) return;
            setCaptchaToken(null);
            setCaptchaStatus('error');
          },
          'timeout-callback': () => {
            if (!isMounted) return;
            setCaptchaToken(null);
            setCaptchaStatus('error');
          },
        });
        turnstileWidgetIdRef.current = widgetId;
        setCaptchaStatus('ready');
      } catch {
        setCaptchaStatus('error');
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-cloudflare-turnstile="true"]',
    );
    const handleScriptError = () => {
      if (isMounted) setCaptchaStatus('error');
    };

    if (window.turnstile) {
      initTurnstile();
    } else if (existingScript) {
      existingScript.addEventListener('load', initTurnstile);
      existingScript.addEventListener('error', handleScriptError);
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-cloudflare-turnstile', 'true');
      script.addEventListener('load', initTurnstile);
      script.addEventListener('error', handleScriptError);
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      existingScript?.removeEventListener('load', initTurnstile);
      existingScript?.removeEventListener('error', handleScriptError);
      if (window.turnstile && turnstileWidgetIdRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // ignore cleanup error
        }
        turnstileWidgetIdRef.current = null;
      }
      if (!existingScript) {
        const script = document.querySelector<HTMLScriptElement>(
          'script[data-cloudflare-turnstile="true"]',
        );
        script?.removeEventListener('load', initTurnstile);
        script?.removeEventListener('error', handleScriptError);
      }
    };
  }, [form?.settings?.captchaEnabled, turnstileSiteKey]);

  // Handle Input Changes
  const handleAnswerChange = (key: string, val: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
    // Clear error on type
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleCheckboxToggle = (key: string, optionValue: string) => {
    const current = Array.isArray(answers[key]) ? (answers[key] as string[]) : [];
    const exists = current.includes(optionValue);
    const updated = exists ? current.filter((v) => v !== optionValue) : [...current, optionValue];
    handleAnswerChange(key, updated);
  };

  // Client-side Validation
  const validateClient = (): boolean => {
    if (!form) return false;
    const errors: Record<string, string> = {};

    for (const [index, q] of (form.questions || []).entries()) {
      const val = answers[q.key];
      const isNameField = isNameQuestion(q);
      const isRequired = isQuestionRequired(q, index);
      const isDigitsOnly = isDigitsOnlyQuestion(q, index);
      const hasWordLimit = isWordLimitedQuestion(q, index);
      const isMissing =
        val === undefined ||
        val === null ||
        (typeof val === 'string' && val.trim() === '') ||
        (Array.isArray(val) && val.length === 0);

      // 1. Required Check
      if (isRequired && isMissing) {
        errors[q.key] = q.validation?.customErrorMessage || `${q.label} is required.`;
        continue;
      }

      if (isMissing) continue;

      // 2. Type-specific checks
      if (isDigitsOnly && !/^\d+$/.test(String(val))) {
        errors[q.key] = `${q.label} must contain digits only.`;
      }

      if (q.type === FormFieldType.EMAIL) {
        const str = String(val).trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
          errors[q.key] = q.validation?.customErrorMessage || 'Please enter a valid email address.';
        }
      }

      // 3. PHONE CHECK: Enforce required 8 to 12 digits
      if (q.type === FormFieldType.PHONE) {
        const phone = String(val);
        if (!/^\d{8,12}$/.test(phone)) {
          errors[q.key] =
            q.validation?.customErrorMessage ||
            'Phone number must contain 8 to 12 digits and no other characters.';
        }
      }

      if (isNameField) {
        const name = String(val).trim();
        if (/\d/.test(name)) {
          errors[q.key] = q.validation?.customErrorMessage || 'Names must not contain numbers.';
        } else if (name.length > 200) {
          errors[q.key] =
            q.validation?.customErrorMessage || `${q.label} must not exceed 200 characters.`;
        }
      }

      if (q.type === FormFieldType.SINGLE_INPUT || q.type === FormFieldType.PARAGRAPH) {
        const str = String(val).trim();
        if (hasWordLimit && countWords(str) > MAX_SECTION_WORDS) {
          errors[q.key] = `${q.label} must not exceed ${MAX_SECTION_WORDS} words.`;
        }
        const maxLength =
          q.validation?.maxLength === undefined
            ? isNameField
              ? 200
              : undefined
            : Math.min(q.validation.maxLength, isNameField ? 200 : q.validation.maxLength);
        if (q.validation?.minLength !== undefined && str.length < q.validation.minLength) {
          errors[q.key] =
            q.validation?.customErrorMessage ||
            `${q.label} must be at least ${q.validation.minLength} characters.`;
        } else if (maxLength !== undefined && str.length > maxLength) {
          errors[q.key] =
            q.validation?.customErrorMessage ||
            `${q.label} must not exceed ${maxLength} characters.`;
        } else if (q.validation?.pattern) {
          try {
            const regex = new RegExp(q.validation.pattern);
            if (!regex.test(str)) {
              errors[q.key] =
                q.validation?.customErrorMessage || `${q.label} is in an invalid format.`;
            }
          } catch {
            // Ignore invalid regex
          }
        }
      }

      if (q.type === FormFieldType.NUMBER) {
        const num = parseFloat(String(val));
        if (isNaN(num)) {
          errors[q.key] = 'Please enter a valid number.';
        } else if (q.validation?.min !== undefined && num < q.validation.min) {
          errors[q.key] = `${q.label} must be at least ${q.validation.min}.`;
        } else if (q.validation?.max !== undefined && num > q.validation.max) {
          errors[q.key] = `${q.label} must not exceed ${q.validation.max}.`;
        }
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const startCaptchaVerification = () => {
    if (isSubmitting || captchaStatus === 'verifying') return;

    if (!validateClient()) {
      setSubmitError('Please complete the required fields before CAPTCHA verification.');
      return;
    }

    if (!window.turnstile || !turnstileWidgetIdRef.current) {
      setCaptchaStatus('error');
      setSubmitError('CAPTCHA is not ready. Please refresh the page and try again.');
      return;
    }

    try {
      setCaptchaToken(null);
      setCaptchaStatus('verifying');
      setSubmitError(null);
      window.turnstile.execute(turnstileWidgetIdRef.current);
    } catch {
      setCaptchaStatus('error');
      setSubmitError('Unable to start CAPTCHA verification. Please try again.');
    }
  };

  const resetCaptcha = () => {
    setCaptchaToken(null);
    setCaptchaStatus('loading');

    if (!window.turnstile || !turnstileWidgetIdRef.current) {
      setCaptchaStatus('error');
      setSubmitError('CAPTCHA is not available. Please refresh the page.');
      return;
    }

    try {
      window.turnstile.reset(turnstileWidgetIdRef.current);
      setCaptchaStatus('ready');
    } catch {
      setCaptchaStatus('error');
      setSubmitError('Unable to refresh CAPTCHA. Please try again.');
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || isSubmitting) return;

    if (!validateClient()) {
      setSubmitError('Please correct the highlighted fields before submitting.');
      return;
    }

    if (form.settings?.captchaEnabled) {
      if (!turnstileSiteKey) {
        setSubmitError('Security verification is unavailable. Please contact support.');
        return;
      }

      if (!captchaToken) {
        setSubmitError('Please complete the security verification challenge.');
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await websiteFormsService.submitForm(slug, {
        answers,
        captchaToken: captchaToken || undefined,
      });

      setSubmitSuccess(true);

      // Handle custom redirect if configured
      if (form.settings?.redirectUrl) {
        const redirectUrl = form.settings.redirectUrl;
        setTimeout(() => {
          if (redirectUrl.startsWith('http')) {
            window.location.href = redirectUrl;
          } else {
            router.push(redirectUrl);
          }
        }, 1800);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to record response. Please try again.';
      setSubmitError(msg);

      // Reset Turnstile on error if available
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
        setCaptchaToken(null);
        setCaptchaStatus('ready');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="cio-nomination-container">
        <section className="cio-form-section flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#8e0101]" />
          <p className="text-sm font-medium text-[#687477]">Loading form...</p>
        </section>
      </div>
    );
  }

  // Error State (404 / closed)
  if (fetchError || !form) {
    return (
      <div className="cio-nomination-container">
        <section className="cio-form-section my-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700">
            <AlertCircle size={24} />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-[#0c1e21]">Form Unavailable</h1>
          <p className="cio-form-error">
            {fetchError || 'This form has either expired or is not currently open for submissions.'}
          </p>
        </section>
      </div>
    );
  }

  // Success State
  if (submitSuccess) {
    return (
      <div className="cio-nomination-container">
        <section className="cio-form-section my-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-green-50 text-green-700">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-[#0c1e21]">Response Received!</h2>
          <p className="mx-auto max-w-lg text-base text-[#687477]">
            {form.settings?.successMessage ||
              'Thank you! Your submission has been securely recorded.'}
          </p>
          {form.settings?.redirectUrl && (
            <p className="mt-4 flex items-center justify-center gap-1 text-sm text-[#8e0101]">
              <span>Redirecting you to next page</span>
              <ArrowRight size={14} />
            </p>
          )}
        </section>
      </div>
    );
  }

  const questions = Array.isArray(form.questions) ? form.questions : [];

  // Active Interactive Form
  return (
    <div className="cio-nomination-container">
      <header className="cio-form-header">
        <span className="cio-form-eyebrow">CORE Media</span>
        <h1>{form.name}</h1>
        {form.description && <p className="whitespace-pre-line">{form.description}</p>}
        <div className="cio-form-notice">
          Fields marked with <span className="cio-required">*</span> are required.
        </div>
      </header>

      {/* Submission Error Banner */}
      {submitError && (
        <div className="cio-form-error mb-6 flex items-start gap-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Questions Form */}
      <form onSubmit={handleSubmit} className="cio-nomination-form">
        {SECTION_GROUPS.map((section) => {
          const sectionQuestions = questions.slice(
            section.start,
            Math.min(section.end, questions.length),
          );

          if (sectionQuestions.length === 0) return null;

          return (
            <section className="cio-form-section" key={section.number}>
              <div className="cio-section-heading cio-field-full">
                <span className="cio-section-number">{section.number}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </div>
              </div>
              <div className="cio-form-grid">
                {sectionQuestions.map((q: FormQuestionPublic, sectionIdx: number) => {
                  const idx = section.start + sectionIdx;
                  const isHalf = q.width === 'half';
                  const isNameField = isNameQuestion(q);
                  const hasWordLimit = isWordLimitedQuestion(q, idx);
                  const isRequired = isQuestionRequired(q, idx);
                  const isDigitsOnly = isDigitsOnlyQuestion(q, idx);
                  const error = fieldErrors[q.key];
                  const isChoice =
                    q.type === FormFieldType.RADIO || q.type === FormFieldType.MULTIPLE_CHOICE;
                  const isFullWidth = q.type === FormFieldType.PARAGRAPH || isChoice || !isHalf;
                  const inputId = `dynamic-form-${q.key}`;

                  return (
                    <React.Fragment key={q.key || idx}>
                      {section.number === '02' && idx === 13 && (
                        <div className="cio-subheading cio-field-full">
                          <h3>Social Media Handles</h3>
                        </div>
                      )}
                      {section.number === '02' && idx === 17 && (
                        <div className="cio-subheading cio-field-full">
                          <h3>Reporting Manager Details</h3>
                        </div>
                      )}
                      {idx === 32 && (
                        <div className="cio-subheading cio-field-full">
                          <h3>Direct Report 1</h3>
                        </div>
                      )}
                      {idx === 35 && (
                        <div className="cio-subheading cio-field-full">
                          <h3>Direct Report 2</h3>
                        </div>
                      )}
                      {idx === 38 && (
                        <div className="cio-subheading cio-field-full">
                          <h3>Direct Report 3</h3>
                        </div>
                      )}
                      {idx === 41 && (
                        <div className="cio-subheading cio-field-full">
                          <h3>Direct Report 4</h3>
                        </div>
                      )}
                      <div
                        className={`cio-field ${isFullWidth ? 'cio-field-full' : ''} ${
                          idx >= 44 && idx <= 47 ? 'cio-link-field' : ''
                        }`}
                      >
                        {idx === 44 && <h3 className="cio-subheading">Case Studies</h3>}
                        {idx === 45 && <h3 className="cio-subheading">Interviews</h3>}
                        {idx === 46 && <h3 className="cio-subheading">Awards by Business</h3>}
                        {idx === 47 && (
                          <h3 className="cio-subheading">Awards by Technology Media</h3>
                        )}
                        <label htmlFor={inputId}>
                          {q.label}
                          {isRequired && <span className="cio-required"> *</span>}
                        </label>

                        {q.description && <p className="cio-field-description">{q.description}</p>}

                        {q.type === FormFieldType.SINGLE_INPUT && (
                          <input
                            id={inputId}
                            type="text"
                            inputMode={isDigitsOnly ? 'numeric' : undefined}
                            maxLength={
                              q.validation?.maxLength === undefined
                                ? isNameField
                                  ? 200
                                  : undefined
                                : Math.min(
                                    q.validation.maxLength,
                                    isNameField ? 200 : q.validation.maxLength,
                                  )
                            }
                            value={String(answers[q.key] || '')}
                            onChange={(e) => {
                              const value = isDigitsOnly
                                ? e.target.value.replace(/\D/g, '')
                                : isNameField
                                  ? e.target.value.replace(/\d/g, '').slice(0, 200)
                                  : hasWordLimit
                                    ? limitWords(e.target.value, MAX_SECTION_WORDS)
                                    : e.target.value;
                              handleAnswerChange(q.key, value);
                            }}
                            placeholder={q.placeholder || 'Your answer'}
                          />
                        )}

                        {q.type === FormFieldType.PARAGRAPH && (
                          <textarea
                            id={inputId}
                            rows={4}
                            value={String(answers[q.key] || '')}
                            onChange={(e) =>
                              handleAnswerChange(
                                q.key,
                                hasWordLimit
                                  ? limitWords(e.target.value, MAX_SECTION_WORDS)
                                  : e.target.value,
                              )
                            }
                            placeholder={q.placeholder || 'Your long answer...'}
                          />
                        )}
                        {hasWordLimit && q.type === FormFieldType.PARAGRAPH && (
                          <p className="cio-field-hint">
                            {countWords(String(answers[q.key] || ''))}/{MAX_SECTION_WORDS} words
                            maximum
                          </p>
                        )}

                        {q.type === FormFieldType.EMAIL && (
                          <input
                            id={inputId}
                            type="email"
                            value={String(answers[q.key] || '')}
                            onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                            placeholder={q.placeholder || 'name@example.com'}
                          />
                        )}

                        {q.type === FormFieldType.PHONE && (
                          <div>
                            <input
                              id={inputId}
                              type="tel"
                              maxLength={12}
                              pattern="[0-9]{8,12}"
                              value={String(answers[q.key] || '')}
                              onChange={(e) => {
                                const clean = e.target.value.replace(/[^0-9]/g, '').slice(0, 12);
                                handleAnswerChange(q.key, clean);
                              }}
                              placeholder={q.placeholder || 'e.g. 501234567 (8-12 digits)'}
                            />
                            <div className="cio-field-hint flex items-center justify-between">
                              <span>Must be between 8 and 12 numeric digits</span>
                              <span>
                                {String(answers[q.key] || '').replace(/[^0-9]/g, '').length}/12
                              </span>
                            </div>
                          </div>
                        )}

                        {q.type === FormFieldType.NUMBER && (
                          <input
                            id={inputId}
                            type="number"
                            inputMode={isDigitsOnly ? 'numeric' : undefined}
                            min={q.validation?.min}
                            max={q.validation?.max}
                            value={String(answers[q.key] ?? '')}
                            onChange={(e) =>
                              handleAnswerChange(
                                q.key,
                                isDigitsOnly ? e.target.value.replace(/\D/g, '') : e.target.value,
                              )
                            }
                            placeholder={q.placeholder || '0'}
                          />
                        )}

                        {q.type === FormFieldType.DATE && (
                          <DatePicker
                            value={String(answers[q.key] || '')}
                            onChange={(dateStr) => handleAnswerChange(q.key, dateStr)}
                            placeholder={q.placeholder || 'Select date'}
                            hasError={!!error}
                          />
                        )}

                        {q.type === FormFieldType.SINGLE_SELECT && (
                          <select
                            id={inputId}
                            value={String(answers[q.key] || '')}
                            onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                          >
                            <option value="">Select an option</option>
                            {(q.options || []).map((opt, optIdx) => (
                              <option key={optIdx} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {q.type === FormFieldType.RADIO && (
                          <div className="cio-radio-group">
                            {(q.options || []).map((opt, optIdx) => {
                              const isSelected = answers[q.key] === opt.value;

                              return (
                                <label key={optIdx} className="cio-radio-option">
                                  <input
                                    id={optIdx === 0 ? inputId : undefined}
                                    type="radio"
                                    name={`form_radio_${q.key}`}
                                    value={opt.value}
                                    checked={isSelected}
                                    onChange={() => handleAnswerChange(q.key, opt.value)}
                                  />
                                  <span>{opt.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}

                        {q.type === FormFieldType.MULTIPLE_CHOICE && (
                          <div className="cio-radio-group">
                            {(q.options || []).map((opt, optIdx) => {
                              const selectedArr = Array.isArray(answers[q.key])
                                ? (answers[q.key] as string[])
                                : [];
                              const isChecked = selectedArr.includes(opt.value);

                              return (
                                <label key={optIdx} className="cio-radio-option">
                                  <input
                                    id={optIdx === 0 ? inputId : undefined}
                                    type="checkbox"
                                    value={opt.value}
                                    checked={isChecked}
                                    onChange={() => handleCheckboxToggle(q.key, opt.value)}
                                  />
                                  <span>{opt.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}

                        {error && (
                          <p className="cio-dynamic-field-error" role="alert">
                            <AlertCircle size={14} />
                            {error}
                          </p>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </section>
          );
        })}
        {questions.length === 0 && (
          <section className="cio-form-section">
            <p className="cio-form-error">This form does not have any questions yet.</p>
          </section>
        )}

        <section className="cio-form-section cio-instructions">
          <h2>Instructions for Completing This Form</h2>

          <ol>
            <li>
              While it is not compulsory, please try to complete all fields and answer all questions
              to provide the information required for the evaluation.
            </li>
            <li>All forms must be completed in English.</li>
            <li>
              The original submission deadline was 25 May 2026. Please confirm the current
              nomination cycle before submitting.
            </li>
            {/* <li>
                For questions about the entry form, contact{' '}
                <a href="mailto:contact@core-mediagroup.com">contact@core-mediagroup.com</a>.
              </li> */}

            <li>
              For questions about the entry form, contact{' '}
              <a
                href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=contact@core-mediagroup.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact@core-mediagroup.com
              </a>
              .
            </li>
          </ol>
        </section>

        {/* Submit Button */}
        <div className="cio-form-actions">
          {/* <div className="flex items-center gap-2 text-xs text-[#687477]">
            <Lock size={14} className="text-[#8e0101]" />
            <span>Submissions are securely recorded.</span>
          </div> */}
          {form.settings?.captchaEnabled && (
            <div className="contact-captcha cio-form-captcha">
              <label className="captcha-title">CAPTCHA *</label>

              <div
                className={`custom-captcha ${
                  captchaStatus === 'verified' ? 'custom-captcha-verified' : ''
                } ${captchaStatus === 'error' ? 'custom-captcha-error' : ''}`}
                aria-live="polite"
              >
                <div
                  className={`captcha-check ${
                    captchaStatus === 'verified' ? 'captcha-check-success' : ''
                  } ${captchaStatus === 'verifying' ? 'captcha-check-loading' : ''}`}
                >
                  {captchaStatus === 'verified' ? (
                    <ShieldCheck size={22} />
                  ) : captchaStatus === 'verifying' ? (
                    <RefreshCw size={20} className="captcha-spin" />
                  ) : (
                    <span />
                  )}
                </div>

                <div className="captcha-content">
                  <strong>
                    {captchaStatus === 'verified'
                      ? 'Verification successful'
                      : captchaStatus === 'verifying'
                        ? 'Verifying...'
                        : captchaStatus === 'error'
                          ? turnstileSiteKey
                            ? 'Verification failed'
                            : 'Verification unavailable'
                          : 'Verify you are human'}
                  </strong>
                  <small>
                    {captchaStatus === 'verified'
                      ? 'You can now submit the form.'
                      : captchaStatus === 'verifying'
                        ? 'Checking your request.'
                        : captchaStatus === 'error'
                          ? turnstileSiteKey
                            ? 'Please try again.'
                            : 'Please contact support.'
                          : 'Click to complete the security check.'}
                  </small>
                </div>

                {captchaStatus !== 'verified' ? (
                  <button
                    type="button"
                    className="captcha-verify-button"
                    onClick={startCaptchaVerification}
                    disabled={
                      !turnstileSiteKey ||
                      captchaStatus === 'loading' ||
                      captchaStatus === 'verifying' ||
                      isSubmitting
                    }
                  >
                    {captchaStatus === 'loading'
                      ? 'Loading...'
                      : captchaStatus === 'verifying'
                        ? 'Checking...'
                        : captchaStatus === 'error'
                          ? 'Try again'
                          : 'I’m human'}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="captcha-refresh-icon-button"
                    onClick={resetCaptcha}
                    disabled={isSubmitting}
                    aria-label="Refresh CAPTCHA"
                  >
                    <RefreshCw size={18} />
                  </button>
                )}
              </div>

              <div ref={turnstileContainerRef} className="turnstile-invisible" aria-hidden="true" />
            </div>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting ||
              questions.length === 0 ||
              (form.settings?.captchaEnabled === true && !captchaToken)
            }
            className="cio-submit-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Recording Response...</span>
              </>
            ) : (
              <span>{form.settings?.submitButtonText || 'Submit Response'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
