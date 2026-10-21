'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  websiteFormsService,
  PublicCustomForm,
  FormFieldType,
  FormQuestionPublic,
} from '@/services/forms.service';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import DatePicker from './DatePicker';

interface DynamicFormProps {
  slug: string;
}

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

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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
    if (!form?.settings?.captchaEnabled || !turnstileSiteKey) {
      return;
    }

    const initTurnstile = () => {
      if (!window.turnstile || !turnstileContainerRef.current) return;
      if (turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }

      const widgetId = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        theme: 'dark',
        callback: (token: string) => {
          setCaptchaToken(token);
          setSubmitError(null);
        },
        'expired-callback': () => {
          setCaptchaToken(null);
        },
        'error-callback': () => {
          setCaptchaToken(null);
        },
      });
      turnstileWidgetIdRef.current = widgetId;
    };

    const existingScript = document.querySelector('script[data-cloudflare-turnstile="true"]');

    if (window.turnstile) {
      initTurnstile();
    } else if (existingScript) {
      existingScript.addEventListener('load', initTurnstile);
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-cloudflare-turnstile', 'true');
      script.addEventListener('load', initTurnstile);
      document.head.appendChild(script);
    }

    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // ignore cleanup error
        }
        turnstileWidgetIdRef.current = null;
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

    for (const q of form.questions || []) {
      const val = answers[q.key];
      const isMissing =
        val === undefined ||
        val === null ||
        (typeof val === 'string' && val.trim() === '') ||
        (Array.isArray(val) && val.length === 0);

      // 1. Required Check
      if (q.validation?.required && isMissing) {
        errors[q.key] = q.validation.customErrorMessage || `${q.label} is required.`;
        continue;
      }

      if (isMissing) continue;

      // 2. Type-specific checks
      if (q.type === FormFieldType.EMAIL) {
        const str = String(val).trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
          errors[q.key] = q.validation?.customErrorMessage || 'Please enter a valid email address.';
        }
      }

      // 3. PHONE CHECK: Enforce required 8 to 12 digits
      if (q.type === FormFieldType.PHONE) {
        const digits = String(val).replace(/[^0-9]/g, '');
        if (digits.length < 8 || digits.length > 12) {
          errors[q.key] =
            q.validation?.customErrorMessage || 'Phone number must be between 8 and 12 digits.';
        }
      }

      if (q.type === FormFieldType.SINGLE_INPUT || q.type === FormFieldType.PARAGRAPH) {
        const str = String(val).trim();
        if (q.validation?.minLength !== undefined && str.length < q.validation.minLength) {
          errors[q.key] =
            q.validation?.customErrorMessage ||
            `${q.label} must be at least ${q.validation.minLength} characters.`;
        } else if (q.validation?.maxLength !== undefined && str.length > q.validation.maxLength) {
          errors[q.key] =
            q.validation?.customErrorMessage ||
            `${q.label} must not exceed ${q.validation.maxLength} characters.`;
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

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || isSubmitting) return;

    if (!validateClient()) {
      setSubmitError('Please correct the highlighted fields before submitting.');
      return;
    }

    if (form.settings?.captchaEnabled && turnstileSiteKey && !captchaToken) {
      setSubmitError('Please complete the security verification challenge.');
      return;
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
        <section className="cio-form-section">
          <div className="cio-section-heading">
            <span className="cio-section-number">01</span>
            <div>
              <h2>Form questions</h2>
              <p>Complete the required fields below.</p>
            </div>
          </div>
          <div className="cio-form-grid">
            {questions.map((q: FormQuestionPublic, idx: number) => {
              const isHalf = q.width === 'half';
              const error = fieldErrors[q.key];
              const isChoice =
                q.type === FormFieldType.RADIO || q.type === FormFieldType.MULTIPLE_CHOICE;
              const isFullWidth = q.type === FormFieldType.PARAGRAPH || isChoice || !isHalf;
              const inputId = `dynamic-form-${q.key}`;

              return (
                <div
                  key={q.key || idx}
                  className={`cio-field ${isFullWidth ? 'cio-field-full' : ''}`}
                >
                  <label htmlFor={inputId}>
                    {q.label}
                    {q.validation?.required && <span className="cio-required"> *</span>}
                  </label>

                  {q.description && <p className="cio-field-description">{q.description}</p>}

                  {q.type === FormFieldType.SINGLE_INPUT && (
                    <input
                      id={inputId}
                      type="text"
                      value={String(answers[q.key] || '')}
                      onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                      placeholder={q.placeholder || 'Your answer'}
                    />
                  )}

                  {q.type === FormFieldType.PARAGRAPH && (
                    <textarea
                      id={inputId}
                      rows={4}
                      value={String(answers[q.key] || '')}
                      onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                      placeholder={q.placeholder || 'Your long answer...'}
                    />
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
                        <span>{String(answers[q.key] || '').replace(/[^0-9]/g, '').length}/12</span>
                      </div>
                    </div>
                  )}

                  {q.type === FormFieldType.NUMBER && (
                    <input
                      id={inputId}
                      type="number"
                      min={q.validation?.min}
                      max={q.validation?.max}
                      value={String(answers[q.key] ?? '')}
                      onChange={(e) => handleAnswerChange(q.key, e.target.value)}
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
              );
            })}
          </div>
          {questions.length === 0 && (
            <p className="cio-form-error">This form does not have any questions yet.</p>
          )}
        </section>

        {/* Turnstile Container */}
        {form.settings?.captchaEnabled && turnstileSiteKey && (
          <div className="flex flex-col items-center">
            <div ref={turnstileContainerRef} />
          </div>
        )}

        {/* Submit Button */}
        <div className="cio-form-actions">
          {/* <div className="flex items-center gap-2 text-xs text-[#687477]">
            <Lock size={14} className="text-[#8e0101]" />
            <span>Submissions are securely recorded.</span>
          </div> */}

          <button
            type="submit"
            disabled={isSubmitting || questions.length === 0}
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
