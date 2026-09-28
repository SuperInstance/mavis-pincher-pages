# mavis-pincher-pages

**The human-facing window for the SuperInstance fleet.**

A static site built with no framework, no build step, no npm dependencies. Plain HTML + CSS + vanilla ES modules. Designed to be deployed to Cloudflare Pages.

> **Companion repo**: `mavis-pincher` (the API). This site consumes `/v1/*` from `mavis-pincher` and renders the result.

---

## Pages

| Path | What |
|------|------|
| `/` (index.html) | Landing page: family tree + keeper's wave + recently active |
| `/search.html?q=...` | Search results (queries `/v1/search`) |
| `/family/{name}.html` | Per-family page (queries `/v1/repos?family=...`) |

The site uses the **static dataset shipped in `/data/repos.json`** (a copy of `mavis-pincher/data/repos.json`) for instant load. Live queries (`/v1/*`) are used for search and per-family browsing.

---

## Deploy

```bash
# Local preview
npx wrangler pages dev ./src --port 8788

# Production: connect this repo to Cloudflare Pages in the dashboard.
# Build command: none (static)
# Build output: ./src
```

Or via the Cloudflare CLI:
```bash
npx wrangler pages deploy ./src --project-name=mavis-pincher-pages
```

---

## File layout

```
mavis-pincher-pages/
├── README.md
├── data/
│   └── repos.json          ← same dataset as mavis-pincher/data/repos.json
└── src/                     ← Cloudflare Pages output dir
    ├── index.html           ← landing
    ├── search.html          ← search results
    ├── family/
    │   └── quilt.html       ← per-family template (clone for other families)
    └── assets/
        ├── style.css        ← all styles, no preprocessor
        └── app.js           ← all client JS, ES module, no bundler
```

---

## How it stays current

This site consumes the static `data/repos.json`. To refresh:

```bash
# From the mavis-pincher dir:
python3 ../pincher-data-build.py > ../mavis-pincher-pages/data/repos.json

# Or curl from the live pincher:
curl https://superinstance.dev/v1/repos?limit=200 > /tmp/repos.json
# (then transform to the static shape)
```

The next round adds a Cloudflare Pages build hook that auto-refreshes on every push.

---

## Design principles

1. **No build step.** Plain HTML, plain CSS, plain JS. What you write is what gets shipped.
2. **No framework.** No React, no Vue, no Svelte. Vanilla ES modules.
3. **No analytics.** The page is a page, not a funnel.
4. **No tracking.** No cookies, no fingerprinting.
5. **No auth.** The site is open. The keeper's stone-v1 chain is the trust.
6. **Mobile-first.** CSS Grid + Flexbox, no fixed widths above viewport.
7. **Dark by default.** Matches the keeper's aesthetic (`fleet-seeds/tavern/`).

---

## Design language

Colors:
- `--bg-darkest: #071214` (page background)
- `--copper: #c4774a` (accents, headers, tags)
- `--copper-bright: #e09866` (interactive accents)
- `--text-primary: #e8e0d4` (body text)
- `--text-secondary: #a8b0b2` (descriptions)
- `--text-muted: #6b7a7d` (meta info)
- `--green-bright: #7ab98e` (positive verdicts)

Type:
- `Cormorant Garamond` for display (headings, hero)
- `Inter` for body
- `JetBrains Mono` for code, tags, dates

Same palette as `fleet-dashboard.casey-digennaro.workers.dev` (so the visitor feels they're in the same fleet).

---

*— Mavis, the witness, 2026-09-28*
