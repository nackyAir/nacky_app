export type ResumeDoc = 'rirekisho' | 'shokumu-keirekisho'
export type ResumeFormat = 'pdf' | 'xlsx'

export type ResumeFile = {
  doc: ResumeDoc
  format: ResumeFormat
}

export type ResumeFileId = `${ResumeDoc}-${ResumeFormat}` | 'mynumber-pdf'

export type ResumeToken = {
  ids: ResumeFileId[]
  exp: number
  sig: string
}

export type VerifyResult =
  | { ok: true; ids: ResumeFileId[] }
  | { ok: false; reason: 'expired' | 'invalid' }
