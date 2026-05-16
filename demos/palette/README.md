# 148-Palette Picker

A flat-list focus+context lens — the one-dimensional case the original 1986
Furnas paper described, applied to selecting from 148 hand-crafted color
palettes.

## Why a separate demo

The main library demo at the repo root (`index.html`) shows the **cascading**
fisheye use case: hierarchical menus where each level has a flyout, protected
by the free-travel triangle. This demo is the simpler **flat list** case — no
hierarchy, no flyouts, just 148 items compressed into a single viewport-tall
column.

The flat-list version exercises parts of the algorithm the cascading demo
can't:
- the **floor-clamped tails** (4 px guaranteed-clickable floor): with 130+
  items in the tail at any one time, you can see the dissertation rule
  actually doing work
- a **viewport-budgeted layout**: the sum of item heights is capped at the
  viewport height, scaled if necessary, instead of `N × baseHeight`
- a **precomputed cursor→focus map** (see below)

## The cursor mapping

The naive linear mapping (`cursorY / listHeight × (N - 1)`) drifts away from
the rendered focused row near the edges of the list, because the Gaussian
lens truncates and pushes the focused row's pixel position off the linear
ideal — by ~60 px in the worst case with these parameters.

`precomputeFisheyeFocusMap()` builds a table of the steady-state center-y
of each item k in the layout where focus=k. Built once on menu open
(O(N²), ~22K ops for N=148, runs in under a millisecond). On pointermove,
a binary search on this table gives the focus index whose visual position
is closest to the cursor. The result: the focused row sits directly under
the pointer at every height, edges included.

The list's height is also pinned to the items' summed pixel budget via
`list.style.flex = '0 0 auto'` + explicit height. Without this, flex
stretching in the menu container can size the list element larger than
the items, leaving empty space below the last row and a cursor→focus
mismatch that grows linearly with distance from the top — worse on taller
viewports.

## Files

- `index.html` — the demo
- `palettes.js` — 148 hand-crafted color palettes by Andy Edmonds, with the
  `buildPaletteLUT(name)` interpolation helper. MIT-licensed alongside the
  rest of the repo.

## Origin

The picker code originated in
[spherodeli](https://github.com/andyed/spherodeli)'s palette HUD. The flat-
list pattern and the cursor-map defensive fix were extracted here so future
fisheye implementations can reuse them.
