import { getEssays, SUBSTACK_URL } from '@/lib/substack';
import SubscribeBand from '@/components/SubscribeBand';

// Rita publishes on Substack; the room refreshes itself once a day.
export const revalidate = 86400;

export const metadata = {
  title: 'The Reading Room',
  description:
    'Essays from Connecting Truth to Culture — three years of them, free to read.',
};

export default async function ReadingPage() {
  const { essays } = await getEssays(6);

  return (
    <div style={{ paddingTop: 120 }}>
      <section className="page-head">
        <div className="glow glow-left" />
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          <div className="kicker">The Reading Room</div>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            FULL ARCHIVE ON SUBSTACK →
          </a>
        </div>
        <h1 className="page-title">
          Essays That
          <br />
          Feed The Work
        </h1>
        <div className="tagline" style={{ marginTop: 14, position: 'relative' }}>
          from Connecting Truth to Culture, three years of them
        </div>
      </section>

      <section className="section" style={{ padding: '80px var(--pad-x)' }}>
        <div className="grid-hairline">
          {essays.map((essay) => (
            <a
              key={essay.link + essay.title}
              href={essay.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cell"
              style={{ padding: '32px 28px 38px', gap: 14, minHeight: 250 }}
            >
              <div
                className="mono"
                style={{ fontSize: 9, letterSpacing: '.18em', color: 'var(--ink-40)' }}
              >
                {essay.dateLabel}
              </div>
              <div className="serif" style={{ fontSize: 27, lineHeight: 1.15 }}>
                {essay.title}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-55)' }}>
                {essay.dek}
              </div>
              <div
                className="mono"
                style={{
                  marginTop: 'auto',
                  fontSize: 9.5,
                  letterSpacing: '.16em',
                  color: 'var(--accent)',
                }}
              >
                READ →
              </div>
            </a>
          ))}
        </div>

        <SubscribeBand />
      </section>
    </div>
  );
}
