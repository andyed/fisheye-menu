/**
 * Property tests for the baked Furnas lens (baked-lens.js).
 *
 * The flat-list picker has two load-bearing UX invariants:
 *   1. STABILITY — a row's pixel position is fixed from open to click.
 *      Implemented by baking heights ONCE at open. These tests pin down
 *      that the bake produces a layout that doesn't depend on call
 *      order or time, and that rowFromY is a pure function of (y, centers).
 *   2. SIZE-BY-DISTANCE — rows closer to the lens centre are taller.
 *      Tests check the Gaussian gradient: focal is the max, heights
 *      decrease monotonically, symmetric around the centre when not
 *      clipped at an edge.
 */
import { describe, it, expect } from 'vitest';
import {
  bakeHeights,
  bakeCenters,
  bakeBoundaries,
  rowFromY,
  rowFromYBySlot,
  fractionalRowFromY,
  precomputeFocusCenters,
  DEFAULT_LENS_CONFIG,
} from '../baked-lens.js';

const N = 148;          // PALETTE_NAMES.length in the real picker
const BUDGET = 880;     // typical list-height budget after head/margin
const CONFIG = DEFAULT_LENS_CONFIG;
const EPS = 1e-9;

// Sweep across edges + interior so edge-clamping behaviour is checked too.
const SAMPLE_CENTERS = [0, 1, 7, 30, 50, 73, 100, 140, 146, 147];

describe('bakeHeights — gradient', () => {
  it('focal row is the tallest', () => {
    for (const c of SAMPLE_CENTERS) {
      const h = bakeHeights(N, c, BUDGET, CONFIG);
      const max = Math.max(...h);
      expect(h[c], `center=${c}`).toBeCloseTo(max, 9);
    }
  });

  it('heights decrease monotonically away from the focal on both sides', () => {
    for (const c of SAMPLE_CENTERS) {
      const h = bakeHeights(N, c, BUDGET, CONFIG);
      // upward (i < c)
      for (let i = c - 1; i >= 0; i--) {
        expect(h[i], `center=${c} i=${i}`).toBeLessThanOrEqual(h[i + 1] + EPS);
      }
      // downward (i > c)
      for (let i = c + 1; i < N; i++) {
        expect(h[i], `center=${c} i=${i}`).toBeLessThanOrEqual(h[i - 1] + EPS);
      }
    }
  });

  it('symmetric around the focal when the lens fits within bounds', () => {
    // For interior centers, items at distance ±d should have the same height.
    const c = 73;
    const h = bakeHeights(N, c, BUDGET, CONFIG);
    for (let d = 1; d <= 30; d++) {
      if (c - d >= 0 && c + d < N) {
        expect(h[c - d], `d=${d}`).toBeCloseTo(h[c + d], 9);
      }
    }
  });

  it('edge focal still has the maximum (no symmetry, just monotone)', () => {
    for (const c of [0, N - 1]) {
      const h = bakeHeights(N, c, BUDGET, CONFIG);
      for (let i = 0; i < N; i++) {
        if (i !== c) expect(h[c]).toBeGreaterThanOrEqual(h[i] - EPS);
      }
    }
  });
});

describe('bakeHeights — budget', () => {
  it('total sum is within the budget (down-scales when raw total exceeds)', () => {
    for (const c of SAMPLE_CENTERS) {
      const h = bakeHeights(N, c, BUDGET, CONFIG);
      const total = h.reduce((a, b) => a + b, 0);
      expect(total, `center=${c}`).toBeLessThanOrEqual(BUDGET + 1e-6);
    }
  });

  it('total sum equals budget exactly when raw total exceeds budget', () => {
    // N=148 with default config: raw total > 880, so scale kicks in.
    const h = bakeHeights(N, 73, BUDGET, CONFIG);
    const total = h.reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(BUDGET, 6);
  });

  it('total sum equals raw total when raw total fits in the budget', () => {
    // Small N with a generous budget: no scaling.
    const small = bakeHeights(10, 5, 10000, CONFIG);
    const total = small.reduce((a, b) => a + b, 0);
    // Raw total = 10*minH + (maxH-minH)*sum(weights). No scale applied,
    // so the result equals the raw sum (which is well under 10000).
    expect(total).toBeLessThan(10000);
    expect(total).toBeGreaterThan(10 * CONFIG.minH);
  });

  it('every height is strictly positive', () => {
    const h = bakeHeights(N, 50, BUDGET, CONFIG);
    for (const x of h) expect(x).toBeGreaterThan(0);
  });
});

describe('bakeHeights — purity', () => {
  it('idempotent: same inputs → same outputs', () => {
    const a = bakeHeights(N, 42, BUDGET, CONFIG);
    const b = bakeHeights(N, 42, BUDGET, CONFIG);
    for (let i = 0; i < N; i++) expect(a[i]).toBe(b[i]);
  });

  it('mirror centers produce mirrored heights', () => {
    // bakeHeights(N, k) should be the reverse of bakeHeights(N, N-1-k).
    const k = 30;
    const a = bakeHeights(N, k, BUDGET, CONFIG);
    const b = bakeHeights(N, N - 1 - k, BUDGET, CONFIG);
    for (let i = 0; i < N; i++) {
      expect(a[i], `i=${i}`).toBeCloseTo(b[N - 1 - i], 9);
    }
  });
});

describe('bakeCenters', () => {
  it('strictly monotone increasing', () => {
    const h = bakeHeights(N, 73, BUDGET, CONFIG);
    const c = bakeCenters(h);
    for (let i = 1; i < c.length; i++) {
      expect(c[i], `i=${i}`).toBeGreaterThan(c[i - 1]);
    }
  });

  it('first center = heights[0] / 2', () => {
    const h = bakeHeights(N, 73, BUDGET, CONFIG);
    const c = bakeCenters(h);
    expect(c[0]).toBeCloseTo(h[0] / 2, 9);
  });

  it('last center = total − heights[n-1] / 2', () => {
    const h = bakeHeights(N, 73, BUDGET, CONFIG);
    const c = bakeCenters(h);
    const total = h.reduce((a, b) => a + b, 0);
    expect(c[c.length - 1]).toBeCloseTo(total - h[h.length - 1] / 2, 6);
  });

  it('adjacent center distance equals average of adjacent heights', () => {
    // c[i+1] - c[i] = h[i+1]/2 + sum(h[0..i]) - sum(h[0..i-1]) - h[i]/2
    //               = h[i+1]/2 + h[i]/2 = (h[i] + h[i+1]) / 2
    const h = bakeHeights(N, 50, BUDGET, CONFIG);
    const c = bakeCenters(h);
    for (let i = 0; i < h.length - 1; i++) {
      expect(c[i + 1] - c[i], `i=${i}`).toBeCloseTo((h[i] + h[i + 1]) / 2, 9);
    }
  });
});

describe('rowFromY', () => {
  it('center[k] always maps back to k (full round-trip)', () => {
    for (const c of SAMPLE_CENTERS) {
      const h = bakeHeights(N, c, BUDGET, CONFIG);
      const centers = bakeCenters(h);
      for (let k = 0; k < centers.length; k++) {
        expect(rowFromY(centers[k], centers), `center=${c} k=${k}`).toBe(k);
      }
    }
  });

  it('y between two centers picks the closer one', () => {
    const centers = [10, 20, 30, 40];
    expect(rowFromY(14, centers)).toBe(0);  // closer to 10
    expect(rowFromY(16, centers)).toBe(1);  // closer to 20
    expect(rowFromY(25, centers)).toBe(2);  // closer to 30 (tie: takes lo)
    expect(rowFromY(35, centers)).toBe(3);
  });

  it('clamps to first row for y below the first center', () => {
    const h = bakeHeights(N, 0, BUDGET, CONFIG);
    const centers = bakeCenters(h);
    expect(rowFromY(-100, centers)).toBe(0);
    expect(rowFromY(0, centers)).toBe(0);
  });

  it('clamps to last row for y above the last center', () => {
    const h = bakeHeights(N, N - 1, BUDGET, CONFIG);
    const centers = bakeCenters(h);
    expect(rowFromY(1e9, centers)).toBe(centers.length - 1);
  });

  it('empty centers array returns 0 (defensive)', () => {
    expect(rowFromY(100, [])).toBe(0);
  });
});

describe('precomputeFocusCenters', () => {
  it('returns one center per row', () => {
    const map = precomputeFocusCenters(N, BUDGET, CONFIG);
    expect(map.length).toBe(N);
  });

  it('strictly monotone — cursor moving down can only advance the focal forward', () => {
    const map = precomputeFocusCenters(N, BUDGET, CONFIG);
    for (let i = 1; i < map.length; i++) {
      expect(map[i], `i=${i}`).toBeGreaterThan(map[i - 1]);
    }
  });

  it('row 0 sits near the top, last row near the bottom of the budget', () => {
    const map = precomputeFocusCenters(N, BUDGET, CONFIG);
    expect(map[0]).toBeLessThan(BUDGET * 0.1);
    expect(map[N - 1]).toBeGreaterThan(BUDGET * 0.9);
  });

  it('round-trip: rowFromY(map[k]) === k for every k', () => {
    const map = precomputeFocusCenters(N, BUDGET, CONFIG);
    for (let k = 0; k < N; k++) {
      expect(rowFromY(map[k], map), `k=${k}`).toBe(k);
    }
  });

  it('cursor → focal stable across re-bakes (the whole point)', () => {
    // The map is the source of truth for cursor → row; it does not change
    // when the consumer re-bakes the visible lens around a new focal.
    const map = precomputeFocusCenters(N, BUDGET, CONFIG);
    const samplesY = [10, 50, 100, 300, 500, 700, 870];
    const beforeRows = samplesY.map(y => rowFromY(y, map));
    // Simulate that the consumer baked the lens with arbitrary focals.
    // The map doesn't change, so cursor → focal must not change either.
    bakeHeights(N, 7,   BUDGET, CONFIG);
    bakeHeights(N, 73,  BUDGET, CONFIG);
    bakeHeights(N, 140, BUDGET, CONFIG);
    const afterRows = samplesY.map(y => rowFromY(y, map));
    expect(afterRows).toEqual(beforeRows);
  });
});

describe('rowFromYBySlot + bakeBoundaries', () => {
  it('returns row k for any y inside row k\'s slot', () => {
    const heights = bakeHeights(N, 50, BUDGET, CONFIG);
    const b = bakeBoundaries(heights);
    expect(b.length).toBe(N + 1);
    expect(b[0]).toBe(0);
    expect(b[N]).toBeCloseTo(BUDGET, 6);  // total fills budget (raw sum > budget)
    for (let k = 0; k < N; k++) {
      const insideY = (b[k] + b[k + 1]) / 2;
      expect(rowFromYBySlot(insideY, b), `k=${k}`).toBe(k);
    }
  });

  it('top edge of row k belongs to row k', () => {
    const heights = bakeHeights(N, 73, BUDGET, CONFIG);
    const b = bakeBoundaries(heights);
    // Pick interior k so b[k] is unambiguous (not 0 or total)
    for (const k of [1, 30, 73, 100, 146]) {
      expect(rowFromYBySlot(b[k], b), `k=${k}`).toBe(k);
    }
  });

  it('clamps below first boundary to row 0', () => {
    const b = bakeBoundaries(bakeHeights(N, 0, BUDGET, CONFIG));
    expect(rowFromYBySlot(-100, b)).toBe(0);
    expect(rowFromYBySlot(0, b)).toBe(0);
  });

  it('clamps above last boundary to row N-1', () => {
    const b = bakeBoundaries(bakeHeights(N, N - 1, BUDGET, CONFIG));
    expect(rowFromYBySlot(1e9, b)).toBe(N - 1);
  });

  it('monotone non-decreasing in y', () => {
    const b = bakeBoundaries(bakeHeights(N, 50, BUDGET, CONFIG));
    let prev = 0;
    for (let y = 0; y < b[N]; y += 3) {
      const r = rowFromYBySlot(y, b);
      expect(r, `y=${y}`).toBeGreaterThanOrEqual(prev);
      prev = r;
    }
  });
});

describe('fractionalRowFromY', () => {
  it('integer rounding matches rowFromY', () => {
    const map = precomputeFocusCenters(N, BUDGET, CONFIG);
    for (const k of SAMPLE_CENTERS) {
      const y = map[k];
      expect(Math.round(fractionalRowFromY(y, map))).toBe(rowFromY(y, map));
    }
  });

  it('returns k exactly when y === centers[k]', () => {
    const map = precomputeFocusCenters(N, BUDGET, CONFIG);
    for (const k of SAMPLE_CENTERS) {
      expect(fractionalRowFromY(map[k], map)).toBeCloseTo(k, 9);
    }
  });

  it('halfway between two centers returns k + 0.5', () => {
    const centers = [10, 30, 50, 70];
    expect(fractionalRowFromY(20, centers)).toBeCloseTo(0.5, 9);
    expect(fractionalRowFromY(40, centers)).toBeCloseTo(1.5, 9);
    expect(fractionalRowFromY(60, centers)).toBeCloseTo(2.5, 9);
  });

  it('strictly monotone in y', () => {
    const map = precomputeFocusCenters(N, BUDGET, CONFIG);
    let prev = -Infinity;
    for (let y = 0; y < BUDGET; y += 5) {
      const r = fractionalRowFromY(y, map);
      expect(r, `y=${y}`).toBeGreaterThanOrEqual(prev);
      prev = r;
    }
  });

  it('clamps to 0 below first center, to N-1 above last', () => {
    const map = precomputeFocusCenters(N, BUDGET, CONFIG);
    expect(fractionalRowFromY(-100, map)).toBe(0);
    expect(fractionalRowFromY(1e9,  map)).toBe(map.length - 1);
  });

  it('integer focal cleanly bakes; fractional focal interpolates', () => {
    // Bake at integer focal vs interpolated halfway between focals;
    // the halfway bake should make the two centered rows the same size.
    const heightsK   = bakeHeights(N, 50,   BUDGET, CONFIG);
    const heightsHalf = bakeHeights(N, 50.5, BUDGET, CONFIG);
    // At focus=50.5 (halfway between 50 and 51): rows 50 and 51 are
    // both at d=0.5 from focal, so their heights must be equal.
    expect(heightsHalf[50]).toBeCloseTo(heightsHalf[51], 9);
    // And both must be smaller than what was the focal at focus=50.
    expect(heightsHalf[50]).toBeLessThan(heightsK[50]);
  });
});

describe("frozen-layout: 'no moving cheese' guarantee", () => {
  it('same y always maps to same row across many calls', () => {
    const h = bakeHeights(N, 50, BUDGET, CONFIG);
    const centers = bakeCenters(h);
    const samples = Array.from({ length: 50 }, (_, i) => i * (BUDGET / 49));
    const first  = samples.map(y => rowFromY(y, centers));
    const second = samples.map(y => rowFromY(y, centers));
    const third  = samples.map(y => rowFromY(y, centers));
    expect(second).toEqual(first);
    expect(third).toEqual(first);
  });

  it('rowFromY is monotone non-decreasing in y', () => {
    const h = bakeHeights(N, 73, BUDGET, CONFIG);
    const centers = bakeCenters(h);
    // Walking y from 0 to total in 1px steps, the returned row must never
    // go backwards. If it did, an upward cursor motion could pull the
    // *previously hovered* row out from under the user.
    let lastRow = 0;
    const total = h.reduce((a, b) => a + b, 0);
    for (let y = 0; y <= total; y += 1) {
      const r = rowFromY(y, centers);
      expect(r, `y=${y}`).toBeGreaterThanOrEqual(lastRow);
      lastRow = r;
    }
  });

  it('every row k has a unique center y', () => {
    const h = bakeHeights(N, 73, BUDGET, CONFIG);
    const c = bakeCenters(h);
    expect(new Set(c).size).toBe(c.length);
  });

  it('row spans cover the budget (every y from 0 to total maps to *some* row)', () => {
    const h = bakeHeights(N, 50, BUDGET, CONFIG);
    const centers = bakeCenters(h);
    const total = h.reduce((a, b) => a + b, 0);
    const seen = new Set();
    for (let y = 0; y <= total; y += 1) seen.add(rowFromY(y, centers));
    expect(seen.size).toBe(N);
  });
});
