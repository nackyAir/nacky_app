import { get } from '@vercel/blob'

import { getRequiredResumeEnv } from '~/lib/resume/env'
import { isResumeFileId, verifyResumeToken } from '~/lib/resume/token'
import type { ResumeFileId } from '~/lib/resume/token.types'

export const runtime = 'nodejs'

const RESUME_FILES = {
  'rirekisho-pdf': {
    pathname: 'resume/rirekisho.pdf',
    filename: '履歴書.pdf',
    contentType: 'application/pdf',
  },
  'rirekisho-xlsx': {
    pathname: 'resume/rirekisho.xlsx',
    filename: '履歴書.xlsx',
    contentType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  'shokumu-keirekisho-pdf': {
    pathname: 'resume/shokumu-keirekisho.pdf',
    filename: '職務経歴書.pdf',
    contentType: 'application/pdf',
  },
  'shokumu-keirekisho-xlsx': {
    pathname: 'resume/shokumu-keirekisho.xlsx',
    filename: '職務経歴書.xlsx',
    contentType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
} satisfies Record<
  ResumeFileId,
  { pathname: string; filename: string; contentType: string }
>

function jsonError(message: string, status: number) {
  return Response.json({ message }, { status })
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const id = searchParams.get('id')
  const exp = searchParams.get('exp') ?? ''
  const sig = searchParams.get('sig') ?? ''

  if (!id || !isResumeFileId(id)) {
    return jsonError('書類の指定が不正です', 400)
  }

  try {
    const secret = getRequiredResumeEnv('RESUME_SIGNING_SECRET')
    const tokenResult = verifyResumeToken({ id, exp, sig }, secret, new Date())

    if (!tokenResult.ok) {
      return tokenResult.reason === 'expired'
        ? jsonError('ダウンロードURLの有効期限が切れています', 403)
        : jsonError('ダウンロードURLが無効です', 403)
    }

    const resumeFile = RESUME_FILES[tokenResult.id]
    const blobResult = await get(resumeFile.pathname, {
      access: 'private',
    })

    if (blobResult?.statusCode !== 200 || !blobResult?.stream) {
      return jsonError('ファイルの取得に失敗しました', 502)
    }

    return new Response(blobResult.stream, {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(resumeFile.filename)}`,
        'Content-Type': resumeFile.contentType,
        'X-Robots-Tag': 'noindex',
      },
    })
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.startsWith('Resume configuration error:')
    ) {
      return jsonError(error.message, 500)
    }

    return jsonError('ファイルの取得に失敗しました', 502)
  }
}
