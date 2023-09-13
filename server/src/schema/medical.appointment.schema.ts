import z from 'zod'
import { MESSAGES } from '../constants/msgs'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const medicalAppointmentSchema = z.object({
  body: z.object({
    description: z
      .string({
        required_error: MESSAGES.MEDICAL_APPOINTMENT_DESC_REQUIRED,
        invalid_type_error: MESSAGES.MEDICAL_APPOINTMENT_DESC_TYPE
      })
      .trim()
      .toLowerCase()
      .min(20, { message: MESSAGES.MEDICAL_APPOINTMENT_DESC_MIN_LENGTH })
  })
})

export const medicalAppointmentsIdsSchema = z.object({
  params: z.object({
    doctorId: z.string().transform((doctorId, ctx) => {
      const parsed = parseInt(doctorId)

      if (isNaN(parsed))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERROR_MSGS.ID_TYPE_MISMATCH
        })
      return parsed
    }),
    patientId: z.string().transform((patientId, ctx) => {
      const parsed = parseInt(patientId)

      if (isNaN(parsed))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERROR_MSGS.ID_TYPE_MISMATCH
        })
      return parsed
    })
  })
})
