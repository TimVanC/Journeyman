import { useEffect, useRef } from "react";
import JerseyRenderer, { eraTricode, resolveColorway, type ColorwayDB } from "./JerseyRenderer";
import colorwaysJson from "../data/colorways.json";
import type { Stint } from "../game/types";

const colorways = colorwaysJson as unknown as ColorwayDB;

/** deterministic collector-spread tilt per position */
const TILTS = [-2.2, 1.6, -1.3, 2.1, -1.8, 1.4, -2.4, 1.9];

export function formatStintYears(s: Stint): string {
  return `${s.startYear}–${s.endYear + 1}`;
}

interface Props {
  stint: Stint;
  /** position in the (chronologically sorted) spread — drives the tilt */
  spreadIndex: number;
  /** newest card gets the deal-in animation */
  isNewest: boolean;
  /** once a newer jersey is out, this one gets its city code stamped on */
  showLabel: boolean;
  /** staggers the deal-in during the end-of-game cascade (ms) */
  dealDelay?: number;
  /** lets the spread run FLIP slide animations on reorder */
  cardRef?: (el: HTMLElement | null) => void;
}

export default function JerseyCard({ stint, spreadIndex, isNewest, showLabel, dealDelay = 0, cardRef }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  // the flip is the moment of the game — make sure it happens on screen
  // (skip during the end-of-game cascade, where many cards land at once)
  useEffect(() => {
    if (!isNewest || dealDelay > 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [isNewest, dealDelay]);

  const era = resolveColorway(
    colorways,
    stint.franchise,
    stint.startYear,
    stint.endYear
  );

  return (
    <article
      ref={(el) => {
        ref.current = el;
        cardRef?.(el);
      }}
      className={`jersey-card w-full px-1.5 pb-2 pt-1 md:w-36 ${isNewest ? "deal-in" : ""}`}
      style={
        {
          "--tilt": `${TILTS[spreadIndex % TILTS.length]}deg`,
          animationDelay: dealDelay > 0 ? `${dealDelay}ms` : undefined,
        } as React.CSSProperties
      }
      aria-label={`Jersey: ${formatStintYears(stint)}`}
    >
      <p className="text-center font-display text-[0.85rem] leading-tight tracking-wide">
        {formatStintYears(stint)}
      </p>

      <div className="mt-0.5 mb-1 flex justify-center">
        {era ? (
          <JerseyRenderer
            primary={era.primary}
            secondary={era.secondary}
            trim={era.trim}
            number={stint.jerseyNumber}
            eraStyle={era.eraStyle}
            size={70}
            label={showLabel ? eraTricode(era, stint.franchise) : null}
          />
        ) : (
          <div className="flex h-32 items-center justify-center text-ink-soft">
            ?
          </div>
        )}
      </div>

      <dl className="border-t border-line pt-1">
        <div className="grid grid-cols-3 gap-0.5 text-center">
          <Stat label="GP" value={stint.gp} />
          <Stat label="MPG" value={stint.mpg.toFixed(1)} />
          <Stat label="PPG" value={stint.ppg.toFixed(1)} />
        </div>
        <div className="mt-0.5 flex justify-center gap-4 text-center">
          <Stat label="RPG" value={stint.rpg.toFixed(1)} />
          <Stat label="APG" value={stint.apg.toFixed(1)} />
        </div>
      </dl>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-[0.5rem] font-bold uppercase tracking-[0.1em] text-ink-soft">
        {label}
      </dt>
      <dd className="font-display text-[0.78rem] leading-tight tabular-nums">
        {value}
      </dd>
    </div>
  );
}

/** Face-down card on top of the deck — doubles as the reveal button. */
export function DeckCard({
  remaining,
  onReveal,
  tiltIndex,
}: {
  remaining: number;
  onReveal: () => void;
  tiltIndex: number;
}) {
  return (
    <button
      type="button"
      className="deck-card flex w-full flex-col items-center justify-center gap-1.5 px-2 py-4 md:w-36"
      style={{ "--tilt": `${TILTS[tiltIndex % TILTS.length]}deg` } as React.CSSProperties}
      onClick={onReveal}
    >
      <span className="font-display text-3xl leading-none">+1</span>
      <span className="text-[0.58rem] font-bold uppercase tracking-[0.12em]">
        Flip next jersey
      </span>
      <span className="text-[0.56rem] opacity-80">
        {remaining} left in the bag
      </span>
    </button>
  );
}
