/**
 * Fisheye Flyout Menu — Pure computation functions
 *
 * Extracted for testability. No DOM dependencies.
 * All functions take config as a parameter instead of reading a closure.
 */

/**
 * Default config values (used when caller doesn't provide overrides).
 */
export const DEFAULT_CONFIG = {
  baseHeight: 28,
  maxExpand: 4.4,
  minHeight: 18,
  falloffRadius: 3,
};

/**
 * Compute per-item heights with the fisheye constraint.
 *
 * @param {number} n           - Number of items
 * @param {number} hoveredIdx  - Index of the item the mouse is over (-1 for none/default)
 * @param {number} totalHeight - Total pixel budget for all items
 * @param {object} config      - { maxExpand, minHeight, falloffRadius }
 * @returns {number[]} Array of pixel heights, one per item
 */
export function computeFisheyeHeights(n, hoveredIdx, totalHeight, config = DEFAULT_CONFIG) {
  if (n === 0) return [];

  if (hoveredIdx < 0) {
    return computeDefaultHeights(n, totalHeight, config);
  }

  const { maxExpand, minHeight, falloffRadius } = config;

  // Build raw weights: hovered item gets maxExpand, falloff neighbors
  // taper down steeply so the hovered item is always visually dominant.
  // Uses a squared cosine falloff: weight drops fast near center,
  // ensuring the item under the cursor is clearly the tallest.
  const weights = new Array(n);
  for (let i = 0; i < n; i++) {
    const dist = Math.abs(i - hoveredIdx);
    if (dist === 0) {
      weights[i] = maxExpand;
    } else if (dist <= falloffRadius) {
      // t goes from ~0.67 (dist=1, radius=3) to 0 (dist=radius)
      const t = 1 - dist / falloffRadius;
      // Squared cosine: steep dropoff, hovered item stays dominant
      const cos = Math.cos(Math.PI * 0.5 * (1 - t));
      weights[i] = 1 + (maxExpand - 1) * cos * cos * 0.4;
    } else {
      weights[i] = 1;
    }
  }

  // Normalize weights so total height is preserved
  const weightSum = weights.reduce((a, b) => a + b, 0);
  const heights = weights.map(w => Math.max(minHeight, (w / weightSum) * totalHeight));

  // Fix total after minHeight clamping (clamping can inflate the sum).
  // Apply correction to hovered item before pinning, so the pinning
  // loop operates on a correctly-budgeted set of heights.
  const prePinTotal = heights.reduce((a, b) => a + b, 0);
  heights[hoveredIdx] += totalHeight - prePinTotal;

  // ── Boundary pinning (the goalpost invariant) ──────────────
  //
  // The default layout defines where each item boundary sits.
  // After fisheye redistribution, the hovered item's boundaries
  // must not move toward the mouse:
  //   - Top boundary (hoveredIdx) must not move DOWN
  //   - Bottom boundary (hoveredIdx+1) must not move UP
  //
  // Strategy: compute default boundaries, compare to fisheye boundaries.
  // If violated, steal height from items on the side that shifted
  // and give it to the hovered item to push the boundary back.

  const defaultHeights = computeDefaultHeights(n, totalHeight, config);
  const defaultBounds = cumulativeBoundaries(defaultHeights);
  let fisheyeBounds = cumulativeBoundaries(heights);

  // Iterative boundary pinning. Top and bottom constraints interact
  // (fixing one can violate the other), so iterate until both hold.
  // Converges in 2-3 passes for all tested configurations.
  for (let pass = 0; pass < 5; pass++) {
    fisheyeBounds = cumulativeBoundaries(heights);
    let changed = false;

    // Pin top boundary: must not move down
    const topShift = fisheyeBounds[hoveredIdx] - defaultBounds[hoveredIdx];
    if (topShift > 0.001) {
      let reclaimed = 0;
      for (let i = hoveredIdx - 1; i >= 0 && reclaimed < topShift; i--) {
        const shrink = Math.min(topShift - reclaimed, heights[i] - minHeight);
        if (shrink > 0) {
          heights[i] -= shrink;
          reclaimed += shrink;
        }
      }
      heights[hoveredIdx] += reclaimed;
      changed = true;
    }

    // Pin bottom boundary: must not move up
    fisheyeBounds = cumulativeBoundaries(heights);
    const bottomShift = defaultBounds[hoveredIdx + 1] - fisheyeBounds[hoveredIdx + 1];
    if (bottomShift > 0.001) {
      let reclaimed = 0;
      // Steal from items below first
      for (let i = hoveredIdx + 1; i < n && reclaimed < bottomShift; i++) {
        const shrink = Math.min(bottomShift - reclaimed, heights[i] - minHeight);
        if (shrink > 0) {
          heights[i] -= shrink;
          reclaimed += shrink;
        }
      }
      // If not enough below, steal from items above
      for (let i = 0; i < hoveredIdx && reclaimed < bottomShift; i++) {
        const shrink = Math.min(bottomShift - reclaimed, heights[i] - minHeight);
        if (shrink > 0) {
          heights[i] -= shrink;
          reclaimed += shrink;
        }
      }
      heights[hoveredIdx] += reclaimed;
      changed = true;
    }

    if (!changed) break;
  }

  return heights;
}

/**
 * Default distribution: first item tallest, last item shortest.
 * Linear taper from top to bottom.
 *
 * @param {number} n           - Number of items
 * @param {number} totalHeight - Total pixel budget
 * @param {object} config      - { minHeight }
 * @returns {number[]}
 */
export function computeDefaultHeights(n, totalHeight, config = DEFAULT_CONFIG) {
  if (n === 0) return [];
  if (n === 1) return [totalHeight];

  const { minHeight } = config;
  const topRatio = 1.6;
  const bottomRatio = 0.6;
  const heights = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const ratio = topRatio + (bottomRatio - topRatio) * t;
    heights.push(ratio);
  }
  // Normalize
  const sum = heights.reduce((a, b) => a + b, 0);
  const result = heights.map(r => Math.max(minHeight, (r / sum) * totalHeight));
  // Fix total
  const currentTotal = result.reduce((a, b) => a + b, 0);
  result[0] += totalHeight - currentTotal;
  return result;
}

/**
 * Test if point (px, py) is inside triangle (a, b, c) using sign-of-cross-product method.
 *
 * @param {number} px - Test point x
 * @param {number} py - Test point y
 * @param {{x:number, y:number}} a
 * @param {{x:number, y:number}} b
 * @param {{x:number, y:number}} c
 * @returns {boolean}
 */
export function pointInTriangle(px, py, a, b, c) {
  const d1 = (px - b.x) * (a.y - b.y) - (a.x - b.x) * (py - b.y);
  const d2 = (px - c.x) * (b.y - c.y) - (b.x - c.x) * (py - c.y);
  const d3 = (px - a.x) * (c.y - a.y) - (c.x - a.x) * (py - a.y);
  const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
  return !(hasNeg && hasPos);
}

/**
 * Compute cumulative boundary y-positions from an array of heights.
 * boundaries[i] = top edge of item i. boundaries[0] = 0.
 * boundaries[n] = bottom edge of last item = sum of all heights.
 *
 * @param {number[]} heights
 * @returns {number[]} Array of length heights.length + 1
 */
export function cumulativeBoundaries(heights) {
  const boundaries = [0];
  for (let i = 0; i < heights.length; i++) {
    boundaries.push(boundaries[i] + heights[i]);
  }
  return boundaries;
}

/**
 * Given a mouse y-position relative to the panel top, determine which
 * item index the mouse is over.
 *
 * @param {number} mouseY    - Y relative to panel content top
 * @param {number[]} heights - Current item heights
 * @returns {number} Item index, or -1 if outside
 */
export function itemIndexAtY(mouseY, heights) {
  let cumY = 0;
  for (let i = 0; i < heights.length; i++) {
    if (mouseY >= cumY && mouseY < cumY + heights[i]) {
      return i;
    }
    cumY += heights[i];
  }
  return -1;
}
