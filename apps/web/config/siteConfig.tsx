import { CustomIcons } from '@repo/ui/icons/custom'

type SiteConfig = { value: string; icon: React.ReactElement; url: string }[]

export const siteConfig: SiteConfig = [
  {
    value: 'X',
    icon: <CustomIcons.X className="size-12" />,
    url: 'https://x.com/naoki__0509',
  },
  {
    value: 'Instagram',
    icon: <CustomIcons.Instagram className="size-12" />,
    url: 'https://www.instagram.com/nacky_coffee',
  },
  {
    value: 'Github',
    icon: <CustomIcons.Github className="size-6" />,
    url: 'https://github.com/nackyAir',
  },
]
