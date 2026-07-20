/**
 * Shared type-ahead search over a sport's player index. Each sport ships a
 * compact [name, yearsActive] tuple list; this pre-normalizes once and
 * exposes the same prefix-then-contains search the NBA build used.
 */

export interface IndexedPlayer {
  name: string;
  yearsActive: string;
}

const stripDiacritics = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[.'’]/g, "");

const norm = (s: string) => stripDiacritics(s.trim().toLowerCase());

export function createPlayerSearch(raw: [string, string][]) {
  const players: IndexedPlayer[] = raw.map(([name, yearsActive]) => ({
    name,
    yearsActive,
  }));
  /** Pre-normalized once for fast type-ahead over thousands of names. */
  const normalized = players.map((p) => norm(p.name));

  return function searchPlayers(query: string, limit = 8): IndexedPlayer[] {
    const q = norm(query);
    if (q.length < 2) return [];
    const starts: IndexedPlayer[] = [];
    const contains: IndexedPlayer[] = [];
    for (let i = 0; i < normalized.length; i++) {
      const n = normalized[i];
      // match against full name and each word start (type "pip" → Pippen)
      if (n.startsWith(q) || n.includes(" " + q)) starts.push(players[i]);
      else if (n.includes(q)) contains.push(players[i]);
      if (starts.length >= limit) return starts.slice(0, limit);
    }
    return [...starts, ...contains].slice(0, limit);
  };
}
