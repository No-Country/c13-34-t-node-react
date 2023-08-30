import validator from 'validator'
import z from 'zod'

export const medicalAppointmentsDatesSchema = z.object({
  body: z.object({
    date: z.array(
      z
        .string({
          required_error: 'La fecha con su hora es requerida',
          invalid_type_error:
            'La fecha con su hora debe venir en un arreglo de strings'
        })
        .superRefine((inputDate, ctx) => {
          console.log('inputDate', inputDate)

          if (!validator.isDate(inputDate)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'La fecha tiene un formato incorrecto'
            })
          }
        }),
      z.array(z.string()).superRefine((hours, ctx) => {
        console.log('Hours', hours)
        hours.forEach((hour) => {
          if (!validator.isTime(hour)) {
            console.log('each hour', hour)
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'La hora tiene un formato incorrecto'
            })
          }
        })
      })
    )
  })
})

// isTime(str [, options])
// isDate(str [, options])

// ['2023-08-30', ['12:00', '14:00', '15:00']]
