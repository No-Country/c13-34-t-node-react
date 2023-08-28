import { Router } from 'express'
import { deleteUser } from '../controllers/user.controller'
import { schemaValidator } from '../middlewares/schema.middleware'
import { userExists, validateYourUser } from '../middlewares/user.middleware'
import { idSchema } from '../schema/id.schema'
import { authRouter } from './auth.routes'
import { protect } from '../middlewares/auth.middleware'

export const userRouter = Router()

userRouter.use('/auth', authRouter)

userRouter.use(
  '/:id',
  protect,
  schemaValidator(idSchema),
  userExists,
  validateYourUser
)

// userRouter.get('/:id' getUsers )
// userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
