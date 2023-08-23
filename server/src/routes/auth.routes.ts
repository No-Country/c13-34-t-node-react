import { Router } from 'express'
import { signUp, singIn, createUser, getUsers, updateUser } from '../controllers/user.controller'
import { schemaValidator } from '../middlewares/schema.middleware'
import { loginSchema } from '../schema/login.schema'
import { userSchema } from '../schema/user.schema'

export const authRouter = Router()

authRouter.post('/signup', schemaValidator(userSchema), signUp)
authRouter.post('/signin', schemaValidator(loginSchema), singIn)
authRouter.post('/users', createUser)
authRouter.get('users', getUsers )
authRouter.put('/users/:id', updateUser)