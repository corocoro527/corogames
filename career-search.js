/* KOROPOP CAREER — IT specialist article search and optional expansion. */
(function(){
'use strict';
const input=document.getElementById('articleSearch');
const clear=document.getElementById('clearSearch');
const status=document.getElementById('searchStatus');
const empty=document.getElementById('noResults');
if(!input||!clear||!status||!empty)return;
const cards=Array.from(document.querySelectorAll('.topic-section .article-link'));
const sections=Array.from(document.querySelectorAll('.topic-section'));
const roles=document.getElementById('roles'),more=document.getElementById('moreRoles');
// Preserve spacing when tokenizing, then NFKC normalize terms for wide/halfwidth input.
const fold=s=>String(s||'').normalize('NFKC').toLocaleLowerCase('ja-JP').replace(/\s+/g,'');
const tokenize=s=>String(s||'').normalize('NFKC').toLocaleLowerCase('ja-JP').split(/[\s、，,。・/／]+/).map(fold).filter(Boolean);
// User language, conventional names and job-title variations. Matching is explicit and explainable.
const aliases={
 '情シス':['社内se','情報システム'],
 '情報システム':['社内se','情シス'],
 'itサポート':['ヘルプデスク','社内se'],
 'pcセットアップ':['キッティング','pc設定'],
 'パソコン設定':['キッティング','pc設定'],
 'パソコン初期設定':['キッティング','pc設定'],
 '客先常駐':['ses','派遣'],
 'ses':['客先常駐','技術支援'],
 '応募書類':['職務経歴書','志望動機'],
 '履歴書':['職務経歴書','応募書類'],
 '逆質問':['面接'],
 '面接練習':['面接'],
 '監視オペレーター':['インフラ','運用監視'],
 'pc管理':['キッティング','社内se']
};
const variants=term=>[term,...(aliases[term]||[]).map(fold)];
const index=cards.map(card=>{
 const text=fold(card.textContent||'');
 const href=fold(card.getAttribute('href')||'');
 return {card,haystack:text+' '+href,title:fold(card.querySelector('h3')?.textContent||''),href};
});
let extras=[];
if(roles&&more){
 extras=Array.from(roles.querySelectorAll('.article-link')).slice(5);
 if(extras.length){
  extras.forEach(el=>el.classList.add('extra-article'));
  roles.classList.add('has-extras');
  more.hidden=false;
  more.textContent='ほかのIT職種の記事 '+extras.length+'件を見る ↓';
  more.addEventListener('click',()=>{
    const open=roles.classList.toggle('expanded');
    more.setAttribute('aria-expanded',String(open));
    more.textContent=open?'記事を少なく表示 ↑':'ほかのIT職種の記事 '+extras.length+'件を見る ↓';
    if(!open)roles.scrollIntoView({behavior:'smooth',block:'start'});
  });
 }
}
function filter(){
 const tokens=tokenize(input.value);
 const searching=tokens.length>0;
 let chosen=index;
 let partial=false;
 if(searching){
  const scored=index.map(item=>{
   let matched=0,rank=0;
   for(const term of tokens){
    const words=variants(term);
    if(words.some(w=>item.haystack.includes(w))){
     matched++;
     // Favor the article title over incidental mentions in descriptions.
     rank+=words.some(w=>item.title.includes(w))?3:1;
    }
   }
   return {...item,matched,rank};
  });
  chosen=scored.filter(item=>item.matched===tokens.length);
  if(!chosen.length&&tokens.length>1){
   partial=true;
   chosen=scored.filter(item=>item.matched>0)
    .sort((a,b)=>b.matched-a.matched||b.rank-a.rank)
    .slice(0,8);
  }
 }
 const selected=new Set(chosen.map(item=>item.card));
 cards.forEach(card=>{card.hidden=!selected.has(card)});
 sections.forEach(sec=>{
  const visible=sec.querySelectorAll('.article-link:not([hidden])').length;
  sec.hidden=searching&&visible===0;
 });
 if(roles&&more){
  roles.classList.toggle('searching',searching);
  more.hidden=searching||!extras.length;
 }
 if(!searching)status.textContent='全'+cards.length+'本のIT転職記事から探せます';
 else if(partial)status.textContent='すべての言葉に一致する記事はありません。関連する記事を'+chosen.length+'件表示しています。';
 else status.textContent='「'+input.value.trim()+'」の検索結果：'+chosen.length+'件';
 empty.hidden=chosen.length!==0;
 clear.hidden=input.value.length===0;
 markQuickButtons();
}
const quickButtons=Array.from(document.querySelectorAll('[data-search-term]'));
function markQuickButtons(){const value=fold(input.value);quickButtons.forEach(btn=>btn.setAttribute('aria-pressed',String(value!==''&&value===fold(btn.dataset.searchTerm))));}
quickButtons.forEach(btn=>btn.addEventListener('click',()=>{
 const chosen=btn.dataset.searchTerm||'';
 input.value=fold(input.value)===fold(chosen)?'':chosen;
 filter();input.focus({preventScroll:true});
}));
input.addEventListener('input',filter);
clear.addEventListener('click',()=>{input.value='';filter();input.focus();});
// Measure only anonymous journey link activation; never log search text or form data.
const journeyLinks=Array.from(document.querySelectorAll('.career-path-list a'));
journeyLinks.forEach((link,index)=>{
 link.addEventListener('click',()=>{
  if(typeof window.gtag==='function'){
   window.gtag('event','career_step_'+String(index+1).padStart(2,'0')+'_click',{
    event_category:'career_journey',
    step_destination:link.getAttribute('href')
   });
  }
 });
});
filter();
})();