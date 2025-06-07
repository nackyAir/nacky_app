import { Loader2 } from '@repo/ui/icons/lucide'
import { cn } from '@repo/ui/utils'

interface LoadingScreenProps {
  message?: string
  variant?: 'default' | 'minimal'
  className?: string
}

export function LoadingScreen({
  message = "読み込み中...",
  variant = 'default',
  className
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm",
        "bg-background/90",
        className
      )}
      role="status"
      aria-label={message}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        {variant === 'default' && (
          <span className="text-sm text-muted-foreground">{message}</span>
        )}
      </div>
    </div>
  )
}
