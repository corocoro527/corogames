// Protect contextual links from Google-visible introductory career guides
// to useful crawlable, registration-free preparation tools.
// This checks HTML links, NOT whether Google indexes or ranks them.
'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const cases=[
 {source:'20s-mikeiken-tenshoku.html',id:'it-application-steps',targets:[
   'shokushu-hikaku.html','kyujin-joken-hikaku.html',
   'it-mikeiken-shokumukeirekisho.html','mikeiken-it-mensetsu-20.html'
 ]},
 {source:'30s-mikeiken-it-tenshoku.html',id:'apply-practice',targets:[
   'it-mikeiken-shokumukeirekisho.html','mikeiken-it-mensetsu-20.html'
 ]},
 {source:'mikeiken-it-tenshoku.html',id:'application-tools',targets:[
   'it-mikeiken-shokumukeirekisho.html','mikeiken-it-mensetsu-20.html'
 ]},
 {source:'mikeiken-it-kyujin-miwakekata.html',id:'apply-next',targets:[
   'kyujin-joken-hikaku.html','it-mikeiken-shokumukeirekisho.html'
 ]}
];
const css=fs.readFileSync('career-article-v2.css','utf8');
assert.ok(css.includes('.kp-practical-paths{'));
assert.ok(css.includes('.kp-practical-grid{'));
assert.ok(css.includes('@media(max-width:640px){.kp-practical-grid{grid-template-columns:1fr'));
let links=0;
for(const item of cases){
 const html=fs.readFileSync(item.source,'utf8');
 const id='id="'+item.id+'"';
 assert.equal(html.split(id).length-1,1,'Must render exactly one contextual path block: '+item.source);
 const start=html.indexOf('<section class="kp-practical-paths" '+id);
 assert.ok(start!==-1,'Missing semantic section for '+item.source);
 const end=html.indexOf('</section>',start);
 assert.ok(end>start,'Unclosed pathway section '+item.source);
 const block=html.slice(start,end);
 assert.ok(block.includes('<h2')&&block.includes('<p>'),'Useful editorial context '+item.source);
 for(const dest of item.targets){
  assert.ok(block.includes('href="'+dest+'"'),'Missing purpose-built link '+item.source+' -> '+dest);
  assert.ok(fs.existsSync(dest),'Broken destination '+dest);
  assert.ok(dest!==item.source,'No self links');
  links++;
 }
 const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]);
 assert.equal(ids.filter(x=>x===item.id).length,1);
 assert.equal((html.match(/<h1\b/gi)||[]).length,1);
 assert.ok(/career-article-v2\.css/.test(html),'Responsive CSS not included');
}
console.log('Career reader pathways PASS: '+cases.length+' indexed guide pages, '+links+' meaningful static links, mobile grid');
