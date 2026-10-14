'use strict';
// Salary tool regression: no fabricated exact net pay, no stale results, no data exfiltration.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const script=fs.readFileSync('career-salary-estimator.js','utf8');
const html=fs.readFileSync('tedori.html','utf8');
const home=fs.readFileSync('index.html','utf8');
const jobs=fs.readFileSync('jobs.html','utf8');
const css=fs.readFileSync('career-extras.css','utf8');
assert.ok(html.includes('src="career-salary-estimator.js?v='),'Versioned calculator script is required');
assert.ok(html.includes('role="alert" hidden'),'Accessible inline validation instead of alert()');
assert.ok(html.includes('id="copySalaryResult" disabled'),'Copy disabled until result exists');
assert.ok(html.includes('https://twitter.com/intent/tweet?'),'User-initiated share link');
assert.ok(!html.includes('href="career.html"'),'No obsolete redirect links');
assert.ok(html.includes('"@type":"WebApplication"'),'Tool must be described truthfully');
assert.ok(home.includes('href="tedori.html"'),'Prominent home-to-tool discovery');
assert.ok(jobs.includes('href="tedori.html"'),'High-intent guide-to-tool discovery');
assert.ok(css.includes('.career-salary-tool{')&&css.includes('@media(max-width:720px){.career-salary-tool'),'Accessible mobile CTA');
assert.ok(!/\b(fetch\(|sendBeacon\(|localStorage\.|sessionStorage\.|XMLHttpRequest|gtag\()/.test(script),'User salary input must remain local');
new Function(script);
function node(value=''){
 return {value,textContent:'',hidden:false,disabled:false,
   listeners:{},attrs:new Map(),style:{},classList:{
    value:new Set(),add(k){this.value.add(k)},remove(k){this.value.delete(k)},contains(k){return this.value.has(k)}
   },
   focus(){this.focused=true},addEventListener(type,fn){this.listeners[type]=fn},
   removeAttribute(key){this.attrs.delete(key)},setAttribute(key,val){this.attrs.set(key,val)}
 };
}
const initial={salary:'25',allowance:'0',hours:'160',overtime:'20',premium:'1.25',bonus:'2',deduction:'20'};
const ids=['calc','result','salaryError','salaryResultSummary','copySalaryResult','salaryCopyStatus','hourly','overtime-pay','gross','net','annual-gross','annual-net',...Object.keys(initial)];
const elements=Object.fromEntries(ids.map(id=>[id,node(initial[id]??'')]));
elements.salaryError.hidden=true;
elements.copySalaryResult.disabled=true;
const document={getElementById(id){return elements[id]||null}};
let copied='';
const navigator={clipboard:{async writeText(t){copied=t}}};
const window={isSecureContext:true};
new Function('document','navigator','window',script)(document,navigator,window);
const input=(k,v)=>{elements[k].value=v;elements[k].listeners.input()};
const click=()=>elements.calc.listeners.click();
(async()=>{
 click();
 assert.equal(elements.gross.textContent,'289,063円');
 assert.equal(elements.net.textContent,'231,250円');
 assert.equal(elements['annual-gross'].textContent,'3,968,750円');
 assert.equal(elements['annual-net'].textContent,'3,175,000円');
 assert.equal(elements.salaryError.hidden,true);
 assert.equal(elements.copySalaryResult.disabled,false);
 assert.ok(elements.result.classList.contains('show'));
 await elements.copySalaryResult.listeners.click();
 assert.ok(copied.includes('3,175,000円'));
 assert.ok(copied.includes('https://koropopgames.com/tedori.html'));
 input('overtime','-5');
 click();
 assert.equal(elements.salaryError.hidden,false);
 assert.equal(elements.copySalaryResult.disabled,true,'Invalid input disables stale copied result');
 assert.equal(elements.result.classList.contains('show'),false,'Stale money values must not be presented');
 assert.equal(elements.overtime.attrs.get('aria-invalid'),'true');
 input('overtime','70');click();
 assert.equal(elements.salaryError.hidden,true);
 assert.ok(elements.salaryResultSummary.textContent.includes('60時間を超える'),'Warn about overtime above 60 hours');
 input('hours','0');click();assert.equal(elements.salaryError.hidden,false,'Do not silently fall back to 160 when input is 0');
 input('hours','160');input('premium','0');click();assert.equal(elements.salaryError.hidden,false,'Zero multiplier is invalid, not 1.25');
 input('premium','1.25');input('deduction','80');click();assert.equal(elements.salaryError.hidden,false,'Do not silently clamp deduction');
 input('deduction','20');input('allowance','');click();assert.equal(elements.salaryError.hidden,true,'An empty optional allowance counts as zero');
 console.log('Career salary calculator PASS: money math, overtime warning, negative and invalid inputs, no stale results, private copy, discoverability');
})().catch(e=>{console.error(e);process.exitCode=1});
