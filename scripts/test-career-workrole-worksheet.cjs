// The company-job worksheet must remain a local, useful and accessible decision aid.
'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const read = x => fs.readFileSync(x, 'utf8');
const html = read('shanai-se-ichinichi.html');
const css = read('career-deep-guides.css');
const js = read('career-workrole-worksheet.js');

for (const id of ['role-worksheet','buildWorkroleMemo','copyWorkroleMemo','workroleMemoResult','workroleMemo','workroleStatus']) {
 assert.ok(html.includes('id="' + id + '"'), 'Missing worksheet element '+id);
}
assert.equal((html.match(/data-workrole="/g)||[]).length, 6, 'Exactly six real job-ad duties');
assert.ok(html.includes('src="career-workrole-worksheet.js?v='), 'Defer a cache-versioned worksheet script');
assert.ok(html.includes('href="#role-worksheet"'), 'Worksheet reachable from workday table of contents');
assert.ok(html.indexOf('id="role-worksheet"')<html.indexOf('<section id="jobs">'), 'Worksheet before interview questions');
assert.ok(html.includes('何も選ばなくても'), 'Ambiguous job descriptions should be handled');
assert.ok(css.includes('.workrole-options{')&&css.includes('@media(max-width:670px){.workrole-worksheet'), 'Touchable and responsive worksheet');
assert.ok(css.includes('.workrole-result[hidden]{display:none!important}'), 'Hidden results should remain hidden');
assert.ok(!/\b(fetch\(|sendBeacon\(|localStorage\.|sessionStorage\.)/.test(js), 'Never send or persist job selections');
new Function(js); // Parse all source rather than checking a handful of markers.

function element(id='') {
 return {
   id, value:'', checked:false, disabled:id==='copyWorkroleMemo', hidden:id==='workroleMemoResult',
   listeners:{}, textContent:'',
   addEventListener(type, cb){this.listeners[type]=cb;},
   scrollIntoView(){},
   focus(){}, select(){}
 };
}
const button=element('buildWorkroleMemo');
const copy=element('copyWorkroleMemo');
const result=element('workroleMemoResult');
const output=element('workroleMemo');
const status=element('workroleStatus');
const checkboxes=['support','devices','operations','projects','improvement','development'].map(id=>{
 const el=element();el.dataset={workrole:id};return el;
});
const els={buildWorkroleMemo:button,copyWorkroleMemo:copy,workroleMemoResult:result,workroleMemo:output,workroleStatus:status};
const ready=new Set();
const root={classList:{add(value){ready.add(value);}},querySelector(selector){return els[selector.replace('#','')]||null;},querySelectorAll(selector){assert.equal(selector,'input[data-workrole]');return checkboxes;}};
const document={getElementById(id){return id==='role-worksheet'?root:null;}};
const exported={exports:{}};
new Function('document','window','navigator','module',js)(document,{matchMedia:()=>({matches:true})},{},exported);
assert.ok(ready.has('is-ready'), 'Controls must be enabled after successful initialization');
assert.equal(typeof button.listeners.click,'function');
assert.equal(typeof checkboxes[0].listeners.change,'function');
assert.equal(typeof exported.exports.buildText,'function');
button.listeners.click();
assert.ok(output.value.includes('具体的な業務が読み取れない'), 'Empty choice must produce a useful memo');
assert.equal(result.hidden,false);
assert.equal(copy.disabled,false);
const first=output.value;
checkboxes[0].checked=true;checkboxes[3].checked=true;checkboxes[0].listeners.change();
assert.equal(copy.disabled,true, 'Stale memo cannot be copied after changing choices');
assert.equal(result.hidden,true);
button.listeners.click();
assert.ok(output.value.includes('問い合わせ件数'));
assert.ok(output.value.includes('導入案件'));
assert.ok(!output.value.includes('PC設定・アクセス権の作業範囲'), 'Do not invent unchecked duties');
assert.notEqual(first,output.value);
const onlyDevelopment=exported.exports.buildText(['development']);
assert.ok(onlyDevelopment.includes('使う技術'));
assert.ok(!onlyDevelopment.includes('導入案件では'));
console.log('Internal SE worksheet PASS: accessible controls, 6 possible duties, relevant questions, empty job ads, stale-copy prevention, privacy and mobile layout');
