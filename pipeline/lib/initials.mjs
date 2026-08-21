/**
 * Player initials for the profile ladder — Node twin of src/game/initials.ts
 * (the game can't import .mjs from TS cleanly, and the pipeline can't import
 * TS). Keep the two implementations identical; scripts/validate-data.mjs pins
 * the rules with fixtures and checks every authored `initials` hint against
 * this copy, so a drift shows up in CI as a data error.
 *
 *   "Shareef Abdur-Rahim" → "S.A.R."   "D.J. Augustin" → "D.J.A."
 *   "Marcus Morris Sr."   → "M.M."     "B. J. Upton"   → "B.J.U."
 */

// a literal suffix token — "Jr", "Jr.", "III" — never dotted initials like "J.R."
const SUFFIX = /^(?:jr|sr|ii|iii|iv)\.?$/i;

export function initialsOf(name) {
  const plain = name.normalize("NFD").replace(/[̀-ͯ]/g, "");
  const letters = [];
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
