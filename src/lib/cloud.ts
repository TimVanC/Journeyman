import { supabase } from "./supabase";
import { loadProfile, loadArchiveResults } from "../game/storage";

/** One finished game as stored in Supabase (`results` table). */
export interface CloudResult {
  day: number;
  won: boolean;
  /** jerseys flipped when solved; null on a DNF */
  revealed: number | null;
  is_archive: boolean;
}

/** Fire-and-forget: record a finished game for the signed-in user.
 *  No-op when signed out. Cloud keeps the FIRST result for a day
 *  (ignoreDuplicates), matching the local "record exactly once" rule. */
export async function pushResult(
  day: number,
  result: number | "DNF",
  isArchive: boolean
): Promise<void> {
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user.id;
  if (!userId) return;
  await supabase.from("results").upsert(
    {
      user_id: userId,
      day,
      won: result !== "DNF",
      revealed: result === "DNF" ? null : result,
      is_archive: isArchive,
    },
    { onConflict: "user_id,day", ignoreDuplicates: true }
  );
}

/** On sign-in: push everything recorded locally (first result per day wins
 *  server-side), then pull the full cloud history back for stats. Test-mode
 *  days (9000+) never leave the device. */
export async function syncUp(): Promise<void> {
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user.id;
  if (!userId) return;

  const rows: Array<Record<string, unknown>> = [];
  const profile = loadProfile();
  for (const [dayStr, res] of Object.entries(profile.history)) {
    const day = Number(dayStr);
    if (day >= 9000) continue; // test slots stay local
    rows.push({
      user_id: userId,
      day,
      won: res !== "DNF",
      revealed: res === "DNF" ? null : res,
      is_archive: false,
    });
  }
  const archive = loadArchiveResults();
  for (const [dayStr, res] of Object.entries(archive)) {
    rows.push({
      user_id: userId,
      day: Number(dayStr),
      won: res !== "DNF",
      revealed: res === "DNF" ? null : res,
      is_archive: true,
    });
  }
  if (rows.length > 0) {
    await supabase
      .from("results")
      .upsert(rows, { onConflict: "user_id,day", ignoreDuplicates: true });
  }
}

/** All of the signed-in user's results, for stats + the archive grid. */
export async function fetchResults(): Promise<CloudResult[]> {
  const { data, error } = await supabase
    .from("results")
    .select("day, won, revealed, is_archive")
    .order("day");
  if (error || !data) return [];
  return data as CloudResult[];
}

export interface Stats {
  played: number;
  wins: number;
  winPct: number;
  /** live daily streak (archive games don't count) */
  currentStreak: number;
  maxStreak: number;
  /** wins by jerseys flipped: distribution[k] = wins solved at k jerseys */
  distribution: Record<number, number>;
  archivePlayed: number;
  archiveWins: number;
}

/** Pure stats over a result set. `today` = current daily puzzle number. */
export function computeStats(results: CloudResult[], today: number): Stats {
  const daily = results.filter((r) => !r.is_archive && r.day < 9000);
  const arch = results.filter((r) => r.is_archive);

  const wins = daily.filter((r) => r.won).length;
  const distribution: Record<number, number> = {};
  for (const r of daily) {
    if (r.won && r.revealed != null) {
      distribution[r.revealed] = (distribution[r.revealed] ?? 0) + 1;
    }
  }

  // streaks over consecutive daily-day wins
  const wonDays = new Set(daily.filter((r) => r.won).map((r) => r.day));
  let maxStreak = 0;
  for (const d of wonDays) {
    if (wonDays.has(d - 1)) continue; // not a streak start
    let len = 1;
    while (wonDays.has(d + len)) len++;
    maxStreak = Math.max(maxStreak, len);
  }
  // current streak counts back from today (or yesterday if today is unplayed)
  let currentStreak = 0;
  let cursor = wonDays.has(today) ? today : today - 1;
  while (wonDays.has(cursor)) {
    currentStreak++;
    cursor--;
  }

  return {
    played: daily.length,
    wins,
    winPct: daily.length > 0 ? Math.round((wins / daily.length) * 100) : 0,
    currentStreak,
    maxStreak,
    distribution,
    archivePlayed: arch.length,
    archiveWins: arch.filter((r) => r.won).length,
  };
}
