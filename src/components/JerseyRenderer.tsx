import { useId } from "react";
import {
  BODY_PATHS,
  SECONDARY_PATHS,
  TRIM_PATHS,
  OUTLINE_PATHS,
  OUTLINE_DX,
} from "./jerseyPaths";

/**
 * JerseyRenderer v3 — generic, era-styled NBA jersey as pure SVG.
 * No logos, no wordmarks, no team names: colorway + number + era cut only.
 *
 * Artwork: user-supplied "Basketball Jersey.svg" (BasketballJersey.zip),
 * front view, decomposed into three recolorable regions + line-art overlay:
 *   body   → primary
 *   inner collar/armhole stripe → secondary
 *   outer collar/armhole stripe → trim
 *
 * eraStyle keeps the decade readable without changing the artwork:
 *   classic   — 70s/80s: narrower cut, both stripes in secondary (one thick band)
 *   nineties  — 90s: full cut, full two-tone trim
 *   baggy     — 2000s: widest/longest cut, two-tone trim + hem band
 *   modern    — 2010s+: trim cut, outer stripe blends into body (thin trim look)
 */

export type EraStyle = "classic" | "nineties" | "baggy" | "modern";

export interface JerseyProps {
  primary: string;
  secondary: string;
  trim: string;
  number: number | null; // null → render "?" (unknown number)
  eraStyle: EraStyle;
  size?: number; // rendered width in px; height = (H/W) * size
  /** era tricode stamped above the number once the stint is "spent" */
  label?: string | null;
}

/** Front jersey bounding box on the source sheet, with a little margin. */
const VB = { x: 121, y: 92, w: 190, h: 306 };
const CX = VB.x + VB.w / 2; // chest centerline
const CY = VB.y + VB.h / 2;
const INK = "#1d1a13";

/** Cut + stripe treatment per era. Tuned by eye — tweak freely. */
const ERA = {
  classic: { sx: 0.91, sy: 0.96, outerStripe: "secondary", hem: 0 },
  nineties: { sx: 1.0, sy: 1.0, outerStripe: "trim", hem: 0 },
  baggy: { sx: 1.07, sy: 1.05, outerStripe: "trim", hem: 16 },
  modern: { sx: 0.95, sy: 1.0, outerStripe: "primary", hem: 0 },
} as const;

export default function JerseyRenderer({
  primary,
  secondary,
  trim,
  number,
  eraStyle,
  size = 160,
  label = null,
}: JerseyProps) {
  const uid = useId();
  const e = ERA[eraStyle];
  const numText = number === null ? "?" : String(number);
  const numFontSize = numText.length > 1 ? 60 : 70;
  const clipId = `jbody-${uid}`;
  const shadeId = `jshade-${uid}`;

  const outerStripeFill =
    e.outerStripe === "secondary" ? secondary : e.outerStripe === "primary" ? primary : trim;

  return (
    <svg
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      width={size}
      height={size * (VB.h / VB.w)}
      role="img"
      aria-label={`${eraStyle} era jersey, number ${numText}`}
    >
      <defs>
        {/* subtle fabric shading so flat colors don't look like paint chips */}
        <linearGradient id={shadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.13" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={BODY_PATHS[0]} />
        </clipPath>
      </defs>

      <g transform={`translate(${CX} ${CY}) scale(${e.sx} ${e.sy}) translate(${-CX} ${-CY})`}>
        {/* body + shoulder gap piece; same-color strokes close the hairline
            anti-aliasing seams between adjacent regions */}
        {BODY_PATHS.map((d, i) => (
          <path key={`b${i}`} d={d} fill={primary} stroke={primary} strokeWidth={1.5} />
        ))}

        {/* outer stripe (yellow in source) */}
        {TRIM_PATHS.map((d, i) => (
          <path key={`t${i}`} d={d} fill={outerStripeFill} stroke={outerStripeFill} strokeWidth={1.2} />
        ))}

        {/* inner stripe (red in source) */}
        {SECONDARY_PATHS.map((d, i) => (
          <path key={`s${i}`} d={d} fill={secondary} stroke={secondary} strokeWidth={1.2} />
        ))}

        {/* 2000s hem band, clipped to the body */}
        {e.hem > 0 && (
          <g clipPath={`url(#${clipId})`}>
            <rect x={VB.x} y={VB.y + VB.h - e.hem - 8} width={VB.w} height={e.hem} fill={secondary} />
          </g>
        )}

        {/* fabric shading over the body */}
        <g clipPath={`url(#${clipId})`}>
          <rect x={VB.x} y={VB.y} width={VB.w} height={VB.h} fill={`url(#${shadeId})`} />
        </g>

        {/* line-art overlay (drawn beside the colored art on the source sheet) */}
        <g transform={`translate(${OUTLINE_DX} 0)`}>
          {OUTLINE_PATHS.map((d, i) => (
            <path key={`o${i}`} d={d} fill={INK} opacity={0.9} />
          ))}
        </g>
      </g>

      {/* era tricode, revealed once a newer jersey is on the table —
          sized like a chest wordmark, just under the number's scale */}
      {label && (
        <text
          className="jersey-tag"
          x={CX}
          y={CY + 3}
          textAnchor="middle"
          fontFamily="'Archivo Black','Arial Black',sans-serif"
          fontSize={46}
          fill={secondary}
          stroke={trim}
          strokeWidth={2}
          paintOrder="stroke"
          style={{ letterSpacing: "0.05em" }}
          aria-label={`Team: ${label}`}
        >
          {label}
        </text>
      )}

      {/* number — block athletic style, centered on the chest */}
      <text
        x={CX}
        y={CY + 71}
        textAnchor="middle"
        fontFamily="'Archivo Black','Arial Black',sans-serif"
        fontWeight={900}
        fontSize={numFontSize}
        fill={secondary}
        stroke={trim}
        strokeWidth={2.5}
        paintOrder="stroke"
        style={{ letterSpacing: "-0.02em" }}
      >
        {numText}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Helper: resolve a stint to its colorway entry from colorways.json   */
/* ------------------------------------------------------------------ */

export interface ColorwayEra {
  key: string;
  years: [number, number];
  identity: string;
  primary: string;
  secondary: string;
  trim: string;
  eraStyle: EraStyle;
  confidence: "high" | "medium" | "low";
}

export type ColorwayDB = { franchises: Record<string, ColorwayEra[]> };

/**
 * Era-correct city tricode for a colorway entry — a Vancouver-era stint
 * stamps "VAN", not the modern franchise's "MEM".
 */
export function eraTricode(era: ColorwayEra, franchise: string): string {
  const id = era.identity;
  if (id.startsWith("Vancouver")) return "VAN";
  if (id.startsWith("New Jersey")) return "NJ";
  if (id.startsWith("Seattle")) return "SEA";
  if (id.startsWith("Buffalo")) return "BUF";
  if (id.startsWith("San Diego")) return "SDC";
  if (id.startsWith("Kansas City")) return "KCK";
  if (id.startsWith("New Orleans Jazz")) return "NOJ";
  if (id.startsWith("New Orleans Hornets")) return "NOH";
  if (id.startsWith("Charlotte Hornets (original)")) return "CHH";
  if (id.startsWith("Washington Bullets")) return "WSB";
  return franchise;
}

/**
 * Pick the era covering the majority of a stint. startYear/endYear are
 * season START years. Falls back to nearest era if there's a data gap.
 */
export function resolveColorway(
  db: ColorwayDB,
  franchise: string,
  startYear: number,
  endYear: number
): ColorwayEra | null {
  const eras = db.franchises[franchise];
  if (!eras?.length) return null;

  let best: ColorwayEra | null = null;
  let bestOverlap = -1;
  for (const era of eras) {
    const overlap =
      Math.min(endYear, era.years[1]) - Math.max(startYear, era.years[0]) + 1;
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      best = era;
    }
  }
  return best;
}
