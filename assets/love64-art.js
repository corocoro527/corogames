/* One approved character map for landing, catalog and all 64 results. */
(function () {
  'use strict';
  const order = ['ENFP','INFP','ENFJ','INFJ','ENTP','INTP','ENTJ','INTJ','ESFJ','ISFJ','ESTJ','ISTJ','ESFP','ISFP','ESTP','ISTP'];
  const names = ['愛の先導者','包容の人','情熱の迷子','静かな渇望'];
  const codes = ['SD','SW','AD','AW'];
  function apply(el, base, sub) {
    if (!el || !order.includes(base)) return;
    let si = typeof sub === 'number' ? sub : names.indexOf(sub);
    if (si < 0) si = codes.indexOf(sub);
    if (si < 0 || si > 3) si = 0;
    const idx = order.indexOf(base) * 4 + si;
    el.classList.add('love64-art');
    el.dataset.mbti = base;
    el.dataset.sub = si;
    el.style.setProperty('--art-x', ((idx % 8) / 7 * 100) + '%');
    el.style.setProperty('--art-y', (Math.floor(idx / 8) / 7 * 100) + '%');
    // Display the exact supplied white-haired ISTJ artwork, without repainting it.
    if (base === 'ISTJ') {
      el.style.setProperty('--art-x', (([1093,1181,1268,1355][si]) / (1448 - 84) * 100) + '%');
      el.style.setProperty('--art-y', (544 / (1086 - 100) * 100) + '%');
    }
    if (!el.hasAttribute('aria-hidden')) {
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', base + '・' + names[si]);
    }
  }
  window.Love64Art = {apply, order, names};
  document.querySelectorAll('#catalog .chara').forEach(el => apply(el, el.dataset.mbti, Number(el.dataset.sub)));
  document.querySelectorAll('#landingV6 .v6-card').forEach(card => {
    apply(card.querySelector('.v6-pixel'), card.querySelector('b').textContent.trim(), card.querySelector('span').textContent.replace('×','').trim());
  });
  ['ENFP','INFP','ENFJ','INFJ'].forEach((base,si) => apply(document.querySelector('#landingV6 .v16-axis-char.c'+(si+1)),base,si));
  apply(document.querySelector('#landingV6 .v16-hero-char.girl'),'ESFJ',0);
  apply(document.querySelector('#landingV6 .v16-hero-char.boy'),'ISTJ',0);
  const cat = document.querySelector('#landingV6 .v6-catalog');
  if (cat) {
    const picks = [['ENFP',0],['INFP',1],['ENFJ',2],['INFJ',3],['ENTP',0],['INTJ',3],['ESFP',2],['ISTJ',1]];
    cat.innerHTML = picks.map(([base,si]) => '<article><div class="v6-cat-avatar" data-mbti="'+base+'" data-sub="'+si+'"></div><div class="v6-cat-copy"><b>'+base+'</b><span>× '+names[si]+'</span></div></article>').join('');
    cat.querySelectorAll('.v6-cat-avatar').forEach(el => apply(el,el.dataset.mbti,Number(el.dataset.sub)));
  }
})();
