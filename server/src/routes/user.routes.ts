import { Router } from 'express'
import {
  // signUp,
  // singIn,
  deleteUser /* createUser,  getUsers updateUser */
} from '../controllers/user.controller'
import { schemaValidator } from '../middlewares/schema.middleware'
import { userExists } from '../middlewares/user.middleware'
import { idSchema } from '../schema/id.schema'
import { authRouter } from './auth.routes'

export const userRouter = Router()

userRouter.use('/auth', authRouter)

userRouter.use('/:id', schemaValidator(idSchema), userExists)

// userRouter.get('users' getUsers )
// userRouter.put('/users/:id', updateUser)
userRouter.delete('/:id', deleteUser)
