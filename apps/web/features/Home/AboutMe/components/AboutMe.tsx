import Image from 'next/image'

import { Reveal } from '~/features/Home/primitives'

export function AboutMe() {
  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_11rem] md:gap-14">
      <div className="max-w-[42rem] space-y-6 text-[1rem] leading-[2] text-ink-muted">
        <Reveal>
          <p>
            HTML と CSS と JavaScript を触っていたところから始まって、TypeScript
            を覚えて、React、Next.js へと進んできました。Ruby
            も試しましたが、結局 TypeScript
            が一番手に馴染んで、そのままフロントエンドに行き着いています。
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <p>
            どうすればこのプロダクトは伸びるのか、この画面を使う人はここで何に迷うのか。
            そういうことを考えている時間が一番長いです。
            自分が作るものが、誰かの作業を少しでも軽くしているかどうかに一番関心があります。
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p>
            新しい技術を追いかけるのが好きで、その動きが一番速いのがフロントエンドでした。
            バックエンドもインフラも、必要になったから学んで触れるようになった、という順番です。
            主戦場はあくまでフロントエンドですが、TypeScript の範囲なら API
            から Terraform まで自分で通せます。
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="border-t border-rule pt-6 text-[0.95rem]">
            余談ですが、コーヒーが好きで週末はよく淹れています。ドリップレシピを記録するアプリを作ったのも、
            自分が使いたかったからでした。
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="md:pt-2">
        <figure className="w-fit">
          <Image
            src="/avatarImage.jpg"
            alt="林田直樹"
            width={176}
            height={176}
            sizes="176px"
            className="rounded-sm border border-rule grayscale"
          />
          <figcaption className="mt-3 font-mono text-xs text-ink-faint">
            神奈川県 / 20代
          </figcaption>
        </figure>
      </Reveal>
    </div>
  )
}
