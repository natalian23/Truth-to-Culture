import Link from 'next/link';
import { APP_SECTION_ID } from '@/lib/appSection';

export const metadata = {
  title: 'Testimonials',
  description: 'What changed for the students who took The Mindset Shift.',
};

/**
 * PLACEHOLDER QUOTES — swap in real testimonials from Rita's students before
 * launch. The footnote under the grid stays until they are real.
 */
const STORIES = [
  {
    tag: 'STUDENT · SEASON 1',
    quote: 'I caught the sentence I’d been rehearsing for years. Naming it changed everything.',
    who: 'PLACEHOLDER',
  },
  {
    tag: 'STUDENT · SEASON 2',
    quote: 'Six minutes a day sounded too small to matter. It’s the first thing I’ve ever kept.',
    who: 'PLACEHOLDER',
  },
  {
    tag: 'MENTEE',
    quote: 'Rita doesn’t tell you what to think. She shows you how you’ve been thinking.',
    who: 'PLACEHOLDER',
  },
  {
    tag: 'STUDENT · SEASON 1',
    quote: 'I stopped needing the room’s approval to make a decision. That’s new for me.',
    who: 'PLACEHOLDER',
  },
];

export default function TestimonialsPage() {
  return (
    <div style={{ paddingTop: 120 }}>
      <section className="page-head" style={{ padding: '40px var(--pad-x) 80px' }}>
        <div className="glow glow-right" />
        <div className="kicker" style={{ position: 'relative' }}>
          Testimonials
        </div>
        <h1 className="page-title">
          What Changed
          <br />
          For Them
        </h1>
      </section>

      <section className="section" style={{ padding: '80px var(--pad-x)' }}>
        <div className="grid-hairline">
          {STORIES.map((s, i) => (
            <div
              className="cell"
              key={i}
              style={{ padding: '36px 30px 42px', gap: 18, minHeight: 260 }}
            >
              <div
                className="mono"
                style={{ fontSize: 9, letterSpacing: '.18em', color: 'var(--ink-40)' }}
              >
                {s.tag}
              </div>
              <p className="serif" style={{ margin: 0, fontSize: 23, lineHeight: 1.35 }}>
                &ldquo;{s.quote}&rdquo;
              </p>
              <div
                className="mono"
                style={{
                  marginTop: 'auto',
                  fontSize: 9.5,
                  letterSpacing: '.16em',
                  color: 'var(--accent)',
                }}
              >
                {s.who}
              </div>
            </div>
          ))}
        </div>
        <p className="footnote" style={{ margin: '22px 0 0' }}>
          PLACEHOLDER QUOTES · SWAP IN REAL TESTIMONIALS FROM RITA&rsquo;S STUDENTS
        </p>
      </section>

      <section style={{ padding: '100px var(--pad-x)', textAlign: 'center' }}>
        <p
          className="serif"
          style={{
            margin: '0 auto 36px',
            maxWidth: '22ch',
            fontSize: 'clamp(26px,3.4vw,48px)',
            lineHeight: 1.2,
          }}
        >
          Your story could be next.
        </p>
        <Link href={`/#${APP_SECTION_ID}`} className="pill pill-solid pill-wide">
          Get the app
        </Link>
      </section>
    </div>
  );
}
