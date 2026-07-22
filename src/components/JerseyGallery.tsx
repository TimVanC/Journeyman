import JerseyRenderer, { type EraStyle } from "./JerseyRenderer";
import FootballJerseyRenderer, { type FootballEraStyle } from "./FootballJerseyRenderer";
import BaseballBackJerseyRenderer, {
  type BaseballEraStyle,
} from "./BaseballBackJerseyRenderer";
import { SPORTS, SPORT_ORDER } from "../sports";

/**
 * Dev-only jersey QA sheet (?jerseys) — every renderer across its era
 * styles in a few colorways, for eyeballing geometry + era treatments
 * without playing through games. Not reachable in production builds.
 */

const SAMPLES = [
  { name: "royal/white", primary: "#1D428A", secondary: "#FFFFFF", trim: "#C8102E" },
  { name: "red/gold", primary: "#C8102E", secondary: "#FFB612", trim: "#FFFFFF" },
  { name: "green/yellow", primary: "#203731", secondary: "#FFB612", trim: "#FFFFFF" },
  { name: "black/silver", primary: "#000000", secondary: "#A5ACAF", trim: "#FFFFFF" },
];

const MLB_SAMPLES = [
  { name: "white + navy (pin)", primary: "#FFFFFF", secondary: "#132448", trim: "#C4CED3", pinstripe: true },
  { name: "gray + red", primary: "#C4CED3", secondary: "#C6011F", trim: "#000000", pinstripe: false },
  { name: "gold pullover", primary: "#EFB21E", secondary: "#003831", trim: "#FFFFFF", pinstripe: false },
  { name: "powder blue", primary: "#7CB8E6", secondary: "#134A8E", trim: "#FFFFFF", pinstripe: false },
];

export default function JerseyGallery() {
  const nbaEras: EraStyle[] = ["classic", "nineties", "baggy", "modern"];
  const nflEras: FootballEraStyle[] = ["classic", "stripes", "nineties", "modern"];
  const mlbEras: BaseballEraStyle[] = ["flannel", "pullover", "buttoned", "modern"];

  return (
    <div className="min-h-dvh p-6">
      <h1 className="font-display text-2xl">Jersey QA sheet</h1>

      <h2 className="font-display mt-4 text-lg">Sport ball icons</h2>
      <div className="flex items-end gap-6">
        {SPORT_ORDER.map((s) => {
          const Ball = SPORTS[s].ballIcon;
          return (
            <div key={s} className="text-center">
              <Ball size={64} />
              <Ball size={17} />
              <p className="text-[0.6rem]">{s}</p>
            </div>
          );
        })}
      </div>

      <h2 className="font-display mt-6 text-lg">NFL</h2>
      {SAMPLES.map((c) => (
        <div key={c.name} className="mt-2 flex items-end gap-4">
          <span className="w-28 text-xs">{c.name}</span>
          {nflEras.map((era) => (
            <div key={era} className="text-center">
              <FootballJerseyRenderer
                primary={c.primary}
                secondary={c.secondary}
                trim={c.trim}
                number={12}
                eraStyle={era}
                size={120}
                label={c.name.startsWith("royal") || c.name.startsWith("green") ? "GB" : "SEA"}
              />
              <p className="text-[0.6rem]">{era}</p>
            </div>
          ))}
        </div>
      ))}

      <h2 className="font-display mt-8 text-lg">MLB</h2>
      {MLB_SAMPLES.map((c) => (
        <div key={c.name} className="mt-2 flex items-end gap-4">
          <span className="w-28 text-xs">{c.name}</span>
          {mlbEras.map((era) => (
            <div key={era} className="text-center">
              <BaseballBackJerseyRenderer
                primary={c.primary}
                secondary={c.secondary}
                trim={c.trim}
                number={24}
                eraStyle={era}
                pinstripe={c.pinstripe}
                size={110}
                label={c.name.startsWith("white") || c.name.startsWith("powder") ? "NYY" : "SD"}
              />
              <p className="text-[0.6rem]">{era}</p>
            </div>
          ))}
        </div>
      ))}

      <h2 className="font-display mt-8 text-lg">NBA (regression)</h2>
      <div className="mt-2 flex items-end gap-4">
        {nbaEras.map((era) => (
          <div key={era} className="text-center">
            <JerseyRenderer
              primary="#552583"
              secondary="#FDB927"
              trim="#FFFFFF"
              number={8}
              eraStyle={era}
              size={90}
              label="LAL"
            />
            <p className="text-[0.6rem]">{era}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
