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
| `script.js` | LINEボタンの画像フォールバック＋固定ボトムバーの表示制御 |
| `assets/baseball-hero.jpg` | ヒーロー画像（CSSの `url()` も書き換え済み） |

## 複製時の処理

- Cloudflareが挿入していた計測スクリプトを削除（元サイトが持つJSはこれ1本だけ。自前のJSは無し）
- 画像を `assets/` へ移動
- 未設定: OGP画像

## 問い合わせ導線（LINE）

最終CTAはLINE公式アカウント `https://lin.ee/vV1leDB`（新時代の集客LPと同じ窓口）。2か所に置いています。

1. 最終セクション `.closing` の `.line-card`（白カード＋LINEグリーンの上罫）
2. 固定ボトムバー `#cta-bar` — ヒーローを過ぎたらせり上がる。上罫はゴールド（#efc76b）でフッターと見分けがつくようにしてある

注意点:

- `hidden` 属性は `display` 指定に負けるため、CSS冒頭に `[hidden]{display:none!important}` を入れてある（これが無いとLINE公式ボタンと予備ボタンが二重に出る）
- 予備ボタン `.btn-line` はLINE公式の画像が読めない環境のみ `script.js` が表示に切り替える
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

