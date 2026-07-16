import JerseyRenderer from "./JerseyRenderer";
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
        <a href="/" className="flex items-end gap-2" aria-label="Journeyman — today's puzzle">
          <span aria-hidden="true" className="-mb-0.5">
            <JerseyRenderer
              primary="#b3855a"
              secondary="#faf6ec"
              trim="#8c6239"
              number={null}
              eraStyle="classic"
              size={18}
            />
          </span>
          <h1 className="font-display text-[1.65rem] leading-none tracking-wide">
            JOURNEYMAN
          </h1>
        </a>
        <div className="flex items-center gap-2">
          <span
            className="chip tabular-nums"
            title="Current streak"
            aria-label={`Current streak: ${streak}`}
          >
            <FlameIcon className="text-wood-deep" /> {streak}
          </span>
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
