/** The daily-practice app, mocked in CSS. Tilts toward the cursor via SiteMotion. */
export default function PhoneMock() {
  const week = [
    { fill: 'solid' },
    { fill: 'solid' },
    { fill: 'solid' },
    { fill: 'solid' },
    { fill: 'today' },
    { fill: 'empty' },
    { fill: 'empty' },
  ];

  const segStyle = (fill) => {
    if (fill === 'solid') return { background: 'var(--accent)' };
    if (fill === 'today')
      return { border: '1px solid var(--accent)', background: 'rgba(191,211,222,.15)' };
    return { border: '1px solid rgba(244,242,237,.18)' };
  };

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', perspective: 900 }}>
      <div
        id="phone-mock"
        aria-hidden="true"
        style={{
          width: 270,
          borderRadius: 40,
          border: '1px solid rgba(244,242,237,.2)',
          background: 'var(--surface)',
          padding: '14px 14px 22px',
          boxShadow: '0 40px 80px rgba(0,0,0,.5)',
          transition: 'transform .3s ease-out',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            borderRadius: 28,
            overflow: 'hidden',
            border: '1px solid rgba(244,242,237,.1)',
          }}
        >
          <div style={{ padding: '26px 18px', background: 'linear-gradient(180deg,#0C0D0F,#08090A)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '5px 10px',
                  borderRadius: 999,
                  border: '1px solid rgba(191,211,222,.45)',
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                <div
                  className="mono"
                  style={{ fontSize: 8, letterSpacing: '.12em', color: 'var(--accent)' }}
                >
                  6 DAY STREAK
                </div>
              </div>
              <div
                className="mono"
                style={{ fontSize: 8, letterSpacing: '.12em', color: 'var(--ink-40)' }}
              >
                S1 · DAY 7
              </div>
            </div>

            <div
              style={{
                marginTop: 22,
                border: '1px solid rgba(191,211,222,.4)',
                borderRadius: 18,
                padding: 18,
                background: 'rgba(191,211,222,.07)',
              }}
            >
              <div
                className="mono"
                style={{ fontSize: 7.5, letterSpacing: '.16em', color: 'var(--ink-50)' }}
              >
                TODAY · VALIDATION
              </div>
              <div className="serif" style={{ fontSize: 20, lineHeight: 1.15, margin: '9px 0 12px' }}>
                Your standard is your standard
              </div>
              <div
                style={{
                  padding: 12,
                  borderRadius: 999,
                  background: 'var(--ink)',
                  color: 'var(--bg)',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                Start today&rsquo;s rep
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                border: '1px solid rgba(244,242,237,.13)',
                borderRadius: 16,
                padding: 14,
              }}
            >
              <div
                className="mono"
                style={{ fontSize: 7.5, letterSpacing: '.16em', color: 'var(--ink-45)' }}
              >
                WHY YOU&rsquo;RE HERE
              </div>
              <div className="serif" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.4 }}>
                You are building toward feeling enough.
              </div>
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 5 }}>
              {week.map((seg, i) => (
                <div
                  key={i}
                  style={{ flex: 1, height: 26, borderRadius: 9, ...segStyle(seg.fill) }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
