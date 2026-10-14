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

## Revenue-focused reader journey improvements — 2026-10-14
- Added `helpdesk-kara-shanai-se.html`: a concrete bridge from IT helpdesk to in-house IT / internal systems work. Differentiates 4 common job responsibilities, presents 90-day learning steps, realistic resume translations and an interactive six-item skill-to-next-action worksheet (not an aptitude or hiring probability score). Official sources: MHLW job tag pages for helpdesk, IT operations, foundation systems engineer. Examples are editorial hypotheticals, no fabricated user interview or employment outcome.
- Linked from existing `mikeiken-it-helpdesk.html` and `mikeiken-shanai-se.html`. Automated homepage directory includes the new article in roles; automated sitemap contains its URL.
- Strengthened homepage's 3-step reading path into 5 linked stages: role comparison -> study -> offer scrutiny -> resume drafting -> interview practice. `career-extras.css` uses responsive auto-fit layout.
- `career-search.js` adds aggregate GA4 events `career_step_01_click` through `career_step_05_click` on navigation link activation, with static stage destination only. No search text, form data or personal identifiers in custom events. `privacy.html` transparently discloses this event collection.
- Simulated-browser tests in the working JavaScript runtime passed for helpdesk planner (create, copy, invalidate, reset) and five-step GA4 event listener. Static source checks confirmed 8 chapter IDs, 6 skill checks, five homepage links and sitemap/internal-link registration.
- `.github/workflows/site-doctor.yml` now checks five-stage path, event registration/privacy/mobile CSS and new skill planner article/scripts. Full CI workflow completion and live production interaction could not be confirmed; the available public web fetch of koropopgames.com returned an accessibility error, and local container DNS resolution failed.
- No claim of approved AdSense, actual increased revenue, live GA4 event delivery or real search impressions; GSC measurements should be connected and analyzed before revenue projections.
- Strong next priorities: verified Search Console data, high-intent article improvements using actual search terms, a documented editorial fact-check process and conversion evidence before changing monetization methods. Avoid solely optimizing for ad clicks: make user tasks genuinely useful and keep ad/affiliate disclosures clear.

## 2026-10-14 — Next-action wayfinding + mobile readability
- **Observed information-architecture issue:** the homepage has a job map, a five-stage journey, six topic shortcuts, several content categories and multiple tools. Visitors who have not picked an IT role may struggle to know the *single next action*. This is an editorial UX hypothesis, not a validated usability study.
- **Shipped:** `career-next-action.js` and an accessible HTML guide `#next-action` near the top of `index.html`. Six preparation stages and six concerns produce 36 rule-based recommendations. Each contains **one specific action** with a primary and related destination; this does not claim to be a psychological aptitude test. It does not store input, collect text, or send personal answers to a server. Two default HTML links work even without scripts; main homepage CTA leads directly to the tool.
- **Mobile accessibility:** `career-extras.css` has 48px+ select targets, visible keyboard focus and responsive single-column controls. At phone widths below 560px, IT job cards switch to one column and unreadably small category captions are increased. The note color improved from #688079 (~4.24:1) to #526e66 (~5.55:1) against white.
- **Regression protection:** `scripts/test-career-next-action.cjs`, called by `.github/workflows/site-doctor.yml`, verifies all 36 stage/concern combinations, meaningful descriptions, actual local destination files, required semantic markup, working no-JS fallback, hero link and style requirements. Static JavaScript simulation tested all 36 routes successfully; CI run outcome and real screen-reader/phone testing have not been independently confirmed.
- Competitor/context comparison: [MHLW job tag](https://shigoto.mhlw.go.jp/User/personaluse) has multi-entry career discovery and saved lists; [doda](https://doda.jp/guide/syokureki/download.html) offers editable resume templates; [Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=ja) emphasizes practical, people-first, original value. KOROPOP's own opportunity: short, registration-free, transparent decision aids tied to practical action.
- Google Search Console/GSC Wizard currently lists **no connected properties**. Therefore no actual search queries, impressions, ranking, Google approval or revenue can be attributed to these edits. Public production page fetch and real device testing were unavailable during this pass; GitHub repo updates and static test success are not proof of a successfully deployed interface.
- **Next:** verify real browser keyboard + 320–430px phone layouts, test with at least 3 new IT career readers, connect Search Console to prioritize based on measured impressions and queries; validate the largest articles against official sources and demonstrate example correctness. Any existing analytics should be checked for clean event capture without logging visitor text.

## 2026-10-14 — Synonym-aware article search and robust fallback
- **Observed discoverability problem:** `career-search.js` originally stripped all spaces and matched one contiguous input substring against visible article-card text. That made multi-word questions like "社内SE 未経験" brittle and common names like "情シス" unable to discover the existing 社内SE page.
- **Improved:** term tokenization (NFKC Unicode normalization), transparent Japanese IT/job-title aliases, all-keyword matching across cards, clear "related candidates" fallback (max 8) when multi-term search has no complete match, and explicit zero-results messaging. Search remains completely local to the browser; user search text is not sent as a GA4 event or to an external search service.
- **Reader cues:** index search placeholder uses sample real-world queries; added "情シス" and "PC設定" topic chips; added small, accessible explanation of aliases, local processing, and the no-JavaScript article-list fallback. Bumped the search JS and CSS cache query strings.
- **Regression:** `scripts/test-career-search.cjs` checks the **actual current homepage directory** (28 cards in this pass), colloquial/alias matches, multi-word AND, clearly labelled partial matches, 0 results, clearing, quick topic activation, and preservation of existing anonymous 5-stage analytics. Executed the exact test script using a mock of the Node built-ins in Code Mode and obtained PASS; CI is configured to run it via Site Doctor but **the GitHub Actions run status has not been confirmed**. No real mobile browser interaction or measured search satisfaction data is available yet.
- **Remaining UX work:** test native mobile input focus, voice input, keyboard, scroll position and screen reader announcements; check searches most often used after obtaining an authorized Google Analytics/Search Console report. GSC Wizard currently has no connected Search Console properties; do not claim SEO outcomes.

## Next work without awaiting editorial suggestions
1. Test the new role navigator on phone (tap each select, candidate output, select sync, question copy, overflow/keyboard) and test JS-disabled article links. Fix errors.
2. Review 8 high-intent articles' factual sourcing and substantiation: unclear statistics, title/content mismatch, unverified claims, duplicate prose, outdated citations. Make **specific** edits backed by official publications. Never manufacture testimonials, review data, hiring rates, or experience.
3. Verify Search Console connection and settled search data. Prioritize URLs already getting impressions and answer the actual queries; no invented visitor counts.
4. Check header/footer, old root pages, subdomain redirects and navigation for mixed branding and broken destinations.
5. Verify publication, job map, 7-day worksheet and tool manually; re-evaluate internal scores only against concrete evidence.
6. Revisit AdSense reapplication after substantial improvements; review success is decided by Google, not these internal metrics.

## Change safety
Prefer small reversible commits, static accessible HTML fallbacks, privacy-friendly local processing, transparent selection logic, source links. Do not copy competitor text, images, CSS or proprietary datasets. Do not take site approval for granted.
