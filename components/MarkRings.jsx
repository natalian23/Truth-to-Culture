/**
 * The mark, drawn on scroll into view: the off-white circle strokes itself in,
 * the accent circle follows half a second later, then the five dots land in
 * sequence. SiteMotion flips stroke-dashoffset to 0 when this enters view.
 */
export default function MarkRings() {
  const dots = [34, 52, 70, 88, 106];

  return (
    <svg
      id="mark-rings"
      viewBox="0 0 260 140"
      aria-hidden="true"
      style={{ width: 'min(72vw,360px)', height: 'auto' }}
    >
      <circle
        cx="98"
        cy="70"
        r="46"
        fill="none"
        stroke="#F4F2ED"
        strokeWidth="6"
        strokeDasharray="290"
        strokeDashoffset="290"
        transform="rotate(-90 98 70)"
        style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)' }}
      />
      <circle
        cx="162"
        cy="70"
        r="46"
        fill="none"
        stroke="#BFD3DE"
        strokeWidth="6"
        strokeDasharray="290"
        strokeDashoffset="290"
        transform="rotate(90 162 70)"
        style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) .5s' }}
      />
      <g fill="#F4F2ED">
        {dots.map((cy, i) => (
          <circle
            key={cy}
            cx="130"
            cy={cy}
            r="3.4"
            style={{ opacity: 0, transition: `opacity .4s ease ${1.5 + i * 0.2}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
