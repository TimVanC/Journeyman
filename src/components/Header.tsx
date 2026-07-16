import JerseyRenderer from "./JerseyRenderer";
import { ArchiveIcon, FlameIcon, UserIcon } from "./Icons";

interface Props {
  streak: number;
  onHelp: () => void;
  onArchive: () => void;
  onAccount: () => void;
  signedIn: boolean;
}

export default function Header({ streak, onHelp, onArchive, onAccount, signedIn }: Props) {
  return (
    <header className="baseline-rule relative z-10 bg-paper/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-end gap-2">
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
        </div>
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
            onClick={onArchive}
            aria-label="Puzzle archive"
            title="Archive"
          >
            <ArchiveIcon />
          </button>
          <button
            type="button"
            className="chip cursor-pointer"
            onClick={onAccount}
            aria-label={signedIn ? "Your account" : "Sign in or create a free account"}
            title={signedIn ? "Account" : "Sign in — free"}
          >
            <UserIcon className={signedIn ? "text-wood-deep" : undefined} />
          </button>
          <button
            type="button"
            className="chip cursor-pointer font-bold"
            onClick={onHelp}
            aria-label="How to play"
          >
            ?
          </button>
        </div>
      </div>
    </header>
  );
}
