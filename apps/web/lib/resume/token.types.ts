export type ResumeFileId =
  | 'rirekisho-pdf'
  | 'rirekisho-xlsx'
  | 'shokumu-keirekisho-pdf'
  | 'shokumu-keirekisho-docx'
  | 'skill-sheet-pdf'
  | 'skill-sheet-xlsx'
  | 'mynumber-pdf'

export type ResumeToken = {
  ids: ResumeFileId[]
  exp: number
  sig: string
}

export type VerifyResult =
  | { ok: true; ids: ResumeFileId[] }
  | { ok: false; reason: 'expired' | 'invalid' }
