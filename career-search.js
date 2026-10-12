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
status.textContent=needle?'「'+input.value.trim()+'」の検索結果：'+count+'件':'全'+cards.length+'記事を表示中';
empty.hidden=count!==0;
clear.hidden=input.value.length===0;
}
input.addEventListener('input',filter);
clear.addEventListener('click',()=>{input.value='';filter();input.focus()});
filter();
})();