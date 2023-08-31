import validator from 'validator'
import z from 'zod'

export const medicalAppointmentsDatesSchema = z.object({
  body: z.object({
    date: z
      .string({
        required_error: 'La fecha con su hora es requerida',
        invalid_type_error:
          'La fecha con su hora debe venir en un arreglo de strings'
      })
      .superRefine((inputDate, ctx) => {
        if (!validator.isDate(inputDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'La fecha tiene un formato incorrecto'
          })
        }
      }),
    hours: z.array(z.string()).superRefine((hours, ctx) => {
      hours.forEach((hour) => {
        if (!validator.isTime(hour)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'La hora tiene un formato incorrecto'
          })
        }
      })
    })
  })
})
