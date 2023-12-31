import validator from 'validator'
import z from 'zod'
import { MESSAGES } from '../constants/msgs'
import { userService } from '../services'
import { UserStatus } from '../types/user.types'

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: MESSAGES.EMAIL_REQUIRED_ERROR,
        invalid_type_error: MESSAGES.EMAIL_TYPE_ERROR
      })
      .email({ message: MESSAGES.EMAIL_INVALID })
      .trim()
      .toLowerCase()
      .superRefine(async (email, ctx) => {
        const filters = { email, status: UserStatus.enable }
        const userExists = await userService.findUser(
          filters,
          false,
          false,
          false
        )

        if (!userExists) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: MESSAGES.EMAIL_NOT_REGISTERED
          })
        }
      }),
    password: z
      .string({
        required_error: MESSAGES.PASSWORD_REQUIRED_ERROR,
        invalid_type_error: MESSAGES.PASSWORD_TYPE_ERROR
      })
      .superRefine((val, ctx) => {
        if (!validator.isStrongPassword(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: MESSAGES.PASSWORD_TOO_WEAK
          })
        }
      })
  })
})
