import type { GameState, Profile } from "./types";

/** Puzzle #1 lands on this ET calendar date. */
export const LAUNCH_DATE_ET = "2026-07-15";

const PROFILE_KEY = "journeyman:profile:v1";
const stateKey = (day: number) => `journeyman:game:v1:${day}`;

/** Calendar date in America/New_York, as YYYY-MM-DD.
 *  Phase 1 uses the client clock; Phase 2 moves rollover server-side. */
export function todayET(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function dateToUTC(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Daily puzzle number: #1 on launch day, +1 per ET midnight. */
export function currentDayNumber(): number {
  return Math.max(1, dayNumberForDate(todayET()));
}

/** Puzzle day number for any YYYY-MM-DD calendar date (may be < 1 pre-launch). */
export function dayNumberForDate(dateStr: string): number {
  const diff = dateToUTC(dateStr) - dateToUTC(LAUNCH_DATE_ET);
  return Math.round(diff / 86_400_000) + 1;
}

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode / quota — game still works, just won't persist */
  }
}

export function loadGameState(day: number): GameState | null {
  const s = read<GameState>(stateKey(day));
  return s && s.day === day ? s : null;
}

export function saveGameState(state: GameState) {
  write(stateKey(state.day), state);
}

export function loadProfile(): Profile {
  return (
    read<Profile>(PROFILE_KEY) ?? { streak: 0, lastSolvedDay: null, history: {} }
  );
}

/** Record a finished game exactly once; returns the updated profile. */
export function recordResult(
  day: number,
  result: number | "DNF"
): Profile {
  const profile = loadProfile();
  if (profile.history[day] !== undefined) return profile;

  profile.history[day] = result;
  if (result === "DNF") {
    profile.streak = 0;
  } else {
    profile.streak = profile.lastSolvedDay === day - 1 ? profile.streak + 1 : 1;
    profile.lastSolvedDay = day;
  }
  write(PROFILE_KEY, profile);
  return profile;
}

/** Streak shown in the header — stale streaks (missed a day) read as 0. */
export function displayStreak(profile: Profile, today: number): number {
  if (profile.lastSolvedDay === null) return 0;
  return profile.lastSolvedDay >= today - 1 ? profile.streak : 0;
}

/* ------------------------------------------------------------------
   Local score ledger (day → points). The profile history only keeps
   jerseys/DNF, so this is what lets a later sign-in sync full scores
   up to the cloud instead of scoreless rows.
------------------------------------------------------------------- */

const SCORES_KEY = "journeyman:scores:v1";

export function loadLocalScores(): Record<string, number> {
  return read<Record<string, number>>(SCORES_KEY) ?? {};
}

/** Record a game's score exactly once (first result stands). */
export function recordLocalScore(day: number, score: number) {
  const all = loadLocalScores();
  if (all[day] !== undefined) return;
  all[day] = score;
  write(SCORES_KEY, all);
}

/* ------------------------------------------------------------------
   Difficulty preference. Hard mode: no flipping cards over for the
   season-by-season record, and no accolade hardware anywhere.
------------------------------------------------------------------- */

export type GameMode = "normal" | "hard";
const MODE_KEY = "journeyman:mode:v1";

export function loadMode(): GameMode {
  return read<GameMode>(MODE_KEY) === "hard" ? "hard" : "normal";
}

export function saveMode(mode: GameMode) {
  write(MODE_KEY, mode);
}

/* ------------------------------------------------------------------
   Archive plays (signed-in feature) — kept OUT of the daily profile
   so replaying past puzzles never touches the live streak.
------------------------------------------------------------------- */

const ARCHIVE_KEY = "journeyman:archive:v1";

export function loadArchiveResults(): Record<string, number | "DNF"> {
  return read<Record<string, number | "DNF">>(ARCHIVE_KEY) ?? {};
}

/** Record an archive game exactly once (first result stands). */
export function recordArchiveResult(day: number, result: number | "DNF") {
  const all = loadArchiveResults();
  if (all[day] !== undefined) return;
  all[day] = result;
  write(ARCHIVE_KEY, all);
}
