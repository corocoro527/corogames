// Regression for purposeful internal linking from already indexed IT entry points.
// Google URL Inspection results are external snapshots; this test verifies only repo source.
'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const routes=[
 {source:'mikeiken-it-tenshoku.html',links:[
  'it-helpdesk-ichinichi.html','shanai-se-ichinichi.html',
  'pc-kitting-mikeiken.html','helpdesk-kara-shanai-se.html'
 ],anchor:'career-specific-paths',style:'career-article-v2.css?v=20261014pathways1'},
 {source:'shokushu-hikaku.html',links:[
  'it-helpdesk-ichinichi.html','shanai-se-ichinichi.html','pc-kitting-mikeiken.html'
 ],selector:'role-day-examples'},
 {source:'20s-mikeiken-tenshoku.html',links:[
  'it-helpdesk-ichinichi.html','shanai-se-ichinichi.html'
 ],selector:'it-job-bridge'}
];
const unique=new Set();
for(const item of routes){
 const s=fs.readFileSync(item.source,'utf8');
 assert.ok(s.includes('rel="canonical"'),'Must retain original page canonical: '+item.source);
 if(item.anchor)assert.ok(s.includes('id="'+item.anchor+'"'),'Missing navigation landmark: '+item.source);
 if(item.selector)assert.ok(s.includes('class="'+item.selector+'"'),'Missing semantic contextual nav: '+item.source);
 if(item.style)assert.ok(s.includes(item.style),'Stylesheet cache for visible cards: '+item.source);
 for(const target of item.links){
  assert.ok(s.includes('href="'+target+'"'),item.source+' missing actual link '+target);
  assert.ok(fs.existsSync(target),'Link destination file missing: '+target);
  unique.add(target);
 }
 assert.ok(s.includes('@media(max-width:')||item.source==='mikeiken-it-tenshoku.html',
  'Cards should have phone layout rules: '+item.source);
}
const css=fs.readFileSync('career-article-v2.css','utf8');
for(const marker of ['.kp-practical-grid{','@media(max-width:640px){.kp-practical-grid','a:focus-visible']){
 assert.ok(css.includes(marker),'Responsive/accessibility styles missing: '+marker);
}
assert.ok(unique.size===4,'Exactly 4 complementary unindexed targets expected');
const jobHelpdesk=fs.readFileSync('mikeiken-it-helpdesk.html','utf8');
for(const target of ['it-helpdesk-ichinichi.html','pc-kitting-mikeiken.html']){
 assert.ok(jobHelpdesk.includes('href="'+target+'"'),'Helpdesk work examples missing: '+target);
}
for(const page of ['mikeiken-it-helpdesk.html','mikeiken-cloud-engineer.html']){
 const doc=fs.readFileSync(page,'utf8');
 const match=doc.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(match,'Article structured data expected in '+page);
 const metadata=JSON.parse(match[1]);
 assert.equal(metadata['@type'],'Article','Article type');
 assert.equal(metadata.mainEntityOfPage,'https://koropopgames.com/'+page,'Correct canonical schema');
 assert.ok(metadata.author?.name && metadata.publisher?.name,'Editorial/publisher identity');
 assert.ok(!metadata.datePublished,'Do not invent an unknown first-publication date');
}
console.log('Article JSON-LD is parseable on refreshed helpdesk and cloud guides');

const sitemap=fs.readFileSync('sitemap.xml','utf8');
for(const page of unique)assert.ok(sitemap.includes('https://koropopgames.com/'+page),'Missing sitemap page: '+page);
console.log('Indexed-hub related paths PASS: '+routes.length+' editorial entrances linking to '+unique.size+' destination guides');
