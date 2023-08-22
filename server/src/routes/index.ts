import { Router } from 'express'
import { pathNotFound } from '../middlewares/path.not.found.middleware'
import { userRouter } from './user.routes'

export const router = Router()

router.use('/users', userRouter)

router.all('*', pathNotFound)
