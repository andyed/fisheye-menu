/**
 * Tier 2: Gradient symmetry and proportionality
 *
 * With uniform default layout and no boundary pinning, we test that:
 * - Hovered item is always the tallest
 * - Heights are symmetric when hovering a symmetric position
 * - Gradient decreases monotonically from hovered item
 * - Total height is preserved
 */
import { describe, it, expect } from 'vitest';
import {
  computeFisheyeHeights,
  computeDefaultHeights,
  cumulativeBoundaries,
  DEFAULT_CONFIG,
} from '../fisheye-core.js';

const cfg = DEFAULT_CONFIG;
const EPSILON = 0.5;

const testCases = [];
for (const n of [3, 5, 7, 9, 12]) {
  const totalHeight = n * cfg.baseHeight;
  for (const hovIdx of [0, 1, Math.floor(n / 2), n - 2, n - 1]) {
    if (hovIdx >= 0 && hovIdx < n) {
      testCases.push({ n, totalHeight, hovIdx });
    }
  }
}

describe('gradient properties', () => {

  it.each(testCases)(
    'n=$n, hovered=$hovIdx: hovered item is tallest',
    ({ n, totalHeight, hovIdx }) => {
      const heights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);
      const hovH = heights[hovIdx];
      heights.forEach((h, i) => {
        if (i !== hovIdx) {
          expect(hovH).toBeGreaterThanOrEqual(h - EPSILON);
        }
      });
    }
  );

  it.each(testCases)(
    'n=$n, hovered=$hovIdx: total height preserved',
    ({ n, totalHeight, hovIdx }) => {
      const heights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);
      const sum = heights.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(totalHeight, 1);
    }
  );

  it.each(testCases)(
    'n=$n, hovered=$hovIdx: all heights >= minHeight',
    ({ n, totalHeight, hovIdx }) => {
      const heights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);
      heights.forEach(h => expect(h).toBeGreaterThanOrEqual(cfg.minHeight - 0.01));
    }
  );
});

describe('gradient symmetry', () => {

  it('hovering first vs last item produces mirror image', () => {
    const n = 10;
    const total = n * cfg.baseHeight;
    const first = computeFisheyeHeights(n, 0, total, cfg);
    const last = computeFisheyeHeights(n, n - 1, total, cfg);
    for (let i = 0; i < n; i++) {
      expect(first[i]).toBeCloseTo(last[n - 1 - i], 0);
    }
  });

  it('hovering middle item produces symmetric heights', () => {
    const n = 9; // odd, so middle is exact
    const total = n * cfg.baseHeight;
    const mid = Math.floor(n / 2);
    const heights = computeFisheyeHeights(n, mid, total, cfg);
    for (let d = 1; d <= mid; d++) {
      expect(heights[mid - d]).toBeCloseTo(heights[mid + d], 0);
    }
  });
});

describe('gradient monotonicity', () => {

  it.each([5, 7, 10])('n=%i: heights decrease with distance from hovered', (n) => {
    const total = n * cfg.baseHeight;
    const mid = Math.floor(n / 2);
    const heights = computeFisheyeHeights(n, mid, total, cfg);
    // Check both directions
    for (let d = 1; d < mid; d++) {
      expect(heights[mid + d]).toBeLessThanOrEqual(heights[mid + d - 1] + EPSILON);
      expect(heights[mid - d]).toBeLessThanOrEqual(heights[mid - d + 1] + EPSILON);
    }
  });
});
