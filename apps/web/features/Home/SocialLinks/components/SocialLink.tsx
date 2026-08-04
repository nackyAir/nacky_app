'use client'

import type { siteConfig } from '~/config/siteConfig'

interface SocialLinksProps {
  config: typeof siteConfig
}

export function SocialLinks({ config }: SocialLinksProps) {
  return (
    <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {config.map((item) => (
        <li key={item.value}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.value}
            className="inline-flex min-h-11 items-center rounded-full px-3 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted transition-colors duration-300 hover:bg-paper-raised hover:text-ink"
          >
            {item.value}
          </a>
        </li>
      ))}
    </ul>
  )
}
