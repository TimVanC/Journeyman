import JerseyRenderer from "./JerseyRenderer";
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
    <div className="start-screen" role="dialog" aria-label="Journeyman — start">
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
          <JerseyRenderer
            primary="#b3855a"
            secondary="#faf6ec"
            trim="#3a2c1c"
            number={null}
            eraStyle="nineties"
            size={110}
          />
        </div>

        <h1 className="font-display mt-4 text-[3.4rem] leading-none tracking-wide">
          JOURNEYMAN
        </h1>
        <p className="mt-2 text-sm font-medium text-ink-soft">
          A mystery NBA journeyman, one jersey at a time.
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
          New puzzle at midnight ET · Not affiliated with the NBA
        </p>
      </div>
    </div>
  );
}
