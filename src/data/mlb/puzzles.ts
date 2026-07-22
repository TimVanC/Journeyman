import type { Puzzle } from "../../game/types";

/**
 * MLB Phase-1 hand-written puzzle set. 5 real journeymen/stars-with-mileage.
 *
 * DATA PROVENANCE — generated from general knowledge (2026-07-19).
 * Stint years, uniform numbers, and stat lines are best-effort recall and
 * MUST be verified against Baseball-Reference before launch (per-stint
 * totals from BR team-batting/pitching splits, numbers via BR uniform
 * pages). Years are SEASON years. Mid-season trades make two stints share
 * a year (Beltrán 2004: KC → HOU).
 *
 * Stat cells, 5 per card (3 top, 2 bottom):
 *   batters:  G · AVG · HR | RBI · SB
 *   pitchers: G · W-L · ERA | SO · WHIP
 *
 * revealOrder: least identifying first, the signature run last (brief §4).
 */
export const mlbPuzzles: Puzzle[] = [
  {
    // Puzzle 1 — Alfonso Soriano: five stops incl. a Yankees return, a
    // 40/40 season in his lone Washington year.
    id: 1,
    pathType: "team",
    answer: "Alfonso Soriano",
    accolades: ["7× All-Star", "4× Silver Slugger", "40/40 club (2006)"],
    stints: [
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 1999,
        endYear: 2003,
        jerseyNumber: 12,
        accolades: [
          { type: "all_star", count: 2 },
          { type: "silver_slugger", count: 2 },
        ],
        statLine: [
          { label: "G", value: 626 },
          { label: "AVG", value: ".284" },
          { label: "HR", value: 98 },
          { label: "RBI", value: 270 },
          { label: "SB", value: 121 },
        ],
      },
      {
        franchise: "TEX",
        displayTeam: "Texas Rangers",
        startYear: 2004,
        endYear: 2005,
        jerseyNumber: 12,
        accolades: [
          { type: "all_star", count: 2 },
          { type: "silver_slugger", count: 1 },
        ],
        statLine: [
          { label: "G", value: 301 },
          { label: "AVG", value: ".274" },
          { label: "HR", value: 64 },
          { label: "RBI", value: 195 },
          { label: "SB", value: 48 },
        ],
      },
      {
        franchise: "WSH",
        displayTeam: "Washington Nationals",
        startYear: 2006,
        endYear: 2006,
        jerseyNumber: 12,
        accolades: [
          { type: "all_star", count: 1 },
          { type: "silver_slugger", count: 1 },
        ],
        statLine: [
          { label: "G", value: 159 },
          { label: "AVG", value: ".277" },
          { label: "HR", value: 46 },
          { label: "RBI", value: 95 },
          { label: "SB", value: 41 },
        ],
      },
      {
        franchise: "CHC",
        displayTeam: "Chicago Cubs",
        startYear: 2007,
        endYear: 2013,
        jerseyNumber: 12,
        accolades: [{ type: "all_star", count: 2 }],
        statLine: [
          { label: "G", value: 889 },
          { label: "AVG", value: ".264" },
          { label: "HR", value: 181 },
          { label: "RBI", value: 526 },
          { label: "SB", value: 71 },
        ],
      },
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 2013,
        endYear: 2014,
        jerseyNumber: 12,
        statLine: [
          { label: "G", value: 125 },
          { label: "AVG", value: ".238" },
          { label: "HR", value: 23 },
          { label: "RBI", value: 67 },
          { label: "SB", value: 19 },
        ],
      },
    ],
    revealOrder: [2, 1, 4, 3, 0],
    hints: {
      position: "2B / LF",
      batsThrows: "R / R",
      height: "6'1\"",
      debutYear: "1999",
      born: "San Pedro de Macorís, D.R.",
    },
  },
  {
    // Puzzle 2 — Carlos Beltrán: eight stops, October legend, one ring
    // at the very last one.
    id: 2,
    pathType: "team",
    answer: "Carlos Beltrán",
    accolades: ["9× All-Star", "3× Gold Glove", "1998 AL ROY", "2017 WS champion"],
    stints: [
      {
        franchise: "KC",
        displayTeam: "Kansas City Royals",
        startYear: 1998,
        endYear: 2004,
        jerseyNumber: 36,
        accolades: [{ type: "roy", count: 1 }],
        statLine: [
          { label: "G", value: 795 },
          { label: "AVG", value: ".287" },
          { label: "HR", value: 123 },
          { label: "RBI", value: 516 },
          { label: "SB", value: 164 },
        ],
      },
      {
        franchise: "HOU",
        displayTeam: "Houston Astros",
        startYear: 2004,
        endYear: 2004,
        jerseyNumber: 15,
        statLine: [
          { label: "G", value: 90 },
          { label: "AVG", value: ".258" },
          { label: "HR", value: 23 },
          { label: "RBI", value: 53 },
          { label: "SB", value: 28 },
        ],
      },
      {
        franchise: "NYM",
        displayTeam: "New York Mets",
        startYear: 2005,
        endYear: 2011,
        jerseyNumber: 15,
        accolades: [
          { type: "all_star", count: 5 },
          { type: "gold_glove", count: 3 },
          { type: "silver_slugger", count: 2 },
        ],
        statLine: [
          { label: "G", value: 839 },
          { label: "AVG", value: ".280" },
          { label: "HR", value: 149 },
          { label: "RBI", value: 559 },
          { label: "SB", value: 100 },
        ],
      },
      {
        franchise: "SF",
        displayTeam: "San Francisco Giants",
        startYear: 2011,
        endYear: 2011,
        jerseyNumber: 15,
        statLine: [
          { label: "G", value: 44 },
          { label: "AVG", value: ".323" },
          { label: "HR", value: 7 },
          { label: "RBI", value: 18 },
          { label: "SB", value: 1 },
        ],
      },
      {
        franchise: "STL",
        displayTeam: "St. Louis Cardinals",
        startYear: 2012,
        endYear: 2013,
        jerseyNumber: 3,
        accolades: [{ type: "all_star", count: 2 }],
        statLine: [
          { label: "G", value: 296 },
          { label: "AVG", value: ".282" },
          { label: "HR", value: 56 },
          { label: "RBI", value: 181 },
          { label: "SB", value: 15 },
        ],
      },
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 2014,
        endYear: 2016,
        jerseyNumber: 36,
        accolades: [{ type: "all_star", count: 1 }],
        statLine: [
          { label: "G", value: 341 },
          { label: "AVG", value: ".270" },
          { label: "HR", value: 56 },
          { label: "RBI", value: 174 },
          { label: "SB", value: 3 },
        ],
      },
      {
        franchise: "TEX",
        displayTeam: "Texas Rangers",
        startYear: 2016,
        endYear: 2016,
        jerseyNumber: 36,
        statLine: [
          { label: "G", value: 52 },
          { label: "AVG", value: ".280" },
          { label: "HR", value: 7 },
          { label: "RBI", value: 29 },
          { label: "SB", value: 0 },
        ],
      },
      {
        franchise: "HOU",
        displayTeam: "Houston Astros",
        startYear: 2017,
        endYear: 2017,
        jerseyNumber: 15,
        accolades: [{ type: "champion", count: 1 }],
        statLine: [
          { label: "G", value: 129 },
          { label: "AVG", value: ".231" },
          { label: "HR", value: 14 },
          { label: "RBI", value: 51 },
          { label: "SB", value: 0 },
        ],
      },
    ],
    revealOrder: [6, 3, 1, 5, 4, 7, 2, 0],
    hints: {
      position: "CF",
      batsThrows: "S / R",
      height: "6'1\"",
      debutYear: "1998",
      born: "Manatí, Puerto Rico",
    },
  },
  {
    // Puzzle 3 — Adrián Beltré: only four stops, but the arc (LA wunderkind
    // → Safeco struggle → Fenway rebound → Texas legend) is the whole game.
    id: 3,
    pathType: "team",
    answer: "Adrián Beltré",
    accolades: ["4× All-Star", "5× Gold Glove", "3,166 hits", "Hall of Fame (2024)"],
    stints: [
      {
        franchise: "LAD",
        displayTeam: "Los Angeles Dodgers",
        startYear: 1998,
        endYear: 2004,
        jerseyNumber: 29,
        accolades: [{ type: "silver_slugger", count: 1 }],
        statLine: [
          { label: "G", value: 986 },
          { label: "AVG", value: ".274" },
          { label: "HR", value: 147 },
          { label: "RBI", value: 510 },
          { label: "SB", value: 55 },
        ],
      },
      {
        franchise: "SEA",
        displayTeam: "Seattle Mariners",
        startYear: 2005,
        endYear: 2009,
        jerseyNumber: 29,
        accolades: [{ type: "gold_glove", count: 2 }],
        statLine: [
          { label: "G", value: 715 },
          { label: "AVG", value: ".266" },
          { label: "HR", value: 103 },
          { label: "RBI", value: 396 },
          { label: "SB", value: 45 },
        ],
      },
      {
        franchise: "BOS",
        displayTeam: "Boston Red Sox",
        startYear: 2010,
        endYear: 2010,
        jerseyNumber: 29,
        accolades: [
          { type: "all_star", count: 1 },
          { type: "silver_slugger", count: 1 },
        ],
        statLine: [
          { label: "G", value: 154 },
          { label: "AVG", value: ".321" },
          { label: "HR", value: 28 },
          { label: "RBI", value: 102 },
          { label: "SB", value: 2 },
        ],
      },
      {
        franchise: "TEX",
        displayTeam: "Texas Rangers",
        startYear: 2011,
        endYear: 2018,
        jerseyNumber: 29,
        accolades: [
          { type: "all_star", count: 3 },
          { type: "gold_glove", count: 3 },
          { type: "silver_slugger", count: 2 },
        ],
        statLine: [
          { label: "G", value: 1098 },
          { label: "AVG", value: ".304" },
          { label: "HR", value: 199 },
          { label: "RBI", value: 699 },
          { label: "SB", value: 15 },
        ],
      },
    ],
    revealOrder: [1, 2, 0, 3],
    hints: {
      position: "3B",
      batsThrows: "R / R",
      height: "5'11\"",
      debutYear: "1998",
      born: "Santo Domingo, D.R.",
    },
  },
  {
    // Puzzle 4 — Zack Greinke: seven stops with a KC bookend; the LAA
    // half-season is the deep cut.
    id: 4,
    pathType: "team",
    answer: "Zack Greinke",
    accolades: ["6× All-Star", "2009 AL Cy Young", "6× Gold Glove"],
    stints: [
      {
        franchise: "KC",
        displayTeam: "Kansas City Royals",
        startYear: 2004,
        endYear: 2010,
        jerseyNumber: 23,
        accolades: [
          { type: "cy_young", count: 1 },
          { type: "all_star", count: 1 },
        ],
        statLine: [
          { label: "G", value: 183 },
          { label: "W-L", value: "60-67" },
          { label: "ERA", value: "3.82" },
          { label: "SO", value: 931 },
          { label: "WHIP", value: "1.26" },
        ],
      },
      {
        franchise: "MIL",
        displayTeam: "Milwaukee Brewers",
        startYear: 2011,
        endYear: 2012,
        jerseyNumber: 13,
        statLine: [
          { label: "G", value: 49 },
          { label: "W-L", value: "25-9" },
          { label: "ERA", value: "3.67" },
          { label: "SO", value: 322 },
          { label: "WHIP", value: "1.20" },
        ],
      },
      {
        franchise: "LAA",
        displayTeam: "Los Angeles Angels",
        startYear: 2012,
        endYear: 2012,
        jerseyNumber: 23,
        statLine: [
          { label: "G", value: 13 },
          { label: "W-L", value: "6-2" },
          { label: "ERA", value: "3.53" },
          { label: "SO", value: 78 },
          { label: "WHIP", value: "1.19" },
        ],
      },
      {
        franchise: "LAD",
        displayTeam: "Los Angeles Dodgers",
        startYear: 2013,
        endYear: 2015,
        jerseyNumber: 21,
        accolades: [
          { type: "all_star", count: 2 },
          { type: "gold_glove", count: 2 },
        ],
        statLine: [
          { label: "G", value: 92 },
          { label: "W-L", value: "51-15" },
          { label: "ERA", value: "2.30" },
          { label: "SO", value: 555 },
          { label: "WHIP", value: "1.03" },
        ],
      },
      {
        franchise: "ARI",
        displayTeam: "Arizona Diamondbacks",
        startYear: 2016,
        endYear: 2019,
        jerseyNumber: 21,
        accolades: [
          { type: "all_star", count: 3 },
          { type: "gold_glove", count: 4 },
          { type: "silver_slugger", count: 1 },
        ],
        statLine: [
          { label: "G", value: 110 },
          { label: "W-L", value: "55-29" },
          { label: "ERA", value: "3.40" },
          { label: "SO", value: 738 },
          { label: "WHIP", value: "1.10" },
        ],
      },
      {
        franchise: "HOU",
        displayTeam: "Houston Astros",
        startYear: 2019,
        endYear: 2021,
        jerseyNumber: 21,
        statLine: [
          { label: "G", value: 58 },
          { label: "W-L", value: "17-10" },
          { label: "ERA", value: "3.85" },
          { label: "SO", value: 282 },
          { label: "WHIP", value: "1.14" },
        ],
      },
      {
        franchise: "KC",
        displayTeam: "Kansas City Royals",
        startYear: 2022,
        endYear: 2023,
        jerseyNumber: 23,
        statLine: [
          { label: "G", value: 56 },
          { label: "W-L", value: "6-24" },
          { label: "ERA", value: "4.55" },
          { label: "SO", value: 190 },
          { label: "WHIP", value: "1.30" },
        ],
      },
    ],
    revealOrder: [2, 5, 1, 6, 4, 3, 0],
    hints: {
      position: "SP",
      batsThrows: "R / R",
      height: "6'2\"",
      debutYear: "2004",
      born: "Orlando, Florida",
    },
  },
  {
    // Puzzle 5 — Javier Vázquez: seven stops, two separate Yankees tours,
    // and the Expos jersey is the Vancouver-Grizzlies-grade money clue.
    id: 5,
    pathType: "team",
    answer: "Javier Vázquez",
    accolades: ["1× All-Star", "2,536 strikeouts"],
    stints: [
      {
        franchise: "WSH",
        displayTeam: "Montreal Expos",
        startYear: 1998,
        endYear: 2003,
        jerseyNumber: 23,
        statLine: [
          { label: "G", value: 187 },
          { label: "W-L", value: "64-68" },
          { label: "ERA", value: "4.16" },
          { label: "SO", value: 1076 },
          { label: "WHIP", value: "1.30" },
        ],
      },
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 2004,
        endYear: 2004,
        jerseyNumber: 31,
        accolades: [{ type: "all_star", count: 1 }],
        statLine: [
          { label: "G", value: 32 },
          { label: "W-L", value: "14-10" },
          { label: "ERA", value: "4.91" },
          { label: "SO", value: 150 },
          { label: "WHIP", value: "1.29" },
        ],
      },
      {
        franchise: "ARI",
        displayTeam: "Arizona Diamondbacks",
        startYear: 2005,
        endYear: 2005,
        jerseyNumber: 33,
        statLine: [
          { label: "G", value: 33 },
          { label: "W-L", value: "11-15" },
          { label: "ERA", value: "4.42" },
          { label: "SO", value: 192 },
          { label: "WHIP", value: "1.25" },
        ],
      },
      {
        franchise: "CHW",
        displayTeam: "Chicago White Sox",
        startYear: 2006,
        endYear: 2008,
        jerseyNumber: 33,
        statLine: [
          { label: "G", value: 99 },
          { label: "W-L", value: "38-30" },
          { label: "ERA", value: "4.40" },
          { label: "SO", value: 638 },
          { label: "WHIP", value: "1.27" },
        ],
      },
      {
        franchise: "ATL",
        displayTeam: "Atlanta Braves",
        startYear: 2009,
        endYear: 2009,
        jerseyNumber: 33,
        statLine: [
          { label: "G", value: 32 },
          { label: "W-L", value: "15-10" },
          { label: "ERA", value: "2.87" },
          { label: "SO", value: 238 },
          { label: "WHIP", value: "1.03" },
        ],
      },
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 2010,
        endYear: 2010,
        jerseyNumber: 31,
        statLine: [
          { label: "G", value: 31 },
          { label: "W-L", value: "10-10" },
          { label: "ERA", value: "5.32" },
          { label: "SO", value: 121 },
          { label: "WHIP", value: "1.40" },
        ],
      },
      {
        franchise: "MIA",
        displayTeam: "Florida Marlins",
        startYear: 2011,
        endYear: 2011,
        jerseyNumber: 23,
        statLine: [
          { label: "G", value: 32 },
          { label: "W-L", value: "13-11" },
          { label: "ERA", value: "3.69" },
          { label: "SO", value: 162 },
          { label: "WHIP", value: "1.18" },
        ],
      },
    ],
    revealOrder: [2, 6, 3, 5, 1, 4, 0],
    hints: {
      position: "SP",
      batsThrows: "R / R",
      height: "6'2\"",
      debutYear: "1998",
      born: "Ponce, Puerto Rico",
    },
  },

  /* ------------------------------------------------------------------
     Puzzles 6-9 — the pre-war set (2026-07-22). Unlike 1-5, these are
     NOT best-effort recall: every stat line is machine-summed from the
     official MLB StatsAPI year-by-year rows (which since 2024 include
     the recognized Negro Leagues), and every season W-L in
     teamSeasons.json comes from the same API's standings endpoint.
     jerseyNumber null = the uniform genuinely had no number (pre-1929,
     and most Negro League clubs) OR the number isn't reliably
     documented — we render a blank back rather than invent one.
  ------------------------------------------------------------------ */
  {
    // Puzzle 6 — Babe Ruth: the game's whole premise in one card — most
    // people forget both the pitching years AND the 1935 Braves farewell.
    id: 6,
    pathType: "team",
    answer: "Babe Ruth",
    accolades: ["7× World Series champion", "1923 AL MVP", "714 career HR", "94-46, 2.28 as a pitcher"],
    stints: [
      {
        franchise: "BOS",
        displayTeam: "Boston Red Sox",
        startYear: 1914,
        endYear: 1919,
        jerseyNumber: null, // numbers didn't exist until 1929
        accolades: [{ type: "champion", count: 3 }],
        // the pitching line IS the clue — a dead-ball ace who also hit
        // .308/49 HR. G here = games pitched.
        statLine: [
          { label: "G", value: 158 },
          { label: "W-L", value: "89-46" },
          { label: "ERA", value: "2.19" },
          { label: "SO", value: 483 },
          { label: "WHIP", value: "1.14" },
        ],
      },
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 1920,
        endYear: 1934,
        jerseyNumber: 3, // from 1929, when numbers arrived (batting-order 3)
        accolades: [
          { type: "champion", count: 4 },
          { type: "mvp", count: 1 },
          { type: "all_star", count: 2 }, // the game only existed from 1933
          { type: "batting_title", count: 1 }, // 1924, .378
        ],
        statLine: [
          { label: "G", value: 2084 },
          { label: "AVG", value: ".349" },
          { label: "HR", value: 659 },
          { label: "RBI", value: 1971 },
          { label: "SB", value: 110 },
        ],
      },
      {
        franchise: "ATL",
        displayTeam: "Boston Braves",
        startYear: 1935,
        endYear: 1935,
        jerseyNumber: 3,
        statLine: [
          { label: "G", value: 28 },
          { label: "AVG", value: ".181" },
          { label: "HR", value: 6 }, // three of them in his final great game
          { label: "RBI", value: 12 },
          { label: "SB", value: 0 },
        ],
      },
    ],
    revealOrder: [2, 0, 1],
    hints: {
      position: "RF / P",
      batsThrows: "L / L",
      height: "6'2\"",
      debutYear: "1914",
      born: "Baltimore, Maryland",
    },
  },
  {
    // Puzzle 7 — Jimmie Foxx: the Beast's forgotten tail — wartime Cubs
    // cameo and a last year pitching-and-pinch-hitting for the Phillies.
    id: 7,
    pathType: "team",
    answer: "Jimmie Foxx",
    accolades: ["3× AL MVP", "2× World Series champion", "9× All-Star", "1933 Triple Crown"],
    stints: [
      {
        franchise: "OAK",
        displayTeam: "Philadelphia Athletics",
        startYear: 1925,
        endYear: 1935,
        jerseyNumber: 3,
        accolades: [
          { type: "champion", count: 2 },
          { type: "mvp", count: 2 },
          { type: "all_star", count: 3 },
          { type: "batting_title", count: 1 }, // 1933, .356 — Triple Crown year
        ],
        statLine: [
          { label: "G", value: 1256 },
          { label: "AVG", value: ".339" },
          { label: "HR", value: 302 },
          { label: "RBI", value: 1075 },
          { label: "SB", value: 48 },
        ],
      },
      {
        franchise: "BOS",
        displayTeam: "Boston Red Sox",
        startYear: 1936,
        endYear: 1942,
        jerseyNumber: 3,
        accolades: [
          { type: "mvp", count: 1 }, // 1938
          { type: "all_star", count: 6 },
          { type: "batting_title", count: 1 }, // 1938, .349
        ],
        statLine: [
          { label: "G", value: 887 },
          { label: "AVG", value: ".320" },
          { label: "HR", value: 222 },
          { label: "RBI", value: 788 },
          { label: "SB", value: 38 },
        ],
      },
      {
        // waived mid-1942, sat out 1943, briefly back in 1944 — one stint,
        // and the card back simply has no 1943 row
        franchise: "CHC",
        displayTeam: "Chicago Cubs",
        startYear: 1942,
        endYear: 1944,
        jerseyNumber: null, // number not reliably documented
        statLine: [
          { label: "G", value: 85 },
          { label: "AVG", value: ".191" },
          { label: "HR", value: 3 },
          { label: "RBI", value: 21 },
          { label: "SB", value: 1 },
        ],
      },
      {
        franchise: "PHI",
        displayTeam: "Philadelphia Phillies",
        startYear: 1945,
        endYear: 1945,
        jerseyNumber: null, // number not reliably documented
        statLine: [
          { label: "G", value: 89 },
          { label: "AVG", value: ".268" },
          { label: "HR", value: 7 },
          { label: "RBI", value: 38 },
          { label: "SB", value: 0 },
        ],
      },
    ],
    revealOrder: [3, 2, 1, 0],
    hints: {
      position: "1B",
      batsThrows: "R / R",
      height: "6'0\"",
      debutYear: "1925",
      born: "Sudlersville, Maryland",
    },
  },
  {
    // Puzzle 8 — Sam Jethroe: Negro League star to NL Rookie of the Year
    // at 33 — the oldest ROY ever. Opens on a one-game 1938 cup of coffee.
    id: 8,
    pathType: "team",
    answer: "Sam Jethroe",
    accolades: [
      "1950 NL Rookie of the Year",
      "2× NAL batting champion",
      "1945 Negro World Series champion",
      "2× NL stolen-base leader",
    ],
    stints: [
      {
        franchise: "IND",
        displayTeam: "Indianapolis ABCs",
        startYear: 1938,
        endYear: 1938,
        jerseyNumber: null,
        statLine: [
          { label: "G", value: 1 },
          { label: "AVG", value: ".333" },
          { label: "HR", value: 0 },
          { label: "RBI", value: 0 },
          { label: "SB", value: 0 },
        ],
      },
      {
        // 1942 in Cincinnati, Cleveland from 1943 — the Buckeyes moved with
        // him on the roster; one identity keeps it to one jersey
        franchise: "CLB",
        displayTeam: "Cleveland Buckeyes",
        startYear: 1942,
        endYear: 1948,
        jerseyNumber: null,
        accolades: [
          { type: "champion", count: 1 }, // 1945 Negro World Series, swept the Grays
          { type: "batting_title", count: 2 }, // 1944, 1945 NAL
        ],
        statLine: [
          { label: "G", value: 182 },
          { label: "AVG", value: ".315" },
          { label: "HR", value: 10 },
          { label: "RBI", value: 101 },
          { label: "SB", value: 37 },
        ],
      },
      {
        franchise: "ATL",
        displayTeam: "Boston Braves",
        startYear: 1950,
        endYear: 1952,
        jerseyNumber: 5,
        accolades: [{ type: "roy", count: 1 }],
        statLine: [
          { label: "G", value: 440 },
          { label: "AVG", value: ".261" },
          { label: "HR", value: 49 },
          { label: "RBI", value: 181 },
          { label: "SB", value: 98 },
        ],
      },
      {
        franchise: "PIT",
        displayTeam: "Pittsburgh Pirates",
        startYear: 1954,
        endYear: 1954,
        jerseyNumber: null, // number not reliably documented
        statLine: [
          { label: "G", value: 2 },
          { label: "AVG", value: ".000" },
          { label: "HR", value: 0 },
          { label: "RBI", value: 0 },
          { label: "SB", value: 0 },
        ],
      },
    ],
    revealOrder: [0, 3, 1, 2],
    hints: {
      position: "CF",
      batsThrows: "S / R",
      height: "6'1\"",
      debutYear: "1950",
      born: "Lowndes County, Mississippi",
    },
  },
  {
    // Puzzle 9 — Monte Irvin: a decade with the Eagles (Army years leave
    // the 1944 gap on the card back), the Giants' pennant runs, one final
    // Cubs season. Hall of Fame 1973.
    id: 9,
    pathType: "team",
    answer: "Monte Irvin",
    accolades: [
      "1954 World Series champion",
      "1946 Negro World Series champion",
      "1951 NL RBI leader",
      "All-Star (1952)",
    ],
    stints: [
      {
        franchise: "NWE",
        displayTeam: "Newark Eagles",
        startYear: 1938,
        endYear: 1948,
        jerseyNumber: null,
        accolades: [
          { type: "champion", count: 1 }, // 1946 Negro World Series — hit .462
          { type: "batting_title", count: 1 }, // 1941 NNL
        ],
        statLine: [
          { label: "G", value: 310 },
          { label: "AVG", value: ".336" },
          { label: "HR", value: 41 },
          { label: "RBI", value: 250 },
          { label: "SB", value: 26 },
        ],
      },
      {
        franchise: "SF",
        displayTeam: "New York Giants",
        startYear: 1949,
        endYear: 1955,
        jerseyNumber: 20, // retired by the Giants in 2010
        accolades: [
          { type: "champion", count: 1 },
          { type: "all_star", count: 1 },
        ],
        statLine: [
          { label: "G", value: 653 },
          { label: "AVG", value: ".296" },
          { label: "HR", value: 84 },
          { label: "RBI", value: 393 },
          { label: "SB", value: 27 },
        ],
      },
      {
        franchise: "CHC",
        displayTeam: "Chicago Cubs",
        startYear: 1956,
        endYear: 1956,
        jerseyNumber: null, // number not reliably documented
        statLine: [
          { label: "G", value: 111 },
          { label: "AVG", value: ".271" },
          { label: "HR", value: 15 },
          { label: "RBI", value: 50 },
          { label: "SB", value: 1 },
        ],
      },
    ],
    revealOrder: [2, 0, 1],
    hints: {
      position: "LF",
      batsThrows: "R / R",
      height: "6'1\"",
      debutYear: "1949",
      born: "Haleburg, Alabama",
    },
  },
];
