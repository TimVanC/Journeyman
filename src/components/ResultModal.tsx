import { useEffect, useState } from "react";
import JerseyRenderer, { resolveColorway, type ColorwayDB } from "./JerseyRenderer";
import colorwaysJson from "../data/colorways.json";
import { formatStintYears } from "./JerseyCard";
import { buildShareText, copyToClipboard } from "../game/share";
import { computeGrade } from "../game/grade";
import type { GameState, Puzzle, TrailEvent } from "../game/types";
import { CheckIcon, FlameIcon, GraveIcon, JerseyIcon, XIcon } from "./Icons";

const colorways = colorwaysJson as unknown as ColorwayDB;

function TrailIcon({ event }: { event: TrailEvent }) {
  switch (event) {
    case "jersey":
      return <JerseyIcon size={17} className="text-ink" />;
    case "miss":
      return <XIcon size={17} className="text-[#b3362a]" />;
    case "solve":
      return <CheckIcon size={17} className="text-[#2e7d43]" />;
    case "dnf":
      return <GraveIcon size={17} className="text-ink-soft" />;
  }
}

interface Props {
  puzzle: Puzzle;
  state: GameState;
  streak: number;
  onClose: () => void;
  /** test mode only: jump to the next puzzle */
  onNext?: () => void;
}

export default function ResultModal({ puzzle, state, streak, onClose, onNext }: Props) {
  const [copied, setCopied] = useState(false);
  const won = state.status === "won";
  const total = puzzle.stints.length;
  const score = won ? state.revealed : null;
  const grade = computeGrade(state, puzzle);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const share = async () => {
    const text = buildShareText({
      day: state.day,
      trail: state.trail,
      score,
      total,
      streak,
      hints: state.hintsRevealed,
      grade: grade.label,
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
        <div className="flex items-start justify-between gap-4">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
            Journeyman #{state.day}
          </p>
          <button type="button" className="chip cursor-pointer" onClick={onClose} aria-label="Close">
            ✕
          </button>
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

        {/* the ticket — mirrors the shared emoji grid */}
        <div className="result-ticket mt-3" aria-label="Result grid">
          <span className="flex flex-wrap items-center gap-1">
            {state.trail.map((e, i) => (
              <TrailIcon key={i} event={e} />
            ))}
          </span>
          <span className="text-sm font-bold tabular-nums text-ink-soft">
            ({score ?? "X"}/{total}
            {state.hintsRevealed > 0 &&
              ` + ${state.hintsRevealed} hint${state.hintsRevealed > 1 ? "s" : ""}`}
            )
          </span>
          {streak > 0 && (
            <span className="ml-auto flex items-center gap-1 text-sm font-bold tabular-nums">
              <FlameIcon className="text-wood-deep" /> {streak}
            </span>
          )}
        </div>

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
        {onNext && (
          <button type="button" className="btn mt-2 w-full" onClick={onNext}>
            Next puzzle →
          </button>
        )}
        <p className="mt-3 text-center text-xs text-ink-soft">
          New jersey drops at midnight ET.
        </p>
      </div>
    </div>
  );
}
