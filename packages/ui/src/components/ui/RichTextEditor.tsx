'use client'

import { useEffect, useState } from 'react'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { common, createLowlight } from 'lowlight'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
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
import { Slider } from '../../components/ui/slider'
import { Toggle } from '../../components/ui/toggle'

type RichTextEditorProps = {
  content: string
  onChange: (content: string) => void
}

const lowlight = createLowlight(common)

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [imageWidth, setImageWidth] = useState(300)
  const [mounted, setMounted] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color,
      TextStyle,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-hidden',
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !editor) {
    return null
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      const imageElement = document.querySelector(
        'img[src="' + imageUrl + '"]'
      ) as HTMLImageElement
      if (imageElement) {
        imageElement.style.width = `${imageWidth}px`
      }
      setImageUrl('')
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        <EditorToggle editor={editor} type="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </EditorToggle>
        <EditorToggle editor={editor} type="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </EditorToggle>

        <EditorHeadingToggle editor={editor} level={1} aria-label="Toggle h1">
          <Heading1 className="h-4 w-4" />
        </EditorHeadingToggle>
        <EditorHeadingToggle editor={editor} level={2} aria-label="Toggle h2">
          <Heading2 className="h-4 w-4" />
        </EditorHeadingToggle>
        <EditorHeadingToggle editor={editor} level={3} aria-label="Toggle h3">
          <Heading3 className="h-4 w-4" />
        </EditorHeadingToggle>

        <div className="mx-2 flex flex-row gap-2">
          <EditorAlignToggle
            editor={editor}
            alignment="left"
            aria-label="Align left"
          >
            <AlignLeft className="h-4 w-4" />
          </EditorAlignToggle>
          <EditorAlignToggle
            editor={editor}
            alignment="center"
            aria-label="Align center"
          >
            <AlignCenter className="h-4 w-4" />
          </EditorAlignToggle>
          <EditorAlignToggle
            editor={editor}
            alignment="right"
            aria-label="Align right"
          >
            <AlignRight className="h-4 w-4" />
          </EditorAlignToggle>
        </div>
        <EditorToggle
          editor={editor}
          type="codeBlock"
          aria-label="Toggle code block"
        >
          <Code className="h-4 w-4" />
        </EditorToggle>
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
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Image width</span>
                  <span>{imageWidth}px</span>
                </div>
                <Slider
                  value={[imageWidth]}
                  onValueChange={(value) => setImageWidth(value[0])}
                  max={1000}
                  step={10}
                />
              </div>
              <Button onClick={addImage}>Insert Image</Button>
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
          value={(editor.getAttributes('textStyle').color as string) || ''}
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

interface EditorToggleProps {
  editor: Editor
  type: 'bold' | 'italic' | 'codeBlock'
  children: React.ReactNode
  'aria-label': string
}

function EditorToggle({ editor, type, children, ...props }: EditorToggleProps) {
  const toggleFunction = () => {
    switch (type) {
      case 'bold':
        return editor.chain().focus().toggleBold().run()
      case 'italic':
        return editor.chain().focus().toggleItalic().run()
      case 'codeBlock':
        return editor.chain().focus().toggleCodeBlock().run()
    }
  }

  return (
    <Toggle
      className="border hover:border-gray-400"
      pressed={editor.isActive(type)}
      onPressedChange={toggleFunction}
      {...props}
    >
      {children}
    </Toggle>
  )
}

interface EditorHeadingToggleProps {
  editor: Editor
  level: 1 | 2 | 3
  children: React.ReactNode
  'aria-label': string
}

function EditorHeadingToggle({
  editor,
  level,
  children,
  ...props
}: EditorHeadingToggleProps) {
  return (
    <Toggle
      className="border hover:border-gray-400"
      pressed={editor.isActive('heading', { level })}
      onPressedChange={() =>
        editor.chain().focus().toggleHeading({ level }).run()
      }
      {...props}
    >
      {children}
    </Toggle>
  )
}

interface EditorAlignToggleProps {
  editor: Editor
  alignment: 'left' | 'center' | 'right'
  children: React.ReactNode
  'aria-label': string
}

function EditorAlignToggle({
  editor,
  alignment,
  children,
  ...props
}: EditorAlignToggleProps) {
  return (
    <Toggle
      className="border hover:border-gray-400"
      pressed={editor.isActive({ textAlign: alignment })}
      onPressedChange={() =>
        editor.chain().focus().setTextAlign(alignment).run()
      }
      {...props}
    >
      {children}
    </Toggle>
  )
}
