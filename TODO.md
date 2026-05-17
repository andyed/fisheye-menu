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

### Focal-pin status: prototyped + rolled back

Landed and verified in preview (pin error stays under 0.2 px across
cursor sweeps, no cascade for ±N row jumps). But the cursor-trap
edge behavior broke navigation: with `listH` scaled to fit `budget`
exactly, the cursor's reachable focal range is constrained to roughly
`budget / focal_h` rows around the initial bake. From paletteIdx=0
the user couldn't navigate to higher rows without re-opening the
menu. Rolled back to the slot+STABLE_DIST=1 model (commits available
via git log for the focal-pin attempt).

Path forward when we revisit:

1. **Unscaled list with edge-clamped pin.** Stop scaling heights to
   `budget` — let `listH` be the raw sum (≈ 1250 px for 148 items
   at exponential alpha=0.7). `.fm-list` stays fixed at `budget`
   height with `overflow: hidden`. The translateY pin is clamped
   to `[budget − listH, 0]` so the list scrolls *within* that
   range without exposing dead space outside its content.
2. **Cursor-at-edge auto-scroll.** When cursor sits at the top or
   bottom of the menu (or pushes against the clamp), advance the
   list's scroll position continuously over time — covers the
   remaining reachable distance without forcing the user to move
   the cursor outside the menu.
3. **Scroll-wheel hand-off.** Independent of cursor y, scroll wheel
   nudges the focal. Lets the user reach any row from any cursor
   position.

Either way the simulation framework (above) should validate the
trade-off before re-landing.



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
