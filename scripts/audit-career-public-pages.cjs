/**
 * KOROPOP CAREER sitewide offline link/structure audit.
 * Reads every public HTML path in sitemap.xml plus the homepage.
 * No network requests, tracking, mutation, personal data or external dependencies.
 */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const sitemap=read('sitemap.xml');
const publicFiles=[...new Set(['index.html',...[...sitemap.matchAll(/<loc>\s*https:\/\/koropopgames\.com\/([^<]+\.html)\s*<\/loc>/gi)].map(x=>x[1])])].sort();
assert.ok(publicFiles.length>=35,'Sitemap has unexpectedly few career pages');
const errors=[],warnings=[],inbound=new Map(publicFiles.map(f=>[f,0]));
const exists=rel=>fs.existsSync(path.join(root,rel));
const isLocal=url=>!url.startsWith('mailto:')&&!url.startsWith('tel:')&&!url.startsWith('data:')&&!url.startsWith('javascript:')&&!url.startsWith('//')&&!/^https?:\/\//i.test(url);
function assetUrl(raw,current){
 const link=raw.split('?')[0].split('#')[0];
 if(!link||link==='/')return null;
 if(link.startsWith('/'))return link.slice(1);
 const norm=path.posix.normalize(path.posix.join(path.posix.dirname(current),link));
 if(norm.startsWith('../')||norm.startsWith('/'))return null;
 return norm;
}
for(const file of publicFiles){
 if(!exists(file)){errors.push(file+': sitemap references a missing HTML file');continue}
 const html=read(file);
 if(!/<html\b[^>]*lang=["']ja["']/i.test(html))warnings.push(file+': missing html lang=ja');
 if(!/<meta\b[^>]*name=["']viewport["']/i.test(html))warnings.push(file+': missing mobile viewport');
 if((html.match(/<h1\b/gi)||[]).length!==1)warnings.push(file+': expected exactly one H1');
 if(!/<main\b/i.test(html)&&!/\brole=["']main["']/i.test(html))warnings.push(file+': no primary main landmark');
 if(!/<meta\b[^>]*name=["']description["']/i.test(html))warnings.push(file+': meta description missing');
 const title=html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim();
 if(!title)errors.push(file+': title missing');
 const canon=html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
 if(canon && canon!==('https://koropopgames.com/'+(file==='index.html'?'':file)))warnings.push(file+': unexpected canonical '+canon);
 if(!canon)warnings.push(file+': canonical missing');
 const idMatches=[...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m=>m[1]);
 const ids=new Set(idMatches);
 const duplicate=[...new Set(idMatches.filter((v,i)=>idMatches.indexOf(v)!==i))];
 if(duplicate.length)errors.push(file+': duplicate IDs '+duplicate.join(', '));
 for(const anchor of html.matchAll(/<a\b[^>]*>/gi)){
  const tag=anchor[0];
  const href=tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
  if(!href)continue;
  const targ=tag.match(/\btarget=["']_blank["']/i);
  if(targ&&!/\brel=["'][^"']*\bnoopener\b/i.test(tag))warnings.push(file+': new-tab link should set rel=noopener');
  let raw=href;
  if(raw.startsWith('https://koropopgames.com/'))raw=raw.slice('https://koropopgames.com/'.length);
  else if(!isLocal(raw))continue;
  if(raw.startsWith('//'))continue;
  const [urlPath,fragment]=raw.split('#');
  const target=urlPath?assetUrl(urlPath,file):file;
  if(target===null)continue;
  const dest=target==='index.html'||!target?'index.html':target;
  if(!/\.html$/i.test(dest))continue;
  if(!exists(dest)){errors.push(file+': broken internal link '+href);continue}
  if(inbound.has(dest))inbound.set(dest,inbound.get(dest)+1);
  if(fragment && fragment!=='top'){
   const targetHtml=dest===file?html:read(dest);
   const decoded=(()=>{try{return decodeURIComponent(fragment)}catch{return fragment}})();
   if(!targetHtml.includes('id="'+decoded+'"')&&!targetHtml.includes("id='"+decoded+"'")&&!targetHtml.includes('name="'+decoded+'"')){
    errors.push(file+': broken section anchor '+href);
   }
  }
 }
 for(const attr of html.matchAll(/<(?:script|link|img)\b[^>]*>/gi)){
  const tag=attr[0];
  const source=tag.match(/\b(?:src|href)=["']([^"']+)["']/i)?.[1];
  if(!source||!isLocal(source)||source.startsWith('#'))continue;
  const destination=assetUrl(source,file);
  if(!destination)continue;
  if(/\.(css|js|png|svg|webp|jpg|jpeg|gif|ico|woff2?)$/i.test(destination)&&!exists(destination)){
   errors.push(file+': missing static asset '+source);
  }
  if(/^<img\b/i.test(tag) && !/\balt=["']/i.test(tag))warnings.push(file+': image without alternative-text attribute');
 }
}
const orphan=publicFiles.filter(file=>file!=='index.html'&&(inbound.get(file)||0)===0);
for(const file of orphan)warnings.push(file+': no incoming link found from any indexed HTML (may only be navigable elsewhere)');
const byType={pages:publicFiles.length,errors:errors.length,warnings:warnings.length,orphanPages:orphan.length};
console.log('KOROPOP full public-site audit:',JSON.stringify(byType));
if(errors.length)console.log('ERRORS\n'+errors.map(e=>'- '+e).join('\n'));
if(warnings.length)console.log('WARNINGS\n'+warnings.map(e=>'- '+e).join('\n'));
if(errors.length)process.exitCode=1;
