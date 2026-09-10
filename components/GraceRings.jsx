/**
 * The Grace Rings mark: two overlapping circles (the life you have, the life
 * you're building) with the five marks of grace down the overlap.
 *
 * `dots` is 5 everywhere except the nav lockup, which uses 3 at small sizes.
 */
export default function GraceRings({
  width = 110,
  strokeWidth = 6,
  dots = 5,
  dotRadius = 3.4,
  className,
  style,
  ...rest
}) {
  const positions = dots === 3 ? [42, 70, 98] : [34, 52, 70, 88, 106];

  return (
    <svg
      viewBox="0 0 260 140"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ width, height: 'auto', ...style }}
      {...rest}
    >
      <circle cx="98" cy="70" r="46" fill="none" stroke="#F4F2ED" strokeWidth={strokeWidth} />
      <circle cx="162" cy="70" r="46" fill="none" stroke="#BFD3DE" strokeWidth={strokeWidth} />
      <g fill="#F4F2ED">
        {positions.map((cy) => (
          <circle key={cy} cx="130" cy={cy} r={dotRadius} />
        ))}
      </g>
    </svg>
  );
}
