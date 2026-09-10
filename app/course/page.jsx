import Link from 'next/link';
import { APP_SECTION_ID } from '@/lib/appSection';

export const metadata = {
  title: 'The Mindset Shift',
  description:
    '31 lessons in Rita’s voice across validation, information, preparation, expectation and discipline.',
};

const ELEMENTS = [
  {
    num: '01',
    name: 'Validation',
    desc: 'Whose approval are you living for? You learn to notice where your sense of worth is outsourced, and start bringing it home.',
  },
  {
    num: '02',
    name: 'Information',
    desc: 'What you feed your mind becomes the frame. You audit the voices with access to your ear and choose your inputs on purpose.',
  },
  {
    num: '03',
    name: 'Preparation',
    desc: 'The unseen work. You stop waiting to feel ready and start building readiness one small rep at a time.',
  },
  {
    num: '04',
    name: 'Expectation',
    desc: 'What you expect, you rehearse. You trade rehearsed dread for rehearsed possibility and watch your decisions follow.',
  },
  {
    num: '05',
    name: 'Discipline',
    desc: 'Where it all lands. Better decisions create better habits, and better habits create a better life.',
  },
];

export default function CoursePage() {
  return (
    <div style={{ paddingTop: 120 }}>
      <section className="page-head">
        <div className="glow glow-left" />
        <div className="kicker" style={{ position: 'relative' }}>
          The Course
        </div>
        <h1 className="page-title">
          The Mindset
          <br />
          Shift
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 40,
            flexWrap: 'wrap',
            marginTop: 18,
            position: 'relative',
          }}
        >
          <div className="tagline">mastering your thoughts</div>
          <p
            style={{
              maxWidth: '44ch',
              margin: 0,
              fontSize: 16,
              lineHeight: 1.6,
              color: 'var(--ink-68)',
            }}
          >
            31 lessons in Rita&rsquo;s voice. Assessments, reframes, and homework that goes with you
            into the app, one rep a day.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: '90px var(--pad-x)' }}>
        <div className="kicker" style={{ marginBottom: 44 }}>
          The five elements
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: '1px solid var(--hair)',
          }}
        >
          {ELEMENTS.map((el) => (
            <div className="index-row" key={el.num}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>
                {el.num}
              </div>
              <div
                className="display"
                style={{ fontSize: 'clamp(30px,4vw,52px)', lineHeight: 0.9, letterSpacing: 0 }}
              >
                {el.name}
              </div>
              <div
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'var(--ink-62)',
                  maxWidth: '56ch',
                }}
              >
                {el.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="section"
        style={{
          padding: '100px var(--pad-x)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div className="framed">
          <div
            className="mono"
            style={{ fontSize: 9.5, letterSpacing: '.2em', color: 'var(--ink-45)' }}
          >
            FROM THE COURSE
          </div>
          <p className="serif" style={{ margin: 0, fontSize: 24, lineHeight: 1.35 }}>
            &ldquo;I want you to learn to how to wake up and declare your day. You set the
            tone.&rdquo;
          </p>
          <div
            className="mono"
            style={{ fontSize: 9.5, letterSpacing: '.16em', color: 'var(--ink-40)' }}
          >
            RITA WRIGHT · FOUNDER
          </div>
        </div>

        <div>
          <h2 className="display" style={{ fontSize: 'clamp(40px,5vw,72px)', lineHeight: 0.88 }}>
            The course teaches it.
            <br />
            The app makes it a habit.
          </h2>
          <p
            style={{
              margin: '20px 0 0',
              maxWidth: '46ch',
              fontSize: 15,
              lineHeight: 1.65,
              color: 'var(--ink-62)',
            }}
          >
            Every lesson closes with a rep you take into the daily practice. Finish the 31 lessons
            and the work keeps going, because there is no arrival.
          </p>
          <Link
            href={`/#${APP_SECTION_ID}`}
            className="pill pill-solid"
            style={{ marginTop: 26, padding: '16px 26px' }}
          >
            Take it in the app
          </Link>
        </div>
      </section>
    </div>
  );
}
