'use client'

import { Suspense, useState } from 'react'

import { RichEditor } from '@repo/ui/components/RichTextEditor'
import { Button } from '@repo/ui/components/button'
import { Input } from '@repo/ui/components/input'

import { LoadingScreen } from '~/features/Layout'

export default function CreateBlogPage() {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the blog post data to your backend
    console.log('Submitting blog post:', { title })
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="container mx-auto my-14">
        <h1 className="mb-6 text-3xl font-bold">Create New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="mt-1"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Content
            </label>
            <div className="mt-1">
              <RichEditor />
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit">Publish Blog Post</Button>
          </div>
        </form>
      </div>
    </Suspense>
  )
}
