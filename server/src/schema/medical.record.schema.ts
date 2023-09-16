import z from 'zod'
import { MESSAGES } from '../constants/msgs'

export const medicalRecordSchema = z.object({
  body: z.object({
    allergies: z
      .string({
        required_error: MESSAGES.ALLERGIES_REQUIRED,
        invalid_type_error: MESSAGES.ALLERGIES_WRONG_TYPE
      })
      .min(8, { message: MESSAGES.ALLERGIES_MIN_LENGTH })
      .max(255, { message: MESSAGES.ALLERGIES_MAX_LENGTH }),
    previousMedicalConditions: z
      .string({
        required_error: MESSAGES.PREVIOUS_MEDICAL_CONDITIONS_REQUIRED,
        invalid_type_error: MESSAGES.PREVIOUS_MEDICAL_CONDITIONS_WRONG_TYPE
      })
      .min(8, { message: MESSAGES.PREVIOUS_MEDICAL_CONDITIONS_MIN_LENGTH }),
    familyMedicalHistory: z
      .string({
        required_error: MESSAGES.FAMILY_MEDICAL_HISTORY_REQUIRED,
        invalid_type_error: MESSAGES.FAMILY_MEDICAL_HISTORY_WRONG_TYPE
      })
      .min(8, { message: MESSAGES.FAMILY_MEDICAL_HISTORY_MIN_LENGTH })
  })
})
