import { HINT_COUNT } from "./state";

/** 🎽 is the closest thing to a basketball jersey in the emoji set — a
 *  sleeveless athletic singlet. 🔍 reads as a clue pulled from the player
 *  profile (position → height → draft → college). */
const JERSEY = "🎽";
const CLUE = "🔍";

/** Share text. One idea per line, score on its own line under the rank:
 *
 *    Journeyman #12 · Buzzer Beater
 *    375 pts
 *    🎽🎽🎽🎽🎽🎽🎽 7/7 jerseys
 *    🔍🔍🔍 3/5 profile
 *    🔥 4 · Better than 60% today
 *    journeymanjersey.com
 *
 *  Each 🎽 is a jersey you had to flip and each 🔍 a profile hint you had
 *  to burn, so a short line is a good game — no legend required. Wrong
 *  guesses aren't listed: a miss auto-burns the next jersey or hint, so
 *  it's already counted in the rows above. */
export function buildShareText(opts: {
  day: number;
  grade: string;
  score: number;
  /** jerseys on the table when it ended */
  revealed: number;
  total: number;
  hints: number;
  streak: number;
  hard: boolean;
  /** % of today's other players outscored; null = not enough data */
  beatenPct: number | null;
}): string {
  const { day, grade, score, revealed, total, hints, streak, hard, beatenPct } = opts;

  const lines = [
    `Journeyman #${day} · ${grade}${hard ? " · HARD" : ""}`,
    `${score} pts`,
    `${JERSEY.repeat(revealed)} ${revealed}/${total} jerseys`,
  ];
  if (hints > 0) {
    lines.push(`${CLUE.repeat(hints)} ${hints}/${HINT_COUNT} profile`);
  }

  const flexes = [
    streak > 0 ? `🔥 ${streak}` : null,
    beatenPct !== null ? `Better than ${beatenPct}% today` : null,
  ].filter(Boolean);
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
