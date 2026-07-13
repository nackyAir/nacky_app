import { get } from '@vercel/blob'
import { zipSync } from 'fflate'

import { getRequiredResumeEnv } from '~/lib/resume/env'
import { buildBundleFilename, buildResumeFilename } from '~/lib/resume/filename'
import { isResumeFileId, verifyResumeToken } from '~/lib/resume/token'
import type { ResumeFileId } from '~/lib/resume/token.types'

export const runtime = 'nodejs'

const RESUME_FILES = {
  'rirekisho-pdf': {
    pathname: 'resume/rirekisho.pdf',
    contentType: 'application/pdf',
  },
  'rirekisho-xlsx': {
    pathname: 'resume/rirekisho.xlsx',
    contentType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  'shokumu-keirekisho-pdf': {
    pathname: 'resume/shokumu-keirekisho.pdf',
    contentType: 'application/pdf',
  },
  'shokumu-keirekisho-xlsx': {
    pathname: 'resume/shokumu-keirekisho.xlsx',
    contentType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
} satisfies Record<ResumeFileId, { pathname: string; contentType: string }>

function jsonError(message: string, status: number) {
  return Response.json({ message }, { status })
}

async function createZipResponse(ids: ResumeFileId[], downloadedAt: Date) {
  const zipFiles = await Promise.all(
    ids.map(async (id) => {
      const resumeFile = RESUME_FILES[id]
      const blobResult = await get(resumeFile.pathname, {
        access: 'private',
      })

      if (blobResult?.statusCode !== 200 || !blobResult?.stream) {
        return null
      }

      const arrayBuffer = await new Response(blobResult.stream).arrayBuffer()

      return {
        filename: buildResumeFilename(id, downloadedAt),
        data: new Uint8Array(arrayBuffer),
      }
    })
  )
  const entries: Record<string, Uint8Array> = {}

  for (const zipFile of zipFiles) {
    if (!zipFile) {
      return jsonError('ファイルの取得に失敗しました', 502)
    }

    entries[zipFile.filename] = zipFile.data
  }

  const zip = zipSync(entries, { level: 0 })
  const filename = buildBundleFilename(downloadedAt)

  return new Response(zip, {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
      'Content-Type': 'application/zip',
      'X-Robots-Tag': 'noindex',
    },
  })
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const idsParameter = searchParams.get('ids')
  const ids = idsParameter?.split(',') ?? []
  const exp = searchParams.get('exp') ?? ''
  const sig = searchParams.get('sig') ?? ''

  if (
    ids.length === 0 ||
    ids.some((resumeFileId) => !isResumeFileId(resumeFileId))
  ) {
    return jsonError('書類の指定が不正です', 400)
  }

  try {
    const secret = getRequiredResumeEnv('RESUME_SIGNING_SECRET')
    const tokenResult = verifyResumeToken({ ids, exp, sig }, secret, new Date())

    if (!tokenResult.ok) {
      return tokenResult.reason === 'expired'
        ? jsonError('ダウンロードURLの有効期限が切れています', 403)
        : jsonError('ダウンロードURLが無効です', 403)
    }

    const downloadedAt = new Date()

    if (tokenResult.ids.length >= 2) {
      return await createZipResponse(tokenResult.ids, downloadedAt)
    }

    const id = tokenResult.ids[0]
    const resumeFile = RESUME_FILES[id]
    const blobResult = await get(resumeFile.pathname, {
      access: 'private',
    })

    if (blobResult?.statusCode !== 200 || !blobResult?.stream) {
      return jsonError('ファイルの取得に失敗しました', 502)
    }

    const filename = buildResumeFilename(id, downloadedAt)

    return new Response(blobResult.stream, {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
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
