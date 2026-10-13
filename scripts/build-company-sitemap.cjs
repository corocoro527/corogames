#!/usr/bin/env node
'use strict';
// Keep company service sitemap separate from the IT editorial sitemap.
// Public service/demo pages only. Never publish proposals, contact forms or
// noindex demo/client-specific URLs.
const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
const base='https://koropopgames.com/';
const candidates=[];
for(const dir of ['company','company/solutions','company/demos']){
  const full=path.join(root,dir);
  if(!fs.existsSync(full))continue;
  for(const filename of fs.readdirSync(full).filter(x=>x.endsWith('.html')))
    candidates.push(dir+'/'+filename);
}
function metaTag(html,name){
  return (html.match(new RegExp('<meta\\b(?=[^>]*\\bname\\s*=\\s*["\\x27]'+name+'["\\x27])[^>]*>','i'))||[])[0]||'';
}
function att(tag,key){
  const m=tag.match(new RegExp('\\b'+key+'\\s*=\\s*["\\x27]([^"\\x27]*)["\\x27]','i'));
  return m?m[1]:'';
}
function esc(x){return x.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;').replaceAll('>','&gt;');}
const entries=[];
for(const rel of candidates){
  const html=fs.readFileSync(path.join(root,rel),'utf8');
  const robots=att(metaTag(html,'robots'),'content');
  if(/(?:^|,|\s)noindex(?:,|\s|$)/i.test(robots))continue;
  if(rel.includes('/proposals/')||rel.includes('/thanks')||rel.includes('/contact')||rel.includes('/operator'))continue;
  const tags=html.match(/<link\b[^>]*>/ig)||[];
  const canonicalTag=tags.find(t=>/\brel\s*=\s*["']canonical["']/i.test(t))||'';
  const canonical=att(canonicalTag,'href');
  const fallback=base+(rel==='company/index.html'?'company/':rel);
  const url=canonical||fallback;
  // Never let a foreign canonical enter our sitemap.
  if(!url.startsWith(base+'company/'))continue;
  let lastmod='';
  try{
    lastmod=cp.execFileSync('git',['log','-1','--format=%cs','--',rel],{cwd:root,encoding:'utf8'}).trim();
  }catch{}
  entries.push({url,lastmod});
}
entries.sort((a,b)=>a.url.localeCompare(b.url));
const lines=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
for(const e of entries){
  lines.push('  <url>');
  lines.push('    <loc>'+esc(e.url)+'</loc>');
  if(/^\d{4}-\d{2}-\d{2}$/.test(e.lastmod))lines.push('    <lastmod>'+e.lastmod+'</lastmod>');
  lines.push('  </url>');
}
lines.push('</urlset>','');
const dest=path.join(root,'company/sitemap.xml');
fs.writeFileSync(dest,lines.join('\n'),'utf8');
console.log('Company sitemap: '+entries.length+' indexable URLs');
