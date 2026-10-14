/* KOROPOP CAREER — job-ad question memo. All processing stays on the reader's device. */
(() => {
  'use strict';
  const root = document.getElementById('role-worksheet');
  if (!root) return;

  const build = root.querySelector('#buildWorkroleMemo');
  const copy = root.querySelector('#copyWorkroleMemo');
  const result = root.querySelector('#workroleMemoResult');
  const output = root.querySelector('#workroleMemo');
  const status = root.querySelector('#workroleStatus');
  const choices = [...root.querySelectorAll('input[data-workrole]')];
  if (!build || !copy || !result || !output || !status || choices.length !== 6) return;

  const duties = {
    support: {
      label: '社員からの問い合わせ・トラブル対応',
      question: '1日の問い合わせ件数と、一次受付から解決までどこを担当しますか？'
    },
    devices: {
      label: 'PCセットアップ・アカウント管理',
      question: 'PC設定・アクセス権の作業範囲と、承認・確認の手順を教えてください。'
    },
    operations: {
      label: 'サーバー・ネットワークなどの運用',
      question: '監視・定常運用・構築作業の割合、障害当番や夜間対応はありますか？'
    },
    projects: {
      label: 'システム導入・ベンダーとの調整',
      question: '導入案件では要件整理・検証・ベンダー調整のどの工程に関わりますか？'
    },
    improvement: {
      label: '業務フローの改善・DX提案',
      question: '改善提案の進め方と、現場への聞き取り・効果検証の担当範囲は？'
    },
    development: {
      label: '社内システムの開発・改修',
      question: '自社で開発する範囲、使う技術、レビュー・テストの体制を教えてください。'
    }
  };
  const selected = () => choices.filter(el => el.checked).map(el => el.dataset.workrole).filter(key => Object.hasOwn(duties, key));

  function buildText(keys) {
    const selectedLabels = keys.map(key => '・' + duties[key].label);
    const questions = keys.map(key => '・' + duties[key].question);
    const base = [
      '・入社後1〜3か月に、未経験者が実際に担当する業務は何ですか？',
      '・問い合わせ対応・日常運用・改善案件などの業務割合は、普段どのくらいですか？',
      '・チーム人数、相談できる先輩、手順書や研修の体制はどうなっていますか？'
    ];
    if (!keys.length) questions.push('・求人に「社内SE」とありますが、日常の主な業務と担当範囲を具体例で教えてください。');
    return [
      '社内SE求人｜応募前の質問メモ',
      '',
      '【求人票に明記された仕事内容】',
      ...(selectedLabels.length ? selectedLabels : ['・具体的な業務が読み取れない／まだ確認できていない']),
      '',
      '【この業務について確認したいこと】',
      ...questions,
      '',
      '【共通して確認したいこと】',
      ...base,
      '・夜間・休日の障害対応、オンコール、残業が発生する条件はありますか？',
      '',
      '※ 求人票に書かれていない業務が担当外だとは限りません。記載と実際の仕事内容を照らし合わせて確認しましょう。'
    ].join('\n');
  }

  choices.forEach(el => el.addEventListener('change', () => {
    result.hidden = true;
    copy.disabled = true;
    status.textContent = '選択内容を変更しました。「確認したい質問を作る」で更新できます。';
  }));
  build.addEventListener('click', () => {
    const keys = selected();
    output.value = buildText(keys);
    result.hidden = false;
    copy.disabled = false;
    status.textContent = '質問メモを作成しました。内容を確認して、必要ならコピーしてください。';
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  });

  copy.addEventListener('click', async () => {
    if (copy.disabled || !output.value) return;
    const value = output.value;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        output.focus();
        output.select();
        if (!document.execCommand('copy')) throw new Error('Copy not supported');
      }
      status.textContent = 'コピーしました。応募前に確認したい質問として使えます。';
    } catch (error) {
      output.focus();
      output.select();
      status.textContent = '自動コピーできませんでした。選択した文章を長押ししてコピーしてください。';
    }
  });

  // Expose only the deterministic text formatter for local regression tests in Node.
  if (typeof module !== 'undefined' && module.exports) module.exports = { buildText };
})();