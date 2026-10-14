// Intent-first links from established IT career articles to practical, crawlable work guides.
// These links improve human navigation; they do not guarantee Google indexing.
'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const config=[
 {page:'mikeiken-it-kyujin-miwakekata.html',id:'workday-verification',targets:[
  'shanai-se-ichinichi.html','it-helpdesk-ichinichi.html','pc-kitting-mikeiken.html']},
 {page:'30s-mikeiken-it-tenshoku.html',id:'real-workday-examples',targets:[
  'shanai-se-ichinichi.html','it-helpdesk-ichinichi.html','helpdesk-kara-shanai-se.html']}
];
const css=fs.readFileSync('career-article-v2.css','utf8');
assert.ok(css.includes('.kp-practical-grid{'),'Shared guidance cards styled on desktop');
assert.ok(css.includes('@media(max-width:640px){.kp-practical-grid{grid-template-columns:1fr'),'Guidance cards stack on phones');
for(const item of config){
 const doc=fs.readFileSync(item.page,'utf8');
 assert.equal(doc.split('id="'+item.id+'"').length-1,1,'One curated guide section per page');
 const start=doc.indexOf('<section class="kp-practical-paths" id="'+item.id+'"');
 assert.ok(start>=0,'Section should appear in crawlable static HTML');
 const end=doc.indexOf('</section>',start);
 assert.ok(end>start,'Section properly closed');
 const section=doc.slice(start,end);
 assert.match(section,/<h2 id="[^"]+-title">.+<\/h2>/,'User-first descriptive heading');
 assert.ok(section.includes('実際')||section.includes('仕事'),'Explain how to compare actual work');
 for(const target of item.targets){
  assert.ok(fs.existsSync(target),'Broken target '+target);
  const links=[...section.matchAll(/<a href="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(links.filter(p=>p===target).length,1,'Exactly one contextual link to '+target);
 }
 assert.equal((section.match(/<a href="/g)||[]).length,item.targets.length,'No unrelated links');
 assert.ok(section.includes('説明用'),'Avoid implying time examples are observed employment data');
}
console.log('Real-work discovery links PASS: 2 established pages, 6 topical static links, mobile styles and existing targets');
