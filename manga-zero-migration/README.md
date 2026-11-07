# MANGA ZERO migration

Status: preparation only; production remains on Floot.

Source project: `26664c22-65a8-43eb-8224-c60eea3f98f9`
Current Floot URL: https://manga-zero.floot.app
Custom domain: manga.koropopgames.com

## Verified inventory (2026-11-08)
- 14 manga works
- 24 episodes
- 18 users (private records must not be committed)
- PostgreSQL database via FLOOT_DATABASE_URL
- Login/session, comments, creator uploads, and dynamic APIs
- Covers and manga panels refer to Floot CDN assets

## Safe migration steps
1. Export a private database backup, excluding session tokens and secrets from public repositories.
2. Download and validate all CDN images and episode panels.
3. Reconstruct frontend/backend using the existing Floot project source.
4. Deploy to a free-tier host with a compatible database and storage.
5. Verify reading, auth, submissions and admin flows before DNS changes.
6. Only then switch DNS; do not delete the Floot project.

This branch does not contain the original source, image files, or user data yet.
