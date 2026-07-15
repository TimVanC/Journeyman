import { useEffect, useLayoutEffect, useRef, useState } from "react";
import JerseyRenderer, { eraTricode, resolveColorway, type ColorwayDB } from "./JerseyRenderer";
import colorwaysJson from "../data/colorways.json";
import { getStintSeasons, seasonLabel } from "../data/teamSeasons";
import type { AccoladeType, Stint, StintAccolade } from "../game/types";
import {
  AllNbaIcon,
  CrownIcon,
  FmvpIcon,
  MedalIcon,
  RoyIcon,
  ShieldIcon,
  SixthManIcon,
  StarIcon,
  TrophyIcon,
} from "./Icons";

const colorways = colorwaysJson as unknown as ColorwayDB;

/** deterministic collector-spread nudge per position (px). Rotation is
 *  deliberately avoided — rotated text renders blurry. */
const NUDGES = [0, 4, -3, 2, -4, 3, -2, 5];

const ACCOLADE_META: Record<
  AccoladeType,
  { Icon: (p: { size?: number; className?: string }) => React.ReactNode; label: string }
> = {
  all_star: { Icon: StarIcon, label: "All-Star" },
  champion: { Icon: TrophyIcon, label: "Champion" },
  mvp: { Icon: CrownIcon, label: "MVP" },
  fmvp: { Icon: FmvpIcon, label: "Finals MVP" },
  dpoy: { Icon: ShieldIcon, label: "DPOY" },
  sixth_man: { Icon: SixthManIcon, label: "6MOY" },
  roy: { Icon: RoyIcon, label: "ROY" },
  all_nba: { Icon: AllNbaIcon, label: "All-NBA" },
  olympic_gold: { Icon: MedalIcon, label: "Olympic gold" },
};

export function formatStintYears(s: Stint): string {
  return `${s.startYear}–${s.endYear + 1}`;
}

type Era = NonNullable<ReturnType<typeof resolveColorway>>;

/** The card front — jersey art + stat block. Shared by JerseyCard (the
 *  spread) and DeckCard's mid-flip state, so the "whole card" the deck
 *  flips to is pixel-identical to what lands in the spread a beat later. */
function CardFront({
  stint,
  era,
  showLabel,
  size = 70,
}: {
  stint: Stint;
  era: Era | null;
  showLabel: boolean;
  size?: number;
}) {
  const accolades = stint.accolades ?? [];
  return (
    <>
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
            size={size}
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
    </>
  );
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
  /** invisible while its GhostCard is still in flight from the deck — the
   *  ghost is the only thing on screen until it lands here */
  hidden?: boolean;
  /** lets the spread run FLIP slide animations on reorder */
  cardRef?: (el: HTMLElement | null) => void;
}

export default function JerseyCard({
  stint,
  spreadIndex,
  isNewest,
  showLabel,
  dealDelay = 0,
  hidden = false,
  cardRef,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const flipRef = useRef<HTMLDivElement | null>(null);
  const animating = useRef(false);
  const [showBack, setShowBack] = useState(false);
  // a card that mounts hidden arrived via GhostCard, which already scrolled
  // the deck into view at flip-start — scrolling again once it lands here
  // would fight the ghost's own flight animation
  const suppressScroll = useRef(hidden);

  /** 2D squeeze flip — no 3D layers, so text stays crisp on mobile */
  const toggleFlip = () => {
    if (animating.current) return;
    const el = flipRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce) {
      setShowBack((b) => !b);
      return;
    }
    animating.current = true;
    const squeeze = el.animate(
      [{ transform: "scaleX(1)" }, { transform: "scaleX(0.04)" }],
      { duration: 130, easing: "ease-in" }
    );
    squeeze.finished
      .then(() => {
        setShowBack((b) => !b);
        return el.animate(
          [{ transform: "scaleX(0.04)" }, { transform: "scaleX(1)" }],
          { duration: 170, easing: "ease-out" }
        ).finished;
      })
      .catch(() => {
        setShowBack((b) => !b);
      })
      .finally(() => {
        animating.current = false;
      });
  };

  // the flip is the moment of the game — make sure it happens on screen
  // (skip during the end-of-game cascade, where many cards land at once)
  useEffect(() => {
    if (!isNewest || dealDelay > 0 || suppressScroll.current) return;
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
      className={`jersey-card w-full cursor-pointer px-1.5 pb-2 pt-1 md:w-36 ${isNewest && dealDelay > 0 ? "deal-in" : ""}`}
      style={
        {
          "--nudge": `${NUDGES[spreadIndex % NUDGES.length]}px`,
          animationDelay: dealDelay > 0 ? `${dealDelay}ms` : undefined,
          visibility: hidden ? "hidden" : undefined,
        } as React.CSSProperties
      }
      aria-label={`Jersey: ${formatStintYears(stint)}. Tap for details.`}
      aria-pressed={showBack}
      tabIndex={0}
      onClick={toggleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      }}
    >
      <div className="card-flip" ref={flipRef}>
        {/* front — kept in flow (hidden) while flipped so the card holds its height */}
        <div className="card-face" style={{ visibility: showBack ? "hidden" : "visible" }}>
          <CardFront stint={stint} era={era} showLabel={showLabel} />
        </div>

        {/* back — the stop's hardware + season-by-season record */}
        {showBack && (
        <div className="card-face card-back">
          <p className="border-b border-line pb-0.5 text-center font-display text-[0.85rem] leading-tight tracking-wide">
            {formatStintYears(stint)}
          </p>

          {accolades.length > 0 && (
            <ul className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-0.5 border-b border-line pb-1.5">
              {accolades.map((a) => {
                const meta = ACCOLADE_META[a.type];
                return (
                  <li key={a.type} className="flex items-center gap-1 text-[0.62rem] font-bold leading-tight">
                    <meta.Icon size={12} className="shrink-0 text-wood-deep" />
                    {a.count > 1 ? `${a.count}× ` : ""}
                    {meta.label}
                  </li>
                );
              })}
            </ul>
          )}

          {(() => {
            const seasons = getStintSeasons(stint.franchise, stint.startYear, stint.endYear);
            if (seasons.length === 0) return null;
            return (
              <div className="mt-1">
                <div className="season-grid season-head">
                  <span>Yr</span>
                  <span className="text-center">W–L</span>
                  <span className="text-right">Playoffs</span>
                </div>
                {seasons.map((s) => (
                  <div key={s.year} className="season-grid">
                    <span className="font-bold">{seasonLabel(s.year)}</span>
                    <span className="text-center">
                      {s.w}–{s.l}
                    </span>
                    <span
                      className={`text-right ${
                        s.po === ""
                          ? "text-ink-soft"
                          : s.fw === 1
                            ? "font-bold text-[#2e7d43]"
                            : s.fw === 0
                              ? "font-bold text-[#b3362a]"
                              : ""
                      }`}
                    >
                      {s.po === "" ? "—" : s.po}
                    </span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
        )}
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

/** Flies the just-flipped card from the deck to its landing slot in one
 *  continuous motion. This is the ONLY thing that moves during a reveal —
 *  the deck reverts to face-down and the real JerseyCard mounts (invisible,
 *  via its `hidden` prop) the instant this starts, both hidden underneath
 *  the ghost, so there's no hard cut between "flip" and "slide". */
export function GhostCard({
  stint,
  from,
  to,
  onArrived,
}: {
  stint: Stint;
  from: DOMRect;
  to: DOMRect;
  onArrived: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const era = resolveColorway(colorways, stint.franchise, stint.startYear, stint.endYear);

  // useLayoutEffect (not useEffect): the flight must start on the very
  // first paint, or the ghost would sit still at the deck for a frame
  useLayoutEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce) {
      onArrived();
      return;
    }
    const dx = to.left - from.left;
    const dy = to.top - from.top;
    const sx = to.width / from.width;
    const sy = to.height / from.height;
    const anim = el.animate(
      [
        { transform: "translate(0px, 0px) scale(1, 1)" },
        {
          transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 14}px) scale(${(1 + sx) / 2}, ${(1 + sy) / 2})`,
          offset: 0.5,
        },
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
      ],
      { duration: 800, easing: "cubic-bezier(0.3, 0.8, 0.3, 1)", fill: "forwards" }
    );
    anim.finished.then(onArrived).catch(onArrived);
    // fires once for this ghost's one-shot flight; from/to/onArrived are
    // fixed for its lifetime (a fresh GhostCard mounts per reveal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="jersey-card w-full px-1.5 pb-2 pt-1"
      style={{
        position: "fixed",
        left: from.left,
        top: from.top,
        width: from.width,
        height: from.height,
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      <CardFront stint={stint} era={era} showLabel size={70} />
    </div>
  );
}

/** Face-down mystery jersey on top of the deck — the reveal button.
 *  When `flipStint` is set, the top card flips face-up in place (same 2D
 *  squeeze as the jersey cards) to show the incoming jersey before the
 *  real card slides off to its chronological slot. */
export function DeckCard({
  remaining,
  onReveal,
  tiltIndex,
  flipStint = null,
  cardRef,
}: {
  remaining: number;
  onReveal: () => void;
  tiltIndex: number;
  /** mid-reveal: the stint currently being flipped face-up on the deck */
  flipStint?: Stint | null;
  /** registered with the spread so new jerseys can animate out from here */
  cardRef?: (el: HTMLElement | null) => void;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const flipRef = useRef<HTMLDivElement | null>(null);
  const [faceUp, setFaceUp] = useState(false);

  // flip the top card: squeeze shut face-down, swap, open face-up.
  // When flipStint clears, snap back instantly — the flipped card has
  // slid away and the next face-down card is simply what's underneath.
  useEffect(() => {
    if (!flipStint) {
      setFaceUp(false);
      return;
    }
    const el = flipRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // the flip is the payoff — make sure the deck is on screen for it
    btnRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
    if (!el || reduce) {
      setFaceUp(true);
      return;
    }
    const squeeze = el.animate(
      [{ transform: "scaleX(1)" }, { transform: "scaleX(0.04)" }],
      { duration: 150, easing: "ease-in" }
    );
    squeeze.finished
      .then(() => {
        setFaceUp(true);
        return el.animate(
          [{ transform: "scaleX(0.04)" }, { transform: "scaleX(1)" }],
          { duration: 200, easing: "ease-out" }
        ).finished;
      })
      .catch(() => {
        setFaceUp(true);
      });
  }, [flipStint]);

  const era = flipStint
    ? resolveColorway(colorways, flipStint.franchise, flipStint.startYear, flipStint.endYear)
    : null;
  const showFace = faceUp && flipStint !== null;

  return (
    <button
      type="button"
      ref={(el) => {
        btnRef.current = el;
        cardRef?.(el);
      }}
      className={`deck-card flex w-full flex-col items-center justify-center px-2 py-3 md:w-36 ${showFace ? "is-face px-1.5 pb-2 pt-1" : "gap-1"}`}
      style={{ "--nudge": `${NUDGES[tiltIndex % NUDGES.length]}px` } as React.CSSProperties}
      onClick={onReveal}
    >
      <div className="w-full" ref={flipRef}>
        {showFace && flipStint ? (
          <CardFront stint={flipStint} era={era} showLabel size={70} />
        ) : (
          <div className="flex flex-col items-center gap-1">
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
          </div>
        )}
      </div>
    </button>
  );
}
