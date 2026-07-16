import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import Header from "./components/Header";
import JerseyCard, { DeckCard, GhostCard } from "./components/JerseyCard";
import HintTray from "./components/HintTray";
import GuessInput from "./components/GuessInput";
import ResultModal from "./components/ResultModal";
import HelpModal from "./components/HelpModal";
import StartScreen from "./components/StartScreen";
import Confetti from "./components/Confetti";
import { puzzles } from "./data/puzzles";
import { getPhase, initialState, reducer, HINT_COUNT } from "./game/state";
import type { Stint } from "./game/types";
import {
  currentDayNumber,
  displayStreak,
  loadGameState,
  loadProfile,
  recordResult,
  saveGameState,
  todayET,
} from "./game/storage";

/** Only the BR-verified puzzles rotate daily; 6+ are archetype test
 *  puzzles reachable through test mode. */
const DAILY_POOL = 5;

/** Test mode: ?p=3 forces puzzle 3 (1-based) in its own save slot;
 *  ?test drops you at puzzle 1. Remove before launch. */
function resolveGame(): {
  day: number;
  puzzle: (typeof puzzles)[number];
  testIndex: number | null;
} {
  const realDay = currentDayNumber();
  const params = new URLSearchParams(location.search);
  let forced = Number(params.get("p"));
  if (!forced && params.has("test")) forced = 1;
  if (forced >= 1 && forced <= puzzles.length) {
    return { day: 9000 + forced, puzzle: puzzles[forced - 1], testIndex: forced };
  }
  return {
    day: realDay,
    puzzle: puzzles[(realDay - 1) % DAILY_POOL],
    testIndex: null,
  };
}

function resetTestSlots() {
  for (let i = 1; i <= puzzles.length; i++) {
    localStorage.removeItem(`journeyman:game:v1:${9000 + i}`);
  }
  // scrub any test-day records left in the profile by older builds
  try {
    const raw = localStorage.getItem("journeyman:profile:v1");
    if (raw) {
      const prof = JSON.parse(raw);
      for (const k of Object.keys(prof.history ?? {})) {
        if (Number(k) >= 9000) delete prof.history[k];
      }
      if ((prof.lastSolvedDay ?? 0) >= 9000) {
        prof.lastSolvedDay = null;
        prof.streak = 0;
      }
      localStorage.setItem("journeyman:profile:v1", JSON.stringify(prof));
    }
  } catch {
    /* fine */
  }
  location.reload();
}

export default function App() {
  const { day, puzzle, testIndex } = resolveGame();
  const total = puzzle.stints.length;

  const [state, dispatch] = useReducer(reducer, day, (d) => {
    const saved = loadGameState(d);
    // test puzzles replay forever: resume mid-game, but a finished
    // slot starts fresh on the next visit
    if (testIndex !== null && saved?.status !== "playing") return initialState(d);
    return saved ?? initialState(d);
  });
  const [profile, setProfile] = useState(loadProfile);
  // test mode goes straight to the board — no start screen between puzzles
  const [showStart, setShowStart] = useState(testIndex === null);
  const [showResult, setShowResult] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [justLost, setJustLost] = useState(false);

  const phase = getPhase(state, puzzle);
  const over = state.status !== "playing";

  // persist every move so a refresh resumes mid-game
  useEffect(() => saveGameState(state), [state]);

  // win/lose effects only when it happens live, not on reload of a done game
  const prevStatus = useRef(state.status);
  useEffect(() => {
    if (prevStatus.current === "playing" && state.status === "won") setCelebrate(true);
    if (prevStatus.current === "playing" && state.status === "lost") setJustLost(true);
    prevStatus.current = state.status;
  }, [state.status]);

  // record win/loss exactly once, then pop the result card.
  // test games never touch the real streak/history.
  const recorded = useRef(false);
  useEffect(() => {
    if (!over || recorded.current) return;
    recorded.current = true;
    if (testIndex === null) {
      setProfile(
        recordResult(day, state.status === "won" ? state.revealed : "DNF")
      );
    }
    const t = setTimeout(() => setShowResult(true), state.status === "won" ? 1100 : 1400);
    return () => clearTimeout(t);
  }, [over, day, state.status, state.revealed, testIndex]);

  const DECK_KEY = -1;
  const cardEls = useRef(new Map<number, HTMLElement>());
  const prevRects = useRef(new Map<number, DOMRect>());

  // ---- flip-the-top-card reveal ----
  // Tapping the deck (or the reveal button) first flips the deck's top
  // card face-up in place, showing the incoming jersey; after a beat a
  // GhostCard flies that same card from the deck to its chronological
  // slot in one continuous motion — the deck reverts to face-down and the
  // real JerseyCard mounts (invisible until the ghost lands) at the exact
  // same instant, both hidden underneath the ghost the whole flight.
  const FLIP_REVEAL_MS = 850; // squeeze flip (~350ms) + a beat to read it
  const [flipIdx, setFlipIdx] = useState<number | null>(null);
  const flipTimer = useRef<number | null>(null);
  const dealtFromFlip = useRef(false);
  // the deck's on-screen rect at the instant the flip ends, and the stint
  // it was showing — captured BEFORE the deck snaps back to face-down, so
  // the ghost's flight starts from exactly where the flipped card was
  const flipOriginRect = useRef<DOMRect | null>(null);
  const pendingGhostStint = useRef<Stint | null>(null);
  // the stint index currently mid-flip — a ref, not just the flipIdx state,
  // because finishFlip is scheduled via setTimeout from the SAME render
  // that calls setFlipIdx: its closure would otherwise see the stale
  // pre-click flipIdx (null) instead of the value just set
  const flipTargetIdx = useRef<number | null>(null);
  const [ghost, setGhost] = useState<{
    key: number;
    stint: Stint;
    from: DOMRect;
    to: DOMRect;
  } | null>(null);
  // the card that's about to fly, hidden from the VERY render it appears in.
  // `ghost` only gets set a render later (in the layout effect), so relying on
  // it alone would flash the real card at its final slot for one frame before
  // the ghost covers it. This bridges that gap; the ghost takes over once set.
  const [flightIdx, setFlightIdx] = useState<number | null>(null);

  const finishFlip = () => {
    if (flipTimer.current === null) return;
    clearTimeout(flipTimer.current);
    flipTimer.current = null;
    flipOriginRect.current = cardEls.current.get(DECK_KEY)?.getBoundingClientRect() ?? null;
    pendingGhostStint.current =
      flipTargetIdx.current !== null ? puzzle.stints[flipTargetIdx.current] : null;
    setFlipIdx(null);
    dealtFromFlip.current = true;
    setFlightIdx(flipTargetIdx.current); // hide the incoming card on this render
    dispatch({ type: "reveal", puzzle });
  };

  const revealNext = () => {
    if (over || flipTimer.current !== null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // hints and reduced-motion reveals stay instant — only jersey flips stage
    if (phase !== "jerseys" || reduce) {
      dispatch({ type: "reveal", puzzle });
      return;
    }
    const idx = puzzle.revealOrder[state.revealed];
    flipTargetIdx.current = idx;
    setFlipIdx(idx);
    flipTimer.current = window.setTimeout(finishFlip, FLIP_REVEAL_MS);
  };

  useEffect(
    () => () => {
      if (flipTimer.current !== null) clearTimeout(flipTimer.current);
    },
    []
  );

  // ---- chronological spread with FLIP slide-into-place ----
  // once the game ends, every remaining stint cascades onto the board
  const revealedSet = new Set(puzzle.revealOrder.slice(0, state.revealed));
  const shownIdxs = over
    ? puzzle.stints.map((_, i) => i)
    : puzzle.revealOrder.slice(0, state.revealed);
  const revealedChrono = shownIdxs
    .map((stintIdx) => ({ stintIdx, stint: puzzle.stints[stintIdx] }))
    .sort(
      (a, b) => a.stint.startYear - b.stint.startYear || a.stintIdx - b.stintIdx
    );
  const newestIdx = puzzle.revealOrder[state.revealed - 1];
  // stagger the end-of-game cascade in career order
  const cascadeDelays = new Map<number, number>();
  if (over) {
    let n = 0;
    for (const { stintIdx } of revealedChrono) {
      if (!revealedSet.has(stintIdx)) cascadeDelays.set(stintIdx, 150 + n++ * 130);
    }
  }

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // a reorder changes every card's --nudge, and the CSS translate
    // transition would wobble the cards during the slide's delay. Suppress
    // it for this frame so each card snaps to its final nudge before we
    // measure — the delta then rides along inside the slide instead.
    cardEls.current.forEach((el) => {
      el.style.transition = "none";
    });
    cardEls.current.forEach((el, key) => {
      const now = el.getBoundingClientRect();
      const last = prevRects.current.get(key);
      // brand-new in-game card
      if (!last && !reduce && !over && key === newestIdx && key !== DECK_KEY) {
        if (dealtFromFlip.current) {
          // the GhostCard flies from the deck to exactly this spot; this
          // real card stays invisible (see its `hidden` prop) until it
          // lands, so nothing here animates on its own
          if (flipOriginRect.current && pendingGhostStint.current) {
            setGhost({
              key: newestIdx,
              stint: pendingGhostStint.current,
              from: flipOriginRect.current,
              to: now,
            });
          }
        } else {
          // penalty reveal (wrong guess): dealt from under the deck
          const deckPrev = prevRects.current.get(DECK_KEY);
          if (deckPrev) {
            const dx = deckPrev.left - now.left;
            const dy = deckPrev.top - now.top;
            const clearZ = () => {
              el.style.zIndex = "";
            };
            el.style.zIndex = "1"; // beneath the deck (z 3) while emerging
            el.animate(
              [
                { transform: `translate(${dx}px, ${dy}px) scale(0.9)`, opacity: 0.9 },
                { transform: "translate(0, 0) scale(1)", opacity: 1 },
              ],
              { duration: 750, easing: "cubic-bezier(0.25, 0.9, 0.3, 1)", fill: "backwards" }
            ).finished.then(clearZ, clearZ);
          }
        }
      }
      if (last && !reduce && key !== newestIdx) {
        const dx = last.left - now.left;
        const dy = last.top - now.top;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          // NO delay: the displaced cards start clearing the insertion slot
          // immediately so it's empty before the ghost flies in (which is
          // itself held back ~140ms). Otherwise the old occupant sits in the
          // new card's slot and crosses the incoming ghost. Still slow enough
          // to watch the career re-order; the card lifts as it travels.
          el.style.zIndex = "5";
          const slide = el.animate(
            [
              { transform: `translate(${dx}px, ${dy}px) scale(1)` },
              {
                transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 12}px) scale(1.05)`,
                offset: 0.5,
              },
              { transform: "translate(0, 0) scale(1)" },
            ],
            {
              duration: 900,
              fill: "backwards",
              easing: "cubic-bezier(0.3, 0.8, 0.3, 1)",
            }
          );
          slide.finished
            .then(() => {
              el.style.zIndex = "";
            })
            .catch(() => {
              el.style.zIndex = "";
            });
        }
      }
      prevRects.current.set(key, now);
    });
    dealtFromFlip.current = false;
    flipOriginRect.current = null;
    pendingGhostStint.current = null;
    // hand off hiding to the ghost (now set) — or, if no ghost was created
    // (game-over cascade, missing rects), let the card show. Both updates
    // batch with setGhost into the next render, so hiding never lapses.
    setFlightIdx(null);
    // safe to restore immediately: the nudge has already snapped, so no
    // transition retriggers, and hover lifts keep animating afterwards
    cardEls.current.forEach((el) => {
      el.style.transition = "";
    });
  }, [state.revealed, newestIdx, over]);

  const remaining = total - state.revealed;
  const streak = displayStreak(profile, day);

  // player profile: full reveal once the game ends; on mobile it fills the
  // leftover columns of the spread's last row when the count isn't a
  // multiple of 3, otherwise it sits above the spread
  const showProfile = over || phase === "hints" || phase === "final";
  const profileRevealed = over ? HINT_COUNT : state.hintsRevealed;
  const profileInGrid = total % 3 !== 0;
  const dateLabel = new Date(`${todayET()}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const startCta = over
    ? "See result"
    : state.trail.length > 1 || state.wrongGuesses.length > 0
      ? "Continue"
      : "Play";

  const revealLabel =
    phase === "jerseys"
      ? `Flip jersey (+1)`
      : phase === "hints"
        ? "Take a hint"
        : phase === "final"
          ? "Last guess!"
          : "See result";

  return (
    <div className="relative min-h-dvh pb-40">
      <div className="court-arc" aria-hidden="true" />
      <Header streak={streak} onHelp={() => setShowHelp(true)} />

      {/* dev builds always show the picker; production only via ?p / ?test */}
      {(testIndex !== null || import.meta.env.DEV) && (
        <div className="test-bar" role="navigation" aria-label="Test mode puzzle picker">
          <span className="test-bar-tag">Test</span>
          <a
            href={location.pathname}
            className={`test-bar-slot ${testIndex === null ? "is-active" : ""}`}
            aria-current={testIndex === null ? "page" : undefined}
          >
            daily
          </a>
          {puzzles.map((pz, i) => (
            <a
              key={pz.id}
              href={`?p=${i + 1}`}
              className={`test-bar-slot ${i + 1 === testIndex ? "is-active" : ""}`}
              aria-current={i + 1 === testIndex ? "page" : undefined}
            >
              {i + 1}
            </a>
          ))}
          <button type="button" className="test-bar-slot" onClick={resetTestSlots}>
            reset
          </button>
        </div>
      )}

      <main className="relative z-0">
        <p className="mt-4 text-center text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
          Puzzle #{day} · jersey {state.revealed} of {total}
        </p>

        {showProfile && (
          <HintTray
            variant="strip"
            hints={puzzle.hints}
            revealedCount={profileRevealed}
            className={profileInGrid ? "max-md:hidden" : ""}
          />
        )}

        {/* the collector spread — always in career order */}
        <div className="card-spread">
          <div className={`card-row ${justLost ? "shake" : ""}`}>
            {revealedChrono.map(({ stintIdx, stint }, i) => (
              <JerseyCard
                key={stintIdx}
                stint={stint}
                spreadIndex={i}
                isNewest={
                  over
                    ? cascadeDelays.has(stintIdx)
                    : stintIdx === newestIdx && state.revealed > 1
                }
                showLabel
                dealDelay={cascadeDelays.get(stintIdx) ?? 0}
                hidden={ghost?.key === stintIdx || flightIdx === stintIdx}
                cardRef={(el) => {
                  if (el) cardEls.current.set(stintIdx, el);
                  else cardEls.current.delete(stintIdx);
                }}
              />
            ))}
            {!over && remaining > 0 && (
              <DeckCard
                remaining={remaining}
                tiltIndex={state.revealed}
                flipStint={flipIdx !== null ? puzzle.stints[flipIdx] : null}
                onReveal={revealNext}
                cardRef={(el) => {
                  if (el) cardEls.current.set(-1, el);
                  else cardEls.current.delete(-1);
                }}
              />
            )}
            {showProfile && profileInGrid && (
              <HintTray
                variant="cell"
                hints={puzzle.hints}
                revealedCount={profileRevealed}
                span={3 - (total % 3)}
                className="md:hidden"
              />
            )}
          </div>
        </div>

        {phase === "final" && (
          <p className="px-4 pb-2 text-center text-sm font-bold text-[#a13333]">
            The player profile is wide open. One final guess.
          </p>
        )}
      </main>

      {/* guess bar — thumb zone on mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-paper/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-sm">
        {state.wrongGuesses.length > 0 && (
          <div className="mx-auto max-w-xl px-4 pb-2" aria-label="Wrong guesses">
            <ul className="flex flex-wrap justify-center gap-1.5">
              {state.wrongGuesses.map((g) => (
                <li key={g} className="chip chip-miss text-xs">
                  {g}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mx-auto flex max-w-xl items-stretch gap-2 px-4">
          <GuessInput
            disabled={over}
            alreadyGuessed={state.wrongGuesses}
            onGuess={(name) => {
              finishFlip(); // a guess mid-flip settles the pending reveal first
              dispatch({ type: "guess", puzzle, name });
            }}
          />
          <button
            type="button"
            className="btn shrink-0"
            disabled={!over && phase === "final"}
            onClick={() => (over ? setShowResult(true) : revealNext())}
          >
            {revealLabel}
          </button>
        </div>
        {phase === "hints" && (
          <p className="mt-1.5 text-center text-[0.68rem] text-ink-soft">
            All jerseys are out — hints left: {HINT_COUNT - state.hintsRevealed}
          </p>
        )}
      </div>

      {ghost && (
        <GhostCard
          key={ghost.key}
          stint={ghost.stint}
          from={ghost.from}
          to={ghost.to}
          onArrived={() => {
            setGhost(null);
            setFlightIdx(null);
          }}
        />
      )}

      {celebrate && <Confetti />}

      {showStart && (
        <StartScreen
          day={day}
          cta={startCta}
          dateLabel={dateLabel}
          streak={streak}
          onPlay={() => {
            setShowStart(false);
            if (over) setShowResult(true);
          }}
          onRules={() => setShowHelp(true)}
        />
      )}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {showResult && over && (
        <ResultModal
          puzzle={puzzle}
          state={state}
          streak={profile.streak}
          onClose={() => setShowResult(false)}
          onNext={
            testIndex !== null
              ? () => {
                  location.href = `?p=${(testIndex % puzzles.length) + 1}`;
                }
              : undefined
          }
          onReplay={
            testIndex !== null
              ? () => {
                  localStorage.removeItem(`journeyman:game:v1:${day}`);
                  location.reload();
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
