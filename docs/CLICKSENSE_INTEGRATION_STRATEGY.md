# ClickSense × Fisheye Menu — Instrumentation Strategy

How to measure whether fisheye menus actually improve target acquisition, and what to build next.

## What We're Measuring

Fitts's Law predicts that enlarging the target under the cursor reduces acquisition time. The fisheye menu does this dynamically. ClickSense gives us the raw motor data to validate or reject that prediction in production.

### Metrics from ClickSense (automatic)

Every click on a `.fisheye-item` already captures:

| Metric | What it tells us |
|--------|-----------------|
| `duration_ms` | Mousedown→mouseup latency. Proxy for click confidence — shorter = more certain. |
| `approach_velocity_mean` | Average cursor speed in the 500ms before click. High = ballistic movement (confident). |
| `approach_velocity_final` | Speed at moment of click. Low = careful targeting. |
| `approach_deceleration` | Slope of velocity decay. Steep negative = decisive stop. Flat = hunting. |
| `approach_corrections` | Direction reversals in the approach. High = overshooting, correcting. |
| `approach_distance` | Total cursor travel in the approach window. |
| `approach_pause_ms` | Time since last significant movement. Long pause before click = hesitation. |
| `drag_distance` | Cursor drift during the click. High = accidental drag, possible miss. |

### Metrics from Custom Instrumentation (PostHog events)

The `fisheye_menu_session` event fires when a menu closes:

| Property | What it tells us |
|----------|-----------------|
| `dwell_ms` | Total time menu was open. Longer = harder to find target or exploring. |
| `max_depth` | Deepest flyout level reached. Measures cascading menu traversal cost. |
| `path` | Label sequence: `"Wave Modes → zeta (Riemann)"`. Shows navigation intent. |
| `completed` | Did the user select something, or abandon? |

## Analysis: Validating Fitts's Law

### Hypothesis 1: Fisheye reduces acquisition time at depth

Compare `dwell_ms` for depth-1 selections vs depth-2 vs depth-3. In a standard cascading menu, each level adds ~300-500ms (Ahlström et al., 2005). Fisheye should compress that by enlarging the target at each level.

**Test:** A/B the `fisheye: true/false` config option. Compare mean `dwell_ms` per depth level.

### Hypothesis 2: Fewer approach corrections with fisheye active

If the target is bigger, the user doesn't need to correct as often. `approach_corrections` should be lower for fisheye-expanded items than for items at their base height.

**Test:** Compare `approach_corrections` for items that were at max expansion (hovered item) vs items at min compression (quickly clicked without fisheye expansion completing).

### Hypothesis 3: Click confidence increases with target size

`duration_ms` (click latency) should be shorter when the clicked item was expanded. Bigger target = less motor uncertainty = quicker release.

**Test:** Correlate item height at click time with `duration_ms`. Requires logging the item's current height (see Future Work below).

### Hypothesis 4: Steering corridor prevents abandonment

Without the diagonal-safe steering zone, users abandon cascading menus when the flyout closes during diagonal travel. Track `completed: false` sessions where `max_depth > 0` — these are steering failures.

**Test:** A/B test with steering corridor enabled/disabled. Compare abandonment rate.

## Future Instrumentation (fisheye-menu.js changes)

### Priority 1: Item height at click time

Add a `data-fisheye-height` attribute updated on each fisheye recalculation. ClickSense will capture it in `target.label` or a custom attribute. This lets us directly correlate target size with motor metrics.

```js
// In fisheye-menu.js, during height update:
el.setAttribute('data-fisheye-height', Math.round(currentHeight));
```

### Priority 2: Steering corridor events

Fire a custom event when the steering corridor activates (user is in the diagonal safe zone). Count how many times per session the corridor saves the flyout from closing.

```js
// PostHog event:
posthog.capture('fisheye_steering_save', {
  from_item: parentLabel,
  to_flyout: flyoutLabel,
  corridor_duration_ms: elapsed,
});
```

### Priority 3: Hover dwell per item

Track how long the cursor dwells on each item before clicking or moving on. Long dwells on non-clicked items = reading/scanning. Long dwells on clicked items = deciding. Short dwell + click = known target.

```js
// On mouseenter/mouseleave per item, accumulate dwell time.
// Attach to the click event payload.
```

### Priority 4: A/B testing harness

The fisheye menu already has a `fisheye: true/false` config. Add a PostHog feature flag check:

```js
const fisheyeEnabled = posthog.isFeatureEnabled('fisheye_menu_active');
create(el, data, { fisheye: fisheyeEnabled });
```

This gives clean A/B groups with all motor metrics segmented by variant.

## Integration Checklist for New Pages

When adding fisheye menus to a new page:

1. **Include ClickSense** — `<script src="clicksense.js">` + PostHog adapter init
2. **Include fisheye assets** — `fisheye-menu.js`, `fisheye-core.js`, `fisheye-menu.css`
3. **Add `data-clicksense` to bar items** — `nav:Label` format for top-level tracking
4. **Add MutationObserver instrumentation** — copy the `instrumentFisheyeMenu()` block
5. **Tag items with depth** — `fisheye:Label:d{N}` format in `data-clicksense`
6. **Override theme variables** — match the page's dark/light theme
7. **Set `onSelect` with navigation** — handle `_href`, `_mode`, or other action properties

## Pages to Instrument Next

| Page | Menu type | Priority |
|------|-----------|----------|
| `inside_the_math/index.html` | Nav bar with cascading flyouts | Done |
| `index.html` (main app) | EQ panel section navigation | Medium — complex panel, many toggles |
| `mac/index.html` | Simple — no menus currently | Low |
| Standalone fisheye demo | Full taxonomy demo with debug overlay | High — controlled environment for A/B |

## References

- Fitts, P. M. (1954). The information capacity of the human motor system.
- Bederson, B. B. (2000). Fisheye menus. UIST 2000.
- Ahlström et al. (2005). Modeling selection in cascading pull-down menus using Fitts' law. CHI 2005.
- Cockburn & Gutwin (2007). Untangling the usability of fisheye menus. TOCHI 14(2).
