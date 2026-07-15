import raw from "./playerIndex.json";

/**
 * Full NBA/ABA player search index — every player on Basketball-Reference's
 * per-letter index pages (5,400+), built 2026-07-16. Stored as compact
 * [name, yearsActive] tuples in playerIndex.json.
 *
 * yearsActive = debut-season start year → final-season end year;
 * "present" = active in 2025-26. Note: BR lists Enes Kanter as Enes Freedom.
 * In Phase 2 this becomes the `player_index` table.
 */
export interface IndexedPlayer {
  name: string;
  yearsActive: string;
}

export const playerIndex: IndexedPlayer[] = (raw as [string, string][]).map(
  ([name, yearsActive]) => ({ name, yearsActive })
);

const stripDiacritics = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[.'’]/g, "");

const norm = (s: string) => stripDiacritics(s.trim().toLowerCase());

/** Pre-normalized once for fast type-ahead over 5k+ names. */
const normalized = playerIndex.map((p) => norm(p.name));

export function searchPlayers(query: string, limit = 8): IndexedPlayer[] {
  const q = norm(query);
  if (q.length < 2) return [];
  const starts: IndexedPlayer[] = [];
  const contains: IndexedPlayer[] = [];
  for (let i = 0; i < normalized.length; i++) {
    const n = normalized[i];
    // match against full name and each word start (type "pip" → Pippen)
    if (n.startsWith(q) || n.includes(" " + q)) starts.push(playerIndex[i]);
    else if (n.includes(q)) contains.push(playerIndex[i]);
    if (starts.length >= limit) return starts.slice(0, limit);
  }
  return [...starts, ...contains].slice(0, limit);
}
