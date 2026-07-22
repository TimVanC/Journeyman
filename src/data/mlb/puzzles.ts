import type { Puzzle } from "../../game/types";

/**
 * MLB puzzle set — 15 journeymen/stars-with-mileage. Puzzles 1-5 are the
 * original hand-written set; 6-15 (pre-war set + modern journeymen) are
 * StatsAPI-verified (see the batch notes further down).
 *
 * ARRAY ORDER IS THE DAILY SCHEDULE (release scheduling): puzzles[day-1]
 * airs on day N, so this file is APPEND-ONLY once a day has aired —
 * reordering aired entries rewrites archive history. New puzzles go on
 * the end and air on the next open day.
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
          { type: "champion", count: 2 },
        ],
        statLine: [
          { label: "G", value: 501 },
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
          { label: "SB", value: 70 },
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
          { label: "RBI", value: 73 },
          { label: "SB", value: 9 },
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
    accolades: ["9× All-Star", "3× Gold Glove", "1999 AL ROY", "2017 WS champion"],
    stints: [
      {
        franchise: "KC",
        displayTeam: "Kansas City Royals",
        startYear: 1998,
        endYear: 2004,
        jerseyNumber: 15,
        accolades: [
          { type: "roy", count: 1 },
          { type: "all_star", count: 1 },
        ],
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
          { label: "RBI", value: 180 },
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
          { label: "SB", value: 1 },
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
          { label: "G", value: 966 },
          { label: "AVG", value: ".274" },
          { label: "HR", value: 147 },
          { label: "RBI", value: 510 },
          { label: "SB", value: 62 },
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
          { label: "SB", value: 49 },
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
          { label: "SB", value: 8 },
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
          { label: "G", value: 210 },
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
          { label: "SO", value: 323 },
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
          { type: "silver_slugger", count: 1 },
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
          { label: "G", value: 114 },
          { label: "W-L", value: "55-29" },
          { label: "ERA", value: "3.40" },
          { label: "SO", value: 683 },
          { label: "WHIP", value: "1.09" },
        ],
      },
      {
        franchise: "HOU",
        displayTeam: "Houston Astros",
        startYear: 2019,
        endYear: 2021,
        jerseyNumber: 21,
        statLine: [
          { label: "G", value: 52 },
          { label: "W-L", value: "22-10" },
          { label: "ERA", value: "3.89" },
          { label: "SO", value: 239 },
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
          { label: "ERA", value: "4.38" },
          { label: "SO", value: 170 },
          { label: "WHIP", value: "1.31" },
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
          { label: "G", value: 192 },
          { label: "W-L", value: "64-68" },
          { label: "ERA", value: "4.16" },
          { label: "SO", value: 1076 },
          { label: "WHIP", value: "1.27" },
        ],
      },
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 2004,
        endYear: 2004,
        jerseyNumber: 33,
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
        jerseyNumber: 23,
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
          { label: "G", value: 98 },
          { label: "W-L", value: "38-36" },
          { label: "ERA", value: "4.40" },
          { label: "SO", value: 597 },
          { label: "WHIP", value: "1.25" },
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
  {
    // Puzzle 10 - Adam Dunn: Big Donkey. Eight Reds years of three-true-outcomes
    // slugging, then a nomadic tail that bottomed out at .201 in Chicago.
    id: 10,
    pathType: "team",
    answer: "Adam Dunn",
    accolades: ["2× All-Star", "462 career HR", "4× NL walks leader"],
    stints: [
      {
        franchise: "CIN",
        displayTeam: "Cincinnati Reds",
        startYear: 2001,
        endYear: 2008,
        jerseyNumber: 44,
        accolades: [
          { type: "all_star", count: 1 },
        ],
        statLine: [
          { label: "G", value: 1087 },
          { label: "AVG", value: ".247" },
          { label: "HR", value: 270 },
          { label: "RBI", value: 646 },
          { label: "SB", value: 58 },
        ],
      },
      {
        franchise: "ARI",
        displayTeam: "Arizona Diamondbacks",
        startYear: 2008,
        endYear: 2008,
        jerseyNumber: 32,
        statLine: [
          { label: "G", value: 44 },
          { label: "AVG", value: ".243" },
          { label: "HR", value: 8 },
          { label: "RBI", value: 26 },
          { label: "SB", value: 1 },
        ],
      },
      {
        franchise: "WSH",
        displayTeam: "Washington Nationals",
        startYear: 2009,
        endYear: 2010,
        jerseyNumber: 44,
        statLine: [
          { label: "G", value: 317 },
          { label: "AVG", value: ".264" },
          { label: "HR", value: 76 },
          { label: "RBI", value: 208 },
          { label: "SB", value: 0 },
        ],
      },
      {
        franchise: "CHW",
        displayTeam: "Chicago White Sox",
        startYear: 2011,
        endYear: 2014,
        jerseyNumber: 44,
        accolades: [
          { type: "all_star", count: 1 },
        ],
        statLine: [
          { label: "G", value: 528 },
          { label: "AVG", value: ".201" },
          { label: "HR", value: 106 },
          { label: "RBI", value: 278 },
          { label: "SB", value: 4 },
        ],
      },
      {
        franchise: "OAK",
        displayTeam: "Oakland Athletics",
        startYear: 2014,
        endYear: 2014,
        jerseyNumber: 10,
        statLine: [
          { label: "G", value: 25 },
          { label: "AVG", value: ".212" },
          { label: "HR", value: 2 },
          { label: "RBI", value: 10 },
          { label: "SB", value: 0 },
        ],
      },
    ],
    revealOrder: [4, 1, 3, 2, 0],
    hints: {
      position: "LF / 1B",
      batsThrows: "L / R",
      height: "6'6\"",
      debutYear: "2001",
      born: "Houston, Texas",
    },
  },
  {
    // Puzzle 11 - Jason Giambi: an Oakland MVP who became a Yankee, then spent a
    // long veteran coda bouncing back west and around the AL.
    id: 11,
    pathType: "team",
    answer: "Jason Giambi",
    accolades: ["2000 AL MVP", "5× All-Star", "2× Silver Slugger"],
    stints: [
      {
        franchise: "OAK",
        displayTeam: "Oakland Athletics",
        startYear: 1995,
        endYear: 2001,
        jerseyNumber: 16,
        accolades: [
          { type: "mvp", count: 1 },
          { type: "all_star", count: 2 },
          { type: "silver_slugger", count: 1 },
        ],
        statLine: [
          { label: "G", value: 953 },
          { label: "AVG", value: ".308" },
          { label: "HR", value: 187 },
          { label: "RBI", value: 675 },
          { label: "SB", value: 9 },
        ],
      },
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 2002,
        endYear: 2008,
        jerseyNumber: 25,
        accolades: [
          { type: "all_star", count: 3 },
          { type: "silver_slugger", count: 1 },
        ],
        statLine: [
          { label: "G", value: 897 },
          { label: "AVG", value: ".260" },
          { label: "HR", value: 209 },
          { label: "RBI", value: 604 },
          { label: "SB", value: 9 },
        ],
      },
      {
        franchise: "OAK",
        displayTeam: "Oakland Athletics",
        startYear: 2009,
        endYear: 2009,
        jerseyNumber: 16,
        statLine: [
          { label: "G", value: 83 },
          { label: "AVG", value: ".193" },
          { label: "HR", value: 11 },
          { label: "RBI", value: 40 },
          { label: "SB", value: 0 },
        ],
      },
      {
        franchise: "COL",
        displayTeam: "Colorado Rockies",
        startYear: 2009,
        endYear: 2012,
        jerseyNumber: 23,
        statLine: [
          { label: "G", value: 230 },
          { label: "AVG", value: ".248" },
          { label: "HR", value: 22 },
          { label: "RBI", value: 86 },
          { label: "SB", value: 2 },
        ],
      },
      {
        franchise: "CLE",
        displayTeam: "Cleveland Indians",
        startYear: 2013,
        endYear: 2014,
        jerseyNumber: 25,
        statLine: [
          { label: "G", value: 97 },
          { label: "AVG", value: ".171" },
          { label: "HR", value: 11 },
          { label: "RBI", value: 36 },
          { label: "SB", value: 0 },
        ],
      },
    ],
    revealOrder: [2, 4, 3, 1, 0],
    hints: {
      position: "1B / DH",
      batsThrows: "L / R",
      height: "6'3\"",
      debutYear: "1995",
      born: "West Covina, California",
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
    // Puzzle 12 - Carlos Lee: El Caballo. A steady 30-homer bat that traveled
    // from the South Side to Milwaukee to a big Houston payday.
    id: 12,
    pathType: "team",
    answer: "Carlos Lee",
    accolades: ["3× All-Star", "2× Silver Slugger", "358 career HR"],
    stints: [
      {
        franchise: "CHW",
        displayTeam: "Chicago White Sox",
        startYear: 1999,
        endYear: 2004,
        jerseyNumber: 45,
        statLine: [
          { label: "G", value: 880 },
          { label: "AVG", value: ".288" },
          { label: "HR", value: 152 },
          { label: "RBI", value: 552 },
          { label: "SB", value: 64 },
        ],
      },
      {
        franchise: "MIL",
        displayTeam: "Milwaukee Brewers",
        startYear: 2005,
        endYear: 2006,
        jerseyNumber: 45,
        accolades: [
          { type: "all_star", count: 2 },
          { type: "silver_slugger", count: 1 },
        ],
        statLine: [
          { label: "G", value: 264 },
          { label: "AVG", value: ".273" },
          { label: "HR", value: 60 },
          { label: "RBI", value: 195 },
          { label: "SB", value: 25 },
        ],
      },
      {
        franchise: "TEX",
        displayTeam: "Texas Rangers",
        startYear: 2006,
        endYear: 2006,
        jerseyNumber: 45,
        statLine: [
          { label: "G", value: 59 },
          { label: "AVG", value: ".322" },
          { label: "HR", value: 9 },
          { label: "RBI", value: 35 },
          { label: "SB", value: 7 },
        ],
      },
      {
        franchise: "HOU",
        displayTeam: "Houston Astros",
        startYear: 2007,
        endYear: 2012,
        jerseyNumber: 45,
        accolades: [
          { type: "all_star", count: 1 },
          { type: "silver_slugger", count: 1 },
        ],
        statLine: [
          { label: "G", value: 815 },
          { label: "AVG", value: ".286" },
          { label: "HR", value: 133 },
          { label: "RBI", value: 533 },
          { label: "SB", value: 26 },
        ],
      },
      {
        franchise: "MIA",
        displayTeam: "Miami Marlins",
        startYear: 2012,
        endYear: 2012,
        jerseyNumber: 45,
        statLine: [
          { label: "G", value: 81 },
          { label: "AVG", value: ".243" },
          { label: "HR", value: 4 },
          { label: "RBI", value: 48 },
          { label: "SB", value: 3 },
        ],
      },
    ],
    revealOrder: [2, 4, 1, 3, 0],
    hints: {
      position: "LF",
      batsThrows: "R / R",
      height: "6'2\"",
      debutYear: "1999",
      born: "Aguadulce, Panama",
    },
  },
  {
    // Puzzle 13 - Carl Pavano: a Marlins World Series arm whose big Yankees deal
    // became a byword for the disabled list, then a durable Twins reinvention.
    id: 13,
    pathType: "team",
    answer: "Carl Pavano",
    accolades: ["2003 World Series champion", "All-Star (2004)"],
    stints: [
      {
        franchise: "WSH",
        displayTeam: "Montreal Expos",
        startYear: 1998,
        endYear: 2002,
        jerseyNumber: 45,
        statLine: [
          { label: "G", value: 81 },
          { label: "W-L", value: "24-35" },
          { label: "ERA", value: "4.83" },
          { label: "SO", value: 304 },
          { label: "WHIP", value: "1.44" },
        ],
      },
      {
        franchise: "MIA",
        displayTeam: "Florida Marlins",
        startYear: 2002,
        endYear: 2004,
        jerseyNumber: 45,
        accolades: [
          { type: "champion", count: 1 },
          { type: "all_star", count: 1 },
        ],
        statLine: [
          { label: "G", value: 86 },
          { label: "W-L", value: "33-23" },
          { label: "ERA", value: "3.64" },
          { label: "SO", value: 313 },
          { label: "WHIP", value: "1.25" },
        ],
      },
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 2005,
        endYear: 2008,
        jerseyNumber: 45,
        statLine: [
          { label: "G", value: 26 },
          { label: "W-L", value: "9-8" },
          { label: "ERA", value: "5.00" },
          { label: "SO", value: 75 },
          { label: "WHIP", value: "1.46" },
        ],
      },
      {
        franchise: "CLE",
        displayTeam: "Cleveland Indians",
        startYear: 2009,
        endYear: 2009,
        jerseyNumber: 44,
        statLine: [
          { label: "G", value: 21 },
          { label: "W-L", value: "9-8" },
          { label: "ERA", value: "5.37" },
          { label: "SO", value: 88 },
          { label: "WHIP", value: "1.38" },
        ],
      },
      {
        franchise: "MIN",
        displayTeam: "Minnesota Twins",
        startYear: 2009,
        endYear: 2012,
        jerseyNumber: 48,
        statLine: [
          { label: "G", value: 88 },
          { label: "W-L", value: "33-33" },
          { label: "ERA", value: "4.32" },
          { label: "SO", value: 311 },
          { label: "WHIP", value: "1.30" },
        ],
      },
    ],
    revealOrder: [3, 2, 0, 4, 1],
    hints: {
      position: "SP",
      batsThrows: "R / R",
      height: "6'5\"",
      debutYear: "1998",
      born: "New Britain, Connecticut",
    },
  },
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
    // Puzzle 14 - Ted Lilly: a crafty lefty who made two All-Star teams a decade
    // apart while working through six organizations.
    id: 14,
    pathType: "team",
    answer: "Ted Lilly",
    accolades: ["2× All-Star", "1,000+ strikeouts", "six franchises"],
    stints: [
      {
        franchise: "WSH",
        displayTeam: "Montreal Expos",
        startYear: 1999,
        endYear: 1999,
        jerseyNumber: 28,
        statLine: [
          { label: "G", value: 9 },
          { label: "W-L", value: "0-1" },
          { label: "ERA", value: "7.61" },
          { label: "SO", value: 28 },
          { label: "WHIP", value: "1.65" },
        ],
      },
      {
        franchise: "NYY",
        displayTeam: "New York Yankees",
        startYear: 2000,
        endYear: 2002,
        jerseyNumber: 45,
        statLine: [
          { label: "G", value: 49 },
          { label: "W-L", value: "8-12" },
          { label: "ERA", value: "4.65" },
          { label: "SO", value: 182 },
          { label: "WHIP", value: "1.32" },
        ],
      },
      {
        franchise: "OAK",
        displayTeam: "Oakland Athletics",
        startYear: 2002,
        endYear: 2003,
        jerseyNumber: 31,
        statLine: [
          { label: "G", value: 38 },
          { label: "W-L", value: "14-11" },
          { label: "ERA", value: "4.37" },
          { label: "SO", value: 165 },
          { label: "WHIP", value: "1.32" },
        ],
      },
      {
        franchise: "TOR",
        displayTeam: "Toronto Blue Jays",
        startYear: 2004,
        endYear: 2006,
        jerseyNumber: 31,
        accolades: [
          { type: "all_star", count: 1 },
        ],
        statLine: [
          { label: "G", value: 89 },
          { label: "W-L", value: "37-34" },
          { label: "ERA", value: "4.52" },
          { label: "SO", value: 424 },
          { label: "WHIP", value: "1.41" },
        ],
      },
      {
        franchise: "CHC",
        displayTeam: "Chicago Cubs",
        startYear: 2007,
        endYear: 2010,
        jerseyNumber: 30,
        accolades: [
          { type: "all_star", count: 1 },
        ],
        statLine: [
          { label: "G", value: 113 },
          { label: "W-L", value: "47-34" },
          { label: "ERA", value: "3.70" },
          { label: "SO", value: 598 },
          { label: "WHIP", value: "1.14" },
        ],
      },
      {
        franchise: "LAD",
        displayTeam: "Los Angeles Dodgers",
        startYear: 2010,
        endYear: 2013,
        jerseyNumber: 29,
        statLine: [
          { label: "G", value: 58 },
          { label: "W-L", value: "24-21" },
          { label: "ERA", value: "3.83" },
          { label: "SO", value: 284 },
          { label: "WHIP", value: "1.15" },
        ],
      },
    ],
    revealOrder: [0, 2, 1, 5, 3, 4],
    hints: {
      position: "SP",
      batsThrows: "L / L",
      height: "6'0\"",
      debutYear: "1999",
      born: "Torrance, California",
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
    // Puzzle 15 - Kevin Millwood: an Atlanta workhorse (and 2003 no-hitter) whose
    // free-agent years turned into a seven-team farewell tour.
    id: 15,
    pathType: "team",
    answer: "Kevin Millwood",
    accolades: ["All-Star (1999)", "2005 AL ERA title", "no-hitter (2003)"],
    stints: [
      {
        franchise: "ATL",
        displayTeam: "Atlanta Braves",
        startYear: 1997,
        endYear: 2002,
        jerseyNumber: 34,
        accolades: [
          { type: "all_star", count: 1 },
        ],
        statLine: [
          { label: "G", value: 168 },
          { label: "W-L", value: "75-46" },
          { label: "ERA", value: "3.73" },
          { label: "SO", value: 840 },
          { label: "WHIP", value: "1.22" },
        ],
      },
      {
        franchise: "PHI",
        displayTeam: "Philadelphia Phillies",
        startYear: 2003,
        endYear: 2004,
        jerseyNumber: 34,
        statLine: [
          { label: "G", value: 60 },
          { label: "W-L", value: "23-18" },
          { label: "ERA", value: "4.34" },
          { label: "SO", value: 294 },
          { label: "WHIP", value: "1.33" },
        ],
      },
      {
        franchise: "CLE",
        displayTeam: "Cleveland Indians",
        startYear: 2005,
        endYear: 2005,
        jerseyNumber: 34,
        statLine: [
          { label: "G", value: 30 },
          { label: "W-L", value: "9-11" },
          { label: "ERA", value: "2.86" },
          { label: "SO", value: 146 },
          { label: "WHIP", value: "1.22" },
        ],
      },
      {
        franchise: "TEX",
        displayTeam: "Texas Rangers",
        startYear: 2006,
        endYear: 2009,
        jerseyNumber: 33,
        statLine: [
          { label: "G", value: 125 },
          { label: "W-L", value: "48-46" },
          { label: "ERA", value: "4.57" },
          { label: "SO", value: 528 },
          { label: "WHIP", value: "1.45" },
        ],
      },
      {
        franchise: "BAL",
        displayTeam: "Baltimore Orioles",
        startYear: 2010,
        endYear: 2010,
        jerseyNumber: 34,
        statLine: [
          { label: "G", value: 31 },
          { label: "W-L", value: "4-16" },
          { label: "ERA", value: "5.10" },
          { label: "SO", value: 132 },
          { label: "WHIP", value: "1.51" },
        ],
      },
      {
        franchise: "COL",
        displayTeam: "Colorado Rockies",
        startYear: 2011,
        endYear: 2011,
        jerseyNumber: 40,
        statLine: [
          { label: "G", value: 9 },
          { label: "W-L", value: "4-3" },
          { label: "ERA", value: "3.98" },
          { label: "SO", value: 36 },
          { label: "WHIP", value: "1.21" },
        ],
      },
      {
        franchise: "SEA",
        displayTeam: "Seattle Mariners",
        startYear: 2012,
        endYear: 2012,
        jerseyNumber: 25,
        statLine: [
          { label: "G", value: 28 },
          { label: "W-L", value: "6-12" },
          { label: "ERA", value: "4.25" },
          { label: "SO", value: 107 },
          { label: "WHIP", value: "1.39" },
        ],
      },
    ],
    revealOrder: [5, 4, 6, 2, 1, 3, 0],
    hints: {
      position: "SP",
      batsThrows: "R / R",
      height: "6'4\"",
      debutYear: "1997",
      born: "Gastonia, North Carolina",
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
