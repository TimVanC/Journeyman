/**
 * The MLB daily schedule: MLB_ROSTER[day - 1] is that day's answer.
 *
 * Days 1-5 map to the puzzles already authored in puzzles.ts. Every later
 * name is QUEUED — it goes live automatically the moment a puzzle with that
 * exact answer lands in puzzles.ts; until then the day falls back to
 * cycling the built pool.
 */
export const MLB_ROSTER: string[] = [
  // ---- days 1-5: puzzles already built ----
  "Alfonso Soriano",
  "Carlos Beltrán",
  "Adrián Beltré",
  "Zack Greinke",
  "Javier Vázquez",
  // ---- days 6+: queued, need stint data authored ----
  "Edwin Jackson", // 14 franchises — the all-time record
  "Bartolo Colón",
  "Octavio Dotel",
  "Rich Hill",
  "Matt Stairs",
  "Kenny Lofton",
  "LaTroy Hawkins",
  "Nelson Cruz",
  "Gary Sheffield",
  "Fred McGriff",
  "Jim Thome",
  "Manny Ramírez",
  "Pedro Martínez",
  "Roger Clemens",
  "Randy Johnson",
  "CC Sabathia",
  "David Wells",
  "Mike Piazza",
  "Vladimir Guerrero",
  "Miguel Tejada",
  "José Canseco",
  "Rickey Henderson",
  "Reggie Jackson",
  "Goose Gossage",
  "Nolan Ryan",
  "Andruw Jones",
  "Torii Hunter",
  "Curtis Granderson",
  "Melky Cabrera",
  "Asdrúbal Cabrera",
  "Ichiro Suzuki",
  "Robinson Canó",
  "Josh Donaldson",
  "Evan Longoria",
  "James Shields",
  "Ervin Santana",
  "Dan Haren",
  "A.J. Burnett",
  "Jake Peavy",
  "Cole Hamels",
  "Johnny Cueto",
  // ---- the pre-war set: puzzles 6-9, already authored & verified ----
  "Sam Jethroe", // Negro Leagues → oldest ROY ever, at 33
  "Babe Ruth",
  "Monte Irvin", // Newark Eagles → '54 champion Giants
  "Jimmie Foxx",
];
