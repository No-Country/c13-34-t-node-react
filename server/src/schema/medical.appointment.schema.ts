import z from 'zod'
import { MESSAGES } from '../constants/msgs'

export const medicalappointmentSchema = z.object({
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
