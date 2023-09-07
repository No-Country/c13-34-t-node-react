import { Router } from 'express'
import {
  createDates,
  getAllDateByDoctor,
  toggleStatusMedicalAppointmentDate
} from '../controllers/medical.appointment.dates.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import { schemaValidator } from '../middlewares/schema.middleware'
import { idSchema } from '../schema/id.schema'
import { medicalAppointmentsDatesSchema } from '../schema/medical.appointments.dates.schema'
import { UserRole } from '../types/user.types'

export const doctorRouter = Router()

doctorRouter.use(protect, restrictTo(UserRole.doctor))

doctorRouter.post(
  '/assign-available-dates',
  schemaValidator(medicalAppointmentsDatesSchema),
  createDates
)

doctorRouter.put(
  '/toggle-medical-appointment-date-status/:id',
  schemaValidator(idSchema),
  toggleStatusMedicalAppointmentDate
)

doctorRouter.get('/get-all-dates-by-doctor', getAllDateByDoctor)
