/* One approved character map for landing, catalog and all 64 results. */
(function () {
  'use strict';
  const order = ['ENFP','INFP','ENFJ','INFJ','ENTP','INTP','ENTJ','INTJ','ESFJ','ISFJ','ESTJ','ISTJ','ESFP','ISFP','ESTP','ISTP'];
  const names = ['愛の開拓者','寄り添い上手','恋の冒険家','秘めた一途'];
  const codes = ['SD','SW','AD','AW'];
  function apply(el, base, sub) {
    if (!el || !order.includes(base)) return;
    let si = typeof sub === 'number' ? sub : names.indexOf(sub);
    if (si < 0) si = codes.indexOf(sub);
    if (si < 0 || si > 3) si = 0;
    const sheetOrder = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
    const idx = sheetOrder.indexOf(base);
    const cells = [
      [8,94,224,257],[233,107,209,244],[444,102,215,249],[662,98,215,253],
      [885,109,213,242],[1098,112,213,239],[1311,92,223,259],[1534,92,240,259],
      [8,469,219,265],[228,484,211,250],[439,469,211,265],[643,455,230,279],
      [876,479,214,255],[1090,480,221,254],[1311,476,223,258],[1534,479,240,255]
    ];
    const [x,y,w,h] = cells[idx];
    el.classList.add('love64-art');
    el.dataset.mbti = base;
    el.dataset.sub = si;
    // Display the supplied artwork verbatim, clipping only its sheet cell and label.
    // Inline priority also supersedes the previous INTJ/ISTJ image exceptions.
    el.style.setProperty('background-image', 'none', 'important');
    el.style.setProperty('box-shadow', 'none', 'important');
    el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="100%" height="100%" aria-hidden="true" style="display:block;width:100%;height:100%;position:static;transform:none">'+
      '<svg x="0" y="0" width="'+w+'" height="'+h+'" viewBox="'+x+' '+y+' '+w+' '+h+'" overflow="hidden">'+
      '<image href="assets/love64-characters-20261010.jpeg" width="1774" height="887"/></svg></svg>';
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
  document.querySelectorAll('#landingV6 .v10-girl').forEach(el => apply(el,'ESFJ',0));
  document.querySelectorAll('#landingV6 .v10-boy').forEach(el => apply(el,'ISTJ',0));
  const cat = document.querySelector('#landingV6 .v6-catalog');
  if (cat) {
    const picks = [['ENFP',0],['INFP',1],['ENFJ',2],['INFJ',3],['ENTP',0],['INTJ',3],['ESFP',2],['ISTJ',1]];
    cat.innerHTML = picks.map(([base,si]) => '<article><div class="v6-cat-avatar" data-mbti="'+base+'" data-sub="'+si+'"></div><div class="v6-cat-copy"><b>'+base+'</b><span>× '+names[si]+'</span></div></article>').join('');
    cat.querySelectorAll('.v6-cat-avatar').forEach(el => { apply(el,el.dataset.mbti,Number(el.dataset.sub)); if(el.dataset.mbti === 'INTJ') el.classList.add('intj-approved'); });
  }
})();
