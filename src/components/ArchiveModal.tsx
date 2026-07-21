import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import posthog from "posthog-js";
import { fetchResults, type CloudResult } from "../lib/cloud";
import {
  LAUNCH_DATE_ET,
  dayNumberForDate,
  loadArchiveResults,
  loadProfile,
  todayET,
} from "../game/storage";
import { LockIcon } from "./Icons";

interface Props {
  session: Session | null;
  /** current daily puzzle number — archive is every day before it */
  today: number;
  onClose: () => void;
  /** logged-out CTA routes here to create the free account */
  onSignUp: () => void;
}

/** Every past daily puzzle in a month calendar (NYT-style) — a free-account
 *  perk. Days already played are marked red. */
export default function ArchiveModal({ session, onClose, onSignUp }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label="Puzzle archive" className="modal-panel p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl">Archive</h2>
          <button type="button" className="chip cursor-pointer" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {session ? (
          <ArchiveCalendar />
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3 text-center text-sm">
            <LockIcon size={28} className="text-wood-deep" />
            <p className="leading-relaxed">
              Every past puzzle lives here — and it's yours with a{" "}
              <strong>free account</strong>. No card, no catch: just sign up
              and replay the whole back catalog.
            </p>
            <button type="button" className="btn btn-primary w-full py-2.5" onClick={onSignUp}>
              Create a free account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const ym = (y: number, m: number) => y * 12 + m;

function ArchiveCalendar() {
  const [cloud, setCloud] = useState<CloudResult[] | null>(null);
  useEffect(() => {
    fetchResults().then(setCloud);
  }, []);

  const todayStr = todayET();
  const [view, setView] = useState(() => ({
    y: Number(todayStr.slice(0, 4)),
    m: Number(todayStr.slice(5, 7)) - 1, // 0-based month
  }));

  // any recorded result (won or DNF) marks the day as played
  const played = new Set<number>();
  for (const d of Object.keys({ ...loadProfile().history, ...loadArchiveResults() })) {
    played.add(Number(d));
  }
  for (const r of cloud ?? []) played.add(r.day);

  const launchYm = ym(Number(LAUNCH_DATE_ET.slice(0, 4)), Number(LAUNCH_DATE_ET.slice(5, 7)) - 1);
  const todayYm = ym(Number(todayStr.slice(0, 4)), Number(todayStr.slice(5, 7)) - 1);
  const viewYm = ym(view.y, view.m);
  const canPrev = viewYm > launchYm;
  const canNext = viewYm < todayYm;

  const first = new Date(Date.UTC(view.y, view.m, 1));
  const leadingBlanks = first.getUTCDay();
  const daysInMonth = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const monthLabel = first.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const dateStr = (d: number) =>
    `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const move = (dir: -1 | 1) =>
    setView((v) => {
      const next = ym(v.y, v.m) + dir;
      return { y: Math.floor(next / 12), m: ((next % 12) + 12) % 12 };
    });

  const cellBase =
    "flex h-9 w-full items-center justify-center rounded-full text-sm tabular-nums";

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="chip cursor-pointer font-bold disabled:opacity-30"
          onClick={() => move(-1)}
          disabled={!canPrev}
          aria-label="Previous month"
        >
          ‹
        </button>
        <p className="font-display text-lg tracking-wide">{monthLabel}</p>
        <button
          type="button"
          className="chip cursor-pointer font-bold disabled:opacity-30"
          onClick={() => move(1)}
          disabled={!canNext}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="text-[0.6rem] font-bold uppercase text-ink-soft">
            {w}
          </span>
        ))}
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <span key={`b${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = i + 1;
          const ds = dateStr(d);
          const dayNum = dayNumberForDate(ds);
          const isToday = ds === todayStr;
          const playable = dayNum >= 1 && ds < todayStr;
          if (isToday) {
            return (
              <a
                key={d}
                href={location.pathname}
                className={`${cellBase} border-2 border-ink font-bold`}
                title="Today's puzzle"
              >
                {d}
              </a>
            );
          }
          if (playable) {
            const done = played.has(dayNum);
            return (
              <a
                key={d}
                href={`?d=${dayNum}`}
                title={`Puzzle #${dayNum}${done ? " · played" : ""}`}
                className={`${cellBase} ${
                  done
                    ? "bg-[#b3362a] font-bold text-[#faf6ec]"
                    : "border border-line font-medium hover:border-ink"
                }`}
                onClick={() => posthog.capture("archive_puzzle_started", { day: dayNum, already_played: done })}
              >
                {d}
              </a>
            );
          }
          return (
            <span key={d} className={`${cellBase} text-ink-soft/40`}>
              {d}
            </span>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-ink-soft">
        <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#b3362a] align-middle" />{" "}
        played · Archive games count in your stats but not your daily streak.
      </p>
    </div>
  );
}
