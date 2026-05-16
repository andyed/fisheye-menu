# Backlog

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
