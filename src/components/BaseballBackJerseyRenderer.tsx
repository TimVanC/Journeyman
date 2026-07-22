import { useId } from "react";
import {
  BODY_PANELS,
  COLLAR_LEFT_WHITE,
  COLLAR_TOP_WHITE,
  COLLAR_WHITES,
  HEM_BAND,
  INNER_STRIPES_WHITE,
  PLACKET_WHITE,
  SLEEVE_BANDS,
  SLEEVE_STRIPE_WHITE,
  SLEEVES,
} from "./baseballJerseyPaths";
import type { BaseballEraStyle } from "./BaseballJerseyRenderer";

/**
 * BaseballBackJerseyRenderer — the BACK of a generic MLB jersey.
 *
 * Baseball numbers live on the back (big and centered), so this is what
 * the game uses. Synthesized from the same front artwork
 * (baseballJerseyPaths): the two body panels + placket strip + collar
 * whites all fill the body color into one solid back (the faint center
 * line reads as a normal back seam), the raglan sleeves + era bands carry
 * over unchanged, and the front's V-placket / buttons are dropped. A plain
 * crew collar band is drawn at the neck.
 *
 * The era tricode sits high on the back like a nameplate surname; the
 * number is large and centered below it.
 */

export interface BaseballBackJerseyProps {
  primary: string;
  secondary: string;
  trim: string;
  number: number | null;
  eraStyle: BaseballEraStyle;
  pinstripe?: boolean;
  size?: number;
  label?: string | null;
}

const VB = { x: 128, y: 323, w: 142.5, h: 166 };
const CX = 199.25;
const INK = "#1d1a13";

const ERA = {
  flannel: { hem: false, sleeveStripe: "secondary" },
  pullover: { hem: true, sleeveStripe: "trim" },
  buttoned: { hem: false, sleeveStripe: "trim" },
  modern: { hem: false, sleeveStripe: "primary" },
} as const;

const BODY_FILLS = [
  ...BODY_PANELS,
  ...PLACKET_WHITE,
  ...INNER_STRIPES_WHITE,
  ...COLLAR_WHITES,
  ...COLLAR_TOP_WHITE,
  ...COLLAR_LEFT_WHITE,
];

export default function BaseballBackJerseyRenderer({
  primary,
  secondary,
  trim,
  number,
  eraStyle,
  pinstripe = false,
  size = 84,
  label = null,
}: BaseballBackJerseyProps) {
  const uid = useId();
  const e = ERA[eraStyle];
  const numText = number === null ? "??" : String(number);
  const numFontSize = number === null ? 46 : numText.length > 1 ? 50 : 56;
  const clipId = `bbk-${uid}`;
  const shadeId = `bbksh-${uid}`;
  const pinId = `bbkpin-${uid}`;

  const pick = (which: "primary" | "secondary" | "trim") =>
    which === "primary" ? primary : which === "secondary" ? secondary : trim;

  return (
    <svg
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      width={size}
      height={size * (VB.h / VB.w)}
      role="img"
      aria-label={`${eraStyle} era baseball jersey back, number ${numText}`}
    >
      <defs>
        <linearGradient id={shadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <clipPath id={pinId}>
          {BODY_PANELS.map((d, i) => (
            <path key={i} d={d} />
          ))}
          {PLACKET_WHITE.map((d, i) => (
            <path key={`p${i}`} d={d} />
          ))}
          {INNER_STRIPES_WHITE.map((d, i) => (
            <path key={`s${i}`} d={d} />
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

      {/* solid back body (panels + placket + collar whites), body color */}
      {BODY_FILLS.map((d, i) => (
        <path key={`b${i}`} d={d} fill={primary} stroke={primary} strokeWidth={0.6} />
      ))}

      {/* pinstripes clipped to the body */}
      {pinstripe && (
        <g clipPath={`url(#${pinId})`}>
          {Array.from({ length: 16 }, (_, i) => {
            const x = 158 + i * 5.5;
            return <rect key={i} x={x} y={VB.y} width={0.9} height={VB.h} fill={secondary} opacity={0.85} />;
          })}
        </g>
      )}

      {/* raglan sleeves + era end-bands */}
      {SLEEVES.map((d, i) => (
        <path key={`sl${i}`} d={d} fill={secondary} stroke={secondary} strokeWidth={0.6} />
      ))}
      {SLEEVE_BANDS.map((d, i) => (
        <path key={`sb${i}`} d={d} fill={secondary} stroke={secondary} strokeWidth={0.4} />
      ))}
      {SLEEVE_STRIPE_WHITE.map((d, i) => (
        <path key={`ss${i}`} d={d} fill={pick(e.sleeveStripe)} />
      ))}

      {/* pullover-era waistband */}
      {e.hem &&
        HEM_BAND.map((d, i) => (
          <path key={`h${i}`} d={d} fill={secondary} stroke={secondary} strokeWidth={0.4} />
        ))}

      {/* plain crew collar band across the top of the back */}
      <path
        d="M183.5 330.5 Q199.25 344 215 330.5 L215 335.5 Q199.25 349.5 183.5 335.5 Z"
        fill={secondary}
        stroke={trim}
        strokeWidth={0.5}
      />

      {/* faint back seam + outer edge so flat fills read as fabric */}
      <g fill="none" stroke={INK} strokeWidth={1.1} opacity={0.85}>
        {BODY_PANELS.map((d, i) => (
          <path key={`e${i}`} d={d} />
        ))}
        {SLEEVES.map((d, i) => (
          <path key={`es${i}`} d={d} />
        ))}
      </g>

      {/* fabric shading */}
      <g clipPath={`url(#${clipId})`}>
        <rect x={VB.x} y={VB.y} width={VB.w} height={VB.h} fill={`url(#${shadeId})`} />
      </g>

      {/* nameplate: era tricode arched high on the back like a surname */}
      {label && (
        <text
          x={CX}
          y={368}
          textAnchor="middle"
          fontFamily="'Archivo Black','Arial Black',sans-serif"
          fontSize={16}
          fill={secondary}
          stroke={trim}
          strokeWidth={0.8}
          paintOrder="stroke"
          style={{ letterSpacing: "0.06em" }}
          aria-label={`Team: ${label}`}
        >
          {label}
        </text>
      )}

      {/* big back number, centered */}
      <text
        x={CX}
        y={number === null ? 438 : 442}
        textAnchor="middle"
        fontFamily="'Archivo Black','Arial Black',sans-serif"
        fontWeight={900}
        fontSize={numFontSize}
        fill={secondary}
        stroke={trim}
        strokeWidth={1.6}
        paintOrder="stroke"
        style={{ letterSpacing: "-0.02em" }}
      >
        {numText}
      </text>
    </svg>
  );
}
