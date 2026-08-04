import { Reveal } from '~/features/Home/primitives'

const PRINCIPLES = [
  {
    index: 'i',
    title: '思ったことは、提案として出す',
    body: '指示を待って作るだけにはしないようにしています。この画面はここが使いにくい、この導線は迷う、と気づいたら自分から提案して動かします。会計事務所向けの SaaS では13ヶ月のあいだ、入力フォームのステップ削減や一覧への検索追加を自分で提案して実装し続けました。',
  },
  {
    index: 'ii',
    title: 'ユーザーが自力で戻れる状態まで作る',
    body: '正常系が動くところまでで終わらせないようにしています。Resme では外部サービスとの連携が切れた時に、それを検知してユーザーを再連携まで導く動線を、Web・Chrome 拡張・通知メールの3経路に用意しました。困った時に問い合わせしないと復旧できない状態は、作り切れていないと考えています。',
  },
  {
    index: 'iii',
    title: '規約をルール化して、ばらつきを潰す',
    body: '技術スタック・TDD・型安全といった決めごとは、頭の中に置かず、必ず通るところに置きます。ルールファイルに書いて実装時に強制することで、自分の集中力に左右されずに品質を一定にできます。',
  },
]

export function Principles() {
  return (
    <ol className="space-y-px">
      {PRINCIPLES.map((principle, i) => (
        <Reveal key={principle.index} delay={i * 0.06}>
          <li className="grid gap-3 border-t border-rule py-8 first:border-t-0 first:pt-0 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6">
            <span className="font-mono text-sm text-ink-faint md:pt-1">
              {principle.index}
            </span>
            <div>
              <h3 className="font-display text-xl leading-relaxed tracking-tight md:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-4 max-w-[40rem] text-[0.95rem] leading-[2] text-ink-muted">
                {principle.body}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  )
}
