# MANGA ZERO — static reader deployment checklist

**Status:** complete offline archive and browser tests have passed; production has not been migrated. This guide is for the static catalog/reader only, not the original Floot backend.

## Artifact downloads
- Static preview workflow: https://github.com/corocoro527/corogames/actions/workflows/manga-zero-preview.yml
- Full offline backup workflow: https://github.com/corocoro527/corogames/actions/workflows/manga-zero-backup.yml
- Workflow artifacts expire after 30 days; copy verified backups to durable private storage.
- The preview ZIP has no image files and cannot independently display the manga.

## Confirmed full offline artifact (2026-11-08)
- GitHub Actions run: https://github.com/corocoro527/corogames/actions/runs/42414723367
- Artifact ID: `13591270258` (`manga-zero-complete-offline-site`)
- Artifact ZIP size: 578,713,628 bytes
- GitHub retention expiry: 2026-12-07 (UTC)
- Download the artifact and retain at least two private copies before expiry. GitHub Actions artifacts are not permanent hosting.
- Integrity verification passed in CI for all 884 referenced images; this does not establish public redistribution rights.

## Validate a complete offline package
1. Download the **successful** full backup artifact (not a failed partial backup).
2. Extract while preserving the `backup-assets/` folder and manifest paths.
3. Run `python3 verify_offline.py` from the extracted site directory. Require a `PASS` result and no errors.
4. Run `python3 -m http.server 8000` from the same directory.
5. Open `http://localhost:8000/?offline=1`. Check every work, episode, and page; repeat on mobile.
6. Disconnect the Floot source or block Floot CDN requests in browser devtools. Confirm that all images still display.

## Browser verification (2026-11-08)
- Successful Chromium workflow: https://github.com/corocoro527/corogames/actions/runs/42414985821
- Desktop and mobile viewports passed static catalog, offline-mode, three long-form volume page counts, and episode navigation checks.
- These tests verify layout/data behavior with missing-image placeholders; they do **not** prove that all 884 real images render correctly in browsers. A browser test of the complete artifact is still required before public cutover.

## Full-image browser check
- Workflow: https://github.com/corocoro527/corogames/actions/workflows/manga-zero-full-browser.yml
- Reuses verified offline artifact and checks actual image decoding in Chromium on desktop/mobile.
- Successful image download and SHA256 verification are not substitutes for successful browser rendering.
- Confirm this workflow is green before deploying; a queued or running workflow is **not** a pass.

## Verified test evidence (2026-11-08)
- Full-image browser workflow **passed**: https://github.com/corocoro527/corogames/actions/runs/42415090791
- All 884 image hashes verified, and representative cover/page images decoded in Chromium on desktop and mobile. This is **not** a visual inspection of every individual page.
- Updated same-series previous/next navigation browser regression **passed**: https://github.com/corocoro527/corogames/actions/runs/42415176718
- Browser checks run against local HTTP and block requests outside the local site.
- Production hosting and DNS remain untouched.

## Free hosting decision
A static host such as GitHub Pages or Cloudflare Pages may be suitable for a rights-cleared catalog and reader. The full image archive is hundreds of megabytes, so check repository size, per-file limits, bandwidth, and durable storage before choosing a host. Do not deploy all images into the existing repository by default.

## Work-by-work release gate
The public catalog contains 12 works and 24 episodes. Treat each work independently before public image hosting:
- `midnight-lie`, `floor13`, `asobimashou`, `buzz-fight`, `debt-collector-isekai`, `dungeon-diner`, `borrowed-skill`, `youth-retake`, `lowest-dungeon-stream`, `little-general-store`: verify original authorship or obtain redistribution permission, including cover and all episode images.
- `blackjack-ni-yoroshiku`: check the specific distribution terms and any required attribution before publishing 629 pages.
- `pepper-and-carrot`: check the applicable Creative Commons attribution requirements and preserve author, license, and source credits.
- A successful private backup or working Floot CDN URL is **not** evidence of public republication rights.
- Keep drafts, user records, and comments out of public static exports.
- Release only works with documented clearance; do not make the full backup ZIP public by default.

## Rights and user privacy
Confirm hosting and redistribution rights for each work and all required attribution. Do not publicly upload user accounts, sessions, comments, drafts or private database records. A publicly accessible original image is not proof of a redistribution license.

## Cutover criteria
- A durable, independent image host with authorized content
- Passing complete-image SHA256 verification
- Mobile and desktop browser checks
- Every published episode readable without Floot CDN fallback
- Hosting URL verified and rollback plan documented

**Do not update manga.koropopgames.com DNS until the above criteria pass.** Login, comments, uploads and administration require a separate backend migration.
