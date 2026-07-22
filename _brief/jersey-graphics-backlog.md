# Jersey graphics — deferred feature

Written 2026-07-22. Not implemented; this is the plan and an honest capability
note for whoever picks it up (human or model).

## The problem it solves

Colorway + number + era cut currently carries the whole jersey. That means two
navy jerseys from different decades can look nearly identical, which costs the
game real signal — a Horry-era Suns card is just purple and orange text, when
the actual jersey had a basketball-comet streaking across the hip. Patterns are
the cheapest remaining way to make eras distinguishable at a glance.

## The hook already exists

`ColorwayEra.pattern` (`src/game/colorways.ts`) is already in the type and
already ships one value, `"pinstripe"`. MLB reads it and the baseball back
renderer draws it as rects clipped to the torso path:

```
<clipPath id={pinId}><path d={BODY} /></clipPath>
… 15 × <rect width={0.9} …/> inside <g clipPath>
```

That is the template for everything in Tier 1 below. Widen the union
(`"pinstripe" | "side-panel" | "yoke" | "sash" | …`), give each renderer a
`PATTERNS` map keyed by that union, and clip to the body path the same way.
Keep the existing `confidence` flag honest — a guessed pattern is worse than no
pattern, because it reads as a deliberate clue.

## Tiers, by how reliably they can be produced

**Tier 1 — parametric geometry. Do this first.**
Stripes, side panels, shoulder yokes, waistband bands, gradient fades, diagonal
sashes, checkerboards. Pure math plus a clip path, verifiable numerically with
`getBBox` without looking at anything. The pinstripe implementation worked
first try and generalises across every colorway. Safe to do at league scale.

Concrete candidates: Nuggets rainbow skyline, Bucks 90s diagonal, Grizzlies
side stripes, Rockets pinstripe-and-star, NFL sleeve stripe variants beyond the
four era treatments, MLB racing stripes.

**Tier 2 — illustrated marks. One at a time, only where the mark IS the clue.**
The Suns comet is the archetype: a circle plus a tapered arc plus radiating
strokes, so it decomposes into primitives and sits closer to Tier 1 than to
freehand drawing. Expect several visual iterations per mark. Worth it only for
designs distinctive enough that a player would recognise the jersey from the
pattern alone.

**Tier 3 — real logos and wordmarks. Don't.**
Trademarked, and it breaks the game's premise ("no logos, no names") which is
what makes guessing work at all.

## Capability note (model-authored, worth heeding)

Decomposing *supplied* vector art is reliable — three for three on this project
(the NBA sheet, the NovaeMakersMart football, the baseball back once the right
sheet row was found). Handing over an SVG of a comet is close to a solved path.

Freehand vector illustration is NOT reliable. The football icon took three
attempts and still read as an eye; the fix was pulling Material Symbols
instead. The hand-drawn glove and bat were likewise replaced with real icon
sets. `CyYoungIcon` and `LombardiIcon` in `src/components/Icons.tsx` are
hand-drawn and were never visually verified — check them before trusting them.

**Prerequisite for any Tier 2 work: a working preview.** Much of the late
2026-07-22 work was verified only geometrically (valid paths, no collisions,
correct bounding boxes) because the browser pane was backgrounded and
screenshots timed out. That is sufficient for Tier 1 and nowhere near
sufficient for anything illustrative.

## Verification

`?jerseys` renders every renderer × era × colorway plus the icon sets, and
`?cards` renders real cards including an era-variation row. Both run on
localhost and on Vercel previews, and are blocked on the live domain. Any
pattern work should show up in both before it ships.
