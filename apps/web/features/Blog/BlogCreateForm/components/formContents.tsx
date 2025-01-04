'use client'

import { RichTextEditor } from '@repo/ui/components/RichTextEditor'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { useForm } from 'react-hook-form'

export const FormContents = () => {
  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="mx-auto py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="max-w-2xl">
                <FormLabel className="mb-2 font-semibold">
                  ブログのタイトル
                </FormLabel>
                <FormControl>
                  <Input {...field} className="text-lg" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md mb-2 font-semibold">
                  ブログの内容
                </FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
