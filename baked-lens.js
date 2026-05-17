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
  maxH:  120,   // peak height at the lens centre
  shape: 'exponential',
                // Lens curve. 'exponential' (αᵈ): CONSTANT ratio
                // between adjacent rows — every step "feels" the
                // same size delta, focal-to-d=1 is the same as
                // d=4-to-d=5. Predictable, balanced. The other
                // shapes are 'hyperbolic' (1/(1+d) — sharp focal,
                // gentle tail; ratios DECREASE with distance) and
                // 'gaussian' (exp(-d²/(2σ²)) — gentle focal, steep
                // tail; ratios INCREASE with distance).
  alpha: 0.7,   // Per-step ratio for 'exponential'. 0.7 → adjacent
                // rows have a 1.43× height ratio. Lower = sharper
                // focal, higher = flatter band.
  sigma: 3,     // Only used when shape: 'gaussian'.
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
  const { minH, maxH, shape = 'hyperbolic', sigma, alpha } = config;
  if (n <= 0) return [];
  if (budget <= 0) throw new Error('budget must be > 0');
  if (shape === 'gaussian' && (!sigma || sigma <= 0)) {
    throw new Error('sigma must be > 0 for gaussian shape');
  }
  if (shape === 'exponential' && (alpha == null || alpha <= 0 || alpha >= 1)) {
    throw new Error('alpha must be in (0, 1) for exponential shape');
  }

  const weight = lensWeightFn(shape, sigma, alpha);
  const heights = new Array(n);
  let total = 0;
  for (let i = 0; i < n; i++) {
    const d = Math.abs(i - centerRow);
    const w = weight(d);
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
 * Lens weight function: distance d → magnification weight in [0..1]
 * with w(0) = 1 (focal at full magnification).
 *
 * - 'exponential' (default): w = αᵈ. CONSTANT ratio between adjacent
 *   rows — every step has the same multiplicative drop. Predictable,
 *   balanced feel; small jumps and big jumps both work.
 *
 * - 'hyperbolic': w = 1/(1+d). Ratio DECREASES with distance — focal
 *   is 2× d=1, d=1 is 1.5× d=2, etc. The focal dominates while the
 *   band tapers smoothly.
 *
 * - 'gaussian': w = exp(-d²/(2σ²)). Soft top near the centre, steeper
 *   shoulders in the wings. Ratio INCREASES with distance — focal is
 *   barely bigger than d=1, then the gradient drops fast.
 */
export function lensWeightFn(shape = 'exponential', sigma, alpha = 0.7) {
  if (shape === 'gaussian') {
    const twoSigmaSq = 2 * sigma * sigma;
    return (d) => Math.exp(-(d * d) / twoSigmaSq);
  }
  if (shape === 'hyperbolic') {
    return (d) => 1 / (1 + d);
  }
  // exponential
  return (d) => Math.pow(alpha, d);
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

/**
 * Like rowFromY, but returns a FRACTIONAL index — useful when the
 * caller wants to bake the lens at an interpolated focal so the visual
 * smoothly tracks the cursor between rows.
 *
 * Linearly interpolates between adjacent entries in `centers`. With
 * `precomputeFocusCenters` as the centers array, a cursor 30 % of the
 * way between focus=k and focus=k+1 in pixel space returns k + 0.3,
 * which `bakeHeights` accepts directly (1/(1+d) and exp(-d²/2σ²)
 * both work for fractional d).
 *
 * The integer-rounded result equals `rowFromY` on the same inputs.
 */
export function fractionalRowFromY(y, centers) {
  if (!centers || !centers.length) return 0;
  if (y <= centers[0]) return 0;
  const last = centers.length - 1;
  if (y >= centers[last]) return last;
  let lo = 0, hi = last;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (centers[mid] < y) lo = mid + 1;
    else hi = mid;
  }
  // lo is the first index with centers[lo] >= y; interpolate between
  // lo-1 and lo.
  const yLo = centers[lo - 1];
  const yHi = centers[lo];
  if (yHi === yLo) return lo - 1;
  return (lo - 1) + (y - yLo) / (yHi - yLo);
}

/**
 * Cursor y → row by *slot membership*. Returns the row whose rendered
 * box (top-to-bottom inclusive of top edge) contains y. Use this when
 * a closest-center mapping would jump too early — e.g. if focal is 80
 * px and d=1 is 50 px, the closest-center midpoint sits well above the
 * actual slot boundary, so the user would see focused jump while the
 * cursor is still visibly inside the focal slot.
 *
 * `boundaries` is the cumulative-y array (length n+1) where
 * boundaries[i] is the top edge of row i. Use `bakeBoundaries` to
 * compute it from a heights array.
 *
 * Binary searches in O(log n).
 */
export function rowFromYBySlot(y, boundaries) {
  if (!boundaries || boundaries.length < 2) return 0;
  const last = boundaries.length - 2;
  if (y <= boundaries[0]) return 0;
  if (y >= boundaries[last + 1]) return last;
  let lo = 0, hi = last;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (boundaries[mid] <= y) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/**
 * Cumulative top-edge y-positions for a heights array. boundaries[0] = 0,
 * boundaries[i] = sum(heights[0..i-1]), boundaries[n] = totalHeight.
 * Length is heights.length + 1.
 */
export function bakeBoundaries(heights) {
  const n = heights.length;
  const out = new Array(n + 1);
  out[0] = 0;
  for (let i = 0; i < n; i++) out[i + 1] = out[i] + heights[i];
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
