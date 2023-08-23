import { Router } from 'express'
import { authRouter } from './auth.routes'
import { schemaValidator } from '../middlewares/schema.middleware'
import { idSchema } from '../schema/id.schema'
import { userExists } from '../middlewares/user.middleware'
import {
  signUp,
  singIn,
  deleteUser /* createUser,  getUsers updateUser*/
} from '../controllers/user.controller'

export const userRouter = Router()

userRouter.use('/auth', authRouter)

userRouter.use('/:id', schemaValidator(idSchema), userExists)

// userRouter.get('users' getUsers )
// userRouter.put('/users/:id', updateUser)
userRouter.delete('/:id', deleteUser)
