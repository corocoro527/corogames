// Static readiness only. This does NOT confirm live HTTP 200, crawling, Google indexing or rankings.
'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const sitemap=read('sitemap.xml');
const robots=read('robots.txt');
const hostname=read('CNAME').trim();
assert.equal(hostname,'koropopgames.com','Domain must match sitemap and canonical');
assert.ok(robots.includes('Allow: /'),'Do not accidentally disallow public pages');
assert.ok(robots.includes('Sitemap: https://koropopgames.com/sitemap.xml'),'Reference canonical sitemap');
assert.ok(!/^\s*Disallow:\s*\/\s*$/mi.test(robots),'Root crawling forbidden');
const urls=[...sitemap.matchAll(/<loc>\s*(https:\/\/koropopgames\.com\/[^<]*)\s*<\/loc>/g)].map(m=>m[1].trim());
assert.equal(new Set(urls).size,urls.length,'Duplicate canonical sitemap URLs');
assert.ok(urls.length>=45,'Sitemap unexpectedly sparse');
const pages=urls.map(url=>{
 const path=url==='https://koropopgames.com/'?'index.html':url.replace('https://koropgames.com/','').replace('https://koropopgames.com/','');
 assert.match(path,/^[\w-]+\.html$/,'Unexpected non-HTML sitemap URL');
 assert.ok(fs.existsSync(path),'Sitemap target missing: '+path);
 const doc=read(path),head=doc.slice(0,doc.search(/<\/head>/i)+7);
 assert.ok(head.includes('</head>')||head.includes('</HEAD>'),'Missing closed head: '+path);
 const canonical=(head.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)||[])[0]||'';
 assert.ok(canonical.includes('href="'+url+'"')||canonical.includes("href='"+url+"'"),'Canonical mismatch '+path);
 const metas=[...head.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]);
 const robotsTag=metas.find(m=>/\bname=["']robots["']/i.test(m))||'';
 assert.ok(!/content=["'][^"']*(?:noindex|none)/i.test(robotsTag),'Accidental noindex '+path);
 assert.ok(metas.some(m=>/\bname=["']description["']/i.test(m)),'Description missing '+path);
 assert.ok(metas.some(m=>/\bname=["']viewport["']/i.test(m)),'Mobile viewport missing '+path);
 assert.ok(/<title\b/i.test(head),'Title missing '+path);
 assert.equal((doc.match(/<h1\b/gi)||[]).length,1,'Single top heading expected: '+path);
 for(const block of doc.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
  let schema;
  try{schema=JSON.parse(block[1])}catch(error){throw new Error('Broken JSON-LD '+path+': '+error.message)}
  assert.ok(schema['@context']||schema['@graph'],'JSON-LD context missing: '+path);
 }

 return path;
});
const redirect=read('career.html');
assert.ok(redirect.includes('noindex,follow'),'Retired career.html route must not compete with the real homepage');
assert.ok(!urls.includes('https://koropopgames.com/career.html'),'Redirect must not be placed in sitemap');
console.log('Search readiness PASS (source code only): '+pages.length+' canonical URLs, matching domain, crawl rules, no accidental noindex, basic headings and metadata');
