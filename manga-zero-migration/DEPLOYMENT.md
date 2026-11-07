# MANGA ZERO — static reader deployment checklist

**Status:** preview package generated successfully; production has not been migrated. This guide is for the static catalog/reader only, not the original Floot backend.

## Artifact downloads
- Static preview workflow: https://github.com/corocoro527/corogames/actions/workflows/manga-zero-preview.yml
- Full offline backup workflow: https://github.com/corocoro527/corogames/actions/workflows/manga-zero-backup.yml
- Workflow artifacts expire after 30 days; copy verified backups to durable private storage.
- The preview ZIP has no image files and cannot independently display the manga.

## Validate a complete offline package
1. Download the **successful** full backup artifact (not a failed partial backup).
2. Extract while preserving the `backup-assets/` folder and manifest paths.
3. Run `python3 verify_offline.py` from the extracted site directory. Require a `PASS` result and no errors.
4. Run `python3 -m http.server 8000` from the same directory.
5. Open `http://localhost:8000/?offline=1`. Check every work, episode, and page; repeat on mobile.
6. Disconnect the Floot source or block Floot CDN requests in browser devtools. Confirm that all images still display.

## Free hosting decision
A static host such as GitHub Pages or Cloudflare Pages may be suitable for a rights-cleared catalog and reader. The full image archive is hundreds of megabytes, so check repository size, per-file limits, bandwidth, and durable storage before choosing a host. Do not deploy all images into the existing repository by default.

## Rights and user privacy
Confirm hosting and redistribution rights for each work and all required attribution. Do not publicly upload user accounts, sessions, comments, drafts or private database records. A publicly accessible original image is not proof of a redistribution license.

## Cutover criteria
- A durable, independent image host with authorized content
- Passing complete-image SHA256 verification
- Mobile and desktop browser checks
- Every published episode readable without Floot CDN fallback
- Hosting URL verified and rollback plan documented

**Do not update manga.koropopgames.com DNS until the above criteria pass.** Login, comments, uploads and administration require a separate backend migration.
