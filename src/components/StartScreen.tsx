import { SPORT } from "../sports/active";
import { SPORTS, SPORT_ORDER, sportHref } from "../sports";
import { GearIcon } from "./Icons";

interface Props {
  day: number;
  /** label depends on where today's game stands */
  cta: "Play" | "Continue" | "See result";
  dateLabel: string;
  onPlay: () => void;
  onRules: () => void;
  onSettings: () => void;
  onArchive: () => void;
  onAccount: () => void;
  signedIn: boolean;
}

export default function StartScreen({
  day,
  cta,
  dateLabel,
  onPlay,
  onRules,
  onSettings,
  onArchive,
  onAccount,
  signedIn,
}: Props) {
  return (
    <div className="start-screen" role="dialog" aria-label={`Journeyman ${SPORT.league} — start`}>
      {/* how-to-play + settings, same corner as the game header */}
      <div className="absolute right-4 top-4 flex items-center gap-2">
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
        <div className="start-jersey" aria-hidden="true">
          <SPORT.DeckJersey size={SPORT.sport === "nba" ? 110 : 130} />
        </div>

        <h1 className="font-display mt-4 text-[3.4rem] leading-none tracking-wide">
          JOURNEYMAN
        </h1>

        {/* three games, one site — each league is its own daily puzzle */}
        <nav
          className="mt-2 flex items-center gap-1.5"
          aria-label="Choose your league"
        >
          {SPORT_ORDER.map((s) => (
            <a
              key={s}
              href={sportHref(s)}
              className={`chip px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest ${
                s === SPORT.sport ? "chip-active" : "cursor-pointer"
              }`}
              aria-current={s === SPORT.sport ? "page" : undefined}
            >
              {SPORTS[s].league}
            </a>
          ))}
        </nav>

        <p className="mt-3 text-sm font-medium text-ink-soft">
          {SPORT.tagline}
          <br />
          Name him in as few jerseys as you can.
        </p>

        <p className="mt-5 text-base font-semibold">{dateLabel}</p>
        <p className="mt-0.5 text-base font-semibold text-ink-soft">No. {day}</p>

        <button type="button" className="btn btn-primary mt-4 w-full py-3.5 text-sm" onClick={onPlay}>
          {cta}
        </button>
        <button type="button" className="btn mt-2.5 w-full" onClick={onArchive}>
          Archive
        </button>

        {!signedIn && (
          <button
            type="button"
            className="mt-4 text-xs font-bold text-wood-deep underline underline-offset-2"
            onClick={onAccount}
          >
            Create a free account — save your streak and unlock the archive
          </button>
        )}

        <p className="mt-8 text-[0.65rem] text-ink-soft">
          New puzzle at midnight ET · Not affiliated with the {SPORT.league}
        </p>
      </div>
    </div>
  );
}
