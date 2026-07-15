import type { Puzzle } from "../game/types";

/**
 * Phase-1 hand-written puzzle set. 5 real journeymen, 4+ franchises each.
 *
 * DATA PROVENANCE — verified 2026-07-15 against Basketball-Reference:
 * - Per-stint GP/MPG/PPG/RPG/APG computed from BR per-game season tables
 *   (partial-trade seasons use the per-team rows, GP-weighted).
 * - Jersey numbers verified per stint via BR team-season roster pages.
 * - Draft round/pick/college verified via BR player meta.
 * - Years are season START years (2016 = the 2016-17 season). Mid-season
 *   trades make two stints share a start year (e.g. traded Feb 2004 →
 *   old team ends 2003, new team starts 2003).
 *
 * revealOrder is hand-authored per brief §4: least identifying first,
 * draft-team stint last or second-to-last.
 */
export const puzzles: Puzzle[] = [
  {
    // Puzzle 1 — Shareef Abdur-Rahim: 4 franchises. #3 everywhere except
    // Portland, where he switched to #33. Vancouver colorway is the money
    // clue.
    id: 1,
    pathType: "team",
    answer: "Shareef Abdur-Rahim",
    accolades: ["1× All-Star (2002)"],
    stints: [
      {
        franchise: "MEM",
        displayTeam: "Vancouver Grizzlies",
        startYear: 1996,
        endYear: 2000,
        gp: 375,
        mpg: 38.0,
        ppg: 20.8,
        rpg: 8.2,
        apg: 2.9,
        jerseyNumber: 3,
      },
      {
        franchise: "ATL",
        displayTeam: "Atlanta Hawks",
        startYear: 2001,
        endYear: 2003, // traded to POR Feb 2004 (Rasheed Wallace deal)
        gp: 211,
        mpg: 38.0,
        ppg: 20.4,
        rpg: 8.8,
        apg: 2.9,
        jerseyNumber: 3,
        accolades: [{ type: "all_star", count: 1 }],
      },
      {
        franchise: "POR",
        displayTeam: "Portland Trail Blazers",
        startYear: 2003,
        endYear: 2004,
        gp: 86,
        mpg: 30.2,
        ppg: 14.3,
        rpg: 6.3,
        apg: 1.9,
        jerseyNumber: 33, // wore 33 in Portland (verified both seasons)
      },
      {
        franchise: "SAC",
        displayTeam: "Sacramento Kings",
        startYear: 2005,
        endYear: 2007, // 2007-08: 6 games, retired (knee)
        gp: 158,
        mpg: 25.5,
        ppg: 10.7,
        rpg: 4.9,
        apg: 1.7,
        jerseyNumber: 3,
      },
    ],
    revealOrder: [2, 3, 1, 0], // POR → SAC → ATL → VAN (draft team last)
    hints: {
      position: "PF/SF",
      height: "6'9\"",
      draftYear: "1996",
      draftPick: "Round 1, Pick 3",
      college: "California",
    },
  },
  {
    // Puzzle 2 — Zach Randolph: 5 franchises, #50 everywhere.
    // The 39-game Clippers stint is delightfully anonymous.
    id: 2,
    pathType: "team",
    answer: "Zach Randolph",
    accolades: ["2× All-Star", "All-NBA Third Team (2011)"],
    stints: [
      {
        franchise: "POR",
        displayTeam: "Portland Trail Blazers",
        startYear: 2001,
        endYear: 2006, // traded to NYK June 2007
        gp: 387,
        mpg: 28.9,
        ppg: 16.0,
        rpg: 7.7,
        apg: 1.5,
        jerseyNumber: 50,
      },
      {
        franchise: "NYK",
        displayTeam: "New York Knicks",
        startYear: 2007,
        endYear: 2008, // traded to LAC Nov 2008
        gp: 80,
        mpg: 32.9,
        ppg: 18.0,
        rpg: 10.6,
        apg: 1.9,
        jerseyNumber: 50,
      },
      {
        franchise: "LAC",
        displayTeam: "Los Angeles Clippers",
        startYear: 2008,
        endYear: 2008, // traded to MEM July 2009
        gp: 39,
        mpg: 35.1,
        ppg: 20.9,
        rpg: 9.4,
        apg: 2.3,
        jerseyNumber: 50,
      },
      {
        franchise: "MEM",
        displayTeam: "Memphis Grizzlies",
        startYear: 2009,
        endYear: 2016,
        gp: 551,
        mpg: 32.5,
        ppg: 16.8,
        rpg: 10.2,
        apg: 2.0,
        jerseyNumber: 50,
        accolades: [{ type: "all_star", count: 2 }],
      },
      {
        franchise: "SAC",
        displayTeam: "Sacramento Kings",
        startYear: 2017,
        endYear: 2017, // on 2018-19 roster but played 0 games
        gp: 59,
        mpg: 25.6,
        ppg: 14.5,
        rpg: 6.7,
        apg: 2.2,
        jerseyNumber: 50,
      },
    ],
    revealOrder: [2, 1, 4, 0, 3], // LAC → NYK → SAC → POR (draft) → MEM
    hints: {
      position: "PF/C",
      height: "6'9\"",
      draftYear: "2001",
      draftPick: "Round 1, Pick 19",
      college: "Michigan State",
    },
  },
  {
    // Puzzle 3 — Antawn Jamison: 6 franchises. Drafted by TOR, swapped on
    // draft night for Vince Carter.
    id: 3,
    pathType: "team",
    answer: "Antawn Jamison",
    accolades: ["2× All-Star", "6th Man of the Year (2004)"],
    stints: [
      {
        franchise: "GSW",
        displayTeam: "Golden State Warriors",
        startYear: 1998,
        endYear: 2002,
        gp: 336,
        mpg: 36.5,
        ppg: 20.2,
        rpg: 7.4,
        apg: 1.8,
        jerseyNumber: 33,
      },
      {
        franchise: "DAL",
        displayTeam: "Dallas Mavericks",
        startYear: 2003,
        endYear: 2003, // one season, 6th Man of the Year
        gp: 82,
        mpg: 29.0,
        ppg: 14.8,
        rpg: 6.3,
        apg: 0.9,
        jerseyNumber: 33,
        accolades: [{ type: "sixth_man", count: 1 }],
      },
      {
        franchise: "WAS",
        displayTeam: "Washington Wizards",
        startYear: 2004,
        endYear: 2009, // traded to CLE Feb 2010
        gp: 421,
        mpg: 38.7,
        ppg: 20.7,
        rpg: 8.9,
        apg: 1.8,
        jerseyNumber: 4,
        accolades: [{ type: "all_star", count: 2 }],
      },
      {
        franchise: "CLE",
        displayTeam: "Cleveland Cavaliers",
        startYear: 2009,
        endYear: 2011,
        gp: 146,
        mpg: 32.9,
        ppg: 17.3,
        rpg: 6.7,
        apg: 1.8,
        jerseyNumber: 4,
      },
      {
        franchise: "LAL",
        displayTeam: "Los Angeles Lakers",
        startYear: 2012,
        endYear: 2012,
        gp: 76,
        mpg: 21.5,
        ppg: 9.4,
        rpg: 4.8,
        apg: 0.7,
        jerseyNumber: 4,
      },
      {
        franchise: "LAC",
        displayTeam: "Los Angeles Clippers",
        startYear: 2013,
        endYear: 2013, // final season, deep-bench role
        gp: 22,
        mpg: 11.3,
        ppg: 3.8,
        rpg: 2.5,
        apg: 0.3,
        jerseyNumber: 33,
      },
    ],
    revealOrder: [5, 1, 4, 3, 0, 2], // LAC → DAL → LAL → CLE → GSW (draft) → WAS
    hints: {
      position: "PF/SF",
      height: "6'9\"",
      draftYear: "1998",
      draftPick: "Round 1, Pick 4",
      college: "North Carolina",
    },
  },
  {
    // Puzzle 4 — Lou Williams: 6 franchises / 7 stints (ATL twice).
    // Three-time 6th Man of the Year, never really a starter.
    id: 4,
    pathType: "team",
    answer: "Lou Williams",
    accolades: ["3× 6th Man of the Year"],
    stints: [
      {
        franchise: "PHI",
        displayTeam: "Philadelphia 76ers",
        startYear: 2005,
        endYear: 2011,
        gp: 455,
        mpg: 21.9,
        ppg: 11.3,
        rpg: 2.0,
        apg: 3.0,
        jerseyNumber: 23,
      },
      {
        franchise: "ATL",
        displayTeam: "Atlanta Hawks",
        startYear: 2012,
        endYear: 2013, // ACL tear Jan 2013
        gp: 99,
        mpg: 25.9,
        ppg: 11.9,
        rpg: 2.1,
        apg: 3.5,
        jerseyNumber: 3,
      },
      {
        franchise: "TOR",
        displayTeam: "Toronto Raptors",
        startYear: 2014,
        endYear: 2014, // 6th Man of the Year
        gp: 80,
        mpg: 25.2,
        ppg: 15.5,
        rpg: 1.9,
        apg: 2.1,
        jerseyNumber: 23,
        accolades: [{ type: "sixth_man", count: 1 }],
      },
      {
        franchise: "LAL",
        displayTeam: "Los Angeles Lakers",
        startYear: 2015,
        endYear: 2016, // traded to HOU Feb 2017
        gp: 125,
        mpg: 26.5,
        ppg: 16.8,
        rpg: 2.4,
        apg: 2.8,
        jerseyNumber: 23,
      },
      {
        franchise: "HOU",
        displayTeam: "Houston Rockets",
        startYear: 2016,
        endYear: 2016, // 23 games post-deadline, dealt to LAC that June
        gp: 23,
        mpg: 25.7,
        ppg: 14.9,
        rpg: 3.0,
        apg: 2.4,
        jerseyNumber: 12,
      },
      {
        franchise: "LAC",
        displayTeam: "Los Angeles Clippers",
        startYear: 2017,
        endYear: 2020, // traded to ATL Mar 2021; 6MOY 2018 & 2019
        gp: 261,
        mpg: 28.2,
        ppg: 19.1,
        rpg: 2.7,
        apg: 5.1,
        jerseyNumber: 23,
        accolades: [{ type: "sixth_man", count: 2 }],
      },
      {
        franchise: "ATL",
        displayTeam: "Atlanta Hawks",
        startYear: 2020,
        endYear: 2021,
        gp: 80,
        mpg: 16.3,
        ppg: 7.4,
        rpg: 1.8,
        apg: 2.4,
        jerseyNumber: 6,
      },
    ],
    revealOrder: [4, 6, 1, 2, 3, 0, 5], // HOU → ATL(2nd) → ATL(1st) → TOR → LAL → PHI (draft) → LAC
    hints: {
      position: "PG/SG",
      height: "6'2\"",
      draftYear: "2005",
      draftPick: "Round 2, Pick 45",
      college: "None — drafted out of South Gwinnett HS (GA)",
    },
  },
  {
    // Puzzle 5 — Marcus Camby: 6 franchises / 7 stints (NYK twice).
    // 2007 DPOY. Dino-era Raptors jersey opener... eventually.
    id: 5,
    pathType: "team",
    answer: "Marcus Camby",
    accolades: ["Defensive Player of the Year (2007)", "2× All-Defensive First Team"],
    stints: [
      {
        franchise: "TOR",
        displayTeam: "Toronto Raptors",
        startYear: 1996,
        endYear: 1997,
        gp: 126,
        mpg: 31.0,
        ppg: 13.5,
        rpg: 6.9,
        apg: 1.7,
        jerseyNumber: 21,
      },
      {
        franchise: "NYK",
        displayTeam: "New York Knicks",
        startYear: 1998,
        endYear: 2001, // '99 Finals run
        gp: 197,
        mpg: 28.6,
        ppg: 10.2,
        rpg: 8.9,
        apg: 0.7,
        jerseyNumber: 23,
      },
      {
        franchise: "DEN",
        displayTeam: "Denver Nuggets",
        startYear: 2002,
        endYear: 2007, // DPOY 2006-07
        gp: 372,
        mpg: 31.6,
        ppg: 10.1,
        rpg: 11.1,
        apg: 2.5,
        jerseyNumber: 23,
        accolades: [{ type: "dpoy", count: 1 }],
      },
      {
        franchise: "LAC",
        displayTeam: "Los Angeles Clippers",
        startYear: 2008,
        endYear: 2009, // traded to POR Feb 2010
        gp: 113,
        mpg: 31.1,
        ppg: 9.1,
        rpg: 11.6,
        apg: 2.5,
        jerseyNumber: 23,
      },
      {
        franchise: "POR",
        displayTeam: "Portland Trail Blazers",
        startYear: 2009,
        endYear: 2011, // traded to HOU Mar 2012
        gp: 122,
        mpg: 25.8,
        ppg: 4.8,
        rpg: 10.0,
        apg: 1.9,
        jerseyNumber: 23,
      },
      {
        franchise: "HOU",
        displayTeam: "Houston Rockets",
        startYear: 2011,
        endYear: 2011,
        gp: 19,
        mpg: 24.1,
        ppg: 7.1,
        rpg: 9.3,
        apg: 1.7,
        jerseyNumber: 29,
      },
      {
        franchise: "NYK",
        displayTeam: "New York Knicks",
        startYear: 2012,
        endYear: 2012, // final season, deep-bench role
        gp: 24,
        mpg: 10.4,
        ppg: 1.8,
        rpg: 3.3,
        apg: 0.6,
        jerseyNumber: 23,
      },
    ],
    revealOrder: [5, 4, 3, 6, 2, 0, 1], // HOU → POR → LAC → NYK(2nd) → DEN → TOR (draft) → NYK(1st)
    hints: {
      position: "C/PF",
      height: "6'11\"",
      draftYear: "1996",
      draftPick: "Round 1, Pick 2",
      college: "UMass",
    },
  },

  /* ==================================================================
     PUZZLES 6-9 — ARCHETYPE TEST SET (addendum §4.5 track coverage).
     Stats written from memory, NOT verified against Basketball-Reference
     like puzzles 1-5. For UX testing via ?p=6..9 — verify before any of
     these enter the real rotation.
  ================================================================== */
  {
    // Puzzle 6 — Vince Carter: mega-nomad, 8 stints. Stress-tests the grid.
    id: 6,
    pathType: "team",
    answer: "Vince Carter",
    accolades: ["8× All-Star", "Rookie of the Year (1999)", "2000 Dunk Contest champion"],
    stints: [
      { franchise: "TOR", displayTeam: "Toronto Raptors", startYear: 1998, endYear: 2004, gp: 403, mpg: 38.0, ppg: 23.4, rpg: 5.2, apg: 3.9, jerseyNumber: 15, accolades: [{ type: "roy", count: 1 }, { type: "all_star", count: 5 }] },
      { franchise: "BKN", displayTeam: "New Jersey Nets", startYear: 2004, endYear: 2008, gp: 374, mpg: 37.0, ppg: 23.6, rpg: 5.8, apg: 4.4, jerseyNumber: 15, accolades: [{ type: "all_star", count: 3 }] },
      { franchise: "ORL", displayTeam: "Orlando Magic", startYear: 2009, endYear: 2009, gp: 75, mpg: 30.8, ppg: 16.6, rpg: 3.9, apg: 3.1, jerseyNumber: 15 },
      { franchise: "PHX", displayTeam: "Phoenix Suns", startYear: 2010, endYear: 2010, gp: 51, mpg: 27.2, ppg: 13.5, rpg: 3.6, apg: 1.6, jerseyNumber: 25 },
      { franchise: "DAL", displayTeam: "Dallas Mavericks", startYear: 2011, endYear: 2013, gp: 243, mpg: 25.0, ppg: 11.8, rpg: 3.9, apg: 2.4, jerseyNumber: 25 },
      { franchise: "MEM", displayTeam: "Memphis Grizzlies", startYear: 2014, endYear: 2016, gp: 199, mpg: 17.0, ppg: 6.8, rpg: 2.4, apg: 1.4, jerseyNumber: 15 },
      { franchise: "SAC", displayTeam: "Sacramento Kings", startYear: 2017, endYear: 2017, gp: 58, mpg: 17.9, ppg: 5.4, rpg: 2.6, apg: 1.2, jerseyNumber: 15 },
      { franchise: "ATL", displayTeam: "Atlanta Hawks", startYear: 2018, endYear: 2019, gp: 136, mpg: 15.5, ppg: 6.3, rpg: 2.1, apg: 0.9, jerseyNumber: 15 },
    ],
    revealOrder: [3, 6, 5, 4, 7, 2, 1, 0], // PHX → SAC → MEM → DAL → ATL → ORL → NJN → TOR
    hints: {
      position: "SG/SF",
      height: "6'6\"",
      draftYear: "1998",
      draftPick: "Round 1, Pick 5",
      college: "North Carolina",
    },
  },
  {
    // Puzzle 7 — LeBron James: superstar, 3 franchises / 4 stints.
    // The "everyone can play" easy-day archetype.
    id: 7,
    pathType: "team",
    answer: "LeBron James",
    accolades: ["4× NBA champion", "4× MVP", "All-time scoring leader"],
    stints: [
      { franchise: "CLE", displayTeam: "Cleveland Cavaliers", startYear: 2003, endYear: 2009, gp: 548, mpg: 40.2, ppg: 27.8, rpg: 7.0, apg: 7.0, jerseyNumber: 23, accolades: [{ type: "roy", count: 1 }, { type: "mvp", count: 2 }, { type: "all_star", count: 6 }, { type: "olympic_gold", count: 1 }] },
      { franchise: "MIA", displayTeam: "Miami Heat", startYear: 2010, endYear: 2013, gp: 294, mpg: 38.0, ppg: 26.9, rpg: 7.6, apg: 6.7, jerseyNumber: 6, accolades: [{ type: "champion", count: 2 }, { type: "fmvp", count: 2 }, { type: "mvp", count: 2 }, { type: "all_star", count: 4 }, { type: "olympic_gold", count: 1 }] },
      { franchise: "CLE", displayTeam: "Cleveland Cavaliers", startYear: 2014, endYear: 2017, gp: 301, mpg: 37.6, ppg: 26.1, rpg: 7.5, apg: 7.6, jerseyNumber: 23, accolades: [{ type: "champion", count: 1 }, { type: "fmvp", count: 1 }, { type: "all_star", count: 4 }, { type: "all_nba", count: 4 }] },
      { franchise: "LAL", displayTeam: "Los Angeles Lakers", startYear: 2018, endYear: 2025, gp: 454, mpg: 35.3, ppg: 26.3, rpg: 7.8, apg: 8.1, jerseyNumber: 23, accolades: [{ type: "champion", count: 1 }, { type: "fmvp", count: 1 }, { type: "all_star", count: 7 }, { type: "olympic_gold", count: 1 }] },
    ],
    revealOrder: [1, 3, 2, 0], // MIA → LAL → CLE(2nd) → CLE(draft)
    hints: {
      position: "SF/PF",
      height: "6'9\"",
      draftYear: "2003",
      draftPick: "Round 1, Pick 1",
      college: "None — St. Vincent–St. Mary HS (OH)",
    },
  },
  {
    // Puzzle 8 — Manu Ginóbili: one-franchise lifer = ONE jersey (design
    // decision 2026-07: same team + same number never splits; only a
    // number change does, like Kobe below). The whole puzzle is a single
    // card + the profile ladder. Note the diacritic: the search index
    // (from BR) lists him as "Manu Ginóbili".
    id: 8,
    pathType: "team",
    answer: "Manu Ginóbili",
    accolades: ["4× NBA champion", "6th Man of the Year (2008)", "2× All-Star", "Olympic gold (2004)"],
    stints: [
      { franchise: "SAS", displayTeam: "San Antonio Spurs", startYear: 2002, endYear: 2017, gp: 1057, mpg: 25.4, ppg: 13.3, rpg: 3.5, apg: 3.8, jerseyNumber: 20, accolades: [{ type: "champion", count: 4 }, { type: "all_star", count: 2 }, { type: "sixth_man", count: 1 }, { type: "olympic_gold", count: 1 }] },
    ],
    revealOrder: [0],
    hints: {
      position: "SG",
      height: "6'6\"",
      draftYear: "1999",
      draftPick: "Round 2, Pick 57",
      college: "Argentina",
    },
  },
  {
    // Puzzle 9 — Kobe Bryant: Track B number-change, one franchise split
    // by jersey-number era (#8 → #24).
    id: 9,
    pathType: "number_era",
    answer: "Kobe Bryant",
    accolades: ["5× NBA champion", "MVP (2008)", "18× All-Star"],
    stints: [
      { franchise: "LAL", displayTeam: "Los Angeles Lakers", startYear: 1996, endYear: 2005, gp: 707, mpg: 36.0, ppg: 23.9, rpg: 5.1, apg: 4.5, jerseyNumber: 8, accolades: [{ type: "champion", count: 3 }, { type: "all_star", count: 8 }, { type: "all_nba", count: 2 }] },
      { franchise: "LAL", displayTeam: "Los Angeles Lakers", startYear: 2006, endYear: 2015, gp: 639, mpg: 36.1, ppg: 26.4, rpg: 5.5, apg: 4.9, jerseyNumber: 24, accolades: [{ type: "champion", count: 2 }, { type: "fmvp", count: 2 }, { type: "mvp", count: 1 }, { type: "all_star", count: 10 }, { type: "all_nba", count: 6 }, { type: "olympic_gold", count: 2 }] },
    ],
    revealOrder: [1, 0], // #24 era → #8 era (draft era last)
    hints: {
      position: "SG",
      height: "6'6\"",
      draftYear: "1996",
      draftPick: "Round 1, Pick 13",
      college: "None — Lower Merion HS (PA)",
    },
  },
];
