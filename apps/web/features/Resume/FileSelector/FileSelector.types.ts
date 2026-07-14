import type { ResumeFileId } from '~/lib/resume/token.types'

export type ResumeFileOption = {
  id: ResumeFileId
  label: string
}

export type FileSelectorProps = {
  idPrefix: string
  legend: string
  options: ResumeFileOption[]
  value: ResumeFileId[]
  onChange: (value: ResumeFileId[]) => void
}
