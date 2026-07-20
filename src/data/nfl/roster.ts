/**
 * The NFL daily schedule: NFL_ROSTER[day - 1] is that day's answer.
 *
 * Days 1-5 map to the puzzles already authored in puzzles.ts. Every later
 * name is QUEUED — it goes live automatically the moment a puzzle with that
 * exact answer lands in puzzles.ts; until then the day falls back to
 * cycling the built pool. QB + skill positions only (product direction).
 */
export const NFL_ROSTER: string[] = [
  // ---- days 1-5: puzzles already built ----
  "Ryan Fitzpatrick",
  "Randy Moss",
  "Terrell Owens",
  "Frank Gore",
  "Brandon Marshall",
  // ---- days 6+: queued, need stint data authored ----
  "Josh McCown", // 12 teams — the true record chase
  "Adrian Peterson",
  "DeSean Jackson",
  "LeSean McCoy",
  "Marshawn Lynch",
  "Kurt Warner",
  "Drew Bledsoe",
  "Vinny Testaverde",
  "Kerry Collins",
  "Michael Vick",
  "Cam Newton",
  "Joe Flacco",
  "Carson Palmer",
  "Alex Smith",
  "Sam Bradford",
  "Case Keenum",
  "Teddy Bridgewater",
  "Emmitt Smith",
  "Jerry Rice",
  "Cris Carter",
  "Steve Smith Sr.",
  "Anquan Boldin",
  "Wes Welker",
  "Brett Favre",
  "Peyton Manning",
  "Joe Montana",
  "Randall Cunningham",
  "Jeff George",
  "Ricky Williams",
  "Jerome Bettis",
  "Eddie George",
  "Thomas Jones",
  "Chris Johnson",
  "Reggie Bush",
  "Golden Tate",
  "Emmanuel Sanders",
  "Mike Wallace",
  "Kenny Britt",
  "Antonio Gates",
  "Jared Cook",
  "Delanie Walker",
  "Benjamin Watson",
];
