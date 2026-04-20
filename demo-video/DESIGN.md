# DESIGN — fisheye-menu demo video

## Style Prompt

Technical/editorial register. Dark canvas with navy + purple palette drawn from the fisheye-menu dark theme. Coral accent for focus/cursor, echoing the stylesheet's `--fisheye-focus-ring`. Feels like a precision engineering instrument, not a marketing reel — Fitts's Law is about economical motion, so animation is brisk, efficient, never lingering.

## Colors (from fisheye-menu.css dark theme)

| Token | Hex | Role |
|---|---|---|
| `bg` | `#0a0a1a` | Page background — slightly darker than menu for contrast |
| `menu-bg` | `#16213e` | Menu bar / panel background (`--fisheye-bar-bg`) |
| `menu-border` | `#0f3460` | Borders (`--fisheye-bar-border`) |
| `text-silver` | `#c0c0c0` | Primary text (`--fisheye-bar-text`) |
| `text-cream` | `#e6e4d2` | Display / hero text (higher contrast) |
| `hover-purple` | `#533483` | Item hover / expanded state (`--fisheye-item-hover-bg`) |
| `focus-coral` | `#ff9595` | Cursor, focus ring, accent highlights (`--fisheye-focus-ring`) |

## Typography

- Inter, weights 400 / 500 / 700 / 800
- Title (hero): 140px / 800 / letter-spacing -0.03em
- Subtitle: 42px / 400
- Caption: 32px / 500
- URL hero: 64px / 700

## Motion rules

- Eases: `power3.out` for hero entrances, `power2.out` for body elements, `back.out(1.8)` for playful accents, `expo.out` for container emergence. Exits use `power2.in`.
- Scene 2 menu expansion is the signature motion — items animate at `power2.out` over 400ms (quick arrival, settle immediately). Mirrors the real CSS transition (80ms in the live demo, scaled up for video readability).
- Cursor moves with `power2.inOut` — deliberate, not linear. Real mice accelerate and decelerate.

## What NOT to Do

- No rainbow / jet colormaps — palette is navy + purple + coral only.
- No bouncy / springy eases on the menu items themselves — defeats the Fitts's Law precision vibe.
- No hand-drawn / sketchy textures — this is precision engineering, not whimsy.
- No centered body text paragraphs (universal muriel rule).
- No accent lines under titles (AI-deck tell).
- No music — silent video. The README embed plays muted by default and sound would feel promotional.
