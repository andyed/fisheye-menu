/**
 * Tier 3: Steering triangle geometry
 */
import { describe, it, expect } from 'vitest';
import { pointInTriangle } from '../fisheye-core.js';

describe('pointInTriangle', () => {

  // Standard triangle: (0,0), (10,0), (5,10)
  const a = { x: 0, y: 0 };
  const b = { x: 10, y: 0 };
  const c = { x: 5, y: 10 };

  it('point inside → true', () => {
    expect(pointInTriangle(5, 3, a, b, c)).toBe(true);
  });

  it('point outside (above) → false', () => {
    expect(pointInTriangle(5, -1, a, b, c)).toBe(false);
  });

  it('point outside (right) → false', () => {
    expect(pointInTriangle(11, 5, a, b, c)).toBe(false);
  });

  it('point at vertex → true', () => {
    expect(pointInTriangle(0, 0, a, b, c)).toBe(true);
    expect(pointInTriangle(10, 0, a, b, c)).toBe(true);
    expect(pointInTriangle(5, 10, a, b, c)).toBe(true);
  });

  it('point on edge → true', () => {
    expect(pointInTriangle(5, 0, a, b, c)).toBe(true); // midpoint of a-b
  });
});

describe('steering corridor scenario', () => {
  // Simulates a flyout to the right of a parent panel.
  // Parent right edge at x=220, flyout left at x=222.
  // Flyout spans y=100 to y=300.
  // Cursor starts at (200, 150).
  const cursor = { x: 200, y: 150 };
  const topCorner = { x: 222, y: 100 };
  const bottomCorner = { x: 222, y: 300 };

  it('point moving toward flyout (diagonal right-down) → inside', () => {
    expect(pointInTriangle(210, 160, cursor, topCorner, bottomCorner)).toBe(true);
    expect(pointInTriangle(215, 180, cursor, topCorner, bottomCorner)).toBe(true);
    expect(pointInTriangle(220, 200, cursor, topCorner, bottomCorner)).toBe(true);
  });

  it('point above flyout → outside', () => {
    expect(pointInTriangle(210, 90, cursor, topCorner, bottomCorner)).toBe(false);
  });

  it('point moving away from flyout (left) → outside', () => {
    expect(pointInTriangle(190, 200, cursor, topCorner, bottomCorner)).toBe(false);
  });

  it('point below the corridor → outside', () => {
    expect(pointInTriangle(210, 310, cursor, topCorner, bottomCorner)).toBe(false);
  });

  it('point above the corridor (steep upward angle) → outside', () => {
    expect(pointInTriangle(210, 100, cursor, topCorner, bottomCorner)).toBe(false);
  });
});
