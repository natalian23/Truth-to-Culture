
const DUST = [
  { left: '8%', top: '22%', size: 5, color: 'rgba(191,211,222,.35)', dur: '7s', delay: '0s' },
  { left: '22%', top: '68%', size: 3, color: 'rgba(244,242,237,.25)', dur: '9s', delay: '1s' },
  { left: '46%', top: '14%', size: 4, color: 'rgba(191,211,222,.3)', dur: '11s', delay: '.5s' },
  { left: '64%', top: '78%', size: 5, color: 'rgba(244,242,237,.2)', dur: '8s', delay: '2s' },
  { left: '82%', top: '34%', size: 3, color: 'rgba(191,211,222,.35)', dur: '10s', delay: '1.4s' },
];

/** Scroll progress hairline, floating dust, and the cursor glow. */
export default function Atmosphere() {
  return (
    <>
      <div
        id="scroll-progress"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 2,
          width: 0,
          background: 'var(--accent)',
          zIndex: 60,
        }}
      />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2 }} aria-hidden="true">
        {DUST.map((d, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              borderRadius: '50%',
              background: d.color,
              animation: `ttc-drift ${d.dur} ease-in-out ${d.delay} infinite`,
            }}
          />
        ))}
      </div>
      <div
        id="cursor-glow"
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(191,211,222,.09),transparent 65%)',
          pointerEvents: 'none',
          zIndex: 5,
          left: -600,
          top: -600,
          transform: 'translate(-50%,-50%)',
        }}
      />
    </>
  );
}
