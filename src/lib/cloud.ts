import { supabase } from "./supabase";
import { loadProfile, loadArchiveResults } from "../game/storage";

/** One finished game as stored in Supabase (`results` table). */
export interface CloudResult {
  day: number;
  won: boolean;
  /** jerseys flipped when solved; null on a DNF */
  revealed: number | null;
  /** 0-1000 points; null on rows recorded before scoring existed */
  score: number | null;
  is_archive: boolean;
}

/** Fire-and-forget: record a finished game for the signed-in user.
 *  No-op when signed out. Cloud keeps the FIRST result for a day
 *  (ignoreDuplicates), matching the local "record exactly once" rule. */
export async function pushResult(
  day: number,
  result: number | "DNF",
  isArchive: boolean,
  score: number
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
      score,
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

/** Log a finished game into the anonymous play pool (everyone, signed in or
 *  not) — this is what powers "better than X% of today's players". Write-only
 *  on the client; aggregates come back through the day_score_stats RPC. */
export async function logPlay(p: {
  day: number;
  won: boolean;
  revealed: number | null;
  score: number;
  hard: boolean;
  isArchive: boolean;
}): Promise<void> {
  if (p.day >= 9000) return; // test slots stay off the books
  await supabase.from("plays").insert({
    day: p.day,
    won: p.won,
    revealed: p.revealed,
    score: p.score,
    hard: p.hard,
    is_archive: p.isArchive,
  });
}

export interface DayStanding {
  /** other players who finished this day's puzzle (you excluded) */
  others: number;
  /** how many of them you outscored */
  beaten: number;
}

/** Where a score lands against everyone who played this day. */
export async function fetchDayStanding(
  day: number,
  score: number
): Promise<DayStanding | null> {
  const { data, error } = await supabase.rpc("day_score_stats", {
    p_day: day,
    p_score: score,
  });
  if (error || !data) return null;
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;
  const total = Number(row.total);
  const lower = Number(row.lower_scores);
  // own play is in the pool by the time this runs — compare against the rest
  return { others: Math.max(0, total - 1), beaten: lower };
}

/** All of the signed-in user's results, for stats + the archive grid. */
export async function fetchResults(): Promise<CloudResult[]> {
  const { data, error } = await supabase
    .from("results")
    .select("day, won, revealed, score, is_archive")
    .order("day");
  if (error || !data) return [];
  return data as CloudResult[];
}

/** Fixed score buckets — every puzzle lands on the same 0-1000 scale no
 *  matter how many jerseys its career has, so the chart shape is stable. */
export const SCORE_BUCKETS = [
  { label: "1000", test: (s: number) => s === 1000 },
  { label: "800+", test: (s: number) => s >= 800 && s < 1000 },
  { label: "600+", test: (s: number) => s >= 600 && s < 800 },
  { label: "400+", test: (s: number) => s >= 400 && s < 600 },
  { label: "<400", test: (s: number) => s < 400 },
] as const;

export interface Stats {
  played: number;
  wins: number;
  winPct: number;
  /** live daily streak (archive games don't count) */
  currentStreak: number;
  maxStreak: number;
  /** wins with a perfect 1000 */
  perfect: number;
  /** mean score across scored wins; null until there is one */
  avgScore: number | null;
  /** win counts per SCORE_BUCKETS entry, plus the DNF total at the end */
  scoreDist: number[];
  dnf: number;
  archivePlayed: number;
  archiveWins: number;
}

/** Pure stats over a result set. `today` = current daily puzzle number. */
export function computeStats(results: CloudResult[], today: number): Stats {
  const daily = results.filter((r) => !r.is_archive && r.day < 9000);
  const arch = results.filter((r) => r.is_archive);

  const wins = daily.filter((r) => r.won).length;
  const scored = daily.filter((r) => r.won && r.score != null) as Array<
    CloudResult & { score: number }
  >;
  const scoreDist = SCORE_BUCKETS.map((b) => scored.filter((r) => b.test(r.score)).length);
  const perfect = scored.filter((r) => r.score === 1000).length;
  const avgScore =
    scored.length > 0
      ? Math.round(scored.reduce((sum, r) => sum + r.score, 0) / scored.length)
      : null;

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
    perfect,
    avgScore,
    scoreDist,
    dnf: daily.length - wins,
    archivePlayed: arch.length,
    archiveWins: arch.filter((r) => r.won).length,
  };
}
