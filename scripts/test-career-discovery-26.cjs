// Regression on direct, server-rendered reading routes to the 26 articles
// that Google was not yet showing as indexed on 2026-10-14.
// This is a SOURCE audit, not proof of Google indexation.
'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const expected=[
 "mikeiken-shanai-se.html",
 "mikeiken-it-mensetsu-20.html",
 "shanai-se-ichinichi.html",
 "pc-kitting-mikeiken.html",
 "mikeiken-it-helpdesk.html",
 "helpdesk-kara-shanai-se.html",
 "it-helpdesk-ichinichi.html",
 "kyujin-joken-hikaku.html",
 "mikeiken-it-study-roadmap.html",
 "it-engineer-nenshu-suii.html",
 "ses-haken-jisha-ukeoi-chigai.html",
 "mikeiken-cloud-engineer.html",
 "mikeiken-infra-engineer.html",
 "it-mikeiken-shikaku.html",
 "mikeiken-it-yametoke.html",
 "shigoto-yametai-tsugi-kimattenai.html",
 "hito-to-kakawaranai-shigoto.html",
 "it-engineer-muiteiru.html",
 "it-job-nenshu-hikaku.html",
 "it-tenshoku-shikaku-nashi.html",
 "mikeiken-shikaku-nashi-shigoto.html",
 "mikeiken-network-engineer.html",
 "raku-na-shigoto.html",
 "mikeiken-soc-security.html",
 "shanai-se-raku-kitsui.html",
 "programming-nigate-it-job.html"
];
const entrances=[
 "it-mikeiken-shokumukeirekisho.html",
 "terms.html",
 "tedori.html",
 "privacy.html",
 "kyujin-check.html",
 "jobs.html",
 "it-engineer-remote.html",
 "about.html",
 "20s-it-tenshoku-nenshu.html",
 "career-general.html",
 "contact.html",
 "infra-engineer-yametoke.html",
 "mikeiken-it-shibodoki.html",
 "shokushu-hikaku.html",
 "20s-mikeiken-tenshoku.html",
 "30s-mikeiken-it-tenshoku.html",
 "mikeiken-it-kyujin-miwakekata.html",
 "index.html",
 "mikeiken-it-tenshoku.html"
];
const sitemap=fs.readFileSync('sitemap.xml','utf8');
const pages=new Map(entrances.map(p=>[p,fs.readFileSync(p,'utf8')]));
const pathRe=/\bhref=["']([^"']+)["']/gi;
function links(doc){
 return [...doc.matchAll(pathRe)].map(x=>x[1]).filter(x=>!x.startsWith('javascript:'))
  .map(x=>x.replace(/^https:\/\/koropopgames\.com\//,'').split('#')[0].split('?')[0]);
}
let routes=0;
for(const path of expected){
 assert.ok(fs.existsSync(path),'Guide must exist: '+path);
 assert.ok(sitemap.includes('<loc>https://koropopgames.com/'+path+'</loc>'),'Sitemap missing '+path);
 const article=fs.readFileSync(path,'utf8');
 assert.ok(/<h1\b/i.test(article),'Missing article heading: '+path);
 assert.ok(!/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(article),'Noindex guide: '+path);
 assert.ok(/<a\b/i.test(article),'Reader needs accessible links: '+path);
 const incoming=[...pages].filter(([from,doc])=>from!==path&&links(doc).includes(path)).map(([from])=>from);
 assert.ok(incoming.length>=2,'At least two accessible editorial entry pages must link directly to '+path+'; found '+incoming.join(', '));
 routes+=incoming.length;
}
const twenty=fs.readFileSync('20s-mikeiken-tenshoku.html','utf8');
for(const path of ['mikeiken-shikaku-nashi-shigoto.html','hito-to-kakawaranai-shigoto.html','raku-na-shigoto.html','shigoto-yametai-tsugi-kimattenai.html'])
 assert.ok(twenty.includes('href="'+path+'"'),'20s work-choice paths must stay discoverable: '+path);
assert.ok(twenty.includes('id="work-choice-next"'),'Reader decision block must remain visible');
for(const source of ['mikeiken-it-tenshoku.html','shokushu-hikaku.html'])
 assert.ok(pages.get(source).includes('href="ses-haken-jisha-ukeoi-chigai.html"'),'SES explanation must be linked from '+source);
console.log('26 priority pages PASS: 26 accessible live-source candidates, 2+ editorial entry links each, and context-led new work/SES reading routes ('+routes+' incoming links).');
