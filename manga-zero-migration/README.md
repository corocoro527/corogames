# MANGA ZERO — static migration prototype

**Status:** static catalog and reader committed on branch `manga-zero-migration`; **not deployed**. Original Floot production and DNS remain unchanged.

## Migrated data
- 12 published works in `public-catalog.json` (14 works total in the original database, including two drafts).
- 24 episode records, including 629 pages across three volume episodes, in `episodes-original.json`, `episodes-remaining.json` and `volumes/`.
- Two original episodes (IDs 5 and 7) contain no image pages in the source database. This is not migration data loss.
- A previous GitHub Actions run downloaded all 884 distinct public image references successfully. The artifact is temporary; download and preserve it before its expiry. A newer all-in-one offline package run is still being tested.

## Preview locally
`index.html` and `reader.html` use `fetch()` to load adjacent JSON, so serve this directory with a local HTTP server rather than opening files directly:

```sh
cd manga-zero-migration
python3 -m http.server 8000
# open http://localhost:8000
```

Without `asset-manifest.json` and `backup-assets/`, image URLs may fall back to the original Floot CDN. **This does not prove independence from Floot.**

## Offline image package
The `MANGA ZERO public asset backup` GitHub Actions workflow runs `validate_catalog.py`, downloads images, builds `asset-manifest.json` and uploads an artifact containing the static reader and image files. Only call it a complete offline backup when the job's validation and image steps succeed. Download the artifact, extract it preserving directory structure, and serve the resulting folder locally.

## What is not migrated
Authentication, user accounts, comments, creator submissions, administration, original server APIs, and private database records are **not implemented** in the static reader. Do not present this prototype as a full feature-for-feature migration.

## Production safety and rights
1. Keep production Floot and `manga.koropopgames.com` DNS unchanged until independent hosting and functional checks pass.
2. Do not commit private user data, credentials, or session tokens.
3. Verify redistribution rights and attribution obligations for each manga before publicly hosting images.
4. Choose sustainable image hosting; GitHub Actions artifacts expire and are not a production CDN.
5. Test every work and episode on desktop and mobile, then decide whether a static-only launch is acceptable or a new backend is required.
