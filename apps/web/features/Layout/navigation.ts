export type NavItem = {
  label: string
  href: string
}

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'HOME', href: '/home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'WORKS', href: '#works' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CONTACT', href: '#contact' },
]

export const AVAILABILITY_LABEL = '相談受付中'
export const OWNER_NAME = '林田直樹'
export const OWNER_ROLE = 'フリーランス フルスタックエンジニア'
