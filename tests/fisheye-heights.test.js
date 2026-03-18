/**
 * Tier 1: Pure math invariants for computeFisheyeHeights
 */
import { describe, it, expect } from 'vitest';
import {
  computeFisheyeHeights,
  computeDefaultHeights,
  DEFAULT_CONFIG,
} from '../fisheye-core.js';

const cfg = DEFAULT_CONFIG;
const EPSILON = 0.01; // floating-point tolerance

const itemCounts = [1, 2, 3, 5, 7, 9, 12];

describe('computeFisheyeHeights — basic properties', () => {

  it('returns empty array for n=0', () => {
    expect(computeFisheyeHeights(0, -1, 100, cfg)).toEqual([]);
  });

  describe.each(itemCounts)('n=%i items', (n) => {
    const totalHeight = n * cfg.baseHeight;

    it('total height is preserved (no hover)', () => {
      const heights = computeFisheyeHeights(n, -1, totalHeight, cfg);
      const sum = heights.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(totalHeight, 1);
    });

    it.each(
      [0, Math.floor(n / 2), n - 1].filter(i => i >= 0 && i < n)
    )('total height preserved when hovering item %i', (hovIdx) => {
      const heights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);
      const sum = heights.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(totalHeight, 1);
    });

    it('all heights >= minHeight', () => {
      for (let hovIdx = 0; hovIdx < n; hovIdx++) {
        const heights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);
        heights.forEach((h, i) => {
          expect(h).toBeGreaterThanOrEqual(cfg.minHeight - EPSILON);
        });
      }
    });

    it.each(
      [0, Math.floor(n / 2), n - 1].filter(i => i >= 0 && i < n)
    )('hovered item %i is the tallest', (hovIdx) => {
      const heights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);
      const hovHeight = heights[hovIdx];
      heights.forEach((h, i) => {
        if (i !== hovIdx) {
          expect(hovHeight).toBeGreaterThanOrEqual(h - EPSILON);
        }
      });
    });

    if (n > 1 && n <= 9) {
      // Monotonic falloff holds for small menus. For larger menus (n>9),
      // boundary pinning may redistribute heights non-monotonically —
      // the goalpost invariant takes priority over smooth falloff.
      it('monotonic falloff from hovered item (within falloff radius)', () => {
        const hovIdx = Math.floor(n / 2);
        const heights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);
        for (let d = 1; d < Math.min(cfg.falloffRadius, n - hovIdx); d++) {
          expect(heights[hovIdx + d - 1]).toBeGreaterThanOrEqual(heights[hovIdx + d] - EPSILON);
        }
        for (let d = 1; d < Math.min(cfg.falloffRadius, hovIdx + 1); d++) {
          expect(heights[hovIdx - d + 1]).toBeGreaterThanOrEqual(heights[hovIdx - d] - EPSILON);
        }
      });
    }
  });
});

describe('computeDefaultHeights — top-heavy distribution', () => {

  it.each(itemCounts.filter(n => n > 1))('n=%i: first item taller than last', (n) => {
    const totalHeight = n * cfg.baseHeight;
    const heights = computeDefaultHeights(n, totalHeight, cfg);
    expect(heights[0]).toBeGreaterThan(heights[n - 1]);
  });

  it.each(itemCounts)('n=%i: total preserved', (n) => {
    const totalHeight = n * cfg.baseHeight;
    const heights = computeDefaultHeights(n, totalHeight, cfg);
    const sum = heights.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(totalHeight, 1);
  });
});

describe('config variations', () => {

  it('higher maxExpand produces taller hovered item', () => {
    const n = 7;
    const total = n * 28;
    const h1 = computeFisheyeHeights(n, 3, total, { ...cfg, maxExpand: 2.0 });
    const h2 = computeFisheyeHeights(n, 3, total, { ...cfg, maxExpand: 6.0 });
    expect(h2[3]).toBeGreaterThan(h1[3]);
  });

  it('larger falloffRadius spreads the expansion wider', () => {
    const n = 12;
    const total = n * 28;
    const narrow = computeFisheyeHeights(n, 6, total, { ...cfg, falloffRadius: 1 });
    const wide = computeFisheyeHeights(n, 6, total, { ...cfg, falloffRadius: 5 });
    // With wider falloff, items at distance 3 should be taller
    expect(wide[9]).toBeGreaterThan(narrow[9]);
  });
});
