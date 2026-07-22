import { nba } from "./nba";
import { nfl } from "./nfl";
import { mlb } from "./mlb";
import type { Sport, SportConfig } from "./types";

export const SPORTS: Record<Sport, SportConfig> = { nba, nfl, mlb };

export const SPORT_ORDER: Sport[] = ["nba", "nfl", "mlb"];

/** the other two leagues, in display order — for "play another game" links */
export function otherSports(sport: Sport): Sport[] {
  return SPORT_ORDER.filter((s) => s !== sport);
}

const LAST_SPORT_KEY = "journeyman:sport:v1";

function isSport(s: string | null): s is Sport {
  return s === "nba" || s === "nfl" || s === "mlb";
}

/** Which game this page-load is: `?s=nfl` wins, then the last sport
 *  played on this device, then NBA (the original). */
export function resolveSport(): SportConfig {
  const param = new URLSearchParams(location.search).get("s");
  if (isSport(param)) {
    try {
      localStorage.setItem(LAST_SPORT_KEY, param);
    } catch {
      /* fine */
    }
    return SPORTS[param];
  }
  try {
    const last = localStorage.getItem(LAST_SPORT_KEY);
    if (isSport(last)) return SPORTS[last];
  } catch {
    /* fine */
  }
  return SPORTS.nba;
}

/** href into a sport's game, always explicit (`?s=nba` too — a bare path
 *  would fall back to the last-played sport and bounce the switch).
 *  Extra params (archive `d`, test `p`) ride along. */
export function sportHref(
  sport: Sport,
  extra?: Record<string, string | number>
): string {
  const q = new URLSearchParams();
  q.set("s", sport);
  for (const [k, v] of Object.entries(extra ?? {})) q.set(k, String(v));
  return `${location.pathname}?${q.toString()}`;
}
