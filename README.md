# JOURNEYMAN

Daily career-guessing games: a mystery journeyman's career revealed one
era-accurate jersey at a time. **Three separate games in one site** — NBA
(the original), NFL, and MLB — each with its own daily puzzle, streak,
archive, and jersey art. Switch leagues from the start screen or header;
the game engine (reveal loop, scoring, share, storage shapes) is shared,
everything sport-specific lives in a per-sport config.

## Run it

```sh
npm install
npm run dev
```

## Dev helpers

- `?s=nba|nfl|mlb` — pick the game (also remembered per device).
- `?p=1` … `?p=5` — force a specific puzzle for the current sport (each
  plays in its own save slot, numbered #9001+ so it never collides with
  real days). Dev builds only.
- `?jerseys` — jersey QA sheet: every renderer × era style × sample
  colorways on one page. Dev builds only.
- Clear progress: `localStorage.clear()` in the console.

## Where things live

| Path | What |
| --- | --- |
| `src/sports/{nba,nfl,mlb}.tsx` | Per-sport config: puzzles, colorways, renderer, stat cells, hint ladder, grade labels, storage namespace |
| `src/sports/active.ts` | The sport this page-load is playing (`?s=` param) |
| `src/components/JerseyRenderer.tsx` | NBA jersey SVG (provided art, unchanged) |
| `src/components/FootballJerseyRenderer.tsx` + `footballJerseyPaths.ts` | NFL jersey, extracted from the user-supplied NovaeMakersMart SVG (front view), 4 era treatments |
| `src/components/BaseballJerseyRenderer.tsx` + `baseballJerseyPaths.ts` | MLB jersey, extracted from the user-supplied Baseball Jersey SVG (front + its line-art overlay), 4 era treatments incl. pullovers + pinstripes |
| `src/data/colorways.json` | NBA franchise colorways (unchanged) |
| `src/data/{nfl,mlb}/colorways.json` | NFL (32) / MLB (30) franchise era colorways, relocations carried as era entries with era tricodes (OIL→HOU, MON Expos…) |
| `src/data/{nfl,mlb}/puzzles.ts` | 5 hand-written puzzles per sport (see provenance below) |
| `src/data/{nfl,mlb}/playerIndex.json` | Curated skill-position search pools (~450 names each) |
| `src/data/{nfl,mlb}/teamSeasons.json` | Per-season W-L + playoff results for the card backs |
| `src/game/` | Shared engine: reducer, scoring, grading, share, colorway resolution, per-sport storage factory |
| `supabase/multisport-migration.sql` | **Run before deploying this branch** — adds `sport` to results/plays + updates the percentile RPC |

## Before this branch ships

1. **Run the Supabase migration** (`supabase/multisport-migration.sql`) —
   the client now writes a `sport` column everywhere. Until it runs, all
   cloud sync (including NBA) silently no-ops on this branch.
2. **Verify the NFL/MLB data.** NBA puzzles were verified against
   Basketball-Reference (2026-07-15). The NFL/MLB puzzles, colorways, and
   team seasons were generated from general knowledge (2026-07-19) and
   must be verified against Pro-Football-Reference / Baseball-Reference /
   uniform databases before launch — grep for `VERIFY` and `confidence`.
3. **Player indexes are curated, not exhaustive** (~450 names/sport vs the
   NBA's full 5,400). Phase 2 ETL should replace them with complete
   BR/PFR indexes so any legal guess autocompletes.
4. NFL/MLB launch dates are placeholders (`2026-07-20`) in
   `src/sports/nfl.tsx` / `mlb.tsx` — set them to the real launch day so
   puzzle #1 lands correctly and the archive calendar starts there.

Not affiliated with the NBA, NFL, or MLB.
