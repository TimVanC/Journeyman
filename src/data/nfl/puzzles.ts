import type { Puzzle } from "../../game/types";

/**
 * NFL Phase-1 hand-written puzzle set. 5 real journeymen/stars-with-mileage,
 * QB + skill positions only (QB/RB/WR/TE — per product direction the stat
 * line is position-shaped, so position is effectively telegraphed; that's
 * accepted and the Position hint stays first on the ladder).
 *
 * ARRAY ORDER IS THE DAILY SCHEDULE (release scheduling): puzzles[day-1]
 * airs on day N, so this file is APPEND-ONLY once a day has aired —
 * reordering aired entries rewrites archive history. New puzzles go on
 * the end and air on the next open day.
 *
 * DATA PROVENANCE — generated from general knowledge (2026-07-19).
 * Stint years, jersey numbers, and stat lines are best-effort recall and
 * MUST be verified against Pro-Football-Reference before launch:
 * per-stint totals from PFR season tables, numbers via team roster pages.
 * Years are SEASON years (2010 = the 2010 season). Mid-season moves make
 * two stints share a year (Moss 2010: NE → MIN → TEN).
 *
 * Stat cells are position-shaped, 5 per card (3 top, 2 bottom):
 *   QB: GP · Cmp% · Pass Yds | TD · INT
 *   RB: GP · Att · Rush Yds | YPC · TD
 *   WR/TE: GP · Rec · Rec Yds | Y/R · TD
 *
 * revealOrder: least identifying first, draft-team stint last or
 * second-to-last (brief §4).
 */
export const nflPuzzles: Puzzle[] = [
  {
    // Puzzle 1 — Ryan Fitzpatrick: NINE franchises, the archetype NFL
    // journeyman. Harvard is the money hint of money hints.
    id: 1,
    pathType: "team",
    answer: "Ryan Fitzpatrick",
    stints: [
      {
        franchise: "LAR",
        displayTeam: "St. Louis Rams",
        startYear: 2005,
        endYear: 2006,
        jerseyNumber: 12,
        statLine: [
          { label: "GP", value: 5 },
          { label: "Cmp%", value: "56.3" },
          { label: "Yds", value: 777 },
          { label: "TD", value: 4 },
          { label: "INT", value: 8 },
        ],
      },
      {
        franchise: "CIN",
        displayTeam: "Cincinnati Bengals",
        startYear: 2007,
        endYear: 2008,
        jerseyNumber: 12,
        statLine: [
          { label: "GP", value: 16 },
          { label: "Cmp%", value: "59.4" },
          { label: "Yds", value: 1943 },
          { label: "TD", value: 8 },
          { label: "INT", value: 9 },
        ],
      },
      {
        franchise: "BUF",
        displayTeam: "Buffalo Bills",
        startYear: 2009,
        endYear: 2012,
        jerseyNumber: 14,
        statLine: [
          { label: "GP", value: 57 },
          { label: "Cmp%", value: "60.2" },
          { label: "Yds", value: 11654 },
          { label: "TD", value: 80 },
          { label: "INT", value: 64 },
        ],
      },
      {
        franchise: "TEN",
        displayTeam: "Tennessee Titans",
        startYear: 2013,
        endYear: 2013,
        jerseyNumber: 4,
        statLine: [
          { label: "GP", value: 11 },
          { label: "Cmp%", value: "62.0" },
          { label: "Yds", value: 2454 },
          { label: "TD", value: 14 },
          { label: "INT", value: 12 },
        ],
      },
      {
        franchise: "HOU",
        displayTeam: "Houston Texans",
        startYear: 2014,
        endYear: 2014,
        jerseyNumber: 14,
        statLine: [
          { label: "GP", value: 12 },
          { label: "Cmp%", value: "63.1" },
          { label: "Yds", value: 2483 },
          { label: "TD", value: 17 },
          { label: "INT", value: 8 },
        ],
      },
      {
        franchise: "NYJ",
        displayTeam: "New York Jets",
        startYear: 2015,
        endYear: 2016,
        jerseyNumber: 14,
        statLine: [
          { label: "GP", value: 30 },
          { label: "Cmp%", value: "58.1" },
          { label: "Yds", value: 6615 },
          { label: "TD", value: 43 },
          { label: "INT", value: 32 },
        ],
      },
      {
        franchise: "TB",
        displayTeam: "Tampa Bay Buccaneers",
        startYear: 2017,
        endYear: 2018,
        jerseyNumber: 14,
        statLine: [
          { label: "GP", value: 15 },
          { label: "Cmp%", value: "64.6" },
          { label: "Yds", value: 3469 },
          { label: "TD", value: 24 },
          { label: "INT", value: 15 },
        ],
      },
      {
        franchise: "MIA",
        displayTeam: "Miami Dolphins",
        startYear: 2019,
        endYear: 2020,
        jerseyNumber: 14,
        statLine: [
          { label: "GP", value: 24 },
          { label: "Cmp%", value: "65.8" },
          { label: "Yds", value: 5620 },
          { label: "TD", value: 33 },
          { label: "INT", value: 21 },
        ],
      },
      {
        franchise: "WAS",
        displayTeam: "Washington Football Team",
        startYear: 2021,
        endYear: 2021,
        jerseyNumber: 14,
        statLine: [
          { label: "GP", value: 1 },
          { label: "Cmp%", value: "50.0" },
          { label: "Yds", value: 166 },
          { label: "TD", value: 0 },
          { label: "INT", value: 0 },
        ],
      },
    ],
    // TEN and HOU one-offs first (a generic bridge QB), the FitzMagic
    // years late, Buffalo (his longest, most-remembered run) as the
    // closer with the draft-team Rams stint just before it
    revealOrder: [3, 4, 1, 8, 6, 5, 7, 0, 2],
    hints: {
      position: "QB",
      height: "6'2\"",
      draftYear: "2005",
      draftPick: "Round 7, #250",
      college: "Harvard",
    },
  },
  {
    // Puzzle 2 — Randy Moss: star with mileage. The 2010 odyssey
    // (NE → MIN → TEN in one season) makes three one-card stints.
    id: 2,
    pathType: "team",
    answer: "Randy Moss",
    accolades: ["6× Pro Bowl", "4× First-Team All-Pro", "1998 Off. ROY", "Hall of Fame (2018)"],
    stints: [
      {
        franchise: "MIN",
        displayTeam: "Minnesota Vikings",
        startYear: 1998,
        endYear: 2004,
        jerseyNumber: 84,
        accolades: [
          { type: "pro_bowl", count: 5 },
          { type: "all_pro", count: 3 },
          { type: "roy", count: 1 },
        ],
        statLine: [
          { label: "GP", value: 109 },
          { label: "Rec", value: 574 },
          { label: "Yds", value: 9142 },
          { label: "Y/R", value: "15.9" },
          { label: "TD", value: 90 },
        ],
      },
      {
        franchise: "LV",
        displayTeam: "Oakland Raiders",
        startYear: 2005,
        endYear: 2006,
        jerseyNumber: 18,
        statLine: [
          { label: "GP", value: 29 },
          { label: "Rec", value: 102 },
          { label: "Yds", value: 1558 },
          { label: "Y/R", value: "15.3" },
          { label: "TD", value: 11 },
        ],
      },
      {
        franchise: "NE",
        displayTeam: "New England Patriots",
        startYear: 2007,
        endYear: 2010,
        jerseyNumber: 81,
        accolades: [
          { type: "pro_bowl", count: 1 },
          { type: "all_pro", count: 1 },
        ],
        statLine: [
          { label: "GP", value: 52 },
          { label: "Rec", value: 259 },
          { label: "Yds", value: 3904 },
          { label: "Y/R", value: "15.1" },
          { label: "TD", value: 50 },
        ],
      },
      {
        franchise: "MIN",
        displayTeam: "Minnesota Vikings",
        startYear: 2010,
        endYear: 2010,
        jerseyNumber: 84,
        statLine: [
          { label: "GP", value: 4 },
          { label: "Rec", value: 13 },
          { label: "Yds", value: 174 },
          { label: "Y/R", value: "13.4" },
          { label: "TD", value: 2 },
        ],
      },
      {
        franchise: "TEN",
        displayTeam: "Tennessee Titans",
        startYear: 2010,
        endYear: 2010,
        jerseyNumber: 84,
        statLine: [
          { label: "GP", value: 8 },
          { label: "Rec", value: 6 },
          { label: "Yds", value: 80 },
          { label: "Y/R", value: "13.3" },
          { label: "TD", value: 0 },
        ],
      },
      {
        franchise: "SF",
        displayTeam: "San Francisco 49ers",
        startYear: 2012,
        endYear: 2012,
        jerseyNumber: 84,
        statLine: [
          { label: "GP", value: 16 },
          { label: "Rec", value: 28 },
          { label: "Yds", value: 434 },
          { label: "Y/R", value: "15.5" },
          { label: "TD", value: 3 },
        ],
      },
    ],
    // the forgettable 2010 pit stops and the SF coda first; the two
    // legendary runs (NE record season, MIN draft team) close it out
    revealOrder: [4, 5, 3, 1, 2, 0],
    hints: {
      position: "WR",
      height: "6'4\"",
      draftYear: "1998",
      draftPick: "Round 1, #21",
      college: "Marshall",
    },
  },
  {
    // Puzzle 3 — Terrell Owens: five stops, all of them loud.
    id: 3,
    pathType: "team",
    answer: "Terrell Owens",
    accolades: ["6× Pro Bowl", "5× First-Team All-Pro", "Hall of Fame (2018)"],
    stints: [
      {
        franchise: "SF",
        displayTeam: "San Francisco 49ers",
        startYear: 1996,
        endYear: 2003,
        jerseyNumber: 81,
        accolades: [
          { type: "pro_bowl", count: 4 },
          { type: "all_pro", count: 3 },
        ],
        statLine: [
          { label: "GP", value: 121 },
          { label: "Rec", value: 592 },
          { label: "Yds", value: 8572 },
          { label: "Y/R", value: "14.5" },
          { label: "TD", value: 81 },
        ],
      },
      {
        franchise: "PHI",
        displayTeam: "Philadelphia Eagles",
        startYear: 2004,
        endYear: 2005,
        jerseyNumber: 81,
        accolades: [
          { type: "pro_bowl", count: 1 },
          { type: "all_pro", count: 1 },
        ],
        statLine: [
          { label: "GP", value: 21 },
          { label: "Rec", value: 124 },
          { label: "Yds", value: 1963 },
          { label: "Y/R", value: "15.8" },
          { label: "TD", value: 20 },
        ],
      },
      {
        franchise: "DAL",
        displayTeam: "Dallas Cowboys",
        startYear: 2006,
        endYear: 2008,
        jerseyNumber: 81,
        accolades: [
          { type: "pro_bowl", count: 1 },
          { type: "all_pro", count: 1 },
        ],
        statLine: [
          { label: "GP", value: 47 },
          { label: "Rec", value: 235 },
          { label: "Yds", value: 3587 },
          { label: "Y/R", value: "15.3" },
          { label: "TD", value: 38 },
        ],
      },
      {
        franchise: "BUF",
        displayTeam: "Buffalo Bills",
        startYear: 2009,
        endYear: 2009,
        jerseyNumber: 81,
        statLine: [
          { label: "GP", value: 16 },
          { label: "Rec", value: 55 },
          { label: "Yds", value: 829 },
          { label: "Y/R", value: "15.1" },
          { label: "TD", value: 5 },
        ],
      },
      {
        franchise: "CIN",
        displayTeam: "Cincinnati Bengals",
        startYear: 2010,
        endYear: 2010,
        jerseyNumber: 81,
        statLine: [
          { label: "GP", value: 14 },
          { label: "Rec", value: 72 },
          { label: "Yds", value: 983 },
          { label: "Y/R", value: "13.7" },
          { label: "TD", value: 9 },
        ],
      },
    ],
    revealOrder: [3, 4, 1, 2, 0],
    hints: {
      position: "WR",
      height: "6'3\"",
      draftYear: "1996",
      draftPick: "Round 3, #89",
      college: "Chattanooga",
    },
  },
  {
    // Puzzle 4 — Frank Gore: a decade of 49ers work, then four AFC East-ish
    // farewell tours. Inconceivable durability.
    id: 4,
    pathType: "team",
    answer: "Frank Gore",
    accolades: ["5× Pro Bowl", "3rd all-time in rushing yards"],
    stints: [
      {
        franchise: "SF",
        displayTeam: "San Francisco 49ers",
        startYear: 2005,
        endYear: 2014,
        jerseyNumber: 21,
        accolades: [{ type: "pro_bowl", count: 5 }],
        statLine: [
          { label: "GP", value: 148 },
          { label: "Att", value: 2442 },
          { label: "Yds", value: 11073 },
          { label: "YPC", value: "4.5" },
          { label: "TD", value: 64 },
        ],
      },
      {
        franchise: "IND",
        displayTeam: "Indianapolis Colts",
        startYear: 2015,
        endYear: 2017,
        jerseyNumber: 23,
        statLine: [
          { label: "GP", value: 48 },
          { label: "Att", value: 774 },
          { label: "Yds", value: 2953 },
          { label: "YPC", value: "3.8" },
          { label: "TD", value: 13 },
        ],
      },
      {
        franchise: "MIA",
        displayTeam: "Miami Dolphins",
        startYear: 2018,
        endYear: 2018,
        jerseyNumber: 21,
        statLine: [
          { label: "GP", value: 14 },
          { label: "Att", value: 156 },
          { label: "Yds", value: 722 },
          { label: "YPC", value: "4.6" },
          { label: "TD", value: 0 },
        ],
      },
      {
        franchise: "BUF",
        displayTeam: "Buffalo Bills",
        startYear: 2019,
        endYear: 2019,
        jerseyNumber: 20,
        statLine: [
          { label: "GP", value: 16 },
          { label: "Att", value: 166 },
          { label: "Yds", value: 599 },
          { label: "YPC", value: "3.6" },
          { label: "TD", value: 2 },
        ],
      },
      {
        franchise: "NYJ",
        displayTeam: "New York Jets",
        startYear: 2020,
        endYear: 2020,
        jerseyNumber: 21,
        statLine: [
          { label: "GP", value: 15 },
          { label: "Att", value: 187 },
          { label: "Yds", value: 653 },
          { label: "YPC", value: "3.5" },
          { label: "TD", value: 2 },
        ],
      },
    ],
    revealOrder: [4, 2, 3, 1, 0],
    hints: {
      position: "RB",
      height: "5'9\"",
      draftYear: "2005",
      draftPick: "Round 3, #65",
      college: "Miami (FL)",
    },
  },
  {
    // Puzzle 5 — Brandon Marshall: six teams, a 100-catch season for four
    // different franchises, zero playoff games. The deep-cut journeyman.
    id: 5,
    pathType: "team",
    answer: "Brandon Marshall",
    accolades: ["6× Pro Bowl", "1× First-Team All-Pro"],
    stints: [
      {
        franchise: "DEN",
        displayTeam: "Denver Broncos",
        startYear: 2006,
        endYear: 2009,
        jerseyNumber: 15,
        accolades: [{ type: "pro_bowl", count: 2 }],
        statLine: [
          { label: "GP", value: 57 },
          { label: "Rec", value: 327 },
          { label: "Yds", value: 4019 },
          { label: "Y/R", value: "12.3" },
          { label: "TD", value: 25 },
        ],
      },
      {
        franchise: "MIA",
        displayTeam: "Miami Dolphins",
        startYear: 2010,
        endYear: 2011,
        jerseyNumber: 19,
        accolades: [{ type: "pro_bowl", count: 2 }],
        statLine: [
          { label: "GP", value: 30 },
          { label: "Rec", value: 167 },
          { label: "Yds", value: 2228 },
          { label: "Y/R", value: "13.3" },
          { label: "TD", value: 9 },
        ],
      },
      {
        franchise: "CHI",
        displayTeam: "Chicago Bears",
        startYear: 2012,
        endYear: 2014,
        jerseyNumber: 15,
        accolades: [
          { type: "pro_bowl", count: 1 },
          { type: "all_pro", count: 1 },
        ],
        statLine: [
          { label: "GP", value: 45 },
          { label: "Rec", value: 279 },
          { label: "Yds", value: 3524 },
          { label: "Y/R", value: "12.6" },
          { label: "TD", value: 31 },
        ],
      },
      {
        franchise: "NYJ",
        displayTeam: "New York Jets",
        startYear: 2015,
        endYear: 2016,
        jerseyNumber: 15,
        accolades: [{ type: "pro_bowl", count: 1 }],
        statLine: [
          { label: "GP", value: 31 },
          { label: "Rec", value: 168 },
          { label: "Yds", value: 2215 },
          { label: "Y/R", value: "13.2" },
          { label: "TD", value: 17 },
        ],
      },
      {
        franchise: "NYG",
        displayTeam: "New York Giants",
        startYear: 2017,
        endYear: 2017,
        jerseyNumber: 15,
        statLine: [
          { label: "GP", value: 5 },
          { label: "Rec", value: 18 },
          { label: "Yds", value: 154 },
          { label: "Y/R", value: "8.6" },
          { label: "TD", value: 0 },
        ],
      },
      {
        franchise: "SEA",
        displayTeam: "Seattle Seahawks",
        startYear: 2018,
        endYear: 2018,
        jerseyNumber: 15,
        statLine: [
          { label: "GP", value: 7 },
          { label: "Rec", value: 11 },
          { label: "Yds", value: 136 },
          { label: "Y/R", value: "12.4" },
          { label: "TD", value: 1 },
        ],
      },
    ],
    revealOrder: [5, 4, 1, 3, 0, 2],
    hints: {
      position: "WR",
      height: "6'4\"",
      draftYear: "2006",
      draftPick: "Round 4, #119",
      college: "UCF",
    },
  },
];
