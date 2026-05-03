# Verified Audit + Refined First Task

## Question

Claude's audit findings have been ground-truthed against the actual repo. What's the best first move?

## Context

Codex verified all critical findings:
- HTTrack junk confirmed in root (index.html is HTTrack's landing page, not site content; hts-cache/, hts-log.txt, cookies.txt, backblue.gif, fade.gif all present)
- Font Awesome .html files confirmed: font-awesome-5.min.css:4 references templates/shaper_helixultimate/fonts/fa-*.{eot,svg} but those files are 632-byte HTML 404 pages, not fonts
- cache/ confirmed as Joomla hashed build outputs (cache/com_templates/templates/shaper_helixultimate/)
- services.html confirmed as custom 404 page
- Font duplication: templates/shaper_helixultimate/fonts/ is the active directory (referenced in CSS); components/com_sppagebuilder/assets/webfonts/ is dormant clutter

Codex refinements to Claude's recommendation:
1. No .git repo exists yet → .gitignore update is premature; gate that on repo initialization
2. dronesurveycr.com/cache/ needs verification before deletion; generated artifacts may be required for the frozen snapshot to render correctly

## Analysis

Claude's findings are sound and verified. The framing adjustments are valid:
- The HTTrack cleanup is unambiguous and safe
- The cache/ decision should be "test first, delete after confirmation" not "delete immediately"
- The .gitignore suggestion assumes a git repo that doesn't exist yet

Best first task is clear: remove obvious non-content HTTrack artifacts and the bogus font HTML files, then render-test to ensure the site still works.

## Recommendation

**Phase 1 (safe, immediate):**
1. Delete root HTTrack landing page: dronesurveycr.com/index.html (actually hts-cache index, not site)
2. Delete HTTrack metadata: hts-cache/, hts-log.txt, cookies.txt, backblue.gif, fade.gif
3. Delete bogus font files: dronesurveycr.com/templates/shaper_helixultimate/fonts/*.html (all 9 404 pages)
4. Open index.html in browser or start a local server and verify the site still renders correctly
5. Spot-check a services page and the portfolio to ensure CSS loads and images render

**Phase 2 (after successful render test):**
6. Decide on dronesurveycr.com/cache/: test without it; if site still renders, delete; if broken, keep and document why
7. Decide on services.html: restore as a redirect to /services/, or create a real services index page

**Post-cleanup:**
8. Initialize git repo (if not already in version control)
9. Update .gitignore to exclude hts-cache/, hts-log.txt, and similar mirrors

## Open Questions

None blocking Phase 1. Ready to implement.

---

# Phase 1 Result

## Question

Phase 1 cleanup is complete. Please treat this as verified state for the next
handoff.

## Context

- Removed root HTTrack artifacts:
  - `index.html`
  - `hts-cache/`
  - `hts-log.txt`
  - `cookies.txt`
  - `backblue.gif`
  - `fade.gif`
- Removed 9 bogus font HTML files from
  `dronesurveycr.com/templates/shaper_helixultimate/fonts/`
- Kept real font assets: `.woff2`, `.woff`, `.ttf`

## Analysis

- Cleanup completed without touching `dronesurveycr.com/cache/`
- Static smoke test on:
  - `dronesurveycr.com/index.html`
  - `dronesurveycr.com/services/lidar-mapping.html`
  - `dronesurveycr.com/portfolio.html`
- Local styling and image references on those pages still resolve after cleanup
- No new breakage attributable to Phase 1
- Pre-existing missing links surfaced in the content:
  - `about.html`
  - `blog/`
  - `lp-agriculture.html`
  - `lp-construction.html`
  - `lp-real-estate.html`
  - `sitemap.xml`
- Also noticed pre-existing encoding issues in some content, including `Â±`
  and `âœ“`

## Recommendation

Phase 1 passed its verification gate. We can move to Phase 2:

1. Verify whether `dronesurveycr.com/cache/` is required for this frozen export
2. Decide what to do with `dronesurveycr.com/services.html`
3. Optionally triage the surfaced broken internal links and encoding artifacts

## Open Questions

- For Phase 2, should we test `cache/` removal first or fix the broken links
  and `services.html` routing issue first?
