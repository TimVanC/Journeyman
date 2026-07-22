import { useEffect } from "react";
import { trackAccountCta } from "../lib/analytics";

interface Props {
  score: number;
  won: boolean;
  streak: number;
  onSignUp: () => void;
  onClose: () => void;
}

/** A focused second step over the result card: show the value of an account
 *  while the completed game remains visible underneath. */
export default function AccountSavePrompt({ score, won, streak, onSignUp, onClose }: Props) {
  useEffect(() => {
    trackAccountCta({ source: "result", action: "viewed" });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop account-prompt-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-game-title"
        className="modal-panel account-prompt-panel p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="account-save-eyebrow">Your stats preview</p>
            <h2 id="save-game-title" className="font-display mt-0.5 text-2xl tracking-wide">
              KEEP THIS GAME
            </h2>
          </div>
          <button type="button" className="chip cursor-pointer" onClick={onClose} aria-label="Not now">
            ✕
          </button>
        </div>

        <div className="account-preview-grid mt-4" aria-label="Stats this game will add">
          <span>
            <strong>{score}</strong>
            <small>Score</small>
          </span>
          <span>
            <strong>{won ? "W" : "DNF"}</strong>
            <small>Result</small>
          </span>
          <span>
            <strong>{streak}</strong>
            <small>Streak</small>
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Create a free account to add this game—and the games already on this
          device—to your lifetime stats. You’ll also unlock every previous NBA,
          NFL, and MLB puzzle.
        </p>

        <button type="button" className="btn btn-primary mt-4 w-full py-3 text-sm" onClick={onSignUp}>
          Save this game to my stats
        </button>
        <button type="button" className="mt-3 w-full text-center text-xs font-bold text-ink-soft underline underline-offset-2" onClick={onClose}>
          Not now
        </button>
        <p className="mt-3 text-center text-[0.65rem] font-semibold text-ink-soft">
          Free forever · Your existing games come with you
        </p>
      </section>
    </div>
  );
}
