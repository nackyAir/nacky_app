'use client'

import { useState } from 'react'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { common, createLowlight } from 'lowlight'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  ImageIcon,
  Italic,
} from 'lucide-react'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover'
import { Toggle } from '../../components/ui/toggle'

type RichTextEditorProps = {
  content: string
  onChange: (value: string) => void
}

const lowlight = createLowlight(common)

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [imageUrl, setImageUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color,
      TextStyle,
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        <Toggle
          className="border hover:border-gray-400"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          className="border hover:border-gray-400"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <div className="mx-2 flex flex-row gap-2">
          <Toggle
            className="border hover:border-gray-400"
            pressed={editor.isActive({ textAlign: 'left' })}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign('left').run()
            }
            aria-label="Align left"
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          <Toggle
            className="border hover:border-gray-400"
            pressed={editor.isActive({ textAlign: 'center' })}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign('center').run()
            }
            aria-label="Align center"
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          <Toggle
            className="border hover:border-gray-400"
            pressed={editor.isActive({ textAlign: 'right' })}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign('right').run()
            }
            aria-label="Align right"
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </div>
        <Toggle
          className="border hover:border-gray-400"
          pressed={editor.isActive('codeBlock')}
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Toggle code block"
        >
          <Code className="h-4 w-4" />
        </Toggle>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[280px] justify-start text-left font-normal"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>Insert image</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col space-y-4">
              <Input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button
                onClick={() => {
                  editor.chain().focus().setImage({ src: imageUrl }).run()
                  setImageUrl('')
                }}
              >
                Insert Image
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <input
          type="color"
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes('textStyle').color || ''}
          className="h-9 w-9 rounded-md p-1"
        />
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[200px] rounded-lg border p-4"
      />
    </div>
  )
}
