import { Router } from 'express'
import { signUp, singIn } from '../controllers/user.controller'
import { schemaValidator } from '../middlewares/schema.middleware'
import { userSchema } from '../schema/user.schema'

export const authRouter = Router()

authRouter.post('/signup', schemaValidator(userSchema), signUp)
authRouter.post('/signin', schemaValidator, singIn)
