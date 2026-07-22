import { useEffect, useMemo, type CSSProperties } from "react";
import { trackAccountCta } from "../lib/analytics";
import { SCORE_BUCKETS } from "../lib/cloud";
import { SPORTS, SPORT_ORDER } from "../sports";

interface Props {
  onSignUp: () => void;
  onClose: () => void;
}

function loadLocalPreview() {
  let played = 0;
  let wins = 0;
  let dnf = 0;
  const scores: number[] = [];

  for (const sport of SPORT_ORDER) {
    const storage = SPORTS[sport].storage;
    const scoreLedger = storage.loadLocalScores();
    for (const [day, result] of Object.entries(storage.loadProfile().history)) {
      played++;
      if (result === "DNF") {
        dnf++;
        continue;
      }
      wins++;
      const score = scoreLedger[day];
      if (score !== undefined) scores.push(score);
    }
  }

  const scoreDist = SCORE_BUCKETS.map((bucket) => scores.filter(bucket.test).length);
  return {
    played,
    winPct: played > 0 ? Math.round((wins / played) * 100) : 0,
    perfect: scores.filter((score) => score === 1000).length,
    avgScore:
      scores.length > 0
        ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)
        : null,
    distribution: [
      ...SCORE_BUCKETS.map((bucket, i) => ({ label: bucket.label, count: scoreDist[i] })),
      { label: "0", count: dnf },
    ],
  };
}

/** A focused second step over the result card: show the value of an account
 *  while the completed game remains visible underneath. */
export default function AccountSavePrompt({ onSignUp, onClose }: Props) {
  const preview = useMemo(loadLocalPreview, []);
  const maxBar = Math.max(1, ...preview.distribution.map((row) => row.count));

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

        <div className="account-locker-preview mt-4" aria-label="Preview of your stats locker">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg tracking-wide">YOUR LOCKER</p>
            <span className="account-save-badge">PREVIEW</span>
          </div>

          <div className="account-preview-tabs mt-2" aria-hidden="true">
            {['All', 'NBA', 'NFL', 'MLB'].map((label, i) => (
              <span key={label} className={i === 0 ? "is-active" : ""}>{label}</span>
            ))}
          </div>

          <div className="account-preview-metrics mt-3">
            <span><strong>{preview.played}</strong><small>Played</small></span>
            <span><strong>{preview.winPct}</strong><small>Win %</small></span>
            <span><strong>{preview.perfect}</strong><small>Perfect</small></span>
            <span><strong>{preview.avgScore ?? "—"}</strong><small>Avg score</small></span>
          </div>

          <p className="account-preview-heading mt-3">Score distribution</p>
          <div className="mt-1.5 space-y-1">
            {preview.distribution.map((row, i) => (
              <div className="account-preview-bar-row" key={row.label}>
                <span>{row.label}</span>
                <div className="account-preview-bar-track">
                  <i
                    className={`account-preview-bar-fill${i === preview.distribution.length - 1 ? " is-dnf" : ""}`}
                    style={{ "--preview-fill": row.count / maxBar } as CSSProperties}
                  />
                  <b>{row.count}</b>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          These are your real stats from the games already on this device.
          Create a free account to keep building them, sync across devices, and
          unlock every previous NBA, NFL, and MLB puzzle.
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
