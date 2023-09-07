import { Router } from 'express'
import { schemaValidator } from '../middlewares/schema.middleware'
import { idSchema } from '../schema/id.schema'
import { createMedicalAppointment } from '../controllers/medical.appointment.controller'
import { medicalAppointmentSchema } from '../schema/medical.appointment.schema'
import {
  cancelPatientAppointment,
  getPatient
} from '../controllers/patient.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import { UserRole } from '../types/user.types'
import { getDoctors } from '../controllers/doctor.controller'

export const patientRouter = Router()

patientRouter.use(protect, restrictTo(UserRole.patient))

patientRouter.get('/doctors', getDoctors)
patientRouter.get('/medical-appointment', getPatient)
patientRouter.post(
  '/medical-appointment/:id',
  schemaValidator(idSchema),
  schemaValidator(medicalAppointmentSchema),
  createMedicalAppointment
)

patientRouter.get(
  '/cancel-appointment/:id',
  schemaValidator(idSchema),
  schemaValidator(medicalAppointmentSchema),
  cancelPatientAppointment
)
