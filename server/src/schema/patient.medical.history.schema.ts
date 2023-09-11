import z from 'zod'
import { MESSAGES } from '../constants/msgs'

export const patientMedicalHistorySchema = z.object({
  body: z.object({
    notes: z
      .string({
        required_error: MESSAGES.NOTES_REQUIRED,
        invalid_type_error: MESSAGES.NOTES_WRONG_TYPE
      })
      .min(8, { message: MESSAGES.NOTES_MIN_LENGTH })
      .max(255, { message: MESSAGES.NOTES_MAX_LENGTH }),
    symptoms: z
      .string({
        required_error: MESSAGES.SYMPTOMS_REQUIRED,
        invalid_type_error: MESSAGES.SYMPTOMS_WRONG_TYPE
      })
      .min(8, { message: MESSAGES.SYMPTOMS_MIN_LENGTH })
      .max(255, { message: MESSAGES.SYMPTOMS_MAX_LENGTH }),
    treatments: z
      .string({
        required_error: MESSAGES.TREATMENTS_REQUIRED,
        invalid_type_error: MESSAGES.TREATMENTS_WRONG_TYPE
      })
      .min(8, { message: MESSAGES.TREATMENTS_MIN_LENGTH })
      .max(255, { message: MESSAGES.TREATMENTS_MAX_LENGTH }),
    medication: z
      .string({
        required_error: MESSAGES.MEDICATION_REQUIRED,
        invalid_type_error: MESSAGES.MEDICATION_WRONG_TYPE
      })
      .min(8, { message: MESSAGES.MEDICATION_MIN_LENGTH })
      .max(255, { message: MESSAGES.MEDICATION_MAX_LENGTH })
  })
})
