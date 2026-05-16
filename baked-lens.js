/**
 * Baked Furnas lens — pure functions, no DOM.
 *
 * Companion to `fisheye-core.js`. Where fisheye-core's
 * `computeFisheyeHeights` runs the cascading-menu lens (linear falloff
 * within a radius, weight normalization, deficit redistribution), this
 * module bakes a Gaussian lens for the flat-list use case (148-palette
 * picker). The lens is computed *once* at menu-open and never reshuffles
 * on cursor motion — the "no moving cheese" invariant — so callers also
 * get a cumulative-centers array for the cursor → row lookup.
 *
 * Reused by:
 *   - demos/palette/index.html       (this repo's flat-list demo)
 *   - andyed/spherodeli/index.html   (the picker the algorithm was
 *                                     extracted from)
 *
 * Both currently inline the math; this module is the canonical source
 * once they're updated to import. Until then, keep the math in sync.
 */

export const DEFAULT_LENS_CONFIG = {
  minH:  4,     // hard floor — items at the floor still clickable
  maxH:  120,   // peak height at the lens centre — generous so focal
                // pops AND d=2/d=3 are still comfortably clickable
  sigma: 3,     // Gaussian σ in *item-distance* units — broad enough
                // that 6–7 rows around focal are readable, narrow
                // enough that the focal still dominates visually
};

/**
 * Bake per-row heights for a static Gaussian lens centered on `centerRow`.
 *
 * Returns the scaled heights array (length n, sum ≤ budget). If the raw
 * sum exceeds `budget` the whole array is scaled down uniformly — keeps
 * the gradient shape, shrinks every row proportionally.
 *
 * Properties (see baked-lens.test.js):
 *   - heights[centerRow] is the maximum
 *   - monotone decreasing away from centerRow on each side
 *   - symmetric around centerRow when the lens fits within bounds
 *   - sum(heights) ≤ budget
 */
export function bakeHeights(n, centerRow, budget, config = DEFAULT_LENS_CONFIG) {
  const { minH, maxH, sigma } = config;
  if (n <= 0) return [];
  if (sigma <= 0) throw new Error('sigma must be > 0');
  if (budget <= 0) throw new Error('budget must be > 0');

  const heights = new Array(n);
  let total = 0;
  const twoSigmaSq = 2 * sigma * sigma;
  for (let i = 0; i < n; i++) {
    const d = i - centerRow;
    const w = Math.exp(-(d * d) / twoSigmaSq);
    heights[i] = minH + (maxH - minH) * w;
    total += heights[i];
  }
  const scale = total > budget ? budget / total : 1;
  if (scale !== 1) {
    for (let i = 0; i < n; i++) heights[i] *= scale;
  }
  return heights;
}

/**
 * Cumulative center-y for each row given a heights array.
 *
 * centers[i] = sum(heights[0..i-1]) + heights[i] / 2
 *
 * This is the y-coordinate where row i's *center* sits if rows lay out
 * in normal flow starting at y=0. Used by `rowFromY` to map a cursor y
 * back to a row index.
 *
 * Properties:
 *   - centers[0] = heights[0] / 2
 *   - centers[n-1] = totalHeight - heights[n-1] / 2
 *   - strictly monotone increasing (because heights > 0)
 */
export function bakeCenters(heights) {
  const n = heights.length;
  const centers = new Array(n);
  let cum = 0;
  for (let i = 0; i < n; i++) {
    centers[i] = cum + heights[i] / 2;
    cum += heights[i];
  }
  return centers;
}

/**
 * Cursor y → row index via binary search on the centers array.
 * Returns the row whose center is closest to `y`.
 *
 * Out-of-range y clamps to the first or last row.
 *
 * This is a pure function of (y, centers) — the same inputs always
 * return the same row. Combined with the frozen-after-bake heights,
 * this gives the "stable target" guarantee: the row a user picked
 * visually at open-time will be the same row a click at that y selects.
 */
/**
 * Precompute the "where would row k be if it were the focal?" array.
 *
 * Used by consumers that want to RE-BAKE the lens on every cursor move
 * (so the visual lens follows the cursor) while still having a stable
 * cursor → row mapping. The naïve approach — bake, derive centers,
 * map cursor.y, then re-bake around the new focal — is chicken-and-egg:
 * cursor.y maps to a different row depending on which layout you read.
 *
 * `precomputeFocusCenters` breaks the loop by computing, for each
 * possible focal row k, what y position k *would* occupy when it's the
 * focal. The returned array is stable for the menu's lifetime; binary-
 * searching it gives the "right" focal row for any cursor y, and that
 * row's actual rendered position will match the lookup after re-baking.
 *
 * O(n²) at construction — 22K ops for n=148, runs once on menu open.
 * Pass the result to `rowFromY` on every pointermove.
 */
export function precomputeFocusCenters(n, budget, config = DEFAULT_LENS_CONFIG) {
  const out = new Array(n);
  for (let k = 0; k < n; k++) {
    const heights = bakeHeights(n, k, budget, config);
    const centers = bakeCenters(heights);
    out[k] = centers[k];
  }
  return out;
}

export function rowFromY(y, centers) {
  if (!centers || !centers.length) return 0;
  let lo = 0, hi = centers.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (centers[mid] < y) lo = mid + 1;
    else hi = mid;
  }
  if (lo > 0 && Math.abs(centers[lo - 1] - y) < Math.abs(centers[lo] - y)) {
    return lo - 1;
  }
  return lo;
}
