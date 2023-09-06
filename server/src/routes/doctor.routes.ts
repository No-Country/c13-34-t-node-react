import { Router } from 'express'
import { schemaValidator } from '../middlewares/schema.middleware'
import { medicalAppointmentsDatesSchema } from '../schema/medical.appointments.dates.schema'
import { createDates } from '../controllers/medical.appointment.dates.controller'
import { cancelMedicalAppointmentDate } from '../controllers/medical.appointment.dates.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import { UserRole } from '../types/user.types'

export const doctorRouter = Router()

doctorRouter.use(protect, restrictTo(UserRole.doctor))

doctorRouter.post(
  '/assign-available-dates',
  schemaValidator(medicalAppointmentsDatesSchema),
  createDates
)

doctorRouter.delete(
  '/cancel-medical-appointment/:dateId',
  cancelMedicalAppointmentDate
)