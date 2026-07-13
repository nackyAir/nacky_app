import type { ResumeFileId } from '~/lib/resume/token.types'

export type FileSelectorProps = {
  idPrefix: string
  legend: string
  value: ResumeFileId[]
  onChange: (value: ResumeFileId[]) => void
}
