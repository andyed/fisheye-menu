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
  maxExpand: 4.4,
  // Minimum compressed height (readability floor)
  minHeight: 18,
  // How many neighbors on each side get partial expansion
  falloffRadius: 3,
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
  baseFontSize: 13,
  minFontSize: 11,
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

    el.addEventListener('mouseenter', () => onItemEnter(panel, el, item, idx, depth));

    panel.appendChild(el);
  });

  // Pre-compute max width: temporarily set all items to max font size,
  // measure, then lock the panel width so fisheye scaling never causes reflow.
  const maxFontSize = 13 * CONFIG.maxExpand;
  const itemEls = Array.from(panel.querySelectorAll('.menu-item'));
  itemEls.forEach(el => { el.style.fontSize = maxFontSize + 'px'; });
  panel.style.position = 'absolute';
  panel.style.visibility = 'hidden';
  panel.style.display = 'block';
  const measuredWidth = panel.offsetWidth;
  panel.style.width = measuredWidth + 'px';
  panel.style.display = '';
  panel.style.visibility = '';
  itemEls.forEach(el => { el.style.fontSize = '13px'; });

  // Mousemove on the entire panel drives fisheye redistribution
  panel.addEventListener('mousemove', (e) => onPanelMouseMove(panel, e));
  panel.addEventListener('mouseleave', () => onPanelMouseLeave(panel));

  // Store metadata on the panel element
  panel._items = items;
  panel._itemEls = Array.from(panel.querySelectorAll('.menu-item'));
  panel._totalHeight = totalHeight;
  panel._depth = depth;

  document.body.appendChild(panel);
  return panel;
}

// ── Fisheye application ────────────────────────────────────────

function onPanelMouseMove(panel, e) {
  const itemEls = panel._itemEls;
  if (!itemEls.length) return;

  // Find which item the mouse is over by comparing Y positions
  const panelRect = panel.getBoundingClientRect();
  const mouseY = e.clientY - panelRect.top - 4; // account for padding

  let hoveredIdx = -1;
  let cumY = 0;
  for (let i = 0; i < itemEls.length; i++) {
    const h = parseFloat(itemEls[i].style.height) || CONFIG.baseHeight;
    if (mouseY >= cumY && mouseY < cumY + h) {
      hoveredIdx = i;
      break;
    }
    cumY += h;
  }

  const heights = computeFisheyeHeights(
    itemEls.length,
    hoveredIdx,
    panel._totalHeight,
    CONFIG
  );

  applyHeights(panel, heights);
  updateDebug(hoveredIdx, heights);

  // Keep steering triangle fresh as cursor moves
  updateSteeringTriangle(panel);
}

function onPanelMouseLeave(panel) {
  // Restore default top-heavy distribution
  const itemEls = panel._itemEls;
  const heights = computeDefaultHeights(itemEls.length, panel._totalHeight, CONFIG);
  applyHeights(panel, heights);
  updateDebug(-1, heights);
}

function applyHeights(panel, heights) {
  const itemEls = panel._itemEls;
  const { baseFontSize, minFontSize, baseHeight } = CONFIG;
  for (let i = 0; i < itemEls.length; i++) {
    const h = heights[i];
    itemEls[i].style.height = h + 'px';
    const scale = h / baseHeight;
    itemEls[i].style.fontSize = Math.max(minFontSize, baseFontSize * scale) + 'px';
  }
}

// ── Steering triangle (anti-tunneling) ─────────────────────────
//
// When a flyout is open, define a triangle from the current mouse
// position to the top-left and bottom-left corners of the open flyout.
// If the mouse is inside that triangle, it's steering toward the flyout
// — don't close it, don't switch items, don't open a new flyout.
//
// This solves the "diagonal problem" where moving toward a submenu
// crosses other parent items and kills the flyout.

let steeringTriangle = null;  // { cursor: {x,y}, topCorner: {x,y}, bottomCorner: {x,y} }
let lastMousePos = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
  lastMousePos.x = e.clientX;
  lastMousePos.y = e.clientY;
});

function isInSteeringTriangle(mx, my) {
  if (!steeringTriangle) return false;
  const { cursor, topCorner, bottomCorner } = steeringTriangle;
  return pointInTriangle(mx, my, cursor, topCorner, bottomCorner);
}

function updateSteeringTriangle(parentPanel) {
  // Find the deepest open flyout that's a child of this panel
  const parentDepth = parseInt(parentPanel.dataset.depth);
  const childPanel = openMenus.find(p => parseInt(p.dataset.depth) === parentDepth + 1);
  if (!childPanel) {
    steeringTriangle = null;
    return;
  }

  const flyoutRect = childPanel.getBoundingClientRect();
  const parentRect = parentPanel.getBoundingClientRect();

  // Triangle: from current mouse pos to the near edge of the flyout.
  // If flyout is to the right, corners are top-left and bottom-left of flyout.
  // If flyout is to the left, corners are top-right and bottom-right.
  const flyoutIsRight = flyoutRect.left >= parentRect.left;
  const nearX = flyoutIsRight ? flyoutRect.left : flyoutRect.right;

  steeringTriangle = {
    cursor: { x: lastMousePos.x, y: lastMousePos.y },
    topCorner: { x: nearX, y: flyoutRect.top },
    bottomCorner: { x: nearX, y: flyoutRect.bottom },
  };
}

// ── Submenu (flyout) management ────────────────────────────────

let flyoutTimeout = null;

function onItemEnter(panel, el, item, idx, depth) {
  // If steering toward an open flyout, don't close it or switch
  if (isInSteeringTriangle(lastMousePos.x, lastMousePos.y)) {
    return;
  }

  // Close any flyouts deeper than this panel's depth
  closeFlyoutsAboveDepth(depth);
  steeringTriangle = null;

  if (!item.children || item.children.length === 0) return;

  // Small delay to prevent accidental flyout opens during fast sweeps
  clearTimeout(flyoutTimeout);
  flyoutTimeout = setTimeout(() => {
    openFlyout(panel, el, item, depth);
  }, 120);
}

function openFlyout(parentPanel, triggerEl, item, parentDepth) {
  const childPanel = createPanel(item.children, parentDepth + 1);
  childPanel.classList.add('flyout', 'open');

  // Position: right edge of parent, aligned with the trigger item
  const parentRect = parentPanel.getBoundingClientRect();
  const triggerRect = triggerEl.getBoundingClientRect();

  let left = parentRect.right + CONFIG.flyoutGap;
  let top = triggerRect.top;

  // Keep on screen
  const panelWidth = 220;
  if (left + panelWidth > window.innerWidth) {
    left = parentRect.left - panelWidth - CONFIG.flyoutGap;
  }
  if (top + childPanel._totalHeight > window.innerHeight) {
    top = Math.max(4, window.innerHeight - childPanel._totalHeight - 4);
  }

  childPanel.style.left = left + 'px';
  childPanel.style.top = top + 'px';

  // Apply default heights
  const heights = computeDefaultHeights(childPanel._itemEls.length, childPanel._totalHeight, CONFIG);
  applyHeights(childPanel, heights);

  openMenus.push(childPanel);

  // Establish steering triangle so diagonal mouse movement
  // toward the flyout doesn't accidentally close it
  updateSteeringTriangle(parentPanel);
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

  // Apply default heights
  const heights = computeDefaultHeights(panel._itemEls.length, panel._totalHeight);
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
