// Verify actual homepage cards remain findable by readers' words.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const home=fs.readFileSync('index.html','utf8');
const script=fs.readFileSync('career-search.js','utf8');
const matchCards=[...home.matchAll(/<a class="article-link" href="([^"]+)">([\s\S]*?)<\/a>/g)];
assert.ok(matchCards.length>=20,'Expected a usable guide directory');
function classList(){
 const items=new Set();
 return {add(v){items.add(v)},toggle(v,b){
  const next=typeof b==='boolean'?b:!items.has(v);
  next?items.add(v):items.delete(v);return next;
 },contains(v){return items.has(v)}};
}
function control(value=''){
 return {value,textContent:'',hidden:false,dataset:{},listeners:{},children:[],
 replaceChildren(...items){this.children=items;},
 classList:classList(),addEventListener(event,callback){this.listeners[event]=callback},
 setAttribute(name,val){this[name]=val},focus(){},scrollIntoView(){}};
}
const cards=matchCards.map(([_,href,body])=>{
 const content=body.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');
 return {textContent:content,hidden:false,classList:classList(),
  getAttribute(k){return k==='href'?href:null},
  querySelector(k){const h=body.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);return k==='h3'&&h?{textContent:h[1].replace(/<[^>]*>/g,'')}:null}};
});
const fields=Object.fromEntries(['articleSearch','clearSearch','searchStatus','noResults','moreRoles','searchMatches','searchMatchesLinks','searchMatchesCount'].map(id=>[id,control()]));
const topicWords=[...home.matchAll(/data-search-term="([^"]+)"/g)].map(m=>m[1]);
const quick=topicWords.map(w=>{const x=control();x.dataset.searchTerm=w;return x});
const sections=[{hidden:false,querySelectorAll(){return cards.filter(x=>!x.hidden)}}];
const roles={...control(),querySelectorAll(){return cards.slice(0,8)}};
const stages=[...home.matchAll(/<li><a href="([^"]+)"><span class="career-path-num">/g)].map((m)=>{const x=control();x.getAttribute=k=>k==='href'?m[1]:null;return x});
let events=[];
const document={
 createElement(tag){const e=control();e.tagName=tag.toUpperCase();e.href='';return e;},
 getElementById(id){return id==='roles'?roles:fields[id]||null},
 querySelectorAll(q){
  if(q==='.topic-section .article-link')return cards;
  if(q==='.topic-section')return sections;
  if(q==='[data-search-term]')return quick;
  if(q==='.career-path-list a')return stages;
  throw new Error('Unexpected query '+q);
 }
};
new Function('document','window',script)(document,{gtag(...args){events.push(args)}});
const input=fields.articleSearch;
function search(query){
 input.value=query;input.listeners.input();
 return cards.filter(c=>!c.hidden).map(c=>c.getAttribute('href'));
}
function has(query,href){
 assert.ok(search(query).includes(href),query+' should find '+href);
}
has('情シス','mikeiken-shanai-se.html');
has('情報システム','mikeiken-shanai-se.html');
has('PCセットアップ','pc-kitting-mikeiken.html');
has('パソコン初期設定','pc-kitting-mikeiken.html');
has('客先常駐','ses-haken-jisha-ukeoi-chigai.html');
has('逆質問','mikeiken-it-mensetsu-20.html');
has('社内SE 未経験','mikeiken-shanai-se.html');
assert.equal(fields.searchMatches.hidden,false,'Search suggestions must be visible immediately');
assert.ok(fields.searchMatchesLinks.children.length>0 && fields.searchMatchesLinks.children.length<=6,'Only a small set of immediately actionable suggestions');
assert.ok(fields.searchMatchesLinks.children.some(link=>link.href==='mikeiken-shanai-se.html'),'Matching articles should be directly clickable');
assert.ok(fields.searchMatchesLinks.children.every(link=>link.tagName==='A'),'Use real accessible links, not injected HTML');
const fallback=search('社内SE 惑星研究');
assert.ok(fallback.length>0&&fallback.length<=8,'Partial results are controlled');
assert.match(fields.searchStatus.textContent,/すべての言葉に一致する記事はありません/);
const zero=search('銀河ガラス浮遊船');
assert.equal(zero.length,0);
assert.equal(fields.noResults.hidden,false);
assert.equal(fields.searchMatches.hidden,true,'No suggestions for a search with zero results');
assert.equal(fields.searchMatchesLinks.children.length,0);
const all=search('');
assert.equal(all.length,cards.length,'Clearing must restore all articles');
assert.equal(fields.noResults.hidden,true);
assert.equal(fields.searchMatches.hidden,true,'Do not clutter browsing with results when search is empty');
assert.ok(quick.some(x=>x.dataset.searchTerm==='情シス'));
const q=quick.find(x=>x.dataset.searchTerm==='情シス');
q.listeners.click();
assert.ok(cards.some(c=>!c.hidden&&c.getAttribute('href')==='mikeiken-shanai-se.html'));
assert.equal(q['aria-pressed'],'true');
fields.clearSearch.listeners.click();
assert.equal(input.value,'');
assert.equal(cards.filter(c=>!c.hidden).length,cards.length);
// Existing anonymous five-stage analytics must survive search refactors.
assert.equal(stages.length,5);
stages[0].listeners.click();
assert.equal(events[0][1],'career_step_01_click');
assert.ok(!script.includes('gtag(') || !events[0][2].search_text);
console.log('Career search regression: synonyms, multiword AND, partial suggestions, empty, shortcuts, privacy and 5-stage analytics PASS ('+cards.length+' cards)');
