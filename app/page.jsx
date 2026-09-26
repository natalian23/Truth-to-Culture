import Link from 'next/link';
import GraceRings from '@/components/GraceRings';
import PhoneMock from '@/components/PhoneMock';
import MarkRings from '@/components/MarkRings';
import HashScroll from '@/components/HashScroll';
import { APP_SECTION_ID } from '@/lib/appSection';

const WORLD = [
  {
    kicker: 'THE APP',
    title: 'A daily practice, built from your intake',
    body: 'Describe your life in your own words. The path is built from what you wrote, one rep a day, and it never runs out.',
    cta: 'DOWNLOAD →',
    href: `/#${APP_SECTION_ID}`,
  },
  {
    kicker: 'THE COURSE',
    title: 'The Mindset Shift, and what comes after',
    body: '31 lessons across validation, information, preparation, expectation and discipline, taught by Rita, in her voice.',
    cta: 'SEE THE COURSE →',
    href: '/course',
  },
  {
    kicker: 'THE READING ROOM',
    title: 'Essays that feed the work',
    body: 'Rita writes between the lessons. Three years of essays from the Substack, free to read, straight into your inbox if you want them.',
    cta: 'START READING →',
    href: '/reading',
  },
];

const MARK_CHIPS = [
  { label: '8 · new beginnings' },
  { label: '5 · grace' },
  { label: '∞ · never finished' },
  { label: 'the overlap · where the work happens', accent: true },
];

export default function HomePage() {
  return (
    <>
      <HashScroll />

      {/* ---------- Hero ---------- */}
      <section
        style={{
          minHeight: '100vh',
          padding: '0 var(--pad-x) 70px',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          position: 'relative',
          borderBottom: '1px solid var(--hair)',
        }}
      >
        <div
          className="glow"
          style={{
            background:
              'radial-gradient(85% 60% at 78% 6%,rgba(191,211,222,.17),transparent 68%),radial-gradient(50% 40% at 8% 96%,rgba(191,211,222,.08),transparent 70%)',
          }}
        />
        {/* paddingBottom keeps the tagline row clear of the CTAs on short viewports. */}
        <div style={{ alignSelf: 'center', position: 'relative', paddingTop: 84, paddingBottom: 56 }}>
          <div
            className="mono"
            style={{
              fontSize: 10.5,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
              color: 'var(--ink-50)',
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <span>Courses · App · Reading Room</span>
          </div>

          <h1
            className="display"
            style={{
              margin: '22px 0 0',
              fontSize: 'clamp(72px,14.5vw,250px)',
              lineHeight: 0.78,
            }}
          >
            How You
            <br />
            Frame It Is
            <br />
            How You Fight It
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 48,
              flexWrap: 'wrap',
              marginTop: 22,
            }}
          >
            <div
              className="serif-i"
              style={{ fontSize: 'clamp(24px,3.4vw,46px)', lineHeight: 1, color: 'var(--accent)' }}
            >
              reading is great. doing is greater.
            </div>
            <p
              style={{
                maxWidth: '38ch',
                margin: 0,
                fontSize: 17,
                lineHeight: 1.55,
                color: 'var(--ink-72)',
                textWrap: 'pretty',
              }}
            >
              A world for changing your mindset. Courses that become daily practice, and a reading
              room that keeps you fed between reps.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          <Link href={`/#${APP_SECTION_ID}`} className="pill pill-solid">
            Get the app
            <span className="mono" style={{ fontSize: 11, letterSpacing: '.14em', opacity: 0.55 }}>
              iOS · ANDROID
            </span>
          </Link>
          <Link href="/reading" className="pill pill-outline">
            Enter the reading room
          </Link>
        </div>
      </section>

      {/* ---------- 01 · The World ---------- */}
      <section className="section">
        <div className="kicker" style={{ marginBottom: 20 }}>
          01 · The World
        </div>
        <p
          className="serif"
          style={{
            margin: '0 0 56px',
            maxWidth: '44ch',
            fontSize: 'clamp(26px,3.2vw,46px)',
            lineHeight: 1.2,
          }}
        >
          Bringing the unseen into the seen. The thoughts you rehearse become the life you live.
        </p>
        <div className="grid-bordered">
          {WORLD.map((card) => (
            <div className="cell" key={card.kicker}>
              <div className="card-kicker">{card.kicker}</div>
              <div className="card-title">{card.title}</div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-62)' }}>
                {card.body}
              </p>
              <Link href={card.href} className="card-link">
                {card.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 02 · The App ---------- */}
      <section
        id={APP_SECTION_ID}
        className="section split"
        style={{ position: 'relative', overflow: 'hidden', scrollMarginTop: 90 }}
      >
        <div
          className="glow"
          style={{
            background: 'radial-gradient(50% 60% at 85% 50%,rgba(191,211,222,.1),transparent 70%)',
          }}
        />
        <div style={{ position: 'relative' }}>
          <div className="kicker" style={{ marginBottom: 22 }}>
            02 · The App
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(48px,6.4vw,96px)', lineHeight: 0.88 }}
          >
            Six minutes
            <br />
            a day.
          </h2>
          <p
            style={{
              margin: '22px 0 0',
              maxWidth: '44ch',
              fontSize: 16,
              lineHeight: 1.65,
              color: 'var(--ink-65)',
            }}
          >
            Declare your day out loud. One lesson, one check, one traded word, one honest paragraph.
            The app reads your intake and builds a season just for you, then rebuilds it when the
            season closes.
          </p>

          {/* Store links are placeholders until launch. */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
            <a
              href="#"
              aria-disabled="true"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '15px 22px',
                borderRadius: 14,
                background: 'var(--ink)',
                color: 'var(--bg)',
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1 }}>◈</span>
              <span>
                <span
                  className="mono"
                  style={{ display: 'block', fontSize: 8.5, letterSpacing: '.14em', opacity: 0.6 }}
                >
                  DOWNLOAD ON THE
                </span>
                <span style={{ display: 'block', fontSize: 17, fontWeight: 700, marginTop: 2 }}>
                  App Store
                </span>
              </span>
            </a>
            <a
              href="#"
              aria-disabled="true"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '15px 22px',
                borderRadius: 14,
                border: '1px solid var(--hair-30)',
                color: 'var(--ink)',
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1 }}>▷</span>
              <span>
                <span
                  className="mono"
                  style={{ display: 'block', fontSize: 8.5, letterSpacing: '.14em', opacity: 0.6 }}
                >
                  GET IT ON
                </span>
                <span style={{ display: 'block', fontSize: 17, fontWeight: 700, marginTop: 2 }}>
                  Google Play
                </span>
              </span>
            </a>
          </div>
          <div className="footnote" style={{ marginTop: 18 }}>
            STORE LINKS GO LIVE AT LAUNCH
          </div>
        </div>

        <PhoneMock />
      </section>

      {/* ---------- The Mark ---------- */}
      <section
        id="mark"
        className="section"
        style={{ padding: '130px var(--pad-x)', position: 'relative', overflow: 'hidden' }}
      >
        <div
          id="mark-bg-num"
          aria-hidden="true"
          className="display"
          style={{
            position: 'absolute',
            right: '-2vw',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 'min(44vw,560px)',
            lineHeight: 1,
            color: 'rgba(191,211,222,.05)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          85
        </div>
        <div className="kicker" style={{ marginBottom: 56, position: 'relative' }}>
          The Mark
        </div>
        <div className="split" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MarkRings />
          </div>
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(44px,5.6vw,84px)', lineHeight: 0.88 }}>
              Two circles.
              <br />
              One overlap.
            </h2>
            <div
              className="serif-i"
              style={{ fontSize: 'clamp(20px,2.4vw,30px)', color: 'var(--accent)', marginTop: 12 }}
            >
              where you are meets where you&rsquo;re becoming
            </div>
            <p
              style={{
                margin: '24px 0 0',
                maxWidth: '46ch',
                fontSize: 15.5,
                lineHeight: 1.7,
                color: 'var(--ink-65)',
                textWrap: 'pretty',
              }}
            >
              In scripture, eight is the number of new beginnings and five is the number of grace.
              Turn the eight on its side and it becomes infinity. Read it as a venn diagram: one
              circle is the life you have, the other is the life you&rsquo;re building, and the five
              marks of grace sit in the overlap, because that&rsquo;s where the work happens.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 26 }}>
              {MARK_CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className={chip.accent ? 'chip chip-accent' : 'chip'}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Closer ---------- */}
      <section
        style={{
          padding: '130px var(--pad-x) 90px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="glow"
          style={{
            background: 'radial-gradient(60% 60% at 50% 110%,rgba(191,211,222,.16),transparent 70%)',
          }}
        />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <GraceRings width={88} style={{ animation: 'ttc-pulse 5s ease-in-out infinite' }} />
        </div>
        <p
          className="serif"
          style={{
            position: 'relative',
            margin: '36px auto 44px',
            maxWidth: '20ch',
            fontSize: 'clamp(28px,3.8vw,54px)',
            lineHeight: 1.16,
          }}
        >
          The story isn&rsquo;t finished. Neither are you.
        </p>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <Link href={`/#${APP_SECTION_ID}`} className="pill pill-solid pill-wide">
            Get the app
          </Link>
          <Link href="/about" className="pill pill-outline pill-wide">
            Meet Rita
          </Link>
        </div>
      </section>
    </>
  );
}
