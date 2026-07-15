import raw from "./teamSeasons.json";

/**
 * Team W-L + playoff result per season, generated from Basketball-Reference
 * franchise index pages (see README). Keyed by our modern tricode →
 * season START year. Only the seasons the current puzzle set needs are
 * included; Phase 2's ETL replaces this with a proper table.
 */
export interface SeasonLine {
  year: number;
  w: number;
  l: number;
  /** shortened playoff result; "" = missed the playoffs */
  po: string;
}

const db = raw as Record<string, Record<string, { w: number; l: number; po: string }>>;

export function getStintSeasons(
  franchise: string,
  startYear: number,
  endYear: number
): SeasonLine[] {
  const team = db[franchise];
  if (!team) return [];
  const out: SeasonLine[] = [];
  for (let y = startYear; y <= endYear; y++) {
    const s = team[String(y)];
    if (s) out.push({ year: y, ...s });
  }
  return out;
}

/** 2003 → '03–04 */
export const seasonLabel = (y: number) =>
  `'${String(y).slice(2)}–${String((y + 1) % 100).padStart(2, "0")}`;
