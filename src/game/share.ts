/** Share text. One idea per line, score on top:
 *
 *    Journeyman #12 · All-NBA · 85 pts
 *    🟨🟨🟩 3/7 jerseys · 1 miss
 *    🔥 4 · Better than 94% today
 *    journeymanjersey.com
 *
 *  The squares are just your walk through the deck: one 🟨 per jersey it
 *  took, 🟩 the one you solved on (🟥 if he walked). Hints and misses are
 *  written out as words — nobody should need a legend to read a score. */
export function buildShareText(opts: {
  day: number;
  grade: string;
  score: number;
  won: boolean;
  /** jerseys on the table when it ended */
  revealed: number;
  total: number;
  hints: number;
  misses: number;
  streak: number;
  hard: boolean;
  /** % of today's other players outscored; null = not enough data */
  beatenPct: number | null;
}): string {
  const { day, grade, score, won, revealed, total, hints, misses, streak, hard, beatenPct } = opts;

  const squares = won
    ? "🟨".repeat(revealed - 1) + "🟩"
    : "🟨".repeat(revealed) + "🟥";
  const runFacts = [
    `${won ? revealed : "X"}/${total} jerseys`,
    hints > 0 ? `${hints} hint${hints > 1 ? "s" : ""}` : null,
    misses > 0 ? `${misses} miss${misses > 1 ? "es" : ""}` : null,
  ].filter(Boolean);

  const flexes = [
    streak > 0 ? `🔥 ${streak}` : null,
    beatenPct !== null ? `Better than ${beatenPct}% today` : null,
  ].filter(Boolean);

  const lines = [
    `Journeyman #${day} · ${grade} · ${score} pts${hard ? " · HARD" : ""}`,
    `${squares} ${runFacts.join(" · ")}`,
  ];
  if (flexes.length > 0) lines.push(flexes.join(" · "));
  lines.push("journeymanjersey.com");
  return lines.join("\n");
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback for older mobile browsers
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
