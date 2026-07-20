/**
 * Sport-agnostic colorway resolution. Each sport ships a colorways JSON in
 * the same shape: franchises keyed by MODERN tricode, each an array of era
 * entries. `eraStyle` is an opaque string here — each sport's jersey
 * renderer narrows it to its own era set (NBA cut eras, NFL stripe eras,
 * MLB placket/pullover eras).
 */

export interface ColorwayEra {
  key: string;
  /** season START years covered, inclusive */
  years: [number, number];
  /** era-correct identity label ("Vancouver Grizzlies", "Houston Oilers") */
  identity: string;
  primary: string;
  secondary: string;
  trim: string;
  eraStyle: string;
  /** era-correct city code when it differs from the modern franchise key
   *  (relocations/rebrands); NBA predates this field and maps identities
   *  in its config instead */
  tricode?: string;
  /** MLB: pinstriped body */
  pattern?: "pinstripe";
  confidence: "high" | "medium" | "low";
}

export type ColorwayDB = { franchises: Record<string, ColorwayEra[]> };

/**
 * Pick the era covering the majority of a stint. startYear/endYear are
 * season START years. Falls back to nearest era if there's a data gap.
 */
export function resolveColorway(
  db: ColorwayDB,
  franchise: string,
  startYear: number,
  endYear: number
): ColorwayEra | null {
  const eras = db.franchises[franchise];
  if (!eras?.length) return null;

  let best: ColorwayEra | null = null;
  let bestOverlap = -1;
  for (const era of eras) {
    const overlap =
      Math.min(endYear, era.years[1]) - Math.max(startYear, era.years[0]) + 1;
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      best = era;
    }
  }
  return best;
}
