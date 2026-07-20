import { SPORT } from "../sports/active";
import { SPORT_ORDER, sportHref } from "../sports";
import { ChartIcon, FlameIcon, GearIcon } from "./Icons";

interface Props {
  streak: number;
  onHelp: () => void;
  onStats: () => void;
  onSettings: () => void;
}

export default function Header({ streak, onHelp, onStats, onSettings }: Props) {
  return (
    <header className="baseline-rule relative z-10 bg-paper/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
        <a
          href={sportHref(SPORT.sport)}
          className="flex items-end gap-2"
          aria-label={`Journeyman ${SPORT.league} — today's puzzle`}
        >
          <span aria-hidden="true" className="-mb-0.5">
            <SPORT.DeckJersey size={18} />
          </span>
          <h1 className="font-display text-[1.65rem] leading-none tracking-wide">
            JOURNEYMAN
          </h1>
          {SPORT.brandTag && (
            <span className="font-display -ml-0.5 text-[0.95rem] leading-none tracking-wide text-wood-deep">
              {SPORT.brandTag}
            </span>
          )}
        </a>
        <div className="flex items-center gap-2">
          {/* the three games — each sport is its own puzzle, streak, archive */}
          <nav className="flex items-center gap-1" aria-label="Choose your league">
            {SPORT_ORDER.map((s) => (
              <a
                key={s}
                href={sportHref(s)}
                className={`chip !px-1.5 text-[0.62rem] font-bold uppercase ${
                  s === SPORT.sport ? "chip-active" : ""
                }`}
                aria-current={s === SPORT.sport ? "page" : undefined}
              >
                {s.toUpperCase()}
              </a>
            ))}
          </nav>
          <span
            className="chip tabular-nums"
            title="Current streak"
            aria-label={`Current streak: ${streak}`}
          >
            <FlameIcon className="text-wood-deep" /> {streak}
          </span>
          <button
            type="button"
            className="chip cursor-pointer max-sm:hidden"
            onClick={onStats}
            aria-label="Your stats"
            title="Stats"
          >
            <ChartIcon />
          </button>
          <button
            type="button"
            className="chip cursor-pointer font-bold max-sm:hidden"
            onClick={onHelp}
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
      </div>
    </header>
  );
}
