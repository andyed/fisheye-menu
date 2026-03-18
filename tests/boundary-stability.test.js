/**
 * Tier 2: The goalpost invariant
 *
 * Core claim: "the boundary between the hovered item and its next neighbor
 * NEVER moves toward the mouse."
 *
 * For a vertical menu where the mouse is above the boundary it's heading toward,
 * the bottom edge of the hovered item must not move UPWARD compared to where it
 * was in the default (no-hover) layout. Moving down (away from mouse) is fine.
 *
 * If these tests fail, the invariant is violated and the implementation
 * needs a boundary-pinning pass after weight normalization.
 */
import { describe, it, expect } from 'vitest';
import {
  computeFisheyeHeights,
  computeDefaultHeights,
  cumulativeBoundaries,
  DEFAULT_CONFIG,
} from '../fisheye-core.js';

const cfg = DEFAULT_CONFIG;
const EPSILON = 0.01;

const testCases = [];
for (const n of [3, 5, 7, 9, 12]) {
  const totalHeight = n * cfg.baseHeight;
  for (const hovIdx of [0, 1, Math.floor(n / 2), n - 2, n - 1]) {
    if (hovIdx >= 0 && hovIdx < n) {
      testCases.push({ n, totalHeight, hovIdx });
    }
  }
}

describe('boundary stability — goalpost invariant', () => {

  it.each(testCases)(
    'n=$n, hovered=$hovIdx: bottom boundary of hovered item does not move upward',
    ({ n, totalHeight, hovIdx }) => {
      const defaultHeights = computeDefaultHeights(n, totalHeight, cfg);
      const fisheyeHeights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);

      const defaultBounds = cumulativeBoundaries(defaultHeights);
      const fisheyeBounds = cumulativeBoundaries(fisheyeHeights);

      // The bottom edge of the hovered item = boundary at hovIdx + 1.
      // It must not move upward (toward the mouse approaching from above).
      expect(fisheyeBounds[hovIdx + 1]).toBeGreaterThanOrEqual(
        defaultBounds[hovIdx + 1] - EPSILON
      );
    }
  );

  it.each(testCases)(
    'n=$n, hovered=$hovIdx: top boundary of hovered item does not move downward',
    ({ n, totalHeight, hovIdx }) => {
      const defaultHeights = computeDefaultHeights(n, totalHeight, cfg);
      const fisheyeHeights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);

      const defaultBounds = cumulativeBoundaries(defaultHeights);
      const fisheyeBounds = cumulativeBoundaries(fisheyeHeights);

      // The top edge of the hovered item = boundary at hovIdx.
      // If the mouse approaches from below, this boundary must not move down.
      expect(fisheyeBounds[hovIdx]).toBeLessThanOrEqual(
        defaultBounds[hovIdx] + EPSILON
      );
    }
  );
});

describe('boundary stability — across config variations', () => {
  const configs = [
    { ...cfg, maxExpand: 2.0, label: 'low expand' },
    { ...cfg, maxExpand: 6.0, label: 'high expand' },
    { ...cfg, maxExpand: 4.4, falloffRadius: 1, label: 'narrow falloff' },
    { ...cfg, maxExpand: 4.4, falloffRadius: 6, label: 'wide falloff' },
  ];

  it.each(configs)('$label: invariant holds for middle item of 7', (config) => {
    const n = 7;
    const total = n * config.baseHeight;
    const hovIdx = 3;

    const defaultHeights = computeDefaultHeights(n, total, config);
    const fisheyeHeights = computeFisheyeHeights(n, hovIdx, total, config);
    const defB = cumulativeBoundaries(defaultHeights);
    const fisB = cumulativeBoundaries(fisheyeHeights);

    expect(fisB[hovIdx + 1]).toBeGreaterThanOrEqual(defB[hovIdx + 1] - EPSILON);
    expect(fisB[hovIdx]).toBeLessThanOrEqual(defB[hovIdx] + EPSILON);
  });
});
