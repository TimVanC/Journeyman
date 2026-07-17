import { useEffect, useState } from "react";
import JerseyRenderer, { resolveColorway, type ColorwayDB } from "./JerseyRenderer";
import colorwaysJson from "../data/colorways.json";
import { formatStintYears } from "./JerseyCard";
import { buildShareText, copyToClipboard } from "../game/share";
import { computeGrade } from "../game/grade";
import { computeScore } from "../game/score";
import { fetchDayStanding, type DayStanding } from "../lib/cloud";
import type { GameState, Puzzle } from "../game/types";
import { FlameIcon } from "./Icons";

const colorways = colorwaysJson as unknown as ColorwayDB;

/** only claim a percentile once there's a real crowd to compare against */
const MIN_CROWD = 5;

interface Props {
  puzzle: Puzzle;
  state: GameState;
  streak: number;
  hard: boolean;
  /** daily game (not test, not archive) — eligible for today's leaderboard pool */
  canRank: boolean;
  onClose: () => void;
  /** test mode only: jump to the next puzzle */
  onNext?: () => void;
  /** test mode only: wipe this slot and play it again */
  onReplay?: () => void;
}

export default function ResultModal({
  puzzle,
  state,
  streak,
  hard,
  canRank,
  onClose,
  onNext,
  onReplay,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [standing, setStanding] = useState<DayStanding | null>(null);
  const won = state.status === "won";
  const total = puzzle.stints.length;
  const score = computeScore(state, hard);
  const grade = computeGrade(state, puzzle);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // where today's crowd landed (wins only — no percentile pats for a DNF)
  useEffect(() => {
    if (!canRank || !won) return;
    fetchDayStanding(state.day, score).then(setStanding);
  }, [canRank, won, state.day, score]);

  const beatenPct =
    standing && standing.others >= MIN_CROWD
      ? Math.round((standing.beaten / standing.others) * 100)
      : null;

  const share = async () => {
    const text = buildShareText({
      day: state.day,
      grade: grade.label,
      score,
      revealed: state.revealed,
      total,
      hints: state.hintsRevealed,
      hard,
      beatenPct,
    });
    // native share sheet on mobile, clipboard everywhere else
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        /* user dismissed the sheet or share failed — fall through */
      }
    }
    const ok = await copyToClipboard(text);
    setCopied(ok);
    if (ok) setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Result"
        className="modal-panel p-5"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
            Journeyman #{state.day}
            {hard && " · Hard"}
          </p>
          <div className="flex items-center gap-2">
            {/* long careers push the main share button way down — this one
                stays in reach at the top */}
            <button type="button" className="btn btn-primary btn-sm" onClick={share}>
              {copied ? "Copied!" : "Share"}
            </button>
            <button type="button" className="chip cursor-pointer" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        <h2 className="font-display mt-1 text-[2.1rem] leading-none tracking-wide">
          {grade.label}
        </h2>
        <p className="mt-1 text-[0.82rem] font-medium text-ink-soft">
          {grade.detail}
        </p>
        <p className="mt-1.5 text-lg font-semibold">{puzzle.answer}</p>
        {puzzle.accolades && puzzle.accolades.length > 0 && (
          <ul className="mt-1.5 flex flex-wrap gap-1.5" aria-label="Career accolades">
            {puzzle.accolades.map((a) => (
              <li key={a} className="chip text-[0.68rem]">
                {a}
              </li>
            ))}
          </ul>
        )}

        {/* the scorecard — same facts the share text carries */}
        <div className="result-ticket mt-3" aria-label="Scorecard">
          <span className="font-display text-3xl leading-none tabular-nums">
            {score}
            <span className="ml-1 text-xs font-bold uppercase tracking-widest text-ink-soft">
              pts
            </span>
          </span>
          <span className="text-sm font-bold tabular-nums text-ink-soft">
            {won ? state.revealed : "X"}/{total} jerseys
            {state.hintsRevealed > 0 && ` · ${state.hintsRevealed} hint${state.hintsRevealed > 1 ? "s" : ""}`}
            {state.wrongGuesses.length > 0 &&
              ` · ${state.wrongGuesses.length} miss${state.wrongGuesses.length > 1 ? "es" : ""}`}
          </span>
          {streak > 0 && (
            <span className="ml-auto flex items-center gap-1 text-sm font-bold tabular-nums">
              <FlameIcon className="text-wood-deep" /> {streak}
            </span>
          )}
        </div>
        {beatenPct !== null && (
          <p className="mt-2 text-sm font-bold text-[#2e7d43]">
            Better than {beatenPct}% of today's players.
          </p>
        )}

        {/* full career, chronological, team names finally shown */}
        <ol className="mt-4">
          {puzzle.stints.map((s, i) => {
            const era = resolveColorway(colorways, s.franchise, s.startYear, s.endYear);
            return (
              <li
                key={i}
                className="flex items-center gap-3 border-t border-line py-1.5 last:border-b"
              >
                {era && (
                  <JerseyRenderer
                    primary={era.primary}
                    secondary={era.secondary}
                    trim={era.trim}
                    number={s.jerseyNumber}
                    eraStyle={era.eraStyle}
                    size={26}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold leading-tight">
                    {s.displayTeam}
                  </p>
                  <p className="text-[0.7rem] text-ink-soft tabular-nums">
                    {formatStintYears(s)} · {s.gp} GP · {s.ppg.toFixed(1)} PPG
                  </p>
                </div>
                <span className="font-display text-base text-ink-soft">
                  #{s.jerseyNumber}
                </span>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          className="btn btn-primary mt-4 w-full py-3.5 text-sm"
          onClick={share}
        >
          {copied ? "Copied to clipboard!" : "Share result"}
        </button>
        {(onNext || onReplay) && (
          <div className="mt-2 flex gap-2">
            {onReplay && (
              <button type="button" className="btn flex-1" onClick={onReplay}>
                Replay
              </button>
            )}
            {onNext && (
              <button type="button" className="btn flex-1" onClick={onNext}>
                Next puzzle →
              </button>
            )}
          </div>
        )}
        <p className="mt-3 text-center text-xs text-ink-soft">
          New jersey drops at midnight ET.
        </p>
      </div>
    </div>
  );
}
