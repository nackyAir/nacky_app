import { Reveal } from '~/features/Home/primitives'
import { CountUp } from './CountUp'

const METRICS = [
  { value: 149, unit: '本', label: '自作スキル' },
  { value: 10, unit: '種', label: '専門エージェント' },
  { value: 4, unit: '系統', label: 'MCP 連携' },
]

const FLOW = [
  {
    step: '01',
    title: '規約をルールファイルに固定する',
    body: '技術スタック・TDD・型安全といった決めごとをルールファイルに書き、全セッションで強制します。人が覚えておく必要をなくします。',
  },
  {
    step: '02',
    title: '着手前に AsIs / ToBe / 制約 / テストケースを出させる',
    body: '実装前に必ずこの4点を提示させ、承認してから着手するフローを固定しています。方向がずれたまま大きなコードが生えることを防げます。',
  },
  {
    step: '03',
    title: '実装を委譲し、自分は設計とレビューに回る',
    body: 'Claude Code をメインに、実装は Codex CLI / Cursor CLI へ渡します。自分は要件整理・設計・レビューに集中します。',
  },
  {
    step: '04',
    title: '判断とバグの原因を蓄積する',
    body: '設計判断とバグの原因を Markdown のリポジトリに残し、セッションを跨いで文脈を引き継がせています。日報作成や定型調査もコマンド化しました。',
  },
]

export function AiWorkflow() {
  return (
    <div className="space-y-14">
      <Reveal>
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-3">
          {METRICS.map((metric) => (
            <div key={metric.label} className="bg-paper-raised px-6 py-8">
              <dd className="font-display text-5xl leading-none tracking-tight md:text-6xl">
                <CountUp to={metric.value} />
                <span className="ml-1 text-xl text-ink-muted">
                  {metric.unit}
                </span>
              </dd>
              <dt className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>

      <ol className="space-y-px">
        {FLOW.map((item, i) => (
          <Reveal key={item.step} delay={i * 0.05}>
            <li className="grid gap-3 border-t border-rule py-7 first:border-t-0 first:pt-0 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-6">
              <span className="font-mono text-xs text-ink-faint md:pt-1.5">
                {item.step}
              </span>
              <div>
                <h3 className="text-[1.05rem] font-medium leading-relaxed">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[40rem] text-[0.95rem] leading-[2] text-ink-muted">
                  {item.body}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <div className="rounded-lg border border-rule bg-paper-raised p-7 md:p-9">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-ink-faint">
            結果として
          </p>
          <p className="mt-5 max-w-[42rem] font-display text-lg leading-[1.9] text-balance-jp md:text-xl">
            実装を委譲することで要件整理・設計・レビューに集中でき、構想を動く
            MVP まで持っていくサイクルが回るようになりました。
          </p>
          <p className="mt-5 max-w-[42rem] text-[0.95rem] leading-[2] text-ink-muted">
            規約をルール化したことで、AI
            が生成したコードでも品質のばらつきが減りました。
            指示の精度を上げる過程で、AsIs / ToBe /
            制約を先に明示する習慣がついたのも、人と仕事をする時にそのまま効いています。
          </p>
        </div>
      </Reveal>
    </div>
  )
}
