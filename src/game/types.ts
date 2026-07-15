export interface Stint {
  /** Modern franchise tricode — key into colorways.json */
  franchise: string;
  /** Era-correct team name, shown only on the result screen */
  displayTeam: string;
  /** Season START years (2016 = the 2016-17 season) */
  startYear: number;
  endYear: number;
  gp: number;
  mpg: number;
  ppg: number;
  rpg: number;
  apg: number;
  jerseyNumber: number;
}

export interface PuzzleHints {
  position: string;
  height: string;
  draftYear: string;
  draftPick: string;
  college: string;
}

/** Which dimension the jerseys are split on (addendum §4.5a).
 *  Phase 1 puzzles are all Track A (`team`); the Phase 2 generator adds
 *  `number_era` (Track B) and `role_phase` (Tracks C/D). */
export type PathType = "team" | "number_era" | "role_phase";

export interface Puzzle {
  /** stable id within the local set */
  id: number;
  pathType: PathType;
  answer: string;
  /** shown on the result screen only — never a hint */
  accolades?: string[];
  /** chronological career stints */
  stints: Stint[];
  /** indices into `stints`, least-identifying first (hand-authored per §4) */
  revealOrder: number[];
  hints: PuzzleHints;
}

export type TrailEvent = "jersey" | "miss" | "solve" | "dnf";

export type GameStatus = "playing" | "won" | "lost";

/** derived from GameState — never stored */
export type GamePhase = "jerseys" | "hints" | "final" | "over";

export interface GameState {
  /** daily puzzle number (#1 = launch day) */
  day: number;
  revealed: number;
  hintsRevealed: number;
  wrongGuesses: string[];
  trail: TrailEvent[];
  status: GameStatus;
}

export interface Profile {
  streak: number;
  lastSolvedDay: number | null;
  /** day number → jerseys-at-solve, or "DNF" */
  history: Record<string, number | "DNF">;
}
