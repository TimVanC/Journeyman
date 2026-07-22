import { SPORT } from "../sports/active";
import { SPORTS, SPORT_ORDER, sportHref } from "../sports";
import type { Sport } from "../sports/types";
import { ChartIcon, FlameIcon, GearIcon } from "./Icons";

interface Props {
  /** enter the current league's board (or its recap if already done) */
  onPlay: () => void;
  onRules: () => void;
  onSettings: () => void;
  onArchive: () => void;
  onStats: () => void;
  onAccount: () => void;
  signedIn: boolean;
}

/** Today's standing for one league, read straight from its own storage —
 *  so the home hub shows Play / Continue / Recap per sport at a glance. */
function homeStatus(s: Sport) {
  const st = SPORTS[s].storage;
  const day = st.currentDayNumber();
  const saved = st.loadGameState(day);
  const done = !!saved && saved.status !== "playing";
  const inProgress =
    !!saved &&
    saved.status === "playing" &&
    (saved.revealed > 1 || saved.wrongGuesses.length > 0);
  const won = saved?.status === "won";
  const streak = st.displayStreak(st.loadProfile(), day);
  const cta = done ? "Recap" : inProgress ? "Continue" : "Play";
  return { day, done, won, streak, cta };
}

export default function StartScreen({
  onPlay,
  onRules,
  onSettings,
  onArchive,
  onStats,
  onAccount,
  signedIn,
}: Props) {
  return (
    <div className="start-screen" role="dialog" aria-label="Journeyman — pick a league">
      {/* stats + how-to-play + settings, same corner as the game header */}
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <button
          type="button"
          className="chip cursor-pointer"
          onClick={onStats}
          aria-label="Your stats"
          title="Stats"
        >
          <ChartIcon />
        </button>
        <button
          type="button"
          className="chip cursor-pointer font-bold"
          onClick={onRules}
          aria-label="How to play"
        >
          ?
        </button>
        <button
          type="button"
          className="chip cursor-pointer"
          onClick={onSettings}
          aria-label="Settings"
          title="Settings"
        >
          <GearIcon />
        </button>
      </div>

      <div className="flex w-full max-w-sm flex-col items-center px-6 text-center">
        <h1 className="font-display mt-2 text-[3.4rem] leading-none tracking-wide">
          JOURNEYMAN
        </h1>
        <p className="mt-2 text-sm font-medium text-ink-soft">
          A mystery journeyman's career, one jersey at a time.
          <br />
          Three games — pick your league.
        </p>

        {/* the three daily games — one tap each, straight into play */}
        <div className="mt-6 w-full space-y-2.5">
          {SPORT_ORDER.map((s) => {
            const info = homeStatus(s);
            const isCurrent = s === SPORT.sport;
            const Jersey = SPORTS[s].DeckJersey;
            const inner = (
              <>
                <span className="shrink-0" aria-hidden="true">
                  <Jersey size={40} />
                </span>
                <span className="flex-1 text-left">
                  <span className="font-display block text-lg leading-none tracking-wide">
                    {SPORTS[s].league}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[0.7rem] text-ink-soft">
                    No. {info.day}
                    {info.done && (
                      <span className={info.won ? "font-bold text-[#2e7d43]" : "text-ink-soft"}>
                        · {info.won ? "Solved" : "Done"}
                      </span>
                    )}
                    {info.streak > 0 && (
                      <span className="flex items-center gap-0.5 font-bold text-ink">
                        <FlameIcon size={11} className="text-wood-deep" />
                        {info.streak}
                      </span>
                    )}
                  </span>
                </span>
                <span className="home-card-cta shrink-0">{info.cta}</span>
              </>
            );
            const cls =
              "home-card flex w-full items-center gap-3 rounded-xl border-2 border-ink bg-card px-3 py-3 text-left";
            return isCurrent ? (
              <button key={s} type="button" className={cls} onClick={onPlay}>
                {inner}
              </button>
            ) : (
              <a key={s} className={cls} href={sportHref(s, { play: 1 })}>
                {inner}
              </a>
            );
          })}
        </div>

        <button type="button" className="btn mt-4 w-full" onClick={onArchive}>
          {SPORT.league} Archive
        </button>

        {!signedIn && (
          <button
            type="button"
            className="mt-4 text-xs font-bold text-wood-deep underline underline-offset-2"
            onClick={onAccount}
          >
            Create a free account — save your streaks and unlock the archive
          </button>
        )}

        <p className="mt-8 text-[0.65rem] text-ink-soft">
          New puzzles at midnight ET · Not affiliated with the NBA/NFL/MLB
        </p>
      </div>
    </div>
  );
}
