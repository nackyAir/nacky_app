export type ResumeDoc = 'rirekisho' | 'shokumu-keirekisho'
export type ResumeFormat = 'pdf' | 'xlsx'

export type ResumeFile = {
  doc: ResumeDoc
  format: ResumeFormat
}

export type ResumeFileId = `${ResumeDoc}-${ResumeFormat}`

export type ResumeToken = {
  id: ResumeFileId
  exp: number
  sig: string
}

export type VerifyResult =
  | { ok: true; id: ResumeFileId }
  | { ok: false; reason: 'expired' | 'invalid' }
