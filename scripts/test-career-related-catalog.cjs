// Related reading index is meant to reflect all editorial article cards, not an obsolete snapshot.
'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const items=JSON.parse(fs.readFileSync('koropop-articles.json','utf8'));
const home=fs.readFileSync('index.html','utf8');
const general=fs.readFileSync('career-general.html','utf8');
const workflow=fs.readFileSync('.github/workflows/build-career-hub.yml','utf8');
const paths=new Set();
for(const item of items){
 assert.match(item.url,/^[\w-]+\.html$/,'Local article link only');
 assert.ok(!paths.has(item.url),'Related entry duplicated: '+item.url);
 paths.add(item.url);
 assert.ok(fs.existsSync(item.url),'Missing article '+item.url);
 assert.ok(item.title&&item.description,'Missing article metadata '+item.url);
 assert.ok(['it','career','work'].includes(item.category),'Unexpected related category '+item.url);
 assert.ok(Array.isArray(item.tags)&&item.tags.length>0,'Tag-less article '+item.url);
}
const entries=[...home.matchAll(/<a class="article-link" href="([^"]+\.html)"/g),...general.matchAll(/<a class="article-link" href="([^"]+\.html)"/g)].map(x=>x[1]);
assert.ok(entries.length>=25,'Article directories unexpectedly empty');
for(const file of entries)assert.ok(paths.has(file),'Directory article missing from recommendations: '+file);
for(const required of ['shanai-se-ichinichi.html','it-helpdesk-ichinichi.html','pc-kitting-mikeiken.html',
 'helpdesk-kara-shanai-se.html','mikeiken-it-mensetsu-20.html','it-mikeiken-shokumukeirekisho.html',
 'ses-haken-jisha-ukeoi-chigai.html'])assert.ok(paths.has(required),'New guide is missing from related catalog: '+required);
assert.ok(workflow.includes('related_path = Path("koropop-articles.json")'));
assert.ok(workflow.includes('git add index.html career-general.html koropop-articles.json'));
console.log('Related catalog PASS: '+items.length+' tagged guides, '+entries.length+' editorial directory cards, fresh automation');
