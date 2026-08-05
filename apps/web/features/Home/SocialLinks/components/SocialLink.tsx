'use client'

import type { siteConfig } from '~/config/siteConfig'

interface SocialLinksProps {
  config: typeof siteConfig
}

export function SocialLinks({ config }: SocialLinksProps) {
  return (
    <ul className="flex shrink-0 items-center gap-4">
      {config.map((item) => (
        <li key={item.value}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.value}
            className="text-ink-muted hover:text-navy flex size-9 items-center justify-center transition-colors duration-[180ms]"
          >
            {item.icon}
          </a>
        </li>
      ))}
    </ul>
  )
}
