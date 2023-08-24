import { Router } from 'express'
import { signUp, singIn } from '../controllers/user.controller'
import { schemaValidator } from '../middlewares/schema.middleware'
import { loginSchema } from '../schema/login.schema'
import { userSchema } from '../schema/user.schema'
import { idSchema } from '../schema/id.schema'
import { protect } from '../middlewares/auth.middleware'
import { userExists, validateYourUser } from '../middlewares/user.middleware'

export const authRouter = Router()

authRouter.post('/signup', schemaValidator(userSchema), signUp)
authRouter.post('/signin', schemaValidator(loginSchema), singIn)
authRouter.patch(
  '/password/:id',
  protect,
  schemaValidator(idSchema),
  userExists,
  validateYourUser
)
