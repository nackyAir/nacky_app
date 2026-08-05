import { ArrowUpRight } from '@repo/ui/icons/lucide'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  featuredWorks,
  findWorkBySlug,
  freelanceTimeline,
} from '~/features/Works'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return [...featuredWorks, ...freelanceTimeline].map((work) => ({
    slug: work.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const work = findWorkBySlug(slug)

  if (!work) return {}

  const description = 'summary' in work ? work.summary : work.note
  const ogImage = `/api/og?title=${encodeURIComponent(
    work.title
  )}&description=${encodeURIComponent(description)}&label=WORKS`

  return {
    title: work.title,
    description,
    alternates: { canonical: `/works/${work.slug}` },
    openGraph: {
      title: work.title,
      description,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: work.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: work.title,
      description,
      images: [ogImage],
    },
  }
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-t border-rule py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
      <dt className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint sm:pt-0.5">
        {label}
      </dt>
      <dd className="text-[0.95rem] text-ink-muted">{value}</dd>
    </div>
  )
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params
  const work = findWorkBySlug(slug)

  if (!work) notFound()

  const isFeatured = 'summary' in work
  const description = isFeatured ? work.summary : work.note
  const allWorks = [...featuredWorks, ...freelanceTimeline]

  return (
    <div className="grain relative min-h-screen bg-paper text-ink">
      <article className="relative z-[1] mx-auto w-full max-w-4xl px-6 pt-28 pb-24 md:px-10 md:pt-36">
        <Link
          href="/home#works"
          className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors duration-300 hover:text-ink"
        >
          ← Works
        </Link>

        <header className="mt-10">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-ink-faint">
            {isFeatured ? work.engagement : '業務委託'} / {work.period}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,7vw,4rem)] leading-[1.2] tracking-tight text-balance-jp">
            {work.title}
          </h1>
          <p className="mt-7 max-w-[42rem] text-[1rem] leading-[2] text-ink-muted">
            {description}
          </p>

          {isFeatured && work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex min-h-11 items-center text-sm"
            >
              <span className="inline-flex items-center gap-1.5 border-b border-ink/30 pb-0.5 transition-colors duration-300 group-hover:border-ink">
                サービスを見る
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          )}
        </header>

        <dl className="mt-14">
          <MetaRow
            label="期間"
            value={
              isFeatured ? `${work.period}（${work.duration}）` : work.period
            }
          />
          <MetaRow label="役割" value={work.role} />
          {isFeatured && (
            <>
              <MetaRow label="参画形態" value={work.engagement} />
              <MetaRow label="体制" value={work.team} />
            </>
          )}
          <MetaRow label="技術" value={work.stack.join(' · ')} />
        </dl>

        {isFeatured && (
          <>
            <section className="mt-20">
              <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-ink-muted">
                課題
              </h2>
              <p className="mt-6 max-w-[42rem] text-[1rem] leading-[2] text-ink-muted">
                {work.challenge}
              </p>
            </section>

            <section className="mt-16">
              <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-ink-muted">
                取り組み
              </h2>
              <ol className="mt-6">
                {work.actions.map((action, i) => (
                  <li
                    key={action}
                    className="grid gap-2 border-t border-rule py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="font-mono text-xs text-ink-faint sm:pt-1.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="max-w-[40rem] text-[0.95rem] leading-[2] text-ink-muted">
                      {action}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-16">
              <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-ink-muted">
                成果
              </h2>
              <p className="mt-6 max-w-[42rem] font-display text-lg leading-[1.9] text-balance-jp md:text-xl">
                {work.outcome}
              </p>
            </section>
          </>
        )}

        <footer className="mt-24 border-t border-rule pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-ink-faint">
            他の実績
          </p>
          <ul className="mt-6 space-y-px">
            {allWorks
              .filter((other) => other.slug !== work.slug)
              .map((other) => (
                <li key={other.slug} className="border-t border-rule">
                  <Link
                    href={`/works/${other.slug}`}
                    className="group flex min-h-16 items-center justify-between gap-4 py-5"
                  >
                    <span className="font-display text-xl tracking-tight">
                      {other.title}
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-ink-faint transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
          </ul>

          <Link
            href="/works"
            className="mt-12 inline-flex min-h-12 items-center rounded-sm bg-accent-navy px-7 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
          >
            Flight Log に戻る
          </Link>
        </footer>
      </article>
    </div>
  )
}
