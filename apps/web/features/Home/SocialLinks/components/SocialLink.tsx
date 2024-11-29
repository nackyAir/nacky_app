import { Button } from '@repo/ui/components/button'

import { siteConfig } from '~/config/siteConfig'

interface SocialLinksProps {
  config: typeof siteConfig
}

export const SocialLinks = ({ config }: SocialLinksProps) => (
  <div className="flex justify-center space-x-4">
    {config.map((item) => (
      <Button key={item.value} variant="outline" size="icon" asChild>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.icon}
        </a>
      </Button>
    ))}
  </div>
)