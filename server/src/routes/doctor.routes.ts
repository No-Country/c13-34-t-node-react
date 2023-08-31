import { Router } from 'express'
import { schemaValidator } from '../middlewares/schema.middleware'
import { medicalAppointmentsDatesSchema } from '../schema/medical.appointments.dates.schema'
// import { protect, restrictTo } from '../middlewares/auth.middleware'
// import { UserRole } from '../types/user.types'

export const doctorRouter = Router()

// adminRouter.use(protect, restrictTo(UserRole.doctor))

doctorRouter.post(
  '/assign-available-dates',
  schemaValidator(medicalAppointmentsDatesSchema)
)
