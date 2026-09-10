'use client';

import { useState } from 'react';

export const CONTACT_EMAIL = 'hello@truthtoculture.com';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

/**
 * Posts to Formspree when NEXT_PUBLIC_FORMSPREE_ID is set. Until it is, the
 * form falls back to opening the visitor's mail client — the same stub the
 * prototype used, and the footnote says so.
 */
export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const mailto = (form) => {
    const body = `${form.message.value}\n\n— ${form.name.value} (${form.email.value})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Note from ${form.name.value || 'the website'}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!FORMSPREE_ID) {
      mailto(form);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      name="contact"
      className="framed"
      style={{ gap: 16 }}
    >
      <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.2em', color: 'var(--ink-45)' }}>
        WRITE A NOTE
      </div>

      <label htmlFor="contact-name" className="sr-only">
        Your name
      </label>
      <input
        id="contact-name"
        name="name"
        required
        placeholder="Your name"
        className="field"
        autoComplete="name"
      />

      <label htmlFor="contact-email" className="sr-only">
        Your email
      </label>
      <input
        id="contact-email"
        name="email"
        type="email"
        required
        placeholder="your@email.com"
        className="field"
        autoComplete="email"
      />

      <label htmlFor="contact-message" className="sr-only">
        Your message
      </label>
      <textarea
        id="contact-message"
        name="message"
        required
        rows={5}
        placeholder="What's on your mind?"
        className="field"
        style={{ resize: 'vertical' }}
      />

      <button
        type="submit"
        className="pill pill-solid"
        disabled={status === 'sending'}
        style={{
          padding: '16px 24px',
          fontSize: 14.5,
          justifyContent: 'center',
          opacity: status === 'sending' ? 0.6 : 1,
        }}
      >
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>

      <div className="footnote" style={{ fontSize: 8.5, letterSpacing: '.14em' }} aria-live="polite">
        {status === 'sent' && 'THANK YOU · RITA READS EVERYTHING'}
        {status === 'error' && `SOMETHING WENT WRONG · EMAIL ${CONTACT_EMAIL.toUpperCase()}`}
        {status !== 'sent' &&
          status !== 'error' &&
          (FORMSPREE_ID ? 'RITA READS EVERYTHING' : 'FORM CONNECTS AT LAUNCH · OPENS EMAIL FOR NOW')}
      </div>
    </form>
  );
}
