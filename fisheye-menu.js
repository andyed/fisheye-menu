/**
 * Fisheye Flyout Menu
 *
 * Fitts's law optimization for cascading menus:
 * - Items near the mouse get taller targets
 * - Items far from mouse compress
 * - Critical constraint: the boundary between the hovered item and its
 *   next neighbor NEVER moves toward the mouse. The goalpost stays put.
 * - Flyout submenus maintain a direct steering corridor from the parent.
 *
 * Layout algorithm:
 *   Given N items in a fixed total height, the default distribution
 *   gives the first item the most height, decreasing linearly downward
 *   (top-heavy). On mousemove, heights redistribute so items near the
 *   cursor expand while distant items shrink — but the boundary edge
 *   closest to the mouse (the one you'd overshoot into) is pinned.
 */

import { MENUS } from './menu-data.js';
import {
  computeFisheyeHeights,
  computeDefaultHeights,
  pointInTriangle,
  cumulativeBoundaries,
  itemIndexAtY,
} from './fisheye-core.js';

// ── Configuration ──────────────────────────────────────────────
const CONFIG = {
  // Base item height when no fisheye active
  baseHeight: 28,
  // Maximum expansion factor for the hovered item
  maxExpand: 2.4,
  // Minimum compressed height (readability floor)
  minHeight: 21,
  // How many neighbors on each side get partial expansion
  falloffRadius: 4,
  // Transition duration in ms (CSS)
  transitionMs: 80,
  // Flyout horizontal offset from parent panel edge
  flyoutGap: 2,
  // Separator between items: false = none, 'line' = thin rule, 'groove' = 3D groove
  separator: 'line',
  // Separator color (CSS color value)
  separatorColor: 'rgba(255,255,255,0.08)',
  // Separator thickness in px
  separatorThickness: 1,
  // Font size range (px)
  baseFontSize: 14,
  minFontSize: 10,
};

const debugEl = document.getElementById('debug');
let openMenus = [];   // Stack of open panel elements
let activeBarItem = null;
let menuBarActive = false;  // Track if menu bar is in active (clicked) state

// ── DOM construction ───────────────────────────────────────────

/**
 * Create a menu panel from a data node's children.
 * @param {object[]} items - Array of { label, children?, swatch? }
 * @param {number} depth   - Nesting depth (0 = top-level dropdown)
 * @returns {HTMLElement}
 */
function createPanel(items, depth = 0) {
  const panel = document.createElement('div');
  panel.className = 'menu-panel';
  panel.dataset.depth = depth;

  const totalHeight = items.length * CONFIG.baseHeight;

  items.forEach((item, idx) => {
    if (item === '---') {
      const sep = document.createElement('div');
      sep.className = 'menu-separator';
      panel.appendChild(sep);
      return;
    }

    const el = document.createElement('div');
    el.className = 'menu-item';
    el.dataset.index = idx;
    el.style.height = CONFIG.baseHeight + 'px';

    // Color swatch for palette items
    if (item.swatch) {
      const sw = document.createElement('span');
      sw.className = 'swatch';
      sw.style.background = `rgb(${item.swatch.join(',')})`;
      el.appendChild(sw);
    }

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = item.label;
    el.appendChild(label);

    if (item.children && item.children.length > 0) {
      const arrow = document.createElement('span');
      arrow.className = 'arrow';
      arrow.textContent = '▶';
      el.appendChild(arrow);
    }

    // Apply separator style as bottom border (skips last item)
    if (CONFIG.separator && idx < items.length - 1) {
      const style = CONFIG.separator === 'groove'
        ? `groove ${CONFIG.separatorThickness}px ${CONFIG.separatorColor}`
        : `solid ${CONFIG.separatorThickness}px ${CONFIG.separatorColor}`;
      el.style.borderBottom = style;
    }

    el.addEventListener('mouseenter', (e) => {
      // Update lastMousePos from this event so the steering corridor
      // check uses the actual entry position, not a stale mousemove pos
      lastMousePos.x = e.clientX;
      lastMousePos.y = e.clientY;
      onItemEnter(panel, el, item, idx, depth);
    });

    panel.appendChild(el);
  });

  // Mousemove on the entire panel drives fisheye redistribution
  panel.addEventListener('mousemove', (e) => onPanelMouseMove(panel, e));
  panel.addEventListener('mouseleave', () => onPanelMouseLeave(panel));

  // Store metadata on the panel element
  panel._items = items;
  panel._itemEls = Array.from(panel.querySelectorAll('.menu-item'));
  panel._totalHeight = totalHeight;
  panel._depth = depth;

  // Append to DOM first (needed for offsetWidth measurement)
  document.body.appendChild(panel);

  // Pre-compute max width: measure each item individually at max font size,
  // take the widest, then lock. This avoids over-sizing for long labels that
  // will only ever be seen at base font when they're not hovered.
  // Actual max font: the tallest any item can get is ~1.75x baseHeight
  // (for small menus) down to ~1.4x (large menus). Use 1.8x as safe ceiling.
  const maxFontSize = CONFIG.baseHeight * 1.8 * 0.5;
  const itemEls = panel._itemEls;
  panel.style.visibility = 'hidden';
  panel.style.display = 'block';
  panel.style.width = 'auto';
  let maxItemWidth = 0;
  for (const el of itemEls) {
    el.style.fontSize = maxFontSize + 'px';
    maxItemWidth = Math.max(maxItemWidth, el.scrollWidth);
    el.style.fontSize = CONFIG.baseFontSize + 'px';
  }
  // Add padding (12px each side) + arrow space
  panel.style.width = (maxItemWidth + 24) + 'px';
  panel.style.display = '';
  panel.style.visibility = '';

  return panel;
}

// ── Fisheye application ────────────────────────────────────────

function onPanelMouseMove(panel, e) {
  const itemEls = panel._itemEls;
  if (!itemEls.length) return;

  // Find which item the mouse is over using actual rendered positions.
  // This is robust during CSS transitions where style.height and
  // rendered height diverge.
  const mouseY = e.clientY;
  let hoveredIdx = -1;
  for (let i = 0; i < itemEls.length; i++) {
    const rect = itemEls[i].getBoundingClientRect();
    if (mouseY >= rect.top && mouseY < rect.bottom) {
      hoveredIdx = i;
      break;
    }
  }

  // If mouse is between items (in padding/separator), keep last state
  if (hoveredIdx < 0) return;

  panel._lastHoveredIdx = hoveredIdx;
  const heights = computeFisheyeHeights(
    itemEls.length,
    hoveredIdx,
    panel._totalHeight,
    CONFIG
  );

  applyHeights(panel, heights);
  updateDebug(hoveredIdx, heights);

  // Keep steering triangle fresh as cursor moves
  updateSteeringCorridor(panel);
}

function onPanelMouseLeave(panel) {
  // While the menu bar is active, keep the last fisheye state.
  // Only reset if the menu system closes entirely.
  if (menuBarActive) return;
}

function applyHeights(panel, heights) {
  const itemEls = panel._itemEls;
  for (let i = 0; i < itemEls.length; i++) {
    const h = heights[i];
    itemEls[i].style.height = h + 'px';
    // Font = 50% of item height. Simple, visible, proportional.
    itemEls[i].style.fontSize = (h * 0.5) + 'px';
  }
}

// ── Steering corridor (anti-tunneling) ─────────────────────────
//
// When a flyout is open, the user needs safe passage from anywhere
// in the parent panel to any point in the flyout — without accidentally
// triggering other parent items along the diagonal path.
//
// We define a trapezoidal corridor: two triangles that together cover
// the region from the trigger item's vertical span (on the parent's
// right edge) to the flyout's full height (on the flyout's left edge).
// Any mouse position inside this corridor suppresses item-enter events.
//
// The corridor expands as you move right (toward the flyout), giving
// full angular freedom to reach any flyout item from the trigger.

let steeringCorridor = null;
// { triggerTop, triggerBottom, triggerX, flyoutTop, flyoutBottom, flyoutX }
let lastMousePos = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
  lastMousePos.x = e.clientX;
  lastMousePos.y = e.clientY;
});

function isInSteeringCorridor(mx, my) {
  if (!steeringCorridor) return false;
  const { triggerTop, triggerBottom, triggerX, flyoutTop, flyoutBottom, flyoutX } = steeringCorridor;

  // Must be between parent right edge and flyout left edge (horizontally)
  const minX = Math.min(triggerX, flyoutX);
  const maxX = Math.max(triggerX, flyoutX);
  if (mx < minX || mx > maxX) return false;

  // Lerp the vertical bounds based on horizontal progress.
  // At triggerX: allowed range is [triggerTop, triggerBottom]
  // At flyoutX: allowed range is [flyoutTop, flyoutBottom]
  // In between: linearly interpolate — the corridor expands as you
  // move toward the flyout.
  const dx = flyoutX - triggerX;
  if (Math.abs(dx) < 1) return true; // panels overlapping, allow all
  const t = (mx - triggerX) / dx;

  const allowedTop = triggerTop + (flyoutTop - triggerTop) * t;
  const allowedBottom = triggerBottom + (flyoutBottom - triggerBottom) * t;

  // Add vertical padding for motor imprecision
  return my >= allowedTop - 20 && my <= allowedBottom + 20;
}

function updateSteeringCorridor(parentPanel) {
  const parentDepth = parseInt(parentPanel.dataset.depth);
  const childPanel = openMenus.find(p => parseInt(p.dataset.depth) === parentDepth + 1);
  if (!childPanel) {
    steeringCorridor = null;
    return;
  }

  const flyoutRect = childPanel.getBoundingClientRect();
  const parentRect = parentPanel.getBoundingClientRect();

  const flyoutIsRight = flyoutRect.left >= parentRect.left;

  // Use the full parent panel height as the corridor's left edge.
  // This lets the user move from anywhere in the parent to anywhere
  // in the flyout without the corridor cutting them off.
  steeringCorridor = {
    triggerTop: parentRect.top,
    triggerBottom: parentRect.bottom,
    triggerX: flyoutIsRight ? parentRect.right : parentRect.left,
    flyoutTop: flyoutRect.top,
    flyoutBottom: flyoutRect.bottom,
    flyoutX: flyoutIsRight ? flyoutRect.left : flyoutRect.right,
  };
}

// ── Submenu (flyout) management ────────────────────────────────

let flyoutTimeout = null;

function onItemEnter(panel, el, item, idx, depth) {
  // If steering toward an open flyout, don't close it or switch
  if (isInSteeringCorridor(lastMousePos.x, lastMousePos.y)) {
    return;
  }

  // Close any flyouts deeper than this panel's depth
  closeFlyoutsAboveDepth(depth);
  steeringCorridor = null;

  if (!item.children || item.children.length === 0) return;

  // Small delay to prevent accidental flyout opens during fast sweeps
  clearTimeout(flyoutTimeout);
  flyoutTimeout = setTimeout(() => {
    openFlyout(panel, el, item, depth);
  }, 120);
}

function openFlyout(parentPanel, triggerEl, item, parentDepth) {
  // Store trigger element on parent so steering corridor knows the origin
  parentPanel._triggerEl = triggerEl;

  const childPanel = createPanel(item.children, parentDepth + 1);
  childPanel.classList.add('flyout', 'open');

  // Position: right edge of parent, aligned with the trigger item
  const parentRect = parentPanel.getBoundingClientRect();
  const triggerRect = triggerEl.getBoundingClientRect();

  let left = parentRect.right + CONFIG.flyoutGap;
  let top = triggerRect.top;

  // Keep on screen — use the pre-computed locked width
  const panelWidth = parseInt(childPanel.style.width) || 220;
  if (left + panelWidth > window.innerWidth) {
    left = parentRect.left - panelWidth - CONFIG.flyoutGap;
  }
  if (top + childPanel._totalHeight > window.innerHeight) {
    top = Math.max(4, window.innerHeight - childPanel._totalHeight - 4);
  }

  childPanel.style.left = left + 'px';
  childPanel.style.top = top + 'px';

  // Apply initial fisheye: bias toward the first item (mouse enters
  // from the trigger, which aligns with the flyout's top).
  const heights = computeFisheyeHeights(childPanel._itemEls.length, 0, childPanel._totalHeight, CONFIG);
  applyHeights(childPanel, heights);

  openMenus.push(childPanel);

  // Establish steering triangle so diagonal mouse movement
  // toward the flyout doesn't accidentally close it
  updateSteeringCorridor(parentPanel);
}

function closeFlyoutsAboveDepth(depth) {
  while (openMenus.length > 0) {
    const top = openMenus[openMenus.length - 1];
    if (parseInt(top.dataset.depth) > depth) {
      top.remove();
      openMenus.pop();
    } else {
      break;
    }
  }
}

function closeAllMenus() {
  openMenus.forEach(p => p.remove());
  openMenus = [];
  if (activeBarItem) {
    activeBarItem.classList.remove('active');
    activeBarItem = null;
  }
  menuBarActive = false;
  clearTimeout(flyoutTimeout);
}

// ── Menu bar setup ─────────────────────────────────────────────

function buildMenuBar() {
  const bar = document.getElementById('menubar');

  MENUS.forEach((menu) => {
    const barItem = document.createElement('div');
    barItem.className = 'menubar-item';
    barItem.textContent = menu.label;

    // Click to toggle
    barItem.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (activeBarItem === barItem && menuBarActive) {
        closeAllMenus();
      } else {
        openTopMenu(barItem, menu);
      }
    });

    // Hover-to-switch when menu bar is already active
    barItem.addEventListener('mouseenter', () => {
      if (menuBarActive && activeBarItem !== barItem) {
        openTopMenu(barItem, menu);
      }
    });

    bar.appendChild(barItem);
  });

  // Click outside closes everything
  document.addEventListener('mousedown', (e) => {
    if (menuBarActive && !e.target.closest('.menubar') && !e.target.closest('.menu-panel')) {
      closeAllMenus();
    }
  });

  // Escape closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMenus();
  });
}

function openTopMenu(barItem, menu) {
  closeAllMenus();

  activeBarItem = barItem;
  barItem.classList.add('active');
  menuBarActive = true;

  if (!menu.children || menu.children.length === 0) return;

  const panel = createPanel(menu.children, 0);
  panel.classList.add('open');

  // Position below the bar item
  const rect = barItem.getBoundingClientRect();
  panel.style.left = rect.left + 'px';
  panel.style.top = rect.bottom + 'px';

  // Apply initial fisheye centered on first item (mouse enters from top)
  const heights = computeFisheyeHeights(panel._itemEls.length, 0, panel._totalHeight, CONFIG);
  applyHeights(panel, heights);

  openMenus.push(panel);
}

// ── Debug display ──────────────────────────────────────────────

function updateDebug(hoveredIdx, heights) {
  if (!debugEl) return;
  const lines = heights.map((h, i) =>
    `${i === hoveredIdx ? '→' : ' '} [${i}] ${h.toFixed(1)}px`
  );
  debugEl.textContent = lines.join('\n');
}

// ── Init ───────────────────────────────────────────────────────
buildMenuBar();
