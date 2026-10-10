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
    /* Expression-only edits: character identity, hair, clothes and all poses stay fixed.
       Eye lids, mouth and cheek shading are local to the original face. */
    const facePlacement={
      INTJ:[.535,.618,.527],INTP:[.535,.626,.520],ENTJ:[.527,.625,.525],ENTP:[.525,.609,.513],
      INFJ:[.534,.627,.526],INFP:[.533,.621,.522],ENFJ:[.518,.616,.526],ENFP:[.525,.614,.519],
      ISTJ:[.515,.639,.540],ISFJ:[.535,.625,.518],ESTJ:[.527,.622,.520],ESFJ:[.530,.623,.515],
      ISTP:[.524,.636,.533],ISFP:[.533,.620,.530],ESTP:[.540,.630,.528],ESFP:[.533,.615,.515]
    };
    const skinByType={
      INTJ:'#f9eae2',INTP:'#fff0e9',ENTJ:'#fdf0e9',ENTP:'#ffe7df',
      INFJ:'#feeee8',INFP:'#feece7',ENFJ:'#ffeae4',ENFP:'#ffeae5',
      ISTJ:'#fff1ec',ISFJ:'#fff0e9',ESTJ:'#fdeee8',ESFJ:'#fcebe5',
      ISTP:'#fdeee8',ISFP:'#fff0e9',ESTP:'#ffeae4',ESFP:'#ffede8'
    };
    function renderFaceExpression() {
      const [mx,my,ey]=facePlacement[base] || [.525,.622,.52];
      const skin=skinByType[base] || '#ffebe4';
      const fx=n=>(w*n).toFixed(2), fy=n=>(h*n).toFixed(2);
      const xx=w*mx,yy=h*my,eye=h*ey;
      const eyeL=w*.385,eyeR=w*.654;
      const id='love64-skin-'+base+'-'+si;
      const dx=n=>(w*n).toFixed(2),dy=n=>(h*n).toFixed(2);
      const line='#885866';
      const gradient='<defs><radialGradient id="'+id+'"><stop offset="0%" stop-color="'+skin+'" stop-opacity="1"/><stop offset="64%" stop-color="'+skin+'" stop-opacity="1"/><stop offset="100%" stop-color="'+skin+'" stop-opacity="0"/></radialGradient></defs>';
      const cover='<ellipse cx="'+xx.toFixed(2)+'" cy="'+yy.toFixed(2)+'" rx="'+dx(.088)+'" ry="'+dy(.055)+'" fill="url(#'+id+')" />';
      const blushOpacity=[.22,.13,.29,.43][si];
      const cheekColor=['#f79eaf','#efb0b6','#f18b9e','#eb799b'][si];
      const cheeks='<g class="love64-expression-blush"><ellipse cx="'+fx(.310)+'" cy="'+fy(ey+.055)+'" rx="'+dx(.051)+'" ry="'+dy(.023)+'" fill="'+cheekColor+'" opacity="'+blushOpacity+'"/><ellipse cx="'+fx(.709)+'" cy="'+fy(ey+.055)+'" rx="'+dx(.051)+'" ry="'+dy(.023)+'" fill="'+cheekColor+'" opacity="'+blushOpacity+'"/></g>';
      const ex=x=>x.toFixed(2), eyv=n=>(eye+h*n).toFixed(2);
      let eyes='',mouth='';
      if(si===0){
        // Alpha: bright confident smile, lively raised eyebrows and eye sparkles
        eyes='<g fill="none" stroke="'+line+'" opacity=".72" stroke-width="'+dx(.009)+'" stroke-linecap="round"><path d="M'+ex(eyeL-w*.055)+' '+eyv(-.065)+'q'+dx(.053)+' -'+dy(.032)+' '+dx(.105)+' 0"/><path d="M'+ex(eyeR-w*.055)+' '+eyv(-.064)+'q'+dx(.053)+' -'+dy(.031)+' '+dx(.105)+' 0"/></g><g fill="#fffbe8" opacity=".96"><circle cx="'+ex(eyeL-w*.008)+'" cy="'+eyv(.003)+'" r="'+dx(.010)+'"/><circle cx="'+ex(eyeR-w*.008)+'" cy="'+eyv(.003)+'" r="'+dx(.010)+'"/></g>';
        mouth='<path d="M'+ex(xx-w*.048)+' '+ex(yy-h*.006)+' Q'+ex(xx)+' '+ex(yy+h*.090)+' '+ex(xx+w*.049)+' '+ex(yy-h*.007)+' Z" fill="#b85d72" stroke="'+line+'" stroke-width="'+dx(.008)+'" stroke-linejoin="round"/><path d="M'+ex(xx-w*.026)+' '+ex(yy+h*.029)+' Q'+ex(xx)+' '+ex(yy+h*.044)+' '+ex(xx+w*.026)+' '+ex(yy+h*.029)+'" stroke="#ffc5c4" stroke-width="'+dy(.013)+'" stroke-linecap="round" fill="none"/>';
      }else if(si===1){
        // Beta: relaxed eyelids and a small gentle closed-mouth smile
        eyes='<g fill="none" stroke="'+line+'" stroke-width="'+dx(.008)+'" opacity=".53" stroke-linecap="round"><path d="M'+ex(eyeL-w*.044)+' '+eyv(-.022)+' Q'+ex(eyeL)+' '+eyv(-.004)+' '+ex(eyeL+w*.044)+' '+eyv(-.024)+'"/><path d="M'+ex(eyeR-w*.044)+' '+eyv(-.022)+' Q'+ex(eyeR)+' '+eyv(-.004)+' '+ex(eyeR+w*.044)+' '+eyv(-.024)+'"/></g>';
        mouth='<path d="M'+ex(xx-w*.035)+' '+ex(yy)+' Q'+ex(xx)+' '+ex(yy+h*.025)+' '+ex(xx+w*.035)+' '+ex(yy)+'" fill="none" stroke="'+line+'" stroke-width="'+dx(.011)+'" stroke-linecap="round"/>';
      }else if(si===2){
        // Gamma: excited eyes and open, laughing mouth
        eyes='<g fill="none" stroke="'+line+'" stroke-width="'+dx(.010)+'" opacity=".82" stroke-linecap="round"><path d="M'+ex(eyeL-w*.052)+' '+eyv(-.083)+' Q'+ex(eyeL)+' '+eyv(-.115)+' '+ex(eyeL+w*.052)+' '+eyv(-.078)+'"/><path d="M'+ex(eyeR-w*.052)+' '+eyv(-.081)+' Q'+ex(eyeR)+' '+eyv(-.114)+' '+ex(eyeR+w*.052)+' '+eyv(-.078)+'"/></g><g fill="#fff9df" opacity=".9"><path d="M'+ex(eyeL)+' '+eyv(.010)+'l'+dx(.010)+' -'+dy(.024)+'l'+dx(.010)+' '+dy(.024)+'l-'+dx(.010)+' '+dy(.012)+'z"/><path d="M'+ex(eyeR)+' '+eyv(.010)+'l'+dx(.010)+' -'+dy(.024)+'l'+dx(.010)+' '+dy(.024)+'l-'+dx(.010)+' '+dy(.012)+'z"/></g>';
        mouth='<ellipse cx="'+ex(xx)+'" cy="'+ex(yy+h*.018)+'" rx="'+dx(.055)+'" ry="'+dy(.047)+'" fill="#a65069" stroke="'+line+'" stroke-width="'+dx(.007)+'"/><path d="M'+ex(xx-w*.032)+' '+ex(yy+h*.037)+' Q'+ex(xx)+' '+ex(yy+h*.018)+' '+ex(xx+w*.032)+' '+ex(yy+h*.038)+'" stroke="#ffabb5" stroke-width="'+dy(.014)+'" fill="none" stroke-linecap="round"/>';
      }else{
        // Delta: bashful half-lidded gaze, little timid curved mouth
        eyes='<g fill="none" stroke="'+line+'" stroke-width="'+dx(.011)+'" stroke-linecap="round" opacity=".69"><path d="M'+ex(eyeL-w*.047)+' '+eyv(-.007)+' Q'+ex(eyeL)+' '+eyv(.018)+' '+ex(eyeL+w*.047)+' '+eyv(-.011)+'"/><path d="M'+ex(eyeR-w*.047)+' '+eyv(-.007)+' Q'+ex(eyeR)+' '+eyv(.018)+' '+ex(eyeR+w*.047)+' '+eyv(-.011)+'"/></g><g stroke="#e087a0" stroke-linecap="round" stroke-width="'+dx(.008)+'" opacity=".65"><path d="M'+fx(.304)+' '+fy(ey+.063)+'l'+dx(.012)+' -'+dy(.013)+' M'+fx(.324)+' '+fy(ey+.063)+'l'+dx(.012)+' -'+dy(.013)+' M'+fx(.694)+' '+fy(ey+.063)+'l'+dx(.012)+' -'+dy(.013)+'"/></g>';
        mouth='<path d="M'+ex(xx-w*.025)+' '+ex(yy)+' Q'+ex(xx-w*.005)+' '+ex(yy+h*.026)+' '+ex(xx+w*.012)+' '+ex(yy+h*.002)+' Q'+ex(xx+w*.026)+' '+ex(yy+h*.019)+' '+ex(xx+w*.032)+' '+ex(yy-h*.001)+'" fill="none" stroke="'+line+'" stroke-width="'+dx(.011)+'" stroke-linecap="round"/>';
      }
      return '<g class="love64-face-expression love64-expression-'+si+'">'+gradient+cover+cheeks+eyes+mouth+'</g>';
    }
    const faceDetails=[]; faceDetails[si]=renderFaceExpression();
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
