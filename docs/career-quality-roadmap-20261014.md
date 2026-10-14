# KOROPOP CAREER — quality and competitor research roadmap
Updated: 2026-10-14. This is an internal project plan, **not** a Google or AdSense scoring system.

## Goals
Work toward an internal quality score of **at least 80/100 in all five areas**. Scores are qualitative checkpoints, not approval probabilities. The goal is reliable, useful, differentiable editorial content that helps a first-time IT job seeker finish a concrete task.

| Area | Earlier subjective baseline | 80-point acceptance evidence (not an official Google threshold) |
| --- | ---: | --- |
| AdSense readiness | 58 | AdSense account review verified separately; stable pages; no misleading navigation; original substantive content on major pages; contact/editorial/privacy/ads.txt functioning |
| Unique usefulness | 53 | At least 8 key pages have concrete task-specific examples, sourced data or tools with clear methodology; no invented experience, credentials or surveys |
| Readability / UX | 78 | 320px, 375px, 390px, 768px and desktop checked; paths from job choice to learning to comparing offers work; keyboard and JS-disabled fallback checked |
| SEO discoverability | 43 | Search Console property verified; settled 28-day clicks/impressions and important URLs' indexing inspectable; metadata/canonicals/links checked; next actions use actual queries |
| Sustainable growth | 83 | Measure trend from Search Console (clicks and engagement); avoid inflating claimed results; publish pages only if they solve clear reader needs |

## Competitor patterns examined (learning the principle, never copying the expression)
- [MHLW job tag — for individual users](https://shigoto.mhlw.go.jp/User/personaluse): Start from people's interests and work values, give a path to actual occupational information. **Adaptation:** transparent preference-to-role shortlisting within existing IT comparison sheet; not an official/validated aptitude assessment.
- [doda stepwise job-change checklists](https://doda.jp/guide/checklist/): Separate long activity into manageable phases and concrete checklists. **Adaptation:** original 7-day IT job exploration plan, linking original role/offer tools and producing written outputs.
- [Google Search, helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): Who created content, how it is made, why it exists, original usefulness; cite and verify official sources.
- [Google Search, crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=ja): Real HTML href links and descriptive anchors; every important article reachable.
- [AdSense site readiness](https://support.google.com/adsense/answer/7299563?hl=ja): Original relevant pages, navigable layouts, genuine visitor value.

## Implemented 2026-10-14
- Six-role comparison with transparent three-preference guidance; dynamically picks two illustrative roles and synchronizes the existing comparison table. Includes caveats and official sources.
- Main article's substantive seven-day checklist: each day's activity, usable output, direct links.
- Direct homepage route to the guided comparison.
- Existing persistent four-week study checklist, 3-step homepage path, search-empty fallbacks.
- Site Doctor validates navigator markup and extracted JS syntax (workflow-level validation; run status needs independent check).

## Follow-up improvements: 2026-10-14
- Compared official MHLW job tag, Geekly's job category finder, and doda's activity checklists and downloadable worksheets. Competitive advantage is not matching a job agency's listing supply: KOROPOP should stay independent, useful, and registration-free.
- Added **explicitly opt-in, device-only offer comparison draft preservation** to `kyujin-joken-hikaku.html`: save, restore, remove; no automatic storage of names or salaries. Updated privacy policy and Site Doctor checks. Live HTML controls confirmed by selector; full interactive behavior (save/reload/delete) still needs browser testing.
- Improved `shokushu-hikaku.html` horizontal comparison table by fixing its left row headings while scrolling on a phone. GitHub change confirmed, mobile visual layout not yet device-tested.
- Highest quality gap remains independently verified, specific information and clear evidence. Do not claim SEO traffic, approval or all internal 80-point targets based only on adding features.

## 2026-10-14 — PC kitting guide and existing article update
- Published `pc-kitting-mikeiken.html` (PCキッティングとは？未経験でもできる？). Sources checked against MHLW job tag's kitting occupational details and Microsoft Learn's Windows Autopilot overview. Focused on a seven-stage workflow, specific job interview questions, manual vs device deployment, and distinctions from helpdesk; avoids claiming actual experience, hiring results, or salary figures.
- Added a seven-check self-learning worksheet (copy/reset, no persistence, no analytics events for entered content) and mobile-friendly touch checkboxes in `career-deep-guides.css`.
- Linked from homepage IT roles and `mikeiken-it-helpdesk.html` / `it-helpdesk-ichinichi.html`. Fixed classification of future kitting guides to the IT roles section in `.github/workflows/build-career-hub.yml`.
- Automated sitemap contains the new article. Added Site Doctor validation for source links, article completeness, in-site links and JavaScript syntax. The workflow's success is not yet independently verified.
- Public-URL fetch returned a retrieval error in the available web tool; **do not describe the new article as independently rendered/interaction-tested in production until verified**.
- Next content: assess `未経験IT求人の「研修3か月」は信用できる？`, but first check if it overlaps the existing 15-point IT job guide. If it overlaps, deepen that guide before publishing a new page.

## 2026-10-14 — IT interview practice guide
- Published `mikeiken-it-mensetsu-20.html` after checking MHLW Hello Work interview guidance and job tag helpdesk / IT operations descriptions.
- Created 20 static, crawlable questions in four groups (experience, motivation, real IT work, teamwork/career), each with intent, grounded answer materials, and a concrete pitfall; added four clearly fictional practice answer examples. This is not a verified database of actual employers' interview questions.
- Added a browser-only practice worksheet: select one of 20 questions, draft a conclusion plus lived experience / actions / work relevance, preview and copy; no automatic saving or network transfer of response text.
- Updated `career-deep-guides.css` for mobile and linked from the homepage / existing job guide / motivation / resume articles.
- Automated sitemap includes the guide. Site Doctor validates question count, anchors, controls, source citations, and extracted JS syntax. Workflow run and live JavaScript clicking have not yet been independently verified.
- Next candidate: `ヘルプデスクから社内SEになる方法`. Aim to show differences between helpdesk and internal IT work, an evidence-based skill-mapping roadmap, specific artifacts to retain, and realistic job-check questions. Before publishing, inspect `mikeiken-shanai-se.html` and `mikeiken-it-helpdesk.html` for near-duplicate sections.
- Search Console is still unconnected to this tool as of the previous check; no actual organic click-volume basis for traffic forecasts.

## Next work without awaiting editorial suggestions
1. Test the new role navigator on phone (tap each select, candidate output, select sync, question copy, overflow/keyboard) and test JS-disabled article links. Fix errors.
2. Review 8 high-intent articles' factual sourcing and substantiation: unclear statistics, title/content mismatch, unverified claims, duplicate prose, outdated citations. Make **specific** edits backed by official publications. Never manufacture testimonials, review data, hiring rates, or experience.
3. Verify Search Console connection and settled search data. Prioritize URLs already getting impressions and answer the actual queries; no invented visitor counts.
4. Check header/footer, old root pages, subdomain redirects and navigation for mixed branding and broken destinations.
5. Verify publication, job map, 7-day worksheet and tool manually; re-evaluate internal scores only against concrete evidence.
6. Revisit AdSense reapplication after substantial improvements; review success is decided by Google, not these internal metrics.

## Change safety
Prefer small reversible commits, static accessible HTML fallbacks, privacy-friendly local processing, transparent selection logic, source links. Do not copy competitor text, images, CSS or proprietary datasets. Do not take site approval for granted.
