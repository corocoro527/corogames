// Verify truthful article metadata, useful next steps, and readable light panels on dark themes.
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const read=p=>fs.readFileSync(p,'utf8');
for(const path of ['it-engineer-nenshu-suii.html','mikeiken-shikaku-nashi-shigoto.html']){
 const html=read(path);
 const scripts=[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
 assert.equal(scripts.length,1,path+': exactly one Article JSON-LD block');
 const data=JSON.parse(scripts[0][1]);
 assert.equal(data['@type'],'Article',path+': article type');
 assert.equal(data.mainEntityOfPage['@id'],'https://koropopgames.com/'+path,path+': exact canonical identifier');
 assert.equal(data.publisher.name,'KOROPOP CAREER');
 assert.ok(data.description&&data.headline&&data.author?.name&&data.inLanguage==='ja',path+': metadata complete');
 assert.ok(!data.datePublished,path+': do not invent an initial publication date');
 assert.ok(html.includes('career-article-v2.css?v=20261014contrast1'),path+': fresh stylesheet for readable contrast');
 assert.ok(html.includes('<meta name="robots" content="index,follow,max-image-preview:large">'),path+': preserve indexing');
}
const css=read('career-article-v2.css');
assert.ok(css.includes('.kp-decision-practice p,.kp-decision-practice li{color:#284a43!important}'),'Light decision notes need dark readable text');
assert.ok(css.includes('.kp-official-check,.kp-official-check p,.kp-official-check li{color:#264941!important}'),'Official source notes need dark readable text');
assert.ok(css.includes('.kp-official-check a:focus-visible'),'Official links require visible keyboard focus');
const salary=read('it-engineer-nenshu-suii.html');
assert.ok(salary.includes('class="kp-official-check"'),'Salary article must retain the original official-source references');
assert.ok(salary.includes('class="kp-decision-practice"'),'Salary article must retain the original decision exercise');
const jobs=read('mikeiken-shikaku-nashi-shigoto.html');
assert.ok(jobs.includes('id="compare-applications"'),'Add a usable decision guide for readers');
for(const link of ['kyujin-joken-hikaku.html','it-helpdesk-ichinichi.html']) {
 assert.ok(jobs.includes('href="'+link+'"'),'New guide must directly link to '+link);
 assert.ok(fs.existsSync(link),'Linked destination must exist: '+link);
}
console.log('Career schema & contrast PASS: 2 factual article records; readable light panels, mobile-friendly job comparisons and contextual links');
