# Fisheye Flyout Menu

![Fisheye Flyout Menu demo showing Dewey Decimal taxonomy with 600 Technology expanded](screenshot.png)

A cascading menu where items dynamically resize based on mouse proximity, applying **Fitts's Law** to reduce target acquisition time in deep menu hierarchies.

**[Live Demo](https://andyed.github.io/fisheye-menu/)**

## The Problem

Cascading (flyout) menus punish users who need items near the bottom. Every submenu level compounds the difficulty — you're steering through a narrow corridor while the target sits at the end of a long list of uniformly-sized items. Fitts's Law predicts this: smaller or more distant targets take longer to acquire.

## The Solution

Redistribute item heights so the item you're approaching gets a larger click target, while distant items compress. The critical constraint: **the boundary between the hovered item and its neighbor never moves toward the mouse**. The goalpost stays put. You never overshoot because the target moved.

Flyout submenus inherit the same behavior, maintaining a direct steering path from the parent menu item.

## The Tunneling Problem

Standard cascading menus have a second Fitts's Law failure: the diagonal steering corridor. When you move the mouse from a parent item toward a flyout submenu, your diagonal path crosses other parent items — which close the flyout you were heading toward. Users learn to move right first, then down, adding a dogleg that doubles the motor cost.

This implementation uses a **steering triangle**: an invisible region from the cursor to the top and bottom edges of the open flyout. While the mouse is inside that triangle, item-enter events on the parent panel are suppressed. You can move diagonally toward any part of the submenu without triggering a close. (This technique was independently discovered by Amazon for their mega-menu dropdown, patented in 2013, patent now expired.)

## Background

This approach was originally prototyped as a "fisheye menu" during Andy Edmonds' MS research at Georgia Institute of Technology, exploring mouse-position-dependent target sizing in hierarchical menus. The core insight: if you make the item the user is heading toward taller, and ensure the boundaries they'd cross don't shift against them, you get faster traversal without sacrificing menu density.

**Fitts's Law** (1954) — movement time to a target is a function of distance to and size of the target:

    MT = a + b · log₂(2D / W)

By increasing W (target width/height) for the item under the cursor and its neighbors, we reduce acquisition time. By pinning the near boundary, we prevent the pathological case where resizing *increases* effective distance.

## Configuration

All behavior is controlled via the `CONFIG` object in `fisheye-menu.js`:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `baseHeight` | 28 | Default item height in pixels |
| `maxExpand` | 4.4 | Maximum expansion factor for hovered item |
| `minHeight` | 18 | Minimum compressed height (readability floor) |
| `falloffRadius` | 3 | Number of neighbors that get partial expansion |
| `transitionMs` | 80 | CSS transition duration |
| `separator` | `'line'` | Item separator style: `false`, `'line'`, or `'groove'` |
| `separatorColor` | `'rgba(255,255,255,0.08)'` | Separator color |
| `separatorThickness` | 1 | Separator thickness in pixels |

## Demo Taxonomies

The demo includes several real-world hierarchies for testing at various depths and item counts:

- **Biology** — Linnaean taxonomy (Kingdom → Order), 4 levels deep
- **Chemistry** — Periodic table element groups
- **Typography** — Typeface classification (Vox-ATypI style)
- **Dewey Decimal** — Library classification system
- **Palettes** — Color themes from [Psychodeli+](https://github.com/andyed/psychodeli-webgl-port) with visual swatches

## Usage

No build step. Serve the directory and open `index.html`:

```bash
python3 -m http.server 8087
# open http://localhost:8087
```

ES6 modules — requires a local server (no `file://`).

## License

MIT
