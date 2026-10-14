// Test real 20-question browser-only practice script and regressions.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const page=fs.readFileSync('mikeiken-it-mensetsu-20.html','utf8');
const script=page.slice(page.lastIndexOf('<script>')+8,page.lastIndexOf('</script>'));
assert.equal((page.match(/class="interview-question"/g)||[]).length,20);
assert.equal((page.match(/class="practice-link" data-question=/g)||[]).length,20);
assert.ok(page.includes('id="interviewLength"'));
function el(value=''){return {value,textContent:'',disabled:false,hidden:true,dataset:{},events:{},
 addEventListener(k,f){this.events[k]=f;},setAttribute(){},focus(){}}}
const names=['interviewQuestion','questionHint','interviewStatus','interviewResult','interviewResultWrap','copyInterviewMemo',
 'interviewConclusion','interviewSituation','interviewAction','interviewConnection','interviewLength',
 'createInterviewMemo','clearInterviewMemo'];
const e=Object.fromEntries(names.map(k=>[k,el()]));
e.copyInterviewMemo.disabled=true; // Initial disabled HTML attribute.
const links=Array.from({length:20},(_,i)=>{const o=el();o.dataset.question=String(i+1);return o});
let allow=true,confirmCalls=0,copied='';
const events=[];
const window={isSecureContext:true,confirm(){confirmCalls++;return allow},gtag(...args){events.push(args)}};
const navigator={clipboard:{async writeText(s){copied=s}}};
const document={
 getElementById(id){assert.ok(e[id],'Missing '+id);return e[id]},
 querySelectorAll(q){assert.equal(q,'[data-question]');return links;},
 createElement(){return {...el(),style:{},select(){},remove(){}};},
 body:{append(){}},execCommand(){return true}
};
new Function('document','window','navigator',script)(document,window,navigator);
async function run(){
 assert.equal(e.copyInterviewMemo.disabled,true);
 assert.match(e.interviewLength.textContent,/0文字/);
 links[0].events.click();
 assert.equal(e.interviewQuestion.value,'1','practice link selects question');
 e.interviewConclusion.value='実務での問い合わせ記録を活かしたい';
 e.interviewConclusion.events.input();
 assert.match(e.interviewLength.textContent,/文字/);
 assert.match(e.interviewStatus.textContent,/再作成/);
 e.createInterviewMemo.events.click();
 assert.equal(e.copyInterviewMemo.disabled,false);
 assert.equal(e.interviewResultWrap.hidden,false);
 assert.ok(e.interviewResult.textContent.includes('実務での問い合わせ記録を活かしたい'));
 await e.copyInterviewMemo.events.click();
 assert.ok(copied.includes('問い合わせ記録'));
 // Editing invalidates previously generated text; users cannot copy stale material.
 const oldCopy=copied;
 e.interviewConclusion.value='修正版：担当した作業を事実に沿って説明';
 e.interviewConclusion.events.input();
 assert.equal(e.copyInterviewMemo.disabled,true);
 assert.equal(e.interviewResultWrap.hidden,true);
 assert.equal(e.interviewResult.textContent,'');
 await e.copyInterviewMemo.events.click();
 assert.equal(copied,oldCopy,'stale report must not copy');
 // An accidental select change is cancellable without discarding draft.
 allow=false;e.interviewQuestion.value='2';e.interviewQuestion.events.change();
 assert.equal(e.interviewQuestion.value,'1');
 assert.ok(e.interviewConclusion.value.startsWith('修正版'));
 assert.equal(confirmCalls,1);
 // Intentional question switch explicitly clears previous answer.
 allow=true;e.interviewQuestion.value='2';e.interviewQuestion.events.change();
 assert.equal(e.interviewConclusion.value,'');
 assert.equal(e.interviewQuestion.value,'2');
 assert.equal(confirmCalls,2);
 e.createInterviewMemo.events.click();
 assert.equal(e.copyInterviewMemo.disabled,true,'empty conclusion not eligible');
 assert.match(e.interviewStatus.textContent,/結論/);
 e.interviewConclusion.value='新しい質問への回答';
 e.interviewConclusion.events.input();
 e.createInterviewMemo.events.click();
 assert.match(e.interviewResult.textContent,/前職ではどんな問題/);
 await e.copyInterviewMemo.events.click();
 assert.ok(copied.includes('新しい質問への回答'));
 // Clear confirmation is respected.
 allow=false;e.clearInterviewMemo.events.click();
 assert.equal(e.interviewConclusion.value,'新しい質問への回答');
 allow=true;e.clearInterviewMemo.events.click();
 assert.equal(e.interviewConclusion.value,'');
 assert.equal(e.interviewQuestion.value,'');
 assert.equal(e.copyInterviewMemo.disabled,true);
 assert.match(e.interviewLength.textContent,/0文字/);
 assert.equal(events.filter(x=>x[1]==='career_interview_memo_created').length,2);
 assert.equal(events.filter(x=>x[1]==='career_interview_memo_copied').length,2);
 for(const event of events){
  assert.equal(event[0],'event');
  assert.equal(event[2].tool_name,'interview_practice');
  assert.deepEqual(Object.keys(event[2]).sort(),['event_category','tool_name']);
 }
 console.log('Interview practice: 20 cards, fresh answers, switch confirmation, copy, clear, length, privacy-safe GA4 events PASS');
}
run().catch(err=>{console.error(err);process.exitCode=1});
