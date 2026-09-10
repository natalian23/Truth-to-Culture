import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ padding: '70px var(--pad-x) 60px', textAlign: 'center', position: 'relative' }}>
      {/* Client-approved disclaimer — verbatim, do not edit. */}
      <p
        style={{
          margin: '0 auto',
          maxWidth: '62ch',
          fontSize: 12.5,
          lineHeight: 1.7,
          color: 'var(--ink-38)',
        }}
      >
        I am not a trained therapist or medical doctor. You may need to seek professional medical help
        and that it is ok. Help is not a sign of weakness. It takes strength to admit you need help.
      </p>
      <div
        className="mono"
        style={{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
          fontSize: 10,
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-35)',
        }}
      >
        <span>© 2026 Truth to Culture</span>
        <a
          href="https://connected565.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--ink-35)' }}
        >
          Substack
        </a>
        <Link href="/contact" style={{ color: 'var(--ink-35)' }}>
          Contact
        </Link>
      </div>
    </footer>
  );
}
