import {
  createSafeActionClient,
  flattenValidationErrors,
} from 'next-safe-action'
import { z } from 'zod'

export type FieldErrors<T> = {
  [key in keyof T]?: string[]
}

export type ActionsState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>
  errors?: string | null
  data?: TOutput
}

const metaDataSchema = z.object({
  actionName: z.string(),
})

class ActionError extends Error {
  metaData: z.infer<typeof metaDataSchema>

  constructor(message: string, metaData: z.infer<typeof metaDataSchema>) {
    super(message)
    this.name = 'ActionError'
    this.metaData = metaData
  }
}

export function createSafeAction<TInput, TOutput>(
  actionName: string,
  schema: z.Schema<TInput>,
  handler: (input: TInput) => Promise<ActionsState<TInput, TOutput>>
) {
  return createSafeActionClient({
    handleServerError(e) {
      if (e instanceof ActionError) {
        return {
          message: e.message,
          ...e.metaData,
        }
      }

      return {
        message: e.message || '予期せぬエラーが発生しました',
        actionName,
      }
    },

    defineMetadataSchema() {
      return metaDataSchema
    },
  })
    .metadata({
      actionName,
    })
    .schema(schema, {
      handleValidationErrorsShape: (ve) => {
        return flattenValidationErrors(ve).fieldErrors as FieldErrors<TInput>
      },
    })

    .action(async ({ parsedInput }) => {
      return handler(parsedInput)
    })
}
