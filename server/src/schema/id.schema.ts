import z from 'zod'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const idSchema = z.object({
  params: z.object({
    id: z.string().transform((id, ctx) => {
      const parsed = parseInt(id)

      if (isNaN(parsed))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERROR_MSGS.ID_TYPE_MISMATCH
        })
      return parsed
    })
  })
})
