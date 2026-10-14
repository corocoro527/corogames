# KOROPOP CAREER — Google Search Console実測：全45URLのインデックス検査

**検査日：2026年10月14日（日本時間）**。データ：接続済みGoogle Search Consoleプロパティ `sc-domain:koropopgames.com` のURL Inspection API。対象はトップページ＋サイトマップ掲載44URL。検索エンジンの推測ではなく、Googleが返した各URLの検査結果。

## 重要な数字

| 判定 | ページ数 | 意味 |
|---|---:|---|
| **登録済み（Submitted and indexed）** | **18** | Googleに登録され、ユーザー指定canonicalとGoogle選択canonicalは一致 |
| **Google未認識（URL is unknown to Google）** | **23** | 現時点のGoogle URL検査でURLのクロール／発見情報なし。公開不能と断定する意味ではない |
| **発見済み・未登録（Discovered - currently not indexed）** | **4** | URLは認識されているが、まだインデックス未登録 |
| 合計 | **45** | 2026-10-14の一時点での状態。Googleの反映には時間差あり |

**Search Console サイト全体の検索実績（2026-09-14〜2026-10-11・確定データ）**：クリック **11回**、表示回数 **44回**、CTR **25%**、平均掲載順位 **43.66位**。同じドメインのゲーム・診断など他部門も含むため、**KOROPOP CAREER単独の数値ではない**。検索クエリ・ページ別レポートは集計ルールと匿名化の影響でサイト全体と単純加算一致しないことがある。

**サイトマップ改善を実行済み**：以前のSearch Console表示は送信36URL、最終取得が10月13日。10月14日17時08分頃（JST）に `https://koropopgames.com/sitemap.xml` を再送信。Googleが同日08:08:55Zに再取得し、**送信45 URL、エラー0・警告0**と表示された。サイトマップ管理画面は「indexed 0」と表示する一方、URL Inspection APIは18URLを登録済みと返している。**画面の集計遅延・集計定義の違いを無視して0件と断定しない**。サイトマップ送信はクロールや登録を保証しない。

## 45URL別のGoogle検査結果

| URL | 判定 | 最終クロール（UTC） |
|---|---|---|
| `（トップ）` | 登録済み | 2026-10-14 01:03 |
| `20s-it-tenshoku-nenshu.html` | 登録済み | 2026-10-12 15:09 |
| `20s-mikeiken-tenshoku.html` | 登録済み | 2026-10-13 12:33 |
| `30s-mikeiken-it-tenshoku.html` | 登録済み | 2026-10-13 02:09 |
| `about.html` | 登録済み | 2026-10-13 16:18 |
| `career-general.html` | 登録済み | 2026-10-13 15:03 |
| `contact.html` | 登録済み | 2026-10-13 17:33 |
| `helpdesk-kara-shanai-se.html` | Google未認識 | 未報告 |
| `hito-to-kakawaranai-shigoto.html` | Google未認識 | 未報告 |
| `infra-engineer-yametoke.html` | 登録済み | 2026-10-13 02:36 |
| `it-engineer-muiteiru.html` | Google未認識 | 未報告 |
| `it-engineer-nenshu-suii.html` | Google未認識 | 未報告 |
| `it-engineer-remote.html` | 登録済み | 2026-10-13 22:33 |
| `it-helpdesk-ichinichi.html` | Google未認識 | 未報告 |
| `it-job-nenshu-hikaku.html` | Google未認識 | 未報告 |
| `it-mikeiken-shikaku.html` | Google未認識 | 未報告 |
| `it-mikeiken-shokumukeirekisho.html` | Google未認識 | 未報告 |
| `it-tenshoku-shikaku-nashi.html` | Google未認識 | 未報告 |
| `jobs.html` | 登録済み | 2026-10-14 00:49 |
| `kyujin-check.html` | 登録済み | 2026-10-13 13:48 |
| `kyujin-joken-hikaku.html` | Google未認識 | 未報告 |
| `mikeiken-cloud-engineer.html` | 発見済み・未登録 | 未報告 |
| `mikeiken-infra-engineer.html` | 発見済み・未登録 | 未報告 |
| `mikeiken-it-helpdesk.html` | Google未認識 | 未報告 |
| `mikeiken-it-kyujin-miwakekata.html` | 登録済み | 2026-10-01 08:45 |
| `mikeiken-it-mensetsu-20.html` | Google未認識 | 未報告 |
| `mikeiken-it-shibodoki.html` | 登録済み | 2026-10-13 18:18 |
| `mikeiken-it-study-roadmap.html` | Google未認識 | 未報告 |
| `mikeiken-it-tenshoku.html` | 登録済み | 2026-10-13 23:48 |
| `mikeiken-it-yametoke.html` | Google未認識 | 未報告 |
| `mikeiken-network-engineer.html` | Google未認識 | 未報告 |
| `mikeiken-shanai-se.html` | Google未認識 | 未報告 |
| `mikeiken-shikaku-nashi-shigoto.html` | Google未認識 | 未報告 |
| `mikeiken-soc-security.html` | 発見済み・未登録 | 未報告 |
| `pc-kitting-mikeiken.html` | Google未認識 | 未報告 |
| `privacy.html` | 登録済み | 2026-10-12 07:25 |
| `programming-nigate-it-job.html` | Google未認識 | 未報告 |
| `raku-na-shigoto.html` | Google未認識 | 未報告 |
| `ses-haken-jisha-ukeoi-chigai.html` | Google未認識 | 未報告 |
| `shanai-se-ichinichi.html` | Google未認識 | 未報告 |
| `shanai-se-raku-kitsui.html` | Google未認識 | 未報告 |
| `shigoto-yametai-tsugi-kimattenai.html` | 発見済み・未登録 | 未報告 |
| `shokushu-hikaku.html` | 登録済み | 2026-10-13 06:56 |
| `tedori.html` | 登録済み | 2026-10-05 15:13 |
| `terms.html` | 登録済み | 2026-10-14 03:33 |

## 2026-10-14 — Googleの実測に基づき実行した改善

- **Googleに登録済みの3つの読者入口から文脈に沿った内部リンクを追加：**
  - `mikeiken-it-tenshoku.html` に仕事の具体像を確認する4件の案内（ヘルプデスクの1日、社内SEの1日、PCキッティング、ヘルプデスク→社内SE）を追加。
  - `shokushu-hikaku.html` に仕事の1日・PCの工程を知る3件のリンクを追加。
  - `20s-mikeiken-tenshoku.html` にITの仕事に興味を持った人向けの「ヘルプデスクと社内SEの1日」案内を追加。
- 重要ガイド `mikeiken-it-helpdesk.html` に「1日の流れ」と「キッティングの工程」へ進める案内を設け、見出しと記事内容に合う `Article` JSON-LDを作成。`mikeiken-cloud-engineer.html` にも確認できる編集情報だけで `Article` JSON-LDを追加した。**構造化データを追加してもGoogleの登録は保証されない。**
- `scripts/test-career-indexed-hubs.cjs` で3つの入口→4重要記事のリンク、リンク先存在、スマホCSSと正確なArticle JSON-LDをテスト。実際のGitHubコンテンツで模擬実行PASS、Site Doctorへ登録。
- GSC Wizardの **Indexing Trackerに45URLすべてを登録済み**。現在のベースライン18件登録済み／23件Google未認識／4件発見済み未登録を使い、今後の変化を比較できる。
- GSC Wizardの公開サイトSEO監査は、上記とは別の計20URLで**critical 0 / high 0、取得可能かつindexable 20件**。警告は画像・ロゴを含まないArticle構造化データや、文字数推計など。日本語記事に対して「thin-content」の英語系単語数推計が適切とは限らないため、低い数値を理由に内容を水増ししない。トップの`alt=""`画像4件は意図的な装飾画像（`aria-hidden="true"`）だったため、不必要な読み上げテキストを追加しない。
- **公開反映の確認**：追加直後のライブ監査では旧版だったが、その後 GSC Wizardの公開URL取得で `mikeiken-it-helpdesk.html`、`mikeiken-cloud-engineer.html` のHTTP 200と新しい `Article` JSON-LDを確認。`mikeiken-it-tenshoku.html`、`shokushu-hikaku.html`、`20s-mikeiken-tenshoku.html` もHTTP 200／自己canonical／インデックス可能と確認。**ボタンの実クリックやスマホ実画面のレンダリングまでは検証していない**。
- 今回の内部リンクとSEOチェックは**検索順位上昇の測定結果ではない**。サイトマップとリンクを更新した後、Googleの発見・クロール・登録の変化を数日単位で観測し、実際の流入と照合する。

## 直すべき順序

1. **すでに索引登録済み18URL**：Googleが選んだcanonicalが自身のURLと一致。既存canonicalの一括変更はしない。重要な記事への自然な内部リンクを確認する。
2. **未知23URL**：本日作成した記事（面接20問、PCキッティング、社内SEの1日等）は公開直後なので、登録されるまで一定の時間が必要。古いURLにも未知があるため、内部リンク・サイトマップ・サイト内導線を重点監査する。
3. **発見済み4URL**：`mikeiken-infra-engineer.html`、`mikeiken-cloud-engineer.html`、`mikeiken-soc-security.html`、`shigoto-yametai-tsugi-kimattenai.html`。いずれも現在の検査結果ではクロール時刻未報告。サイト内リンク・ページ品質・内容の重複・手順の正確性を見直す。
4. **サイトマップは再取得済み**：新しいシグナルがGoogleに届いた。数日〜数週間かけて変化を追う。サーバーやGooglebotの取得エラーが新たに出た場合は別途修正。
5. **実際の検索流入**：有効な検索データをもとに、どのページ・クエリでクリックがあるか分析する。全ドメイン統計をCAREERの成果だと誤認しない。

## 計測の限界・注意

- URL検査の「未認識」は、Googleの現在のインデックス状況を示すものであり、HTTP 404・サーバー障害の証拠ではない。
- サイトマップを送った直後に全件登録されるわけではなく、Googleのクロール・インデックス登録には時間差と審査がある。
- `site:`検索の結果数や外部検索ツールの結果を、公式URL検査APIより優先しない。
- インデックス登録されたことと上位表示・流入・AdSense承認・収益が発生したことは別。
- [Google Search Console](https://search.google.com/search-console) で同じプロパティを選択し、個別URLを検査可能。
