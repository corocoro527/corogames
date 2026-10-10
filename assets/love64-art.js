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
    el.dataset.mbti = base;
    el.dataset.sub = si;

    // CTA art is a separately cut-out transparent original: never use blending.
    if (el.classList.contains('v10-cta-avatar')) {
      const sex = el.classList.contains('v10-girl') ? 'female' : 'male';
      el.classList.remove('love64-art');
      el.style.setProperty('background-image','none','important');
      el.style.setProperty('background-color','transparent','important');
      el.style.setProperty('opacity','1','important');
      el.style.setProperty('filter','none','important');
      el.innerHTML = '<img class="love64-cta-img" src="assets/love64-cta-'+sex+'.webp" alt="" draggable="false">';
      return;
    }

    const sheetOrder = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
    const idx = sheetOrder.indexOf(base);
    const cells = [
      [8,94,224,257],[233,107,209,244],[444,102,215,249],[662,98,215,253],
      [885,109,213,242],[1098,112,213,239],[1311,92,223,259],[1534,92,240,259],
      [8,469,219,265],[228,484,211,250],[439,469,211,265],[643,455,230,279],
      [876,479,214,255],[1090,480,221,254],[1311,476,223,258],[1534,479,240,255]
    ];
    const [x,y,w,h] = cells[idx];
    const cx=w/2,cy=h/2;
    // The character's identity is kept exact; all four styles receive
    // different gestures, motion, gifts and emotion accents.
    const rx=n=>(n*w/220).toFixed(2), ry=n=>(n*h/260).toFixed(2);
    const marks=[
      '<g opacity=".94"><path d="M'+rx(170)+' '+ry(182)+' q-16 -12 -23 2 q-4 13 23 31 q25 -15 23 -30 q-4 -15 -23 -3z" fill="#ff779d" stroke="#d9416d" stroke-width="3"/><path d="M'+rx(21)+' '+ry(100)+' q-7 -6 -11 1 q-3 8 11 17 q14 -9 11 -17 q-4 -7 -11 -1z" fill="#ff9eba"/><path d="M'+rx(196)+' '+ry(112)+' l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4z" fill="#ffc349"/></g>',
      '<g opacity=".96"><path d="M'+rx(163)+' '+ry(202)+' q-11 -24 6 -37 q21 -10 25 15 q-3 23 -31 22" fill="#e6f9ef" stroke="#60ac86" stroke-width="4"/><path d="M'+rx(166)+' '+ry(181)+' q-24 1 -21 -18 q18 -9 21 18 M'+rx(171)+' '+ry(173)+' q6 -20 25 -14 q6 18 -25 14" fill="#8bd3a3" stroke="#4e9b75" stroke-width="3"/><path d="M'+rx(154)+' '+ry(202)+' h42 l-5 16 h-33z" fill="#ffe5b5" stroke="#a88462" stroke-width="3"/><circle cx="'+rx(25)+'" cy="'+ry(120)+'" r="'+rx(9)+'" fill="#c4edda"/></g>',
      '<g opacity=".98"><path d="M'+rx(175)+' '+ry(169)+' L'+rx(183)+' '+ry(186)+' L'+rx(202)+' '+ry(188)+' L'+rx(188)+' '+ry(202)+' L'+rx(190)+' '+ry(220)+' L'+rx(175)+' '+ry(211)+' L'+rx(160)+' '+ry(220)+' L'+rx(163)+' '+ry(202)+' L'+rx(149)+' '+ry(188)+' L'+rx(168)+' '+ry(186)+'Z" fill="#ffd34d" stroke="#ef8e36" stroke-width="3"/><path d="M'+rx(18)+' '+ry(116)+' l10 -13 m-7 25 l-10 -2 M'+rx(206)+' '+ry(103)+' l-7 -11 m3 24 l11 -3" stroke="#fb697b" stroke-width="5" stroke-linecap="round"/><circle cx="'+rx(188)+'" cy="'+ry(139)+'" r="'+rx(7)+'" fill="#ff8ca2"/></g>',
      '<g opacity=".97"><rect x="'+rx(156)+'" y="'+ry(174)+'" width="'+rx(48)+'" height="'+ry(34)+'" rx="5" fill="#f4ecff" stroke="#a78add" stroke-width="3"/><path d="M'+rx(158)+' '+ry(177)+' l'+rx(22)+' '+ry(15)+' l'+rx(23)+' -'+ry(15)+'" fill="none" stroke="#a78add" stroke-width="3"/><path d="M'+rx(188)+' '+ry(112)+' a'+rx(16)+' '+ry(16)+' 0 1 1 -'+rx(13)+' '+ry(28)+' a'+rx(12)+' '+ry(12)+' 0 1 0 '+rx(13)+' -'+ry(28)+'z" fill="#c9b4f1"/><circle cx="'+rx(33)+'" cy="'+ry(131)+'" r="'+rx(5)+'" fill="#e9c8ff"/></g>'
    ];
    /* Same approved face, hair and clothing in all variants.
       Small expression accents are placed on the original cheeks/eye corners;
       the pose changes the entire unaltered character, never individual features. */
    const px=n=>(w*n).toFixed(1), py=n=>(h*n).toFixed(1);
    // All character faces stay 100% identical to the approved originals.
    // No overlay or face retouching is allowed on the production catalog.
    const faceDetails=['','','',''];
    const poses=[
      {x:-1,y:-2,turn:-5,scale:1.015},
      {x:2,y:1,turn:4,scale:.99},
      {x:-2,y:-7,turn:-10,scale:1.015},
      {x:3,y:3,turn:7,scale:.96}
    ];
    const pose=poses[si], mirrored=si===1;
    let trans='translate('+pose.x+' '+pose.y+') rotate('+pose.turn+' '+cx+' '+cy+') translate('+cx+' '+cy+') scale('+pose.scale+') translate('+-cx+' '+-cy+')';
    if(mirrored) trans+=' translate('+w+' 0) scale(-1 1)';
    el.classList.add('love64-art','love64-variant-'+si);
    el.dataset.expression=['bright','soft','excited','shy'][si];
    el.style.setProperty('background-image','none','important');
    el.style.setProperty('box-shadow','none','important');
    el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="100%" height="100%" aria-hidden="true" style="display:block;width:100%;height:100%;overflow:visible">'+
      '<g class="love64-pose-motion love64-pose-'+si+'"><g transform="'+trans+'"><image href="assets/love64-hq/'+base+'.webp" x="0" y="0" width="'+w+'" height="'+h+'" preserveAspectRatio="none" />'+faceDetails[si]+'</g></g>'+
      marks[si]+'</svg>';
    if (!el.hasAttribute('aria-hidden')) {
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', base+'・'+names[si]);
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
  document.querySelectorAll('.v10-girl').forEach(el => apply(el,'ESFJ',0));
  document.querySelectorAll('.v10-boy').forEach(el => apply(el,'ISTJ',0));
  const cat = document.querySelector('#landingV6 .v6-catalog');
  if (cat) {
    const picks = [['ENFP',0],['INFP',1],['ENFJ',2],['INFJ',3],['ENTP',0],['INTJ',3],['ESFP',2],['ISTJ',1]];
    cat.innerHTML = picks.map(([base,si]) => '<article><div class="v6-cat-avatar" data-mbti="'+base+'" data-sub="'+si+'"></div><div class="v6-cat-copy"><b>'+base+'</b><span>× '+names[si]+'</span></div></article>').join('');
    cat.querySelectorAll('.v6-cat-avatar').forEach(el => { apply(el,el.dataset.mbti,Number(el.dataset.sub)); if(el.dataset.mbti === 'INTJ') el.classList.add('intj-approved'); });
  }
  // Animate only cards actually on screen, preserving battery and scroll performance.
  if (document.getElementById('catalog') &&
      typeof IntersectionObserver !== 'undefined' &&
      (!window.matchMedia || window.matchMedia('(prefers-reduced-motion: no-preference)').matches)) {
    const visibility = new IntersectionObserver(entries => {
      entries.forEach(item => item.target.classList.toggle('love64-in-view', item.isIntersecting));
    }, {rootMargin:'30px 0px', threshold:0.2});
    document.querySelectorAll('#catalog .card').forEach(card => visibility.observe(card));
  }
})();
