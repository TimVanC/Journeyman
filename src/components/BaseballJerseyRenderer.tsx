import { useId } from "react";
import {
  BODY_PANELS,
  BUTTONS,
  COLLAR_BAND,
  COLLAR_LEFT_WHITE,
  COLLAR_TOP_WHITE,
  COLLAR_WHITES,
  HEM_BAND,
  INNER_STRIPES_WHITE,
  OUTLINE_BUTTON_DOTS,
  OUTLINE_DX,
  OUTLINE_PATHS,
  PLACKET_STRIPES,
  PLACKET_WHITE,
  SLEEVE_BANDS,
  SLEEVE_STRIPE_WHITE,
  SLEEVES,
} from "./baseballJerseyPaths";

/**
 * BaseballJerseyRenderer — generic, era-styled MLB jersey as pure SVG.
 * No logos, no wordmarks: colorway + number + era treatment only.
 *
 * Artwork: user-supplied "Baseball Jersey 1.svg", front view (raglan
 * sleeves + button placket), decomposed into recolorable regions plus the
 * sheet's own black line-art overlay (shifted onto the art via OUTLINE_DX,
 * same trick as the NBA source sheet):
 *   body panels + placket → body color (white/gray/cream — or team color)
 *   raglan sleeves        → sleeve color
 *   collar/placket/hem/sleeve bands → trim accents
 *   optional pinstripes clipped to the body panels
 *
 * eraStyle:
 *   flannel   — pre-'72: chunky one-color bands, muted cream body
 *   pullover  — '72-'86: no placket/buttons, saturated body, big bands
 *   buttoned  — '87-'05: full button placket, two-tone bands
 *   modern    — '06+: button placket, thinner accents, no hem band
 */

export type BaseballEraStyle = "flannel" | "pullover" | "buttoned" | "modern";

export interface BaseballJerseyProps {
  /** body panel color (usually white/cream/gray; team color for pullovers) */
  primary: string;
  /** raglan sleeve + accent color */
  secondary: string;
  trim: string;
  number: number | null;
  eraStyle: BaseballEraStyle;
  pinstripe?: boolean;
  size?: number; // rendered width in px; height = (H/W) * size
  label?: string | null;
}

/** Front jersey bounding box on the source sheet, with a little margin. */
const VB = { x: 128, y: 323, w: 142.5, h: 166 };
const CX = 199.25; // chest centerline
const INK = "#1d1a13";

const ERA = {
  flannel: { placket: false, buttons: true, hem: false, sleeveStripe: "secondary", collarAs: "secondary" },
  pullover: { placket: false, buttons: false, hem: true, sleeveStripe: "trim", collarAs: "secondary" },
  buttoned: { placket: true, buttons: true, hem: false, sleeveStripe: "trim", collarAs: "secondary" },
  modern: { placket: true, buttons: true, hem: false, sleeveStripe: "primary", collarAs: "secondary" },
} as const;

export default function BaseballJerseyRenderer({
  primary,
  secondary,
  trim,
  number,
  eraStyle,
  pinstripe = false,
  size = 84,
  label = null,
}: BaseballJerseyProps) {
  const uid = useId();
  const e = ERA[eraStyle];
  const numText = number === null ? "??" : String(number);
  const numFontSize = number === null ? 42 : numText.length > 1 ? 30 : 34;
  const clipId = `bbody-${uid}`;
  const shadeId = `bshade-${uid}`;
  const pinId = `bpin-${uid}`;

  const pick = (which: "primary" | "secondary" | "trim") =>
    which === "primary" ? primary : which === "secondary" ? secondary : trim;

  return (
    <svg
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      width={size}
      height={size * (VB.h / VB.w)}
      role="img"
      aria-label={`${eraStyle} era baseball jersey, number ${numText}`}
    >
      <defs>
        <linearGradient id={shadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        {/* body panels + center placket = the pinstripe zone */}
        <clipPath id={pinId}>
          {BODY_PANELS.map((d, i) => (
            <path key={i} d={d} />
          ))}
          {PLACKET_WHITE.map((d, i) => (
            <path key={`p${i}`} d={d} />
          ))}
        </clipPath>
        <clipPath id={clipId}>
          {BODY_PANELS.map((d, i) => (
            <path key={i} d={d} />
          ))}
          {SLEEVES.map((d, i) => (
            <path key={`s${i}`} d={d} />
          ))}
        </clipPath>
      </defs>

      {/* body panels + collar whites + placket, all in the body color;
          same-color strokes close hairline anti-aliasing seams */}
      {[...BODY_PANELS, ...PLACKET_WHITE, ...COLLAR_WHITES, ...COLLAR_TOP_WHITE, ...COLLAR_LEFT_WHITE, ...INNER_STRIPES_WHITE].map(
        (d, i) => (
          <path key={`b${i}`} d={d} fill={primary} stroke={primary} strokeWidth={0.6} />
        )
      )}

      {/* pinstripes — thin vertical lines clipped to the body */}
      {pinstripe && (
        <g clipPath={`url(#${pinId})`}>
          {Array.from({ length: 16 }, (_, i) => {
            const x = 158 + i * 5.5;
            return (
              <rect key={i} x={x} y={VB.y} width={0.9} height={VB.h} fill={secondary} opacity={0.85} />
            );
          })}
        </g>
      )}

      {/* raglan sleeves */}
      {SLEEVES.map((d, i) => (
        <path key={`sl${i}`} d={d} fill={secondary} stroke={secondary} strokeWidth={0.6} />
      ))}

      {/* sleeve-end bands: colored band with a contrast stripe inside */}
      {SLEEVE_BANDS.map((d, i) => (
        <path key={`sb${i}`} d={d} fill={secondary} stroke={secondary} strokeWidth={0.4} />
      ))}
      {SLEEVE_STRIPE_WHITE.map((d, i) => (
        <path key={`ss${i}`} d={d} fill={pick(e.sleeveStripe)} />
      ))}

      {/* collar band */}
      {COLLAR_BAND.map((d, i) => (
        <path key={`c${i}`} d={d} fill={pick(e.collarAs)} stroke={pick(e.collarAs)} strokeWidth={0.4} />
      ))}

      {/* button placket piping (hidden on flannels/pullovers) */}
      {e.placket &&
        PLACKET_STRIPES.map((d, i) => (
          <path key={`pp${i}`} d={d} fill={secondary} stroke={secondary} strokeWidth={0.3} />
        ))}

      {/* hem band — the sansabelt-era waistband pop */}
      {e.hem &&
        HEM_BAND.map((d, i) => (
          <path key={`h${i}`} d={d} fill={secondary} stroke={secondary} strokeWidth={0.4} />
        ))}

      {/* buttons */}
      {e.buttons &&
        BUTTONS.map((b, i) => <circle key={`bt${i}`} cx={b.cx} cy={b.cy} r={b.r + 0.3} fill={trim} />)}

      {/* fabric shading over body + sleeves */}
      <g clipPath={`url(#${clipId})`}>
        <rect x={VB.x} y={VB.y} width={VB.w} height={VB.h} fill={`url(#${shadeId})`} />
      </g>

      {/* the sheet's own line-art overlay, shifted onto the colored art */}
      <g transform={`translate(${OUTLINE_DX} 0)`}>
        {OUTLINE_PATHS.map((d, i) => (
          <path key={`o${i}`} d={d} fill={INK} opacity={0.9} />
        ))}
        {e.buttons &&
          OUTLINE_BUTTON_DOTS.map((d, i) => (
            <path key={`od${i}`} d={d} fill={INK} opacity={0.9} />
          ))}
      </g>

      {/* era tricode — chest-high, left of the placket reads too small at
          card size, so it sits centered like the other sports */}
      {label && (
        <text
          x={CX}
          y={409}
          textAnchor="middle"
          fontFamily="'Archivo Black','Arial Black',sans-serif"
          fontSize={17}
          fill={secondary}
          stroke={trim}
          strokeWidth={0.9}
          paintOrder="stroke"
          style={{ letterSpacing: "0.04em" }}
          aria-label={`Team: ${label}`}
        >
          {label}
        </text>
      )}

      {/* number — centered on the chest, under the tricode */}
      <text
        x={CX}
        y={number === null ? 452 : 448}
        textAnchor="middle"
        fontFamily="'Archivo Black','Arial Black',sans-serif"
        fontWeight={900}
        fontSize={numFontSize}
        fill={secondary}
        stroke={trim}
        strokeWidth={1.2}
        paintOrder="stroke"
        style={{ letterSpacing: "-0.02em" }}
      >
        {numText}
      </text>
    </svg>
  );
}
