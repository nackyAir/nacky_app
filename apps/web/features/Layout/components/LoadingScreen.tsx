import { Loader2 } from '@repo/ui/icons/lucide'

export function LoadingScreen() {
  return (
    <div className="bg-background/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-400 border-t-transparent">
        <Loader2 className="h-5 w-5" />
      </div>
    </div>
  )
}
