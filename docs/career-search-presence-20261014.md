# 全44ページの検索結果照会（2026-10-14）

## 重要な訂正：Googleでの掲載実績はすでにあった（2026-10-14確認）

**Google Search Console公式通知を再確認した結果、2026-09-26からkoropopgames.comへの検索インプレッションが収集され、一部の検索語句でサイトが実際に表示されていた。** したがって、以下のウェブ検索で「結果の確認なし」は「Googleに一件も登録されていない」という意味ではなく、閲覧手段から結果を再現できなかったというだけである。

- 2026-09-28受信のSearch Console通知：9月26日からGoogle検索で表示回数が発生し、一部クエリでページが検索結果に表示された旨を確認。
- 2026-10-07付近のSearch Console通知：一部URLの **404／リダイレクト／ユーザー指定のcanonicalが選ばれない重複** を報告。これはサイト全体のインデックス拒否を意味しない。転送ページ・重複ページは意図どおりなら修正不要な場合もある。
- 2026-10-12受信の通知：**「代替ページ（適切なcanonicalタグあり）」1件**について、検証開始。検証完了・結果の確認はまだできていない。
- Search Console本体の所有権確認はすでに実施済み。**GSC Wizardアプリに接続されたプロパティが0件であることと、Google Search Console自体が未登録であることを混同しない。**
- 個々の44URLが現在どのGoogle検索で表示されているか、最終クロール、Google選択canonical、最新の掲載順位などはGSC Wizardで取得できないため未確定。公式通知の検索表示開始日以降の増減は現データなし。

**運営上の修正方針：** 全サイトに一律の再登録を強制するのではなく、Search Consoleの「ページのインデックス登録」レポートにある対象URLと理由を確認してから修正する。404が意図的な廃止ページか、旧URLから移転すべきものか、canonicalの期待値が正しいかを区別する。

## この表の意味

- 対象：KOROPOP CAREER の `sitemap.xml` に載る **44 HTML URL**。トップページは別途ドメイン名・ブランド名でも検索した。
- 方法：各ページの `site:koropopgames.com/<filename>` をWeb検索に指定し、サイト・記事名を組み合わせた検索も実施。利用可能だった検索サービスでは**当サイトのURLを示す検索結果を取得できなかった**。
- 注意：この「結果の確認なし」は「Googleでインデックス未登録」と同義ではない。検索ツール固有の取得制限、`site:` 検索の非網羅性がある。Google Search Console URL検査APIを使用するにはサイトの所有者確認と接続が必要だが、**GSC Wizard の接続済みプロパティは0件**だった。Googleの登録状況、最終クロール、クリック、表示回数、掲載順位は**44 URLすべて未確認**。
- 代表的な公式根拠：[Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical)、[URL inspection guide](https://support.google.com/webmasters/answer/12482179)、[`site:` operator's limits](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site)。
- 当社のソース上は `CNAME` = `koropopgames.com`、`robots.txt` = `Allow: /`、全45 URL（トップ＋44ページ）の canonical、noindex、見出し・description・viewport に明白な問題は見つからなかった。ただし **HTTP 200 / 実際のGooglebotアクセス/検査結果は未確認**。

| # | URL末尾 | Web検索で当該ページを確認 | Googleインデックス登録状態 |
|---:|---|---|---|
| 1 | `20s-it-tenshoku-nenshu.html` | 結果の確認なし | 未確認 |
| 2 | `20s-mikeiken-tenshoku.html` | 結果の確認なし | 未確認 |
| 3 | `30s-mikeiken-it-tenshoku.html` | 結果の確認なし | 未確認 |
| 4 | `about.html` | 結果の確認なし | 未確認 |
| 5 | `career-general.html` | 結果の確認なし | 未確認 |
| 6 | `contact.html` | 結果の確認なし | 未確認 |
| 7 | `helpdesk-kara-shanai-se.html` | 結果の確認なし | 未確認 |
| 8 | `hito-to-kakawaranai-shigoto.html` | 結果の確認なし | 未確認 |
| 9 | `infra-engineer-yametoke.html` | 結果の確認なし | 未確認 |
| 10 | `it-engineer-muiteiru.html` | 結果の確認なし | 未確認 |
| 11 | `it-engineer-nenshu-suii.html` | 結果の確認なし | 未確認 |
| 12 | `it-engineer-remote.html` | 結果の確認なし | 未確認 |
| 13 | `it-helpdesk-ichinichi.html` | 結果の確認なし | 未確認 |
| 14 | `it-job-nenshu-hikaku.html` | 結果の確認なし | 未確認 |
| 15 | `it-mikeiken-shikaku.html` | 結果の確認なし | 未確認 |
| 16 | `it-mikeiken-shokumukeirekisho.html` | 結果の確認なし | 未確認 |
| 17 | `it-tenshoku-shikaku-nashi.html` | 結果の確認なし | 未確認 |
| 18 | `jobs.html` | 結果の確認なし | 未確認 |
| 19 | `kyujin-check.html` | 結果の確認なし | 未確認 |
| 20 | `kyujin-joken-hikaku.html` | 結果の確認なし | 未確認 |
| 21 | `mikeiken-cloud-engineer.html` | 結果の確認なし | 未確認 |
| 22 | `mikeiken-infra-engineer.html` | 結果の確認なし | 未確認 |
| 23 | `mikeiken-it-helpdesk.html` | 結果の確認なし | 未確認 |
| 24 | `mikeiken-it-kyujin-miwakekata.html` | 結果の確認なし | 未確認 |
| 25 | `mikeiken-it-mensetsu-20.html` | 結果の確認なし | 未確認 |
| 26 | `mikeiken-it-shibodoki.html` | 結果の確認なし | 未確認 |
| 27 | `mikeiken-it-study-roadmap.html` | 結果の確認なし | 未確認 |
| 28 | `mikeiken-it-tenshoku.html` | 結果の確認なし | 未確認 |
| 29 | `mikeiken-it-yametoke.html` | 結果の確認なし | 未確認 |
| 30 | `mikeiken-network-engineer.html` | 結果の確認なし | 未確認 |
| 31 | `mikeiken-shanai-se.html` | 結果の確認なし | 未確認 |
| 32 | `mikeiken-shikaku-nashi-shigoto.html` | 結果の確認なし | 未確認 |
| 33 | `mikeiken-soc-security.html` | 結果の確認なし | 未確認 |
| 34 | `pc-kitting-mikeiken.html` | 結果の確認なし | 未確認 |
| 35 | `privacy.html` | 結果の確認なし | 未確認 |
| 36 | `programming-nigate-it-job.html` | 結果の確認なし | 未確認 |
| 37 | `raku-na-shigoto.html` | 結果の確認なし | 未確認 |
| 38 | `ses-haken-jisha-ukeoi-chigai.html` | 結果の確認なし | 未確認 |
| 39 | `shanai-se-ichinichi.html` | 結果の確認なし | 未確認 |
| 40 | `shanai-se-raku-kitsui.html` | 結果の確認なし | 未確認 |
| 41 | `shigoto-yametai-tsugi-kimattenai.html` | 結果の確認なし | 未確認 |
| 42 | `shokushu-hikaku.html` | 結果の確認なし | 未確認 |
| 43 | `tedori.html` | 結果の確認なし | 未確認 |
| 44 | `terms.html` | 結果の確認なし | 未確認 |
 
## この調査中に修正した不具合

- `20s-mikeiken-tenshoku.html` の存在しなかった `images/20s-mikeiken-tenshoku.webp` を、存在が確認できた `assets/career-thumb-work.svg` へ差し替え。文章、絵の代替テキスト、サイズ属性も合わせて変更。
- `shigoto-yametai-tsugi-kimattenai.html` の JSON-LD を修正（`@graph` の配列とトップオブジェクトが閉じられていなかった）。変更後は2つの `Article` / `FAQPage` ノードをJSONとして解析可能。
- 45ページのJSON-LDを静的確認し、今回の不正JSONは上記1件。今後は `scripts/test-career-indexability.cjs` が全サイトのHTMLソースに対してサイトマップ、canonical、robots、meta、JSON-LDの回帰検査を実施する設計。
- 画像・CSS・JSの参照先を点検し、欠落したメイン画像1件を修正。ほかの主要静的アセット16件はGitHub上に実在。

## Googleの掲載有無を **実際に確定する** 次の作業

1. 確認済みのGoogle Search Consoleプロパティにログインし、最新の「ページのインデックス登録」レポートを開く。プロパティの新規登録・再確認は基本的に不要。
2. `https://koropopgames.com/sitemap.xml` を送信し、ページのインデックス登録レポートを確認する。サイトマップ送信はインデックスを保証しない。
3. 特にトップ、`mikeiken-it-tenshoku.html`、`mikeiken-shanai-se.html`、`shanai-se-ichinichi.html`、`mikeiken-it-mensetsu-20.html` についてURL検査で「Googleに登録済み」「クロール済み—インデックス未登録」「検出—インデックス未登録」「リダイレクト」「取得エラー」「Google選択canonical」などを確認する。
4. GSC Wizardにプロパティが接続されれば、44 URLそれぞれを Inspection API で検査し、**個別ページの真の登録状態**を表に反映する。リクエスト回数と日別割当を考慮する。
5. 公開サイトのHTTP 200応答、ホスト証明書、DNS、主要リソースの200応答を別途確認する。この環境では `koropopgames.com` への直接Web取得は失敗し、DNSのないコンテナからも実サイトやGitHub APIに接続できなかったため、サイトの稼働状況を断定できない。

**Google検索での順位、実際のクロール・登録状態、PVや広告収益の改善はこの報告で証明できない。**
