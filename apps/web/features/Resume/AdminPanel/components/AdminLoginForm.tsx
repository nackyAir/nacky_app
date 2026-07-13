'use client'

import { Button } from '@repo/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

import { adminLogin } from '~/actions/resume/adminLogin'

function getActionError(value: unknown) {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('error' in value) ||
    typeof value.error !== 'string'
  ) {
    return null
  }

  return value.error
}

export function AdminLoginForm() {
  const [password, setPassword] = useState('')
  const [isPending, setIsPending] = useState(false)
  const { executeAsync } = useAction(adminLogin)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)

    try {
      const result = await executeAsync({ password })
      const actionError = getActionError(result?.data)

      if (actionError) {
        toast.error(actionError)
        return
      }

      if (!result?.data?.data?.success) {
        toast.error('ログインできませんでした')
        return
      }

      router.refresh()
    } catch {
      toast.error('ログインできませんでした')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>管理者ログイン</CardTitle>
        <CardDescription>
          署名付きダウンロードURLを発行するにはログインしてください。
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="admin-password">管理者パスワード</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="pt-6">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'ログイン中…' : 'ログイン'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
