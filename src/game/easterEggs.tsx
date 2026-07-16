import { CrownIcon } from "../components/Icons";

/** Solve-celebration easter eggs for the most special answers: instead of
 *  generic confetti, themed shapes rain down (crowns for LeBron, unibrows
 *  for AD...). Pure SVG glyphs — no emoji anywhere. Matching is by
 *  normalized answer name, so accents and casing don't matter. */

interface GlyphProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface EasterEgg {
  Icon: (p: GlyphProps) => React.ReactNode;
  /** tint palette the falling pieces cycle through */
  colors: string[];
  /** what's raining, for the curious */
  label: string;
}

/* ---- glyphs (simple silhouettes that read at ~16-22px) ---- */

function Glyph({
  size = 18,
  className,
  style,
  filled = false,
  children,
}: GlyphProps & { filled?: boolean; children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** The Brow — two eyes under one continuous eyebrow */
function UnibrowGlyph(p: GlyphProps) {
  return (
    <Glyph {...p} filled>
      <path d="M3.5 10.5 Q12 6 20.5 10.5 L20.5 13 Q12 8.5 3.5 13 Z" />
      <circle cx="7.5" cy="16.5" r="2" />
      <circle cx="16.5" cy="16.5" r="2" />
    </Glyph>
  );
}

/** Air Canada — a maple leaf */
function MapleLeafGlyph(p: GlyphProps) {
  return (
    <Glyph {...p} filled>
      <path d="M12 2l1.7 3.4 2.9-1.1-.8 3.2 3.3.5-2.1 2.5 2.7 1.7-3.1 1.2.6 3.2-3.3-.7-.4 3.1h-3l-.4-3.1-3.3.7.6-3.2-3.1-1.2 2.7-1.7-2.1-2.5 3.3-.5-.8-3.2 2.9 1.1L12 2z" />
      <rect x="11.2" y="17" width="1.6" height="5" rx="0.8" />
    </Glyph>
  );
}

/** Black Mamba — an S-curved snake */
function SnakeGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M5.5 19.5c4 1.5 5.5-2.5 3-4C5 13.5 6 9.5 10 10.5c4 1 6.5-.5 6-3.5-.4-2-2.8-2.6-4-1.5" />
      <circle cx="11.2" cy="4.6" r="1.4" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

/** the famous Halloween bat swat */
function BatGlyph(p: GlyphProps) {
  return (
    <Glyph {...p} filled>
      <path d="M12 6.5c-.5 1.7-1.9 2.5-3.3 2.1C7 8.2 5 8.8 4 10.4c1.6-.2 2.6.6 3 1.8.5-.9 1.6-1.2 2.6-.7.8.4 1.1 1.2.9 2.1.5-.4 1-.6 1.5-.6s1 .2 1.5.6c-.2-.9.1-1.7.9-2.1 1-.5 2.1-.2 2.6.7.4-1.2 1.4-2 3-1.8-1-1.6-3-2.2-4.7-1.8-1.4.4-2.8-.4-3.3-2.1z" />
    </Glyph>
  );
}

/** backboard-breaker — a mini hoop */
function HoopGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <rect x="4" y="3.5" width="16" height="11" rx="1" />
      <rect x="9.5" y="7" width="5" height="4" />
      <path d="M9 14.5h6M9.5 14.5l.8 5M14.5 14.5l-.8 5M10.3 19.5h3.4" />
    </Glyph>
  );
}

/** Slim Reaper — a scythe */
function ScytheGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M9 21 15 4" />
      <path d="M15 4c3.5.2 6.5 2 8 4.5-3.5-1.2-6.5-1-9 .5" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

/** Superman — a flowing cape */
function CapeGlyph(p: GlyphProps) {
  return (
    <Glyph {...p} filled>
      <path d="M8 3h8l3 14.5c-2.5-1.8-4.2-1.2-5.2.8-1-1.5-2.6-1.5-3.6 0-1-2-2.7-2.6-5.2-.8L8 3z" />
    </Glyph>
  );
}

/** Point God — a halo */
function HaloGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <ellipse cx="12" cy="9" rx="7.5" ry="3" />
      <ellipse cx="12" cy="9.6" rx="4.6" ry="1.7" />
    </Glyph>
  );
}

/* ---- the registry: only the most special of players ---- */

const EGGS: Record<string, EasterEgg> = {
  "lebron james": {
    Icon: CrownIcon,
    colors: ["#c9a227", "#e5c453", "#8c6239", "#1d1a13", "#b3852a"],
    label: "crowns for the King",
  },
  "anthony davis": {
    Icon: UnibrowGlyph,
    colors: ["#1d1a13", "#3a2c1c", "#55432c", "#6b6353"],
    label: "unibrows for The Brow",
  },
  "kobe bryant": {
    Icon: SnakeGlyph,
    colors: ["#552583", "#fdb927", "#1d1a13", "#7a5fa0"],
    label: "snakes for the Black Mamba",
  },
  "vince carter": {
    Icon: MapleLeafGlyph,
    colors: ["#ce1141", "#a10d33", "#e04a6b", "#753bbd"],
    label: "maple leaves for Air Canada",
  },
  "manu ginobili": {
    Icon: BatGlyph,
    colors: ["#1d1a13", "#3a3a3a", "#575757", "#8a8a8a"],
    label: "bats for the bat swat",
  },
  "shaquille o'neal": {
    Icon: HoopGlyph,
    colors: ["#e03a3e", "#1d428a", "#fdb927", "#1d1a13"],
    label: "hoops for the backboard breaker",
  },
  "kevin durant": {
    Icon: ScytheGlyph,
    colors: ["#1d1a13", "#4a4a4a", "#007ac1", "#6b6353"],
    label: "scythes for the Slim Reaper",
  },
  "dwight howard": {
    Icon: CapeGlyph,
    colors: ["#c8102e", "#0057b8", "#e5c453", "#8f0f24"],
    label: "capes for Superman",
  },
  "chris paul": {
    Icon: HaloGlyph,
    colors: ["#c9a227", "#e5c453", "#b3852a", "#8c6239"],
    label: "halos for the Point God",
  },
};

/** case/accent-insensitive lookup: "Manu Ginóbili" matches "manu ginobili" */
export function eggFor(answer: string): EasterEgg | null {
  const key = answer
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
  return EGGS[key] ?? null;
}
