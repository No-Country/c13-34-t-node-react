import { Router } from 'express'
import { signUp, singIn, updatePassword } from '../controllers/user.controller'
import { protect } from '../middlewares/auth.middleware'
import { schemaValidator } from '../middlewares/schema.middleware'
import { userExists, validateYourUser } from '../middlewares/user.middleware'
import { idSchema } from '../schema/id.schema'
import { loginSchema } from '../schema/login.schema'
import { passwordsSchema, userSchema } from '../schema/user.schema'

export const authRouter = Router()

authRouter.post('/signup', schemaValidator(userSchema), signUp)
authRouter.post('/signin', schemaValidator(loginSchema), singIn)

// Se ejecuta para cambiar la contraseña del usuario dentro de la app
authRouter.patch(
  '/password/:id',
  protect,
  schemaValidator(idSchema),
  schemaValidator(passwordsSchema),
  userExists,
  validateYourUser,
  updatePassword
)
