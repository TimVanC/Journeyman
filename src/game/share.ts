import type { TrailEvent } from "./types";

const EMOJI: Record<TrailEvent, string> = {
  jersey: "👕",
  miss: "❌",
  solve: "✅",
  dnf: "🪦",
};

export function trailToEmoji(trail: TrailEvent[]): string {
  return trail.map((e) => EMOJI[e]).join("");
}

export function buildShareText(opts: {
  day: number;
  trail: TrailEvent[];
  score: number | null; // jerseys visible at solve; null = DNF
  total: number;
  streak: number;
  hints: number; // scouting hints burned
  grade: string; // rank label from computeGrade
}): string {
  const { day, trail, score, total, streak, hints, grade } = opts;
  const hintNote = hints > 0 ? ` + ${hints} hint${hints > 1 ? "s" : ""}` : "";
  const lines = [
    `JOURNEYMAN #${day} · ${grade}`,
    `${trailToEmoji(trail)} (${score ?? "X"}/${total}${hintNote})`,
  ];
  if (streak > 0) lines.push(`🔥 streak: ${streak}`);
  lines.push("journeymangame.com");
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
