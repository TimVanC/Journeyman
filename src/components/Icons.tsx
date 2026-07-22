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

/** Silver Slugger — bat and ball (Font Awesome `baseball-bat-ball`,
 *  CC BY 4.0). A filled glyph on a 512 grid, so it gets its own wrapper. */
export function BatIcon({ size = 15, className, title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: "inline-block", verticalAlign: "-0.15em", flexShrink: 0 }}
    >
      <path d="M424 0c-12.4 0-24.2 4.9-33 13.7L233.5 171.2c-10.5 10.5-19.8 22.1-27.7 34.6L132.7 321.6c-7.3 11.5-15.8 22.2-25.5 31.9L69.9 390.7l51.3 51.3 37.3-37.3c9.6-9.6 20.3-18.2 31.9-25.5l115.8-73.1c12.5-7.9 24.1-17.2 34.6-27.7L498.3 121c8.7-8.7 13.7-20.6 13.7-33s-4.9-24.2-13.7-33L457 13.7C448.2 4.9 436.4 0 424 0zm88 432a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM15 399c-9.4 9.4-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L49 399c-9.4-9.4-24.6-9.4-33.9 0z" />
    </svg>
  );
}

/* ---- sport balls: the "play the other league" buttons on the result card ----
   Standard Material Symbols (Apache 2.0) rather than hand-drawn glyphs —
   these are the icons people already recognize for each sport. They're
   filled paths on a 960 grid, so they get their own wrapper. */

function BallIcon({ size = 15, className, title, d }: IconProps & { d: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: "inline-block", verticalAlign: "-0.15em", flexShrink: 0 }}
    >
      <path d={d} />
    </svg>
  );
}

/** Basketball (Material Symbols `sports_basketball`) */
export function BasketballIcon(p: IconProps) {
  return (
    <BallIcon
      {...p}
      d="M162-520h114q-6-38-23-71t-43-59q-18 29-30.5 61.5T162-520Zm522 0h114q-5-36-17.5-68.5T750-650q-26 26-43 59t-23 71ZM210-310q26-26 43-59t23-71H162q5 36 17.5 68.5T210-310Zm540 0q18-29 30.5-61.5T798-440H684q6 38 23 71t43 59ZM358-520h82v-278q-53 8-98.5 29.5T260-712q39 38 64.5 86.5T358-520Zm162 0h82q8-57 33.5-105.5T700-712q-36-35-81.5-56.5T520-798v278Zm-80 358v-278h-82q-8 57-33.5 105.5T260-248q36 35 81.5 56.5T440-162Zm80 0q53-8 98.5-29.5T700-248q-39-38-64.5-86.5T602-440h-82v278Zm-40-318Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
    />
  );
}

/** Football (Material Symbols `sports_football`) */
export function FootballIcon(p: IconProps) {
  return (
    <BallIcon
      {...p}
      d="M480-480ZM362-202 202-362q-3 38-1.5 79t7.5 73q23 7 69.5 9t84.5-1Zm96-16q59-13 106-37t82-59q34-34 58-80.5T742-500L500-742q-57 14-103 38.5T316-644q-35 35-59.5 81.5T218-458l240 240Zm-62-122-56-56 224-224 56 56-224 224Zm362-256q4-39 2.5-81t-8.5-73q-23-8-69.5-10t-84.5 2l160 162ZM310-120q-57 0-104-8.5T148-148q-11-12-19.5-60T120-314q0-119 36-220.5T258-702q66-66 169-102t223-36q58 0 104.5 8.5T812-812q11 12 19.5 60t8.5 108q0 117-36 218.5T702-258q-65 65-168 101.5T310-120Z"
    />
  );
}

/** Baseball (Material Symbols `sports_baseball`) */
export function BaseballIcon(p: IconProps) {
  return (
    <BallIcon
      {...p}
      d="M224-288q45-35 70.5-85T320-480q0-57-25.5-107T224-672q-31 42-47.5 91T160-480q0 52 16.5 101t47.5 91Zm256 128q55 0 106.5-17.5T680-230q-57-46-88.5-111.5T560-480q0-73 31.5-138.5T680-730q-42-35-93.5-52.5T480-800q-55 0-106.5 17.5T280-730q57 46 88.5 111.5T400-480q0 73-31.5 138.5T280-230q42 35 93.5 52.5T480-160Zm256-128q31-42 47.5-91T800-480q0-52-16.5-101T736-672q-45 35-70.5 85T640-480q0 57 25.5 107t70.5 85ZM480-480Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
    />
  );
}
