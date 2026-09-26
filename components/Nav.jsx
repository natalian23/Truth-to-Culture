'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GraceRings from './GraceRings';
import { scrollToAppSection } from '@/lib/appSection';

const PAGES = [
  { href: '/about', label: 'About' },
  { href: '/course', label: 'The Course' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/reading', label: 'Reading Room' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Fixed top bar. On desktop the page links sit inline; below 760px they
 * collapse behind a hamburger (three hairlines) into a drop-down panel.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Route change or Escape closes the panel.
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = PAGES.map((p) => {
    const active = pathname === p.href;
    return (
      <Link
        key={p.href}
        href={p.href}
        aria-current={active ? 'page' : undefined}
        className="nav-link"
        style={{
          color: active ? 'var(--accent)' : 'var(--ink)',
          borderBottom: `1px solid ${active ? 'var(--accent)' : 'transparent'}`,
        }}
      >
        {p.label}
      </Link>
    );
  });

  const cta = (
    <Link
      href="/#app-section"
      onClick={(e) => { setOpen(false); scrollToAppSection(e); }}
      className="nav-cta"
    >
      Get the app
    </Link>
  );

  return (
    <nav className="nav" data-open={open ? 'true' : 'false'}>
      <div className="nav-bar">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => setOpen(false)}>
          <GraceRings width={34} strokeWidth={8} dots={3} dotRadius={4.8} />
          <span className="mono" style={{ fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase' }}>
            Truth to Culture
          </span>
        </Link>

        <div className="nav-links mono">
          {links}
          {cta}
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="nav-panel" className="nav-panel mono" aria-hidden={!open}>
        {links}
        <div style={{ paddingTop: 8 }}>{cta}</div>
      </div>
    </nav>
  );
}
