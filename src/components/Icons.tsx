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

/** Google "G" mark, monochrome (path from simple-icons, CC0) */
export function GoogleIcon({ size = 15, className, title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: "inline-block", verticalAlign: "-0.15em", flexShrink: 0 }}
    >
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}

export function ChartIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M6 20V10" />
      <path d="M12 20V4" />
      <path d="M18 20v-6" />
    </Base>
  );
}

export function GearIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </Base>
  );
}

export function UserIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Base>
  );
}

export function ArchiveIcon(p: IconProps) {
  return (
    <Base {...p}>
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
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

/* ---------------- accolade icons ---------------- */

/** All-Star */
export function StarIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </Base>
  );
}

/** championship */
export function TrophyIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </Base>
  );
}

/** MVP */
export function CrownIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
      <path d="M5 21h14" />
    </Base>
  );
}

/** Defensive Player of the Year */
export function ShieldIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </Base>
  );
}

/** Olympic gold */
export function MedalIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M8 3h8l-3 7h-2z" />
      <circle cx="12" cy="15" r="5.5" />
    </Base>
  );
}

/** letter/number badge — ROY, All-NBA First Team, Cy Young... Multi-char
 *  glyphs shrink to stay inside the ring at phone sizes. */
function BadgeIcon({ glyph, ...p }: IconProps & { glyph: string }) {
  const fontSize = glyph.length >= 3 ? 6.5 : glyph.length === 2 ? 8.5 : 12;
  const y = glyph.length >= 3 ? 14.4 : glyph.length === 2 ? 15 : 16.4;
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <text
        x="12"
        y={y}
        textAnchor="middle"
        fontSize={fontSize}
        fontFamily="'Archivo Black','Arial Black',sans-serif"
        fill="currentColor"
        stroke="none"
      >
        {glyph}
      </text>
    </Base>
  );
}

/** 6th Man of the Year. NOT a BadgeIcon: a "6" ringed by a circle turns to
 *  mush at the ~12px these render at on a phone. Spelled out, with no circle
 *  stroke competing for pixels and a wider box so the glyphs get real width.
 *  textLength pins it inside the viewBox at any font fallback. */
export function SixthManIcon({ size = 15, className, title }: IconProps) {
  const W = 30;
  const H = 24;
  return (
    <svg
      width={size * (W / H)}
      height={size}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: "inline-block", verticalAlign: "-0.15em", flexShrink: 0 }}
    >
      <text
        x={W / 2}
        y="19.5"
        textAnchor="middle"
        textLength={W - 3}
        lengthAdjust="spacingAndGlyphs"
        fontSize="21"
        fontFamily="'Archivo Black','Arial Black',sans-serif"
        fontWeight="900"
        fill="currentColor"
        stroke="none"
      >
        6th
      </text>
    </svg>
  );
}

export const RoyIcon = (p: IconProps) => <BadgeIcon glyph="R" {...p} />;
export const AllNbaIcon = (p: IconProps) => <BadgeIcon glyph="1" {...p} />;
export const FmvpIcon = (p: IconProps) => <BadgeIcon glyph="F" {...p} />;
// NFL/MLB accolade badges (same letter-badge family as ROY/All-NBA)
export const OpoyIcon = (p: IconProps) => <BadgeIcon glyph="O" {...p} />;
export const ComebackIcon = (p: IconProps) => <BadgeIcon glyph="C" {...p} />;
export const CyYoungIcon = (p: IconProps) => <BadgeIcon glyph="CY" {...p} />;
export const BattingTitleIcon = (p: IconProps) => <BadgeIcon glyph="AVG" {...p} />;
export const RelieverIcon = (p: IconProps) => <BadgeIcon glyph="SV" {...p} />;

/** Gold Glove — a fielder's mitt silhouette */
export function GloveIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M7 13V6.5a2 2 0 0 1 4 0V11m0-5.5v-1a2 2 0 0 1 4 0V11m0-4.5a2 2 0 0 1 4 0V14a7 7 0 0 1-7 7h-1a7 7 0 0 1-6.8-5.3L3.5 12a1.9 1.9 0 0 1 3.4-1.2L8 12.5" />
    </Base>
  );
}

/** Silver Slugger — a crossed bat */
export function BatIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 20 15.5 8.5M15.5 8.5l4.2-4.2a1.6 1.6 0 0 1 2.3 2.3L17.8 10.8M15.5 8.5l2.3 2.3M5.5 21.5 2.5 18.5" />
    </Base>
  );
}

/* ---- sport balls: the "play the other league" buttons on the result card ---- */

/** Basketball — circle with the classic seam cross */
export function BasketballIcon(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 2.5v19M2.5 12h19" />
      <path d="M5.2 5.2C8 8 8 16 5.2 18.8M18.8 5.2C16 8 16 16 18.8 18.8" />
    </Base>
  );
}

/** Football — a pointed prolate spheroid with laces. Not a `Base` icon:
 *  the laces need a thinner stroke than the outline or they merge into a
 *  blob at ~16px and the whole thing reads as an eye. */
export function FootballIcon({ size = 15, className, title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: "inline-block", verticalAlign: "-0.15em", flexShrink: 0 }}
    >
      {/* tilted, with sharp points at both tips — a level lens with a dark
          centre reads as an eye no matter how the laces are drawn */}
      <g transform="rotate(-32 12 12)">
        <path strokeWidth={1.9} d="M2.8 12Q12 4.6 21.2 12 12 19.4 2.8 12Z" />
        <g strokeWidth={1.25}>
          <path d="M9.9 12h4.2" />
          <path d="M10.9 10.8v2.4M12 10.6v2.8M13.1 10.8v2.4" />
        </g>
      </g>
    </svg>
  );
}

/** Baseball — circle with two curved seams */
export function BaseballIcon(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M6 4.2C8 7 8 17 6 19.8M18 4.2C16 7 16 17 18 19.8" />
    </Base>
  );
}
