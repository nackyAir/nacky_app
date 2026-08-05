export function LoadingScreen() {
  return (
    <div className="bg-canvas/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="border-hairline border-t-navy size-10 animate-spin rounded-full border-2" />
    </div>
  )
}
