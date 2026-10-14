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
const fold=s=>String(s||'').normalize('NFKC').toLocaleLowerCase('ja-JP').replace(/\s+/g,'');
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
 const needle=fold(input.value);
 let count=0;
 cards.forEach(card=>{const show=!needle||fold(card.textContent).includes(needle);card.hidden=!show;if(show)count++});
 sections.forEach(sec=>{const visible=sec.querySelectorAll('.article-link:not([hidden])').length;sec.hidden=!!needle&&visible===0;});
 if(roles&&more){roles.classList.toggle('searching',!!needle);more.hidden=!!needle||!extras.length;}
 status.textContent=needle?'「'+input.value.trim()+'」の検索結果：'+count+'件':'全'+cards.length+'本のIT転職記事から探せます';
 empty.hidden=count!==0;
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