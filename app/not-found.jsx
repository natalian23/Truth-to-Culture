import Link from 'next/link';
import GraceRings from '@/components/GraceRings';

export const metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <div style={{ paddingTop: 120 }}>
      <section
        style={{
          minHeight: '70vh',
          padding: '90px var(--pad-x)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 28,
        }}
      >
        <GraceRings width={72} />
        <h1 className="display" style={{ fontSize: 'clamp(48px,9vw,140px)', lineHeight: 0.82 }}>
          Nothing here
        </h1>
        <p className="serif-i" style={{ margin: 0, fontSize: 'clamp(20px,2.6vw,32px)', color: 'var(--accent)' }}>
          the page moved, or never was
        </p>
        <Link href="/" className="pill pill-solid pill-wide">
          Back to the beginning
        </Link>
      </section>
    </div>
  );
}
