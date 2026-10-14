/* Transparent next-action routing, no profiles, no storage, no search-text collection. */
(function(){
'use strict';
const root=document.getElementById('next-action');if(!root)return;
const $=id=>root.querySelector('#'+id);
const stage=$('nextStage'),concern=$('nextConcern'),title=$('nextActionTitle'),why=$('nextActionWhy'),task=$('nextActionTask'),main=$('nextActionPrimary'),related=$('nextActionSecondary');
if(!stage||!concern||!title||!why||!task||!main||!related)return;
const routes={
 roles:['shokushu-hikaku.html#role-explore','6職種から探す ↗'],
 study:['mikeiken-it-study-roadmap.html','4週間の計画を作る ↗'],
 jobs:['mikeiken-it-kyujin-miwakekata.html','求人票の注意点を見る ↗'],
 compare:['kyujin-joken-hikaku.html','2社の条件を比べる ↗'],
 resume:['it-mikeiken-shokumukeirekisho.html','職務経歴書の下書きを作る ↗'],
 interview:['mikeiken-it-mensetsu-20.html','面接20問を練習する ↗'],
 career:['helpdesk-kara-shanai-se.html','社内ITへの準備を調べる ↗'],
 lowcode:['programming-nigate-it-job.html','コードを書かない職種を探す ↗'],
 example:['it-helpdesk-ichinichi.html','仕事の1日を読む ↗']
};
const options={
 undecided:{title:'気になるIT職種を2つ探そう',why:'仕事内容を比べると、名前だけでは分からない違いが見える。',task:'「やってみたい作業」がある2職種を選び、気になることを1つずつ書く。',first:'roles',second:'example'},
 decided:{title:'必要な学習を一つ決めよう',why:'職種が決まったら、求人で必要な作業を確認することが近道。',task:'希望職種の求人2件を見て、必要な知識を3つ書き出す。',first:'study',second:'jobs'},
 studying:{title:'学習したことを説明できる形にしよう',why:'学んだ時間だけでなく、試した作業と結果を記録しよう。',task:'試したこと・確認した結果・まだ分からないことを各1行書く。',first:'study',second:'resume'},
 jobs:{title:'求人票の条件を比較しよう',why:'研修後の配属・仕事内容・勤務時間を同じ基準で見る。',task:'気になる2社の仕事内容、研修、勤務時間の違いを書き出す。',first:'jobs',second:'compare'},
 applying:{title:'前職の経験を応募書類にまとめよう',why:'実際の担当業務を具体化すると、応募理由も説明しやすくなる。',task:'経験した仕事を3つ書き、応募職種で活かせるものを1つ選ぶ。',first:'resume',second:'interview'},
 careerup:{title:'経験を次のIT業務につなげよう',why:'いま担当できる作業と、次に学びたい業務を分けて考える。',task:'実際に経験した作業に印を付け、次の求人で確認する仕事を1つ決める。',first:'career',second:'roles'},
 noncode:{title:'コードを書く量が少ない職種から調べよう',why:'ITの仕事は開発だけじゃない。運用・サポートの仕事も比べよう。',task:'2つの職種を読み、普段の担当業務と必要な知識を比較する。',first:'lowcode',second:'roles'},
 conditions:{title:'働き方と勤務条件を確かめよう',why:'夜勤、残業、勤務地、給与の条件は求人によって違う。',task:'求人2件の夜勤・残業・勤務地の記載を確認する。',first:'jobs',second:'compare'},
 paperwork:{title:'応募書類と面接の準備に進もう',why:'経歴を盛らず、自分が実際に経験したことから整理しよう。',task:'前職の作業を3つ書き、応募する仕事に近いものを1つ選ぶ。',first:'resume',second:'interview'}
};
function render(){
 const state=stage.value,need=concern.value;
 let key=state;
 if(['noncode','conditions','paperwork'].includes(need))key=need;
 if(need==='work'&&state!=='careerup')key='undecided';
 if(need==='learning'&&state!=='studying')key='decided';
 const o=options[key]||options.undecided;
 title.textContent=o.title;why.textContent=o.why;task.textContent=o.task;
 const a=routes[o.first],b=routes[o.second];
 main.href=a[0];main.textContent=a[1];related.href=b[0];related.textContent=b[1];
}
stage.addEventListener('change',render);
concern.addEventListener('change',render);
render();
})();