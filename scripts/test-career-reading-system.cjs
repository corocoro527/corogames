// Unified reading design contract for core IT career articles.
// Semantic/static checks; these do not replace visual browser testing.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const legacy=[
 'mikeiken-shanai-se.html',
 'mikeiken-it-helpdesk.html',
 'mikeiken-infra-engineer.html',
 'mikeiken-it-kyujin-miwakekata.html',
 'mikeiken-it-shibodoki.html'
];
const modern=[
 'it-helpdesk-ichinichi.html',
 'helpdesk-kara-shanai-se.html',
 'it-mikeiken-shokumukeirekisho.html',
 'mikeiken-it-mensetsu-20.html',
 'shanai-se-ichinichi.html',
 'pc-kitting-mikeiken.html'
];
const css=fs.readFileSync('career-reading-unify.css','utf8');
for(const fragment of ['body.kp-reading-refresh','body.kp-reading-refresh > header',
 '.kp-reading-breadcrumb','.kp-reader-summary','.deep-toc',
 '@media(max-width:700px)','a:focus-visible','prefers-reduced-motion']){
 assert.ok(css.includes(fragment),'Missing shared style: '+fragment);
}
assert.ok(!css.includes('header:first-child'),'Must not override nested timeline/article headers');
assert.ok(fs.existsSync('career-reading-unify.css'));
function source(path){
 assert.ok(fs.existsSync(path),'Missing core article '+path);
 return fs.readFileSync(path,'utf8');
}
function base(html,path){
 assert.equal((html.match(/<body class="kp-reading-refresh"/g)||[]).length,1,'Scoped CSS body: '+path);
 assert.equal((html.match(/career-reading-unify\.css\?v=20261014a/g)||[]).length,1,'Shared CSS load: '+path);
 assert.ok(html.indexOf('career-reading-unify.css?v=20261014a')<html.indexOf('</head>'),'Styles must be in head: '+path);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'One page title: '+path);
 assert.ok(html.includes('rel="canonical"')||html.includes("rel='canonical'"),'Canonical: '+path);
 assert.ok(html.includes('href="/"')||html.includes('href="index.html"'),'Home link: '+path);
}
for(const path of legacy){
 const html=source(path);base(html,path);
 assert.ok(html.includes('class="kp-reading-breadcrumb"'),'Breadcrumb: '+path);
 assert.ok(html.includes('aria-current="page"'),'Current page label: '+path);
 assert.ok(html.indexOf('class="kp-reading-breadcrumb"')<html.indexOf('<h1'),'Breadcrumb before headline: '+path);
 assert.ok(html.includes('class="answer"'),'Existing editorial conclusion preserved: '+path);
 assert.ok(html.includes('career-article-v2.css'),'Legacy article tools/style retained: '+path);
}
for(const path of modern){
 const html=source(path);base(html,path);
 assert.ok(html.includes('class="deep-crumb"'),'Breadcrumb: '+path);
 assert.ok(html.includes('class="deep-toc"'),'Readable article TOC: '+path);
 assert.ok(html.includes('class="deep-summary"')||html.includes('class="kp-reader-summary"'),'Conclusion block: '+path);
 assert.ok(html.includes('career-deep-guides.css'),'Modern article style preserved: '+path);
 if(html.includes('class="kp-reader-summary"')){
  assert.ok(html.indexOf('class="kp-reader-summary"')<html.indexOf('class="deep-toc"'),'Answer first: '+path);
  const block=html.match(/<aside class="kp-reader-summary"[\s\S]*?<\/aside>/);
  assert.ok(block&&block[0].includes('30秒でわかる'),'Real reader summary: '+path);
  const anchor=block[0].match(/href="#([^"]+)"/);
  assert.ok(anchor,'Summary CTA anchor: '+path);
  assert.ok(html.includes('id="'+anchor[1]+'"'),'Summary CTA resolves: '+path);
 }
}
const home=source('index.html');
for(const path of [...legacy,...modern]){
 assert.ok(home.includes('href="'+path+'"')||home.includes(path),'Core article discoverable on the homepage: '+path);
}
console.log('Shared reading system PASS: '+legacy.length+' legacy and '+modern.length+' modern pages, summaries, breadcrumbs, links, scoped mobile CSS');
