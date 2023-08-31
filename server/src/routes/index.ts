import { Router } from 'express'
import { pathNotFound } from '../middlewares/path.not.found.middleware'
import { adminRouter } from './admin.routes'
import { doctorRouter } from './doctor.routes'
import { patientRouter } from './patient.routes'
import { userRouter } from './user.routes'

export const router = Router()

router.use('/users', userRouter)
router.use('/patients', patientRouter)
router.use('/admin', adminRouter)
router.use('/doctor', doctorRouter)

router.all('*', pathNotFound)
