export function createFlightNumber(index: number): string {
  return `FL-${String(index + 1).padStart(3, '0')}`
}

export function getFlightYear(period: string): string {
  return period.slice(0, 4)
}
