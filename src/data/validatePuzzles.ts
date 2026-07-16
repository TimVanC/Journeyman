import colorwaysJson from "./colorways.json";
import { puzzles } from "./puzzles";
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
