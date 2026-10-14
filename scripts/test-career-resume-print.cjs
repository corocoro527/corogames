// End-to-end unit harness for the KOROPOP private job-history draft / print sheet.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('it-mikeiken-shokumukeirekisho.html','utf8');
const css=fs.readFileSync('career-resume-print.css','utf8');
const script=html.slice(html.lastIndexOf('<script>')+8,html.lastIndexOf('</script>'));
assert.ok(script.includes("window.print()"),'Native printing must be user-initiated');
assert.ok(html.includes('id="resumePrintable"')&&html.includes('id="printResume"'));
assert.ok(html.includes('href="career-resume-print.css?v=20261014"'),'Load screen and print rules');
assert.ok(css.includes('@media screen')&&css.includes('@media print'));
assert.ok(css.includes('body:has(> #resumePrintable[data-ready="true"])'),'Scope print layout to the completed worksheet');
function element(value=''){
 return {value,textContent:'',hidden:false,disabled:false,dataset:{ready:'false'},style:{},
  events:{},addEventListener(type,fn){this.events[type]=fn;},select(){},remove(){}};
}
const names=['resumeStatus','resumeDraft','resumeDraftWrap','resumePrintable','printResume',
 'previousRole','targetRole','realWork','improvements','learning','buildResume','copyResume',
 'printPreviousRole','printTargetRole','resumePrintBody'];
const fields=Object.fromEntries(names.map(id=>[id,element()]));
fields.printResume.disabled=true;
fields.resumePrintable.hidden=true;
let clipboard='',prints=0;
const document={
 getElementById(id){assert.ok(fields[id],'Missing element '+id);return fields[id];},
 createElement(){return element();},
 body:{append(){}},execCommand(){return true;}
};
const navigator={clipboard:{async writeText(value){clipboard=value;}}};
const window={isSecureContext:true,print(){prints++;}};
new Function('document','navigator','window',script)(document,navigator,window);
const click=id=>fields[id].events.click();
click('buildResume');
assert.equal(fields.printResume.disabled,true,'Do not print empty drafts');
assert.match(fields.resumeStatus.textContent,/入力してください/);
fields.previousRole.value='接客・販売';
fields.targetRole.value='ITヘルプデスク';
fields.realWork.value='問い合わせを聞き取り、記録した';
fields.improvements.value='説明の手順を見直した';
fields.learning.value='Windowsの設定を自分の端末で学んだ';
click('buildResume');
assert.equal(fields.printResume.disabled,false);
assert.equal(fields.resumePrintable.dataset.ready,'true');
assert.equal(fields.resumePrintable.hidden,false);
assert.equal(fields.printPreviousRole.textContent,'接客・販売');
assert.equal(fields.printTargetRole.textContent,'ITヘルプデスク');
assert.ok(fields.resumePrintBody.textContent.includes('問い合わせを聞き取り、記録した'));
assert.ok(fields.resumePrintBody.textContent.includes('Windowsの設定'));
assert.ok(!fields.resumePrintBody.textContent.includes('採用が決まりました'));
Promise.resolve(fields.copyResume.events.click()).then(()=>{
 assert.ok(clipboard.includes('問い合わせを聞き取り、記録した'));
 click('printResume');assert.equal(prints,1);
 fields.realWork.value='<img src=x onerror=alert(1)>';
 fields.realWork.events.input();
 assert.equal(fields.printResume.disabled,true,'Stale draft must not print');
 assert.equal(fields.resumePrintable.dataset.ready,'false');
 click('printResume');assert.equal(prints,1);
 click('buildResume');
 assert.ok(fields.resumePrintBody.textContent.includes('<img src=x onerror=alert(1)>'),'Literal input only via textContent');
 assert.equal(fields.printResume.disabled,false);
 click('printResume');assert.equal(prints,2);
 console.log('Resume draft: required fields, local text rendering, native print, copy, stale-input safety, CSS scoping PASS');
}).catch(error=>{console.error(error);process.exitCode=1;});
