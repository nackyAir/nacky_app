const japaneseDateFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Tokyo',
})

export function formatDate(date: Date | null | undefined): string | null {
  if (!date) return null
  return japaneseDateFormatter.format(date)
}
