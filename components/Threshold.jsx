'use client';

import { useEffect, useState } from 'react';
import GraceRings from './GraceRings';

const QUOTES = [
  'The picture does not change. The frame does.',
  'Reading is great. Doing is greater.',
  'You set the tone.',
  'Today is a GREAT day.',
];

export const THRESHOLD_KEY = 'ttc.threshold.seen';

/**
 * The threshold: a fullscreen door that holds you for three seconds before the
 * world opens. Shown once per session; a blocking script in <head> hides the
 * server-rendered markup instantly on repeat visits so there is no flash.
 */
export default function Threshold() {
  const [phase, setPhase] = useState('open'); // open → closing → done
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(THRESHOLD_KEY) === '1';
    } catch {
      // Private mode or blocked storage: fall through and show the threshold.
    }

    if (seen) {
      setPhase('done');
      return;
    }

    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

    try {
      sessionStorage.setItem(THRESHOLD_KEY, '1');
    } catch {}

    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setPhase('closing'), 3000);
    const t2 = setTimeout(() => setPhase('done'), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (phase === 'done') document.body.style.overflow = '';
  }, [phase]);

  // Click anywhere to skip.
  const skip = () => {
    if (phase !== 'open') return;
    setPhase('closing');
    setTimeout(() => setPhase('done'), 700);
  };

  if (phase === 'done') return null;

  return (
    <div
      id="threshold"
      onClick={skip}
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 44,
        cursor: 'pointer',
        animation: phase === 'closing' ? 'ttc-doorfade .75s ease both' : 'none',
      }}
    >
      <GraceRings width={110} style={{ animation: 'ttc-pulse 3.2s ease-in-out infinite' }} />
      <div
        style={{
          textAlign: 'center',
          padding: '0 28px',
          animation: 'ttc-quotein 1.1s ease .3s both',
        }}
      >
        <div
          className="serif-i"
          style={{ fontSize: 'clamp(24px,3.4vw,44px)', lineHeight: 1.3, maxWidth: '26ch' }}
        >
          &ldquo;{quote}&rdquo;
        </div>
        <div
          className="mono"
          style={{
            marginTop: 20,
            fontSize: 10,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            color: 'var(--ink-40)',
          }}
        >
          Truth to Culture
        </div>
      </div>
      <div style={{ width: 200, height: 1, background: 'rgba(244,242,237,.15)', overflow: 'hidden' }}>
        <div style={{ height: 1, background: 'var(--accent)', animation: 'ttc-doorline 2.9s linear both' }} />
      </div>
    </div>
  );
}
