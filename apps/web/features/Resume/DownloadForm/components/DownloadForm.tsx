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
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

import { requestDownloadUrl } from '~/actions/resume/requestDownloadUrl'
import type { ResumeFileId } from '~/lib/resume/token.types'

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

export function DownloadForm() {
  const [password, setPassword] = useState('')
  const [pendingFileId, setPendingFileId] = useState<ResumeFileId | null>(null)
  const { executeAsync } = useAction(requestDownloadUrl)

  async function handleDownload(id: ResumeFileId) {
    if (!password) {
      toast.error('パスワードを入力してください')
      return
    }

    setPendingFileId(id)

    try {
      const result = await executeAsync({ password, id })
      const actionError = getActionError(result?.data)

      if (actionError) {
        toast.error(actionError)
        return
      }

      const url = result?.data?.data?.url

      if (!url) {
        toast.error('ダウンロードURLを発行できませんでした')
        return
      }

      window.location.assign(url)
    } catch {
      toast.error('ダウンロードURLを発行できませんでした')
    } finally {
      setPendingFileId(null)
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>経歴書ダウンロード</CardTitle>
        <CardDescription>
          共有されたパスワードを入力し、必要な書類を選んでください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label htmlFor="resume-password">パスワード</Label>
          <Input
            id="resume-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-3">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
          <p className="font-medium">履歴書</p>
          <Button
            type="button"
            className="min-w-20"
            disabled={pendingFileId !== null}
            onClick={() => handleDownload('rirekisho-pdf')}
          >
            {pendingFileId === 'rirekisho-pdf' ? '準備中…' : 'PDF'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="min-w-20"
            disabled={pendingFileId !== null}
            onClick={() => handleDownload('rirekisho-xlsx')}
          >
            {pendingFileId === 'rirekisho-xlsx' ? '準備中…' : 'Excel'}
          </Button>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
          <p className="font-medium">職務経歴書</p>
          <Button
            type="button"
            className="min-w-20"
            disabled={pendingFileId !== null}
            onClick={() => handleDownload('shokumu-keirekisho-pdf')}
          >
            {pendingFileId === 'shokumu-keirekisho-pdf' ? '準備中…' : 'PDF'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="min-w-20"
            disabled={pendingFileId !== null}
            onClick={() => handleDownload('shokumu-keirekisho-xlsx')}
          >
            {pendingFileId === 'shokumu-keirekisho-xlsx' ? '準備中…' : 'Excel'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
