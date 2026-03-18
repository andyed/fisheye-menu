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
    )('hovered item %i is among the tallest', (hovIdx) => {
      const heights = computeFisheyeHeights(n, hovIdx, totalHeight, cfg);
      const hovHeight = heights[hovIdx];
      // Hovered item should be at least as tall as any item outside
      // the immediate falloff radius
      heights.forEach((h, i) => {
        const dist = Math.abs(i - hovIdx);
        if (dist > 1) {
          expect(hovHeight).toBeGreaterThanOrEqual(h - EPSILON);
        }
      });
    });

    if (n > 1 && n <= 7) {
      // Monotonic falloff holds for small menus. For larger menus,
      // boundary pinning may redistribute heights non-monotonically.
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

describe('computeDefaultHeights — uniform distribution', () => {

  it.each(itemCounts.filter(n => n > 1))('n=%i: all items equal height', (n) => {
    const totalHeight = n * cfg.baseHeight;
    const heights = computeDefaultHeights(n, totalHeight, cfg);
    const expected = totalHeight / n;
    heights.forEach(h => expect(h).toBeCloseTo(expected, 5));
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
    // Use first item where boundary pinning is minimal (no items above to shift)
    const n = 7;
    const total = n * 28;
    const h1 = computeFisheyeHeights(n, 0, total, { ...cfg, maxExpand: 1.5 });
    const h2 = computeFisheyeHeights(n, 0, total, { ...cfg, maxExpand: 3.0 });
    expect(h2[0]).toBeGreaterThan(h1[0]);
  });

  it('larger falloffRadius spreads expansion wider', () => {
    const n = 5;
    const total = n * 28;
    const narrow = computeFisheyeHeights(n, 2, total, { ...cfg, falloffRadius: 1 });
    const wide = computeFisheyeHeights(n, 2, total, { ...cfg, falloffRadius: 4 });
    // With wider falloff, item at distance 2 should be taller
    expect(wide[0]).toBeGreaterThanOrEqual(narrow[0]);
  });
});
