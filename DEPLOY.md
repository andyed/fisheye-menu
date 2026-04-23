# Deploy — fisheye-menu

**Live URL:** https://andyed.github.io/fisheye-menu/
**Source branch:** `master`, path `/` (repo root served directly)
**Deploy trigger:** **Auto on push** (GitHub Pages serves the branch root)
**Build command:** None — static HTML + CSS + JS.
**Deploy command:** `git push origin master` → GH Pages picks up the push within ~1 min.

## Minimal-change protocol (text-only patches)

Edit the relevant HTML file(s), commit, push. That's it.

For analytics-key changes specifically: `sed` the new key across the HTML files
that embed `posthog.init()`, stage only those files (this repo tends to accumulate
pre-existing working-tree state — use `git stash` to isolate if needed), commit,
push.

## Verification

```bash
curl -s https://andyed.github.io/fisheye-menu/ | grep -o "phc_[A-Za-z0-9]*"   # expect phc_UtkQey...
```

## Files to know

- `index.html`, `demo-social.html` — main demo pages with analytics init
- `demo-video/index.html` — separate demo (no analytics as of 2026-04-23)
- `clicksense.js` — ClickSense library, served directly

## PostHog

Writes to **MindBendingPixels project (357099)** as of 2026-04-23. Previously
writing to Scrutinizer project (259660). fisheye-menu is an HCI demo under the
MBP umbrella, not a Scrutinizer product, so the MBP project is its canonical
home.
