export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper">
      <span className="size-8 animate-spin rounded-full border border-rule border-t-ink" />
    </div>
  )
}
