/**
 * Tiny inline icon set — replaces UI emoji. Paths adapted from Lucide
 * (lucide.dev, ISC license) plus a couple of custom glyphs.
 */
interface IconProps {
  size?: number;
  className?: string;
  title?: string;
}

function Base({
  size = 15,
  className,
  title,
  children,
  filled = false,
}: IconProps & { children: React.ReactNode; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: "inline-block", verticalAlign: "-0.15em", flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

export function FlameIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </Base>
  );
}

export function LockIcon(p: IconProps) {
  return (
    <Base {...p}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Base>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M20 6 9 17l-5-5" />
    </Base>
  );
}

export function XIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Base>
  );
}

/** tank-top jersey glyph (custom) */
export function JerseyIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M7 3c0 2 .5 4.5-1.5 7L5 11v10h14V11l-.5-1C16.5 7.5 17 5 17 3l-2.5 1a6 6 0 0 1-5 0L7 3z" />
    </Base>
  );
}

/** headstone for a DNF (custom) */
export function GraveIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M7 21v-9a5 5 0 0 1 10 0v9" />
      <path d="M4 21h16" />
      <path d="M10 11h4" />
    </Base>
  );
}
