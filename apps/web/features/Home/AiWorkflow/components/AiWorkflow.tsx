import { Reveal } from '~/features/Home/primitives'

const QUALITY_FLOW = [
  {
    step: '01',
    title: '要件',
    artifact: 'spec.md',
    detail: '目的・制約・完了条件を固定',
  },
  {
    step: '02',
    title: '計画',
    artifact: 'plan.md',
    detail: '変更範囲と順序を設計',
  },
  {
    step: '03',
    title: 'テスト',
    artifact: 'test-cases.md',
    detail: '失敗条件を先に定義',
  },
  {
    step: '04',
    title: '実装',
    artifact: 'code',
    detail: '最小の変更で通す',
  },
  {
    step: '05',
    title: 'レビュー',
    artifact: 'review.log',
    detail: '設計と差分を照合',
    approval: true,
  },
  {
    step: '06',
    title: '検証',
    artifact: 'verification.md',
    detail: '型・品質・動作を確認',
  },
]

export function AiWorkflow() {
  return (
    <div>
      <Reveal>
        <div className="border-y border-rule">
          <ol className="grid md:grid-cols-6">
            {QUALITY_FLOW.map((item) => (
              <li
                key={item.step}
                className="relative grid min-h-36 grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-rule py-6 first:border-t-0 md:block md:min-h-64 md:border-t-0 md:border-l md:px-4 md:py-5 md:first:border-l-0"
              >
                <span className="font-mono text-[0.625rem] tracking-[0.16em] text-ink-faint">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-tight md:mt-8">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-mono text-[0.625rem] leading-relaxed tracking-[0.06em] text-accent-navy">
                    {item.artifact}
                  </p>
                  <p className="mt-4 text-[0.8125rem] leading-[1.8] text-ink-muted">
                    {item.detail}
                  </p>
                  {item.approval && (
                    <span className="mt-4 inline-flex rounded-sm border border-accent-navy px-2 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-accent-navy">
                      人の承認
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-9 grid gap-3 border-t border-rule pt-7 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink-faint">
            Quality Gate
          </p>
          <p className="max-w-[40rem] text-[0.95rem] leading-[2] text-ink-muted">
            AI
            が工程を進めても、要件・テスト・レビューの記録を残し、重要な判断は人が承認する。速度と品質を同じ工程の中で管理しています。
          </p>
        </div>
      </Reveal>
    </div>
  )
}
