'use client';

import { useEffect, useState } from 'react';
import type { Country } from 'react-phone-number-input';
import CountryCodeSelect, { getDialCodeFromCountry } from '@/components/CountryCodeSelect';
import { submitAttendeeRegistration } from '@/services/attendees.service';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

type EventItem = WebsiteEvent;

export default function RegisterPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<Country>('IN');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string | ''>('');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    countryCode?: string;
    phone?: string;
    organization?: string;
    selectedEvent?: string;
  }>({});

  useEffect(() => {
    fetchWebsiteEvents()
      .then((data: WebsiteEvent[]) => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  useEffect(() => {
    if (!popupMessage) return;

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [popupMessage]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: typeof errors = {};

    if (!name.trim()) {
      nextErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      nextErrors.name = 'Only alphabets are allowed.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email.';
    }

    const dialCode = getDialCodeFromCountry(country);
    if (!country || !dialCode) {
      nextErrors.countryCode = 'Please select a country code.';
    }

    const trimmedPhone = phone.trim();

    if (!trimmedPhone) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(trimmedPhone)) {
      nextErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!organization.trim()) {
      nextErrors.organization = 'Organization is required.';
    }

    if (!selectedEvent) {
      nextErrors.selectedEvent = 'Please select an event.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setPopupMessage('Please fix the errors above.');
      return;
    }

    setLoading(true);
    setPopupMessage(null);

    try {
      const response = await submitAttendeeRegistration({
        eventId: selectedEvent as string,
        name: name.trim(),
        email: email.trim(),
        phoneNumber: phone.trim(),
        countryCode: getDialCodeFromCountry(country),
        organization: organization.trim(),
      });

      const apiMessage =
        response && typeof response === 'object' && 'message' in response
          ? String((response as { message?: string }).message)
          : '';

      setPopupMessage(apiMessage || 'Registration successful — thank you!');

      setName('');
      setEmail('');
      setCountry('IN');
      setPhone('');
      setOrganization('');
      setSelectedEvent('');
      setErrors({});
    } catch (err) {
      setPopupMessage(err instanceof Error ? err.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="registration-section">
      <div className="registration-container">
        <div className="registration-wrapper">
          {popupMessage ? (
            <div className="registration-popup" role="status" aria-live="polite">
              <span className="registration-popup-dot" aria-hidden="true" />
              <p>{popupMessage}</p>
              <button
                type="button"
                onClick={() => setPopupMessage(null)}
                aria-label="Close message"
              >
                ×
              </button>
            </div>
          ) : null}

          <h2 className="registration-title">Event Registration</h2>

          <form onSubmit={handleSubmit} className="registration-form">
            <label className="registration-label">
              Name*
              <input
                type="text"
                placeholder="Full name"
                value={name}
                pattern="^[A-Za-z\s]+$"
                title="Only alphabets are allowed"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(e) => {
                  setName(e.target.value);

                  if (errors.name) {
                    setErrors({
                      ...errors,
                      name: undefined,
                    });
                  }
                }}
              />
              {errors.name && <div className="registration-error">{errors.name}</div>}
            </label>

            <label className="registration-label">
              Email*
              <input
                type="email"
                placeholder="your@company.com"
                value={email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (errors.email) {
                    setErrors({
                      ...errors,
                      email: undefined,
                    });
                  }
                }}
              />
              {errors.email && <div className="registration-error">{errors.email}</div>}
            </label>

            <label className="registration-label" htmlFor="registration-country-code">
              Country Code*
              <CountryCodeSelect
                id="registration-country-code"
                value={country}
                disabled={loading}
                onChange={(nextCountry) => {
                  setCountry(nextCountry ?? 'IN');

                  if (errors.countryCode) {
                    setErrors({
                      ...errors,
                      countryCode: undefined,
                    });
                  }
                }}
              />
              {errors.countryCode && <div className="registration-error">{errors.countryCode}</div>}
            </label>

            <label className="registration-label">
              Phone Number*
              <input
                type="tel"
                name="phoneNumber"
                placeholder="9XXXXXXXXX"
                value={phone}
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter exactly 10 digit phone number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10);
                }}
                onChange={(e) => {
                  setPhone(e.target.value);

                  if (errors.phone) {
                    setErrors({
                      ...errors,
                      phone: undefined,
                    });
                  }
                }}
              />
              {errors.phone && <div className="registration-error">{errors.phone}</div>}
            </label>

            <label className="registration-label">
              Organization*
              <input
                type="text"
                placeholder="Company name"
                value={organization}
                required
                onChange={(e) => {
                  setOrganization(e.target.value);

                  if (errors.organization) {
                    setErrors({
                      ...errors,
                      organization: undefined,
                    });
                  }
                }}
              />
              {errors.organization && (
                <div className="registration-error">{errors.organization}</div>
              )}
            </label>

            <label className="registration-label">
              Select Event*
              <select
                value={selectedEvent}
                onChange={(e) => {
                  setSelectedEvent(e.target.value || '');

                  if (errors.selectedEvent) {
                    setErrors({
                      ...errors,
                      selectedEvent: undefined,
                    });
                  }
                }}
              >
                <option value="">-- Select an event --</option>

                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
              {errors.selectedEvent && (
                <div className="registration-error">{errors.selectedEvent}</div>
              )}
            </label>

            <div className="registration-button-wrap">
              <button
                type="submit"
                className="registration-btn"
                disabled={
                  loading ||
                  !!errors.name ||
                  !!errors.email ||
                  !!errors.countryCode ||
                  !!errors.phone ||
                  !!errors.organization ||
                  !!errors.selectedEvent ||
                  !name ||
                  !email ||
                  !country ||
                  !getDialCodeFromCountry(country) ||
                  phone.length !== 10 ||
                  !organization.trim() ||
                  !selectedEvent
                }
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
