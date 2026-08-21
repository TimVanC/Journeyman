/**
 * Player initials for the profile ladder — the hint that replaced
 * "Draft year" (NBA/NFL) and "MLB debut" (MLB) on 2026-08-21: by the time
 * the ladder opens, the first jersey has already given the draft year away.
 *
 *   "Shareef Abdur-Rahim" → "S.A.R."   "D.J. Augustin" → "D.J.A."
 *   "Marcus Morris Sr."   → "M.M."     "B. J. Upton"   → "B.J.U."
 *   "Le'Veon Bell"        → "L.B."     "CC Sabathia"   → "C.C.S."
 *
 * Rules: one letter per space- or hyphen-separated token; tokens that are
 * already initials ("D.J.", "B.", "CC") contribute every letter; Jr./Sr./
 * II/III/IV suffixes are dropped; diacritics are stripped ("Ginóbili" → G).
 *
 * Mirrored in pipeline/lib/initials.mjs for the authoring scripts — keep the
 * two in sync; scripts/validate-data.mjs pins the rules with fixtures and
 * cross-checks every authored `initials` hint against that copy.
 */

// a literal suffix token — "Jr", "Jr.", "III" — never dotted initials like "J.R."
const SUFFIX = /^(?:jr|sr|ii|iii|iv)\.?$/i;

export function initialsOf(name: string): string {
  const plain = name.normalize("NFD").replace(/[̀-ͯ]/g, "");
  const letters: string[] = [];
  for (const raw of plain.split(/[\s-]+/)) {
    const token = raw.replace(/[^A-Za-z.']/g, "");
    const bare = token.replace(/[.']/g, "").toUpperCase();
    if (!bare || SUFFIX.test(token)) continue;
    if (/^(?:[A-Za-z]\.)+$/.test(token) || /^[A-Z]{2,3}$/.test(token)) {
      letters.push(...bare);
    } else {
      letters.push(bare[0]);
    }
  }
  return letters.map((l) => `${l}.`).join("");
}

/** Puzzles that aired before the initials hint existed still carry the
 *  retired draftYear / debutYear key and no `initials`; derive it from the
 *  answer so the archive ladder never shows an empty row. Authored puzzles
 *  pass through untouched. */
export function withInitials<T extends { answer: string; hints: Record<string, string> }>(puzzle: T): T {
  if (puzzle.hints?.initials) return puzzle;
  return { ...puzzle, hints: { ...puzzle.hints, initials: initialsOf(puzzle.answer) } };
}
