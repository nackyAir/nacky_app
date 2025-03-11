import { Button } from '@repo/ui/components/button'

import { siteConfig } from '~/config/siteConfig'

interface SocialLinksProps {
  config: typeof siteConfig
}

export function SocialLinks({ config }: SocialLinksProps) {
  return (
    <div className="flex flex-row gap-4 justify-center">
      {config.map((item) => (
        <Button key={item.value} variant="outline" size="icon" asChild>
          <a href={item.url} target="_blank" >
            {item.icon}
          </a>
        </Button>
      ))}
    </div>
  )
}
