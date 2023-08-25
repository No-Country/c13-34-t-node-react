import { Router } from 'express'
import { pathNotFound } from '../middlewares/path.not.found.middleware'
import { adminRouter } from './admin.routes'
import { userRouter } from './user.routes'

export const router = Router()

router.use('/users', userRouter)
router.use('/admin', adminRouter)

router.all('*', pathNotFound)
