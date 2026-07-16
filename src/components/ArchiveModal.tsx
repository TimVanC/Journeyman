import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { fetchResults, type CloudResult } from "../lib/cloud";
import { loadArchiveResults, loadProfile } from "../game/storage";
import { CheckIcon, GraveIcon, LockIcon } from "./Icons";

interface Props {
  session: Session | null;
  /** current daily puzzle number — archive is every day before it */
  today: number;
  onClose: () => void;
  /** logged-out CTA routes here to create the free account */
  onSignUp: () => void;
}

/** Every past daily puzzle, playable any time — a free-account perk. */
export default function ArchiveModal({ session, today, onClose, onSignUp }: Props) {
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
          <ArchiveGrid today={today} />
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

function ArchiveGrid({ today }: { today: number }) {
  const [cloud, setCloud] = useState<CloudResult[] | null>(null);

  useEffect(() => {
    fetchResults().then(setCloud);
  }, []);

  const pastDays = Array.from({ length: today - 1 }, (_, i) => today - 1 - i); // newest first

  if (pastDays.length === 0) {
    return (
      <p className="mt-4 text-sm text-ink-soft">
        No past puzzles yet — the archive starts filling up tomorrow.
      </p>
    );
  }

  // merge cloud + local so results show even before a sync finishes
  const byDay = new Map<number, { won: boolean; revealed: number | null }>();
  const local = { ...loadProfile().history, ...loadArchiveResults() };
  for (const [d, res] of Object.entries(local)) {
    byDay.set(Number(d), { won: res !== "DNF", revealed: res === "DNF" ? null : res });
  }
  for (const r of cloud ?? []) {
    byDay.set(r.day, { won: r.won, revealed: r.revealed });
  }

  return (
    <div className="mt-3">
      <p className="mb-2 text-xs text-ink-soft">
        Archive games count in your stats but not your daily streak.
      </p>
      <ul className="grid max-h-[50vh] grid-cols-3 gap-1.5 overflow-y-auto">
        {pastDays.map((day) => {
          const res = byDay.get(day);
          return (
            <li key={day}>
              <a
                href={`?d=${day}`}
                className="btn flex w-full flex-col items-center gap-0.5 py-2 text-xs"
              >
                <span className="font-display text-base leading-none">#{day}</span>
                {res ? (
                  res.won ? (
                    <span className="flex items-center gap-1 text-[0.6rem] text-[#2e7d43]">
                      <CheckIcon size={11} /> {res.revealed} 👕
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[0.6rem] text-[#b3362a]">
                      <GraveIcon size={11} /> DNF
                    </span>
                  )
                ) : (
                  <span className="text-[0.6rem] text-ink-soft">unplayed</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
