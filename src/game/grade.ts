import { HINT_COUNT } from "./state";
import type { GameState, Puzzle } from "./types";

/**
 * Performance grade for a finished game. Jerseys-at-solve stays the core
 * golf metric, but the grade folds in how deep into the run the solve
 * came — two "4/4" solves are very different if one burned every hint.
 */
export interface Grade {
  /** short shareable rank, best → worst */
  label: string;
  /** one-line human summary of how the run actually went */
  detail: string;
}

export function computeGrade(state: GameState, puzzle: Puzzle): Grade {
  const total = puzzle.stints.length;
  const j = state.revealed;
  const hints = state.hintsRevealed;
  const misses = state.wrongGuesses.length;
  const missNote = misses > 0 ? ` (${misses} wrong guess${misses > 1 ? "es" : ""})` : "";

  if (state.status === "lost") {
    return {
      label: "Waived",
      detail: "Every jersey, every hint — and he still walked free.",
    };
  }

  // hint-based grades first — a single-jersey lifer solved after five
  // hints is not a Hall of Fame read
  if (hints >= HINT_COUNT) {
    return {
      label: "Buzzer Beater",
      detail: `Down to the final guess — every jersey, every hint${missNote}.`,
    };
  }
  if (hints > 0) {
    // NOT "Journeyman" — that label collides with the game's own name in the
    // share line ("Journeyman #3 · Journeyman" reads like a stutter)
    return {
      label: "10-Day",
      detail: `All ${total} jerseys plus ${hints} profile hint${hints > 1 ? "s" : ""}${missNote}.`,
    };
  }
  if (j === 1) {
    return {
      label: "Hall of Fame",
      detail: `Named him off a single jersey${missNote}.`,
    };
  }
  if (j <= Math.ceil(total / 2)) {
    return {
      label: "All-NBA",
      detail: `Solved in ${j} of ${total} jerseys${missNote}.`,
    };
  }
  if (j < total) {
    return {
      label: "Starter",
      detail: `Solved in ${j} of ${total} jerseys${missNote}.`,
    };
  }
  return {
    label: "6th Man",
    detail: `Needed the full rack — all ${total} jerseys${missNote}.`,
  };
}
