# Backlog

## Mouse-movement simulation framework

(Focal-pin landed; see "Focal-pin status" below.)


Before committing to focal-pin, build a simulation harness:

1. Synthesize cursor paths — uniform sweeps, accelerating sweeps,
   target-acquisition (ballistic + corrective phases per Fitts), fast
   flicks, hesitation/dwell patterns.
2. For each (cursor-path, lens-config) pair, run the demo's
   pointermove handler and record:
   - Final focused row vs intended target (acquisition success rate)
   - Number of bake events (visual churn)
   - Cumulative cursor → focal y-distance (target stability metric)
   - Time to acquire (sim time)
3. Optimize over (shape, alpha, sigma, maxH, STABLE_DIST,
   pin/no-pin) for combined score weighted by user preferences.

Run in Node (vitest-style), no DOM required if the lens math is in
baked-lens.js (it is). The DOM-side bits (`setFocusedRow`, list
translation) can be stubbed.

### Scientifically determine the required range

The README cites Fitts (1954), Bederson (2000), Cockburn & Gutwin
(2007), Accot & Zhai (1997), Ahlström et al. (2005). The
Cockburn-Gutwin result is the load-bearing one: Dock-style fisheye
menus tested *slower* than traditional menus because magnification
distorted spatial layout. Our `STABLE_DIST=1` pocket + the (proposed)
focal-pin redesign address that critique by preserving "where the
target was" through the bake shift.

From the references, derive:
- Minimum focal-row pixel height for Fitts-comfortable targeting
  (W > some threshold; the steering-law derivation in Accot-Zhai
  bounds the per-row time cost as a function of width).
- Acceptable per-step magnification ratio (Bederson's empirical
  ranges; we'd want to land inside their tested band).
- Maximum acceptable spatial distortion (Cockburn-Gutwin's failure
  mode: when target jumps by more than ~one row's height,
  performance degrades).

Use these to set hard bounds on the simulation's optimizer search.

### Focal-pin status

Landed in both the demo and spherodeli. Each pointermove computes
`cursorInternalY = cursorViewportY − naturalTop − currentT`, slot-maps
that to a row k, re-bakes if k changed, then sets
`translateY = cursorY − naturalTop − centers[k]` so the new focal sits
exactly at the cursor. Verified in preview: pin error stays under 0.2 px
across forward and reverse cursor sweeps. No cascade — every cursor
position maps to exactly one focal.

Edge behavior is currently unpolished. When the cursor lands such that
the focal would be row 0 or row N-1, the list translates so its content
extends past the visible viewport boundary (clipped by .fm-list's
overflow:hidden). Rows above/below the visible band are not reachable
without re-opening the menu at a different paletteIdx. A future
"viewport-edge spring" or scroll-mode hand-off would let the user
reach all 148 entries from any starting point.



## Unified createPanel API with mode dispatch

Today the repo ships two algorithms as separate exports:

- `fisheye-core.js` → `computeFisheyeHeights` — cascading-menu lens
  (linear falloff within radius, weight normalization, deficit
  redistribution). Used by `fisheye-menu.js` / `index.html`. Reshapes
  on every mousemove.
- `baked-lens.js` → `bakeHeights` + `bakeCenters` + `rowFromY` —
  flat-list Gaussian lens, baked once at open. Used by
  `demos/palette/`.

Consumers currently pick by import path, which surfaces the algorithm
choice as an architectural concern even when the user only cares about
the UX mode.

Proposed dispatcher:

```js
createPanel(items, {
  mode: 'cascading' | 'baked',   // default: heuristic
  // shared: items, onSelect, theme, debug, ...
});
```

When `mode` is omitted, default by a heuristic:

```js
const looksFlat = !items.some(it => it && it.children?.length);
const mode = (looksFlat && items.length > 40) ? 'baked' : 'cascading';
```

Rationale: "flat list & N > 40" is shorthand for "the per-event reshape
distance has crossed the perceptual threshold" — at small N the cheese
motion is imperceptible, at large N it's disorienting. Hierarchical
menus need flyout steering which only the cascading algorithm
supports, so we never default flat.

Not blocking on this — both algorithms work standalone and the demo
proves the baked path. Consolidate when there's a real consumer that
would benefit from the unified surface.

## Bring the cascading library to a shared algorithm signature

Once the dispatcher lands, the two algorithms should ideally share a
common output contract — `{ heights, centers }` plus a `rowFromY`-style
hit-test — so the panel controller doesn't fork on `mode` beyond the
initial bake/rebuild decision. Today they diverge:

- `computeFisheyeHeights` doesn't return centers; the panel relies on
  per-mousemove `getBoundingClientRect()` for hit-testing.
- `bakeHeights` + `bakeCenters` return both; the consumer binary-searches
  centers without touching the DOM.

A future `fisheye-core.bake()` that returns the cascading-mode
equivalent would let the panel controller use one cursor → row code
path regardless of mode.
