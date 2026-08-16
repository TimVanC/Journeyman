# New player candidates — 2026-08-16

15 per sport (45 total), graded against `docs/player-tiers.md`.
Every name checked against `player_tiers`, `scheduled_puzzles`, `retired_puzzles`,
and all `src/data/**` puzzle answers — zero collisions.

## Mix used

Target is 80% S / 10% A / 5% B-K / 5% B-C. Over 15 slots that's 12 / 1.5 / 0.75 / 0.75,
so the fractional slots have to be rounded. Chosen split: **12 S · 2 A · 1 B-C · 0 B-K**.

Rationale: B-K is already 3–6× over target in every sport (NBA 33, NFL 32, MLB 24)
while B-C is starved (NBA 8, NFL 9, MLB 5) with no B-C authoring pipeline. Rounding
the half-slot into A and the two quarter-slots into B-C moves inventory toward the
target instead of away from it. To go literal 12/1/1/1 instead, demote the second
A pick per sport to B-K (alternates listed below).

## NBA

| Tier | Player | Franchises |
|---|---|---|
| S | Kyle Korver | PHI · UTA · CHI · ATL · CLE · MIL |
| S | Jason Terry | ATL · DAL · BOS · BKN · HOU · MIL |
| S | Thaddeus Young | PHI · MIN · BKN · IND · CHI · SAS · TOR · PHX |
| S | Marcus Morris Sr. | HOU · PHX · DET · BOS · LAC · CLE · PHI · NYK |
| S | Andre Miller | CLE · LAC · DEN · PHI · POR · WAS · SAC · MIN |
| S | Nick Young | WAS · LAC · PHI · LAL · GSW · DEN |
| S | Jason Richardson | GSW · CHA · PHX · ORL · PHI |
| S | Danny Green | CLE · SAS · TOR · LAL · PHI · MEM |
| S | Devin Harris | DAL · NJN · UTA · ATL · DEN |
| S | Kris Humphries | UTA · TOR · DAL · NJN · BOS · WAS · PHX · ATL |
| S | Al Jefferson | BOS · MIN · UTA · CHA · IND |
| S | Mike Dunleavy Jr. | GSW · IND · MIL · CHI · CLE · ATL |
| A | DeMarre Carroll | MEM · HOU · DEN · UTA · ATL · TOR · BKN · SAS |
| A | Brandon Bass | NOH · DAL · ORL · BOS · LAC · LAL |
| B-C | Rajon Rondo | BOS · DAL · SAC · CHI · NOP · LAL · ATL · LAC · CLE |

Alternates — S: Carlos Boozer, Rashard Lewis, Eric Gordon, Taj Gibson, Evan Turner,
Leandro Barbosa, Markieff Morris. A: Ed Davis, Wilson Chandler, Amir Johnson.
B-C: Kyle Lowry, Rasheed Wallace. B-K: Justin Holiday, Marreese Speights, Earl Watson.

## MLB

| Tier | Player | Franchises |
|---|---|---|
| S | Bobby Abreu | HOU · PHI · NYY · LAA · LAD · NYM |
| S | A. J. Pierzynski | MIN · SF · CHW · BOS · STL · ATL |
| S | Derek Lowe | SEA · BOS · LAD · ATL · CLE · NYY · TEX |
| S | Marco Scutaro | NYM · OAK · TOR · BOS · COL · SF |
| S | Raúl Ibañez | SEA · KC · PHI · NYY · LAA |
| S | José Reyes | NYM · MIA · TOR · COL |
| S | Brandon Phillips | CLE · CIN · ATL · LAA · BOS |
| S | Alex Rios | TOR · CHW · TEX · KC |
| S | John Lackey | LAA · BOS · STL · CHC |
| S | Aubrey Huff | TB · HOU · BAL · DET · SF |
| S | Jason Heyward | ATL · STL · CHC · LAD |
| S | Rafael Furcal | ATL · LAD · STL · MIA |
| A | Michael Bourn | PHI · HOU · ATL · CLE · ARI · BAL |
| A | Neil Walker | PIT · NYM · MIL · NYY · MIA · PHI |
| B-C | Johnny Damon | KC · OAK · BOS · NYY · DET · TB · CLE |

Alternates — S: Ervin Santana, Justin Morneau, Josh Reddick, Starlin Castro,
Jason Bay, Freddy García, Jorge Soler. A: Aaron Hill, Aníbal Sánchez, Doug Fister,
Milton Bradley. B-C: Jim Thome, Vladimir Guerrero. B-K: Jeff Suppan, Joe Blanton,
Jon Jay, David DeJesus.

## NFL

All picks are 1999+ careers (nflverse constraint) and no kickers.

| Tier | Player | Pos | Franchises |
|---|---|---|---|
| S | Jadeveon Clowney | EDGE | HOU · SEA · TEN · CLE · BAL · CAR |
| S | Calais Campbell | DL | ARI · JAX · BAL · ATL · MIA |
| S | Jason Pierre-Paul | EDGE | NYG · TB · BAL · NO · MIA |
| S | Robert Quinn | EDGE | LAR · MIA · DAL · CHI · PHI |
| S | Stephon Gilmore | CB | BUF · NE · CAR · IND · DAL · MIN |
| S | Michael Bennett | DE | TB · SEA · PHI · NE · DAL |
| S | Andy Dalton | QB | CIN · DAL · CHI · NO · CAR |
| S | Matt Cassel | QB | NE · KC · MIN · BUF · DAL · TEN · DET |
| S | Jacoby Brissett | QB | NE · IND · MIA · CLE · WAS · ARI |
| S | Michael Crabtree | WR | SF · OAK · BAL · ARI |
| S | Braylon Edwards | WR | CLE · NYJ · SF · SEA |
| S | Robert Woods | WR | BUF · LAR · TEN · HOU |
| A | Brian Hoyer | QB | NE · PIT · ARI · CLE · HOU · CHI · SF · IND · LV |
| A | Dion Lewis | RB | PHI · CLE · NE · TEN · NYG |
| B-C | Von Miller | EDGE | DEN · LAR · BUF · WAS |

Positional mix: 7 defense · 4 QB · 3 WR · 1 RB.

Alternates — S: Jason Peters, Randall Cobb, Geno Smith, Josh Norman, Marcus Peters,
Kenyan Drake, Lamar Miller. A: Blaine Gabbert, Logan Ryan, Melvin Ingram,
Peyton Hillis, Nate Burleson, Danny Woodhead. B-C: Jimmy Garoppolo.
B-K: Josh Johnson, Mike Glennon, Chase Daniel, Tashaun Gipson, Prince Amukamara.

## Pipeline configs

- `pipeline/out/nba-batch-2026-08-16-config.json` (startId 137)
- `pipeline/out/mlb-batch-2026-08-16-config.json` (startId 128)
- `pipeline/out/nfl-batch-2026-08-16-config.json` (startId 128)

startIds computed from the true max puzzle id per sport, not file order.
NBA `brId` values are standard Basketball-Reference slugs but were not fetched —
verify before authoring; a wrong slug fails loudly on the BR page fetch.
