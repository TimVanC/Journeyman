import { HINT_COUNT } from "./state";

/** 🔍 reads as a clue pulled from the player profile ladder. The jersey
 *  emoji is per sport: 🎽 for NBA (closest thing to a singlet in the
 *  emoji set), 🏈 / ⚾ for the others — the ball reads instantly. */
const HINT = "🔍";

/** Share text. One idea per line, score on its own line under the rank:
 *
 *    Journeyman NFL #12 · All-Pro
 *    375 pts
 *    🏈🏈🏈🏈🏈🏈🏈 7/7
 *    🔍🔍🔍 3/5
 *    journeymanjersey.com
 *
 *  Each jersey emoji is a jersey you had to flip and each 🔍 a hint you
 *  had to burn — the icons carry the meaning, no words needed. Wrong
 *  guesses aren't listed: a miss auto-burns the next jersey or hint, so
 *  it's already counted in the rows above. The daily percentile stays an
 *  in-app stat only; it doesn't travel in the share. */
export function buildShareText(opts: {
  /** "Journeyman" / "Journeyman NFL" / "Journeyman MLB" */
  shareTag: string;
  /** the sport's flipped-jersey emoji */
  jerseyEmoji: string;
  day: number;
  grade: string;
  score: number;
  /** jerseys on the table when it ended */
  revealed: number;
  total: number;
  hints: number;
  hard: boolean;
}): string {
  const { shareTag, jerseyEmoji: JERSEY, day, grade, score, revealed, total, hints, hard } = opts;

  const lines = [
    `${shareTag} #${day} · ${grade}${hard ? " · HARD" : ""}`,
    `${score} pts`,
    `${JERSEY.repeat(revealed)} ${revealed}/${total}`,
  ];
  if (hints > 0) {
    lines.push(`${HINT.repeat(hints)} ${hints}/${HINT_COUNT}`);
  }

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
