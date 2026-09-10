import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Rita Wright',
  description:
    'Rita Wright — third-year Princeton Theological Seminary student, certified Youth Mental Health Advocate, and founder of Truth to Culture.',
};

/* Client-approved copy — verbatim, do not rewrite. */
const BIO = [
  'Rita Wright is currently in her third year at Princeton Theological Seminary and is a certified Youth Mental Health Advocate. A stay-at-home mother, Mrs. Wright answered God’s call to return to school in the fall of 2024 at the age of 51.',
  'Her journey, however, began long before seminary. As a child, Wright experienced God in ways that were not conventional, often encountering God through her dreams. Without the framework of a traditional religious upbringing, Wright’s relationship with God was formed outside the boundaries of religion. Her faith was built on relationship and revelation, long before she learned the theology, history, and language that would later provide her context for those experiences.',
  'Throughout her journey, Mrs. Wright has remained grounded in one central conviction: revelation is more important than information. Information can teach us about God, but revelation transforms how we see God, how we see ourselves, and how we see the world around us.',
  'That distinction between what we know and how what we know transforms the way we see has fueled Mrs. Wright’s deep fascination with mindset. She believes that how we see ourselves shapes how we live, what we believe is possible, and ultimately how we respond to who God has called us to be.',
];

const LETTER = [
  { text: 'For years, people have asked me, “Why do you think the way you think?” and, more importantly, “How can you help me think differently?” A friend once told me that I needed to “bottle it up and sell it.” At the time, I didn’t know how. Eventually, I began putting those ideas into a class, creating a way to help others recognize the mindsets and beliefs shaping their lives and discover a different way of seeing themselves.' },
  { text: 'That desire to help people has continued to expand. Through my studies and internship, I pursued mental health training and certification that equipped me to support young people. Whether I am teaching, mentoring, studying theology, or simply sitting across from someone who needs encouragement, the heart behind it is the same:' },
  { text: 'I want to help people see themselves the way God sees them.', pull: true },
  { text: 'Today, that mission is taking another unexpected and creative turn. With the help of my son, I am exploring Disney as a mission field, a place to demonstrate how creativity, imagination, wonder, and possibility can be byproducts of faith.' },
  { text: 'I am learning that perhaps God did not call me to seminary at 50 because I was late. Perhaps He called me because everything that came before it was preparation.' },
  { text: 'The dreams. The questions. The unconventional journey of faith. The fascination with mindset. The desire to help young people. The class. The creativity. The imagination.' },
  { text: 'I may not yet know exactly where all of it is leading, but I know the thread connecting it: helping people encounter God beyond religion, renew the way they think, and begin to see themselves through the eyes of the One who created them.' },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 120 }}>
      <section className="page-head">
        <div className="glow glow-right" />
        <div className="kicker" style={{ position: 'relative' }}>
          About
        </div>
        <h1 className="page-title">Rita Wright</h1>
        <div className="tagline" style={{ marginTop: 14, position: 'relative' }}>
          revelation is more important than information
        </div>
      </section>

      <section
        className="section"
        style={{
          padding: '90px var(--pad-x)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: 64,
          alignItems: 'start',
        }}
      >
        <div style={{ position: 'sticky', top: 110 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 440,
              aspectRatio: '4 / 5',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <Image
              src="/rita-wright.jpeg"
              alt="Rita Wright"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 440px"
              style={{
                objectFit: 'cover',
                filter: 'saturate(.85) contrast(1.05) brightness(.88)',
              }}
            />
            {/* Soft edge fade so the portrait sits into the page rather than on it. */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background:
                  'linear-gradient(180deg,rgba(8,9,10,.35),rgba(8,9,10,0) 30%,rgba(8,9,10,0) 55%,rgba(8,9,10,.75)),linear-gradient(90deg,rgba(8,9,10,.3),rgba(8,9,10,0) 25%,rgba(8,9,10,0) 75%,rgba(8,9,10,.3))',
              }}
            />
          </div>
          <div
            className="mono"
            style={{
              marginTop: 16,
              fontSize: 9.5,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--ink-40)',
            }}
          >
            Rita Wright · Founder
          </div>
        </div>

        <div
          style={{
            maxWidth: '64ch',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--ink-78)',
          }}
        >
          {BIO.map((p, i) => (
            <p key={i} style={{ margin: 0 }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          className="display"
          style={{
            position: 'absolute',
            left: '-2vw',
            top: '8%',
            fontSize: 'min(30vw,380px)',
            lineHeight: 1,
            color: 'rgba(191,211,222,.04)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          In Her
          <br />
          Words
        </div>
        <div className="kicker" style={{ marginBottom: 44, position: 'relative' }}>
          In her words
        </div>
        <div
          style={{
            maxWidth: '66ch',
            marginLeft: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            fontSize: 16,
            lineHeight: 1.8,
            color: 'var(--ink-78)',
            position: 'relative',
          }}
        >
          {LETTER.map((p, i) =>
            p.pull ? (
              <p
                key={i}
                className="serif-i"
                style={{
                  margin: 0,
                  fontSize: 'clamp(24px,3vw,38px)',
                  lineHeight: 1.3,
                  color: 'var(--accent)',
                }}
              >
                {p.text}
              </p>
            ) : (
              <p key={i} style={{ margin: 0 }}>
                {p.text}
              </p>
            )
          )}
        </div>
      </section>

      <section style={{ padding: '100px var(--pad-x)', textAlign: 'center' }}>
        <p
          className="serif"
          style={{
            margin: '0 auto 36px',
            maxWidth: '24ch',
            fontSize: 'clamp(26px,3.4vw,48px)',
            lineHeight: 1.2,
          }}
        >
          The class became a course. The course became a world.
        </p>
        <Link href="/course" className="pill pill-solid pill-wide">
          See The Mindset Shift
        </Link>
      </section>
    </div>
  );
}
