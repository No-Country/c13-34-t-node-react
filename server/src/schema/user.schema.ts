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
<<<<<<< HEAD
      .min(2, { message: 'El nombre debe ser de mínimo 2 caracteres.' })
      .max(50, { message: 'El nombre excede la longitud máxima.' })
=======
      .min(2, { message: MESSAGES.FIRST_NAME_MIN_LENGTH })
      .max(70, { message: MESSAGES.FIRST_NAME_MAX_LENGTH })
>>>>>>> 8305c98e9781214d3866c62abf142c3f1bbab6fc
      .trim()
      .toLowerCase(),
    lastName: z
      .string({
        required_error: MESSAGES.LAST_NAME_REQUIRED_ERROR,
        invalid_type_error: MESSAGES.LAST_NAME_TYPE_ERROR
      })
<<<<<<< HEAD
      .min(3, { message: 'El apellido debe ser de mínimo 2 caracteres.' })
      .max(70, { message: 'El apellido excede la longitud máxima.' })
=======
      .min(2, { message: MESSAGES.LAST_NAME_MIN_LENGTH })
      .max(70, { message: MESSAGES.LAST_NAME_MAX_LENGTH })
>>>>>>> 8305c98e9781214d3866c62abf142c3f1bbab6fc
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
<<<<<<< HEAD
            code: z.ZodIssueCode.custom,
            message: 'El email ya esta registrado.'
=======
            code: 'custom',
            message: MESSAGES.EMAIL_ALREADY_REGISTERED
>>>>>>> 8305c98e9781214d3866c62abf142c3f1bbab6fc
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
<<<<<<< HEAD
      .min(5, { message: 'La contraseña debe ser de mínimo 5 caracteres' }),
    dateOfBirth: z.coerce.date()
=======
      .min(5, { message: MESSAGES.PASSWORD_MIN_LENGTH })
>>>>>>> 8305c98e9781214d3866c62abf142c3f1bbab6fc
  })
})
