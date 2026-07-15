# JOURNEYMAN — Phase 1

Daily NBA guessing game: a mystery journeyman's career revealed one
era-accurate jersey at a time. This is the **Phase 1 playable core** from the
build brief (see `_brief/journeyman-build-brief.md`): no backend, 5 hardcoded
puzzles, full game loop, scoring, share text, and localStorage streaks.

The player-pool addendum (`_brief/journeyman-addendum-combined.md`, §4.5) is
Phase 2 generator work. Its one Phase-1 touchpoint is already in place:
`Puzzle.pathType` (`team` / `number_era` / `role_phase`) exists in the data
model so Track B/C/D puzzles won't need a client retrofit; all 5 hardcoded
puzzles are Track A (`team`).

## Run it

```sh
npm install
npm run dev
```

## Dev helpers

- `?p=1` … `?p=5` — force a specific puzzle (each plays in its own save slot,
  numbered #9001+ so it never collides with real days). Remove before launch.
- Clear progress: `localStorage.clear()` in the console.

## Where things live

| Path | What |
| --- | --- |
| `src/components/JerseyRenderer.tsx` | Provided jersey SVG — used verbatim |
| `src/data/colorways.json` | Provided franchise colorways — used verbatim |
| `src/data/puzzles.ts` | The 5 hand-written puzzles (stats + numbers verified vs Basketball-Reference, 2026-07-15) |
| `src/data/playerIndex.ts` + `.json` | Full 5,400+ all-NBA/ABA search index from BR (Phase 2: `player_index` table) |
| `src/components/jerseyPaths.ts` | Jersey artwork path data (user-supplied SVG, front view) |
| `src/game/state.ts` | Reducer: jerseys → hint ladder → final guess |
| `src/game/storage.ts` | ET day number, per-day save, streak/history profile |
| `src/game/share.ts` | Emoji trail + clipboard share text |
| `src/data/teamSeasons.json` + `.ts` | Per-season W-L + playoff results (BR franchise pages, 2026-07-16) for the card backs |

## Before this data ships (Phase 2 QA)

- Puzzle stats and jersey numbers were verified against Basketball-Reference
  (per-game season tables + team roster pages) on 2026-07-15.
- `yearsActive` in `playerIndex.ts` verified against BR player-index From/To
  years on 2026-07-15.
- Still to do: verify `confidence: "low"` colorway entries per brief §10.

Not affiliated with the NBA.
