import { Router } from 'express'
import {
  createDates,
  getAllDatesByDoctor,
  getAllHoursByDoctorDate,
  toggleStatusMedicalAppointmentDate
} from '../controllers/medical.appointment.dates.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import { schemaValidator } from '../middlewares/schema.middleware'
import { idSchema } from '../schema/id.schema'
import { medicalAppointmentsDatesSchema } from '../schema/medical.appointments.dates.schema'
import { UserRole } from '../types/user.types'
import { createMedicalRecord } from '../controllers/medical.records.controller'

export const doctorRouter = Router()

doctorRouter.use(protect, restrictTo(UserRole.doctor))

doctorRouter.post(
  '/assign-available-dates',
  schemaValidator(medicalAppointmentsDatesSchema),
  createDates
)
doctorRouter.post(
  '/create-medical-record/:id',
  schemaValidator(idSchema),
  createMedicalRecord
)

doctorRouter.patch(
  '/toggle-medical-appointment-date-status/:id',
  schemaValidator(idSchema),
  toggleStatusMedicalAppointmentDate
)

doctorRouter.get('/get-all-dates-by-doctor', getAllDatesByDoctor)

doctorRouter.post('/get-all-hours-from-date-doctor', getAllHoursByDoctorDate)
