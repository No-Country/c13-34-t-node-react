import dayjs from 'dayjs'
import validator from 'validator'
import z from 'zod'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { verifyArrayDuplicates } from '../utils/verify.duplicates'

export const medicalAppointmentsDatesSchema = z.object({
  body: z.object({
    date: z
      .string({
        required_error: ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_REQUIRED,
        invalid_type_error: ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_INVALID_TYPE
      })
      .superRefine((inputDate, ctx) => {
        const isValidDate = dayjs(inputDate).isValid()
        if (!isValidDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_DATE_INVALID_FORMAT
          })
        }
      }),
    hours: z
      .array(
        z.string({
          invalid_type_error:
            ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_HOURS_INVALID_FORMAT_STRING
        })
      )
      .superRefine((hours, ctx) => {
        if (hours.length < 1)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_HOURS_EMPTY_ARRAY
          })
        if (verifyArrayDuplicates(hours))
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_HOURS_REPEATED
          })
        hours.forEach((hour) => {
          if (!hour || !validator.isTime(hour)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_HOURS_INVALID_FORMAT
            })
          }
        })
      })
  })
})
