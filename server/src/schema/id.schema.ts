import z from 'zod'

export const idSchema = z.object({
  params: z.object({
    id: z.string().transform((id, ctx) => {
      const parsed = parseInt(id)

      if (isNaN(parsed))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El id debe ser un entero'
        })
      return parsed
    })
  })
})
