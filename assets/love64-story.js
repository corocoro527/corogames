/* KOROPOP LOVE64 - Original editorial result experiences. */
(function(){
'use strict';
const PROFILES={"ENFP":["運動家",["好きな人ができると面白い話を真っ先に送る","何でもない日をイベントみたいにしたくなる","楽しかった一言を何日も覚えている"],["好きが伝わるほど行動が大胆になるけど、実は「迷惑かな」の一言に弱い。","自由に見えて、恋人の小さな変化をいちばん早く拾う。","勢いで進むように見えて、気になる人の反応を何度も思い出している。","明るく振る舞う日ほど、本当は一人にだけ気づいてほしいことがある。"],["一緒にいると、何でも楽しくなるね","無理に盛り上げなくていいよ","そのワクワク、僕にも分けて","何も話さなくても隣にいたい"]],"INFP":["仲介者",["二人だけの意味がある言葉を大切にする","言われた一言を繰り返し思い出す","伝えたい気持ちを文章にしてから消す"],["心に決めると驚くほどまっすぐ。静かでも愛情の温度は高い。","相手を受け入れるのが得意だけど、自分の寂しさは後回しになりがち。","想像の中では何度も会話しているのに、本番では照れてしまう。","平気な顔の裏で、たった一言の優しさをずっと待っている。"],["その気持ち、ちゃんと届いてるよ","ゆっくりでいい、話して","考えてくれたことがうれしい","黙ってても好きなの、分かるよ"]],"ENFJ":["主人公",["恋人が喜ぶ流れを考えて動く","好きな人の調子を声で察しがち","人前では明るく、二人きりでは真剣になる"],["頼れる姿の奥に、思った以上に「自分も選ばれたい」という願いがある。","面倒見のよさは才能だけど、ありがとうだけで満足するわけじゃない。","人の心を動かすのが上手でも、自分の本音は最後に言う。","みんなに優しくできても、本当は一人から特別扱いされたい。"],["君となら二人で何でもできそう","今日は僕が支える番だよ","その行動力、ほんと好き","頑張らない君も好きだよ"]],"INFJ":["提唱者",["返信の言葉遣いから気持ちを考える","何気ない会話の裏の意味を見つける","二人の未来を静かに想像してしまう"],["慎重そうに見えて、心を開いた相手には驚くほど大胆。","相手の気持ちを分かるほど、自分の本音を言いそびれやすい。","一歩を踏み出す前に、心の中で何通りもの未来を見ている。","落ち着いているようで、実は大切な人の一言にとても揺れる。"],["その未来、一緒に見てみたい","言葉にできるまで待つよ","君の考えてること、もっと聞きたい","気づいてるよ。無理しないでね"]],"ENTP":["討論者",["好きな人にだけ冗談が増える","議論が弾むと距離が縮まったと感じる","思いつきの誘いに実は本気が混じる"],["余裕そうに見せても、気になる人からの評価は想像以上に気にする。","言葉で遊ぶのは得意でも、ただ寂しいとは言いにくい。","勝ち負けに見える会話でも、相手の笑顔がいちばんのゴール。","照れ隠しの冗談の中に、いちばん大事な気持ちをしまっている。"],["その発想、一緒に試したい","議論しなくても安心するよ","君といると退屈しない","本音も聞かせてくれていいんだよ"]],"INTP":["論理学者",["返信の前に言葉を何度か選び直す","好きな人の趣味をこっそり調べる","会話した内容を後から思い返す"],["冷静に見えて、好きな人に関することだけ思考が止まらない。","一人の時間を大切にするけど、誰にも邪魔されない二人の時間も好き。","考えすぎて無表情に見える日ほど、実は心の中は忙しい。","気持ちを言うより前に、相手のための答えを何十通りも探している。"],["君の考え、すごく面白いね","話さない時間も心地いい","一緒に考えてくれてありがとう","言葉少なくてもちゃんと伝わるよ"]],"ENTJ":["指揮官",["二人の予定を先回りして考える","頼られるとうれしくて張り切る","大切な人の目標まで応援したくなる"],["強い人に見られるほど、安心して弱音を言える居場所を探している。","引っ張ることは得意でも、本当は寄りかかる瞬間も欲しい。","目標のために動いているようで、実は二人の笑顔を計画している。","人前では堂々としても、好きな人の前では不器用なほど素直。"],["君がいてくれると心強い","今日は任せて、休んでて","あなたの頑張り、見てるよ","弱いところも全部好き"]],"INTJ":["建築家",["好きになった理由を自分で分析する","相手の話した小さな情報を覚える","付き合う前から相性を考えてしまう"],["クールに見えて、信じた相手への気持ちはかなり深く長い。","一人で解決できても、理解される喜びは人一倍大きい。","計画的に進めるつもりでも、恋では予想外の自分が出てくる。","そっけなく見える言葉の裏に、ずっと続く約束を秘めている。"],["君のことを頼りにしてる","答えを急がなくていいよ","予定外だけど、君と行きたい","静かな優しさがちゃんと好き"]],"ESFJ":["領事",["記念日や相手の好みを覚えている","一緒に食べるご飯を大切にする","好きな人の表情で気持ちを察する"],["世話焼きに見えて、実は「自分も大切にされたい」の気持ちが強い。","合わせるのは得意だけど、ずっと我慢できるわけではない。","相手の喜ぶ顔が原動力。だけどサプライズされるのも大好き。","明るく気配りしたあと、誰にも見せない寂しさを抱えることがある。"],["そこまで覚えてくれてたんだ","今日は好きなことしよう","君のおかげで笑顔になれた","君のことも大切にしたい"]],"ISFJ":["擁護者",["体調や忙しさをさりげなく気にする","当たり前の約束をずっと守る","頼まれていないことも覚えている"],["控えめなぶん、信頼した相手への愛情はとても根強い。","相手を支えるのが自然すぎて、自分の希望を言い忘れやすい。","静かに見えて、守りたい人のためなら思い切り行動する。","本音をしまっていても、覚えていてくれた言葉にはすごく弱い。"],["一緒にいられるだけでうれしい","君の気持ちも聞かせて","その優しさに助けられてる","我慢してる時は教えてね"]],"ESTJ":["幹部",["デートの段取りを先に決めがち","約束を守ることが愛情表現","困った時はすぐ具体策を探す"],["しっかり者でも、好きな人の前では頼りたいと思う瞬間がある。","正しさを大事にするほど、気持ちをうまく言えない時もある。","最短ルートに見えて、実は二人の時間を誰より楽しみにしている。","堂々と振る舞うけど、何気ない褒め言葉をずっと覚えている。"],["一緒なら安心して進めるね","正解より、今日は気持ちを聞いて","段取りのおかげで楽しかった","いつも頑張ってくれてありがとう"]],"ISTJ":["管理者",["相手の好きなものを覚え続ける","連絡や約束を律儀に守る","ささやかな日常の積み重ねが好き"],["不器用に見えても、決めた相手には長い時間をかけて愛を示す。","感情を言葉にするのは得意でなくても、ちゃんと行動には出ている。","慎重に考えているうちに、心ではもう覚悟を決めている。","静かな愛情だからこそ、小さな安心を返してもらえるとうれしい。"],["君の誠実さ、伝わってるよ","無理に言わなくても分かるよ","準備してくれたこと、うれしい","ずっと一緒にいられたらいいな"]],"ESFP":["エンターテイナー",["楽しい予定を思いつくとすぐ誘う","相手の笑顔を見るともっと話したくなる","記念写真や思い出を大事にする"],["楽しさ全開でも、ふとした瞬間に安心できる居場所が恋しい。","誰とでも仲良くできるけど、本命の人には少し違う顔を見せる。","勢いで動くように見えて、好きな人の表情にはとても敏感。","にぎやかな時間の後ほど、大切な人の言葉を静かに思い返す。"],["君と過ごす時間が一番楽しい","素のままでいてね","次はどこへ行こうか","二人きりの時間も好きだよ"]],"ISFP":["冒険家",["言葉より行動で好きが伝わる","二人だけの空気感を大切にする","好きな景色を一緒に見せたくなる"],["マイペースに見えても、大切な人の些細な表情を忘れない。","言葉が少ないだけで、心の中ではたくさん気にかけている。","その場の気分を大切にするから、恋には思いがけない勇気が出る。","照れて言えなくても、隣にいる時間に気持ちを込めている。"],["君の感性、大好きだよ","急がず二人のペースで","その景色、また一緒に見よう","隣にいてくれてうれしい"]],"ESTP":["起業家",["会いたいと思ったらすぐ誘う","アクシデントも一緒に楽しみたい","恋人を楽しませる工夫が好き"],["大胆に見えても、本命からの一言には想像以上に弱い。","自由を大切にしながら、帰ってこられる安心した場所を欲している。","行動が速いのは、相手と過ごす時間を少しでも増やしたいから。","強気な冗談の後、好きな人の反応をちらっと確かめている。"],["思いきりがよくてかっこいい","君らしくいていいよ","一緒だと新しい世界が見える","強がらなくても大丈夫だよ"]],"ISTP":["巨匠",["困っていると黙って手を貸す","一緒に何かをする時間が好き","大げさな言葉より約束を守る"],["さっぱりして見えて、好きな人のためなら黙って頑張り続ける。","一人時間は譲れないけど、心から安心できる人には会いたくなる。","冷静な判断の裏に、大胆な一歩を秘めている時がある。","照れくさくて説明しないけど、行動のひとつひとつが告白みたい。"],["頼れるところが好きだよ","自由な時間も大事にしてね","その勇気、すごいと思う","言葉にしなくてもありがとう"]]};
const STYLES={"SD":{"label":"愛の開拓者","icon":"💪","desc":"好きなら言葉より先に、心が動く。","typical":"相手の「会いたい」がうれしくて、こちらも会う予定を作りたくなる。","care":"気持ちの速度が違う日も、相手のペースを尊重すると魅力が増す。"},"SW":{"label":"寄り添い上手","icon":"🌿","desc":"大切な相手の隣で、ゆっくり愛を育てる。","typical":"好きだからこそ急かさず、一緒にいられる時間の心地よさを大事にする。","care":"「平気だよ」と言った後に、ほんの少し本音も伝えてみよう。"},"AD":{"label":"恋の冒険家","icon":"🔥","desc":"気持ちが大きいほど、恋は冒険になる。","typical":"返信ひとつに一喜一憂。好きすぎて、自分でも驚くほど行動的になることがある。","care":"想像が膨らんだら、答え合わせを急ぐ前に気持ちを落ち着ける時間も持とう。"},"AW":{"label":"秘めた一途","icon":"🌙","desc":"控えめな言葉の奥に、一途な想い。","typical":"「言おうかな」「やっぱりやめよう」を繰り返すけど、気持ちは簡単に消えない。","care":"気持ちを察してもらうだけでなく、一言だけ希望を伝えられると楽になる。"}};
const ORDER=["SD","SW","AD","AW"];
const GREEK={SD:'α',SW:'β',AD:'γ',AW:'δ'};
function details(base,sub){
 if(!Object.prototype.hasOwnProperty.call(PROFILES,base)||!STYLES[sub])return null;
 const [name,habits,secrets,words]=PROFILES[base],style=STYLES[sub],n=ORDER.indexOf(sub);
 return {base,sub,name,style,greek:GREEK[sub],code:base+'-'+GREEK[sub],
  headline:style.desc,habits:[habits[0],style.typical,habits[1]],hidden:secrets[n],
  words:words[n],tip:style.care,extraHabit:habits[2]};
}
function textTo(id,txt){let n=document.getElementById(id);if(n)n.textContent=txt;}
let active=null, matches=0;
function render(r){
 const d=details(r.base,r.sub);if(!d)return;
 active=d;matches=0;
 textTo('love64-story-intro',d.headline);
 textTo('love64-story-secret',d.hidden);
 textTo('love64-story-words','「'+d.words+'」');
 textTo('love64-story-help',d.tip);
 textTo('love64-story-extra',d.extraHabit);
 const wrap=document.getElementById('love64-story-checklist');
 if(wrap){wrap.replaceChildren();d.habits.forEach((txt,i)=>{
  const btn=document.createElement('button');btn.type='button';btn.className='love64-check';btn.setAttribute('aria-pressed','false');
  const dot=document.createElement('span');dot.className='love64-check-dot';dot.setAttribute('aria-hidden','true');dot.textContent='♡';
  const label=document.createElement('span');label.textContent=txt;btn.append(dot,label);
  btn.addEventListener('click',()=>{const on=btn.getAttribute('aria-pressed')!=='true';btn.setAttribute('aria-pressed',String(on));dot.textContent=on?'♥':'♡';matches+=on?1:-1;
  textTo('love64-story-match',matches===3?'全部当てはまる！恋の自分をかなり知ってるかも。':matches===2?'2つも当てはまった！あと1つはどう？':matches===1?'共感1つ目！ 他のあるあるも見てみよう。':'当てはまるものをタップしてみてね。');
  });wrap.appendChild(btn);
  });}
 textTo('love64-story-match','当てはまるものをタップしてみてね。');
 let link=document.getElementById('love64-partner-link');if(link)link.href='love64-compat.html?me='+encodeURIComponent(r.base+'-'+r.sub);
 const detailLink=document.getElementById('love64-personal-detail');if(detailLink)detailLink.href='love64-'+r.base+'-'+r.sub+'.html';
 const save=document.getElementById('love64-story-save');if(save)save.disabled=false;
}
function getShareUrl(d){return new URL('love64-'+d.base+'-'+d.sub+'.html',location.href).href}
function shareText(d){return '私の恋タイプ64は【'+d.base+'-'+d.greek+' '+d.style.label+'】！\n実は…'+d.hidden+'\n\nあなたは何タイプ？ #恋タイプ64'}
async function copy(s){
 try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(s);return true;}}catch(_){}
 try{const el=document.createElement('textarea');el.value=s;el.style.position='fixed';el.style.left='-10000px';document.body.appendChild(el);el.select();const ok=document.execCommand('copy');el.remove();return ok;}catch(_){return false;}
}
async function share(){
 if(!active)return;
 const data={title:'恋タイプ64｜'+active.base+' '+active.style.label,text:shareText(active),url:getShareUrl(active)};
 try{if(navigator.share){await navigator.share(data);return;}}catch(err){if(err&&err.name==='AbortError')return;}
 const ok=await copy(data.text+'\n'+data.url);const msg=document.getElementById('love64-story-status');if(msg)msg.textContent=ok?'シェア用テキストとリンクをコピーしました。':'以下のリンクを開いて共有してください：'+data.url;
}
async function copyMyResult(){if(!active)return;const ok=await copy(shareText(active)+'\n'+getShareUrl(active));const msg=document.getElementById('love64-story-status');if(msg)msg.textContent=ok?'結果をコピーしました':'コピーできませんでした。';}
function shareX(){if(!active)return;const u='https://twitter.com/intent/tweet?text='+encodeURIComponent(shareText(active))+'&url='+encodeURIComponent(getShareUrl(active));window.open(u,'_blank','noopener,noreferrer');}

function roundRect(ctx,x,y,w,h,r){ctx.beginPath();if(ctx.roundRect){ctx.roundRect(x,y,w,h,r)}else{ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath()}}
function roundedFill(c,x,y,w,h,r,color){c.fillStyle=color;roundRect(c,x,y,w,h,r);c.fill()}
function drawLines(c,text,x,y,width,lineHeight,limit){
 const chars=Array.from(text),lines=[];let line='';
 for(const ch of chars){if(ch==='\n'){lines.push(line);line='';continue}if(c.measureText(line+ch).width>width&&line){lines.push(line);line=''}line+=ch}
 if(line)lines.push(line);
 for(let i=0;i<Math.min(lines.length,limit);i++){let l=lines[i];if(i===limit-1&&lines.length>limit){while(l.length&&c.measureText(l+'…').width>width)l=l.slice(0,-1);l+='…'}c.fillText(l,x,y+i*lineHeight)}
 return y+Math.min(lines.length,limit)*lineHeight;
}
async function cardBlob(d){
 if(document.fonts&&document.fonts.ready)try{await document.fonts.ready}catch(_){}
 // 9:16 Instagram Story portrait. Only reuse untouched, approved character art.
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1920;
 const c=canvas.getContext('2d');if(!c)throw Error('canvas unsupported');
 const bg=c.createLinearGradient(0,0,1080,1920);bg.addColorStop(0,'#fff2f8');bg.addColorStop(.54,'#fce8f5');bg.addColorStop(1,'#e9e5ff');c.fillStyle=bg;c.fillRect(0,0,1080,1920);
 c.fillStyle='rgba(255,255,255,.33)';c.beginPath();c.arc(1000,160,250,0,Math.PI*2);c.fill();c.beginPath();c.arc(60,1690,250,0,Math.PI*2);c.fill();
 roundedFill(c,56,62,968,1794,58,'#ffffff');
 roundedFill(c,84,87,912,100,28,'#fff0f7');
 c.textAlign='center';c.fillStyle='#d94b86';c.font='900 36px system-ui,sans-serif';c.fillText('♡  恋タイプ64  /  MY LOVE TYPE',540,153);
 c.fillStyle='#272138';c.font='900 104px system-ui,sans-serif';c.fillText(d.base+' - '+d.greek,540,292);
 c.fillStyle='#bf4c86';c.font='900 46px system-ui,sans-serif';c.fillText(d.style.icon+'  '+d.style.label,540,368);
 c.fillStyle='#8f7893';c.font='750 29px system-ui,sans-serif';c.fillText(d.name+' × '+d.style.label,540,416);
 // The image is unchanged: no artificial eyes, mouth or hair added.
 const art=new Image();art.decoding='async';art.src='assets/love64-hq/'+d.base+'.webp';
 await new Promise((resolve,reject)=>{art.onload=resolve;art.onerror=reject;if(art.complete&&art.naturalWidth)resolve()});
 const aspect=art.naturalWidth/art.naturalHeight;
 const ht=640,wd=Math.min(740,Math.round(ht*aspect));
 c.drawImage(art,540-wd/2,435,wd,ht);
 roundedFill(c,107,1090,866,225,30,'#fff3f8');
 c.fillStyle='#c04d82';c.font='850 33px system-ui,sans-serif';c.fillText('🫣  実はこんな一面も…',540,1146);
 c.fillStyle='#3d3046';c.font='750 35px system-ui,sans-serif';drawLines(c,d.hidden,540,1218,760,52,2);
 roundedFill(c,107,1345,866,235,30,'#f4f1ff');
 c.fillStyle='#9070b5';c.font='850 33px system-ui,sans-serif';c.fillText('💬  言われたい一言',540,1406);
 c.fillStyle='#392c48';c.font='850 38px system-ui,sans-serif';drawLines(c,'「'+d.words+'」',540,1482,760,55,2);
 c.fillStyle='#9b7a9b';c.font='750 30px system-ui,sans-serif';c.fillText('恋の自分、どれくらい当たってる？',540,1688);
 roundedFill(c,248,1720,584,82,28,'#f35d90');
 c.fillStyle='white';c.font='900 34px system-ui,sans-serif';c.fillText('私も無料で診断する →',540,1774);
 c.fillStyle='#a08eaa';c.font='700 23px system-ui,sans-serif';c.fillText('koropopgames.com/love64.html',540,1835);
 return await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('image generation failed')),'image/png'));
}
function openCardPreview(blob,d){
 const previous=document.getElementById('love64-card-preview');if(previous)previous.remove();
 const url=URL.createObjectURL(blob);
 const dialog=document.createElement('dialog');dialog.id='love64-card-preview';dialog.className='love64-card-preview';
 const image=document.createElement('img');image.alt=d.base+' '+d.style.label+'のシェア用縦型カード';image.src=url;
 const heading=document.createElement('h2');heading.textContent='シェア画像ができました';
 const desc=document.createElement('p');desc.textContent='画像を確認して保存、またはLINEやSNSで共有できます。';
 const controls=document.createElement('div');controls.className='love64-card-preview-actions';
 const send=document.createElement('button');send.type='button';send.textContent='📲 画像を共有';
 const download=document.createElement('a');download.href=url;download.download='love64-'+d.base+'-'+d.sub+'.png';download.textContent='画像を保存';
 const close=document.createElement('button');close.type='button';close.textContent='閉じる';close.className='love64-card-preview-close';
 const feedback=document.createElement('p');feedback.className='love64-card-preview-status';feedback.setAttribute('role','status');
 controls.append(send,download,close);dialog.append(heading,desc,image,controls,feedback);document.body.appendChild(dialog);
 const dismiss=()=>{if(dialog.close)dialog.close();else dialog.remove()};
 close.addEventListener('click',dismiss);
 dialog.addEventListener('close',()=>{dialog.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)});
 send.addEventListener('click',async()=>{
  const file=new File([blob],download.download,{type:'image/png'});
  try{if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:'恋タイプ64',files:[file]});feedback.textContent='画像を共有しました。';return;}}
  catch(e){if(e&&e.name==='AbortError')return}
  feedback.textContent='画像を保存してから、LINEやSNSに投稿してください。';
 });
 if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
}
async function saveCard(){
 if(!active)return;
 const status=document.getElementById('love64-story-status');if(status)status.textContent='シェア画像を作成中…';
 try{const blob=await cardBlob(active);openCardPreview(blob,active);if(status)status.textContent='シェア画像を作成しました。';}
 catch(err){if(status)status.textContent='画像を作成できませんでした。結果テキストを共有してください。';}
}
function byCode(raw){if(!raw)return null;let m=String(raw).toUpperCase().match(/^([EI][NS][TF][JP])-(SD|SW|AD|AW)$/);return m?details(m[1],m[2]):null}
window.Love64Story={details,byCode,render,share,shareX,copyMyResult,saveCard,getShareUrl,shareText,types:Object.keys(PROFILES),subtypes:Object.keys(STYLES)};
})();