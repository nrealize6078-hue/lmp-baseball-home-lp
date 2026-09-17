# LMP LP「この街を、ホームにしよう。」作業コピー

賃貸仲介・管理会社向けの LMP 加盟LP。

- 元サイト: https://lmp-baseball-home.uminchu-t0422.chatgpt.site/ （ChatGPTのサイト公開機能。2026年9月17日時点を取得）
- 公開: https://nrealize6078-hue.github.io/lmp-baseball-home-lp/ （GitHub Pages / main / ルート・**検索掲載あり＝noindexなし**）
- リポジトリ: https://github.com/nrealize6078-hue/lmp-baseball-home-lp （このフォルダ直下が `.git`）
- **元サイトとこちらは別物。こちらを直しても chatgpt.site 側は変わりません。**

反映は `git add -A && git commit && git push`。1〜2分でPagesに出ます。

## 構成

| ファイル | 中身 |
|---|---|
| `index.html` | 本文。元は1行だったものをタグ単位で改行済み |
| `style.css` | 元サイトで `<style>` にベタ書きされていたCSSを切り出し |
| `script.js` | LINEアイコンの描画＋固定ボトムバーの表示制御 |
| `assets/baseball-hero.jpg` | ヒーロー画像（CSSの `url()` も書き換え済み） |

## 複製時の処理

- Cloudflareが挿入していた計測スクリプトを削除（元サイトが持つJSはこれ1本だけ。自前のJSは無し）
- 画像を `assets/` へ移動
- 未設定: OGP画像

## 問い合わせ導線（LINE）

問い合わせ先はLINE公式アカウント `https://lin.ee/vV1leDB`（新時代の集客LPと同じ窓口）。3か所に置いています。

1. ファーストビュー `.hero-cta` — 「次の成長への作戦を見る」の隣（スマホでは下）
2. 最終セクション `.closing` の `.line-card`（白カード＋ゴールドの上罫）
3. 固定ボトムバー `#cta-bar` — ヒーローを過ぎたらせり上がる。背景はダークグリーン `rgba(21,82,72,.97)`

ボタンはLINE公式の緑の画像ではなく、**サイトのゴールド `--gold:#efc76b`** に統一（`.btn-line`）。LINEのアイコンは `script.js` がSVGパスで描いている。

注意点:

- `hidden` 属性は `display` 指定に負けるため、CSS冒頭に `[hidden]{display:none!important}` を入れてある
- 文言は `index.html` の `.lc-h` / `.lc-t` / `.bar-long` / `.bar-short` を直接編集。スマホは短い方（`.bar-short`）が出る

## プレビュー

`.claude/launch.json` の `lmp-home-lp`（ポート8961）。

```bash
python -m http.server 8961 --directory lmp-baseball-home-lp
```

## スマホの折り返し対策（2026年9月17日）

元サイトは `<br>` で改行位置を固定しており、スマホ幅ではその行がさらに折り返して「ホームにしよ／う。」のように語中で切れていた。320/375/414/520/600/700/760px をブラウザで実測しながら以下で解消。

- 見出しは `clamp()` 化（`.hero h1` / `.section h2` / `.solution h3`）
- 長い見出し行にはスマホだけ効く改行 `<br class="sp">` を追加（560px以下で `display:inline`）
- 本文は720px以下で `p br{display:none}` にして自然改行へ。`text-wrap:pretty` と `word-break:auto-phrase` も付与
- 560px以下で `.pain-grid` と `.solution` を1カラム化、CTAボタンの文字を1行に収まる大きさへ

**再検証のしかた**: 上記の各幅で、`<br>` 区切りの各行に Range を作り `getClientRects()` の distinct な top が2以上なら再折り返し＝崩れ。

## 文節ごとの折り返し（2026年9月17日）

iOS Safari は `word-break:auto-phrase`（文節折り）に対応していないため、本文の `<p>` を**文節単位で `<span class="bn">` に包み、800px以下で `display:inline-block`** にしている。ブラウザはspanの境目でしか折り返さないので、語の途中で切れない。

- 区切りの判定は「ひらがな→漢字/カタカナ/英数」の境目と句読点の後。`っ ん ー ぁ〜ょ` と接頭辞 `お ご み` の直後では切らない
- spanを付け直すときは、既存の `<span class="bn">…</span>` を外してから同じ処理をかける
- 長い語が1行に収まらない場合の保険として `.bn{overflow-wrap:anywhere}`
- 見出しは `<br class="sp">` で改行位置を指定。ただし**「を、」だけが行に残るような切り方はしない**（1行に収まるなら改行を入れない方がきれい）
- カード類（`.flow` `.pain-grid` `.solution`）は560px以下で1カラム。2カラムのままだと「企業とつな／がる」のように割れる

