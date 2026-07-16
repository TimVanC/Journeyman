import JerseyRenderer from "./JerseyRenderer";
import { FlameIcon } from "./Icons";
import type { GameMode } from "../game/storage";

interface Props {
  day: number;
  /** label depends on where today's game stands */
  cta: "Play" | "Continue" | "See result";
  dateLabel: string;
  streak: number;
  mode: GameMode;
  onMode: (m: GameMode) => void;
  onPlay: () => void;
  onRules: () => void;
  onArchive: () => void;
  onAccount: () => void;
  signedIn: boolean;
}

export default function StartScreen({
  day,
  cta,
  dateLabel,
  streak,
  mode,
  onMode,
  onPlay,
  onRules,
  onArchive,
  onAccount,
  signedIn,
}: Props) {
  return (
    <div className="start-screen" role="dialog" aria-label="Journeyman — start">
      <div className="flex w-full max-w-sm flex-col items-center px-6 text-center">
        <div className="start-jersey" aria-hidden="true">
          <JerseyRenderer
            primary="#b3855a"
            secondary="#faf6ec"
            trim="#3a2c1c"
            number={null}
            eraStyle="nineties"
            size={110}
          />
        </div>

        <h1 className="font-display mt-4 text-[3.4rem] leading-none tracking-wide">
          JOURNEYMAN
        </h1>
        <p className="mt-2 text-sm font-medium text-ink-soft">
          A mystery NBA journeyman, one jersey at a time.
          <br />
          Name him in as few jerseys as you can.
        </p>

        <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
          Puzzle #{day} · {dateLabel}
          {streak > 0 && (
            <>
              {" · "}
              <FlameIcon size={12} className="text-wood-deep" /> {streak}
            </>
          )}
        </p>

        <div className="mt-4 flex w-full gap-1.5" role="radiogroup" aria-label="Difficulty">
          <button
            type="button"
            role="radio"
            aria-checked={mode === "normal"}
            className={`btn flex-1 py-2 ${mode === "normal" ? "btn-primary" : ""}`}
            onClick={() => onMode("normal")}
          >
            Normal
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={mode === "hard"}
            className={`btn flex-1 py-2 ${mode === "hard" ? "btn-primary" : ""}`}
            onClick={() => onMode("hard")}
          >
            Hard
          </button>
        </div>
        <p className="mt-1.5 min-h-[1rem] text-[0.65rem] text-ink-soft">
          {mode === "hard"
            ? "Hard: no accolades, and cards don't flip for season records."
            : "Normal: tap cards for season records and accolades."}
        </p>

        <button type="button" className="btn btn-primary mt-3 w-full py-3.5 text-sm" onClick={onPlay}>
          {cta}
        </button>
        <button type="button" className="btn mt-2.5 w-full" onClick={onRules}>
          How to play
        </button>
        <button type="button" className="btn mt-2.5 w-full" onClick={onArchive}>
          Archive
        </button>
        {/* pre-launch: jump into the replayable test puzzles (?p=1..9) */}
        <a className="btn mt-2.5 w-full" href="?p=1">
          Run tests
        </a>

        {!signedIn && (
          <button
            type="button"
            className="mt-4 text-xs font-bold text-wood-deep underline underline-offset-2"
            onClick={onAccount}
          >
            Create a free account — save your streak &amp; unlock the archive
          </button>
        )}

        <p className="mt-8 text-[0.65rem] text-ink-soft">
          New puzzle at midnight ET · Not affiliated with the NBA
        </p>
      </div>
    </div>
  );
}
