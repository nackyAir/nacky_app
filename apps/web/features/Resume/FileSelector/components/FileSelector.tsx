'use client'

import { Checkbox } from '@repo/ui/components/checkbox'
import { Label } from '@repo/ui/components/label'

import type {
  FileSelectorProps,
  ResumeFileOption,
} from '~/features/Resume/FileSelector/FileSelector.types'
import type { ResumeFileId } from '~/lib/resume/token.types'

export const PUBLIC_FILE_OPTIONS: ResumeFileOption[] = [
  { id: 'rirekisho-pdf', label: '履歴書 PDF' },
  { id: 'rirekisho-xlsx', label: '履歴書 Excel' },
  { id: 'shokumu-keirekisho-pdf', label: '職務経歴書 PDF' },
  { id: 'shokumu-keirekisho-docx', label: '職務経歴書 Word' },
  { id: 'skill-sheet-pdf', label: 'スキルシート PDF' },
  { id: 'skill-sheet-xlsx', label: 'スキルシート Excel' },
]

export const ADMIN_FILE_OPTIONS: ResumeFileOption[] = [
  ...PUBLIC_FILE_OPTIONS,
  {
    id: 'mynumber-pdf',
    label: '本人確認書類（マイナンバーカード両面 PDF）',
  },
]

export function FileSelector({
  idPrefix,
  legend,
  options,
  value,
  onChange,
}: FileSelectorProps) {
  function handleCheckedChange(id: ResumeFileId, checked: boolean) {
    if (checked) {
      if (!value.includes(id)) {
        onChange([...value, id])
      }
      return
    }

    onChange(value.filter((selectedId) => selectedId !== id))
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-1 text-sm font-medium">{legend}</legend>
      {options.map((option) => {
        const inputId = `${idPrefix}-${option.id}`

        return (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox
              id={inputId}
              checked={value.includes(option.id)}
              onCheckedChange={(checked) =>
                handleCheckedChange(option.id, checked === true)
              }
            />
            <Label htmlFor={inputId} className="font-normal">
              {option.label}
            </Label>
          </div>
        )
      })}
      <p className="text-sm text-muted-foreground">
        2件以上を選択するとZIP形式でダウンロードされます。
      </p>
    </fieldset>
  )
}
