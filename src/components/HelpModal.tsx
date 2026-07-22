import { useEffect } from "react";
import { SPORT } from "../sports/active";
import { CheckIcon, FlameIcon, GraveIcon, JerseyIcon, XIcon } from "./Icons";

// "position → height → draft year → draft pick → college", per sport
const ladderLine = SPORT.hintLadder.map((h) => h.label.toLowerCase()).join(" → ");

export default function HelpModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="How to play"
        className="modal-panel p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl">How to play</h2>
          <button type="button" className="chip cursor-pointer" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="mt-3 space-y-3 text-sm leading-relaxed">
          <p>
            A mystery {SPORT.league} player is hidden behind his jerseys —
            usually a <strong>journeyman</strong> who bounced around the
            league, sometimes a star with more stops than you'd remember. No
            logos, no names: just era-accurate <strong>colorways</strong>, the{" "}
            <strong>city</strong> he wore them in, his <strong>number</strong>,
            and <strong>his stats with that team</strong>.
          </p>
          <p>
            You start with his <em>least</em> famous stop. Guess the player, or
            flip the next jersey from the deck. Solve him in as few jerseys as
            possible — golf rules, lower is better.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Flipping a jersey is free — the cost is your score.
            </li>
            <li>
              A <strong>wrong guess is never free</strong>: it flips the next
              jersey for you.
            </li>
            <li>
              Tap any jersey to turn it over and see the hardware he won at
              that stop.
            </li>
            <li>
              Out of jerseys? Wrong guesses open his player profile line by
              line: {ladderLine}. Then one last guess.
            </li>
          </ul>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-3 text-xs text-ink-soft">
            <span className="flex items-center gap-1"><JerseyIcon size={14} /> jersey flipped</span>·
            <span className="flex items-center gap-1"><XIcon size={14} className="text-[#b3362a]" /> wrong guess</span>·
            <span className="flex items-center gap-1"><CheckIcon size={14} className="text-[#2e7d43]" /> solved</span>·
            <span className="flex items-center gap-1"><GraveIcon size={14} /> DNF</span>
          </p>
          <p className="text-xs text-ink-soft">
            Solve daily to build your <FlameIcon size={13} className="text-wood-deep" /> streak.
            New puzzle at midnight ET.
            <br />
            Not affiliated with the NBA/NFL/MLB.
          </p>
        </div>
      </div>
    </div>
  );
}
