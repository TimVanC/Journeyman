import type { GameState } from "./types";

/** Points for a finished game — bigger is better, built for the share line.
 *
 *  Start at 100 and pay for everything you needed:
 *    − 10 per jersey after the first (the first is dealt free)
 *    − 10 per profile hint
 *    −  5 per wrong guess (on top of the jersey/hint the miss auto-burns)
 *    + 10 hard-mode bonus
 *
 *  A win never scores below 10 — you still named him. A DNF is 0.
 *  Perfect game: 100 (110 on hard). */
export function computeScore(state: GameState, hard: boolean): number {
  if (state.status !== "won") return 0;
  const raw =
    100 -
    10 * (state.revealed - 1) -
    10 * state.hintsRevealed -
    5 * state.wrongGuesses.length +
    (hard ? 10 : 0);
  return Math.max(10, raw);
}
