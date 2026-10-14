// Regression test for home page's no-API, two-question next-action navigator.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const script=fs.readFileSync('career-next-action.js','utf8');
const home=fs.readFileSync('index.html','utf8');
function node(value=''){
 return {value,href:'',textContent:'',listeners:{},addEventListener(type,callback){this.listeners[type]=callback;}};
}
const elements={
 nextStage:node('undecided'),nextConcern:node('general'),
 nextActionTitle:node(),nextActionWhy:node(),nextActionTask:node(),
 nextActionPrimary:node(),nextActionSecondary:node()
};
const root={querySelector(selector){return elements[selector.slice(1)]??null;}};
const doc={getElementById(id){return id==='next-action'?root:null;}};
new Function('document',script)(doc);
assert.equal(typeof elements.nextStage.listeners.change,'function');
assert.equal(typeof elements.nextConcern.listeners.change,'function');
let total=0;
const stages=['undecided','decided','studying','jobs','applying','careerup'];
const concerns=['general','work','learning','noncode','conditions','paperwork'];
for(const stage of stages){
 for(const concern of concerns){
  elements.nextStage.value=stage;
  elements.nextConcern.value=concern;
  elements.nextConcern.listeners.change();
  for(const key of ['nextActionTitle','nextActionWhy','nextActionTask']){
   assert.ok(elements[key].textContent.length>8,stage+'/'+concern+' empty '+key);
  }
  for(const key of ['nextActionPrimary','nextActionSecondary']){
   const {href,textContent}=elements[key];
   assert.match(href,/^[\w-]+\.html(?:#[\w-]+)?$/,stage+'/'+concern+' unsafe link');
   assert.ok(fs.existsSync(href.split('#')[0]),stage+'/'+concern+' missing '+href);
   assert.ok(textContent.length>4,stage+'/'+concern+' empty link label');
  }
  total++;
 }
}
assert.equal(total,36);
assert.ok(home.includes('id="next-action"'));
for(const id of Object.keys(elements))assert.ok(home.includes('id="'+id+'"'),'Missing UI '+id);
assert.ok(home.includes('career-next-action.js?'));
assert.ok(home.includes('<a class="career-next-main"'),'No-script default CTA missing');
assert.equal((home.match(/<option value="/g)||[]).length>=12,true);
console.log('Next-action navigator: 36 decision routes, local destination files, semantic DOM anchors PASS');
