import FootballJerseyRenderer, { type FootballEraStyle } from "../components/FootballJerseyRenderer";
import colorwaysJson from "../data/nfl/colorways.json";
import playerIndexJson from "../data/nfl/playerIndex.json";
import teamSeasonsJson from "../data/nfl/teamSeasons.json";
import { nflPuzzles } from "../data/nfl/puzzles";
import { NFL_ROSTER } from "../data/nfl/roster";
import { createPlayerSearch } from "../data/playerSearch";
import { createSeasonDB, plainYearLabel, type SeasonJSON } from "../data/seasonDB";
import { createStorage } from "../game/storage";
import type { ColorwayDB } from "../game/colorways";
import type { StatCell, Stint } from "../game/types";
import {
  AllNbaIcon,
  ComebackIcon,
  CrownIcon,
  FmvpIcon,
  MedalIcon,
  OpoyIcon,
  RoyIcon,
  StarIcon,
  TrophyIcon,
} from "../components/Icons";
import type { SportConfig } from "./types";

const colorways = colorwaysJson as unknown as ColorwayDB;

const cells = (s: Stint): StatCell[] => s.statLine ?? [];

export const nfl: SportConfig = {
  sport: "nfl",
  league: "NFL",
  brandTag: "NFL",
  shareTag: "Journeyman NFL",
  shareEmoji: "🏈",
  tagline: "A mystery NFL journeyman, one jersey at a time.",

  puzzles: nflPuzzles,
  dailyPool: 5,
  roster: NFL_ROSTER,
  searchPlayers: createPlayerSearch(playerIndexJson as [string, string][]),

  colorways,
  // NFL colorways carry per-era tricodes (OAK, SD, STL...) directly
  eraTricode: (era, franchise) => era.tricode ?? franchise,
  Jersey: ({ era, number, size, label }) => (
    <FootballJerseyRenderer
      primary={era.primary}
      secondary={era.secondary}
      trim={era.trim}
      number={number}
      eraStyle={era.eraStyle as FootballEraStyle}
      size={size}
      label={label}
    />
  ),
  DeckJersey: ({ size }) => (
    <FootballJerseyRenderer
      primary="#f2e7d2"
      secondary="#8a5f3c"
      trim="#3a2c1c"
      number={null}
      eraStyle="stripes"
      size={size}
    />
  ),
  cardJerseySize: 96,

  // NFL seasons are single calendar years
  stintYears: (s: Stint) =>
    s.startYear === s.endYear ? `${s.startYear}` : `${s.startYear}–${s.endYear}`,

  // puzzles author position-shaped 5-cell lines directly
  cardStats: cells,
  stintSummary: (s) => {
    const c = cells(s);
    // "57 GP · 11,654 Yds" — GP plus the yardage cell every position has
    const gp = c.find((x) => x.label === "GP");
    const yds = c.find((x) => x.label === "Yds");
    return [gp && `${gp.value} GP`, yds && `${Number(yds.value).toLocaleString()} Yds`]
      .filter(Boolean)
      .join(" · ");
  },

  accoladeMeta: {
    pro_bowl: { Icon: StarIcon, label: "Pro Bowl" },
    champion: { Icon: TrophyIcon, label: "Super Bowl champ" },
    mvp: { Icon: CrownIcon, label: "MVP" },
    sb_mvp: { Icon: FmvpIcon, label: "Super Bowl MVP" },
    all_pro: { Icon: AllNbaIcon, label: "First-Team All-Pro" },
    roy: { Icon: RoyIcon, label: "Off. ROY" },
    opoy: { Icon: OpoyIcon, label: "Off. Player of the Year" },
    comeback: { Icon: ComebackIcon, label: "Comeback Player" },
    olympic_gold: { Icon: MedalIcon, label: "Olympic gold" },
  },

  hintLadder: [
    { key: "position", label: "Position" },
    { key: "height", label: "Height" },
    { key: "draftYear", label: "Draft year" },
    { key: "draftPick", label: "Draft pick" },
    { key: "college", label: "College" },
  ],

  gradeLabels: {
    lost: "Cut",
    allHints: "Hail Mary",
    someHints: "Practice Squad",
    one: "Hall of Fame",
    half: "All-Pro",
    most: "Starter",
    full: "Backup",
  },

  getStintSeasons: createSeasonDB(teamSeasonsJson as unknown as SeasonJSON),
  seasonLabel: plainYearLabel,

  storage: createStorage("journeyman:nfl", "2026-07-20"),
};
