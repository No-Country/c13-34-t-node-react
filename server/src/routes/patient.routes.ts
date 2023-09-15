import { Router } from 'express'
import { getDoctors } from '../controllers/doctor.controller'
import { createMedicalAppointment } from '../controllers/medical.appointment.controller'
import {
  cancelPatientAppointment,
  getPatient,
  patientInfo
} from '../controllers/patient.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import { schemaValidator } from '../middlewares/schema.middleware'
import { idSchema } from '../schema/id.schema'
import { medicalAppointmentSchema } from '../schema/medical.appointment.schema'
import { UserRole } from '../types/user.types'
import { User } from '../entities'

export const patientRouter = Router()

patientRouter.use(protect, restrictTo(UserRole.patient))

patientRouter.get('/doctors', getDoctors)
patientRouter.get('/medical-appointment', getPatient)

patientRouter.get(
  '/get-patient-info',
  (req, res, next) => {
    const { id } = req.sessionUser as User // este id es el id del paciente
    req.safeData = { params: { id } }
    next()
  },
  patientInfo
)

patientRouter.get(
  '/get-patient-info/:id', // este id es el id del paciente
  schemaValidator(idSchema),
  patientInfo
)
patientRouter.post(
  '/medical-appointment/:id',
  schemaValidator(idSchema),
  schemaValidator(medicalAppointmentSchema),
  createMedicalAppointment
)

// cancelar cita de parte del paciente
patientRouter.delete(
  '/cancel-appointment/:id',
  schemaValidator(idSchema),
  cancelPatientAppointment
)
