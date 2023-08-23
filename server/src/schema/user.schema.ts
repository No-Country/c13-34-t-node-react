import z from 'zod'
import { MESSAGES } from '../constants/msgs'
import { userService } from '../services/factory/entities.factory'
import { UserGenre, UserRole } from '../types/user.types'

export const userSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: MESSAGES.FIRST_NAME_REQUIRED_ERROR,
        invalid_type_error: MESSAGES.FIRST_NAME_TYPE_ERROR
      })
      .min(2, { message: MESSAGES.FIRST_NAME_MIN_LENGTH })
      .max(70, { message: MESSAGES.FIRST_NAME_MAX_LENGTH })
      .trim()
      .toLowerCase(),
    lastName: z
      .string({
        required_error: MESSAGES.LAST_NAME_REQUIRED_ERROR,
        invalid_type_error: MESSAGES.LAST_NAME_TYPE_ERROR
      })
      .min(2, { message: MESSAGES.LAST_NAME_MIN_LENGTH })
      .max(70, { message: MESSAGES.LAST_NAME_MAX_LENGTH })
      .trim()
      .toLowerCase(),
    email: z
      .string({
        required_error: MESSAGES.EMAIL_REQUIRED_ERROR,
        invalid_type_error: MESSAGES.EMAIL_TYPE_ERROR
      })
      .email({ message: MESSAGES.EMAIL_INVALID })
      .trim()
      .toLowerCase()
      .superRefine(async (email, ctx) => {
        const filters = {
          email
        }
        const userExists = await userService.findUser(
          filters,
          false,
          false,
          false
        )

        if (userExists)
          ctx.addIssue({
            code: 'custom',
            message: MESSAGES.EMAIL_ALREADY_REGISTERED
          })
      }),
    genre: z.enum([UserGenre.female, UserGenre.male], {
      required_error: MESSAGES.GENRE_REQUIRED_ERROR,
      invalid_type_error: MESSAGES.GENRE_TYPE_ERROR
    }),
    role: z.optional(
      z.enum([UserRole.admin, UserRole.patient, UserRole.doctor], {
        required_error: MESSAGES.ROLE_REQUIRED_ERROR,
        invalid_type_error: MESSAGES.ROLE_TYPE_ERROR
      })
    ),
    telephone: z
      .string({
        required_error: MESSAGES.TELEPHONE_REQUIRED_ERROR,
        invalid_type_error: MESSAGES.TELEPHONE_TYPE_ERROR
      })
      .min(10, { message: MESSAGES.TELEPHONE_MIN_LENGTH })
      .max(10, { message: MESSAGES.TELEPHONE_MAX_LENGTH }),
    password: z
      .string({
        required_error: MESSAGES.PASSWORD_REQUIRED_ERROR,
        invalid_type_error: MESSAGES.PASSWORD_TYPE_ERROR
      })
      .min(5, { message: MESSAGES.PASSWORD_MIN_LENGTH })
  })
})
