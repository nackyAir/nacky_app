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
import {
  FileSelector,
  PUBLIC_FILE_OPTIONS,
} from '~/features/Resume/FileSelector'
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
  const [selectedFileIds, setSelectedFileIds] = useState<ResumeFileId[]>([])
  const [isPending, setIsPending] = useState(false)
  const { executeAsync } = useAction(requestDownloadUrl)

  async function handleDownload() {
    if (!password) {
      toast.error('パスワードを入力してください')
      return
    }

    setIsPending(true)

    try {
      const result = await executeAsync({ password, ids: selectedFileIds })
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
      setIsPending(false)
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
      <CardContent className="flex flex-col gap-6">
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
        <FileSelector
          idPrefix="resume-download"
          legend="ダウンロードするファイル"
          options={PUBLIC_FILE_OPTIONS}
          value={selectedFileIds}
          onChange={setSelectedFileIds}
        />
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          className="w-full"
          disabled={selectedFileIds.length === 0 || isPending}
          onClick={handleDownload}
        >
          {isPending ? '準備中…' : '選択したファイルをダウンロード'}
        </Button>
      </CardFooter>
    </Card>
  )
}
