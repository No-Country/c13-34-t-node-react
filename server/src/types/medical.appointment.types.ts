import { Repository } from 'typeorm'
import { MedicalAppointment } from '../entities'

export type MedicalAppointmentRepository = Repository<MedicalAppointment>
