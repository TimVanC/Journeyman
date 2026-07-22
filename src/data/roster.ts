/**
 * The daily schedule: ROSTER[day - 1] is that day's answer.
 *
 * Days 1–9 map to the puzzles already authored in puzzles.ts. Every later
 * name is QUEUED — it goes live automatically the moment a puzzle with that
 * exact answer lands in puzzles.ts; until then the day falls back to cycling
 * the verified pool (see puzzleForDay in App). Names must match the puzzle's
 * `answer` (matching is case- and accent-insensitive).
 *
 * Curation: the user's hand-picked stars-with-mileage list, interleaved with
 * the certified deep-cut journeymen (8–13 franchises, per APBR/BR leaders) so
 * every week mixes household names with true "who WAS that guy" pulls.
 * Ish Smith — the all-time record holder, 13 franchises — lands on day 13.
 */
export const ROSTER: string[] = [
  // ---- days 1-9: puzzles already built (1-2 already played) ----
  "Shareef Abdur-Rahim",
  "Zach Randolph",
  "Lou Williams",
  "Marcus Camby",
  "Antawn Jamison",
  "Vince Carter",
  "Manu Ginóbili",
  "Robert Horry", // day 8 — seven rings, never an All-Star
  "Baron Davis", // day 9 — 6 franchises, the "We Believe" Warrior
  "Matt Barnes", // day 10 — 9 franchises, a ring at the very end
  "Chauncey Billups",
  "Jamal Crawford",
  "Ish Smith", // 13 franchises on day 13
  "Moses Malone",
  "Joe Johnson",
  "Chucky Brown",
  "Tracy McGrady",
  "Shawn Marion",
  "Kobe Bryant", // day 19 — swapped down from day 9 (a two-team star, not a journeyman)
  "Allen Iverson",
  "Rasheed Wallace",
  "Shaquille O'Neal", // day 22 — swapped down from day 10
  "Gary Payton",
  "Jim Jackson", // 12 franchises (moved from day 9 to make room for Baron Davis)
  "Joe Smith",
  "Dominique Wilkins",
  "Stephon Marbury",
  "Garrett Temple",
  "Ray Allen",
  "Glen Rice",
  "D.J. Augustin",
  "Jason Kidd",
  "Rod Strickland",
  "Jeff Green",
  "Dennis Rodman",
  "Mark Jackson",
  "Mike James",
  "Bob McAdoo",
  "Tim Hardaway",
  "Kevin Ollie",
  "Chris Webber",
  "Rajon Rondo",
  "Earl Boykins",
  "Adrian Dantley",
  "Sam Cassell",
  "Drew Gooden",
  "Grant Hill",
  "Jerry Stackhouse",
  "Damon Jones",
  "Pau Gasol",
  "Kevin Willis",
  "Aaron Williams",
  "Dikembe Mutombo",
  "Kenny Anderson",
  "Mark Bryant",
  "Dwyane Wade",
  "Juwan Howard",
  "Benoit Benjamin",
  "Kevin Durant",
  "Larry Hughes",
  "Tyrone Corbin",
  "James Harden",
  "Stephen Jackson",
  "Eddie House",
  "Russell Westbrook",
  "Tony Massenburg", // 15 franchises (moved from day 10 to make room for Matt Barnes)
  "Brevin Knight",
  "Chris Paul",
  "Shaun Livingston",
  "Kurt Thomas",
  "Kyrie Irving",
  "Donyell Marshall",
  "Theo Ratliff",
  "Paul George",
  "Nazr Mohammed",
  "Mikki Moore",
  "Jimmy Butler",
  "Trevor Ariza",
  "Dennis Johnson",
  "Dwight Howard",
  "Marcus Morris",
  "Bernard King",
  "Carmelo Anthony",
  "JaVale McGee",
  "Mitch Richmond",
  "Amar'e Stoudemire",
  "Gerald Green",
  "Latrell Sprewell",
  "Deron Williams",
  "Jared Dudley",
  "Terry Porter",
  "Metta World Peace",
  "Corey Brewer",
  "Dale Ellis",
  "LeBron James", // swapped down from day 8
  "Dave Bing",
  "Nate Archibald",
  "Earl Monroe",
  "Connie Hawkins",
  "Robert Parish",
  "Rick Barry", // displaced from day 8 by Horry
];

/** case/accent-insensitive comparison key */
export function rosterKey(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}
