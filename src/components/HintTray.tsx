import type { PuzzleHints } from "../game/types";
import { LockIcon } from "./Icons";

const LADDER: { key: keyof PuzzleHints; label: string }[] = [
  { key: "position", label: "Position" },
  { key: "height", label: "Height" },
  { key: "draftYear", label: "Draft year" },
  { key: "draftPick", label: "Draft pick" },
  { key: "college", label: "College" },
];

interface Props {
  hints: PuzzleHints;
  revealedCount: number;
  /** strip = horizontal bar above the spread; cell = vertical card that
   *  fills the leftover columns of the spread's last grid row */
  variant: "strip" | "cell";
  /** cell variant: how many grid columns to span */
  span?: number;
  className?: string;
}

/** Player Profile — the post-jerseys hint ladder. */
export default function HintTray({
  hints,
  revealedCount,
  variant,
  span,
  className = "",
}: Props) {
  if (variant === "cell") {
    return (
      <section
        aria-label="Player profile"
        className={`profile-cell chip-in ${className}`}
        style={span ? { gridColumn: `span ${span}` } : undefined}
      >
        <h2 className="player-file-title">Player profile</h2>
        <ul className="mt-0.5">
          {LADDER.map((h, i) => (
            <li
              key={h.key}
              className={`profile-row ${i >= revealedCount ? "hint-locked" : ""} ${
                i === revealedCount - 1 ? "chip-in" : ""
              }`}
              aria-label={i >= revealedCount ? `${h.label}: locked` : undefined}
            >
              <span className="hint-label">{h.label}</span>
              {i < revealedCount ? (
                <span className="hint-value">{hints[h.key]}</span>
              ) : (
                <LockIcon size={11} />
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section aria-label="Player profile" className={`player-file chip-in ${className}`}>
      <h2 className="player-file-title">Player profile</h2>
      <ul className="player-file-grid">
        {LADDER.map((h, i) =>
          i < revealedCount ? (
            <li
              key={h.key}
              className={`player-file-cell ${i === revealedCount - 1 ? "chip-in" : ""}`}
            >
              <span className="hint-label">{h.label}</span>
              <span className="hint-value">{hints[h.key]}</span>
            </li>
          ) : (
            <li
              key={h.key}
              className="player-file-cell hint-locked"
              aria-label={`${h.label}: locked`}
            >
              <span className="hint-label">{h.label}</span>
              <LockIcon size={12} />
            </li>
          )
        )}
      </ul>
    </section>
  );
}
