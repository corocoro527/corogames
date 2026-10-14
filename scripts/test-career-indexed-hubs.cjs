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
const sitemap=fs.readFileSync('sitemap.xml','utf8');
for(const page of unique)assert.ok(sitemap.includes('https://koropopgames.com/'+page),'Missing sitemap page: '+page);
console.log('Indexed-hub related paths PASS: '+routes.length+' editorial entrances linking to '+unique.size+' destination guides');
