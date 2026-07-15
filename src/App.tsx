import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import Header from "./components/Header";
import JerseyCard, { DeckCard } from "./components/JerseyCard";
import HintTray from "./components/HintTray";
import GuessInput from "./components/GuessInput";
import ResultModal from "./components/ResultModal";
import HelpModal from "./components/HelpModal";
import StartScreen from "./components/StartScreen";
import Confetti from "./components/Confetti";
import { puzzles } from "./data/puzzles";
import { getPhase, initialState, reducer, HINT_COUNT } from "./game/state";
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

  const cardEls = useRef(new Map<number, HTMLElement>());
  const prevRects = useRef(new Map<number, DOMRect>());
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardEls.current.forEach((el, key) => {
      const now = el.getBoundingClientRect();
      const last = prevRects.current.get(key);
      if (last && !reduce && key !== newestIdx) {
        const dx = last.left - now.left;
        const dy = last.top - now.top;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          // slow enough to actually watch the career re-order itself
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
            {
              duration: 1250,
              delay: 120,
              fill: "backwards",
              easing: "cubic-bezier(0.3, 0.9, 0.35, 1)",
            }
          );
        }
      }
      prevRects.current.set(key, now);
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

      {testIndex !== null && (
        <div className="test-bar" role="navigation" aria-label="Test mode puzzle picker">
          <span className="test-bar-tag">Test</span>
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
                onReveal={() => dispatch({ type: "reveal", puzzle })}
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
            onGuess={(name) => dispatch({ type: "guess", puzzle, name })}
          />
          <button
            type="button"
            className="btn shrink-0"
            disabled={!over && phase === "final"}
            onClick={() =>
              over ? setShowResult(true) : dispatch({ type: "reveal", puzzle })
            }
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
