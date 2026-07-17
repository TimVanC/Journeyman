import colorwaysJson from "./colorways.json";
import { puzzles } from "./puzzles";
import { ROSTER, rosterKey } from "./roster";
import type { ColorwayDB } from "../components/JerseyRenderer";

const db = colorwaysJson as unknown as ColorwayDB;

/** "Washington Wizards (blue/bronze)" → "Washington Wizards" — parentheticals
 *  are colorway eras of the SAME identity; a change in the base string means
 *  a relocation or rebrand (Sonics→Thunder, Bullets→Wizards, Bobcats→Hornets). */
function baseIdentity(s: string): string {
  return s.replace(/\s*\(.*\)$/, "").trim();
}

function identityAt(franchise: string, year: number): string | null {
  const eras = db.franchises[franchise];
  const era = eras?.find((e) => year >= e.years[0] && year <= e.years[1]);
  return era ? baseIdentity(era.identity) : null;
}

/** Dev-only authoring guard: a stint must never span a relocation/rebrand —
 *  each card renders ONE jersey, so a spanning stint would swallow the old
 *  identity (a 2002-2010 OKC stint would never show the Sonics jersey).
 *  Split such stints in the puzzle data so both jerseys hit the table. */
/** Dev-only roster health: no duplicate answers, and a running count of how
 *  many scheduled days actually have an authored puzzle behind them. */
export function warnRosterGaps(): void {
  const seen = new Map<string, number>();
  ROSTER.forEach((name, i) => {
    const key = rosterKey(name);
    if (seen.has(key)) {
      console.warn(`[roster] "${name}" appears on both day ${seen.get(key)} and day ${i + 1}`);
    } else {
      seen.set(key, i + 1);
    }
  });

  const builtKeys = new Set(puzzles.map((p) => rosterKey(p.answer)));
  const builtDays = ROSTER.filter((n) => builtKeys.has(rosterKey(n))).length;
  const firstGap = ROSTER.findIndex((n) => !builtKeys.has(rosterKey(n)));
  console.info(
    `[roster] ${builtDays}/${ROSTER.length} scheduled days have authored puzzles` +
      (firstGap >= 0 ? `; first gap: day ${firstGap + 1} (${ROSTER[firstGap]})` : "")
  );
}

export function warnRelocationSpans(): void {
  for (const pz of puzzles) {
    for (const s of pz.stints) {
      const startId = identityAt(s.franchise, s.startYear);
      const endId = identityAt(s.franchise, s.endYear);
      if (startId && endId && startId !== endId) {
        console.warn(
          `[puzzles] "${pz.answer}": stint ${s.franchise} ${s.startYear}–${s.endYear} ` +
            `spans "${startId}" → "${endId}". Split it into two stints so both jerseys appear.`
        );
      }
    }
  }
}
