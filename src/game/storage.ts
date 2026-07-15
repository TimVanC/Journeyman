import type { GameState, Profile } from "./types";

/** Puzzle #1 lands on this ET calendar date. */
const LAUNCH_DATE_ET = "2026-07-15";

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
  const diff = dateToUTC(todayET()) - dateToUTC(LAUNCH_DATE_ET);
  return Math.max(1, Math.round(diff / 86_400_000) + 1);
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
