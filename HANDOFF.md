# Drone Survey CR — Project Handoff

**Branch:** `claude/great-sagan-dgiJY`  
**Draft PR:** https://github.com/DroneSurveyCR/dronesurveycr/pull/1  
**Repo:** `DroneSurveyCR/dronesurveycr`  
**Site root:** `dronesurveycr.com/`

---

## What's been done

A full site-wide redesign to a dark/light-toggle **jungle green** (`#22c55e`) design system. Old blue (`#0080FE` / `#302F40`) has been removed everywhere. All pages use a shared stylesheet at `dronesurveycr.com/css/site.css` and shared shell snippets.

### Pages re-themed (all committed and pushed)

| File | Notes |
|------|-------|
| `index.html` | Full-screen video hero (hero-drone-1.webm/mp4), dark/light toggle, stats bar, service cards, workflow, tech specs, reviews, FAQ, CTA |
| `services/index.html` | Services landing — page-hero, info-grid of 3 service cards |
| `services/lidar-mapping.html` | Full content: prose, spec-table, use-case grid, pricing, FAQ |
| `services/photogrammetry.html` | Full content: prose, spec-table, use cases, vs-LiDAR comparison, pricing, FAQ |
| `services/geopositioning.html` | Full content: prose, RTK spec-table, use cases, pricing, FAQ, JSON-LD |
| `quote.html` | Themed form — all fields/IDs/submit endpoint preserved verbatim (POST to `https://app.dronesurveycr.com/api/leads/quote-submit`), live estimate panel, pricing, FAQ |
| `portfolio.html` | Hero, stats bar, Leaflet map (dark tiles), featured grid, full 23-project dynamic grid |
| `portfolio-viewer.html` | New dark chrome, Potree 3D viewer JS preserved exactly |

### Page NOT yet re-themed
- `services.html` (root-level legacy redirect page — may just be a duplicate/redirect; check if it's needed)

---

## Design system rules

### Stylesheet
- Service pages (`/services/*.html`): `<link rel="stylesheet" href="../css/site.css">`
- Root pages: `<link rel="stylesheet" href="css/site.css">`

### Fonts (both levels)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Shell snippets (shared, paste verbatim)
Located in `/tmp/shell/` on the cloud agent — copy from an already-done page if re-theming locally:
- `header-root.html` — top-bar + nav for root pages
- `header-services.html` — top-bar + nav for `/services/` pages (has `../` paths)
- `footer-root.html` / `footer-services.html`
- `scripts.html` — i18n + theme toggle, goes right before `</body>`

Page structure:
```
<body>
  [header verbatim]
  <main>
    [your content]
  </main>
  [footer verbatim]
  [scripts verbatim]
</body>
```

### Key CSS classes
```
.page-hero          — breadcrumb + tag chip + h1 + p.lead (top of every inner page)
.prose / .prose.wide — article body text
.check-list         — <ul> with green checkmark bullets
.info-grid          — card grid container
.info-card          — card with optional img, h3, p
.spec-table         — <table> for equipment/software specs
.highlight-box      — pricing box
.price-tag          — large price display inside .highlight-box
.form-card          — form container
.form-row           — label + input row
.form-grid-2        — two-column field group
div.faq-list        — container for native <details>/<summary> accordions
.inner-cta          — closing CTA band (quote + WhatsApp buttons)
.btn.btn-primary    — green filled button
.btn.btn-outline    — outlined button
```

### Colors — use CSS tokens only, never hardcode
```css
var(--accent)       /* jungle green #22c55e */
var(--bg)           /* page background */
var(--bg-card)      /* card background */
var(--heading)      /* heading text */
var(--text)         /* body text */
var(--muted)        /* secondary text */
var(--border)       /* borders */
```

### Images available in `dronesurveycr.com/images/`
```
fly.jpg
new-project.jpg
analize.jpg
plan.jpg
dji-zenmuse-l1-lidar.jpg
dji-d-rtk-2-base-station-tripod4.png
pix4dmatic-drone-mapping-software.webp
vlcsnap-2022-01-24-23h03m50s335.png
a083f93b173459b7a95cb59530a89d3e.jpg
hero-drone-1.webm / hero-drone-1.mp4   (hero video)
hero-drone-2.webm / hero-drone-2.mp4   (secondary video)
topo-bg.svg / topo-bg-light.svg        (topographic pattern texture)
favicon.ico
dscrlogo.jpg                            (logo — also pending: logo-round.png)
```
**Rule: never reuse the same image twice on one page.**

---

## Immediate next steps

### 1. Deploy preview
The `.vercel/project.json` is already configured. From the repo root:
```bash
git checkout claude/great-sagan-dgiJY
vercel deploy
```
This will give a live preview URL. When happy: `vercel --prod`.

### 2. Logo image
`logo-round.png` needs to be added to `dronesurveycr.com/images/`. The header references it — once the file is committed, the round logo will appear in the nav. Just drag it into VS Code and commit.

### 3. `services.html` (root level)
Check whether this legacy page is still needed or if it should redirect to `services/index.html`. Re-theme it or delete it.

### 4. Any missing pages
If there are other pages (about, contact, blog, etc.) they still have old styling. Re-theme them using the pattern below.

### 5. Merge PR
When the preview looks good, mark PR #1 ready and merge to `main`.

---

## How to re-theme an additional page

Copy this pattern. For a root-level page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Drone Survey Costa Rica</title>
  <meta name="description" content="...">
  <link rel="canonical" href="https://dronesurveycr.com/page.html">
  <!-- OG / Twitter tags -->
  <!-- JSON-LD if applicable -->
  <!-- GA snippet (preserve existing) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/site.css">
  <link rel="icon" href="images/favicon.ico">
</head>
<body>
  <!-- paste header-root.html verbatim -->
  <main>
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="index.html">Home</a> / Page Name</div>
        <div class="tag">Eyebrow Label</div>
        <h1>Page Title</h1>
        <p class="lead">One-sentence description.</p>
      </div>
    </section>

    <!-- content sections here using CSS classes above -->

    <section class="inner-cta">
      <div class="container">
        <h2>Ready to get started?</h2>
        <div class="cta-buttons">
          <a href="quote.html" class="btn btn-primary">Get a Quote</a>
          <a href="https://wa.me/50672938970" class="btn btn-outline" target="_blank">WhatsApp Us</a>
        </div>
      </div>
    </section>
  </main>
  <!-- paste footer-root.html verbatim -->
  <!-- paste scripts.html verbatim -->
</body>
</html>
```

For a `/services/` page: use `header-services.html`, `footer-services.html`, and change all paths to `../css/site.css`, `../images/`, `../quote.html`.

---

## Key URLs & endpoints

| Thing | Value |
|-------|-------|
| WhatsApp | `https://wa.me/50672938970` |
| Quote form endpoint | `https://app.dronesurveycr.com/api/leads/quote-submit` (POST JSON) |
| Client portal | (check existing nav — link already in header shell) |
| GA property | `G-6L0PFQRYF6` |
| Vercel project | `prj_7X4igKSTroFvQnylFHITPLWdJrFG` (team: `team_OupWGLYuBIRgB7u7FgKCJKDk`) |
