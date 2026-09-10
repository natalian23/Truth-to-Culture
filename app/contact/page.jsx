import ContactForm, { CONTACT_EMAIL } from '@/components/ContactForm';
import { SUBSTACK_URL } from '@/lib/substack';

export const metadata = {
  title: 'Contact',
  description: 'Questions, speaking, mentoring, or just to talk.',
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 120 }}>
      <section className="page-head">
        <div className="glow glow-right" />
        <div className="kicker" style={{ position: 'relative' }}>
          Contact
        </div>
        <h1 className="page-title">
          Say It
          <br />
          Out Loud
        </h1>
        <div className="tagline" style={{ marginTop: 14, position: 'relative' }}>
          questions, speaking, mentoring, or just to talk
        </div>
      </section>

      <section
        className="section"
        style={{
          padding: '90px var(--pad-x)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: 64,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div>
            <div
              className="mono"
              style={{ fontSize: 9.5, letterSpacing: '.2em', color: 'var(--ink-45)' }}
            >
              EMAIL
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="serif"
              style={{
                display: 'block',
                marginTop: 8,
                fontSize: 'clamp(22px,2.6vw,32px)',
                color: 'var(--ink)',
              }}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <div
              className="mono"
              style={{ fontSize: 9.5, letterSpacing: '.2em', color: 'var(--ink-45)' }}
            >
              ELSEWHERE
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="chip"
                style={{ color: 'var(--ink)' }}
              >
                Substack
              </a>
              {/* Dimmed until Rita's channels are live. */}
              <span className="chip">YouTube</span>
              <span className="chip">Instagram</span>
            </div>
          </div>

          <p
            style={{
              margin: '8px 0 0',
              maxWidth: '44ch',
              fontSize: 14,
              lineHeight: 1.7,
              color: 'var(--ink-50)',
            }}
          >
            For speaking and mentoring inquiries, include dates and a little about your community.
            Rita reads everything.
          </p>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
