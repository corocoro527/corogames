/* KOROPOP CAREER — local article filter; no external search service. */
(function(){
'use strict';
const input=document.getElementById('articleSearch');
const clear=document.getElementById('clearSearch');
const status=document.getElementById('searchStatus');
const empty=document.getElementById('noResults');
if(!input||!status||!empty)return;
const cards=Array.from(document.querySelectorAll('.topic-section .article-link'));
const sections=Array.from(document.querySelectorAll('.topic-section'));
const fold=s=>String(s||'').normalize('NFKC').toLocaleLowerCase('ja-JP').replace(/\s+/g,'');
function filter(){
const needle=fold(input.value);let count=0;
for(const card of cards){const show=!needle||fold(card.textContent).includes(needle);card.hidden=!show;if(show)count++}
for(const sec of sections){const shown=sec.querySelectorAll('.article-link:not([hidden])').length;sec.hidden=!!needle&&shown===0;}
status.textContent=needle?'「'+input.value.trim()+'」の検索結果：'+count+'件':'全'+cards.length+'記事から検索できます';
empty.hidden=count!==0;
clear.hidden=input.value.length===0;
}
input.addEventListener('input',filter);
clear.addEventListener('click',()=>{input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));input.focus()});
filter();

/* Keep the long IT directory compact until the reader asks for more. */
const it=document.getElementById('it'),more=document.getElementById('moreIt');
if(it&&more){
 const extras=Array.from(it.querySelectorAll('.article-link')).slice(6);
 if(extras.length){
  extras.forEach(el=>el.classList.add('extra-article'));
  it.classList.add('has-extras');
  more.hidden=false;
  more.textContent='ほかのIT転職の記事 '+extras.length+'件を見る ↓';
  more.addEventListener('click',()=>{
   const expanded=it.classList.toggle('expanded');
   more.setAttribute('aria-expanded',String(expanded));
   more.textContent=expanded?'記事を少なく表示 ↑':'ほかのIT転職の記事 '+extras.length+'件を見る ↓';
   if(!expanded)it.scrollIntoView({behavior:'smooth',block:'start'});
  });
  input.addEventListener('input',()=>{const query=input.value.trim().length>0;it.classList.toggle('searching',query);more.hidden=query;});
 }
}

})();