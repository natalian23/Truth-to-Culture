'use client';

import { useState } from 'react';
import { SUBSTACK_URL } from '@/lib/substack';

/** Hands the address to Substack's own subscribe flow, prefilled. */
export default function SubscribeBand() {
  const [email, setEmail] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const url = new URL('/subscribe', SUBSTACK_URL);
    if (email) url.searchParams.set('email', email);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        marginTop: 40,
        border: '1px solid var(--hair-16)',
        padding: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 30,
        flexWrap: 'wrap',
      }}
    >
      <div>
        <div
          className="display"
          style={{ fontSize: 28, letterSpacing: '.01em' }}
        >
          Get the essays in your inbox
        </div>
        <div style={{ marginTop: 6, fontSize: 14, color: 'var(--ink-55)' }}>
          Free, from her Substack. Practical tools that turn truth into action.
        </div>
      </div>
      <form onSubmit={submit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <label htmlFor="subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="subscribe-email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="field field-pill"
          style={{ minWidth: 240 }}
        />
        <button
          type="submit"
          className="pill pill-solid"
          style={{ padding: '15px 24px', fontSize: 14.5 }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
