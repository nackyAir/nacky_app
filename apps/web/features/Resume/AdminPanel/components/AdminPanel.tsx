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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

import { issueDownloadUrl } from '~/actions/resume/issueDownloadUrl'
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

export function AdminPanel() {
  const [fileId, setFileId] = useState<ResumeFileId>('rirekisho-pdf')
  const [expiresInDays, setExpiresInDays] = useState<'1' | '7' | '30'>('1')
  const [issuedUrl, setIssuedUrl] = useState('')
  const [issuedExpiresAt, setIssuedExpiresAt] = useState('')
  const [isPending, setIsPending] = useState(false)
  const { executeAsync } = useAction(issueDownloadUrl)

  async function handleIssue(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)

    try {
      const result = await executeAsync({ id: fileId, expiresInDays })
      const actionError = getActionError(result?.data)

      if (actionError) {
        toast.error(actionError)
        return
      }

      const issued = result?.data?.data

      if (!issued) {
        toast.error('URLを発行できませんでした')
        return
      }

      setIssuedUrl(issued.url)
      setIssuedExpiresAt(issued.expiresAt)
      toast.success('ダウンロードURLを発行しました')
    } catch {
      toast.error('URLを発行できませんでした')
    } finally {
      setIsPending(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(issuedUrl)
      toast.success('URLをコピーしました')
    } catch {
      toast.error('URLをコピーできませんでした')
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>ダウンロードURL発行</CardTitle>
        <CardDescription>
          書類と有効期限を選んで、共有用の署名URLを発行します。
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleIssue}>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="resume-document">書類</Label>
            <Select
              value={fileId}
              onValueChange={(value) => {
                if (
                  value === 'rirekisho-pdf' ||
                  value === 'rirekisho-xlsx' ||
                  value === 'shokumu-keirekisho-pdf' ||
                  value === 'shokumu-keirekisho-xlsx'
                ) {
                  setFileId(value)
                }
              }}
            >
              <SelectTrigger id="resume-document" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="rirekisho-pdf">履歴書 PDF</SelectItem>
                  <SelectItem value="rirekisho-xlsx">履歴書 Excel</SelectItem>
                  <SelectItem value="shokumu-keirekisho-pdf">
                    職務経歴書 PDF
                  </SelectItem>
                  <SelectItem value="shokumu-keirekisho-xlsx">
                    職務経歴書 Excel
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="resume-expiration">有効期限</Label>
            <Select
              value={expiresInDays}
              onValueChange={(value) => {
                if (value === '1' || value === '7' || value === '30') {
                  setExpiresInDays(value)
                }
              }}
            >
              <SelectTrigger id="resume-expiration" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">24時間</SelectItem>
                  <SelectItem value="7">7日</SelectItem>
                  <SelectItem value="30">30日</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {issuedUrl && (
            <div className="flex flex-col gap-3 rounded-lg border p-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="issued-url">発行済みURL</Label>
                <Input id="issued-url" value={issuedUrl} readOnly />
              </div>
              <Button type="button" variant="outline" onClick={handleCopy}>
                URLをコピー
              </Button>
              <p className="text-sm text-muted-foreground">
                有効期限: {new Date(issuedExpiresAt).toLocaleString('ja-JP')}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-6">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '発行中…' : 'URLを発行'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
