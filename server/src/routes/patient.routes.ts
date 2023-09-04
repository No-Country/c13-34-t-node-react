import { Router } from 'express'
import { schemaValidator } from '../middlewares/schema.middleware'
import { idSchema } from '../schema/id.schema'
import { createMedicalAppointment } from '../controllers/medical.appointment.controller'
import { medicalappointmentSchema } from '../schema/medical.appointment.schema'
import { protect } from '../middlewares/auth.middleware'

export const patientRouter = Router()

patientRouter.use(protect)

patientRouter.post(
  '/medical-appointment/:id',
  schemaValidator(idSchema),
  schemaValidator(medicalappointmentSchema),
  createMedicalAppointment
)
// patientRouter.get('/medicalappoinment', medicaldateappointment)
