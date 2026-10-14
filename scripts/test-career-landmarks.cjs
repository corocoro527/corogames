// Persistent accessibility regression for older KOROPOP article templates.
'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const pages=[
 '20s-mikeiken-tenshoku.html','30s-mikeiken-it-tenshoku.html',
 'hito-to-kakawaranai-shigoto.html','it-engineer-nenshu-suii.html',
 'it-tenshoku-shikaku-nashi.html','mikeiken-cloud-engineer.html',
 'mikeiken-infra-engineer.html','mikeiken-it-helpdesk.html',
 'mikeiken-it-tenshoku.html','mikeiken-shanai-se.html',
 'mikeiken-shikaku-nashi-shigoto.html','programming-nigate-it-job.html',
 'raku-na-shigoto.html','shigoto-yametai-tsugi-kimattenai.html'
];
const css=fs.readFileSync('career-article-v2.css','utf8');
assert.ok(css.includes('.kp-skip-main:focus'),'Skip-link visible on focus');
for(const page of pages){
 const s=fs.readFileSync(page,'utf8');
 assert.ok(s.includes('id="kp-main"'),page+': main landmark ID');
 assert.ok(s.includes('href="#kp-main"'),page+': skip link missing');
 assert.ok(/<a class="kp-skip-main" href="#kp-main">本文へスキップ<\/a>/.test(s),page+': skip target text');
 assert.ok(s.indexOf('href="#kp-main"')<s.indexOf('</header>'),page+': skip must precede navigation');
 assert.ok(/(?:<main\b[^>]*id="kp-main"|<div\b[^>]*id="kp-main"[^>]*role="main")/.test(s),page+': accessible main landmark');
 assert.ok(s.includes('tabindex="-1"'),page+': focusable skip destination');
 assert.ok(s.includes('career-article-v2.css?v=20261014skip1'),page+': refreshed stylesheet for first-time visitors');
}
const reader=fs.readFileSync('koropop-reader.js','utf8');
for(const key of ['.kp-reading-breadcrumb','.deep-crumb','.crumb',"nav[aria-label='現在のページ']"]){
 assert.ok(reader.includes(key),'Reader must respect manually authored breadcrumb '+key);
}
for(const page of ['mikeiken-shanai-se.html','mikeiken-it-helpdesk.html','mikeiken-infra-engineer.html',
 'mikeiken-it-kyujin-miwakekata.html','mikeiken-it-shibodoki.html']){
 const s=fs.readFileSync(page,'utf8');
 assert.ok(s.includes('class="kp-reading-breadcrumb"'),page+': manually authored navigation');
 assert.ok(s.includes('koropop-reader.js?v=20261014dedupe1'),page+': updated reader script not cached');
}
console.log('Legacy article UX regression PASS: 14 skip/main landmarks, 5 reader breadcrumb dedupe cases');
