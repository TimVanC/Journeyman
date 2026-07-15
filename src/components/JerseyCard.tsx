import { useEffect, useRef, useState } from "react";
import JerseyRenderer, { eraTricode, resolveColorway, type ColorwayDB } from "./JerseyRenderer";
import colorwaysJson from "../data/colorways.json";
import { getStintSeasons, seasonLabel } from "../data/teamSeasons";
import type { AccoladeType, Stint, StintAccolade } from "../game/types";
import {
  AllNbaIcon,
  CrownIcon,
  MedalIcon,
  RoyIcon,
  ShieldIcon,
  SixthManIcon,
  StarIcon,
  TrophyIcon,
} from "./Icons";

const colorways = colorwaysJson as unknown as ColorwayDB;

/** deterministic collector-spread tilt per position */
const TILTS = [-2.2, 1.6, -1.3, 2.1, -1.8, 1.4, -2.4, 1.9];

const ACCOLADE_META: Record<
  AccoladeType,
  { Icon: (p: { size?: number; className?: string }) => React.ReactNode; label: string }
> = {
  all_star: { Icon: StarIcon, label: "NBA All-Star" },
  champion: { Icon: TrophyIcon, label: "NBA champion" },
  mvp: { Icon: CrownIcon, label: "League MVP" },
  dpoy: { Icon: ShieldIcon, label: "Defensive Player of the Year" },
  sixth_man: { Icon: SixthManIcon, label: "Sixth Man of the Year" },
  roy: { Icon: RoyIcon, label: "Rookie of the Year" },
  all_nba: { Icon: AllNbaIcon, label: "All-NBA First Team" },
  olympic_gold: { Icon: MedalIcon, label: "Olympic gold" },
};

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
  const [flipped, setFlipped] = useState(false);

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
  const accolades = stint.accolades ?? [];

  return (
    <article
      ref={(el) => {
        ref.current = el;
        cardRef?.(el);
      }}
      className={`jersey-card w-full cursor-pointer px-1.5 pb-2 pt-1 md:w-36 ${isNewest ? "deal-in" : ""} ${flipped ? "is-flipped" : ""}`}
      style={
        {
          "--tilt": `${TILTS[spreadIndex % TILTS.length]}deg`,
          animationDelay: dealDelay > 0 ? `${dealDelay}ms` : undefined,
        } as React.CSSProperties
      }
      aria-label={`Jersey: ${formatStintYears(stint)}. Tap for details.`}
      tabIndex={0}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div className="card-flip">
        {/* front */}
        <div className="card-face">
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
              <div className="flex h-24 items-center justify-center text-ink-soft">?</div>
            )}
          </div>

          {accolades.length > 0 && (
            <p className="mb-0.5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-[0.6rem] font-bold text-ink-soft">
              {accolades.map((a) => (
                <AccoladeChip key={a.type} accolade={a} />
              ))}
            </p>
          )}

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
        </div>

        {/* back — the stop's hardware + season-by-season record */}
        <div className="card-face card-back">
          <p className="text-center font-display text-[0.85rem] leading-tight tracking-wide">
            {formatStintYears(stint)}
          </p>

          {accolades.length > 0 && (
            <ul className="mt-1 space-y-0.5 border-b border-line pb-1">
              {accolades.map((a) => {
                const meta = ACCOLADE_META[a.type];
                return (
                  <li key={a.type} className="flex items-center gap-1.5 text-[0.62rem] font-semibold leading-tight">
                    <meta.Icon size={12} className="shrink-0 text-wood-deep" />
                    {a.count > 1 ? `${a.count}× ` : ""}
                    {meta.label}
                  </li>
                );
              })}
            </ul>
          )}

          <ul className="mt-1">
            {getStintSeasons(stint.franchise, stint.startYear, stint.endYear).map((s) => (
              <li
                key={s.year}
                className="flex items-baseline justify-between gap-1 py-px text-[0.6rem] leading-tight tabular-nums"
              >
                <span className="font-bold">{seasonLabel(s.year)}</span>
                <span>{s.w}–{s.l}</span>
                <span
                  className={`w-[3.6rem] truncate text-right ${
                    s.po === ""
                      ? "text-ink-soft"
                      : s.po.startsWith("Won")
                        ? "font-bold"
                        : ""
                  }`}
                >
                  {s.po === "" ? "Missed" : s.po}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function AccoladeChip({ accolade }: { accolade: StintAccolade }) {
  const meta = ACCOLADE_META[accolade.type];
  return (
    <span className="inline-flex items-center gap-0.5" title={meta.label}>
      <meta.Icon size={12} className="text-wood-deep" />
      {accolade.count > 1 && <span className="tabular-nums">×{accolade.count}</span>}
      <span className="sr-only">{meta.label}</span>
    </span>
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

/** Face-down mystery jersey on top of the deck — the reveal button. */
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
      className="deck-card flex w-full flex-col items-center justify-center gap-1 px-2 py-3 md:w-36"
      style={{ "--tilt": `${TILTS[tiltIndex % TILTS.length]}deg` } as React.CSSProperties}
      onClick={onReveal}
    >
      <JerseyRenderer
        primary="#f2e7d2"
        secondary="#8a5f3c"
        trim="#3a2c1c"
        number={null}
        eraStyle="nineties"
        size={62}
      />
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em]">
        Flip next
      </span>
      <span className="text-[0.56rem] opacity-80">
        {remaining} left in the bag
      </span>
    </button>
  );
}
