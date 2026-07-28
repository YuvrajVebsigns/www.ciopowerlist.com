'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { submitWebsiteContact } from '@/services/contacts.service';

const SERVICE_OPTIONS = [
  'Business Strategy',
  'Customer Experience',
  'CIO Events & Conferences',
  'Brand Recognition',
  'Video Content',
];

export default function ContactSection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!popupMessage) return;

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [popupMessage]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedService = service.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedService || !trimmedMessage) {
      setPopupMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setPopupMessage(null);

    try {
      await submitWebsiteContact({
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        service: trimmedService,
        message: trimmedMessage,
      });

      setPopupMessage('Thank you! Your message has been received.');
      setFullName('');
      setEmail('');
      setPhone('');
      setService('');
      setMessage('');
    } catch (error) {
      setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <section className="contact-section" id="contact-section">
      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-map-area">
          <div className="contact-map">
            <Image
              src="/assets/map3.png"
              alt="Global Map"
              width={700}
              height={500}
              className="contact-map-img"
              priority
            />

            {/* Dots */}
            <span className="map-dot dot-1"></span>
            <span className="map-label label-1">India</span>

            <span className="map-dot dot-2"></span>
            <span className="map-label label-2">Dubai</span>

            <span className="map-dot dot-3"></span>
            <span className="map-label label-3">Singapur</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-form-area">
          {popupMessage ? (
            <div className="contact-popup" role="status" aria-live="polite">
              <span className="contact-popup-dot" aria-hidden="true" />
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

          {/* Badge */}
          <div className="contact-badge">⬢ GET IN TOUCH</div>

          {/* Title */}
          {/* <h2 className="contact-title">Let’s Start a Conversation</h2> */}

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-grid">
              {/* FULL NAME */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={fullName}
                required
                pattern="^[A-Za-z\s]+$"
                title="Only alphabets are allowed"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(e) => setFullName(e.target.value)}
              />

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={email}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* PHONE NUMBER */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={phone}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                }}
                onChange={(e) => setPhone(e.target.value)}
              />

              {/* SELECT */}
              <select required value={service} onChange={(e) => setService(e.target.value)}>
                <option value="" disabled>
                  Select a Service *
                </option>

                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* MESSAGE */}
            <textarea
              rows={6}
              placeholder="Your Message *"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* BUTTON */}
            <button type="submit" className="contact-btn" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending...' : 'Submit '}</span>

              <span className="contact-btn-icon">
                <ArrowUpRight size={18} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
