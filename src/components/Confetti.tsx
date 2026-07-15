const COLORS = ["#E03A3E", "#FDB927", "#007A33", "#1D428A", "#b3855a", "#1d1a13"];

/** Small one-shot confetti burst on solve. Skipped for reduced motion. */
export default function Confetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const pieces = Array.from({ length: 42 }, (_, i) => ({
    left: (i * 137.5) % 100, // golden-angle spread
    delay: (i % 7) * 0.09,
    duration: 2.1 + ((i * 53) % 100) / 90,
    color: COLORS[i % COLORS.length],
    drift: ((i * 29) % 60) - 30,
    spin: 420 + ((i * 71) % 480),
  }));
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <i
          key={i}
          style={
            {
              left: `${p.left}%`,
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
