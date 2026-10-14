/* KOROPOP salary calculator: all numbers stay in this browser. */
(() => {
 'use strict';
 const get=id=>document.getElementById(id);
 const button=get('calc'),result=get('result'),error=get('salaryError'),summary=get('salaryResultSummary'),copy=get('copySalaryResult'),copyStatus=get('salaryCopyStatus');
 const keys=['salary','allowance','hours','overtime','premium','bonus','deduction'];
 if(!button||!result||!error||!summary||!copy||!copyStatus||!keys.every(get))return;
 const money=n=>Math.round(n).toLocaleString('ja-JP')+'円';
 let report='';
 function validate(){
  const numeric={};
  for(const key of keys){
   const el=get(key),raw=el.value.trim();
   const optional=['allowance','overtime','bonus','deduction'].includes(key);
   if(!raw&&!optional)return {error:'必須項目を入力してください。',field:el};
   const n=raw===''&&optional?0:Number(raw);
   if(!Number.isFinite(n)||n<0)return {error:'金額・時間・倍率は0以上の数値で入力してください。',field:el};
   numeric[key]=n;
  }
  if(numeric.salary<=0)return {error:'基本給（月）は0より大きい金額を入力してください。',field:get('salary')};
  if(numeric.hours<=0||numeric.hours>744)return {error:'月の所定労働時間は1〜744時間で入力してください。',field:get('hours')};
  if(numeric.premium<1||numeric.premium>4)return {error:'残業割増倍率は1〜4の範囲で入力してください。',field:get('premium')};
  if(numeric.deduction>60)return {error:'控除率は0〜60％で入力してください。',field:get('deduction')};
  if(numeric.overtime>744)return {error:'月の残業時間は744時間以下で入力してください。',field:get('overtime')};
  if(numeric.salary>100000||numeric.allowance>100000||numeric.bonus>120)return {error:'入力値が大きすぎます。単位（万円・月数）を確認してください。',field:get('salary')};
  return {values:numeric};
 }
 function calculate(v){
  const base=v.salary*10000,allowance=v.allowance*10000;
  const hourly=base/v.hours;
  const overtimePay=hourly*v.premium*v.overtime;
  const gross=base+allowance+overtimePay;
  const annualGross=gross*12+base*v.bonus;
  return {hourly,overtimePay,gross,net:gross*(1-v.deduction/100),annualGross,annualNet:annualGross*(1-v.deduction/100)};
 }
 keys.forEach(key=>get(key).addEventListener('input',()=>{
  get(key).removeAttribute('aria-invalid');
  error.hidden=true;
  result.classList.remove('show');
  copy.disabled=true;
  copyStatus.textContent='';
  report='';
 }));
 button.addEventListener('click',()=>{
  const state=validate();
  if(state.error){
   error.textContent=state.error;
   error.hidden=false;
   result.classList.remove('show');
   copy.disabled=true;
   copyStatus.textContent='';
   state.field.setAttribute('aria-invalid','true');
   state.field.focus();
   return;
  }
  error.hidden=true;
  for(const key of keys)get(key).removeAttribute('aria-invalid');
  const v=state.values,n=calculate(v);
  const ids={hourly:'hourly',overtimePay:'overtime-pay',gross:'gross',net:'net',annualGross:'annual-gross',annualNet:'annual-net'};
  for(const [key,id] of Object.entries(ids))get(id).textContent=money(n[key]);
  const caution=v.overtime>60?'月60時間を超える時間外労働は割増率が変わる場合があります。超過分を一律倍率で計算した簡易結果です。':'控除率は一律の仮定で、実際の税・保険料と異なります。';
  summary.textContent=caution;
  report=['手取り・残業代の概算シミュレーター','月の総支給：'+money(n.gross),'月の手取り目安：'+money(n.net),'残業代：'+money(n.overtimePay),'年間総支給：'+money(n.annualGross),'年間手取り目安：'+money(n.annualNet),'※'+caution,'https://koropopgames.com/tedori.html'].join('\n');
  copy.disabled=false;
  copyStatus.textContent='';
  result.classList.add('show');
 });
 copy.addEventListener('click',async()=>{
  if(copy.disabled||!report)return;
  try{
   if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(report);
   else{
    const temp=document.createElement('textarea');
    temp.value=report;
    temp.style.position='fixed';temp.style.left='-9999px';
    document.body.append(temp);temp.select();
    const copied=document.execCommand('copy');temp.remove();
    if(!copied)throw Error('Copy unsupported');
   }
   copyStatus.textContent='結果をコピーしました。';
  }catch(_){
   copyStatus.textContent='自動コピーできませんでした。表示された結果を選択してコピーしてください。';
  }
 });
})();
