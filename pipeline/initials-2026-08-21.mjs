#!/usr/bin/env node
/**
 * One-off (2026-08-21): swap the "Draft year" (NBA/NFL) / "MLB debut" (MLB)
 * profile hint for the player's initials on every puzzle that has not aired
 * yet — today's puzzle included. By the time the ladder opens, the first
 * jersey has already given the draft year away; initials still earn the
 * last guess.
 *
 * "Not aired yet" is the union of both serving paths, because the admin
 * Schedule Room reorders the DB independently of the bundled arrays:
 *   - bundle order: NBA = ROSTER[day-1], NFL/MLB = array index (day-1)
 *   - DB schedule:  pipeline/out/db-schedule-future-2026-08-21.json — a
 *     snapshot of scheduled_puzzles rows with day >= today
 * A puzzle is rewritten unless it aired in bundle order before today AND is
 * not scheduled for today-or-later in the DB. Rewriting an already-aired
 * puzzle would be harmless (the game derives missing initials at load time
 * either way), but the scope was "still to play", so aired rows keep their
 * retired key as the record of what actually showed.
 *
 *   1. Rewrites src/data/{,nfl/,mlb/}puzzles.ts in place: the one
 *      `draftYear:` / `debutYear:` line of each target puzzle becomes
 *      `initials: "X.Y."` (same slot, same indentation, same line endings).
 *   2. Emits pipeline/out/initials-2026-08-21-{nba,nfl,mlb}.sql — one UPDATE
 *      per non-frozen DB row with day >= today, guarded by `and not frozen`
 *      so the frozen-row trigger can never fire. Apply with pipeline/load.mjs
 *      or the Supabase SQL editor.
 *
 * Idempotent: a puzzle that already carries `initials` has no draftYear line
 * left to rewrite, and the SQL strips both retired keys before merging.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { initialsOf } from "./lib/initials.mjs";

const SNAPSHOT = "pipeline/out/db-schedule-future-2026-08-21.json";
const OUT = "pipeline/out";

// --- day math (mirror of storage.ts / trim-unaired.mjs) -------------------
const todayET = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const dateToUTC = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};
const dayNumber = (launch) => Math.max(1, Math.round((dateToUTC(todayET) - dateToUTC(launch)) / 86_400_000) + 1);
const launchDate = (sportFile) => {
  const m = readFileSync(sportFile, "utf8").match(/createStorage\("[^"]*",\s*"(\d{4}-\d{2}-\d{2})"\)/);
  if (!m) throw new Error(`no createStorage launch date in ${sportFile}`);
  return m[1];
};
const TODAY = {
  nba: dayNumber(launchDate("src/sports/nba.tsx")),
  nfl: dayNumber(launchDate("src/sports/nfl.tsx")),
  mlb: dayNumber(launchDate("src/sports/mlb.tsx")),
};

const key = (name) => name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function loadArray(path, name) {
  const src = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const st = src.indexOf(`export const ${name}`);
  if (st < 0) throw new Error(`${name} not found in ${path}`);
  const open = src.indexOf("[", src.indexOf("=", src.indexOf("]", st)));
  let d = 0, e = -1;
  for (let i = open; i < src.length; i++) { if (src[i] === "[") d++; else if (src[i] === "]" && --d === 0) { e = i; break; } }
  return Function(`return (${src.slice(open, e + 1)});`)();
}

// --- DB snapshot: answers scheduled for today or later ---------------------
const snapshot = JSON.parse(readFileSync(SNAPSHOT, "utf8")).rows;
const dbFuture = { nba: new Map(), nfl: new Map(), mlb: new Map() };
for (const [sport, day, answer] of snapshot) {
  if (day < TODAY[sport]) throw new Error(`${SNAPSHOT}: ${sport} day ${day} "${answer}" is before today (${TODAY[sport]}) — re-snapshot`);
  dbFuture[sport].set(key(answer), { day, answer });
}

// --- bundle: which answers aired in bundle order before today --------------
const SPORTS = {
  nba: { file: "src/data/puzzles.ts", array: "puzzles", retired: "draftYear" },
  nfl: { file: "src/data/nfl/puzzles.ts", array: "nflPuzzles", retired: "draftYear" },
  mlb: { file: "src/data/mlb/puzzles.ts", array: "mlbPuzzles", retired: "debutYear" },
};
const roster = [...readFileSync("src/data/roster.ts", "utf8").matchAll(/^\s+"([^"]+)",/gm)].map((m) => m[1]);

mkdirSync(OUT, { recursive: true });
const esc = (s) => `'${String(s).replace(/'/g, "''")}'`;

for (const [sport, cfg] of Object.entries(SPORTS)) {
  const puzzles = loadArray(cfg.file, cfg.array);
  const airedBundle = new Set(
    sport === "nba"
      ? roster.slice(0, TODAY.nba - 1).map(key)
      : puzzles.slice(0, TODAY[sport] - 1).map((p) => key(p.answer))
  );
  const targets = new Map();
  for (const p of puzzles) {
    const k = key(p.answer);
    if (!airedBundle.has(k) || dbFuture[sport].has(k)) targets.set(k, p.answer);
  }

  // rewrite the TS file line by line, tracking the enclosing puzzle's answer
  const raw = readFileSync(cfg.file, "utf8");
  const lines = raw.split("\n");
  let current = null, rewritten = 0, skipped = 0;
  // an existing initials line is re-derived too, so a rerun repairs a bad derivation
  const hintLine = new RegExp(`^(\\s*)(?:${cfg.retired}|initials): "[^"]*",(\\r?)$`);
  for (let i = 0; i < lines.length; i++) {
    const ans = lines[i].match(/^\s*answer: ("(?:[^"\\]|\\.)*"),\r?$/);
    if (ans) { current = JSON.parse(ans[1]); continue; }
    const m = lines[i].match(hintLine);
    if (!m) continue;
    if (current === null) throw new Error(`${cfg.file}:${i + 1}: ${cfg.retired} before any answer`);
    if (!targets.has(key(current))) { skipped++; continue; }
    lines[i] = `${m[1]}initials: ${JSON.stringify(initialsOf(current))},${m[2]}`;
    rewritten++;
  }
  writeFileSync(cfg.file, lines.join("\n"));

  // DB updates for every future row (snapshot already excludes frozen/aired)
  let sql = `-- ${sport}: initials replace ${cfg.retired} on scheduled_puzzles rows with day >= ${TODAY[sport]} (ET ${todayET})\n`;
  let dbRows = 0;
  for (const { day, answer } of [...dbFuture[sport].values()].sort((a, b) => a.day - b.day)) {
    sql += `update public.scheduled_puzzles set puzzle = jsonb_set(puzzle, '{hints}', ((puzzle->'hints') - 'draftYear' - 'debutYear') || jsonb_build_object('initials', ${esc(initialsOf(answer))})) where sport = ${esc(sport)} and day = ${day} and lower(answer) = lower(${esc(answer)}) and not frozen;\n`;
    dbRows++;
  }
  writeFileSync(`${OUT}/initials-2026-08-21-${sport}.sql`, sql);

  const notInBundle = [...dbFuture[sport].values()].filter(({ answer }) => !puzzles.some((p) => key(p.answer) === key(answer))).map((r) => r.answer);
  console.log(
    `[${sport}] today = day ${TODAY[sport]} — bundle: ${rewritten} rewritten, ${skipped} aired puzzles kept ${cfg.retired}` +
    ` | DB: ${dbRows} update statements` +
    (notInBundle.length ? ` | DB answers missing from bundle: ${notInBundle.join(", ")}` : "")
  );
}
