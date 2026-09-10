'use client';

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

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        padding: '20px var(--pad-x)',
        background: 'linear-gradient(#08090A 30%,rgba(8,9,10,0))',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <GraceRings width={34} strokeWidth={8} dots={3} dotRadius={4.8} />
        <span
          className="mono"
          style={{ fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase' }}
        >
          Truth to Culture
        </span>
      </Link>

      <div
        className="mono"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          flexWrap: 'wrap',
          fontSize: 10.5,
          letterSpacing: '.16em',
          textTransform: 'uppercase',
        }}
      >
        {PAGES.map((p) => {
          const active = pathname === p.href;
          return (
            <Link
              key={p.href}
              href={p.href}
              aria-current={active ? 'page' : undefined}
              style={{
                color: active ? 'var(--accent)' : 'var(--ink)',
                borderBottom: `1px solid ${active ? 'var(--accent)' : 'transparent'}`,
                paddingBottom: 3,
              }}
            >
              {p.label}
            </Link>
          );
        })}
        <Link
          href="/#app-section"
          onClick={scrollToAppSection}
          style={{
            padding: '9px 16px',
            borderRadius: 999,
            background: 'var(--ink)',
            color: 'var(--bg)',
            letterSpacing: '.16em',
          }}
        >
          Get the app
        </Link>
      </div>
    </nav>
  );
}
