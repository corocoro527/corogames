// Verify accessible, crawlable, responsive workday diagrams and uncluttered home.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const read=path=>fs.readFileSync(path,'utf8');
const home=read('index.html');
const page=read('shanai-se-ichinichi.html');
const helpdesk=read('it-helpdesk-ichinichi.html');
const legacy=read('mikeiken-shanai-se.html');
const css=read('career-deep-guides.css');
const homeCSS=read('career-extras.css');
const legacyCSS=read('career-article-v2.css');
const sitemap=read('sitemap.xml');
assert.ok(page.includes('rel="canonical" href="https://koropopgames.com/shanai-se-ichinichi.html"'));
for(const id of ['schedule','support-model','improve-model','differences','trouble','jobs','sources'])
 assert.ok(page.includes('id="'+id+'"'),'Missing article anchor '+id);
for(const source of ['doda.jp/guide/zukan/052.html','doda.jp/engineer/guide/inhousese/job.html',
 'shigoto.mhlw.go.jp/User/Occupation/Detail/320','shigoto.mhlw.go.jp/User/Occupation/Detail/318'])
 assert.ok(page.includes(source),'Missing reference '+source);
const support=page.match(/<article class="day-model" id="support-model"[\s\S]*?<\/article>/);
const improve=page.match(/<article class="day-model" id="improve-model"[\s\S]*?<\/article>/);
assert.ok(support&&improve,'Both career types required');
assert.equal((support[0].match(/<li><time>/g)||[]).length,8);
assert.equal((improve[0].match(/<li><time>/g)||[]).length,8);
assert.ok(page.includes('架空の日勤例')&&page.includes('架空の9時〜18時'));
assert.equal((page.match(/<h1>/g)||[]).length,1);
assert.ok(!page.includes('**問い合わせ'),'No raw markdown in HTML text');
assert.ok(css.includes('.day-models{')&&css.includes('@media(max-width:760px){.day-models,.day-diff-list{'));
const helpdeskSection=helpdesk.split('<section id="schedule">')[1].split('<section id="support">')[0];
assert.ok(helpdeskSection.includes('class="day-model day-model-single"'),'Helpdesk should use vertical timeline');
assert.equal((helpdeskSection.match(/<li><time>/g)||[]).length,8);
assert.ok(!helpdeskSection.includes('class="deep-table-scroll"'),'No horizontal workday table on phone');
assert.ok(helpdesk.includes('href="shanai-se-ichinichi.html"'));
assert.ok(legacy.includes('href="shanai-se-ichinichi.html"'));
assert.ok(legacyCSS.includes('.kp-visual-bridge{'));
// Visible role/workday navigation, no more than one open menu of extras.
assert.ok(home.includes('href="shanai-se-ichinichi.html"'));
assert.ok(home.includes('href="it-helpdesk-ichinichi.html"'));
assert.ok(home.includes('<details class="intent-explore">'));
assert.ok(home.includes('<summary class="intent-label">'));
assert.ok(!home.includes('<details class="intent-explore" open'));
assert.ok(home.indexOf('id="next-action"')<home.indexOf('<details class="intent-explore">'));
assert.ok(home.indexOf('<details class="intent-explore">')<home.indexOf('id="job-map"'));
assert.equal((home.match(/class="career-day-links"/g)||[]).length,1);
assert.ok(homeCSS.includes('details.intent-explore{')&&homeCSS.includes('.career-day-links{'));
assert.ok(homeCSS.includes('@media(max-width:500px){.career-day-links'));
assert.ok(sitemap.includes('https://koropopgames.com/shanai-se-ichinichi.html'));
console.log('Visual career pages: 2x8 accessible timeline blocks, simple home navigation, links, responsive styles, sources, sitemap PASS');
