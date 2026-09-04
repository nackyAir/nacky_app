This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Resume download environment variables

Create the Vercel Blob store with private access. Configure the following server-only environment variables in each deployment environment. Do not add them to `next.config.mjs` or commit the resume files to this repository.

- `RESUME_PASSWORD`: Password for the `/resume` download form
- `RESUME_ADMIN_PASSWORD`: Password for `/admin/resume`
- `RESUME_SIGNING_SECRET`: Secret used to sign download URLs and admin sessions

### Uploading the resume files

Vercel ダッシュボード → Storage → Blob で private access のストアを作成し、次の pathname へファイルをアップロードする。

ダウンロード画面では対象ファイルを選択でき、1件なら単体、2件以上なら選択分だけをZIPで配信する。単体のファイル名は氏名と書類名、ZIPは氏名・書類名・JSTのダウンロード日を付ける。

- `resume/rirekisho.pdf`
- `resume/rirekisho.xlsx`
- `resume/shokumu-keirekisho.pdf`
- `resume/shokumu-keirekisho.docx`
- `resume/skill-sheet.pdf`
- `resume/skill-sheet.xlsx`
- `resume/mynumber.pdf`（マイナンバーカード両面を1枚にまとめたPDF）

`resume/mynumber.pdf` のダウンロードURLは `/admin/resume` からのみ発行でき、公開の `/resume` フォームからは発行できない。

`RESUME_SIGNING_SECRET` は `openssl rand -base64 32` などで十分に長いランダム値を生成する。

Blob への認証は `@vercel/blob` SDK が環境変数から自動解決する。private ストアをプロジェクトへ接続すると、Vercel 上では認証情報が自動注入される。ローカル開発では `VERCEL_OIDC_TOKEN` と `BLOB_STORE_ID` をルートの `.env.local` に設定する（`pnpm dev` が `dotenv -e .env.local` で読み込む）。OIDC トークンは短命なので、期限切れになったら再取得すること。
