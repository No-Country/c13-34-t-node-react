import z from 'zod'
import { UserGenre, UserRole } from '../types/user.types'
import { userService } from '../services/factory/entities.factory'

export const userSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: 'El nombre es requerido.',
        invalid_type_error: 'El nombre debe ser un texto.'
      })
      .min(2, { message: 'El nombre debe ser de mínimo 2 caracteres.' })
      .max(70, { message: 'El nombre excede la longitud máxima.' })
      .trim()
      .toLowerCase(),
    lastName: z
      .string({
        required_error: 'El apellido es requerido.',
        invalid_type_error: 'El apellido debe ser un texto.'
      })
      .min(2, { message: 'El apellido debe ser de mínimo 2 caracteres.' })
      .max(70, { message: 'El apellido excede la longitud máxima.' })
      .trim()
      .toLowerCase(),
    email: z
      .string({
        required_error: 'El email es requerido.',
        invalid_type_error: 'El email debe ser un texto.'
      })
      .email({ message: 'El email es inválido.' })
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
            message: 'El email ya esta registrado.'
          })
      }),
    genre: z.enum([UserGenre.female, UserGenre.male], {
      required_error: 'El género es requerido.',
      invalid_type_error: 'El género debe ser femenino o masculino.'
    }),
    role: z.optional(
      z.enum([UserRole.admin, UserRole.patient, UserRole.doctor], {
        required_error: 'El rol es requerido.',
        invalid_type_error: 'El rol debe ser admin, paciente o doctor.'
      })
    ),
    telephone: z
      .string({
        required_error: 'El teléfono es requerido.',
        invalid_type_error: 'El teléfono debe ser un número.'
      })
      .min(10, { message: 'El télefono debe ser de 10 digitos.' })
      .max(10, { message: 'El télefono debe ser de 10 digitos.' }),
    password: z
      .string({
        required_error: 'La contraseña es requerida.',
        invalid_type_error: 'La contraseña debe ser un texto.'
      })
      .min(5, { message: 'La contraseña debe ser de mínimo 5 caracteres' })
  }),
  dateOfBirth: z.coerce.date({
    required_error: 'La fecha es requerida.',
    invalid_type_error: 'La fecha debe ser un texto con formato de fecha'
  })
})
