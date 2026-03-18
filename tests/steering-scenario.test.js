/**
 * Tier 4: Simulated mouse trajectories from parent menu to flyout
 *
 * Validates that as the mouse moves diagonally from a parent menu item
 * toward a flyout submenu target, the fisheye height redistribution at
 * each step never moves the flyout target's boundary out from under the
 * planned y-coordinate.
 *
 * The simulation:
 * 1. Parent menu opens, default heights computed
 * 2. Mouse hovers parent item → flyout opens, flyout default heights computed
 * 3. User plans to reach flyout target item → target y = center of that item
 * 4. Mouse moves diagonally in N steps from parent item to flyout target
 * 5. At each step, the parent panel recomputes fisheye heights based on
 *    which parent item the mouse y falls in
 * 6. The flyout also recomputes fisheye heights as the mouse enters it
 * 7. At the final step, the target item's boundary range must contain
 *    the planned target y
 */
import { describe, it, expect } from 'vitest';
import {
  computeFisheyeHeights,
  computeDefaultHeights,
  cumulativeBoundaries,
  itemIndexAtY,
  DEFAULT_CONFIG,
} from '../fisheye-core.js';

const cfg = DEFAULT_CONFIG;

/**
 * Simulate a diagonal mouse move and check target validity at each step.
 *
 * @param {object} params
 * @param {number} params.parentN       - Number of parent menu items
 * @param {number} params.triggerIdx    - Parent item that opens the flyout
 * @param {number} params.flyoutN      - Number of flyout items
 * @param {number} params.targetIdx    - Flyout item the user wants to reach
 * @param {number} params.steps        - Number of intermediate mouse positions
 */
function simulateSteering({ parentN, triggerIdx, flyoutN, targetIdx, steps = 10 }) {
  const parentTotal = parentN * cfg.baseHeight;
  const flyoutTotal = flyoutN * cfg.baseHeight;

  // Step 1: Parent default layout
  const parentDefault = computeDefaultHeights(parentN, parentTotal, cfg);
  const parentDefaultBounds = cumulativeBoundaries(parentDefault);

  // Step 2: Mouse is on triggerIdx — compute fisheye for parent
  const parentFisheye = computeFisheyeHeights(parentN, triggerIdx, parentTotal, cfg);
  const parentFisheyeBounds = cumulativeBoundaries(parentFisheye);

  // Flyout opens — its default layout determines the initial target position
  const flyoutDefault = computeDefaultHeights(flyoutN, flyoutTotal, cfg);
  const flyoutDefaultBounds = cumulativeBoundaries(flyoutDefault);

  // The y-coordinate the user is aiming for: center of targetIdx in flyout's default layout
  const flyoutTop = parentFisheyeBounds[triggerIdx]; // flyout aligned with trigger item
  const targetY = flyoutTop + flyoutDefaultBounds[targetIdx] + flyoutDefault[targetIdx] / 2;

  // Start position: center of trigger item in parent
  const startX = 100; // arbitrary, parent panel area
  const startY = parentFisheyeBounds[triggerIdx] + parentFisheye[triggerIdx] / 2;

  // End position: center of target in flyout
  const endX = 230; // past the flyout left edge
  const endY = targetY;

  // Flyout left edge (where mouse transitions from parent to flyout space)
  const flyoutLeftX = 220;

  const results = [];

  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const mx = startX + (endX - startX) * t;
    const my = startY + (endY - startY) * t;

    if (mx < flyoutLeftX) {
      // Mouse is still in parent panel space
      // Which parent item is the mouse over?
      const parentHov = itemIndexAtY(my, parentFisheye);
      // Recompute parent fisheye (this changes as mouse crosses items)
      const newParentHeights = computeFisheyeHeights(parentN, parentHov, parentTotal, cfg);
      results.push({
        step: s, t, mx, my,
        zone: 'parent',
        hoveredParent: parentHov,
        parentHeights: newParentHeights,
      });
    } else {
      // Mouse is in flyout space
      const flyoutMouseY = my - flyoutTop;
      const flyoutHov = itemIndexAtY(flyoutMouseY, flyoutDefault);
      // Flyout recomputes with fisheye
      const newFlyoutHeights = computeFisheyeHeights(flyoutN, flyoutHov, flyoutTotal, cfg);
      const newFlyoutBounds = cumulativeBoundaries(newFlyoutHeights);

      // Does the target item's range still contain the planned targetY?
      const targetTop = flyoutTop + newFlyoutBounds[targetIdx];
      const targetBottom = flyoutTop + newFlyoutBounds[targetIdx + 1];

      results.push({
        step: s, t, mx, my,
        zone: 'flyout',
        hoveredFlyout: flyoutHov,
        flyoutHeights: newFlyoutHeights,
        targetTop,
        targetBottom,
        targetYPlanned: targetY,
        targetContainsMouse: my >= targetTop && my <= targetBottom,
      });
    }
  }

  return results;
}

// ── Test cases ─────────────────────────────────────────────────

const scenarios = [
  // Basic cases
  { parentN: 5, triggerIdx: 0, flyoutN: 5, targetIdx: 0, label: 'top→top' },
  { parentN: 5, triggerIdx: 0, flyoutN: 5, targetIdx: 4, label: 'top→bottom (steep)' },
  { parentN: 5, triggerIdx: 2, flyoutN: 5, targetIdx: 2, label: 'mid→mid (straight)' },
  { parentN: 5, triggerIdx: 4, flyoutN: 5, targetIdx: 0, label: 'bottom→top (upward)' },

  // Deep menus (more items = more compression)
  { parentN: 12, triggerIdx: 0, flyoutN: 10, targetIdx: 9, label: '12-item parent, top→far bottom' },
  { parentN: 12, triggerIdx: 6, flyoutN: 10, targetIdx: 5, label: '12-item parent, mid→mid' },
  { parentN: 12, triggerIdx: 11, flyoutN: 10, targetIdx: 0, label: '12-item parent, bottom→top' },

  // Small menus
  { parentN: 3, triggerIdx: 1, flyoutN: 3, targetIdx: 2, label: '3-item, mid→bottom' },

  // Asymmetric
  { parentN: 7, triggerIdx: 1, flyoutN: 12, targetIdx: 11, label: '7→12, near-top→far-bottom' },
  { parentN: 7, triggerIdx: 5, flyoutN: 3, targetIdx: 0, label: '7→3, low→top' },
];

describe('steering trajectory — target reachability', () => {

  it.each(scenarios)('$label (parent=$parentN, flyout=$flyoutN)', (scenario) => {
    const results = simulateSteering({ ...scenario, steps: 15 });

    // Check: at the final step (mouse at destination), is the mouse
    // within the target item's bounds?
    const finalSteps = results.filter(r => r.zone === 'flyout');

    // There should be at least one flyout step
    expect(finalSteps.length).toBeGreaterThan(0);

    const last = finalSteps[finalSteps.length - 1];
    // The mouse y at the final position should be within the target item range.
    // This validates that fisheye redistribution didn't push the target away.
    expect(last.my).toBeGreaterThanOrEqual(last.targetTop - 0.5);
    expect(last.my).toBeLessThanOrEqual(last.targetBottom + 0.5);
  });
});

describe('steering trajectory — parent boundary stability during traversal', () => {

  it.each(scenarios)('$label: parent items don\'t violate boundary invariant during steering', (scenario) => {
    const results = simulateSteering({ ...scenario, steps: 15 });
    const parentSteps = results.filter(r => r.zone === 'parent');
    const parentTotal = scenario.parentN * cfg.baseHeight;

    for (const step of parentSteps) {
      // Total height preserved at every step
      const sum = step.parentHeights.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(parentTotal, 0);

      // All items above minimum
      for (const h of step.parentHeights) {
        expect(h).toBeGreaterThanOrEqual(cfg.minHeight - 0.01);
      }
    }
  });
});
