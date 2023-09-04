import z from 'zod'
import dayjs from 'dayjs'
import validator from 'validator'
import { verifyArrayDuplicates } from '../utils/verify.duplicates'

export const medicalAppointmentsDatesSchema = z.object({
  body: z.object({
    date: z
      .string({
        required_error: 'La fecha con su hora es requerida',
        invalid_type_error:
          'La fecha con su hora debe venir en un arreglo de strings'
      })
      .superRefine((inputDate, ctx) => {
        const isValidDate = dayjs(inputDate).isValid()
        if (!isValidDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'La fecha tiene un formato incorrecto'
          })
        }
      }),
    hours: z
      .array(
        z.string({
          invalid_type_error: 'Las horas deben estar en el formato de texto.'
        })
      )
      .superRefine((hours, ctx) => {
        if (hours.length < 1)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Debe haber al menos un horario disponible.'
          })
        if (verifyArrayDuplicates(hours))
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Algún horario esta repetido.'
          })
        hours.forEach((hour) => {
          if (!hour || !validator.isTime(hour)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'La hora tiene un formato incorrecto'
            })
          }
        })
      })
  })
})
