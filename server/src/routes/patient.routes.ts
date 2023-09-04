import { Router } from 'express'
import { schemaValidator } from '../middlewares/schema.middleware'
import { idSchema } from '../schema/id.schema'
import { createMedicalAppointment } from '../controllers/medical.appointment.controller'

export const patientRouter = Router()

patientRouter.post(
  '/medical-appointment/:id',
  schemaValidator(idSchema),
  createMedicalAppointment
)
// patientRouter.get('/medicalappoinment', medicaldateappointment)
