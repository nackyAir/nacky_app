# Design System — nacky.me (林田直樹 ポートフォリオ)

承認モックアップ: `~/.gstack/projects/nackyAir-nacky_app/designs/design-system-20260805/variant-H.png` (2026-08-05 承認)
提案経緯: `docs/UI-IMPROVEMENT-PROPOSAL.md`

## Product Context
- **What this is:** フリーランス・フルスタックエンジニア 林田直樹の個人ポートフォリオ
- **Who it's for:** 発注を検討しているクライアント候補(国内)
- **記憶させること:** 「この人に任せれば安心してモノができる」
- **テーマ:** AI の専門性で、業界を越えて届ける。
- **Project type:** マーケティング寄りの個人サイト (Next.js App Router)

## Aesthetic Direction
- **Direction:** Aviation Route Map — 業界=就航地に見立てた、モダンで精密なサイン計画
- **Decoration level:** intentional(微細な noise、点線の航路、極小の飛行機グリフ。スキュアモーフ禁止)
- **Mood:** 面白さ × ユニークさ × プロフェッショナル。フラットで精密、余白たっぷり
- **禁止事項:** 和モチーフ(落款・水墨・和紙・明朝ディスプレイ)/ split-flap 等のスキュアモーフ表現 / 「納品済」という文言 / 紫グラデ・絵文字アイコンカード・ピルタグ大量列挙
- **Reference:** brittanychiang.com(単色アクセントの信頼感)/ rauno.me(色は質で使う)

## Signature Elements(このサイトの顔)
- **就航路線図:** ハブ「AI × FULL-STACK」から点線の大圏航路が業界ノードへ。ノードは mono の 3 レターコード + 和文ラベル: LAW 法律 / ACC 会計 / EST 住宅 / CAR キャリア / LIV 配信。航路上に極小の飛行機グリフ 1 つ
- **FLIGHT LOG:** works 一覧。mono の便名 FL-001…、年、案件名、業界コードチップ(ネイビー outline)、細矢印。ステータス表現は「運航中 / COMPLETED」系(「納品済」は使わない)
- **稼働状況:** ● 相談受付中(グリーンドット)を Hero とヘッダーに常設

## Typography
- **Display/Hero:** モダングロテスク(候補: General Sans / Satoshi)+ 和文は Noto Sans JP or Zen Kaku Gothic New の太め。tight tracking
- **Body:** Noto Sans JP (weight 400, line-height 1.9)、`font-feature-settings: "palt"`
- **Labels/Codes:** IBM Plex Mono or JetBrains Mono、uppercase、letter-spacing 0.12em(便名・3 レターコード・セクション番号)
- **Loading:** next/font (google / local)
- **Scale:** Hero `clamp(3rem, 7vw, 6rem)` / Section `clamp(2rem, 4vw, 3.5rem)` / Lead 1.25rem / Body 1rem / Label 0.6875rem

## Color
- **Approach:** restrained — ネイビー 1 色 + ステータスグリーンの点のみ
- **Background:** `#FAFAF8`(微細 noise テクスチャ、純白禁止)
- **Surface:** `#FFFFFF`(hairline border、影なし)
- **Foreground:** `#15171A`(純黒禁止)
- **Muted:** `#75777C`
- **Border/hairline:** `#E3E3E0`
- **Accent (aviation navy):** `#1F3A5F` — 路線図・チップ outline・リンク hover・アクティブ nav
- **Status green:** `#2F8A5F` — 稼働状況・ステータスの小ドット限定
- **Semantic:** success `#2F8A5F` / warning `#B58A2F` / error `#B0453A` / info `#1F3A5F`
- **Dark mode:** 後続検討(R3 variant-I のネイビーグラファイト `#0E1420` + アンバー `#D9A441` を候補として保留)

## Spacing
- **Base unit:** 8px
- **Density:** spacious
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Layout
- **Approach:** grid-disciplined + 誌面的な左揃え。センタリング一辺倒禁止
- **Max content width:** 1200-1280px、左右 `clamp(24px, 5vw, 80px)`
- **Border radius:** sm 4px / md 8px。ピル型 CTA は使わない
- **カード:** 影なし・hairline border のフラット面。カード乱立よりテーブル/索引行を優先

## Motion
- **Approach:** intentional — 理解を助ける最小限
- **Easing:** `cubic-bezier(.22, 1, .36, 1)`
- **Duration:** UI 180ms / セクション導入 420ms
- **ルール:** whileInView の初期不可視(白紙化)をやめ、clip-path の静かな開きに。航路の点線は描画アニメ可。`prefers-reduced-motion` で全停止

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-05 | 和モチーフ路線(朱印/台帳/工程図)を不採用 | R1 検証で「日本武道っぽい」。モダン要素の要望 |
| 2026-08-05 | 飛行機・就航路線図テーマ (variant-H) を採用 | R2 で飛行機案が最高評価 → R3 で A 路線図ライト軸を承認 |
| 2026-08-05 | 「納品済」表現を禁止 | 本人フィードバック。運航中/COMPLETED 系で表現 |
| 2026-08-05 | アクセントは航空ネイビー #1F3A5F | 「落ち着いたシンプルが好み」(明るい色は普段使わない) |
